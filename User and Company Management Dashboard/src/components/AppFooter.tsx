import { Layout } from "antd";

const { Footer } = Layout;

const AppFooter: React.FC = () => {
  return (
    <Layout style={{ display: "flex", flexDirection: "column", bottom: 0 }}>
      <Footer
        style={{
          textAlign: "center",
          background: "#001529",
          color: "#fff",
          padding: "1.5rem",
        }}
      >
        © {new Date().getFullYear()} My Website. All rights reserved.
      </Footer>
    </Layout>
  );
};

export default AppFooter;
