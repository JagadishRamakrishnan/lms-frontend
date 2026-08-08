import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { getCourses } from "../api";
import CourseCard from "../components/CourseCard";
import { CourseGridSkeleton } from "../components/Skeletons";
import EmptyState from "../components/EmptyState";
import ErrorState from "../components/ErrorState";

const categories = ["All", "Development"];
const levels = ["All", "Beginner", "Intermediate", "Advanced", "Beginner to Advanced", "Intermediate to Advanced"];
const sorts = [
  { value: "", label: "Newest" },
  { value: "price", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "popular", label: "Most Popular" },
];

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [status, setStatus] = useState("loading");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [level, setLevel] = useState("All");
  const [sort, setSort] = useState("");

  const fetchCourses = useCallback(async () => {
    setStatus("loading");
    try {
      const params = {};
      if (search) params.search = search;
      if (category !== "All") params.category = category;
      if (level !== "All") params.level = level;
      if (sort) params.sort = sort;

      const res = await getCourses(params);
      setCourses(res.courses);
      setStatus("success");
    } catch (err) {
      setStatus("error");
    }
  }, [search, category, level, sort]);

  useEffect(() => {
    const timeout = setTimeout(fetchCourses, 300);
    return () => clearTimeout(timeout);
  }, [fetchCourses]);

  return (
    <div className="px-16 py-12">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <h1 className="text-3xl font-bold text-slate-900">Explore Courses</h1>
        <p className="text-slate-500 mt-1">Find the right course to build your next skill</p>
      </motion.div>

      <div className="mt-8 flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
        <div className="relative w-full lg:max-w-sm">
          <Search className="w-4 h-4 absolute left-3 top-3.5 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search courses..."
            className="w-full pl-10 pr-3 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        <div className="flex flex-wrap gap-3">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-xl border border-slate-300 px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            className="rounded-xl border border-slate-300 px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            {levels.map((l) => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-xl border border-slate-300 px-3 py-2.5 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            {sorts.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-8">
        {status === "loading" && <CourseGridSkeleton count={6} />}
        {status === "error" && <ErrorState onRetry={fetchCourses} />}
        {status === "success" && courses.length === 0 && (
          <EmptyState title="No courses found." subtitle="Try adjusting your search or filters." />
        )}
        {status === "success" && courses.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, i) => (
              <CourseCard key={course._id} course={course} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;
