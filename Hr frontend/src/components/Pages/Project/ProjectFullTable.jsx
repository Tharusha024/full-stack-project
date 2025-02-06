import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ArrowLeftOutlined, ArrowRightOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';

function ProjectFullTable() {
  const [projects, setProjects] = useState([]); // Project list
  const [filteredProjects, setFilteredProjects] = useState([]); // For search results
  const [searchQuery, setSearchQuery] = useState(''); // Search input
  const [currentPage, setCurrentPage] = useState(1); // Pagination: Current page
  const [projectsPerPage] = useState(4); // Number of projects per page
  const [isEditing, setIsEditing] = useState(false); // Edit state
  const [editProject, setEditProject] = useState(null); // Project to be edited

  // Fetch projects on component mount
  useEffect(() => {
    axios
      .get('http://localhost:8084/api/project')
      .then((response) => {
        setProjects(response.data);
        setFilteredProjects(response.data); // Initialize filtered list
      })
      .catch((error) => {
        console.error('Error fetching projects:', error);
      });
  }, []);

  // Handle searching
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setFilteredProjects(
      projects.filter(
        (project) =>
          project.projectTitle.toLowerCase().includes(query) ||
          project.status.toLowerCase().includes(query)
      )
    );
  };

  // Handle deleting a project
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      axios
        .delete(`http://localhost:8084/api/project/delete-project/${id}`)
        .then(() => {
          const updatedProjects = projects.filter((project) => project.id !== id);
          setProjects(updatedProjects);
          setFilteredProjects(updatedProjects);
        })
        .catch((error) => {
          console.error('Error deleting project:', error);
        });
    }
  };

  // Handle editing a project
  const handleEdit = (id) => {
    const project = projects.find((project) => project.id === id);
    setEditProject(project);
    setIsEditing(true); // Show the edit popup
  };

  const validateDates = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (start > end) {
      alert('Start date must be earlier than the end date.');
      return false;
    }
    return true;
  };

  // Handle form submission to update project
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateDates(editProject.startDate, editProject.endDate)) {
        return; // Prevent form submission if the dates are invalid
      }

    if (editProject) {
      axios.put(`http://localhost:8084/api/project/update-project/${editProject.id}`, editProject)
        .then((response) => {
          // Update the project list with the updated project data
          setProjects(projects.map(project => 
            project.id === response.data.id ? response.data : project
          ));
          setIsEditing(false); // Close the edit popup
          setEditProject(null); // Reset editProject state
        })
        .catch((error) => console.error('Error updating project:', error));
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Get current projects based on pagination
  const currentProjects = filteredProjects.slice(
    (currentPage - 1) * projectsPerPage,
    currentPage * projectsPerPage
  );

  return (
    <div>
      {/* Search Bar */}
      <div className="my-4 flex items-right justify-end">
        <input
          type="text"
          placeholder="Search by Title or Status"
          value={searchQuery}
          onChange={handleSearch}
          className="px-4 py-2 border border-gray-300 rounded w-[40%]"
        />
      </div>

      {/* Project Table */}
      <table className="w-full mt-4 border-collapse border border-gray-300 table-auto">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 border border-gray-300 bg-custom-blue w-[300px]">Project Title</th>
            <th className="py-2 border border-gray-300 bg-custom-blue w-[120px]">Status</th>
            <th className="py-2 border border-gray-300 bg-custom-blue w-[120px]">Start Date</th>
            <th className="py-2 border border-gray-300 bg-custom-blue w-[120px]">End Date</th>
            <th className="py-2 border border-gray-300 bg-custom-blue w-[500px]">Details</th>
            <th className="py-2 border border-gray-300 bg-custom-blue">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentProjects.map((project) => (
            <tr key={project.id} className="odd:bg-custom-blue-2 even:bg-custom-blue-3 hover:bg-gray-100 h-[70px]">
              <td className="py-2 px-4 border border-gray-300">{project.projectTitle}</td>
              <td className="py-2 px-4 border border-gray-300">{project.status}</td>
              <td className="py-2 px-4 border border-gray-300">{project.startDate}</td>
              <td className="py-2 px-4 border border-gray-300">{project.endDate}</td>
              <td className="py-2 px-4 border border-gray-300">{project.details}</td>
              <td className="px-4 py-2 flex items-center justify-center">
                <div className="flex space-x-2">
                  <button
                    className="bg-custom-blue text-white px-3 py-1 rounded"
                    title="Edit"
                    onClick={() => handleEdit(project.id)} // Call handleEdit with project.id
                  >
                    <EditOutlined />
                  </button>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded"
                    title="Delete"
                    onClick={() => handleDelete(project.id)} // Call handleDelete with project.id
                  >
                    <DeleteOutlined />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="mt-4 flex justify-between items-center">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="bg-blue-500 px-3 py-1 rounded disabled:opacity-50"
        >
          <ArrowLeftOutlined />
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="bg-blue-500 px-3 py-1 rounded disabled:opacity-50"
        >
          <ArrowRightOutlined />
        </button>
      </div>

      {/* Edit Popup Form (Modal) */}
      {isEditing && editProject && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Edit Project</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Project Title:</label>
                <input
                  type="text"
                  value={editProject.projectTitle}
                  onChange={(e) => setEditProject({ ...editProject, projectTitle: e.target.value })}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Status:</label>
                <select
                  value={editProject?.status}
                  onChange={(e) => setEditProject({ ...editProject, status: e.target.value })}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
                >
                  <option value="Upcomming">Upcomming</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Start Date:</label>
                <input
                  type="date"
                  value={editProject?.startDate}
                  onChange={(e) => setEditProject({ ...editProject, startDate: e.target.value })}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">End Date:</label>
                <input
                  type="date"
                  value={editProject?.endDate}
                  onChange={(e) => setEditProject({ ...editProject, endDate: e.target.value })}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Details:</label>
                <textarea
                  value={editProject.details}
                  onChange={(e) => setEditProject({ ...editProject, details: e.target.value })}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectFullTable;