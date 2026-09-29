"use strict";

const STORAGE_KEY = "lts-expense-tracker-transactions";

let transactions = [];
let editingTransactionId = null;
let transactionToDeleteId = null;
let toastTimeout;

const transactionForm = document.querySelector("#transactionForm");
const amountInput = document.querySelector("#amount");
const categoryInput = document.querySelector("#category");
const categorySuggestions = document.querySelector("#categorySuggestions");
const dateInput = document.querySelector("#date");
const descriptionInput = document.querySelector("#description");
const descriptionCount = document.querySelector("#descriptionCount");

const formTitle = document.querySelector("#formTitle");
const submitButton = document.querySelector("#submitButton");
const cancelEditButton = document.querySelector("#cancelEditButton");

const totalIncome = document.querySelector("#totalIncome");
const totalExpenses = document.querySelector("#totalExpenses");
const currentBalance = document.querySelector("#currentBalance");

const searchInput = document.querySelector("#searchInput");
const typeFilter = document.querySelector("#typeFilter");
const categoryFilter = document.querySelector("#categoryFilter");
const sortFilter = document.querySelector("#sortFilter");

const transactionList = document.querySelector("#transactionList");
const transactionCount = document.querySelector("#transactionCount");
const emptyState = document.querySelector("#emptyState");

const headerAddButton = document.querySelector("#headerAddButton");
const emptyAddButton = document.querySelector("#emptyAddButton");

const summaryMonth = document.querySelector("#summaryMonth");
const monthlyIncome = document.querySelector("#monthlyIncome");
const monthlyExpenses = document.querySelector("#monthlyExpenses");
const monthlyBalance = document.querySelector("#monthlyBalance");

const categoryChart = document.querySelector("#categoryChart");

const pieChart = document.querySelector("#pieChart");
const pieTotal = document.querySelector("#pieTotal");
const pieLegend = document.querySelector("#pieLegend");

const incomePieChart = document.querySelector("#incomePieChart");
const incomePieTotal = document.querySelector("#incomePieTotal");
const incomePieLegend = document.querySelector("#incomePieLegend");

const deleteModal = document.querySelector("#deleteModal");
const cancelDeleteButton = document.querySelector("#cancelDeleteButton");
const confirmDeleteButton = document.querySelector("#confirmDeleteButton");

const toast = document.querySelector("#toast");

const amountError = document.querySelector("#amountError");
const categoryError = document.querySelector("#categoryError");
const dateError = document.querySelector("#dateError");
const descriptionError = document.querySelector("#descriptionError");

const EXPENSE_PIE_COLORS = [
    "#334155",
    "#2563eb",
    "#0f766e",
    "#7c3aed",
    "#b45309",
    "#be5a4a",
    "#0e7490",
    "#64748b",
    "#475569",
    "#6d5bd0"
];

const INCOME_PIE_COLORS = [
    "#0f766e",
    "#2563eb",
    "#15803d",
    "#4f46e5",
    "#0891b2",
    "#64748b",
    "#166534",
    "#1d4ed8"
];

document.addEventListener("DOMContentLoaded", initializeApp);

function initializeApp() {
    loadTransactions();
    setDefaultDate();
    setDefaultSummaryMonth();
    updateDescriptionCount();
    renderApplication();
    attachEventListeners();
}

function attachEventListeners() {
    transactionForm.addEventListener("submit", handleFormSubmit);
    cancelEditButton.addEventListener("click", cancelEdit);
    headerAddButton.addEventListener("click", scrollToForm);
    emptyAddButton.addEventListener("click", scrollToForm);
    descriptionInput.addEventListener("input", updateDescriptionCount);
    searchInput.addEventListener("input", renderApplication);
    typeFilter.addEventListener("change", renderApplication);
    categoryFilter.addEventListener("change", renderApplication);
    sortFilter.addEventListener("change", renderApplication);

    summaryMonth.addEventListener("change", () => {
        updateMonthlySummary();
        renderPieChart();
        renderIncomePieChart();
    });

    transactionList.addEventListener("click", handleTransactionAction);
    cancelDeleteButton.addEventListener("click", closeDeleteModal);
    confirmDeleteButton.addEventListener("click", confirmDelete);
    deleteModal.addEventListener("click", handleModalBackdropClick);
    document.addEventListener("keydown", handleKeyboardEvents);
}

