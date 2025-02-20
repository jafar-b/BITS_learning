import React, { useState,useMemo } from "react";
import { useTasks } from "./Context"; 
import { Task } from "./Context";


const TaskList: React.FC = () => {
  const { tasks, addTask, removeTask, toggleTask } = useTasks();  
  const [taskText, setTaskText] = useState("");          //for storing user input

  // useMemo to count completed tasks
  const completedTasks = useMemo(() => tasks.filter((task:Task) => task.completed).length, [tasks]);

  return (
    <div>
      <h3>Completed Tasks: {completedTasks}</h3>
      <input value={taskText} onChange={(e) => setTaskText(e.target.value)}  style={{marginRight:"20px"}}/>
      <button onClick={() => { addTask(taskText); setTaskText(""); }}>Add</button>               {/* resetting the taskText so input is empty after adding */}
      <ul>
        {tasks.map((task:Task) => (
          <li key={task.id}>
            <span onClick={() => toggleTask(task.id)}
              style={{ textDecoration: task.completed ? "line-through" : "none" }}>
              {task.text}
            </span>
            <button onClick={() => removeTask(task.id)}>delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
