// script.js

document.addEventListener("DOMContentLoaded", loadExpenses);

const addExpenseButton = document.getElementById("add-expense");
const expenseList = document.getElementById("expense-list");

addExpenseButton.addEventListener("click", addExpense);

function addExpense() {
    const amount = document.getElementById("amount").value;
    const description = document.getElementById("description").value;
    const category = document.getElementById("category").value;

    if (amount && description) {
        const expense = {
            id: Date.now(),
            amount,
            description,
            category
        };

        saveExpenseToLocalStorage(expense);
        displayExpense(expense);

        document.getElementById("amount").value = "";
        document.getElementById("description").value = "";
    } else {
        alert("Please enter both amount and description.");
    }
}

function saveExpenseToLocalStorage(expense) {
    let expenses = getExpensesFromLocalStorage();
    expenses.push(expense);
    localStorage.setItem("expenses", JSON.stringify(expenses));
}

function getExpensesFromLocalStorage() {
    const expenses = JSON.parse(localStorage.getItem("expenses"));
    return expenses ? expenses : [];
}

function displayExpense(expense) {
    const li = document.createElement("li");
    li.id = expense.id;
    li.innerHTML = `
        ${expense.amount} - ${expense.description} (${expense.category})
        <div>
            <button onclick="editExpense(${expense.id})">Edit</button>
            <button onclick="deleteExpense(${expense.id})">Delete</button>
        </div>
    `;
    expenseList.appendChild(li);
}

function loadExpenses() {
    const expenses = getExpensesFromLocalStorage();
    expenses.forEach(displayExpense);
}

function deleteExpense(id) {
    let expenses = getExpensesFromLocalStorage();
    expenses = expenses.filter(expense => expense.id !== id);
    localStorage.setItem("expenses", JSON.stringify(expenses));
    document.getElementById(id).remove();
}

function editExpense(id) {
    const expenses = getExpensesFromLocalStorage();
    const expenseToEdit = expenses.find(expense => expense.id === id);

    document.getElementById("amount").value = expenseToEdit.amount;
    document.getElementById("description").value = expenseToEdit.description;
    document.getElementById("category").value = expenseToEdit.category;

    deleteExpense(id);
}
