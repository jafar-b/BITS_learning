import { Row, Layout, Typography } from "antd";
import { useTheme } from "./context/ThemeContext";
import { useQuery } from "@tanstack/react-query";
import {
  getAllUsers,
  getAllPosts,
  getAllComments,
  getAllCompanies,
  getAllRoles,
  getAllTodos,
} from "./api/AllApis";
import { useUserStore } from "./store/UserStore";
import { useCompaniesStore } from "./store/CompanyStore";
import { usePostStore } from "./store/PostStore";
import { useCommentStore } from "./store/CommentStore";
import { useTodoStore } from "./store/TodoStore";
import DashboardCard from "./DashboardCard";

const { Content } = Layout;
const { Title } = Typography;

const Dashboard = () => {
  const { darkMode } = useTheme();
  const users = useUserStore((state) => state.users);
  const setUsers = useUserStore((state) => state.setUsers);
  const companies = useCompaniesStore((state) => state.companies);
  const setCompanies = useCompaniesStore((state) => state.setCompanies);
  const posts = usePostStore((state) => state.posts);
  const setPosts = usePostStore((state) => state.setPosts);
  const comments = useCommentStore((state) => state.comments);
  const setComments = useCommentStore((state) => state.setComments);
  const todos = useTodoStore((state) => state.todos);
  const setTodos = useTodoStore((state) => state.setTodos);

  const { data: allUsers } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsers,
    staleTime: Infinity,                            //because fetching everything (Except Roles) only once and storing in the context
  });
  const { data: allTodos } = useQuery({
    queryKey: ["todos"],
    queryFn: getAllTodos,
    staleTime: Infinity,
  });
  const { data: allCompanies } = useQuery({
    queryKey: ["companies"],
    queryFn: getAllCompanies,
    staleTime: Infinity,
  });
  const { data: allRoles } = useQuery({
    queryKey: ["roles"],
    queryFn: getAllRoles,
    staleTime: Infinity,
  });
  const { data: allComments } = useQuery({
    queryKey: ["comments"],
    queryFn: getAllComments,
    staleTime: Infinity,
  });
  const { data: allPosts } = useQuery({
    queryKey: ["posts"],
    queryFn: getAllPosts,
    staleTime: Infinity,
  });

  if (users.length === 0 && allUsers) setUsers(allUsers); //this way it renders the total count of users based on context instead of directly from api
  if (companies.length === 0 && allCompanies) setCompanies(allCompanies);
  if (allPosts) setPosts(allPosts);
  if (allComments) setComments(allComments);
  if (allTodos) setTodos(allTodos);

  return (
    <Layout
      style={{minHeight: "100vh",background: darkMode ? "#141414" : "#fff",}}
    >
      <Content
        style={{padding: "24px",background: darkMode ? "#141414" : "#fff",}}
      >
        <Title
          level={2}
          style={{textAlign: "center",marginBottom: "40px",color: darkMode ? "#fff" : "#000",}}
        >
          Dashboard Overview
        </Title>

        <Row
          gutter={[24, 24]}
          style={{maxWidth: "1200px",margin: "0 auto",}}
        >
          <DashboardCard title="Total Users" toolTipTitle="Click to manage users!" itemCount={users?.length} navigateTo="/user-management"/>
          <DashboardCard title="Total Posts" toolTipTitle="Click to see all Posts!" itemCount={posts?.length} navigateTo="/blog-management"/>
          <DashboardCard title="Total Comments" toolTipTitle="Click to see all Comments!" itemCount={comments?.length} navigateTo="/blog-management"/>
          <DashboardCard title="Total Roles" toolTipTitle="Click to see all Roles!" itemCount={allRoles?.length} navigateTo="/display-roles"/>        
          <DashboardCard title="Total Companies" toolTipTitle="Click to manage Companies!" itemCount={companies?.length} navigateTo="/company-management"/>
          <DashboardCard title="Total Todos" toolTipTitle="Click to see all Todos!" itemCount={todos?.length} navigateTo="/display-todos"/>
        </Row>
      </Content>
    </Layout>
  );
};

export default Dashboard;
