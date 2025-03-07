import { Card, List } from "antd";
import { useQuery } from "@tanstack/react-query";
import { getAllRoles } from "./api/AllApis";
import { Role } from "./models/Role";

const DisplayRoles = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["roles"],
    queryFn: getAllRoles,
    staleTime: Infinity,
  });
  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <>
      {data && (
        <Card title="User Roles" style={{ width: "100%", padding: 20 }}>
          <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(role: Role) => (
              <List.Item>
                <List.Item.Meta
                  title={<b>{role.name}</b>}
                  description={role.description}
                />
              </List.Item>
            )}
          />
        </Card>
      )}
    </>
  );
};

export default DisplayRoles;
