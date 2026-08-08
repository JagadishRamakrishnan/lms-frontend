import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import MainLayout from "./layouts/MainLayout";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import Courses from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyLearning from "./pages/MyLearning";
import Learn from "./pages/Learn";
import Profile from "./pages/Profile";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

const PageTransition = ({ children }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.2 }}
  >
    {children}
  </motion.div>
);

function App() {
  const location = useLocation();
  const isLearnPage = location.pathname.startsWith("/learn/");

  const routes = (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<PageTransition><Home /></PageTransition>} />
      <Route path="/courses" element={<PageTransition><Courses /></PageTransition>} />
      <Route path="/courses/:id" element={<PageTransition><CourseDetails /></PageTransition>} />
      <Route path="/about" element={<PageTransition><About /></PageTransition>} />
      <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
      <Route path="/register" element={<PageTransition><Register /></PageTransition>} />
      <Route
        path="/my-learning"
        element={
          <ProtectedRoute>
            <PageTransition><MyLearning /></PageTransition>
          </ProtectedRoute>
        }
      />
      <Route
        path="/learn/:courseId"
        element={
          <ProtectedRoute>
            <PageTransition><Learn /></PageTransition>
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <PageTransition><Profile /></PageTransition>
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
    </Routes>
  );

  if (isLearnPage) {
    return <AnimatePresence mode="wait">{routes}</AnimatePresence>;
  }

  return (
    <MainLayout>
      <AnimatePresence mode="wait">{routes}</AnimatePresence>
    </MainLayout>
  );
}

export default App;
