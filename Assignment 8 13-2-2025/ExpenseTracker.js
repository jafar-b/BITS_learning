var expenseForm = document.getElementById("expenseForm");
var expenseList = document.getElementById("expenseList");
var filterBtn = document.getElementById("filterBtn");
var Category;
(function (Category) {
    Category["Other"] = "Other";
    Category["Food"] = "Food";
    Category["Travel"] = "Travel";
    Category["Shopping"] = "Shopping";
    Category["Medical"] = "Medical";
})(Category || (Category = {}));
var storedExpenseList = JSON.parse(localStorage.getItem("expenses") || "[]");
// load existing expenses from localStorage
storedExpenseList.forEach(renderExpense);
function handleForm(e) {
    e.preventDefault();
    var description = document.getElementById("description").value;
    var amount = document.getElementById("amount").value;
    var dateInput = document.getElementById("date").value;
    var category = document.getElementById("category").value;
    var date = formatDate(dateInput);
    var nextId = storedExpenseList.length + 1;
    var expense = { id: nextId, description: description, amount: amount, date: date, category: category };
    storedExpenseList.push(expense);
    localStorage.setItem("expenses", JSON.stringify(storedExpenseList));
    renderExpense(expense);
    expenseForm.reset(); //resets the input
}
function renderExpense(expense) {
    var _a;
    var row = document.createElement("tr");
    row.id = "expense-".concat(expense.id);
    row.innerHTML = "\n        <td>".concat(expense.description, "</td>\n        <td>").concat(expense.amount, "</td>\n        <td>").concat(expense.date, "</td>\n        <td>").concat(expense.category, "</td>\n        <td><button class=\"btn btn-danger btn-sm delete-btn\" data-id=\"").concat(expense.id, "\">Delete</button></td>\n    ");
    expenseList === null || expenseList === void 0 ? void 0 : expenseList.appendChild(row);
    (_a = row.querySelector(".delete-btn")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () { return deleteExpense(expense.id); });
}
function filterExpenses() {
    expenseList.innerHTML = "";
    var selectedCategory = document.getElementById("filterCategory").value;
    var selectedDate = document.getElementById("filterDate").value;
    var filteredList = storedExpenseList.filter(function (expense) {
        var matchesCategory = selectedCategory ? expense.category === selectedCategory : true;
        //used ternary operator that checks if selectedCategory is there, and if it is, then it checks if expense.category =selectedCategory otherwise returns true so that, it checks for the other condition---date
        var matchesDate = selectedDate ? expense.date === formatDate(selectedDate) : true;
        return matchesCategory && matchesDate;
    });
    filteredList.forEach(renderExpense);
}
function deleteExpense(id) {
    var _a;
    storedExpenseList = storedExpenseList.filter(function (expense) { return expense.id !== id; });
    localStorage.setItem("expenses", JSON.stringify(storedExpenseList));
    (_a = document.getElementById("expense-".concat(id))) === null || _a === void 0 ? void 0 : _a.remove();
    console.log("Deleted expense with id ".concat(id));
}
function formatDate(inputDate) {
    var _a = inputDate.split("-"), year = _a[0], month = _a[1], day = _a[2];
    return "".concat(day, "-").concat(month, "-").concat(year);
}
expenseForm === null || expenseForm === void 0 ? void 0 : expenseForm.addEventListener("submit", handleForm);
filterBtn === null || filterBtn === void 0 ? void 0 : filterBtn.addEventListener("click", filterExpenses);
