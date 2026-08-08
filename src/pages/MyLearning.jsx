import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { PlayCircle } from "lucide-react";
import { getMyCourses } from "../api/enrollment";
import EmptyState from "../components/EmptyState";
import ErrorState from "../components/ErrorState";
import { CourseGridSkeleton } from "../components/Skeletons";

const MyLearning = () => {
  const [myCourses, setMyCourses] = useState([]);
  const [status, setStatus] = useState("loading");

  const fetchMyCourses = async () => {
    setStatus("loading");
    try {
      const res = await getMyCourses();
      setMyCourses(res.myCourses);
      setStatus("success");
    } catch (err) {
      setStatus("error");
    }
  };

  useEffect(() => {
    fetchMyCourses();
  }, []);

  return (
    <div className="container-x py-12">
      <h1 className="text-3xl font-bold text-slate-900">My Learning</h1>
      <p className="text-slate-500 mt-1">Continue where you left off</p>

      <div className="mt-8">
        {status === "loading" && <CourseGridSkeleton count={3} />}
        {status === "error" && <ErrorState onRetry={fetchMyCourses} />}
        {status === "success" && myCourses.length === 0 && (
          <EmptyState title="You haven't enrolled in any courses yet." subtitle="Browse courses to get started." />
        )}
        {status === "success" && myCourses.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {myCourses.map((item, i) => (
              <motion.div
                key={item.enrollmentId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="card overflow-hidden"
              >
                <img src={item.course.thumbnail} alt={item.course.title} className="h-40 w-full object-cover" />
                <div className="p-4">
                  <h3 className="font-semibold text-slate-900 line-clamp-2">{item.course.title}</h3>
                  <p className="text-sm text-slate-500 mt-1">{item.course.instructor}</p>

                  <div className="mt-3">
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                      <span>{item.completedLectures}/{item.totalLectures} lectures</span>
                      <span>{item.progress}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${item.progress}%` }}
                        transition={{ duration: 0.6 }}
                        className="h-full bg-primary-600 rounded-full"
                      />
                    </div>
                  </div>

                  <Link to={`/learn/${item.course.id}`} className="btn-primary w-full mt-4 !py-2.5 text-sm">
                    <PlayCircle className="w-4 h-4" /> Continue Learning
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyLearning;
