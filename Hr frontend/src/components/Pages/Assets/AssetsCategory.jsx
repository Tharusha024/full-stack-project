import { ArrowRightOutlined, LaptopOutlined, PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import SubTopBar from '../../TopBar/SubTopBar';

const AssetCategory = () => {
  const [categories, setCategories] = useState([
    { id: 1, name: "Electronics", description: "Devices like laptops, phones, and tablets" },
    { id: 2, name: "Furniture", description: "Office furniture including chairs and desks" },
    { id: 3, name: "Vehicles", description: "Company-owned vehicles for transportation" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ id: null, name: "", description: "" });

  const handleOpenModal = (category = { id: null, name: "", description: "" }) => {
    setFormData(category);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.id) {
      setCategories(categories.map(cat => cat.id === formData.id ? formData : cat));
    } else {
      setCategories([...categories, { ...formData, id: categories.length + 1 }]);
    }
    handleCloseModal();
  };

  const handleDelete = (id) => {
    setCategories(categories.filter(cat => cat.id !== id));
  };

  return (
    <div className="absolute left-[15%] top-16 p-5 w-[85%] h-full bg-custom-blue-4">
      <SubTopBar 
        icon={<LaptopOutlined className="text-custom-blue" />} 
        name="Assets" 
        secondname="Asset Categories" 
        arrow={<ArrowRightOutlined className="size-3 text-custom-blue" />} 
      />

      {/* Header Section */}
      <div className="mt-5 bg-white p-5 rounded-lg shadow-lg">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-700">Asset Categories</h2>
          <button 
            className="bg-custom-blue text-white px-4 py-2 rounded hover:bg-custom-blue-2 transition flex items-center"
            onClick={() => handleOpenModal()}
          >
            <PlusOutlined className="mr-2" /> Add Category
          </button>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto mt-4">
          <table className="w-full border-collapse border border-gray-300 text-center rounded-lg">
            <thead className="bg-custom-blue text-white uppercase">
              <tr>
                <th className="border border-gray-300 p-3">ID</th>
                <th className="border border-gray-300 p-3">Category Name</th>
                <th className="border border-gray-300 p-3">Description</th>
                <th className="border border-gray-300 p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id} className="bg-custom-blue-2 hover:bg-custom-blue-3 transition duration-200">
                  <td className="border border-gray-300 p-3">{category.id}</td>
                  <td className="border border-gray-300 p-3">{category.name}</td>
                  <td className="border border-gray-300 p-3">{category.description}</td>
                  <td className="border border-gray-300 p-3 flex justify-center space-x-3">
                    <button 
                      className="text-green-600 hover:text-green-800 transition"
                      onClick={() => handleOpenModal(category)}
                    >
                      <EditOutlined />
                    </button>
                    <button 
                      className="text-red-600 hover:text-red-800 transition"
                      onClick={() => handleDelete(category.id)}
                    >
                      <DeleteOutlined />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Adding/Editing Category */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-lg font-semibold mb-4">{formData.id ? "Edit" : "Add"} Category</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input 
                type="text" 
                placeholder="Category Name" 
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-2 border rounded focus:ring focus:ring-custom-blue"
                required
              />
              <textarea 
                placeholder="Description" 
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full p-2 border rounded focus:ring focus:ring-custom-blue"
                required
              />
              <div className="flex justify-between">
                <button type="button" className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700" onClick={handleCloseModal}>Cancel</button>
                <button type="submit" className="bg-custom-blue text-white px-4 py-2 rounded hover:bg-custom-blue-2">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssetCategory;