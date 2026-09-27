let income = document.getElementById("income");
let expenseName = document.getElementById("expenseName");
let expenseAmount = document.getElementById("expenseAmount");
let expenseCategory = document.getElementById("expenseCategory");

let expenseList = document.getElementById("expenseList");

let addExpenseBtn = document.getElementById("addExpenseBtn");
let resetBtn = document.getElementById("resetBtn");
let incomeBtn = document.getElementById("incomeBtn");

let totalIncome = document.getElementById("totalIncome");
let totalExpenses = document.getElementById("totalExpenses");
let remainingBalance = document.getElementById("remainingBalance");
let budgetStatus = document.getElementById("budgetStatus");
let highestExpense = document.getElementById("highestExpense");
let lowestExpense = document.getElementById("lowestExpense");

let expenses = [];

let savedExpenses = localStorage.getItem("expenses");

if (savedExpenses) {
    expenses = JSON.parse(savedExpenses);
}


const renderExpenses = () => {

    expenseList.innerHTML = "";

    for (let i = 0; i < expenses.length; i++) {

        let item = expenses[i];

        expenseList.innerHTML += `<div class="expense-item">

                    <div class="expense-info">

                        <strong>${item.name}</strong>

                        <span>${item.category}</span>

                    </div>

                    <strong class="expense-price">
                        Rs. ${item.amount}
                    </strong>

                    <button class="delete-btn" onclick="deleteExpense(${i})">
                        Delete
                    </button>

                </div>`
    }
};

// Add Expense Function

const addExpense = () => {

    if (expenseName.value.trim() === "") {
        Swal.fire({
            icon: "error",
            text: "Please Enter a Expense Name!",
        });
        return
    } else if (expenseAmount.value.trim() === "" || expenseAmount.value <= 0) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Please Enter a Expense Valid Amount!",
        });
        return
    } else if (expenseCategory.value === "") {
        Swal.fire({
            icon: "error",
            text: "Please Enter a Category!",
        });
        return
    }

    let expense = {
        name: expenseName.value,
        amount: Number(expenseAmount.value),
        category: expenseCategory.value
    };
    expenses.push(expense);

    localStorage.setItem("expenses", JSON.stringify(expenses));

    renderExpenses();


    expenseName.value = "";
    expenseAmount.value = "";
    expenseCategory.value = "";

    calculateExpense();
}


// Income Function

let userIncome = 0;

let savedIncome = localStorage.getItem("userIncome");

if (savedIncome) {
    userIncome = Number(savedIncome);
}

const addIncome = () => {

    let incomeInput = Number(income.value);

    if (incomeInput <= 0) {
        Swal.fire({
            icon: "error",
            text: "Please Enter your Income Amount!",
        });
        return;
    }

    userIncome = incomeInput;

    localStorage.setItem("userIncome", userIncome);

    income.value = "";

    calculateExpense();
}


// Calculate Expense

const calculateExpense = () => {

    if (userIncome === 0) {

        return
    } else {
        totalIncome.textContent = `Rs. ${userIncome}`;
    }

    // Total Expenses
    let total = 0;

    for (let i = 0; i < expenses.length; i++) {
        total += expenses[i].amount;
    }

    totalExpenses.textContent = `Rs. ${total}`;


    // Remaining Balance
    let balance = userIncome - total;

    remainingBalance.textContent = `Rs. ${balance}`;


    // Highest Expense
    if (expenses.length > 0) {

        let highest = expenses[0];

        for (let i = 0; i < expenses.length; i++) {
            if (expenses[i].amount > highest.amount) {
                highest = expenses[i];
            }
        }

        highestExpense.textContent = `Rs. ${highest.amount}`;


        // Lowest Expense
        let lowest = expenses[0];

        for (let i = 0; i < expenses.length; i++) {
            if (expenses[i].amount < lowest.amount) {
                lowest = expenses[i];
            }
        }

        lowestExpense.textContent = `Rs. ${lowest.amount}`;

    } else {

        highestExpense.textContent = "Rs. 0";
        lowestExpense.textContent = "Rs. 0";

    }


    // Budget Status

    if (userIncome <= 0) {
        budgetStatus.textContent = "Not Calculated";
    } else if (balance >= 0) {
        budgetStatus.textContent = "Within Budget";
    } else {
        budgetStatus.textContent = "Budget Exceeded";
    }

};


// Delete Fucntion

const deleteExpense = (index) => {
    expenses.splice(index, 1);

    localStorage.setItem("expenses", JSON.stringify(expenses));

    renderExpenses();

    calculateExpense();
}

// Reset Function

const resetAll = () => {

    income.value = "";
    expenseName.value = "";
    expenseAmount.value = "";
    expenseCategory.value = "";

    totalIncome.textContent = "Rs. 0";
    totalExpenses.textContent = "Rs. 0";
    remainingBalance.textContent = "Rs. 0";
    highestExpense.textContent = "Rs. 0";
    lowestExpense.textContent = "Rs. 0";
    budgetStatus.textContent = "Not Calculated";

    expenseList.textContent = "";
    expenses = [];

    localStorage.removeItem("expenses");
    localStorage.removeItem("userIncome");

    userIncome = 0;

}


incomeBtn.onclick = addIncome;
addExpenseBtn.onclick = addExpense;
resetBtn.onclick = resetAll;

renderExpenses();

if (userIncome > 0) {
    calculateExpense();
}