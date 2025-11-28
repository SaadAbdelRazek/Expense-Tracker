Expense Tracker CRUD Application 💰
A beautiful, responsive expense tracker built with vanilla JavaScript featuring CRUD operations, analytics, and a stunning glassmorphism design.

https://img.shields.io/badge/Expense-Tracker-blue https://img.shields.io/badge/Version-2.0-green https://img.shields.io/badge/License-MIT-yellow

✨ Features
🎯 Core Functionality
Complete CRUD Operations: Create, Read, Update, Delete expenses

Data Persistence: Automatically saves to localStorage

Form Validation: Ensures valid inputs before submission

Responsive Design: Works perfectly on desktop and mobile

🔍 Filtering & Organization
Category Filtering: Filter expenses by Food, Transport, Entertainment, Bills, or view All

Visual Categories: Color-coded badges for easy identification

Date Tracking: Automatic date tracking for each expense

📊 Analytics & Insights
Interactive Charts: Doughnut chart showing spending distribution

Key Metrics:

Total expenses amount

Average expense amount

Highest spending category

Total number of expenses

Real-time Updates: Analytics update instantly with any data change

🎨 Design & UX
Glassmorphism UI: Modern semi-transparent design with backdrop blur

Smooth Animations: Hover effects and transitions

Intuitive Interface: Clean, user-friendly layout

Empty States: Helpful messages when no data exists

🛠️ Tech Stack
Frontend: HTML5, CSS3, Vanilla JavaScript

Styling: Bootstrap 5 + Custom CSS (Glassmorphism)

Charts: Chart.js for analytics

Icons: Font Awesome

Storage: LocalStorage for data persistence

🚀 Quick Start
Method 1: Direct File
Copy the entire HTML code from the provided file

Save it as index.html

Open in any modern web browser

Method 2: Project Structure
text
expense-tracker/
│
├── index.html          # Main application file
├── README.md           # Project documentation
└── assets/
    ├── screenshot.png  # Application screenshot
    └── demo.gif        # Application demo
📖 How to Use
Adding an Expense
Fill in the expense name

Enter the amount (must be positive)

Select a category

Click "Add Expense"

Editing an Expense
Click the "Edit" button on any expense

The form will auto-fill with existing data

Modify the values as needed

Click "Update Expense" to save changes

Filtering Expenses
Use the filter buttons to view expenses by specific categories

Click "All Expenses" to view everything

Active filters are highlighted

Viewing Analytics
Check the analytics card for spending insights

View the chart for visual breakdown by category

Monitor key metrics like average spending and highest category

Deleting Expenses
Click the "Delete" button on any expense

Confirm the action in the dialog

The expense will be permanently removed

🎨 Color Scheme & Categories
Category	Color	Usage
Food	Green 🟢	Restaurants, groceries, dining
Transport	Blue 🔵	Fuel, tickets, rideshare
Entertainment	Yellow 🟡	Movies, games, hobbies
Bills	Red 🔴	Utilities, subscriptions, rent
🔧 Code Structure
Main JavaScript Functions
javascript
// CRUD Operations
addExpense()        // Create new expense
renderExpenses()    // Read and display expenses
editExpense()       // Prepare form for editing
updateExpense()     // Save edited expense
deleteExpense()     // Remove expense

// Analytics & UI
updateAnalytics()   // Refresh charts and stats
updateChart()       // Update doughnut chart
updateTotalAmount() // Calculate and display total
resetForm()         // Clear form inputs
Data Structure
javascript
{
  id: 123456789,           // Unique identifier
  name: "Groceries",       // Expense description
  amount: 45.50,           // Expense amount
  category: "Food",        // Expense category
  date: "2024-01-15"       // Creation date
}
🌟 Key Features Explained
Update Logic
The update functionality is the most complex part:

When "Edit" is clicked, the form switches to update mode

Original data is pre-filled into the form inputs

The submit button changes from "Add" to "Update"

On submission, the specific expense is found by ID and updated

The form resets to "Add" mode after update

LocalStorage Integration
Data automatically saves on every CRUD operation

Persists between browser sessions

Loads immediately on page refresh

Responsive Design
Bootstrap grid system for layout

Mobile-friendly table with horizontal scrolling

Adaptive button layouts for different screen sizes
