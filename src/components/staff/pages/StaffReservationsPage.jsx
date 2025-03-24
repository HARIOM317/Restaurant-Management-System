import React, { useEffect, useState, useContext, useRef } from "react";
import audio from "../../../audio/audio.mp3";
import axios from "axios";
import { toast } from "react-toastify";
import DashboardLayout from "../../Admin/Dashboard/DashboardLayout";
import { StoreContext } from "../../../context/StoreContext";
import { API_URL } from "../../../store/apiUrl";
import { Tabs, Table, Dropdown, Menu, Button, Modal, Input } from "antd";
import moment from "moment";
import { DownOutlined } from "@ant-design/icons";
import { io } from "socket.io-client";
import "../../../stylesheets/Admin/CommonStyle.css";

const { TabPane } = Tabs;

const StaffReservationsPage = () => {
  const audioRef = useRef(new Audio(audio));
  const socket = useRef(null);

  const [pendingReservations, setPendingReservations] = useState([]);
  const [confirmedReservations, setConfirmedReservations] = useState([]);
  const [completedReservations, setCompletedReservations] = useState([]);
  const [canceledReservations, setCanceledReservations] = useState([]);
  const [users, setUsers] = useState([]);
  const [cancelModalVisible, setCancelModalVisible] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [currentReservationId, setCurrentReservationId] = useState(null);
  const { token } = useContext(StoreContext);

  useEffect(() => {
    // Initialize socket connection
    socket.current = io(API_URL);

    // Listen for new reservations
    socket.current.on("newReservation", (newReservation) => {
      setPendingReservations((prev) => {
        const updatedReservations = [newReservation, ...prev].sort(
          (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
        );
        return updatedReservations;
      });
      playSound();
    });

    // Clean up on component unmount
    return () => {
      socket.current.disconnect();
    };
  }, []);

  const playSound = () => {
    audioRef.current.play();
  };

  const fetchAllUsers = async () => {
    if (!token) return;

    try {
      const response = await axios.get(`${API_URL}/api/user/all`, {
        headers: { token },
      });
      if (response.data.success) {
        setUsers(response.data.users);
      } else {
        toast.error("Something went wrong fetching users");
      }
    } catch (error) {
      toast.error("Something went wrong fetching users");
    }
  };

  const fetchAllReservations = async () => {
    if (!token) return;

    try {
      const response = await axios.get(`${API_URL}/api/reservation/all`, {
        headers: { token },
      });
      if (response.data.success) {
        const reservations = response.data.reservations;

        // Sorting the data
        const sortedReservations = reservations.sort(
          (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
        );

        const pending = [];
        const confirmed = [];
        const completed = [];
        const canceled = [];

        sortedReservations.forEach((reservation) => {
          if (reservation.status === "pending") {
            pending.push(reservation);
          } else if (reservation.status === "confirmed") {
            confirmed.push(reservation);
          } else if (reservation.status === "complete") {
            completed.push(reservation);
          } else if (reservation.status === "canceled") {
            canceled.push(reservation);
          }
        });

        setPendingReservations(pending);
        setConfirmedReservations(confirmed);
        setCompletedReservations(completed);
        setCanceledReservations(canceled);
      } else {
        toast.error("Something went wrong fetching reservations");
      }
    } catch (error) {
      toast.error("Something went wrong fetching reservations");
    }
  };

  const handleStatusChange = async (reservationId, newStatus) => {
    if (newStatus === "canceled") {
      setCurrentReservationId(reservationId);
      setCancelModalVisible(true);
    } else {
      try {
        const response = await axios.patch(
          `${API_URL}/api/reservation/update/${reservationId}`,
          { status: newStatus },
          { headers: { token } }
        );

        if (response.data.success) {
          await fetchAllReservations(); // Refresh the reservations
          toast.success("Reservation status updated successfully");
        } else {
          toast.error("Failed to update reservation status");
        }
      } catch (error) {
        toast.error("Error updating reservation status");
      }
    }
  };

  const handleCancelSubmit = async () => {
    if (!cancelReason) {
      toast.error("Please provide a reason for cancellation");
      return;
    }

    try {
      const response = await axios.patch(
        `${API_URL}/api/reservation/update/${currentReservationId}`,
        { status: "canceled", reason: cancelReason },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success("Reservation canceled successfully");
        setCancelModalVisible(false);
        setCancelReason("");
        await fetchAllReservations(); // Refresh the reservations
      } else {
        console.error("Failed to cancel reservation", response.data);
        toast.error("Failed to cancel reservation");
      }
    } catch (error) {
      console.error("Failed to cancel reservation", error);
      toast.error("Failed to cancel reservation");
    }
  };

  useEffect(() => {
    fetchAllReservations();
    fetchAllUsers();
  }, [token]);

  const getUserNameById = (userId) => {
    const user = users.find((user) => user._id === userId);
    return user ? user.name : "Unknown User";
  };

  const columns = [
    {
      title: "User Name",
      dataIndex: "user_id",
      key: "user_id",
      render: (userId) => getUserNameById(userId),
    },
    {
      title: "Reservation Type",
      dataIndex: "reservation_type",
      key: "reservation_type",
    },
    {
      title: "Reservation Name",
      dataIndex: "reservation_name",
      key: "reservation_name",
    },
    {
      title: "Date",
      dataIndex: "reservation_date",
      key: "reservation_date",
      render: (text) => moment(text).format("YYYY-MM-DD"),
    },
    {
      title: "Time",
      dataIndex: "reservation_time",
      key: "reservation_time",
    },
    {
      title: "Party Size",
      dataIndex: "party_size",
      key: "party_size",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text, record) => {
        let menu;
        if (text === "pending") {
          menu = (
            <Menu onClick={(e) => handleStatusChange(record._id, e.key)}>
              <Menu.Item key="pending">Pending</Menu.Item>
              <Menu.Item key="confirmed">Confirmed</Menu.Item>
              <Menu.Item key="canceled">Canceled</Menu.Item>
            </Menu>
          );
        } else if (text === "confirmed") {
          menu = (
            <Menu onClick={(e) => handleStatusChange(record._id, e.key)}>
              <Menu.Item key="confirmed">Confirmed</Menu.Item>
              <Menu.Item key="complete">Complete</Menu.Item>
            </Menu>
          );
        }

        return (
          menu && (
            <Dropdown overlay={menu} trigger={["click"]}>
              <Button>
                {text} <DownOutlined />
              </Button>
            </Dropdown>
          )
        );
      },
    },
  ];

  const completedColumns = columns.map((col) => {
    if (col.key === "status") {
      return {
        ...col,
        render: (text) => <span style={{ color: "green" }}>{text}</span>,
      };
    }
    return col;
  });

  const canceledColumns = columns.map((col) => {
    if (col.key === "status") {
      return {
        ...col,
        render: (text) => <span style={{ color: "red" }}>{text}</span>,
      };
    }
    return col;
  });

  return (
    <DashboardLayout>
      <div className="reservation common-style">
        <h3>Reservations Page</h3>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Pending Reservations" key="1">
            <Table
              dataSource={pendingReservations}
              columns={columns}
              rowKey="_id"
              scroll={{
                x: 500,
              }}
            />
          </TabPane>
          <TabPane tab="Confirmed Reservations" key="2">
            <Table
              dataSource={confirmedReservations}
              columns={columns}
              rowKey="_id"
              scroll={{
                x: 500,
              }}
            />
          </TabPane>
          <TabPane tab="Completed Reservations" key="3">
            <Table
              dataSource={completedReservations}
              columns={completedColumns}
              rowKey="_id"
              scroll={{
                x: 500,
              }}
            />
          </TabPane>
          <TabPane tab="Canceled Reservations" key="4">
            <Table
              dataSource={canceledReservations}
              columns={canceledColumns}
              rowKey="_id"
              scroll={{
                x: 500,
              }}
            />
          </TabPane>
        </Tabs>
      </div>

      <Modal
        title="Cancel Reservation"
        visible={cancelModalVisible}
        onOk={handleCancelSubmit}
        onCancel={() => setCancelModalVisible(false)}
      >
        <Input
          placeholder="Reason for cancellation"
          value={cancelReason}
          onChange={(e) => setCancelReason(e.target.value)}
        />
      </Modal>
    </DashboardLayout>
  );
};

export default StaffReservationsPage;
