import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, Select, message } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import axios from "axios";

const { Option } = Select;

const AssetManagement = () => {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [form] = Form.useForm();

  // Fetch asset data
  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/api/assets");
      setAssets(response.data);
    } catch (error) {
      message.error("Failed to fetch assets.");
    } finally {
      setLoading(false);
    }
  };

  // Handle Add/Edit Asset
  const handleSaveAsset = async (values) => {
    try {
      if (selectedAsset) {
        await axios.put(`/api/assets/${selectedAsset._id}`, values);
        message.success("Asset updated successfully!");
      } else {
        await axios.post("/api/assets", values);
        message.success("Asset added successfully!");
      }
      fetchAssets();
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      message.error("Operation failed.");
    }
  };

  // Handle Delete
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/assets/${id}`);
      message.success("Asset deleted successfully!");
      fetchAssets();
    } catch (error) {
      message.error("Failed to delete asset.");
    }
  };

  // Show Modal for Add/Edit
  const showModal = (asset = null) => {
    setSelectedAsset(asset);
    setIsModalVisible(true);
    form.setFieldsValue(asset || { status: "Available" });
  };

  return (
    <div className="p-6 bg-cyan-200 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Asset Management</h1>

      {/* Add Asset Button */}
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => showModal()}
        className="mb-4"
      >
        Add Asset
      </Button>

      {/* Assets Table */}
      <Table dataSource={assets} loading={loading} rowKey="_id" bordered>
        <Table.Column title="Asset Name" dataIndex="name" />
        <Table.Column title="Category" dataIndex="category" />
        <Table.Column title="Status" dataIndex="status" />
        <Table.Column title="Assigned To" dataIndex="assignedTo" />
        <Table.Column
          title="Actions"
          render={(text, record) => (
            <div className="flex gap-2">
              <Button
                type="primary"
                icon={<EditOutlined />}
                onClick={() => showModal(record)}
              />
              <Button
                type="danger"
                icon={<DeleteOutlined />}
                onClick={() => handleDelete(record._id)}
              />
            </div>
          )}
        />
      </Table>

      {/* Modal for Adding/Editing Asset */}
      <Modal
        title={selectedAsset ? "Edit Asset" : "Add Asset"}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={() => form.submit()}
        okText={selectedAsset ? "Update" : "Create"}
      >
        <Form form={form} layout="vertical" onFinish={handleSaveAsset}>
          <Form.Item name="name" label="Asset Name" rules={[{ required: true }]}>
            <Input placeholder="Enter asset name" />
          </Form.Item>
          <Form.Item name="category" label="Category" rules={[{ required: true }]}>
            <Select>
              <Option value="Electronics">Electronics</Option>
              <Option value="Furniture">Furniture</Option>
              <Option value="Software">Software</Option>
            </Select>
          </Form.Item>
          <Form.Item name="status" label="Status">
            <Select>
              <Option value="Available">Available</Option>
              <Option value="Assigned">Assigned</Option>
              <Option value="Maintenance">Maintenance</Option>
              <Option value="Retired">Retired</Option>
            </Select>
          </Form.Item>
          <Form.Item name="assignedTo" label="Assigned To">
            <Input placeholder="Enter employee name (if assigned)" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AssetManagement;
