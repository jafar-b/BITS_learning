import React, { useState } from "react";
import { Collapse, Input, Layout, Typography, Tag } from "antd";
import { useTodoStore } from "./store/TodoStore";
import { useTheme } from "./context/ThemeContext";
import { CaretRightOutlined, SearchOutlined } from "@ant-design/icons";
import BackButton from "./components/BackButton";

const { Content } = Layout;
const { Title } = Typography;

interface TodoItemProps {
  userId: number;
  completed: string;
}

const TodoItem: React.FC<TodoItemProps> = ({ userId, completed }) => (
  <div style={{ padding: "8px" }}>
    <p style={{ color: "black", marginBottom: "8px" }}>User ID:{userId}</p>
    <Tag color={completed ? "success" : "error"}>
      {completed ? "Completed" : "Pending"}
    </Tag>
  </div>
);

const DisplayTodos: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const todos = useTodoStore((state) => state.todos);
  const { darkMode } = useTheme();

  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const items = filteredTodos.map((todo) => ({
    key: todo.id,
    label: (
      <span
        style={{
          color: darkMode ? "#fff" : "#000",
          fontSize: "14px",
          fontWeight: 500,
        }}
      >
        {todo.title}
      </span>
    ),
    children: <TodoItem userId={todo.userId} completed={todo.completed} />,
  }));

  return (
    <Layout
      style={{
        minHeight: "100vh",
        background: darkMode ? "#141414" : "#fff",
      }}
    >
      <Content style={{ padding: "24px" }}>
        <BackButton />
        <Title
          level={4}
          style={{
            color: darkMode ? "#fff" : "#000",
            marginBottom: "24px",
            marginTop: 10,
          }}
        >
          Todo List
        </Title>

        <Input
          prefix={
            <SearchOutlined style={{ color: darkMode ? "#fff" : "#666" }} />
          }
          placeholder="Search todos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "60%",
            marginBottom: "24px",
            background: darkMode ? "#1f1f1f" : "#fff",
            borderColor: darkMode ? "#434343" : "#d9d9d9",
            color: darkMode ? "white" : "black",
          }}
        />

        <Collapse
          items={items}
          style={{
            background: darkMode ? "#1f1f1f" : "#fff",
            borderColor: darkMode ? "#434343" : "#d9d9d9",
          }}
          expandIcon={({ isActive }) => (
            <CaretRightOutlined
              rotate={isActive ? 90 : 0}
              style={{ color: darkMode ? "#fff" : "#000" }}
            />
          )}
        />

        {filteredTodos.length === 0 && (
          <div
            style={{
              textAlign: "center",
              padding: "24px",
              color: darkMode ? "#fff" : "#666",
            }}
          >
            No todos found
          </div>
        )}
      </Content>
    </Layout>
  );
};

export default DisplayTodos;
