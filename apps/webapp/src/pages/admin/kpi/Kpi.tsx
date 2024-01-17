import * as React from "react";
import AdminNavBar from "~/components/Admin/AdminNavBar";
import KpiDashboard from "~/components/Admin/KpiDashboard";

const Kpi = () => {
  return (
    <div className="min-h-screen w-full">
      <AdminNavBar />
      <KpiDashboard />
    </div>
  );
};

export default Kpi;
