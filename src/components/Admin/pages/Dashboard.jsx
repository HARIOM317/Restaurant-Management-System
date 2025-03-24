import React, { useState, useEffect } from "react";
import { Layout, Card, Table, Button, Modal } from "antd";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip as PieTooltip,
  Legend as PieLegend,
} from "recharts";
import { ResponsiveContainer } from "recharts";
import axios from "axios";
import DashboardLayout from "../Dashboard/DashboardLayout";
import "../../../stylesheets/Admin/Dashboard/Dashboard.css";
import { API_URL } from "../../../store/apiUrl";
import moment from "moment";

const Dashboard = () => {
  const [data, setData] = useState({
    totalCustomers: 0,
    salesToday: 0,
    monthlySales: 0,
    yearlySales: 0,
    orders: [],
    salesByCategory: [],
    recentOrders: [],
    upcomingEvents: [],
  });

  const [reportModalVisible, setReportModalVisible] = useState(false);
  const [reportContent, setReportContent] = useState("");

  const dashboardUrl = `${API_URL}/api/dashboard/`;
  const reportApiUrl = `${API_URL}/api/dashboard/report`;

  const token = localStorage.getItem("token");

  const formatDate = (tick) => moment(tick).format("DD-MM-YYYY");

  const generateReport = async (type) => {
    try {
      const response = await axios.get(`${reportApiUrl}?type=${type}`, {
        headers: { token },
      });
      setReportContent(response.data);
      setReportModalVisible(true);
    } catch (error) {
      console.error("Error fetching report:", error);
    }
  };

  const handleCloseReportModal = () => {
    setReportModalVisible(false);
    setReportContent("");
  };

  const renderReportModal = () => {
    return (
      <Modal
        title="Generated Report"
        visible={reportModalVisible}
        onCancel={handleCloseReportModal}
        footer={[
          <Button
            key="download"
            type="primary"
            href={`${reportApiUrl}?type=download`}
            download
          >
            Download
          </Button>,
          <Button key="close" onClick={handleCloseReportModal}>
            Close
          </Button>,
        ]}
      >
        <div dangerouslySetInnerHTML={{ __html: reportContent }} />
      </Modal>
    );
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(dashboardUrl, { headers: { token } });
      const dashboardData = response.data;
      setData({
        totalCustomers: dashboardData.totalCustomers,
        salesToday: dashboardData.salesToday,
        monthlySales: dashboardData.monthlySales,
        yearlySales: dashboardData.yearlySales,
        orders: dashboardData.recentOrders,
        salesByCategory: dashboardData.popularItems,
        recentOrders: dashboardData.recentOrders,
        upcomingEvents: dashboardData.upcomingEvents,
      });
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const colors = [
    "#ff1212",
    "#ff2e59",
    "#ff6347",
    "#e78610",
    "#ff9311",
    "#f3ae1f",
  ];

  return (
    <DashboardLayout>
      <div className="container dashboard-content">
        <div className="dashboard-top">
          <div>
            <h3>Dashboard</h3>
          </div>

          <div className="report-buttons">
            <Button
              type="primary"
              onClick={() => generateReport("weekly")}
              className="report-btn"
            >
              Weekly Report
            </Button>
            <Button
              type="primary"
              onClick={() => generateReport("monthly")}
              className="report-btn"
            >
              Monthly Report
            </Button>
            <Button
              type="primary"
              onClick={() => generateReport("yearly")}
              className="report-btn"
            >
              Yearly Report
            </Button>
          </div>
        </div>
        <hr />

        <div className="dashboard-cards">
          <div>
            <Card title="Total Customers" className="dashboard-card card1">
              {data.totalCustomers}
            </Card>
          </div>
          <div>
            <Card title="Sales Today" className="dashboard-card card2">
              {data.salesToday}
            </Card>
          </div>
          <div>
            <Card title="Monthly Sales" className="dashboard-card card3">
              {data.monthlySales}
            </Card>
          </div>
          <div>
            <Card title="Yearly Sales" className="dashboard-card card4">
              {data.yearlySales}
            </Card>
          </div>
        </div>

        <hr />

        {/* Line chart */}
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data.orders}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tickFormatter={formatDate} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="amount"
                stroke="#FF8042"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie chart */}
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data.salesByCategory}
                labelLine={false}
                label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#FFBB28"
                dataKey="count"
                nameKey="_id"
              >
                {data.salesByCategory.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={colors[index % colors.length]}
                  />
                ))}
              </Pie>
              <PieTooltip
                formatter={(value, name, props) => [
                  `${value}`,
                  `${props.payload._id}`,
                ]}
              />
              <PieLegend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="tableRow">
          <hr />
          <Table
            dataSource={data.recentOrders}
            scroll={{
              x: 500,
            }}
            columns={[
              { title: "Status", dataIndex: "status", key: "status" },

              {
                title: "User Name",
                key: "userName",
                render: (text, record) =>
                  `${record.address.firstName} ${record.address.lastName}`,
              },

              {
                title: "User Phone",
                key: "phone",
                render: (text, record) => `${record.address.phone}`,
              },

              {
                title: "Total Items",
                key: "items",
                render: (text, record) => `${record.items.length}`,
              },

              { title: "Amount", dataIndex: "amount", key: "cost" },

              {
                title: "Date",
                dataIndex: "date",
                key: "date",
                render: (date) => moment(date).format("DD-MM-YYYY"),
              },
            ]}
          />
        </div>
      </div>
      {renderReportModal()}
    </DashboardLayout>
  );
};

export default Dashboard;
