import { Col, Card, Tooltip } from "antd"
import { Link } from "react-router-dom"
import { useTheme } from "./context/ThemeContext"

const DashboardCard = ({ title, toolTipTitle, itemCount, navigateTo }: { title: string, toolTipTitle: string, itemCount: number, navigateTo: string }) => {
const {darkMode}=useTheme()

    return (

<>
<Col xs={24} sm={12} lg={8}>
            <Card
              title={title}
              style={{
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
              <Tooltip color="blue" title={toolTipTitle}>
                <Link
                  to={navigateTo}
                  style={{ color: darkMode ? "#1890ff" : "#1890ff" }}
                >
                  <div style={{ fontSize: "32px", fontWeight: "bold" }}>
                   {itemCount}
                  </div>
                </Link>
              </Tooltip>
            </Card>
          </Col>
</>
)
}

export default DashboardCard