function loadTransactions() {
    try {
        const storedData = localStorage.getItem(STORAGE_KEY);

        if (!storedData) {
            transactions = [];
            return;
        }

        const parsedData = JSON.parse(storedData);

        transactions = Array.isArray(parsedData)
            ? parsedData.filter(isValidStoredTransaction)
            : [];
    } catch (error) {
        console.warn("Unable to load saved transactions.", error);
        transactions = [];
    }
}

function saveTransactions() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
        return true;
    } catch (error) {
        showToast("Unable to save data. Please check browser storage.");
        console.error("Local storage error:", error);
        return false;
    }
}

function isValidStoredTransaction(transaction) {
    return (
        transaction &&
        typeof transaction.id === "string" &&
        (transaction.type === "income" || transaction.type === "expense") &&
        typeof transaction.amount === "number" &&
        Number.isFinite(transaction.amount) &&
        transaction.amount > 0 &&
        typeof transaction.category === "string" &&
        transaction.category.trim() &&
        typeof transaction.date === "string" &&
        transaction.date.trim() &&
        typeof transaction.description === "string"
    );
}

function handleFormSubmit(event) {
    event.preventDefault();
    clearValidationErrors();

    const data = getFormData();
    const validation = validateTransaction(data);

    if (!validation.isValid) {
        displayValidationErrors(validation.errors);
        return;
    }

    editingTransactionId ? updateTransaction(data) : addTransaction(data);
}

function getFormData() {
    const selectedType = document.querySelector(
        'input[name="type"]:checked'
    );

    return {
        type: selectedType ? selectedType.value : "expense",
        amount: Number(amountInput.value),
        category: categoryInput.value.trim(),
        date: dateInput.value,
        description: descriptionInput.value.trim()
    };
}

function validateTransaction(data) {
    const errors = {};

    if (!Number.isFinite(data.amount) || data.amount <= 0) {
        errors.amount = "Amount must be greater than 0.";
    }

    if (!data.category) {
        errors.category = "Please enter a category.";
    }

    if (!data.date) {
        errors.date = "Please select a date.";
    }

    if (data.description.length > 200) {
        errors.description = "Description cannot exceed 200 characters.";
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
}

function displayValidationErrors(errors) {
    if (errors.amount) amountError.textContent = errors.amount;
    if (errors.category) categoryError.textContent = errors.category;
    if (errors.date) dateError.textContent = errors.date;
    if (errors.description) {
        descriptionError.textContent = errors.description;
    }
}

function clearValidationErrors() {
    amountError.textContent = "";
    categoryError.textContent = "";
    dateError.textContent = "";
    descriptionError.textContent = "";
}

function addTransaction(data) {
    const transaction = {
        id: generateTransactionId(),
        type: data.type,
        amount: data.amount,
        category: data.category,
        date: data.date,
        description: data.description
    };

    transactions.push(transaction);

    if (!saveTransactions()) {
        transactions.pop();
        return;
    }

    resetForm();
    renderApplication();
    showToast("Transaction added successfully.");
}

function startEditingTransaction(id) {
    const transaction = transactions.find(item => item.id === id);

    if (!transaction) return;

    editingTransactionId = id;

    const typeRadio = document.querySelector(
        `input[name="type"][value="${transaction.type}"]`
    );

    if (typeRadio) typeRadio.checked = true;

    amountInput.value = transaction.amount;
    categoryInput.value = transaction.category;
    dateInput.value = transaction.date;
    descriptionInput.value = transaction.description;

    formTitle.textContent = "Edit Transaction";
    submitButton.textContent = "Update Transaction";
    cancelEditButton.classList.remove("hidden");

    updateDescriptionCount();
    clearValidationErrors();
    scrollToForm();
}

function updateTransaction(data) {
    const index = transactions.findIndex(
        item => item.id === editingTransactionId
    );

    if (index === -1) return;

    const previousTransaction = { ...transactions[index] };

    transactions[index] = {
        ...transactions[index],
        type: data.type,
        amount: data.amount,
        category: data.category,
        date: data.date,
        description: data.description
    };

    if (!saveTransactions()) {
        transactions[index] = previousTransaction;
        return;
    }

    resetForm();
    renderApplication();
    showToast("Transaction updated successfully.");
}

function cancelEdit() {
    resetForm();
    showToast("Edit cancelled.");
}

function requestDeleteTransaction(id) {
    if (!transactions.some(item => item.id === id)) return;

    transactionToDeleteId = id;
    openDeleteModal();
}

function confirmDelete() {
    if (!transactionToDeleteId) return;

    const originalTransactions = [...transactions];

    transactions = transactions.filter(
        item => item.id !== transactionToDeleteId
    );

    if (!saveTransactions()) {
        transactions = originalTransactions;
        closeDeleteModal();
        return;
    }

    if (editingTransactionId === transactionToDeleteId) {
        resetForm();
    }

    transactionToDeleteId = null;
    closeDeleteModal();
    renderApplication();
    showToast("Transaction deleted.");
}

function openDeleteModal() {
    deleteModal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
    cancelDeleteButton.focus();
}

function closeDeleteModal() {
    deleteModal.classList.add("hidden");
    document.body.style.overflow = "";
    transactionToDeleteId = null;
}

function handleModalBackdropClick(event) {
    if (event.target === deleteModal) {
        closeDeleteModal();
    }
}

function handleTransactionAction(event) {
    const button = event.target.closest("button[data-action]");

    if (!button) return;

    const { id, action } = button.dataset;

    if (action === "edit") {
        startEditingTransaction(id);
    } else if (action === "delete") {
        requestDeleteTransaction(id);
    }
}

function renderApplication() {
    updateDashboard();
    updateCategoryFilter();
    renderTransactions();
    updateMonthlySummary();
    renderCategoryChart();
    renderPieChart();
    renderIncomePieChart();
}

function updateDashboard() {
    const income = transactions
        .filter(transaction => transaction.type === "income")
        .reduce((total, transaction) => total + transaction.amount, 0);

    const expenses = transactions
        .filter(transaction => transaction.type === "expense")
        .reduce((total, transaction) => total + transaction.amount, 0);

    totalIncome.textContent = formatCurrency(income);
    totalExpenses.textContent = formatCurrency(expenses);
    currentBalance.textContent = formatCurrency(income - expenses);
}

function getFilteredTransactions() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    const selectedType = typeFilter.value;
    const selectedCategory = categoryFilter.value;

    const filtered = transactions.filter(transaction => {
        const matchesSearch =
            !searchTerm ||
            transaction.category.toLowerCase().includes(searchTerm) ||
            transaction.description.toLowerCase().includes(searchTerm);

        const matchesType =
            selectedType === "all" ||
            transaction.type === selectedType;

        const matchesCategory =
            selectedCategory === "all" ||
            transaction.category === selectedCategory;

        return matchesSearch && matchesType && matchesCategory;
    });

    return sortTransactions(filtered);
}

