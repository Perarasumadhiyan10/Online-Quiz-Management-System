import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Users, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const StaffLogin = () => {

  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {

    e.preventDefault();

    if (!name.trim()) {
      toast.error("Enter your name");
      return;
    }

    try {

      const res = await fetch("http://localhost:8080/staff/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: name.trim()
        })
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Login failed");
        return;
      }

      // Save session
      localStorage.setItem("staffName", data.name);
      localStorage.setItem("role", "staff");

      toast.success("Login successful");

      navigate("/staff");

    } catch (error) {

      toast.error("Server error");

    }

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-background p-6">

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-2xl p-8 w-full max-w-md"
      >

        <button
          onClick={() => navigate("/")}
          className="text-muted-foreground hover:text-foreground mb-6 flex items-center gap-2 text-sm"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>

        <div className="w-14 h-14 rounded-xl bg-emerald-500 flex items-center justify-center mb-5 text-white">
          <Users className="h-7 w-7" />
        </div>

        <h2 className="text-2xl font-bold mb-1">
          Staff Login
        </h2>

        <p className="text-sm text-muted-foreground mb-6">
          Enter your name (must be approved by admin)
        </p>

        <form onSubmit={handleLogin} className="space-y-4">

          <Input
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Button
            type="submit"
            className="w-full bg-emerald-500 text-white"
          >
            Login
          </Button>

        </form>

      </motion.div>

    </div>

  );

};

export default StaffLogin;