import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Modal, Form, Input, message } from "antd";
import { ArrowRightOutlined, FolderOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import SubTopBar from "../../TopBar/SubTopBar";

const AssetCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8080/api/categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories", error);
      message.error("Failed to fetch categories");
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/categories/${id}`);
      message.success("Category deleted successfully");
      fetchCategories();
    } catch (error) {
      console.error("Error deleting category", error);
      message.error("Failed to delete category");
    }
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  const handleAddCategory = () => {
    setEditingCategory(null);
    setIsModalOpen(true);
  };

  const handleSave = async (values) => {
    try {
      if (editingCategory) {
        await axios.put(`http://localhost:8080/api/categories/${editingCategory.id}`, values);
        message.success("Category updated successfully");
      } else {
        await axios.post("http://localhost:8080/api/categories", values);
        message.success("Category added successfully");
      }
      setIsModalOpen(false);
      fetchCategories();
    } catch (error) {
      console.error("Error saving category", error);
      message.error("Failed to save category");
    }
  };

  const columns = [
    { title: "Category Name", dataIndex: "categoryName", key: "categoryName" },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <div className="flex space-x-2">
          <Button onClick={() => handleEdit(record)} type="primary" icon={<EditOutlined />} />
          <Button onClick={() => handleDelete(record.id)} type="danger" icon={<DeleteOutlined />} />
        </div>
      ),
    },
  ];

  return (
    <div className="absolute left-60 top-16 p-4 m-0 w-full h-full bg-custom-blue-2">
      <SubTopBar
        icon={<FolderOutlined />}
        name="Assets"
        secondname="Asset Categories"
        arrow={<ArrowRightOutlined className="size-3" />}
      />
      <h2 className="text-2xl font-bold mb-4">Asset Category Management</h2>
      
      <Button type="primary" icon={<PlusOutlined />} onClick={handleAddCategory} className="mb-2">
        Add Category
      </Button>
      
      <Table dataSource={categories} columns={columns} loading={loading} rowKey="id" />

      <Modal title={editingCategory ? "Edit Category" : "Add Category"} visible={isModalOpen} onCancel={() => setIsModalOpen(false)} footer={null}>
        <Form initialValues={editingCategory} onFinish={handleSave}>
          <Form.Item name="categoryName" label="Category Name" rules={[{ required: true, message: "Enter category name" }]}>
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingCategory ? "Update" : "Add"} Category
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AssetCategory;
