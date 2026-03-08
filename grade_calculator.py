# Grade Calculator - Enhanced Experience

TROPHY = r"""
      ___________
     '._==_==_=_.'
     .-\:      /-.
    | (|:.     |) |
     '-|:.     |-'
       \::.    /
        '::. .'
          ) (
        _.' '._
       `-------`
"""

KEEP_GOING = r"""
       _______
      /       \
     |  Keep   |
     | Moving  |
     | Forward |
      \_______/
          |
        \ _ /
          |
"""

def get_result(average):
    if average >= 75:
        return "A", "Pass"
    elif average >= 60:
        return "B", "Pass"
    elif average >= 40:
        return "C", "Pass"
    else:
        return "F", "Fail"

def main():
    print("=" * 45)
    print("   STUDENT PERFORMANCE TRACKER (PRO)   ")
    print("=" * 45)
    print("Instructions:")
    print("- Enter 'exit' as name to quit.")
    print("- Enter 'done' as mark to calculate.\n")
    
    while True:
        name_input = input("Enter student name: ").strip()
        
        if name_input.lower() == 'exit':
            print("\nExiting program. Happy coding!")
            break
            
        marks = []
        subject_count = 1
        
        while True:
            mark_input = input(f"Enter mark for Subject {subject_count} (or 'done'): ").strip().lower()
            
            if mark_input == 'done':
                break
            
            try:
                mark = float(mark_input)
                marks.append(mark)
                subject_count += 1
            except ValueError:
                print(">> Invalid input! Please enter a number or 'done'.")
        
        if not marks:
            print(f">> No data entered for {name_input}.\n")
            continue
            
        # Calculations
        average = sum(marks) / len(marks)
        grade, status = get_result(average)
        
        # Result Output
        print("\n" + "*" * 45)
        print(f" FINAL REPORT: {name_input.upper()} ")
        print("*" * 45)
        print(f" Average Marks : {average:.2f}")
        print(f" Final Grade   : {grade}")
        print(f" Status        : {status}")
        
        if status == "Pass":
            print("\nCONGRATULATIONS! YOU EARNED A TROPHY:")
            print(TROPHY)
        else:
            print("\nDON'T GIVE UP! STAY MOTIVATED:")
            print(KEEP_GOING)
            
        print("=" * 45 + "\n")

if __name__ == "__main__":
    main()
