const chatbotData =
 [
    { 
        question: "What is an expense tracker?", 
        reply: "An expense tracker is a tool to monitor and manage your income and expenses effectively." 
    },
    { 
        question: "How do I add an expense?", 
        reply: "Go to the 'Add Expense' section, enter the amount, category, and date, then click 'Save'." 
    },
    { 
        question: "Can I edit an expense?", 
        reply: "Yes, you can edit any expense by navigating to the 'Expense List' section and clicking the edit button next to the entry." 
    },
    { 
        question: "How do I delete an expense?", 
        reply: "Currently we don't have a delete option in this website but your data will be deleted automitcally after 30 days." 
    },
    { 
        question: "Can I track my income?", 
        reply: "Yes, you can add your income in the 'Add Income' section to track it along with your expenses." 
    },
    { 
        question: "How do I view my expense summary?", 
        reply: "The dashboard provides a summary of your total income, expenses, and the remaining balance." 
    },
    { 
        question: "What categories are available?", 
        reply: "Common categories include Food, Rent, Travel, Shopping, and Utilities. You can also create custom categories." 
    },
    { 
        question: "Can I generate reports?", 
        reply: "Yes, you can generate monthly or yearly reports from the 'Reports' section to analyze your spending." },
    { 
        question: "Is my data secure?", 
        reply: "Yes, your data is securely stored, and only you can access it using your login credentials." },
    { 
        question: "How do I reset my password?", 
        reply: "Go to the 'Forgot Password' section on the login page, enter your email, and follow the instructions sent to your email." },
    { 
        question: "Can I use it on my mobile?", 
        reply: "Yes, the expense tracker is mobile-friendly and works seamlessly on smartphones." 
    },
    { 
        question: "Can I export my data?", 
        reply: "Yes, you can export your data as a CSV file from the 'Export Data' section." 
    },
    { 
        question: "How do I set a budget?", 
        reply: "You can set a budget in the 'Budget' section by specifying the amount for each category." 
    },
    { 
        question: "What happens if I exceed my budget?", 
        reply: "The system will notify you if your expenses in a category exceed the set budget." 
    },
    { 
        question: "Can I track recurring expenses?", 
        reply: "Yes, you can add recurring expenses such as rent or subscriptions in the 'Recurring Expenses' section." 
    },
    { 
        question: "Can multiple users use the tracker?", 
        reply: "Each user has their own account, so multiple users can use the tracker independently." 
    },
    { 
        question: "Where do I log my daily expenses?", 
        reply: "Go to the 'Add Expense' section, enter the amount, category, and date, then click 'Save'." 
    },
    { 
        question: "How do I enter an expense for a specific category?", 
        reply: "Go to the 'Add Expense' section, select the appropriate category, enter the amount and date, then click 'Save'." 
    },
    { 
        question: "Can I add an expense without a category?", 
        reply: "Category selection is required to organize your expenses properly." 
    },
    { 
        question: "Is there a shortcut to add an expense?", 
        reply: "You can use the 'Quick Add' option to enter an expense with minimal details." 
    },
    { 
        question: "How can I add a recurring expense?", 
        reply: "Use the 'Recurring Expenses' option and set the frequency (daily, weekly, monthly) before saving." 
    },
    { 
        question: "Can I attach a receipt while adding an expense?", 
        reply: "Yes, you can upload a receipt in the 'Add Expense' section before saving." 
    },
    { 
        question: "Where do I find the last expense I added?", 
        reply: "Your latest expenses are displayed in the 'Recent Transactions' section of the dashboard." 
    },
    { 
        question: "Can I add an expense for a past date?", 
        reply: "Yes, just select the appropriate date while adding your expense." 
    },
    { 
        question: "What happens if I enter the wrong amount?", 
        reply: "You can edit the expense from the 'Expense List' section and update the details." 
    },
    { 
        question: "Can I add an expense in a different currency?", 
        reply: "Yes, select the currency option while adding an expense if multi-currency support is enabled." 
    },
    { 
        question: "Is there a limit to the number of expenses I can add?", 
        reply: "No, you can add as many expenses as needed." 
    },
    { 
        question: "How do I categorize my expenses?", 
        reply: "Select the appropriate category (e.g., food, rent, travel) when adding an expense." 
    },
    { 
        question: "Can I tag multiple categories for one expense?", 
        reply: "Currently, each expense can have only one category. You can split the expense into multiple entries if needed." 
    },
    { 
        question: "What if I forget to add an expense on the same day?", 
        reply: "You can manually enter expenses for past dates in the 'Add Expense' section." 
    },
    { 
        question: "Can I set a budget while adding expenses?", 
        reply: "Yes, go to the 'Budget' section to set limits for different categories." 
    },
    { 
        question: "How do I check my total expenses for the month?", 
        reply: "Go to the 'Dashboard' or 'Reports' section to view your total monthly expenses." 
    },
    { 
        question: "Can I filter my expenses by category?", 
        reply: "Yes, go to the 'Expense List' and use the category filter to see expenses for a specific category." 
    },
    { 
        question: "How can I edit an expense after adding it?", 
        reply: "Go to the 'Expense List' section, find the expense, and click the 'Edit' button to update the details." 
    },
    { 
        question: "Can I delete an expense?", 
        reply: "No, Sorry we don't have such feature in this website." 
    },
    { 
        question: "Is there a way to see my expenses for a specific date range?", 
        reply: "Yes, use the 'Date Filter' option in the 'Expense List' or 'Reports' section." 
    },
    { 
        question: "How can I track my spending trends?", 
        reply: "Check the 'Reports' section for charts and graphs showing your spending patterns." 
    },
    { 
        question: "Can I download my expense data?", 
        reply: "Yes, go to 'Settings' or 'Reports' and use the 'Export Data' option to download your expenses as a CSV or PDF file." 
    },
    { 
        question: "How do I set a monthly budget?", 
        reply: "Go to the 'Budget' section, select a category, and set a limit for the month." 
    },
    { 
        question: "Will I get a notification if I exceed my budget?", 
        reply: "Yes, you will receive an alert when your spending exceeds the set budget." 
    },
    { 
        question: "How do I categorize an expense as a business expense?", 
        reply: "Select 'Business' as the category while adding the expense." 
    },
    { 
        question: "Can I track my income along with expenses?", 
        reply: "Yes, you can add income in the 'Income' section to track your overall financial health." 
    },
    { 
        question: "How do I track expenses shared with others?", 
        reply: "Use the 'Split Expense' feature to divide the cost among multiple people." 
    },
    { 
        question: "Can I set up recurring payments for expenses like rent or bills?", 
        reply: "Yes, go to the 'Recurring Expenses' section and set the frequency (daily, weekly, monthly)." 
    },
    { 
        question: "How do I back up my expense data?", 
        reply: "Your data is automatically saved. You can also export it from the 'Settings' section." 
    },
    { 
        question: "What should I do if I accidentally delete an expense?", 
        reply: "There is no such option for deleting an expense." 
    },
    { 
        question: "Can I share my expense reports with others?", 
        reply: "Yes, use the 'Share' option in the 'Reports' section to send reports via email or download them." 
    },
    { 
        question: "Is my expense data secure?", 
        reply: "Yes, all data is encrypted and stored securely. You can enable two-factor authentication for extra security." 
    },
    { 
        question: "How do I reset all my expenses?", 
        reply: "You cannot reset data your data will be deleted automatically after 30 days." 
    },
    { 
        question: "Can I connect my bank account to track expenses automatically?", 
        reply: "Currently, we support manual entry, but automatic bank syncing may be available in future updates." 
    }
    
    

  ];
  
  module.exports = chatbotData;
  