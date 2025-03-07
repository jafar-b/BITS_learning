import React, { useReducer, useState } from "react";
import { Table, Input, Card, Button, Layout, Typography } from "antd";
import { Company } from "./models/Company";
import { reducer } from "./context/SortCompaniesReducer";
import { useCompaniesStore } from "./store/CompanyStore";
import BackButton from "./components/BackButton";
import { useTheme } from "./context/ThemeContext";
const { Content } = Layout;
const { Title } = Typography;

const CompanyManagement: React.FC = () => {
  const { darkMode } = useTheme();
  const companies = useCompaniesStore((state) => state.companies);
  const updateCompany = useCompaniesStore((state) => state.updateCompany);
  const storeCompanyInContext = useCompaniesStore(
    (state) => state.storeCompanyInContext
  );

  const initialState = companies;
  const [state, dispatch] = useReducer(reducer, initialState);

  const [isEditing, setIsEditing] = useState(false);
  const [editedCompany, setEditedCompany] = useState<Company | null>(null);

  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [isAddingCompany, setIsAddingCompany] = useState<boolean>(false);
  const [newCompany, setNewCompany] = useState<Company>({
    id: state.length + 1,
    name: "",
    industry: "",
    marketCap: 0,
  });
  const handleEditClick = () => {
    setIsEditing(true);
    setEditedCompany(selectedCompany);
  };

  const handleSetClick = () => {
    if (editedCompany) {
      setSelectedCompany(editedCompany);
    }
    if(editedCompany?.id && editedCompany.industry &&editedCompany.marketCap){
    setIsEditing(false);
      updateCompany(editedCompany as Company)
      dispatch({ type: "UPDATE_COMPANY", payload: editedCompany });
    }
  };

  const handleAddCompany = () => {
    if (newCompany.name && newCompany.industry && newCompany.marketCap) {
      dispatch({ type: "ADD_COMPANY", payload: newCompany });
      storeCompanyInContext(newCompany);
      setIsAddingCompany(false);
      setNewCompany({
        id: state.length + 2,
        name: "",
        industry: "",
        marketCap: 0,
      });
    }
  };

  return (
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
          position: "relative",
        }}
      >
        <BackButton />
        <Title
          level={2}
          style={{
            marginTop: 10,
            marginBottom: 24,
            color: darkMode ? "#fff" : "#000",
          }}
        >
          Company Management
        </Title>

        <div style={{ marginBottom: 16 }}>
          <Input
            placeholder="Filter by market cap"
            onChange={(e) => {
              e.target.value === ""
                ? dispatch({ type: "RESET", payload: companies })
                : dispatch({ type: "FILTER", payload: e.target.value });
            }}
            style={{
              width: "250px",
              marginRight: 10,
              background: darkMode ? "#1f1f1f" : "#fff",
              borderColor: darkMode ? "#434343" : "#d9d9d9",
              color: darkMode ? "#fff" : "#000",
            }}
          />
          <Button
            onClick={() => dispatch({ type: "SORT", payload: "asc" })}
            style={{ marginRight: 10 }}
          >
            Sort Asc
          </Button>
          <Button
            onClick={() => dispatch({ type: "SORT", payload: "desc" })}
            style={{ marginRight: 10 }}
          >
            Sort Desc
          </Button>
          <Button
            onClick={() => dispatch({ type: "RESET", payload: companies })}
            style={{ marginRight: 10 }}
          >
            Reset
          </Button>
          <Button type="primary" onClick={() => setIsAddingCompany(true)}>
            Add a new Company
          </Button>
        </div>

        <Table
          pagination={{ pageSize: 6 }}
          dataSource={isAddingCompany ? [...state, newCompany] : state}
          rowKey="id"
          style={{
            background: darkMode ? "#1f1f1f" : "#fff",
          }}
          columns={[
            {
              title: "Company",
              dataIndex: "name",
              key: "name",
              render: (_, record) =>
                isAddingCompany && record.id === newCompany.id ? (
                  <Input
                    value={newCompany.name}
                    onChange={(e) =>
                      setNewCompany({ ...newCompany, name: e.target.value })
                    }
                    style={{
                      background: darkMode ? "#1f1f1f" : "#fff",
                      borderColor: darkMode ? "#434343" : "#d9d9d9",
                      color: darkMode ? "#fff" : "#000",
                    }}
                  />
                ) : (
                  record.name
                ),
            },
            {
              title: "Industry",
              dataIndex: "industry",
              key: "industry",
              render: (_, record) =>
                isAddingCompany && record.id === newCompany.id ? (
                  <Input
                    value={newCompany.industry}
                    onChange={(e) =>
                      setNewCompany({ ...newCompany, industry: e.target.value })
                    }
                    style={{
                      background: darkMode ? "#1f1f1f" : "#fff",
                      borderColor: darkMode ? "#434343" : "#d9d9d9",
                      color: darkMode ? "#fff" : "#000",
                    }}
                  />
                ) : (
                  record.industry
                ),
            },
            {
              title: "Market Cap ($)",
              dataIndex: "marketCap",
              key: "marketCap",
              render: (_, record) =>
                isAddingCompany && record.id === newCompany.id ? (
                  <Input
                    type="number"
                    value={newCompany.marketCap}
                    onChange={(e) =>
                      setNewCompany({
                        ...newCompany,
                        marketCap: Number(e.target.value),
                      })
                    }
                    style={{
                      background: darkMode ? "#1f1f1f" : "#fff",
                      borderColor: darkMode ? "#434343" : "#d9d9d9",
                      color: darkMode ? "#fff" : "#000",
                    }}
                  />
                ) : (
                  record.marketCap
                ),
            },
            {
              title: "Action",
              key: "action",
              render: (_, record) =>
                isAddingCompany && record.id === newCompany.id ? (
                  <Button type="primary" onClick={handleAddCompany}>
                    Add
                  </Button>
                ) : (
                  <a onClick={() => setSelectedCompany(record)}>View Details</a>
                ),
            },
          ]}
        />

        {selectedCompany && (
          <>
            <Card
              title={
                <span style={{ color: darkMode ? "#fff" : "#000" }}>
                  Company Details
                </span>
              }
            >
              <div>
                <p>
                  <b style={{ color: "black"}}>Name:</b>{" "}
                  {isEditing ? (
                    <Input
                      value={editedCompany?.name}
                      onChange={(e) =>
                        setEditedCompany(
                          (prev) => prev && { ...prev, name: e.target.value }
                        )
                      }
                    />
                  ) : (
                    selectedCompany.name
                  )}
                </p>

                <p>
                  <b>Industry:</b>{" "}
                  {isEditing ? (
                    <Input
                      value={editedCompany?.industry}
                      onChange={(e) =>
                        setEditedCompany(
                          (prev) =>
                            prev && { ...prev, industry: e.target.value }
                        )
                      }
                    />
                  ) : (
                    selectedCompany.industry
                  )}
                </p>

                <p>
                  <b>Market Cap:</b>{" "}
                  {isEditing ? (
                    <Input
                      type="number"
                      value={editedCompany?.marketCap}
                      onChange={(e) =>
                        setEditedCompany(
                          (prev) =>
                            prev && {
                              ...prev,
                              marketCap: Number(e.target.value),
                            }
                        )
                      }
                    />
                  ) : (
                    `$${selectedCompany.marketCap}`
                  )}
                </p>

                <Button onClick={() => setSelectedCompany(null)} type="primary">
                  Close
                </Button>

                <Button
                  onClick={isEditing ? handleSetClick : handleEditClick}
                  type="primary"
                  style={{ marginLeft: 16 }}
                >
                  {isEditing ? "Set" : "Edit"}
                </Button>
              </div>
            </Card>
          </>
        )}
      </Content>
    </Layout>
  );
};

export default CompanyManagement;
