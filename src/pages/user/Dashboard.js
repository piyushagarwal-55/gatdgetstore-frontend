import React from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";
import "../../styles/Dashboard.css"; // ⬅️ Import the new CSS

const Dashboard = () => {
  const [auth] = useAuth();

  return (
    <Layout title={"Dashboard - Ecommerce App"}>
      <div className="dashboard-container">
        <div className="dashboard-grid">
          {/* Sidebar */}
          <div className="dashboard-sidebar">
            <UserMenu />
          </div>

          {/* Main Content */}
          <div className="dashboard-main">
            <div className="dashboard-card">
              <h2>User Information</h2>
              <hr />
              <p><strong>Name:</strong> {auth?.user?.name}</p>
              <p><strong>Email:</strong> {auth?.user?.email}</p>
              <p><strong>Address:</strong> {auth?.user?.address}</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
