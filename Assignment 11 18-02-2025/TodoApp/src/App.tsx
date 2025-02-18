import "./App.css";
import { useEffect, useState } from "react";
import {
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import { Edit, Delete, Save } from "@mui/icons-material";

type todo={id:number,todo:string};
const sampleTodos:todo[] = [
  {id:1,todo: "Bring some Fruits"},
  {id:2,todo: "wash the car"},
  {id:3,todo: "watch marvel movies"},
];

function App() {

  const [task, setTask] = useState<string>("");
  const [todos, setTodos] = useState<todo[]>([]);
  const [editId,setEditId]=useState<number|null>(null);
  const [editTask,setEditTask]=useState<string>("");
  
  
useEffect(()=>{
  
  localStorage.setItem("todos",JSON.stringify(sampleTodos))
const storedTodos:todo[]=JSON.parse(localStorage.getItem("todos")??"[]")
setTodos(storedTodos);
},[])   //executes on initial load


useEffect(()=>{  
localStorage.setItem("todos",JSON.stringify(todos))
},[todos])

const handleAdd = (): void => { 
  const newTodo:todo={id:todos.length+1,todo:task}    
  setTodos((prev)=>[...prev,newTodo])
  };

const handleDelete=(id:number)=>{
  setTodos(todos.filter((element)=>{return element.id!==id}))
}

const handleEdit=(id:number,editTodo:string)=>{
  setEditId(id)
  setEditTask(editTodo);

}

const handleSaveEdittedTask=()=>{
const updatedTodos=todos.map((element)=>{
  if(element.id===editId){return {...element,todo:editTask}}       //copies the original element object and changes the todo
  else return element
})
setTodos(updatedTodos)
setEditId(null);                   //resetting the states..
setEditTask("");
}

  return (
    <>
     <div style={{ width: "400px", margin: "auto", paddingTop: "20px" }}>
      <TextField
        fullWidth
        label="Add Task"
        variant="outlined"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleAdd} style={{ marginTop: "10px", width: "100%" }}>
        Add
      </Button>

      <List>
        {todos.map((todo) => (
          <ListItem key={todo.id}>
            {editId === todo.id ? (
              <TextField fullWidth value={editTask} onChange={(e) => setEditTask(e.target.value)} />           //converts to TextField if editing is going turned on...otherwise just ListItemText
            ) : (
              <ListItemText primary={todo.todo} />
            )}

            {editId === todo.id ? (                                         //showing save or edit icons based on state of editId(i.e null or actual Id)
              <IconButton color="success" onClick={handleSaveEdittedTask}>
                <Save />
              </IconButton>
            ) : (
              <IconButton color="primary" onClick={() => handleEdit(todo.id, todo.todo)}>
                <Edit />
              </IconButton>
            )}

            <IconButton color="error" onClick={() => handleDelete(todo.id)}>
              <Delete />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </div>
    </>
  );
}

export default App;

