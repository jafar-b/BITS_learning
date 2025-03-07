import {
  UserOutlined,
  MailOutlined,
  HomeOutlined,
  PhoneOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import { Input, Button, Card, message, Layout } from "antd";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUserStore } from "./store/UserStore";
import { userSchema } from "./models/User";
import BackButton from "./components/BackButton";
import { useTheme } from "./context/ThemeContext";
const { Content } = Layout;
const AddUser = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(userSchema),
  });
  const { darkMode } = useTheme();

  const { users, storeUserinContext } = useUserStore();
  const onFinish = (data: any) => {
    const newData = { id: users.length + 1, ...data };
    storeUserinContext(newData);
    message.success("User Added in Context/store!");
  };

  const onError = (errors: any) => {
    console.log(errors);
  };

  return (
    <>
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
          <Card
            title="Add User"
            style={{
              width: "22rem",
              margin: "auto",
              marginTop: 20,
              marginBottom: 20,
              background: darkMode ? "#1f1f1f" : "#fff",
              color: darkMode ? "#fff" : "#000",
            }}
            headStyle={{
              background: darkMode ? "#1f1f1f" : "#fff",
              color: darkMode ? "#fff" : "#000",
            }}
          >
            <form onSubmit={handleSubmit(onFinish, onError)}>
              <div style={{ marginBottom: 16 }}>
                <Controller
                  name="name"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      prefix={<UserOutlined />}
                      placeholder="Name"
                      value={field.value || ""}
                    />
                  )}
                />
                {errors.name && (
                  <p style={{ color: "red" }}>{errors.name.message}</p>
                )}
              </div>

              <div style={{ marginBottom: 16 }}>
                <Controller
                  name="username"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      prefix={<UserOutlined />}
                      placeholder="Username"
                      value={field.value || ""}
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
                    <Input
                      {...field}
                      prefix={<UserOutlined />}
                      placeholder="password"
                      value={field.value || ""}
                    />
                  )}
                />
                {errors.username && (
                  <p style={{ color: "red" }}>{errors.username.message}</p>
                )}
              </div>

              <div style={{ marginBottom: 16 }}>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      prefix={<MailOutlined />}
                      placeholder="Email"
                      value={field.value || ""}
                    />
                  )}
                />
                {errors.email && (
                  <p style={{ color: "red" }}>{errors.email.message}</p>
                )}
              </div>

              <div style={{ marginBottom: 16 }}>
                <Controller
                  name="company"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      prefix={<HomeOutlined />}
                      placeholder="Company"
                      value={field.value || ""}
                    />
                  )}
                />
                {errors.company && (
                  <p style={{ color: "red" }}>{errors.company.message}</p>
                )}
              </div>

              <div style={{ marginBottom: 16 }}>
                <Controller
                  name="address"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      prefix={<HomeOutlined />}
                      placeholder="Address"
                      value={field.value || ""}
                    />
                  )}
                />
                {errors.address && (
                  <p style={{ color: "red" }}>{errors.address.message}</p>
                )}
              </div>

              <div style={{ marginBottom: 16 }}>
                <Controller
                  name="zip"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      prefix={<HomeOutlined />}
                      placeholder="Zip Code"
                      value={field.value || ""}
                    />
                  )}
                />
                {errors.zip && (
                  <p style={{ color: "red" }}>{errors.zip.message}</p>
                )}
              </div>

              <div style={{ marginBottom: 16 }}>
                <Controller
                  name="state"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      prefix={<HomeOutlined />}
                      placeholder="State"
                      value={field.value || ""}
                    />
                  )}
                />
                {errors.state && (
                  <p style={{ color: "red" }}>{errors.state.message}</p>
                )}
              </div>

              <div style={{ marginBottom: 16 }}>
                <Controller
                  name="country"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      prefix={<GlobalOutlined />}
                      placeholder="Country"
                      value={field.value || ""}
                    />
                  )}
                />
                {errors.country && (
                  <p style={{ color: "red" }}>{errors.country.message}</p>
                )}
              </div>

              <div style={{ marginBottom: 16 }}>
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      prefix={<PhoneOutlined />}
                      placeholder="Phone"
                      value={field.value || ""}
                    />
                  )}
                />
                {errors.phone && (
                  <p style={{ color: "red" }}>{errors.phone.message}</p>
                )}
              </div>

              <Button type="primary" htmlType="submit" block>
                Add User
              </Button>
            </form>
          </Card>
        </Content>
      </Layout>
    </>
  );
};

export default AddUser;
