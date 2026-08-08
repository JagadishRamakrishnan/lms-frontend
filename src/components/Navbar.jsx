import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, Menu, X, User, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/courses", label: "Courses" },
  { to: "/about", label: "About" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/");
  };

  return (
    <header className="">
      <nav className="lg:px-16 px-5 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2 font-semibold md:text-3xl text-xl text-slate-900">
          <span className="h-9 w-9 rounded-xl bg-[#252422] text-white flex items-center justify-center">
            <GraduationCap className="w-5 h-5" />
          </span>
          SMITIV-Edu
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-lg font-medium transition-colors ${
                  isActive ? " text-[#89b592] border-b-2 border-[#89b592]" : "text-neutral-900 hover:text-neutral-900"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          {user && (
            <NavLink
              to="/my-learning"
              className={({ isActive }) =>
                `text-lg font-medium transition-colors ${
                  isActive ? "text-[#89b592] border-b-2 border-[#89b592]" : "text-neutral-900 hover:text-neutral-900"
                }`
              }
            >
              My Learning
            </NavLink>
          )}
        </div>

        <div className="hidden md:flex items-center gap-3">
          {!user ? (
            <>
              <Link to="/login" className="text-lg font-medium text-slate-700 hover:text-slate-900">
                Login
              </Link>
              <Link to="/register" className="bg-[#c4dac8] p-2 rounded-md  text-lg text-slate-900 hover:bg-[#b8cfa7]">
                Get Started
              </Link>
            </>
          ) : (
            <div className="relative">
              <button
                onClick={() => setMenuOpen((v) => !v)}
                className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200"
              >
                <User className="w-4 h-4" />
                {user.name?.split(" ")[0]}
              </button>
              <AnimatePresence>
                {menuOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: -8 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute z-20 right-0 mt-2 w-48 rounded-xl border border-slate-200 bg-white shadow-lg py-2"
                  >
                    <Link
                      to="/profile"
                      onClick={() => setMenuOpen(false)}
                      className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                    >
                      Profile
                    </Link>
                    <Link
                      to="/my-learning"
                      onClick={() => setMenuOpen(false)}
                      className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                    >
                      My Learning
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="w-4 h-4" /> Logout
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        <button className="md:hidden p-2" onClick={() => setOpen((v) => !v)} aria-label="Toggle menu">
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden border-t border-slate-200 bg-white"
          >
            <div className="container-x py-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link key={link.to} to={link.to} onClick={() => setOpen(false)} className="text-slate-700 font-medium">
                  {link.label}
                </Link>
              ))}
              {user && (
                <>
                  <Link to="/my-learning" onClick={() => setOpen(false)} className="text-slate-700 font-medium">
                    My Learning
                  </Link>
                  <Link to="/profile" onClick={() => setOpen(false)} className="text-slate-700 font-medium">
                    Profile
                  </Link>
                </>
              )}
              <div className="flex gap-3 pt-2">
                {!user ? (
                  <div className="flex w-full flex-col gap-3">
                    <Link to="/login" onClick={() => setOpen(false)} className="btn-secondary flex-1 !py-2 text-sm">
                      Login
                    </Link>
                    <Link to="/register" onClick={() => setOpen(false)} className="btn-primary flex-1 !py-2 text-sm">
                      Get Started
                    </Link>
                  </div>
                ) : (
                  <button
                    onClick={handleLogout}
                    className="btn-secondary flex-1 !py-2 text-sm text-red-600 border-red-200"
                  >
                    Logout
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
