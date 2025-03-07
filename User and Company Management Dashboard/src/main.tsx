
import "@ant-design/v5-patch-for-react-19";
import "./index.css";
import App from "./App.tsx";
import "antd/dist/reset.css";
import { ConfigProvider } from "antd";
import en_US from "antd/locale/fr_FR";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
    <ConfigProvider locale={en_US}>      {/* for antd bydefault is chinese, so changing it to english  */}
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </QueryClientProvider>
    </ConfigProvider>
  // </StrictMode>
);
