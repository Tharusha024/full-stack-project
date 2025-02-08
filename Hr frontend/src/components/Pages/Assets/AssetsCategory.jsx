import { ArrowRightOutlined, LaptopOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import React, { useState, useEffect } from 'react';
import SubTopBar from '../../TopBar/SubTopBar';

const AssetCategory = () => {
  const [categories, setCategories] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({ name: '' });
  const [editMode, setEditMode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    fetch('/api/assets/categories')
      .then(res => res.json())
      .then(data => setCategories(data))
      .catch(err => console.error('Error fetching categories:', err));
  }, []);

  const handleAddCategory = () => {
    setShowPopup(true);
    setEditMode(false);
    setFormData({ name: '' });
  };

  const handleEditCategory = (category) => {
    setShowPopup(true);
    setEditMode(true);
    setSelectedCategory(category.id);
    setFormData({ name: category.name });
  };

  const handleDeleteCategory = async (id) => {
    await fetch(`/api/assets/categories/${id}`, { method: 'DELETE' });
    setCategories(categories.filter(category => category.id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editMode ? 'PUT' : 'POST';
    const url = editMode ? `/api/assets/categories/${selectedCategory}` : '/api/assets/categories';
    
    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    const data = await response.json();
    if (editMode) {
      setCategories(categories.map(cat => (cat.id === selectedCategory ? data : cat)));
    } else {
      setCategories([...categories, data]);
    }
    setShowPopup(false);
  };

  return (
    <div className='absolute left-[15%] top-16 p-5 w-[85%] h-full bg-custom-blue-4'>
      <SubTopBar icon={<LaptopOutlined />} name='Assets' secondname='Asset Categories' arrow={<ArrowRightOutlined className='size-3' />} />

      <div className='mt-5 bg-white p-5 rounded-lg shadow-lg'>
        <div className='flex justify-between mb-4'>
          <h2 className='text-xl font-semibold text-gray-700'>Asset Categories</h2>
          <button onClick={handleAddCategory} className='bg-custom-blue text-white px-4 py-2 rounded hover:bg-custom-blue-2 flex items-center'>
            <PlusOutlined className='mr-2' /> Add Category
          </button>
        </div>

        <table className='w-full border-collapse border border-gray-300 text-center rounded-lg'>
          <thead className='bg-custom-blue text-white uppercase'>
            <tr>
              <th className='border border-gray-300 p-3'>Category Name</th>
              <th className='border border-gray-300 p-3'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map(category => (
              <tr key={category.id} className='bg-custom-blue-2 hover:bg-custom-blue-3 transition duration-200'>
                <td className='border border-gray-300 p-3'>{category.name}</td>
                <td className='border border-gray-300 p-3 flex justify-center space-x-4'>
                  <button onClick={() => handleEditCategory(category)} className='text-green-600 hover:text-green-800'><EditOutlined /></button>
                  <button onClick={() => handleDeleteCategory(category.id)} className='text-red-600 hover:text-red-800'><DeleteOutlined /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showPopup && (
        <div className='fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center'>
          <div className='bg-white p-5 rounded shadow-lg w-1/3'>
            <h2 className='text-lg font-semibold mb-4'>{editMode ? 'Edit' : 'Add'} Category</h2>
            <form onSubmit={handleSubmit} className='space-y-4'>
              <input 
                type='text' 
                placeholder='Category Name' 
                className='w-full p-2 border rounded' 
                required 
                value={formData.name} 
                onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
              />
              <button type='submit' className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700'>Save</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssetCategory;