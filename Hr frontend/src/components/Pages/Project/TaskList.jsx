import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import SubTopBar from "../../TopBar/SubTopBar";
import { ArrowRightOutlined, DeleteOutlined, EditOutlined, PlusSquareOutlined, ProjectOutlined, UploadOutlined } from "@ant-design/icons";
import Buttons_1 from "../../Buttons/Buttons_1";
import AddTask from "./AddTask";

const TaskList = () => {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");
  const [taskDetails, setTaskDetails] = useState(null);
  const [editTask, setEditTask] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const [tasksPerPage] = useState(5); // Number of tasks per page
  const [activePopup, setActivePopup] = useState(null);

  useEffect(() => {
    // Fetch project names
    axios
      .get("http://localhost:8084/api/project")
      .then((response) => setProjects(response.data))
      .catch((error) => console.error("Error fetching projects:", error));

    // Fetch employees
    axios
      .get("http://localhost:8080/api/employee")
      .then((response) => setEmployees(response.data))
      .catch((error) => console.error("Error fetching employees:", error));
  }, []);

  const fetchTasks = (projectTitle) => {
    axios
      .get(`http://localhost:8088/api/task/project/${projectTitle}/tasks`)
      .then((response) => setTasks(response.data))
      .catch((error) => console.error("Error fetching tasks:", error));
  };

  const handleProjectChange = (event) => {
    const projectTitle = event.target.value;
    setSelectedProject(projectTitle);
    setCurrentPage(1); // Reset to the first page when a new project is selected
    fetchTasks(projectTitle);
  };

  const handleSeeMore = (taskId) => {
    const task = tasks.find((task) => task.id === taskId);
    setTaskDetails(task);
  };

  const handleEdit = (taskId) => {
    const task = tasks.find((task) => task.id === taskId);
    setEditTask({ ...task, assignedEmployees: task.assignedEmployees || [] });
  };

  const handleDelete = (taskId) => {
    axios
      .delete(`http://localhost:8088/api/task/delete-task/${taskId}`)
      .then(() => {
        setTasks(tasks.filter((task) => task.id !== taskId));
        setTaskDetails(null);
      })
      .catch((error) => console.error("Error deleting task:", error));
  };

  const handleUpdateTask = (taskId, updatedTask) => {
    axios
      .put(`http://localhost:8088/api/task/update-task/${taskId}`, updatedTask)
      .then(() => {
        fetchTasks(selectedProject);
        setEditTask(null);
      })
      .catch((error) => {
        console.error("Error updating task:", error);
        alert("There was an error updating the task.");
      });
  };

  // Convert employees to react-select format
  const employeeOptions = employees.map((employee) => ({
    value: employee.id,
    label: employee.name,
  }));

  // Pagination logic
  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleAddTaskClick = () => {
    setActivePopup('addTask');
  };

  const closePopup = () => {
    setActivePopup(null);
  };

  return (
    <>
      <div className="absolute left-[15%] top-16 p-0 m-0 w-[85%] bg-cyan-200 h-full">
        <SubTopBar icon={<ProjectOutlined />} name="Project" secondname="Task List" arrow={<ArrowRightOutlined className="size-3" />} />
      </div>
      <div className="ml-5 absolute left-[15%] top-28 w-[85%]">
        <div className="left-[15%] top-28 flex gap-5">
          <Buttons_1 name="Add New Task" bgColor="bg-custom-blue" icon={<PlusSquareOutlined />} onClick={handleAddTaskClick} />
        </div>
        {activePopup === 'addTask' && (
          <AddTask onClose={closePopup} />
        )}
        <div className="left-[15%] top-40 m-0 w-[95%] h-full bg-cyan-200">
          <div className="flex text-center gap-1 my-4">
            <ProjectOutlined className="size-6" />
            <p className="text-base font-average">Project List</p>
          </div>
          <hr className="bg-black border-0 h-[3px] my-2" />
          <div className="mt-5">
            <label className="font-average text-lg">Select Project:</label>
            <select
              onChange={handleProjectChange}
              className="bg-transparent border-b-2 border-custom-blue focus:outline-none focus:border-blue-500 ml-4 font-average text-lg"
            >
              <option value="">Select a Project</option>
              {projects.map((project) => (
                <option key={project.id} value={project.projectTitle}>
                  {project.projectTitle}
                </option>
              ))}
            </select>
          </div>
              <div className="overflow-y-auto h-[480px]">
          <div className="mt-5 bg-cyan-100 p-5">
            <h2 className="font-average text-lg">Task List</h2>
            {tasks.length === 0 ? (
              <p>No tasks available for this project.</p>
            ) : (
              <>
                <ol>
  {currentTasks.map((task, index) => {
    // Calculate the task number based on the current page and tasks per page
    const taskNumber = (currentPage - 1) * tasksPerPage + index + 1;
    return (
      <li key={task.id} className="odd:bg-custom-blue-2 even:bg-custom-blue-3 hover:bg-gray-100">
        <div className="flex justify-between items-center gap-20 mr-[200px] ml-5">
          <span className="text-lg font-average my-1">
            {taskNumber}. {task.taskTitle} {/* Display the task number */}
          </span>
          <span className="text-lg font-average my-1">{task.status}</span>
          <button
            onClick={() => handleSeeMore(task.id)}
            className="bg-custom-blue text-white px-3 rounded-md"
          >
            See More
          </button>
        </div>
      </li>
    );
  })}
</ol>
                {/* Pagination Controls */}
                <div className="flex justify-center mt-4">
                  {Array.from({ length: Math.ceil(tasks.length / tasksPerPage) }, (_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => paginate(i + 1)}
                      className={`mx-1 px-3 py-1 rounded ${
                        currentPage === i + 1 ? "bg-custom-blue text-white" : "bg-gray-200"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {taskDetails && (
  <div className="mt-5 bg-cyan-100 p-5 relative">
    <h3 className="font-average text-lg">Task Details</h3>

    {/* Close Button */}
    <button 
      onClick={() => setTaskDetails(null)} 
      className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-xl font-bold"
    >
      &times;  {/* This is a "×" symbol, commonly used for close buttons */}
    </button>

    <p className="font-average my-1"><strong>Name:</strong> {taskDetails.taskTitle}</p>
    <p className="font-average my-1"><strong>Description:</strong> {taskDetails.details}</p>
    <p className="font-average my-1"><strong>Assigned Employees:</strong> {taskDetails.assignedEmployees.join(", ")}</p>
    <p className="font-average my-1"><strong>status:</strong> {taskDetails.status}</p>
    <p className="font-average my-1"><strong>Start Date:</strong> {taskDetails.startDate}</p>
    <p className="font-average my-1"><strong>End Date:</strong> {taskDetails.endDate}</p>
    

    <div className="flex gap-4 mt-3">
      <button 
        onClick={() => handleEdit(taskDetails.id)} 
        className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
      >
        <EditOutlined />
      </button>
      <button 
        onClick={() => handleDelete(taskDetails.id)} 
        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
      >
        <DeleteOutlined />
      </button>
    </div>
  </div>
)}


{editTask && (
  <div className="relative mt-5 bg-cyan-100 p-5 flex flex-col justify-center items-left">
    <h3 className="font-average text-lg">Edit Task</h3>
    
    {/* Close Button */}
    <button 
      onClick={() => setEditTask(null)} 
      className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-xl font-bold"
    >
      &times; {/* Close symbol */}
    </button>

    {/* Task Name Input */}
    <label className="font-average my-1">
      Name:
      <input
        type="text"
        value={editTask.taskTitle || ""}
        className="bg-transparent border-b-2 border-custom-blue focus:outline-none focus:border-blue-500 ml-4 font-average"
        onChange={(e) =>
          setEditTask({ ...editTask, taskTitle: e.target.value })
        }
      />
    </label>

    {/* Task Description Input */}
    <label className="font-average my-1">
      Description:
      <input
        type="text"
        value={editTask.details || ""}
        className="w-[80%] bg-transparent border-b-2 border-custom-blue focus:outline-none focus:border-blue-500 ml-4 font-average"
        onChange={(e) =>
          setEditTask({ ...editTask, details: e.target.value })
        }
      />
    </label>

    {/* Assigned Employees Multi-Select */}
    <label className="font-average my-1">
      Assigned Employees:
      <Select
        isMulti
        options={employeeOptions}
        value={employeeOptions.filter((option) =>
          editTask.assignedEmployees.includes(option.label) // Compare with names (labels)
        )}
        onChange={(selectedOptions) => {
          const selectedEmployees = selectedOptions.map((option) => option.label); // Save names
          setEditTask({ ...editTask, assignedEmployees: selectedEmployees });
        }}
      />
    </label>

    {/* Start Date Input */}
    <label className="font-average my-1">
      Start Date:
      <input
        type="date"
        value={editTask.startDate || ""}
        className="bg-transparent border-b-2 border-custom-blue focus:outline-none focus:border-blue-500 ml-4 font-average"
        onChange={(e) =>
          setEditTask({ ...editTask, startDate: e.target.value })
        }
      />
    </label>

    {/* End Date Input */}
    <label className="font-average my-1">
      End Date:
      <input
        type="date"
        value={editTask.endDate || ""}
        className="bg-transparent border-b-2 border-custom-blue focus:outline-none focus:border-blue-500 ml-4 font-average"
        onChange={(e) =>
          setEditTask({ ...editTask, endDate: e.target.value })
        }
      />
    </label>

    {/* Status Dropdown */}
    <label className="font-average my-1">
      Status:
    
    <select
      className="bg-transparent border-b-2 border-custom-blue focus:outline-none focus:border-blue-500 ml-4 font-average w-28"
      value={editTask.status}  // Bind value to editTask.status
      onChange={(e) => setEditTask({ ...editTask, status: e.target.value })}  // Update status
    >
      <option value="Upcoming">Upcoming</option>
      <option value="Running">Running</option>
      <option value="Complete">Complete</option>
    </select>
    </label>

    {/* Update Task Button */}
    <button 
      onClick={() => handleUpdateTask(editTask.id, editTask)}
      className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 mt-3 w-10"
    >
      <UploadOutlined />
    </button>
  </div>
)}

</div>

        </div>
      </div>
    </>
  );
};

export default TaskList;