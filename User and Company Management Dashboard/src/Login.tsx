import { Card, Input, Button, Layout } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, userSchema } from "./models/User";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "./store/AuthStore";
import { loginUser } from "./api/AllApis";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useTheme } from "./context/ThemeContext";
const { Content } = Layout;

const Login = () => {

  
  const navigate = useNavigate();
  const login = useAuthStore((state: any) => state.login);
  const logout = useAuthStore((state: any) => state.logout);
  const loginAdmin = useAuthStore((state: any) => state.loginAdmin);
  const { darkMode } = useTheme();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userSchema),
  });

  const LoginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      if (data?.success) {
        login();
        message.success("Log in successful");
        navigate("/");
      } else {
        message.error("Login Failed, Please try again");
        return null;
      }
    },
    onError: (error: AxiosError) => {
      logout();
      message.error(
        `Login Failed, Please try again <Response Status: ${error.response?.status}>`
      );
    },
  });

  const onFinish = async (values: User) => {
    if (!values) {
      console.log("No data");
      return;
    }
    try {
      if (
        values.username === "michael" &&
        values.password === "success-password"
      ) {
        loginAdmin();
        LoginMutation.mutate(values);
      } else {
        login();
        LoginMutation.mutate(values);
      }
    } catch (err) {
      console.log(err);
      message.error("Login Failed, Please try again");
    }
  };

  return (
    <>
      <Layout
        style={{
          minHeight: "100vh",
          background: darkMode ? "#141414" : "#fff",
        }}
        
      >
        <Content
          style={{
            padding: "24px",
            background: darkMode ? "#141414" : "#fff",
          }}
          
        >
          <Card
            title="Login"
            style={{
              width: 300,
              margin: "auto",
              marginTop: 50,
              background: darkMode ? "#1f1f1f" : "#fff",
              borderColor: darkMode ? "#434343" : "#f0f0f0",
            }}
            headStyle={{
            background: darkMode ? "#1f1f1f" : "#fff",
            color: darkMode ? "#fff" : "#000",
            borderColor: darkMode ? "#434343" : "#f0f0f0",
          }}
          bodyStyle={{
            padding: "24px",
            textAlign: "center",
          }}
          >
            <form onSubmit={handleSubmit(onFinish)}>
              <div style={{ marginBottom: 16 }}>
                <Controller
                  name="username"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      prefix={<UserOutlined />}
                      placeholder="Username"
                    />
                  )}
                />
                {errors.username && (
                  <p style={{ color: "red" }}>{errors.username.message}</p>
                )}
              </div>

              <div style={{ marginBottom: 16 }}>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <Input.Password
                      {...field}
                      prefix={<LockOutlined />}
                      placeholder="Password"
                    />
                  )}
                />
                {errors.password && (
                  <p style={{ color: "red" }}>{errors.password.message}</p>
                )}
              </div>

              <Button type="primary" htmlType="submit" block>
                Login
              </Button>
            </form>
          </Card>
        </Content>
      </Layout>
    </>
  );
};

export default Login;
