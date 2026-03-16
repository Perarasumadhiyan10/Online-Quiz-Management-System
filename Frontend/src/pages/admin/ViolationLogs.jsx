import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { motion } from "framer-motion";

const ViolationLogs = () => {

  const [results, setResults] = useState([]);

  useEffect(() => {

    fetch("http://localhost:8080/admin/violations")
      .then(res => res.json())
      .then(data => setResults(data))
      .catch(err => console.error(err));

  }, []);

  return (
    <DashboardLayout role="admin">

      <h2 className="text-2xl font-bold font-display mb-6">
        Violation Logs
      </h2>

      <div className="glass-card rounded-xl overflow-hidden overflow-x-auto">

        <table className="w-full min-w-[700px]">

          <thead>
            <tr className="border-b border-border">
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                Student
              </th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                Quiz ID
              </th>
              <th className="text-center p-4 text-sm font-medium text-muted-foreground">
                Score
              </th>
            </tr>
          </thead>

          <tbody>

            {results.map((r, i) => (

              <motion.tr
                key={r.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                className="border-b border-border/50 last:border-0"
              >

                <td className="p-4 font-medium">
                  {r.studentEmail}
                </td>

                <td className="p-4">
                  {r.quizId}
                </td>

                <td className="p-4 text-center">
                  {r.score}
                </td>

              </motion.tr>

            ))}

            {results.length === 0 && (
              <tr>
                <td colSpan={3} className="p-8 text-center text-muted-foreground">
                  No violations recorded
                </td>
              </tr>
            )}

          </tbody>

        </table>

      </div>

    </DashboardLayout>
  );
};

export default ViolationLogs;