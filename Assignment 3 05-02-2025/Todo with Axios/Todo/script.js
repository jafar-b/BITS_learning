document.addEventListener("DOMContentLoaded", () => {
  const inputTodo = document.getElementById("input-todo");
  const buttonTodo = document.getElementById("button-todo");
  const ulTodo = document.getElementById("ul-todo");
  const deleteAll = document.getElementById("deleteAll");
  const paragraphElement = document.querySelector(".text-body");
const responseMessage= document.querySelector(".response-message");
const responseStatus= document.querySelector(".response-status");
  //Axios implementation
  const axiosInstance = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com/",
  });

  const getAllTodos = async () => {
    try {
      const res = await axiosInstance.get("/todos?_limit=5");

      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  let editMode = false;
  let editElement = null;

  buttonTodo.addEventListener("click", () => {
    const text = inputTodo.value;
    if (editMode) {
      editElement.querySelector(".text-todo").textContent = text;
      editMode = false;
      editElement = null;
      buttonTodo.textContent = "Add";
    } else {
      //Axios post request
      axiosInstance
        .post("/todos", { title: inputTodo.value, completed: false })
        .then((res) => {  responseStatus.textContent=JSON.stringify("Response Status = "+res.status);responseMessage.textContent=("Response Message = "+JSON.stringify(res.data)); 
          createTodo(text,res.id);}); 

    }
    inputTodo.value = "";
    saveAllTodo();
  });

  const createTodo = (task,id) => {
    const li = document.createElement("li");
    li.className =
      "list-group-item d-flex justify-content-between align-items-start";
      li.dataset.id=id; 
    li.innerHTML = `<span class="text-todo">${task}</span>
    <div class="btn-group" role="group" aria-label="Basic mixed styles example">
      <button type="button" class="btn btn-danger">Edit</button>
      <button type="button" class="btn btn-warning">Delete</button>
    </div>`;
    ulTodo.appendChild(li);
  };

  ulTodo.addEventListener("click", (e) => {
    const li = e.target.closest(".list-group-item");
    const todoId = li.dataset.id;
    if (!li) return;

    if (e.target.classList.contains("btn-warning")) {
      li.remove();
  
     axiosInstance.delete(`/todos/${todoId}`).then((res)=>{responseStatus.textContent=JSON.stringify("Response Status = "+res.status);responseMessage.textContent=("Response Message = "+JSON.stringify(res.data))})
      
      saveAllTodo();
    }

    if (e.target.classList.contains("btn-danger")) {
      const taskText = li.querySelector(".text-todo");
      if (e.target.textContent === "Edit") {
        const input = document.createElement("input");
        input.type = "text";
        input.className =
          "edit-text d-flex justify-content-between align-items-start";
        input.value = taskText.textContent;
        li.replaceChild(input, taskText);
        e.target.textContent = "Set";


      } else {
        const input = li.querySelector(".edit-text");
        if (!input) return;
        const newText = input.value;
        const span = document.createElement("span");
        span.className = "text-todo";
        span.textContent = newText;
        li.replaceChild(span, input);
        e.target.textContent = "Edit";

        //Implemented axios.put here.  p.s: can also use "axios.patch"---(would be a better option) 
        const todoId=li.dataset.id;
        axiosInstance.put(`/todos/${todoId}`,{title:newText,completed:false}).then((res)=>{responseStatus.textContent=JSON.stringify("Response Status = "+res.status);responseMessage.textContent=("Response Message = "+JSON.stringify(res.data))})

        saveAllTodo();
      }
    }
  });

  const saveAllTodo = () => {
    const allTodos = [...document.querySelectorAll(".text-todo")].map(
      (task) => task.textContent
    );
    localStorage.setItem("allTodos", JSON.stringify(allTodos));
  };

  const loadAllTodo = async () => {
    //fetching all the todos and displaying in the list
    const allTodos = await getAllTodos();
    allTodos.map((element) => {
      createTodo(element.title,element.id);
    });
  };

  const deleteAllTodos = () => {
    if (confirm("Do you really want to delete all Todos?")) {
      localStorage.clear();

      // window.location.reload(true);
    }
  };
  deleteAll.addEventListener("click", deleteAllTodos);
  loadAllTodo();
});
