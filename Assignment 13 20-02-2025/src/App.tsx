

import React from "react";
import { TaskProvider } from "./Context";
import TaskList from "./TaskList";
import "./App.css"

const App: React.FC = () => (
  <TaskProvider>
    <TaskList />
  </TaskProvider>
);

export default App;