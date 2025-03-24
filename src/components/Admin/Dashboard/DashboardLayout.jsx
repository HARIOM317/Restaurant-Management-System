import React from "react";
import DashboardSidebar from "./DashboardSidebar";
import Header from "../../Shared/Header/Header";
import StaffDashboardSidebar from "../../staff/dashboard/StaffDashboardSidebar";
import "../../../stylesheets/Admin/Dashboard/DashboardLayout.css";

const DashboardLayout = ({ children }) => {
  const role = localStorage.getItem("userRole");
  return (
    <>
      <Header />
      <div
        className="container-fluid dashboard-layout"
      >
        <div className="row">
          <div className="col-md-4 col-lg-4 col-xl-3">
            {role === "admin" ? (
              <DashboardSidebar />
            ) : role === "staff" ? (
              <StaffDashboardSidebar />
            ) : null}
          </div>
          <div className="col-md-8 col-lg-8 col-xl-9 main-content">{children}</div>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
