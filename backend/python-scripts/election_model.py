import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import LabelEncoder, StandardScaler
import sys
import json
import os

# Load data
data_2024 = pd.read_csv(os.path.join('data', 'election_results_2024.csv'))
data_2019 = pd.read_csv(os.path.join('data', 'india_election_2019.csv'))
data_2014 = pd.read_csv(os.path.join('data', 'india_election_2014.csv'))

# Preprocess 2024
data_2024_clean = data_2024.rename(columns={
    'Constituency': 'PC Name',
    'Leading Candidate': 'Winning Candidate',
    'Leading Party': 'Party',
    'Margin': 'Margin'
})
data_2024_clean['Margin'] = data_2024_clean['Margin'].replace('-', '0').replace(',', '', regex=True).astype(float)
data_2024_clean = data_2024_clean[['PC Name', 'Winning Candidate', 'Party', 'Margin']]

# Preprocess 2019 & 2014
data_2019_clean = data_2019[['PC Name', 'Winning Candidate', 'Party', 'Electors', 'Votes', 'Turnout', 'Margin %']]
data_2014_clean = data_2014[['PC Name', 'Winning Candidate', 'Party', 'Votes', 'Turnout']]

# Merge all
merged = pd.merge(data_2024_clean, data_2019_clean, on=['PC Name', 'Party'], how='left')
merged = pd.merge(merged, data_2014_clean, on=['PC Name', 'Party'], how='left')
merged.rename(columns={
    'Winning Candidate_x': 'Winning Candidate 2024',
    'Winning Candidate_y': 'Winning Candidate 2019',
    'Winning Candidate': 'Winning Candidate 2014'
}, inplace=True)
merged.fillna(0, inplace=True)

# Prepare model input
features = ['Margin', 'Votes_x', 'Votes_y', 'Turnout_x', 'Turnout_y', 'Margin %']
scaler = StandardScaler()
merged[features] = scaler.fit_transform(merged[features])
label_encoder = LabelEncoder()
merged['Label'] = label_encoder.fit_transform(merged['Winning Candidate 2024'])

# Train model
X = merged[features]
y = merged['Label']
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)
model = LogisticRegression(max_iter=500)
model.fit(X_train, y_train)

# Candidate input
candidate_name = sys.argv[1] if len(sys.argv) > 1 else ""

# Match candidate
rows = pd.concat([
    merged[merged['Winning Candidate 2024'] == candidate_name],
    merged[merged['Winning Candidate 2019'] == candidate_name],
    merged[merged['Winning Candidate 2014'] == candidate_name]
])
if rows.empty:
    print(json.dumps({"error": "Candidate not found in dataset"}))
    sys.exit()

# Predict
candidate_features = rows[features].mean().to_frame().T
probs = model.predict_proba(candidate_features)[0]
pred_class = model.predict(candidate_features)[0]
confidence = probs[pred_class] * 100

# Output
print(json.dumps({
    "candidate": candidate_name,
    "winning_probability_percent": round(confidence, 2)
}))
