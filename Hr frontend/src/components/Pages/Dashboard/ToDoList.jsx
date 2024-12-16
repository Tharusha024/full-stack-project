import React, { useEffect, useState } from 'react'

function ToDoList() {
    const [tasks, setTasks] = useState([]);
    const [taskInput, setTaskInput] = useState("");

    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        const lastReset = localStorage.getItem("lastReset");
        const currentDay = new Date().toDateString();
    
        if (lastReset !== currentDay) {
            localStorage.setItem("tasks", JSON.stringify([]));
            localStorage.setItem("lastReset", currentDay);
          } else {
            setTasks(savedTasks);
          }
        }, []);

        useEffect(() => {
            localStorage.setItem("tasks", JSON.stringify(tasks));
          }, [tasks]);
        
          const addTask = () => {
            if (taskInput.trim()) {
              setTasks([...tasks, taskInput.trim()]);
              setTaskInput("");
            }
          };
        
          const deleteTask = (index) => {
            setTasks(tasks.filter((_, i) => i !== index));
          };
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
    <h1>To-Do List</h1>
    <input
      type="text"
      value={taskInput}
      onChange={(e) => setTaskInput(e.target.value)}
      placeholder="Add a new task"
    />
    <button onClick={addTask}>Add Task</button>
    <ul>
      {tasks.map((task, index) => (
        <li key={index}>
          {task} <button onClick={() => deleteTask(index)}>Delete</button>
        </li>
      ))}
    </ul>
    <p>
      <em>Tasks reset daily at midnight.</em>
    </p>
  </div>
);
};
  
export default ToDoList