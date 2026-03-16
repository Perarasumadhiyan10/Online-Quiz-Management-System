import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Shield, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { setSession } from '@/lib/store';
import { toast } from 'sonner';

const ADMIN_USER = 'admin';
const ADMIN_PASS = 'admin123';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === ADMIN_USER && password === ADMIN_PASS) {
      setSession({ role: 'admin', identifier: 'admin' });
      navigate('/admin');
    } else {
      toast.error('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-2xl p-8 w-full max-w-md"
      >
        <button onClick={() => navigate('/')} className="text-muted-foreground hover:text-foreground mb-6 flex items-center gap-2 text-sm">
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center mb-5 bg-pink-600 text-white">
          <Shield className="h-7 w-7 text-primary-foreground" />
        </div>
        <h2 className="text-2xl font-bold font-display mb-1">Admin Login</h2>
        <p className="text-sm text-muted-foreground mb-6">Enter admin credentials</p>
        <form onSubmit={handleLogin} className="space-y-4">
          <Input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
          <Input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
          <Button type="submit" className="w-full bg-pink-600 text-xl text-white">Login</Button>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
