import React, { useEffect, useState, useContext, useRef } from "react";
import audio from "../../../audio/audio2.mp3";
import DashboardLayout from "../../Admin/Dashboard/DashboardLayout";
import axios from "axios";
import { Table, Empty } from "antd";
import { StoreContext } from "../../../context/StoreContext";
import { API_URL } from "../../../store/apiUrl";
import { io } from "socket.io-client";
import "../../../stylesheets/Admin/CommonStyle.css";

const StaffContactMessages = () => {
  const audioRef = useRef(new Audio(audio));
  const socket = useRef(null);

  const contactMessagesUrl = `${API_URL}/api/contact/`;
  const { token } = useContext(StoreContext);

  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Initialize socket connection
    socket.current = io(API_URL);

    // Listen for new contact message
    socket.current.on("newContactMessage", (newContactMessage) => {
      setMessages((prev) => {
        const updatedMessage = [newContactMessage, ...prev].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        return updatedMessage;
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

  const fetchMessages = async () => {
    if (!token) {
      return;
    }

    try {
      const response = await axios.get(contactMessagesUrl, {
        headers: { token },
      });
      console.log("Responded code: ", response);
      if (response.status === 200) {
        // Sorting the data
        const sortedMessages = response.data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setMessages(sortedMessages);
      } else {
        console.log("Failed to fetch contact messages.");
      }
    } catch (error) {
      console.log("Error fetching contact messages.");
    }
  };

  useEffect(() => {
    fetchMessages();
  }, [token]);

  const columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Subject",
      dataIndex: "subject",
      key: "subject",
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
    },
  ];

  return (
    <DashboardLayout>
      <div className="common-style">
        <h3 style={{ marginBottom: "1rem" }}>Contact Messages</h3>

        <div className="list-table">
          {messages.length > 0 ? (
            <Table
              dataSource={messages}
              columns={columns}
              rowKey="_id"
              pagination={true}
              scroll={{ x: 500 }}
            />
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "70vh",
              }}
            >
              <Empty />
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StaffContactMessages;
