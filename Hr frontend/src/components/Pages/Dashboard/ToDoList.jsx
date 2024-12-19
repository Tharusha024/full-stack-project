import { DeleteOutlined, PlusSquareOutlined, } from '@ant-design/icons';
import React, { useState, useEffect } from 'react';

function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState('');

  // Load tasks from localStorage when the component mounts
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Add a new task
  function addTask(text) {
    if (text.trim() !== '') {
      const newTask = {
        id: Date.now(), // Unique ID based on timestamp
        text,
        completed: false,
      };
      setTasks((prevTasks) => [...prevTasks, newTask]);
      setText('');
    }
  }

  // Delete a task by ID
  function deleteTask(id) {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  }

  // Toggle a task's completed status
  function toggleCompleted(id) {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  return (
    <div className='w-[320px] bg-white p-3'>
      <h1 className='font-average text-lg font-bold m-0 p-0'>To Do List</h1>
      <p className='font-average text-sm p-0 m-0'>List of your task to complete</p>

      <div>
        <input
            className='mr-3 font-average w-[260px] rounded-md text-lg my-4 bg-cyan-200'
          type="text"
          placeholder="Add task"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={() => addTask(text)}><PlusSquareOutlined className='text-xl text-custom-blue'/></button>
      </div>
      <ul className='w-[290px]'>
      {tasks.map((task) => (
          <li key={task.id} className='text-lg font-average flex justify-between'>
            <div>
            <input
            className='scale-150 m-2'
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleCompleted(task.id)}
            />
            <span
               className={`text-lg font-average w-[280px] max-w-full break-words ${
                task.completed ? 'line-through' : ''
              }`}
>
            {task.text}
            </span>
            </div>
            <button onClick={() => deleteTask(task.id)}><DeleteOutlined className='text-xl text-custom-red text-left'/></button>
          </li>
        ))}
      </ul>
      
      
    </div>
  );
}

export default ToDoList;
