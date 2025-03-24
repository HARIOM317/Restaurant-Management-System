import React, { useEffect, useState, useContext, useRef } from "react";
import audio from "../../../audio/audio.mp3";
import axios from "axios";
import { toast } from "react-toastify";
import DashboardLayout from "../../Admin/Dashboard/DashboardLayout";
import { StoreContext } from "../../../context/StoreContext";
import { API_URL } from "../../../store/apiUrl";
import { Tabs, Table, message, Modal, Tooltip, Tag } from "antd";
import moment from "moment";
import "../../../stylesheets/Admin/CommonStyle.css";
import { io } from "socket.io-client";

const { TabPane } = Tabs;
const { confirm } = Modal;

const StaffEventsPage = () => {
  const audioRef = useRef(new Audio(audio));
  const socket = useRef(null);

  const [currentEvents, setCurrentEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const [users, setUsers] = useState([]);
  const { token } = useContext(StoreContext);

  useEffect(() => {
    // Initialize socket connection
    socket.current = io(API_URL);

    // Listen for new events
    socket.current.on("newEvent", (newEvent) => {
      const eventDate = moment(newEvent.event_date).startOf("day");
      const today = moment().startOf("day");

      if (eventDate.isSame(today)) {
        setCurrentEvents((prev) => {
          const updatedEvents = [newEvent, ...prev].sort(
            (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
          );
          return updatedEvents;
        });
      } else if (eventDate.isAfter(today)) {
        setUpcomingEvents((prev) => {
          const updatedEvents = [newEvent, ...prev].sort(
            (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
          );
          return updatedEvents;
        });
      } else if (eventDate.isBefore(today)) {
        setPastEvents((prev) => {
          const updatedEvents = [newEvent, ...prev].sort(
            (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
          );
          return updatedEvents;
        });
      }
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

  const fetchAllEvents = async () => {
    if (!token) return;

    try {
      const response = await axios.get(`${API_URL}/api/event/allEvents`, {
        headers: { token },
      });
      if (response.data) {
        const events = response.data;

        // Sorting the data
        const sortedEvents = events.sort(
          (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
        );

        const today = moment().startOf("day");

        const current = sortedEvents.filter((event) =>
          moment(event.event_date).isSame(today, "day")
        );
        const upcoming = sortedEvents.filter((event) =>
          moment(event.event_date).isAfter(today, "day")
        );
        const past = sortedEvents.filter((event) =>
          moment(event.event_date).isBefore(today, "day")
        );

        setCurrentEvents(current);
        setUpcomingEvents(upcoming);
        setPastEvents(past);
      } else {
        toast.error("Failed to fetch events.");
      }
    } catch (error) {
      toast.error("Failed to fetch events.");
    }
  };

  useEffect(() => {
    fetchAllEvents();
    fetchAllUsers();
  }, [token]);

  const getUserNameById = (userId) => {
    const user = users.find((user) => user._id === userId);
    return user ? user.name : "N/A";
  };

  const getUserEmailById = (userId) => {
    const user = users.find((user) => user._id === userId);
    return user ? user.email : "N/A";
  };

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text).then(() => {
      message.success(`${type} copied`);
    });
  };

  const columns = [
    {
      title: "User Name",
      dataIndex: "user_id",
      key: "user_id",
      render: (userId) => getUserNameById(userId),
    },
    {
      title: "Contact",
      dataIndex: "mobile",
      key: "mobile",
      render: (mobile) => (
        <Tooltip title="Copy Phone Number">
          <span>
            <Tag
              color="#c7f0d9"
              className="tag"
              onClick={() => copyToClipboard(mobile, "Phone number")}
              style={{
                border: "1.5px solid #849f90",
                fontWeight: "500",
                textTransform: "capitalize",
                padding: "4px 8px",
                color: "var(--textColor)",
                width: "120px",
                textAlign: "center",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              {mobile}
            </Tag>
          </span>
        </Tooltip>
      ),
    },
    {
      title: "Event Name",
      dataIndex: "event_name",
      key: "event_name",
    },
    {
      title: "Event Date",
      dataIndex: "event_date",
      key: "event_date",
      render: (date) => moment(date).format("DD-MM-YYYY"),
    },
    {
      title: "Event Time",
      dataIndex: "event_time",
      key: "event_time",
    },
    {
      title: "Party Size",
      dataIndex: "party_size",
      key: "party_size",
    },
    {
      title: "User Email",
      dataIndex: "user_id",
      key: "user_id",
      render: (userId) => (
        <Tooltip title="Copy Email">
          <span>
            <Tag
              color="#eedfc0"
              className="ms-2"
              onClick={() => copyToClipboard(getUserEmailById(userId), "Email")}
              style={{
                border: "1.5px solid #9f9580",
                fontWeight: "500",
                textTransform: "capitalize",
                padding: "4px 8px",
                color: "var(--textColor)",
                textAlign: "center",
                cursor: "pointer",
                fontSize: "14px",
              }}
            >
              {getUserEmailById(userId)}
            </Tag>
          </span>
        </Tooltip>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
  ];

  const pastEventColumns = [...columns];

  return (
    <DashboardLayout>
      <div className="common-style">
        <h3>Events Page</h3>
        <Tabs defaultActiveKey="2">
          <TabPane tab="Upcoming Events" key="2">
            <Table
              columns={columns}
              dataSource={upcomingEvents}
              rowKey="_id"
              scroll={{
                x: 500,
              }}
            />
          </TabPane>
          <TabPane tab="Today's Events" key="1">
            <Table
              columns={columns}
              dataSource={currentEvents}
              rowKey="_id"
              scroll={{
                x: 500,
              }}
            />
          </TabPane>
          <TabPane tab="Past Events" key="3">
            <Table
              columns={pastEventColumns}
              dataSource={pastEvents}
              rowKey="_id"
              scroll={{
                x: 500,
              }}
            />
          </TabPane>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default StaffEventsPage;
