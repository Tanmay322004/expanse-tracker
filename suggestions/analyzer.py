import pandas as pd
from datetime import datetime, timedelta

def generate_suggestions(expenses):
    if not expenses:
        return ["No expenses provided."]
    
    df = pd.DataFrame(expenses)
    df['date'] = pd.to_datetime(df['date'])

    # Last 30 days
    cutoff = datetime.now() - timedelta(days=30)
    df = df[df['date'] >= cutoff]

    suggestions = []

    # High spending categories
    category_sum = df.groupby('category')['amount'].sum()
    for category, total in category_sum.items():
        if total > 5000:
            suggestions.append(f"You spent ₹{int(total)} on {category}. Consider reducing it by 15%.")

    # Daily trend
    df['day'] = df['date'].dt.date
    daily = df.groupby('day')['amount'].sum()
    if daily.mean() > 1000:
        suggestions.append("Your average daily spending is high. Track your discretionary expenses.")

    if not suggestions:
        suggestions.append("You're managing your spending well. Keep it up!")

    return suggestions
