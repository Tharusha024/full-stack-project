import React, { useState } from 'react'

function ToDoList() {
    const [tasks,setTasks] =useState (["eat","eat","eat","eat"]);
    const [newTask,setNewTasks] = useState ("");

    function handkeInputChange(event){
        setNewTasks(event.target.value);
    }
    function addTask(){
        if(newTask.trim() !==""){
            setTasks(t => [...t,newTask]);
            setNewTasks("");
        }
       
    }
    function deleteTask(index){
        const updateTasks = tasks.filter((_,i)=>i !== index);
        setTasks(updateTasks);
    }
    function moveTaskUp(index){

    }
    function moveTaskDown(index){

    }

  return (
    <div>
        <h1>To-Do-list</h1>
        <div>
            <input 
                type="text"
                placeholder="Enter a task"
                value={newTask}
                onChange={handkeInputChange}
            />
            <button 
                className=''
                onClick={addTask}>
                Add
            </button>
        </div>
        <ol>
            {tasks.map((task,index) =>
                <li key={index}>
                    <span className=''>{task}</span>
                    <button 
                        className=''
                        onClick={() =>deleteTask(index)}>
                        Delete
                    </button>
                    <button 
                        className=''
                        onClick={() =>moveTaskUp(index)}>
                        UP
                    </button>
                    <button 
                        className=''
                        onClick={() =>moveTaskDown(index)}>
                        Down
                    </button>
                </li>
            )}
        </ol>
    </div>
  )
}

export default ToDoList;