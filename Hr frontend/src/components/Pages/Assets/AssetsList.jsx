import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Modal, Form, Input, Select, message } from "antd";
import { ArrowRightOutlined, LaptopOutlined } from "@ant-design/icons";
import SubTopBar from "../../TopBar/SubTopBar";

const { Option } = Select;

const AssetsList = () => {
  const [assets, setAssets] = useState([]);
  const [categories, setCategories] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAsset, setEditingAsset] = useState(null);

  useEffect(() => {
    fetchAssets();
    fetchCategories();
    fetchDepartments();
  }, []);

  // Fetch all assets
  const fetchAssets = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8080/api/assets");
      setAssets(response.data);
    } catch (error) {
      console.error("Error fetching assets", error);
    }
    setLoading(false);
  };

  // Fetch all asset categories
  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/asset-categories");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching asset categories", error);
    }
  };

  // Fetch all departments
  const fetchDepartments = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/departments");
      setDepartments(response.data);
    } catch (error) {
      console.error("Error fetching departments", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/assets/delete-asset/${id}`);
      fetchAssets();
    } catch (error) {
      console.error("Error deleting asset", error);
    }
  };

  const handleEdit = (asset) => {
    setEditingAsset(asset);
    setIsModalOpen(true);
  };

  const handleAddAsset = () => {
    setEditingAsset(null);
    setIsModalOpen(true);
  };

  const handleSave = async (values) => {
    // Validate selected asset category
    const categoryExists = categories.some((cat) => cat.categoryName === values.category);
    if (!categoryExists) {
      message.error("Selected asset category is not available. Please choose from the existing list.");
      return;
    }

    try {
      if (editingAsset) {
        await axios.put(`http://localhost:8080/api/assets/update-assets/${editingAsset.id}`, values);
      } else {
        await axios.post("http://localhost:8080/api/assets", values);
      }
      setIsModalOpen(false);
      fetchAssets();
    } catch (error) {
      console.error("Error saving asset", error);
    }
  };

  const columns = [
    { title: <span className="font-semibold text-lg">Asset Name</span>, dataIndex: "assetName", key: "assetName" },
    { title: <span className="font-semibold text-lg">Quantity</span>, dataIndex: "quantity", key: "quantity" },
    { title: <span className="font-semibold text-lg">Type</span>, dataIndex: "type", key: "type" },
    { title: <span className="font-semibold text-lg">Department</span>, dataIndex: "department", key: "department" },
    { title: <span className="font-semibold text-lg">Category</span>, dataIndex: "category", key: "category" },
    {
      title: <span className="font-semibold text-lg">Actions</span>,
      key: "actions",
      render: (_, record) => (
        <div className="flex gap-2">
          <Button onClick={() => handleEdit(record)} type="primary">
            Edit
          </Button>
          <Button onClick={() => handleDelete(record.id)} type="danger">
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="absolute left-60 top-16 p-4 m-0 w-full h-full bg-custom-blue-2 font-semibold text-lg">
      <SubTopBar icon={<LaptopOutlined />} name="Assets" secondname="Assets List" arrow={<ArrowRightOutlined className="size-3" />} />
      <h2 className="text-2xl font-bold mb-4">Asset Management</h2>
      <Button type="primary" onClick={handleAddAsset} className="mb-2">
        + Add Asset
      </Button>
      <Table dataSource={assets} columns={columns} loading={loading} rowKey="id" />

      {/* Modal for adding/editing assets */}
      <Modal title={editingAsset ? "Edit Asset" : "Add Asset"} visible={isModalOpen} onCancel={() => setIsModalOpen(false)} footer={null}>
        <Form initialValues={editingAsset} onFinish={handleSave} layout="vertical">
          <Form.Item name="assetName" label={<span className="font-semibold text-lg">Asset Name</span>} rules={[{ required: true, message: "Enter asset name" }]}>
            <Input className="text-lg" />
          </Form.Item>
          <Form.Item name="quantity" label={<span className="font-semibold text-lg">Quantity</span>} rules={[{ required: true, message: "Enter quantity" }]}>
            <Input type="number" className="text-lg" />
          </Form.Item>
          <Form.Item name="type" label={<span className="font-semibold text-lg">Type</span>} rules={[{ required: true, message: "Enter asset type" }]}>
            <Input className="text-lg" />
          </Form.Item>
          <Form.Item name="department" label={<span className="font-semibold text-lg">Department</span>} rules={[{ required: true, message: "Select a department" }]}>
            <Select placeholder="Select Department">
              {departments.map((dep) => (
                <Option key={dep.id} value={dep.departmentName}>
                  {dep.departmentName}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="category" label={<span className="font-semibold text-lg">Asset Category</span>} rules={[{ required: true, message: "Select an asset category" }]}>
            <Select placeholder="Select Asset Category">
              {categories.map((cat) => (
                <Option key={cat.id} value={cat.categoryName}>
                  {cat.categoryName}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {editingAsset ? "Update" : "Add"} Asset
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AssetsList;
