import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, User, UserPlus } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await register(form.name, form.email, form.password);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="card w-full max-w-md p-8"
      >
        <h1 className="text-2xl font-bold text-slate-900">Create your account</h1>
        <p className="text-slate-500 text-sm mt-1">Start learning today</p>

        {error && (
          <div className="mt-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-700">Full Name</label>
            <div className="mt-1 relative">
              <User className="w-4 h-4 absolute left-3 top-3.5 text-slate-400" />
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full pl-10 pr-3 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Jane Doe"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700">Email</label>
            <div className="mt-1 relative">
              <Mail className="w-4 h-4 absolute left-3 top-3.5 text-slate-400" />
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full pl-10 pr-3 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="you@example.com"
              />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700">Password</label>
            <div className="mt-1 relative">
              <Lock className="w-4 h-4 absolute left-3 top-3.5 text-slate-400" />
              <input
                type="password"
                required
                minLength={6}
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full pl-10 pr-3 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="At least 6 characters"
              />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="btn-primary w-full disabled:opacity-60"
          >
            <UserPlus className="w-4 h-4" /> {loading ? "Creating account..." : "Create Account"}
          </motion.button>
        </form>

        <p className="text-sm text-slate-500 text-center mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-primary-600 font-medium">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
