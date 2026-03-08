# Personal Budget Tracker - Enhanced Input

def clean_input(val):
    """Removes spaces from input to allow formats like '12 000'."""
    return val.replace(" ", "")

def main():
    print("=" * 45)
    print("      PERSONAL BUDGET TRACKER (PRO)      ")
    print("=" * 45)
    
    try:
        # Initial budget input with space-cleaning
        budget_input = input("Enter your total monthly budget: ").strip()
        total_budget = float(clean_input(budget_input))
        
        expenses = []
        print("\nEnter your expenses one by one.")
        print("Type 'done' when you have finished entering expenses.\n")
        
        count = 1
        while True:
            expense_raw = input(f"Enter expense {count} (or 'done'): ").strip().lower()
            
            if expense_raw == 'done':
                break
                
            try:
                # Clean input for each expense
                amount = float(clean_input(expense_raw))
                expenses.append(amount)
                count += 1
            except ValueError:
                print(">> Invalid input! Please enter a numerical amount or 'done'.")
        
        # Calculations
        total_expenses = sum(expenses)
        remaining_balance = total_budget - total_expenses
        
        # Summary Report
        print("\n" + "*" * 45)
        print("           MONTHLY BUDGET SUMMARY          ")
        print("*" * 45)
        print(f" Total Budget      : {total_budget:.2f}")
        print(f" Total Expenses    : {total_expenses:.2f}")
        print("-" * 45)
        print(f" Remaining Balance : {remaining_balance:.2f}")
        
        # Warning Logic
        if remaining_balance < 500:
            print("\n!!! WARNING: LOW FUNDS !!!")
            print("Please review your spending immediately.")
        elif remaining_balance >= 0:
            print("\nGreat job! You are staying within your budget.")
        else:
            print("\n!!! CRITICAL: YOU ARE OVER BUDGET !!!")
            
        print("=" * 45 + "\n")

    except ValueError:
        print("\n>> Error: Please enter a valid numerical value for your budget.")

if __name__ == "__main__":
    main()
