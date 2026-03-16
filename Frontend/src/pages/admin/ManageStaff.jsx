import { useEffect, useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";

const ManageStaff = () => {

  const [staffList, setStaffList] = useState([]);
  const [newName, setNewName] = useState("");

  // LOAD STAFF FROM BACKEND
  const loadStaff = () => {
    fetch("http://localhost:8080/admin/staff")
      .then(res => res.json())
      .then(data => setStaffList(data));
  };

  useEffect(() => {
    loadStaff();
  }, []);

  // ADD STAFF
  const handleAdd = async (e) => {
    e.preventDefault();

    if (!newName.trim()) return;

    await fetch("http://localhost:8080/admin/add-staff", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: newName
      })
    });

    toast.success("Staff added");

    setNewName("");

    loadStaff();
  };

  // APPROVE STAFF
  const handleToggleApproval = async (id) => {

    await fetch(`http://localhost:8080/admin/approve/${id}`, {
      method: "PUT"
    });

    loadStaff();
  };

  return (
    <DashboardLayout role="admin">

      <h2 className="text-2xl font-bold font-display mb-6">
        Manage Staff
      </h2>

      {/* ADD STAFF FORM */}

      <form onSubmit={handleAdd} className="flex gap-3 mb-8 max-w-md">

        <Input
          placeholder="Staff name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />

        <Button type="submit" className="bg-cyan-300">

          <Plus className="h-4 w-4 mr-1" /> Add

        </Button>

      </form>

      {/* STAFF TABLE */}

      <div className="glass-card rounded-xl overflow-hidden">

        <table className="w-full">

          <thead>
            <tr className="border-b border-border">
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                Name
              </th>
              <th className="text-center p-4 text-sm font-medium text-muted-foreground">
                Approved
              </th>
            </tr>
          </thead>

          <tbody>

            {staffList.map((s, i) => (

              <motion.tr
                key={s.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                className="border-b border-border/50 last:border-0"
              >

                <td className="p-4 font-medium">{s.name}</td>

                <td className="p-4 text-center">

                  <Switch
                    checked={s.approved}
                    onCheckedChange={() => handleToggleApproval(s.id)}
                    className="data-[state=checked]:bg-green-500"
                  />

                </td>

              </motion.tr>

            ))}

            {staffList.length === 0 && (
              <tr>
                <td colSpan={2} className="p-8 text-center text-muted-foreground">
                  No staff members yet
                </td>
              </tr>
            )}

          </tbody>

        </table>

      </div>

    </DashboardLayout>
  );
};

export default ManageStaff;