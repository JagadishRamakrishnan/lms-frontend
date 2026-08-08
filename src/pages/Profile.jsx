import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, LogOut, BookOpen } from "lucide-react";
import { getUserProfile } from "../api/user";
import { useAuth } from "../context/AuthContext";
import ErrorState from "../components/ErrorState";

const Profile = () => {
  const { logout } = useAuth();
  const [profile, setProfile] = useState(null);
  const [status, setStatus] = useState("loading");

  const fetchProfile = async () => {
    setStatus("loading");
    try {
      const res = await getUserProfile();
      setProfile(res.user);
      setStatus("success");
    } catch (err) {
      setStatus("error");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (status === "loading") {
    return (
      <div className="container-x py-16">
        <div className="animate-pulse h-64 bg-slate-200 rounded-2xl max-w-lg" />
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="container-x py-16">
        <ErrorState onRetry={fetchProfile} />
      </div>
    );
  }

  return (
    <div className="container-x py-12">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="card max-w-lg p-8"
      >
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-xl font-bold">
            {profile.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-900">{profile.name}</h1>
            <p className="text-sm text-slate-500 flex items-center gap-1 mt-1">
              <Mail className="w-3.5 h-3.5" /> {profile.email}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-8">
          <div className="rounded-xl bg-slate-50 p-4 text-center">
            <BookOpen className="w-5 h-5 text-primary-600 mx-auto mb-1" />
            <p className="text-2xl font-bold text-slate-900">{profile.enrolledCoursesCount}</p>
            <p className="text-xs text-slate-500">Enrolled Courses</p>
          </div>
          <div className="rounded-xl bg-slate-50 p-4 text-center">
            <User className="w-5 h-5 text-primary-600 mx-auto mb-1" />
            <p className="text-2xl font-bold text-slate-900 capitalize">{profile.role}</p>
            <p className="text-xs text-slate-500">Account Type</p>
          </div>
        </div>

        <button onClick={logout} className="btn-secondary w-full mt-8 text-red-600 border-red-200">
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </motion.div>
    </div>
  );
};

export default Profile;
