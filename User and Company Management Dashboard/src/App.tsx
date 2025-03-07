import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from "./Login";
import Dashboard from "./Dashboard";
import UserManagement from "./UserManagement";
import Navbar from "./components/Navbar";
import CompanyManagement from "./CompanyManagement";
import AppFooter from "./components/AppFooter";
import AddUser from "./AddUser";
import BlogManagement from "./BlogManagement";
import DisplayRoles from "./DisplayRoles";
import DisplayTodos from "./DisplayTodos";
import { ProtectedRoute, ProtectedAdminRoute } from "./ProtectedRoute";

const NotFound: React.FC = () => {
  return <h1>Page Not Found</h1>;
};

function App() {
  return (
    <>
      <Router>
        <Navbar />

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute />}>                          {/* All the paths except /login are protected */}
            <Route path="/" element={<Dashboard />} />
            <Route path="/blog-management" element={<BlogManagement />} />
            <Route path="/display-todos" element={<DisplayTodos />} />
            <Route element={<ProtectedAdminRoute />}>
              <Route path="/company-management" element={<CompanyManagement />}/>
              <Route path="/user-management" element={<UserManagement />} />
              <Route path="/add-user" element={<AddUser />} />
              <Route path="/display-roles" element={<DisplayRoles />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>

      <AppFooter />
    </>
  );
}

export default App;
