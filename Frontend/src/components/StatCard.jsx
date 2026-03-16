import { motion } from "framer-motion";

const StatCard = ({ title, value, icon: Icon }) => {
  return (
    <motion.div
      className="glass-card p-6 rounded-xl flex items-center gap-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Icon className="h-6 w-6 text-primary" />
      <div>
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="text-xl font-bold">{value}</p>
      </div>
    </motion.div>
  );
};

export default StatCard;