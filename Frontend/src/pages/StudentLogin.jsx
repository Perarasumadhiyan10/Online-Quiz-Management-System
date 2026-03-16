import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { GraduationCap, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const StudentLogin = () => {

  const [loginEmail, setLoginEmail] = useState("");
  const [regEmail, setRegEmail] = useState("");

  const navigate = useNavigate();

  // LOGIN
  const handleLogin = async (e) => {

    e.preventDefault();

    if (!emailRegex.test(loginEmail)) {
      toast.error("Invalid email format");
      return;
    }

    try {

      const res = await fetch("http://localhost:8080/student/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: loginEmail
        })
      });

      if (!res.ok) {
        toast.error("Email not registered");
        return;
      }

      const data = await res.json();

      localStorage.setItem("studentEmail", data.email);
      localStorage.setItem("role", "student");

      toast.success("Login successful");

      navigate("/student");

    } catch {
      toast.error("Server error");
    }

  };

  // REGISTER
  const handleRegister = async (e) => {

    e.preventDefault();

    if (!emailRegex.test(regEmail)) {
      toast.error("Invalid email format");
      return;
    }

    try {

      const res = await fetch("http://localhost:8080/student/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: regEmail
        })
      });

      if (!res.ok) {
        toast.error("Email already registered");
        return;
      }

      const data = await res.json();

      toast.success("Registered successfully");

      setLoginEmail(data.email);
      setRegEmail("");

    } catch {
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

        <div className="w-14 h-14 rounded-xl bg-cyan-400 flex items-center justify-center mb-5 text-white">
          <GraduationCap className="h-7 w-7" />
        </div>

        <h2 className="text-2xl font-bold mb-4">
          Student Portal
        </h2>

        <Tabs defaultValue="login">

          <TabsList className="w-full mb-4 gap-12">

            <TabsTrigger value="login" className="flex-1 bg-pink-600 text-white">
              Login
            </TabsTrigger>

            <TabsTrigger value="register" className="flex-1 bg-rose-600 text-white">
              Register
            </TabsTrigger>

          </TabsList>

          <TabsContent value="login">

            <form onSubmit={handleLogin} className="space-y-4">

              <Input
                type="email"
                placeholder="Email address"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
              />

              <Button
                type="submit"
                className="w-full bg-pink-600 text-white"
              >
                Login
              </Button>

            </form>

          </TabsContent>

          <TabsContent value="register">

            <form onSubmit={handleRegister} className="space-y-4">

              <Input
                type="email"
                placeholder="Email address"
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
              />

              <Button
                type="submit"
                className="w-full bg-rose-600 text-white"
              >
                Register
              </Button>

            </form>

          </TabsContent>

        </Tabs>

      </motion.div>

    </div>

  );

};

export default StudentLogin;