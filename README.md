# Expense Tracker

A responsive Expense Tracker web application built using HTML, CSS, and Vanilla JavaScript.

Users can manage income and expense transactions, view financial summaries, filter and search transactions, and keep their data saved in the browser using Local Storage.

---

## Features

- Add income and expense transactions (amount, category, date, description)
- Edit transactions
- Delete transactions with confirmation
- View total income, total expenses, and current balance
- Filter by income/expense and by category
- Search by description or category
- Sort transactions
- Category suggestions based on previously used categories
- Monthly income, expense, and balance summary
- Category-wise expense chart
- Income and expense visual charts
- Form validation with helpful error messages
- Toast notifications
- Responsive design
- Professional empty state
- Local Storage persistence (data remains after page refresh)

---

## Technologies Used

- HTML5
- CSS3
- Vanilla JavaScript
- Browser Local Storage
- CSS/HTML-based charts

No backend, database, framework, or external JavaScript library is required.

---

## Project Structure

```text
LTS-expense-tracker/
│
├── assets
|
├── css/
│   └── style.css
│
├── js/
│   └── script.js
│
├── index.html
└── README.md
```

---

## How to Run

**Option 1: VS Code Live Server**

1. Clone or download the repository.
2. Open the project folder in Visual Studio Code.
3. Install the Live Server extension if it is not already installed.
4. Right-click `index.html` and select **Open with Live Server**.

**Option 2: Open Directly in a Browser**

No backend server is needed. You can open `index.html` directly in a modern web browser.

---

## Application Overview

### Adding a Transaction

Select the type (Income or Expense) and enter the amount, category, date, and description. The description is optional. After submitting, the transaction is added to the list and the dashboard updates automatically.

### Editing Transactions

The selected transaction is loaded into the form. After modifying it and submitting, the existing transaction is updated and saved to Local Storage. Editing does not create a duplicate.

### Deleting Transactions

A confirmation step is shown before deleting. After deletion, the list, dashboard totals, charts, monthly summary, and Local Storage are all updated.

### Dashboard Calculations

The dashboard displays Total Income, Total Expenses, and Current Balance.

```text
Balance = Total Income - Total Expenses
```

These values update automatically when transactions are added, edited, or deleted.

### Filtering

Transactions can be filtered by type (All, Income, Expense) and by category. The category filter is populated automatically from the transaction data. Filters work together and update instantly without refreshing the page.

Example: Type `Expense` + Category `Food` shows only Food expenses.

### Search

Users can search by category or description (for example, `food`). Search can be used together with the filters.

### Sorting

Transactions can be sorted by date and amount. Sorting only changes the displayed list, not the stored data.

### Category Suggestions

Previously used categories (for example Food, Salary, Transport, Shopping, Bills) appear as suggestions when adding a new transaction. Users can still enter a new category.

### Local Storage

Transactions are saved in the browser's `localStorage`. The application:

- Saves transactions after changes and loads them on startup
- Preserves data after page refresh
- Updates stored data when transactions are edited or deleted
- Handles empty and invalid/corrupted stored data safely

Data is converted using `JSON.stringify()` and restored using `JSON.parse()`.

### Monthly Expense Summary

Users can select a month to view total income, total expenses, and balance for that month, based on transaction dates.

```text
January 2026
Income: ₹50,000 | Expenses: ₹20,000 | Balance: ₹30,000
```

### Category-wise Expense Chart

Expenses are grouped by category and the chart updates automatically when data changes.

```text
Food       → ₹8,000
Transport  → ₹3,000
Shopping   → ₹5,000
Bills      → ₹7,000
```

### Income and Expense Charts

Visual charts for income and expense data are generated using JavaScript and CSS-based chart UI. No external chart library is required.

### Validation

- Amount must be greater than zero
- Category is required
- Date is required
- Description cannot exceed 200 characters

Errors are displayed near the relevant form fields.

### Toast Notifications

Feedback is shown after important actions, such as transaction added, updated, or deleted, and storage-related errors.

### Empty State

When there are no transactions, a professional empty state guides the user to add their first transaction.

### Responsive Design

The layout adapts to mobile, tablet, laptop, and desktop using CSS media queries. It was considered for approximately 360px, 390px, 768px, 1024px, and 1440px, ensuring:

- Forms stack properly on smaller screens
- Transaction information remains readable
- Buttons remain easy to use
- Dashboard cards and charts adapt to screen width
- Horizontal overflow is avoided

---

## Data and Privacy

Transaction data is stored locally in the user's browser. The application does not use backend servers, external databases, or user authentication, and no data is sent to an external server.

---

## Browser Compatibility

Intended for modern browsers supporting HTML5, CSS3, JavaScript ES6+, Local Storage, and modern DOM APIs. Recommended: recent versions of Google Chrome, Microsoft Edge, and Mozilla Firefox.

---

## Testing Checklist

**Transaction Management**
- [x] Add income
- [x] Add expense
- [x] Edit transaction
- [x] Delete transaction
- [x] Delete confirmation

**Dashboard**
- [x] Total income, total expense, and current balance calculation

**Filtering and Search**
- [x] Transaction type filter
- [x] Category filter
- [x] Search
- [x] Sorting
- [x] Combined filtering and search

**Data Persistence**
- [x] Local Storage
- [x] Data persistence after refresh
- [x] Local Storage update after editing
- [x] Local Storage update after deleting

**Bonus Features**
- [x] Monthly expense summary
- [x] Category-wise expense chart
- [x] Income chart
- [x] Expense chart

**User Experience**
- [x] Form validation
- [x] Toast notifications
- [x] Empty state
- [x] Category suggestions
- [x] Responsive mobile layout
- [x] Responsive desktop layout
- [x] No horizontal scrolling on mobile
- [x] Browser console checked for errors

---

## Project Architecture

The project intentionally uses a simple frontend architecture to demonstrate core web development fundamentals.

- **HTML:** page structure, forms, dashboard cards, transaction list, filters, search controls, monthly summary, chart containers
- **CSS:** layout, responsive design, colors, typography, cards, buttons, form styling, breakpoints, hover states, transitions
- **JavaScript:** form handling, transaction creation/editing/deletion, dashboard calculations, filtering, searching, sorting, Local Storage, validation, monthly calculations, chart rendering, DOM updates, toast notifications

### Important JavaScript Concepts Used

DOM manipulation, `querySelector()`, `addEventListener()`, functions, arrays, objects, `map()`, `filter()`, `reduce()`, `find()`, `sort()`, `JSON.stringify()`, `JSON.parse()`, `localStorage.setItem()`, `localStorage.getItem()`, date handling, template literals, event handling, and form validation.

### No Backend Required

This is a frontend-only application. It does not require Node.js, Express, React, Firebase, authentication, a database, or an API.

The project focuses on strong fundamentals in HTML, CSS, JavaScript, DOM manipulation, arrays, objects, functions, events, forms, Local Storage, filtering, sorting, data calculations, and responsive UI.

---

## Getting the Project from GitHub

```bash
git clone https://github.com/anoodh-ai/expense-tracker-anoodh.git
```

Then open the project folder in Visual Studio Code and run `index.html` using Live Server.

**Repository:** https://github.com/anoodh-ai/expense-tracker-anoodh

---

## Author

**Anoodh**

GitHub: https://github.com/anoodh-ai

---

## Assignment

This project was developed as an internship recruitment assignment for an Expense Tracker Web Application. The implementation focuses on functionality, responsive design, Local Storage persistence, clean UI/UX, and core JavaScript fundamentals.
