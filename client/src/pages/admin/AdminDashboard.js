import React, { useState } from "react";
import AdminNav from "../../components/nav/AdminNav";


export const AdminDashboard = () => {
  const [loading, setLoading] = useState(false);

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-2'>
          <AdminNav />
        </div>
        <h4>Admin Dashboard</h4>
      </div>
    </div>
  );
};

export default AdminDashboard;
