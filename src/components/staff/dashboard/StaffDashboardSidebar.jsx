import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../../../stylesheets/Admin/Dashboard/DashboardSidebar.css";
import { Drawer, Button } from "antd";

const StaffDashboardSidebar = () => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  return (
    <div className="profile-sidebar">
      {/* Show Drawer Button in Small Devices */}
      <Button
        type="primary"
        shape="circle"
        icon={<i className="fa-solid fa-bars"></i>}
        size="large"
        className="dashboard-drawer-btn"
        onClick={showDrawer}
      />

      <nav className="dashboard-menu dashboard-menu-sidebar">
        <ul>
          <li>
            <NavLink to="/staff/orders" activeClassName="active" end>
              <i className="fa-solid fa-cart-shopping icon"></i>{" "}
              <span>Orders</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/staff/reservations" activeClassName="active" end>
              <i className="fa-solid fa-check-to-slot icon"></i>{" "}
              <span>Reservations</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/staff/offline-orders" activeClassName="active" end>
              <i className="fa-solid fa-shop icon"></i>{" "}
              <span>Offline Orders</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/staff/events" activeClassName="active" end>
              <i className="fa-solid fa-hand-spock icon"></i>
              <span>Events</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/staff/items-list" activeClassName="active" end>
              <i className="fa-solid fa-bowl-food icon"></i>
              <span>Available Foods</span>
            </NavLink>
          </li>

          <li>
            <NavLink to="/staff/tables" activeClassName="active" end>
              <i className="fa-solid fa-chair icon"></i>
              <span>Tables</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/staff/huts" activeClassName="active" end>
              <i className="fa-solid fa-home icon"></i>
              <span>Huts</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/staff/reviews" activeClassName="active" end>
              <i className="fa-solid fa-star icon"></i>
              <span>Customer Reviews</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/staff/contact" activeClassName="active" end>
              <i className="fa-solid fa-comment-dots icon"></i>
              <span>Contact Messages</span>
            </NavLink>
          </li>
        </ul>
      </nav>

      <Drawer title="Dashboard" onClose={onClose} open={open}>
        <nav className="dashboard-menu">
          <ul>
            <li>
              <NavLink to="/staff/orders" activeClassName="active" end>
                <i className="fa-solid fa-cart-shopping icon"></i>{" "}
                <span>Orders</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/staff/reservations" activeClassName="active" end>
                <i className="fa-solid fa-check-to-slot icon"></i>{" "}
                <span>Reservations</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/staff/offline-orders" activeClassName="active" end>
                <i className="fa-solid fa-shop icon"></i>{" "}
                <span>Offline Orders</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/staff/events" activeClassName="active" end>
                <i className="fa-solid fa-hand-spock icon"></i>
                <span>Events</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/staff/items-list" activeClassName="active" end>
                <i className="fa-solid fa-bowl-food icon"></i>
                <span>Available Foods</span>
              </NavLink>
            </li>

            <li>
              <NavLink to="/staff/tables" activeClassName="active" end>
                <i className="fa-solid fa-chair icon"></i>
                <span>Tables</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/staff/huts" activeClassName="active" end>
                <i className="fa-solid fa-home icon"></i>
                <span>Huts</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/staff/reviews" activeClassName="active" end>
                <i className="fa-solid fa-star icon"></i>
                <span>Customer Reviews</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/staff/contact" activeClassName="active" end>
                <i className="fa-solid fa-comment-dots icon"></i>
                <span>Contact Messages</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </Drawer>
    </div>
  );
};

export default StaffDashboardSidebar;
