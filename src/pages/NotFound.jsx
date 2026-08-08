import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NotFound = () => (
  <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
    <motion.h1
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-6xl font-extrabold text-primary-600"
    >
      404
    </motion.h1>
    <p className="text-slate-600 mt-3">The page you're looking for doesn't exist.</p>
    <Link to="/" className="btn-primary mt-6">Back to Home</Link>
  </div>
);

export default NotFound;
