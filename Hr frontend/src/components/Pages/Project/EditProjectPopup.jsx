import React, { useState, useEffect } from 'react';


function EditProjectPopup({ row, onSave, onClose }) {
    const [formData, setFormData] = useState({
        ...row,
        startDate: row.startDate ? new Date(row.startDate).toISOString().split('T')[0] : '',
        endDate: row.endDate ? new Date(row.endDate).toISOString().split('T')[0] : '',
    });

    useEffect(() => {
        setFormData({
            ...row,
            startDate: row.startDate ? new Date(row.startDate).toISOString().split('T')[0] : '',
            endDate: row.endDate ? new Date(row.endDate).toISOString().split('T')[0] : '',
        });
    }, [row]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded shadow-lg w-[400px]">
                <h2 className="text-xl font-bold mb-4">Edit Project</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="block text-gray-700">Project Title</label>
                        <input
                            type="text"
                            name="projectTitle"
                            value={formData.projectTitle}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block text-gray-700">Start Date</label>
                        <input
                            type="date"
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block text-gray-700">End Date</label>
                        <input
                            type="date"
                            name="endDate"
                            value={formData.endDate}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block text-gray-700">Status</label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                            required
                        >
                            <option value="">Select Status</option>
                            <option value="Not Started">Not Started</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="block text-gray-700">Details</label>
                        <textarea
                            name="details"
                            value={formData.details}
                            onChange={handleChange}
                            className="w-full border p-2 rounded"
                            required
                        />
                    </div>
                    <div className="flex justify-end gap-3 mt-4">
                        <button
                            type="button"
                            className="bg-gray-400 text-white px-4 py-2 rounded"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditProjectPopup;