function sortTransactions(list) {
    const sorted = [...list];

    switch (sortFilter.value) {
        case "oldest":
            sorted.sort(
                (a, b) => getDateValue(a.date) - getDateValue(b.date)
            );
            break;
        case "highest":
            sorted.sort((a, b) => b.amount - a.amount);
            break;
        case "lowest":
            sorted.sort((a, b) => a.amount - b.amount);
            break;
        default:
            sorted.sort(
                (a, b) => getDateValue(b.date) - getDateValue(a.date)
            );
    }

    return sorted;
}

function updateCategoryFilter() {
    const currentValue = categoryFilter.value;

    const categories = [
        ...new Set(
            transactions
                .map(transaction => transaction.category.trim())
                .filter(Boolean)
        )
    ].sort((a, b) => a.localeCompare(b));

    categoryFilter.innerHTML =
        '<option value="all">All Categories</option>';

    categories.forEach(category => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });

    categoryFilter.value = categories.includes(currentValue)
        ? currentValue
        : "all";

    categorySuggestions.innerHTML = "";

    categories.forEach(category => {
        const option = document.createElement("option");
        option.value = category;
        categorySuggestions.appendChild(option);
    });     
}

function renderTransactions() {
    const filteredTransactions = getFilteredTransactions();

    transactionList.innerHTML = "";

    transactionCount.textContent = `${filteredTransactions.length} ${
        filteredTransactions.length === 1
            ? "transaction"
            : "transactions"
    }`;

    if (!filteredTransactions.length) {
        transactionList.classList.add("hidden");
        emptyState.classList.remove("hidden");
        return;
    }

    transactionList.classList.remove("hidden");
    emptyState.classList.add("hidden");

    const fragment = document.createDocumentFragment();

    filteredTransactions.forEach(transaction => {
        fragment.appendChild(createTransactionElement(transaction));
    });

    transactionList.appendChild(fragment);
}

