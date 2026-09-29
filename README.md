# Expense Tracker

A responsive and user-friendly **Expense Tracker Web Application** built using **HTML, CSS, and Vanilla JavaScript**.

This project was developed as part of the **Software Developer Intern recruitment task for Lean Transition Solutions (LTS)**.

The application allows users to manage income and expense transactions, view financial summaries, filter and search transactions, and analyze spending through category-based charts. All transaction data is stored locally in the browser using **Local Storage**, allowing it to persist even after refreshing the page.

---

## Features

### Core Features

* Add income transactions
* Add expense transactions
* Enter transaction amount, category, date, and description
* Edit existing transactions
* Delete transactions with confirmation
* View total income
* View total expenses
* View current balance
* Filter transactions by:

  * Income
  * Expense
  * Category
* Search transactions by category or description
* Sort transactions by:

  * Newest
  * Oldest
  * Highest amount
  * Lowest amount
* Persist transaction data using Browser Local Storage
* Restore saved transactions automatically after page refresh

---

## Optional Bonus Features

The application also implements all the optional bonus requirements mentioned in the task.

### Monthly Summary

Users can select a month and view:

* Monthly income
* Monthly expenses
* Monthly balance

### Category-wise Expense Chart

The application provides a visual breakdown of expenses by category using a responsive bar chart.

### Validation and Helpful Error Messages

Form validation is implemented for:

* Amount
* Category
* Date
* Description

Users receive clear error messages when invalid or incomplete information is submitted.

---

## Additional Enhancements

Beyond the specified requirements, the application includes several additional usability and accessibility improvements.

### Financial Visualization

* Monthly expense pie chart
* Monthly income pie chart
* Category percentages
* Total amount displayed at the center of pie charts
* Interactive chart legends

### Transaction Management

* Transaction count
* Dynamic category filter
* Empty-state interface when no transactions are available
* Delete confirmation modal
* Edit mode with cancel option

### User Experience

* Success and error toast notifications
* Automatic current date selection
* Automatic current month selection
* Description character counter
* Indian Rupee (INR) currency formatting
* Smooth scrolling to the transaction form
* Hover and focus states
* Responsive layouts for different screen sizes

### Accessibility

* Accessible button labels
* Keyboard-friendly interactions
* Visible focus states
* Reduced-motion support
* Semantic HTML structure
* ARIA attributes where appropriate

---

## Technology Stack

| Technology          | Purpose                                        |
| ------------------- | ---------------------------------------------- |
| HTML5               | Application structure and semantic markup      |
| CSS3                | Styling, layout, responsiveness, and UI design |
| JavaScript (ES6+)   | Application logic and interactivity            |
| Local Storage API   | Persistent browser-side data storage           |
| CSS Grid            | Responsive page layouts                        |
| CSS Flexbox         | Component alignment and layouts                |
| JavaScript Intl API | INR currency and date formatting               |

No external frontend framework or JavaScript library is required.

---

## Application Structure

```text
expense-tracker/
│
├── index.html
├── style.css
├── script.js
├── README.md
└── assets/
    └── ...
```

> The exact folder and asset structure may vary depending on the final repository version.

---

## How the Application Works

### 1. Add a Transaction

The user selects either:

* Income
* Expense

Then enters:

* Amount
* Category
* Date
* Description

After successful validation, the transaction is added to the application.

### 2. Edit a Transaction

Each transaction provides an edit action.

When selected:

1. The existing transaction data is loaded into the form.
2. The form switches to edit mode.
3. The user can modify the information.
4. The updated transaction is saved to Local Storage.

### 3. Delete a Transaction

Users can delete a transaction using the delete action.

Before deletion, the application displays a confirmation modal to help prevent accidental deletion.

### 4. Data Persistence

Transactions are stored using the browser's Local Storage API.

The application automatically loads saved transactions when it starts.

Therefore, transaction data remains available after:

* Page refresh
* Browser tab reopening

as long as the browser's Local Storage data has not been cleared.

---

## Validation

The application validates transaction data before saving.

### Amount

