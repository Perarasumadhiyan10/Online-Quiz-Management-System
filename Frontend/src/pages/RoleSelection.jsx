import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Shield, Users, GraduationCap } from 'lucide-react';

const roles = [
  {
    key: 'admin',
    label: 'Admin',
    desc: 'Manage staff, students, and view violation logs',
    icon: Shield,
    path: '/login/admin',
    gradient: 'from-primary to-primary/70',
  },
  {
    key: 'staff',
    label: 'Staff',
    desc: 'Create quizzes, manage questions, and view results',
    icon: Users,
    path: '/login/staff',
    gradient: 'from-accent to-accent/70',
  },
  {
    key: 'student',
    label: 'Student',
    desc: 'Take quizzes, view scores, and track progress',
    icon: GraduationCap,
    path: '/login/student',
    gradient: 'from-success to-success/70',
  },
];

const RoleSelection = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-bold font-display mb-3">
          <span className="gradient-text">QuizMaster</span>
        </h1>
        <p className="text-muted-foreground text-lg">Online Quiz Management System</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full ">
        {roles.map((role, i) => (
          <motion.button
            key={role.key}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
            whileHover={{ y: -8, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate(role.path)}
            className="glass-card rounded-2xl p-8 text-left group cursor-pointer"
          >
            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${role.gradient} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
              <role.icon className="h-14 w-14 text-primary-foreground bg-teal-600 rounded-lg text-white hover:bg-teal-400" />
            </div>
            <h3 className="text-xl font-bold font-display mb-2">{role.label}</h3>
            <p className="text-sm text-muted-foreground">{role.desc}</p>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default RoleSelection;
