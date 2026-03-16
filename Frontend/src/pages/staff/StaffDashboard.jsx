import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import StatCard from "@/components/StatCard";
import { FileQuestion, Zap } from "lucide-react";

const StaffDashboard = () => {

  const [stats, setStats] = useState({
    quizzesCreated: 0,
    activeQuizzes: 0
  });

  useEffect(() => {

    fetch("http://localhost:8080/staff/dashboard")
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(err => console.error(err));

  }, []);

  return (
    <DashboardLayout role="staff">

      <h2 className="text-2xl font-bold font-display mb-6">
        Overview
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <StatCard
          title="Quizzes Created"
          value={stats.quizzesCreated}
          icon={FileQuestion}
          color="primary"
          delay={0}
        />

        <StatCard
          title="Active Quizzes"
          value={stats.activeQuizzes}
          icon={Zap}
          color="success"
          delay={0.1}
        />

      </div>

    </DashboardLayout>
  );
};

export default StaffDashboard;