The amount must:

* Be a valid number
* Be greater than zero

Example error:

```text
Amount must be greater than 0.
```

### Category

The category cannot be empty.

Example error:

```text
Please enter a category.
```

### Date

A transaction date is required.

Example error:

```text
Please select a date.
```

### Description

The description is limited to 200 characters.

Example error:

```text
Description cannot exceed 200 characters.
```

---

## Financial Calculations

The dashboard automatically calculates:

### Total Income

The sum of all income transactions.

### Total Expenses

The sum of all expense transactions.

### Current Balance

```text
Current Balance = Total Income - Total Expenses
```

Monthly calculations use the same logic but only consider transactions belonging to the selected month.

---

## Filtering and Search

Transactions can be filtered using:

### Type

* All
* Income
* Expense

### Category

The category filter is generated dynamically from the available transaction data.

### Search

Users can search transaction records using:

* Category
* Description

Search is case-insensitive.

---

## Sorting

Transactions can be sorted by:

* Newest
* Oldest
* Highest amount
* Lowest amount

Sorting is applied to the currently filtered transaction list.

---

## Charts and Visualization

The application includes three types of financial visualization.

### Expense Category Chart

Displays total expenses grouped by category.

### Expense Pie Chart

Displays the selected month's expenses by category, including:

* Category name
* Amount
* Percentage

### Income Pie Chart

Displays the selected month's income by category.

These visualizations provide a quick overview of the user's financial activity.

---

## Responsive Design

The application is designed to work across different screen sizes.

Responsive layouts are provided for:

* Desktop
* Laptop
* Tablet
* Mobile
* Small mobile devices

The interface automatically adjusts:

* Dashboard cards
* Forms
* Charts
* Filters
* Transaction cards
* Modal dialogs
* Buttons
* Navigation/header layout

---

## Running the Application

No backend server or database setup is required.

### Option 1 — Open Directly

Clone or download the repository and open:

```text
index.html
```

in a modern web browser.

### Option 2 — Using VS Code

1. Clone the repository.
2. Open the project folder in Visual Studio Code.
3. Open `index.html`.
4. Run the application using a local development server such as **Live Server**.

---

## Browser Compatibility

The application is designed for modern browsers supporting standard HTML5, CSS3, and JavaScript features.

Recommended browsers include:

* Google Chrome
* Microsoft Edge
* Mozilla Firefox
* Safari

---

## Data Storage

This project uses browser-side Local Storage instead of a backend database.

### Storage Key

```text
lts-expense-tracker-transactions
```

The transaction data is stored as JSON.

No transaction data is sent to an external server.

---

## Security and Data Considerations

This application is a client-side demonstration project.

Transaction data is stored locally in the user's browser. Clearing browser site data or Local Storage will remove the stored transactions.

The application does not include authentication or server-side data storage.

---

## Design Approach

The interface follows a clean and minimal dashboard-style design with an emphasis on:

* Readability
* Clear financial hierarchy
* Consistent spacing
* Responsive layouts
* Accessible controls
* Visual feedback
* Simple transaction management

The design uses separate visual treatments for:

* Income
* Expenses
* Balance
* Primary actions
* Validation errors
* Empty states

---

## Project Objective

The objective of this project was to demonstrate practical frontend development skills using fundamental web technologies.

The implementation focuses on:

* DOM manipulation
* Event handling
* Form handling
* Data validation
* Array methods
* Dynamic UI rendering
* Local Storage
* Responsive CSS
* Reusable JavaScript functions
* User experience
* Accessibility considerations


## Future Improvements

Potential future enhancements could include:

* User authentication
* Backend API integration
* Cloud database storage
* Multiple user accounts
* Export transactions to CSV/PDF
* Budget limits and alerts
* Recurring transactions
* Advanced financial reports
* Dark mode
* Data import/export
* Cloud synchronization

---

## Author

**Anoodh A**

Developed as part of the **Software Developer Intern recruitment task for Lean Transition Solutions (LTS)**.

---

## License

This project was created for an internship recruitment task and demonstration purposes.
