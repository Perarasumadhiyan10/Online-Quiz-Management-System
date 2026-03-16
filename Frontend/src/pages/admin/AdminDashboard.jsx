import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import StatCard from "@/components/StatCard";
import { Users, GraduationCap, FileQuestion } from "lucide-react";

const AdminDashboard = () => {

  const [dashboard, setDashboard] = useState({
    totalStaff: 0,
    totalStudents: 0,
    totalResults: 0
  });

  useEffect(() => {

    fetch("http://localhost:8080/admin/dashboard")
      .then(res => res.json())
      .then(data => setDashboard(data))
      .catch(err => console.error(err));

  }, []);

  return (
    <DashboardLayout role="admin">

      <h2 className="text-2xl font-bold font-display mb-6">
        Overview
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <StatCard
          title="Total Staff"
          value={dashboard.totalStaff}
          icon={Users}
          color="accent"
          delay={0}
        />

        <StatCard
          title="Total Students"
          value={dashboard.totalStudents}
          icon={GraduationCap}
          color="success"
          delay={0.1}
        />

        <StatCard
          title="Total Results"
          value={dashboard.totalResults}
          icon={FileQuestion}
          color="primary"
          delay={0.2}
        />

      </div>

    </DashboardLayout>
  );
};

export default AdminDashboard;