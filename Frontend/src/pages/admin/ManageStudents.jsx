import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { motion } from "framer-motion";

const ManageStudents = () => {

  const [students, setStudents] = useState([]);

  useEffect(() => {

    fetch("http://localhost:8080/admin/students")
      .then(res => res.json())
      .then(data => setStudents(data))
      .catch(err => console.error(err));

  }, []);

  return (
    <DashboardLayout role="admin">

      <h2 className="text-2xl font-bold font-display mb-6">
        Registered Students
      </h2>

      <div className="glass-card rounded-xl overflow-hidden">

        <table className="w-full">

          <thead>
            <tr className="border-b border-border">
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                #
              </th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                Email
              </th>
            </tr>
          </thead>

          <tbody>

            {students.map((s, i) => (

              <motion.tr
                key={s.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                className="border-b border-border/50 last:border-0"
              >

                <td className="p-4 text-muted-foreground">
                  {i + 1}
                </td>

                <td className="p-4 font-medium">
                  {s.email}
                </td>

              </motion.tr>

            ))}

            {students.length === 0 && (
              <tr>
                <td colSpan={2} className="p-8 text-center text-muted-foreground">
                  No students registered yet
                </td>
              </tr>
            )}

          </tbody>

        </table>

      </div>

    </DashboardLayout>
  );
};

export default ManageStudents;