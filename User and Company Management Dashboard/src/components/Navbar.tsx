import { Layout, Menu, message, Switch } from "antd";
import {
  HomeOutlined,
  UserOutlined,
  LogoutOutlined,
  BuildOutlined,
  BulbOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
const { Header } = Layout;
import { useTheme } from "../context/ThemeContext";
import { useAuthStore } from "../store/AuthStore";
const Navbar = () => {
  const navigate = useNavigate();
  const { darkMode, toggleTheme } = useTheme();
  const logout = useAuthStore((state) => state.logout);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isAdmin = useAuthStore((state) => state.isAdmin);

  const menuItems = [
    {
      key: "1",
      icon: <HomeOutlined />,
      label: "Home",
      onClick: () => navigate("/"),
    },
    ...(isAdmin                                           //putting these fields in the array(Navbar) only if user is admin
      ? [
          {
            key: "2",
            icon: <UserOutlined />,
            label: "User Management",
            onClick: () => navigate("/user-management"),
          },
          {
            key: "3",
            icon: <BuildOutlined />,
            label: "Company Management",
            onClick: () => navigate("/company-management"),
          },
        ]
      : []),
    {
      key: "4",
      icon: <BuildOutlined />,
      label: "Blogs Management",
      onClick: () => navigate("/blog-management"),
    },
    {
      key: "5",
      icon: <BuildOutlined />,
      label: "Todos Management",
      onClick: () => navigate("/display-todos"),
    },
    ...((isAuthenticated &&   (location.pathname!=="/login"))
      ? [
          {
            key: "6",
            icon: <LogoutOutlined />,
            label: "Logout",
            onClick: () => {
              message.success("Logged out successfully");
              logout();
              navigate("/login");
            },
          },
        ]
      : []),
  ];

  return (
    <Layout>
      <Header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          background: darkMode ? "rgb(0, 21, 41)" : "#fff",
        }}
      >
        <Menu
          theme={darkMode ? "dark" : "light"}
          mode="horizontal"
          defaultSelectedKeys={["1"]}
          items={menuItems}
          style={{ flex: 1 }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <Switch
            checked={darkMode}
            onChange={toggleTheme}
            checkedChildren={<BulbOutlined />}
            unCheckedChildren={<BulbOutlined />}
          />
        </div>
      </Header>
    </Layout>
  );
};

export default Navbar;
