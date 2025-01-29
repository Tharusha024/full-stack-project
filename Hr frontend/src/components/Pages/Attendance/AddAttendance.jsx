import React, { useState } from "react";
import axios from "axios";

function AddAttendance({ onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    pin: "",
    sign_in: "", 
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8085/api/attendance", formData);
      console.log("Attendance recorded successfully:", response.data);
      alert("Attendance recorded successfully!");
      onClose(); 
    } catch (error) {
      console.error("Error recording attendance:", error);
      alert("Failed to record attendance. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded shadow-lg w-[400px]">
        <h2 className="text-xl font-bold mb-4">Record Attendance</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div className="mb-3">
            <label className="block text-gray-700">Pin</label>
            <input
              type="text"
              name="pin"
              value={formData.pin}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div className="mb-3">
            <label className="block text-gray-700">Sign In / Sign Out</label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="sign_in"
                  value="Sign In"
                  checked={formData.sign_in === "Sign In"}
                  onChange={handleChange}
                  className="mr-2"
                  required
                />
                Sign In
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="sign_in"
                  value="Sign Out"
                  checked={formData.sign_in === "Sign Out"}
                  onChange={handleChange}
                  className="mr-2"
                  required
                />
                Sign Out
              </label>
            </div>
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
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddAttendance;
