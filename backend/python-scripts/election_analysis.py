import pandas as pd
import sys
import json
import os

# Load 2019 election data
file_path = os.path.join('data', 'india_election_2019.csv')
election_data = pd.read_csv(file_path)

# Get input state name
state_name = sys.argv[1] if len(sys.argv) > 1 else ""

# Filter data
state_results = election_data[election_data['State'].str.contains(state_name, case=False, na=False)]
if state_results.empty:
    print(json.dumps({"error": "No data found for state"}))
    sys.exit()

# Calculate seat count and percentages
party_counts = state_results['Party'].value_counts()
top5 = party_counts[:5]
other = party_counts[5:].sum()
final_counts = pd.concat([top5, pd.Series({'Other': other})])
total = final_counts.sum()

# Format output
output = {
    "state": state_name,
    "party_data": [
        {"party": party, "seats": int(seats), "percentage": round((seats / total) * 100, 2)}
        for party, seats in final_counts.items()
    ]
}

print(json.dumps(output))
