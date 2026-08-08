import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Circle, Lock, ChevronLeft, ChevronRight, Menu, X } from "lucide-react";
import { getCourseById } from "../api/course";
import { getCourseProgress, markLectureComplete } from "../api/progress";
import ErrorState from "../components/ErrorState";

const Learn = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [completedIds, setCompletedIds] = useState([]);
  const [progressPercent, setProgressPercent] = useState(0);
  const [activeLecture, setActiveLecture] = useState(null);
  const [status, setStatus] = useState("loading");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [marking, setMarking] = useState(false);

  const allLectures = useMemo(() => {
    if (!course) return [];
    return course.sections.flatMap((s) => s.lectures).sort((a, b) => a.order - b.order);
  }, [course]);

  const fetchData = async () => {
    setStatus("loading");
    try {
      const courseRes = await getCourseById(courseId);
      if (!courseRes.isEnrolled) {
        navigate(`/courses/${courseId}`);
        return;
      }
      setCourse(courseRes.course);
      setIsEnrolled(courseRes.isEnrolled);

      const progressRes = await getCourseProgress(courseId);
      setCompletedIds(progressRes.completedLectureIds);
      setProgressPercent(progressRes.progressPercent);

      const lectures = courseRes.course.sections.flatMap((s) => s.lectures).sort((a, b) => a.order - b.order);
      const firstIncomplete = lectures.find((l) => !progressRes.completedLectureIds.includes(l._id));
      setActiveLecture(firstIncomplete || lectures[0]);

      setStatus("success");
    } catch (err) {
      setStatus("error");
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId]);

  const handleMarkComplete = async () => {
    if (!activeLecture) return;
    setMarking(true);
    try {
      const res = await markLectureComplete(courseId, activeLecture._id);
      setCompletedIds((prev) => (prev.includes(activeLecture._id) ? prev : [...prev, activeLecture._id]));
      setProgressPercent(res.progressPercent);
    } catch (err) {
      // no-op; leave UI as is
    } finally {
      setMarking(false);
    }
  };

  const goToLecture = (lecture) => {
    setActiveLecture(lecture);
    setSidebarOpen(false);
  };

  const currentIndex = allLectures.findIndex((l) => l._id === activeLecture?._id);
  const goPrev = () => currentIndex > 0 && setActiveLecture(allLectures[currentIndex - 1]);
  const goNext = () => currentIndex < allLectures.length - 1 && setActiveLecture(allLectures[currentIndex + 1]);

  if (status === "loading") {
    return (
      <div className="container-x py-16">
        <div className="animate-pulse h-96 bg-slate-200 rounded-2xl" />
      </div>
    );
  }

  if (status === "error" || !course) {
    return (
      <div className="container-x py-16">
        <ErrorState onRetry={fetchData} />
      </div>
    );
  }

  return (
    <div className="bg-slate-950 min-h-screen text-white">
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800">
        <Link to={`/courses/${course._id}`} className="text-sm text-slate-300 hover:text-white">
          &larr; {course.title}
        </Link>
        <button className="lg:hidden p-2" onClick={() => setSidebarOpen(true)}>
          <Menu className="w-5 h-5" />
        </button>
      </div>

      <div className="flex flex-col lg:flex-row">
        <div className="flex-1 flex flex-col">
          <div className="bg-black aspect-video w-full">
            {activeLecture && (
              <video key={activeLecture._id} src={activeLecture.videoUrl} controls className="w-full h-full" />
            )}
          </div>

          <div className="p-6">
            <h2 className="text-xl font-semibold">{activeLecture?.title}</h2>
            <p className="text-slate-400 text-sm mt-2">{activeLecture?.description}</p>

            <div className="mt-3">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span>Course Progress</span>
                <span>{progressPercent}%</span>
              </div>
              <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.6 }}
                  className="h-full bg-primary-500 rounded-full"
                />
              </div>
            </div>

            <div className="flex items-center justify-between mt-6">
              <button
                onClick={goPrev}
                disabled={currentIndex <= 0}
                className="flex items-center gap-1 text-sm text-slate-300 disabled:opacity-30"
              >
                <ChevronLeft className="w-4 h-4" /> Previous
              </button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleMarkComplete}
                disabled={marking || completedIds.includes(activeLecture?._id)}
                className="btn-primary !py-2 !px-5 text-sm disabled:opacity-60"
              >
                <CheckCircle2 className="w-4 h-4" />
                {completedIds.includes(activeLecture?._id) ? "Completed" : marking ? "Saving..." : "Mark Complete"}
              </motion.button>

              <button
                onClick={goNext}
                disabled={currentIndex >= allLectures.length - 1}
                className="flex items-center gap-1 text-sm text-slate-300 disabled:opacity-30"
              >
                Next <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Desktop sidebar */}
        <aside className="hidden lg:block w-80 border-l border-slate-800 max-h-[calc(100vh-49px)] overflow-y-auto">
          <CurriculumList
            course={course}
            activeLecture={activeLecture}
            completedIds={completedIds}
            onSelect={goToLecture}
          />
        </aside>

        {/* Mobile sidebar */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/60 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ duration: 0.25 }}
                onClick={(e) => e.stopPropagation()}
                className="absolute right-0 top-0 h-full w-80 bg-slate-950 border-l border-slate-800 overflow-y-auto"
              >
                <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800">
                  <span className="font-medium text-sm">Curriculum</span>
                  <button onClick={() => setSidebarOpen(false)}>
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <CurriculumList
                  course={course}
                  activeLecture={activeLecture}
                  completedIds={completedIds}
                  onSelect={goToLecture}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const CurriculumList = ({ course, activeLecture, completedIds, onSelect }) => (
  <div className="p-2">
    {course.sections.map((section) => (
      <div key={section._id} className="mb-2">
        <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
          {section.title}
        </p>
        {section.lectures.map((lec) => {
          const isActive = activeLecture?._id === lec._id;
          const isDone = completedIds.includes(lec._id);
          return (
            <button
              key={lec._id}
              onClick={() => onSelect(lec)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-sm ${
                isActive ? "bg-primary-600/20 text-primary-300" : "text-slate-300 hover:bg-slate-800"
              }`}
            >
              {isDone ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              ) : (
                <Circle className="w-4 h-4 text-slate-500 flex-shrink-0" />
              )}
              <span className="flex-1 line-clamp-2">{lec.title}</span>
              <span className="text-xs text-slate-500">{lec.duration}</span>
            </button>
          );
        })}
      </div>
    ))}
  </div>
);

export default Learn;
