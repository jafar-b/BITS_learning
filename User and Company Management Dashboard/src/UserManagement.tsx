import { useState } from "react";
import { Input, Table, Card, Button, Layout } from "antd";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "./store/UserStore";
import { User } from "./models/User";
import BackButton from "./components/BackButton";
import { useTheme } from "./context/ThemeContext";
const { Content } = Layout;

const UserManagement = () => {
  const { darkMode } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<User>();

  const users = useUserStore((state) => state.users);

  const navigate = useNavigate();

  const filteredUsers = users.filter((user: any) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Username", dataIndex: "username", key: "username" },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: User) => (
        <a
          onClick={() => setSelectedUser(record)}
          style={{ color: darkMode ? "#1890ff" : "#1890ff" }}
        >
          View Details
        </a>
      ),
    },
  ];

  return (
    <Layout
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: darkMode ? "#141414" : "#fff",
      }}
    >
      <Content
        style={{
          flex: "1 0 auto",
          padding: "20px",
          overflowY: "auto",
          background: darkMode ? "#141414" : "#fff",
        }}
      >
        <BackButton />

        <div style={{ padding: 20, width: "100%" }}>
          <h2 style={{ color: darkMode ? "white" : "black" }}>
            User Management
          </h2>
          <Input
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ marginBottom: 16, width: "60%" }}
          />

          <Button
            onClick={() => navigate("/add-user")}
            style={{ marginLeft: "10px" }}
          >
            Add a new User
          </Button>
          <Table
            columns={columns}
            pagination={{ pageSize: 6 }}
            dataSource={filteredUsers}
            rowKey="id"
          />
          {selectedUser && (
            <Card title="User Details" style={{ marginTop: 20 }}>
              <p>
                <strong>Name:</strong> {selectedUser.name}
              </p>
              <p>
                <strong>Email:</strong> {selectedUser.email}
              </p>
              <p>
                <strong>Username:</strong> {selectedUser.username}
              </p>
              <p>
                <strong>Address:</strong> {selectedUser.address}
              </p>
              <p>
                <strong>Zip Code:</strong> {selectedUser.zip}
              </p>
              <p>
                <strong>State:</strong> {selectedUser.state}
              </p>
              <p>
                <strong>Country:</strong> {selectedUser.country}
              </p>
            </Card>
          )}
        </div>
      </Content>
    </Layout>
  );
};

export default UserManagement;
