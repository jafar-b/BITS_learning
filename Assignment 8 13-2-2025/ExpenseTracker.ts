const expenseForm = document.getElementById("expenseForm") as HTMLFormElement;
const expenseList = document.getElementById("expenseList") as HTMLTableSectionElement;
const filterBtn = document.getElementById("filterBtn") as HTMLButtonElement;

interface Expense {
    id: number;
    description: string;
    amount: string;
    date: string;
    category: Category;
}

enum Category {
    Other = "Other",
    Food = "Food",
    Travel = "Travel",
    Shopping = "Shopping",
    Medical = "Medical"
}

let storedExpenseList: Expense[] = JSON.parse(localStorage.getItem("expenses") || "[]");

// load existing expenses from localStorage
storedExpenseList.forEach(renderExpense);

function handleForm(e: Event): void {
    e.preventDefault();

    const description = (document.getElementById("description") as HTMLInputElement).value;
    const amount = (document.getElementById("amount") as HTMLInputElement).value;
    const dateInput = (document.getElementById("date") as HTMLInputElement).value;
    const category = (document.getElementById("category") as HTMLSelectElement).value as Category;

    const date = formatDate(dateInput);
    const nextId = storedExpenseList.length + 1;
    const expense: Expense = { id: nextId, description, amount, date, category };
    
    storedExpenseList.push(expense);
    localStorage.setItem("expenses", JSON.stringify(storedExpenseList));
    renderExpense(expense);

    expenseForm.reset(); //resets the input
}

function renderExpense(expense: Expense): void {
    const row = document.createElement("tr");
    row.id = `expense-${expense.id}`;

    row.innerHTML = `
        <td>${expense.description}</td>
        <td>${expense.amount}</td>
        <td>${expense.date}</td>
        <td>${expense.category}</td>
        <td><button class="btn btn-danger btn-sm delete-btn" data-id="${expense.id}">Delete</button></td>
    `;

    expenseList?.appendChild(row);

    row.querySelector(".delete-btn")?.addEventListener("click", () => deleteExpense(expense.id));
}

function filterExpenses(): void {
    expenseList.innerHTML = "";
    
    const selectedCategory = (document.getElementById("filterCategory") as HTMLSelectElement).value as Category;
    const selectedDate = (document.getElementById("filterDate") as HTMLInputElement).value;

    const filteredList = storedExpenseList.filter(expense => {
        const matchesCategory = selectedCategory ? expense.category === selectedCategory : true;   
        //used ternary operator that checks if selectedCategory is there, and if it is, then it checks if expense.category =selectedCategory otherwise returns true so that, it checks for the other condition---date
        const matchesDate = selectedDate ? expense.date === formatDate(selectedDate) : true;
        return matchesCategory && matchesDate;
    });

    filteredList.forEach(renderExpense);
}

function deleteExpense(id: number): void {
    storedExpenseList = storedExpenseList.filter(expense => expense.id !== id);
    localStorage.setItem("expenses", JSON.stringify(storedExpenseList));

    document.getElementById(`expense-${id}`)?.remove();
    console.log(`Deleted expense with id ${id}`);
}

function formatDate(inputDate: string): string {
    const [year, month, day] = inputDate.split("-");
    return `${day}-${month}-${year}`;
}

expenseForm?.addEventListener("submit", handleForm);
filterBtn?.addEventListener("click", filterExpenses);
