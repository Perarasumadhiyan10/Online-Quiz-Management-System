import { NavLink as RouterNavLink, useNavigate } from "react-router-dom";
import { clearSession, getSession } from "@/lib/store";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  AlertTriangle,
  FilePlus,
  BarChart3,
  BookOpen,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const adminLinks = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/staff", label: "Manage Staff", icon: Users },
  { to: "/admin/students", label: "Manage Students", icon: GraduationCap },
  { to: "/admin/violations", label: "Violation Logs", icon: AlertTriangle },
];

const staffLinks = [
  { to: "/staff", label: "Dashboard", icon: LayoutDashboard },
  { to: "/staff/create-quiz", label: "Create Quiz", icon: FilePlus },
  { to: "/staff/results", label: "Quiz Results", icon: BarChart3 },
];

const studentLinks = [
  { to: "/student", label: "Dashboard", icon: LayoutDashboard },
  { to: "/student/results", label: "My Results", icon: BookOpen },
];

const DashboardLayout = ({ role, children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const session = getSession();

  const links =
    role === "admin"
      ? adminLinks
      : role === "staff"
      ? staffLinks
      : studentLinks;

  const roleLabel = role.charAt(0).toUpperCase() + role.slice(1);

  const handleLogout = () => {
    clearSession();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}

      <motion.aside
        initial={false}
        animate={{ width: sidebarOpen ? 260 : 0 }}
        className="bg-sidebar text-sidebar-foreground overflow-hidden flex-shrink-0 flex flex-col"
      >
        <div className="p-5 border-b border-sidebar-border">
          <h2 className="text-lg font-bold font-display text-sidebar-primary">
            QuizMaster
          </h2>

          <p className="text-xs text-sidebar-foreground/60 mt-1">
            {roleLabel} Panel
          </p>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {links.map((link) => (
            <RouterNavLink
              key={link.to}
              to={link.to}
              end={link.to === `/${role}`}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  isActive
                    ? "bg-sidebar-accent text-sidebar-primary font-medium"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                }`
              }
            >
              <link.icon className="h-4 w-4" />
              <span>{link.label}</span>
            </RouterNavLink>
          ))}
        </nav>

        <div className="p-3 border-t border-sidebar-border">
          <p className="text-xs text-sidebar-foreground/50 px-3 mb-2 truncate">
            {session?.identifier}
          </p>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-sidebar-foreground/70 hover:bg-destructive/10 hover:text-destructive w-full transition-colors bg-cyan-500"
          >
            <LogOut className="h-4 w-4 text-white" />
            <span className="text-white text-lg">Logout</span>
          </button>
        </div>
      </motion.aside>

      {/* Main */}

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 border-b border-border flex items-center px-4 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>

          <h1 className="ml-3 font-display font-semibold text-lg ">
            {roleLabel} Dashboard
          </h1>
        </header>

        <main className="flex-1 p-6 overflow-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;