function createTransactionElement(transaction) {
    const article = document.createElement("article");
    article.className = `transaction-item ${transaction.type}`;

    const icon = document.createElement("div");
    icon.className = "transaction-type-icon";
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = transaction.type === "income" ? "↑" : "↓";

    const main = document.createElement("div");
    main.className = "transaction-main";

    const category = document.createElement("p");
    category.className = "transaction-category";
    category.textContent = transaction.category;

    const description = document.createElement("p");
    description.className = "transaction-description";
    description.textContent =
        transaction.description || "No description";

    main.append(category, description);

    const meta = document.createElement("div");
    meta.className = "transaction-meta";
    meta.textContent = formatDisplayDate(transaction.date);

    const amount = document.createElement("div");
    amount.className = "transaction-amount";
    amount.textContent =
        `${transaction.type === "income" ? "+" : "-"}${formatCurrency(
            transaction.amount
        )}`;

    const actions = document.createElement("div");
    actions.className = "transaction-actions";

    const editButton = createActionButton(
        "edit",
        transaction.id,
        `Edit ${transaction.category} transaction`,
        "Edit",
        "✎"
    );

    const deleteButton = createActionButton(
        "delete",
        transaction.id,
        `Delete ${transaction.category} transaction`,
        "Delete",
        "×"
    );

    deleteButton.classList.add("delete");

    actions.append(editButton, deleteButton);
    article.append(icon, main, meta, amount, actions);

    return article;
}

function createActionButton(action, id, label, title, text) {
    const button = document.createElement("button");

    button.type = "button";
    button.className = "icon-button";
    button.dataset.action = action;
    button.dataset.id = id;
    button.setAttribute("aria-label", label);
    button.title = title;
    button.textContent = text;

    return button;
}

function updateMonthlySummary() {
    const selectedMonth = summaryMonth.value;

    if (!selectedMonth) {
        monthlyIncome.textContent = formatCurrency(0);
        monthlyExpenses.textContent = formatCurrency(0);
        monthlyBalance.textContent = formatCurrency(0);
        return;
    }

    const monthlyTransactions = transactions.filter(transaction =>
        transaction.date.startsWith(selectedMonth)
    );

    const income = monthlyTransactions
        .filter(transaction => transaction.type === "income")
        .reduce((total, transaction) => total + transaction.amount, 0);

    const expenses = monthlyTransactions
        .filter(transaction => transaction.type === "expense")
        .reduce((total, transaction) => total + transaction.amount, 0);

    monthlyIncome.textContent = formatCurrency(income);
    monthlyExpenses.textContent = formatCurrency(expenses);
    monthlyBalance.textContent = formatCurrency(income - expenses);
}

function renderPieChart() {
    const selectedMonth = summaryMonth.value;
    const totals = {};

    transactions
        .filter(
            transaction =>
                transaction.type === "expense" &&
                selectedMonth &&
                transaction.date.startsWith(selectedMonth)
        )
        .forEach(transaction => {
            const category = transaction.category.trim();
            totals[category] = (totals[category] || 0) + transaction.amount;
        });

    renderPieData(
        entriesFromTotals(totals),
        pieChart,
        pieTotal,
        pieLegend,
        EXPENSE_PIE_COLORS,
        "expense"
    );
}

function renderIncomePieChart() {
    if (!incomePieChart) return;

    const selectedMonth = summaryMonth.value;
    const totals = {};

    transactions
        .filter(
            transaction =>
                transaction.type === "income" &&
                selectedMonth &&
                transaction.date.startsWith(selectedMonth)
        )
        .forEach(transaction => {
            const category = transaction.category.trim();
            totals[category] = (totals[category] || 0) + transaction.amount;
        });

    renderPieData(
        entriesFromTotals(totals),
        incomePieChart,
        incomePieTotal,
        incomePieLegend,
        INCOME_PIE_COLORS,
        "income"
    );
}

function entriesFromTotals(totals) {
    return Object.entries(totals).sort((a, b) => b[1] - a[1]);
}

function renderPieData(entries, chart, totalElement, legend, colors, type) {
    const selectedMonth = summaryMonth.value;
    const total = entries.reduce((sum, [, amount]) => sum + amount, 0);

    legend.innerHTML = "";
    totalElement.textContent = formatCurrency(total);

    if (!entries.length) {
        chart.style.background = "#edf0f5";
        chart.setAttribute(
            "aria-label",
            `No ${type} data for ${selectedMonth || "the selected month"}`
        );

        const empty = document.createElement("li");
        empty.className = "chart-empty";
        empty.textContent =
            type === "income"
                ? "No income in this month."
                : "No expenses in this month.";

        legend.appendChild(empty);
        return;
    }

    let currentAngle = 0;
    const stops = [];

    entries.forEach(([category, amount], index) => {
        const color = colors[index % colors.length];
        const percentage = (amount / total) * 100;
        const nextAngle = currentAngle + percentage;

        stops.push(`${color} ${currentAngle}% ${nextAngle}%`);
        currentAngle = nextAngle;

        const item = document.createElement("li");

        const dot = document.createElement("span");
        dot.className = "legend-dot";
        dot.style.background = color;
        dot.setAttribute("aria-hidden", "true");

        const name = document.createElement("span");
        name.className = "legend-name";
        name.textContent = category;

        const value = document.createElement("span");
        value.className = "legend-value";
        value.textContent = formatCurrency(amount);

        const percent = document.createElement("small");
        percent.textContent = `${percentage.toFixed(1)}%`;

        value.appendChild(percent);
        item.append(dot, name, value);
        legend.appendChild(item);
    });

    chart.style.background = `conic-gradient(${stops.join(", ")})`;

    chart.setAttribute(
        "aria-label",
        `${type === "income" ? "Income" : "Expense"} breakdown for ${
            selectedMonth
        }: ${entries.map(([category]) => category).join(", ")}`
    );
}

