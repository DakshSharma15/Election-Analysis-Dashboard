import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import make_pipeline
import sys
import json
import os

# Load datasets
data1 = pd.read_csv(os.path.join('data', 'IndianElection19TwitterData.csv'))
data2 = pd.read_csv(os.path.join('data', 'RahulRelatedTweetsWithSentiment.csv'))
data3 = pd.read_csv(os.path.join('data', 'ModiRelatedTweetsWithSentiment.csv'))

# Prepare labeled data
labeled = pd.concat([data2[['Tweet', 'Emotion']], data3[['Tweet', 'Emotion']]], ignore_index=True)
labeled.dropna(inplace=True)
labeled = labeled[labeled['Tweet'].str.strip().astype(bool)]

# Train model
X = labeled['Tweet']
y = labeled['Emotion']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)
model_pipeline = make_pipeline(CountVectorizer(), MultinomialNB())
model_pipeline.fit(X_train, y_train)

# Get candidate name from CLI
candidate_name = sys.argv[1] if len(sys.argv) > 1 else ""

# Filter tweets
candidate_tweets = data1[data1['Tweet'].str.contains(candidate_name, case=False, na=False)]
if candidate_tweets.empty:
    print(json.dumps({"error": "No tweets found for candidate"}))
    sys.exit()

# Predict sentiments
preds = model_pipeline.predict(candidate_tweets['Tweet'])
pos = (preds == 'pos').sum()
neg = (preds == 'neg').sum()

# Return result
print(json.dumps({
    "candidate": candidate_name,
    "positive": int(pos),
    "negative": int(neg),
    "verdict": "Likely to have a favorable outcome" if pos > neg else "Might face challenges"
}))
