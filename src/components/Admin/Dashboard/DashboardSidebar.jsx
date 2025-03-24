import React, { useState } from "react";

import { NavLink } from "react-router-dom";

import "../../../stylesheets/Admin/Dashboard/DashboardSidebar.css";
import { Drawer, Button } from "antd";

const DashboardSidebar = () => {
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
            <NavLink to={"/admin/dashboard"} activeClassName="active" end>
              <i className="fa-solid fa-dashboard icon"></i>{" "}
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink to={"/admin/orders"} activeClassName="active" end>
              <i className="fa-solid fa-cart-shopping icon"></i>{" "}
              <span>Orders</span>
            </NavLink>
          </li>
          <li>
            <NavLink to={"/admin/reservations"} activeClassName="active" end>
              <i className="fa-solid fa-check-to-slot icon"></i>{" "}
              <span>Reservations</span>
            </NavLink>
          </li>
          <li>
            <NavLink to={"/admin/offline-orders"} activeClassName="active" end>
              <i className="fa-solid fa-shop icon"></i>{" "}
              <span>Offline Orders</span>
            </NavLink>
          </li>
          <li>
            <NavLink to={"/admin/events"} activeClassName="active" end>
              <i className="fa-solid fa-hand-spock icon"></i>
              <span>Events</span>
            </NavLink>
          </li>
          <li>
            <NavLink to={"/admin/items-list"} activeClassName="active" end>
              <i className="fa-solid fa-bowl-food icon"></i>
              <span>Available Foods</span>
            </NavLink>
          </li>
          <li>
            <NavLink to={"/admin/staff"} activeClassName="active" end>
              <i className="fa-solid fa-user icon"></i>
              <span>Staff</span>
            </NavLink>
          </li>
          <li>
            <NavLink to={"/admin/promotions"} activeClassName="active" end>
              <i className="fa-solid fa-receipt icon"></i>
              <span>Promo Codes</span>
            </NavLink>
          </li>
          <li>
            <NavLink to={"/admin/huts"} activeClassName="active" end>
              <i className="fa-solid fa-warehouse icon"></i>{" "}
              <span>Manage Hut</span>
            </NavLink>
          </li>
          <li>
            <NavLink to={"/admin/tables"} activeClassName="active" end>
              <i className="fa-solid fa-chair icon"></i>
              <span>Manage Table</span>
            </NavLink>
          </li>
          <li>
            <NavLink to={"/admin/pop-up"} activeClassName="active" end>
              <i className="fa-brands fa-discourse icon"></i>
              <span>Manage Pop-Up</span>
            </NavLink>
          </li>
          <li>
            <NavLink to={"/admin/banners"} activeClassName="active" end>
              <i className="fa-brands fa-slideshare icon"></i>
              <span>Banners</span>
            </NavLink>
          </li>
          <li>
            <NavLink to={"/admin/customers"} activeClassName="active" end>
              <i className="fa-solid fa-people-group icon"></i>
              <span>Our Customers</span>
            </NavLink>
          </li>
          <li>
            <NavLink to={"/admin/reviews"} activeClassName="active" end>
              <i className="fa-solid fa-star icon"></i>
              <span>Customer Reviews</span>
            </NavLink>
          </li>
          <li>
            <NavLink to={"/admin/contact"} activeClassName="active" end>
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
              <NavLink to={"/admin/dashboard"} activeClassName="active" end>
                <i className="fa-solid fa-dashboard icon"></i>{" "}
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={"/admin/orders"} activeClassName="active" end>
                <i className="fa-solid fa-cart-shopping icon"></i>{" "}
                <span>Orders</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={"/admin/reservations"} activeClassName="active" end>
                <i className="fa-solid fa-check-to-slot icon"></i>{" "}
                <span>Reservations</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/admin/offline-orders"}
                activeClassName="active"
                end
              >
                <i className="fa-solid fa-shop icon"></i>{" "}
                <span>Offline Orders</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={"/admin/events"} activeClassName="active" end>
                <i className="fa-solid fa-hand-spock icon"></i>
                <span>Events</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={"/admin/items-list"} activeClassName="active" end>
                <i className="fa-solid fa-bowl-food icon"></i>
                <span>Available Foods</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={"/admin/staff"} activeClassName="active" end>
                <i className="fa-solid fa-user icon"></i>
                <span>Staff</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={"/admin/promotions"} activeClassName="active" end>
                <i className="fa-solid fa-receipt icon"></i>
                <span>Promotions</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={"/admin/huts"} activeClassName="active" end>
                <i className="fa-solid fa-warehouse icon"></i>{" "}
                <span>Manage Hut</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={"/admin/tables"} activeClassName="active" end>
                <i className="fa-solid fa-chair icon"></i>
                <span>Manage Table</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={"/admin/pop-up"} activeClassName="active" end>
                <i className="fa-brands fa-discourse icon"></i>
                <span>Manage Pop-Up</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={"/admin/carousels"} activeClassName="active" end>
                <i className="fa-brands fa-slideshare icon"></i>
                <span>Carousels</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={"/admin/customers"} activeClassName="active" end>
                <i className="fa-solid fa-people-group icon"></i>
                <span>Our Customers</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={"/admin/reviews"} activeClassName="active" end>
                <i className="fa-solid fa-star icon"></i>
                <span>Customer Reviews</span>
              </NavLink>
            </li>
            <li>
              <NavLink to={"/admin/contact"} activeClassName="active" end>
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
export default DashboardSidebar;
