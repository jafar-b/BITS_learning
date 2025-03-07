import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { LeftOutlined } from "@ant-design/icons";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <>
      <Button
        type="primary"
        shape="round"
        icon={<LeftOutlined />}
        size="middle"
        style={{ width: "fit-content" }}
        onClick={() => navigate(-1)}   //navigates to previous page
      >
        Go Back
      </Button>
    </>
  );
};

export default BackButton;