function renderCategoryChart() {
    const expenses = transactions.filter(
        transaction => transaction.type === "expense"
    );

    categoryChart.innerHTML = "";

    if (!expenses.length) {
        const empty = document.createElement("p");
        empty.className = "chart-empty";
        empty.textContent = "No expense data available.";
        categoryChart.appendChild(empty);
        return;
    }

    const totals = {};

    expenses.forEach(transaction => {
        const category = transaction.category.trim();
        totals[category] = (totals[category] || 0) + transaction.amount;
    });

    const categories = Object.entries(totals).sort(
        (a, b) => b[1] - a[1]
    );

    const maximumAmount = categories[0][1];

    categories.forEach(([category, amount]) => {
        const row = document.createElement("div");
        row.className = "chart-row";

        const name = document.createElement("span");
        name.className = "chart-category";
        name.textContent = category;

        const wrapper = document.createElement("div");
        wrapper.className = "chart-bar-wrapper";

        const bar = document.createElement("div");
        bar.className = "chart-bar";
        bar.style.width = `${(amount / maximumAmount) * 100}%`;

        const value = document.createElement("span");
        value.className = "chart-amount";
        value.textContent = formatCurrency(amount);

        wrapper.appendChild(bar);
        row.append(name, wrapper, value);
        categoryChart.appendChild(row);
    });
}

function resetForm() {
    transactionForm.reset();
    editingTransactionId = null;

    formTitle.textContent = "Add Transaction";
    submitButton.textContent = "Add Transaction";
    cancelEditButton.classList.add("hidden");

    clearValidationErrors();
    setDefaultDate();
    updateDescriptionCount();
}

function setDefaultDate() {
    if (!dateInput.value) {
        dateInput.value = getTodayDateString();
    }
}

function setDefaultSummaryMonth() {
    if (!summaryMonth.value) {
        summaryMonth.value = getCurrentMonthString();
    }
}

function updateDescriptionCount() {
    descriptionCount.textContent = descriptionInput.value.length;
}

function showToast(message) {
    clearTimeout(toastTimeout);

    toast.textContent = message;
    toast.classList.add("show");

    toastTimeout = setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}

function generateTransactionId() {
    if (
        typeof crypto !== "undefined" &&
        typeof crypto.randomUUID === "function"
    ) {
        return crypto.randomUUID();
    }

    return `${Date.now().toString(36)}-${Math.random()
        .toString(36)
        .slice(2, 10)}`;
}

function formatCurrency(amount) {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(amount);
}

function formatDisplayDate(dateString) {
    const [year, month, day] = dateString.split("-").map(Number);
    const date = new Date(year, month - 1, day);

    return new Intl.DateTimeFormat("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    }).format(date);
}

function getDateValue(dateString) {
    const [year, month, day] = dateString.split("-").map(Number);
    return new Date(year, month - 1, day).getTime();
}

function getTodayDateString() {
    const today = new Date();

    return [
        today.getFullYear(),
        String(today.getMonth() + 1).padStart(2, "0"),
        String(today.getDate()).padStart(2, "0")
    ].join("-");
}

function getCurrentMonthString() {
    const today = new Date();

    return `${today.getFullYear()}-${String(
        today.getMonth() + 1
    ).padStart(2, "0")}`;
}

function scrollToForm() {
    const formSection = document.querySelector("#transactionFormSection");

    formSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

    setTimeout(() => {
        amountInput.focus();
    }, 400);
}

function handleKeyboardEvents(event) {
    if (
        event.key === "Escape" &&
        !deleteModal.classList.contains("hidden")
    ) {
        closeDeleteModal();
    }
}

