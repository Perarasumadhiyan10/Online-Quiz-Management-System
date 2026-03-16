import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "@/components/ProtectedRoute";

import RoleSelection from "./pages/RoleSelection";
import AdminLogin from "./pages/AdminLogin";
import StaffLogin from "./pages/StaffLogin";
import StudentLogin from "./pages/StudentLogin";
import AdminDashboard from "./pages/admin/AdminDashboard"; 
import ManageStaff from "./pages/admin/ManageStaff";
import ManageStudents from "./pages/admin/ManageStudents";
import ViolationLogs from "./pages/admin/ViolationLogs";
import StaffDashboard from "./pages/staff/StaffDashboard";
import CreateQuiz from "./pages/staff/CreateQuiz";
import AddQuestions from "./pages/staff/AddQuestions";
import StaffResults from "./pages/staff/StaffResults";
import StudentDashboard from "./pages/student/StudentDashboard";
import StudentResults from "./pages/student/StudentResults";
import TakeQuiz from "./pages/student/TakeQuiz";
import NotFound from "./pages/NotFound";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RoleSelection />} />
          <Route path="/login/admin" element={<AdminLogin />} />
          <Route path="/login/staff" element={<StaffLogin />} />
          <Route path="/login/student" element={<StudentLogin />} />

          {/* Admin */}
          <Route path="/admin" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/staff" element={<ProtectedRoute role="admin"><ManageStaff /></ProtectedRoute>} />
          <Route path="/admin/students" element={<ProtectedRoute role="admin"><ManageStudents /></ProtectedRoute>} />
          <Route path="/admin/violations" element={<ProtectedRoute role="admin"><ViolationLogs /></ProtectedRoute>} />

          {/* Staff */}
          <Route path="/staff" element={<ProtectedRoute role="staff"><StaffDashboard /></ProtectedRoute>} />
          <Route path="/staff/create-quiz" element={<ProtectedRoute role="staff"><CreateQuiz /></ProtectedRoute>} />
          <Route path="/staff/quiz/:quizId/questions" element={<ProtectedRoute role="staff"><AddQuestions /></ProtectedRoute>} />
          <Route path="/staff/results" element={<ProtectedRoute role="staff"><StaffResults /></ProtectedRoute>} />

          {/* Student */}
          <Route path="/student" element={<ProtectedRoute role="student"><StudentDashboard /></ProtectedRoute>} />
          <Route path="/student/results" element={<ProtectedRoute role="student"><StudentResults /></ProtectedRoute>} />
          <Route path="/student/quiz/:quizId" element={<ProtectedRoute role="student"><TakeQuiz /></ProtectedRoute>} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
