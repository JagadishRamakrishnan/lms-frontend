import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star, Users, Clock, BarChart3, Globe, CheckCircle2, Lock, PlayCircle,
  ChevronDown, ShieldCheck,
} from "lucide-react";
import { getCourseById } from "../api/course";
import { createPaymentOrder, verifyPayment } from "../api/payment";
import { enrollCourse } from "../api/enrollment";
import { useAuth } from "../context/AuthContext";
import ErrorState from "../components/ErrorState";
import {
  Globe2,
} from "lucide-react";
const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [course, setCourse] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [status, setStatus] = useState("loading");
  const [openSection, setOpenSection] = useState(0);
  const [previewLecture, setPreviewLecture] = useState(null);
  const [paying, setPaying] = useState(false);
  const [payError, setPayError] = useState("");

  const fetchCourse = async () => {
    setStatus("loading");
    try {
      const res = await getCourseById(id);
      setCourse(res.course);
      setIsEnrolled(res.isEnrolled);
      setStatus("success");
    } catch (err) {
      setStatus("error");
    }
  };

  useEffect(() => {
    fetchCourse();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleBuyNow = async () => {
    setPayError("");
    if (!user) {
      navigate("/login", { state: { from: { pathname: `/courses/${id}` } } });
      return;
    }

    setPaying(true);
    try {
      const orderRes = await createPaymentOrder(course._id);
      const { order, keyId } = orderRes;

      const options = {
        key: keyId || import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "LearnHub",
        description: course.title,
        order_id: order.id,
        handler: async (response) => {
          try {
            await verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              courseId: course._id,
            });
            navigate("/my-learning");
          } catch (err) {
            setPayError(err.response?.data?.message || "Payment verification failed.");
          } finally {
            setPaying(false);
          }
        },
        modal: {
          ondismiss: () => setPaying(false),
        },
        prefill: {
          name: user.name,
          email: user.email,
        },
        theme: { color: "#2141f0" },
      };

      if (!window.Razorpay) {
        setPayError("Payment gateway failed to load. Please check your connection.");
        setPaying(false);
        return;
      }

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", () => {
        setPayError("Payment failed. Please try again.");
        setPaying(false);
      });
      rzp.open();
    } catch (err) {
      setPayError(err.response?.data?.message || "Could not start payment. Please try again.");
      setPaying(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="container-x py-16">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-slate-200 rounded w-2/3" />
          <div className="h-4 bg-slate-200 rounded w-1/3" />
          <div className="h-64 bg-slate-200 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (status === "error" || !course) {
    return (
      <div className="container-x py-16">
        <ErrorState onRetry={fetchCourse} />
      </div>
    );
  }

  const discountPct = course.price > course.discountPrice
    ? Math.round(((course.price - course.discountPrice) / course.price) * 100)
    : 0;

  return (
    <div className="">
      <div className="bg-[#c4c8ee] text-black">
        <div className="container-x py-12 grid lg:grid-cols-3 gap-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-2"
          >
            <p className="text-black text-base font-medium">{course.category}</p>
            <h1 className="text-3xl sm:text-4xl font-bold mt-2">{course.title}</h1>
            <p className="mt-4 text-black max-w-2xl">{course.description}</p>

            <div className="flex flex-wrap items-center gap-4 mt-5 text-sm">
              <span className="flex items-center gap-1 text-black font-semibold">
                <Star className="w-4 h-4 fill-black" /> {course.rating}
              </span>
              <span className="flex items-center gap-1 text-black">
                <Users className="w-4 h-4" /> {course.studentsCount} students
              </span>
              <span className="flex items-center gap-1 text-black">
                <Clock className="w-4 h-4" /> {course.duration}
              </span>
              <span className="flex items-center gap-1 text-black">
                <BarChart3 className="w-4 h-4" /> {course.level}
              </span>
              <span className="flex items-center gap-1 text-black">
                <Globe className="w-4 h-4" /> {course.language}
              </span>
            </div>
            <p className="mt-3 text-sm text-black">Instructor: <span className="text-black font-medium">{course.instructor}</span></p>
          </motion.div>
        </div>
      </div>

      <div className="container-x py-16">
        <div className="grid lg:grid-cols-[1fr_390px] gap-12 items-start">

          <div>
            <motion.section
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              {/* Section label */}
              <div className="flex items-center gap-3 mb-5">
                <span className="text-xs font-bold tracking-[0.2em] text-primary-600 uppercase">
                  01 — Learning Outcomes
                </span>

                <div className="h-px flex-1 bg-slate-200" />
              </div>

              <div className="grid md:grid-cols-[1fr_1.4fr] gap-8 mb-9">
                <div>
                  <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900 leading-tight">
                    Skills that
                    <br />
                    <span className="text-primary-600">
                      move you forward.
                    </span>
                  </h2>
                </div>

                <p className="text-sm sm:text-base leading-7 text-black max-w-lg">
                  Learn practical skills through structured lessons and
                  real-world projects designed to help you become confident
                  in your field.
                </p>
              </div>

              {/* Colorful Learning Cards */}
              <div className="grid sm:grid-cols-2 gap-5">
                {course.whatYouWillLearn?.map((item, i) => {
                  const cardColors = [
                    "#ffefb0",
                    "#e1e3f6",
                    "#fadfca",
                  ];

                  const cardBg = cardColors[i % cardColors.length];

                  return (
                    <motion.div
                      key={i}
                      whileHover={{
                        y: -5,
                        scale: 1.01,
                      }}
                      transition={{
                        duration: 0.2,
                      }}
                      style={{
                        backgroundColor: cardBg,
                      }}
                      className="group relative min-h-[180px] overflow-hidden rounded-3xl p-6 cursor-default"
                    >
                      {/* Top row */}
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-slate-500/70">
                          {String(i + 1).padStart(2, "0")}
                        </span>

                        <div className="w-10 h-10 rounded-full bg-white/70 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                          <CheckCircle2 className="w-5 h-5 text-slate-800" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="relative z-10 mt-7 max-w-[85%]">
                        <p className="text-lg font-medium leading-6 text-slate-800">
                          {item}
                        </p>
                      </div>

                      {/* Decorative number */}
                      <span className="absolute -right-3 -bottom-8 text-[110px] leading-none font-black text-white/30 select-none">
                        {i + 1}
                      </span>

                      {/* Decorative circle */}
                      <div className="absolute -right-10 -top-10 w-28 h-28 rounded-full bg-white/20 group-hover:scale-125 transition-transform duration-500" />

                      {/* Bottom accent */}
                      <div className="absolute bottom-0 left-6 right-6 h-1 rounded-full bg-white/50" />
                    </motion.div>
                  );
                })}
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mt-20"
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="text-xs font-bold tracking-[0.2em] text-primary-600 uppercase">
                  02 — Getting Started
                </span>

                <div className="h-px flex-1 bg-slate-200" />
              </div>

              <div className="relative rounded-3xl bg-[#c4dac8] p-7 sm:p-9 overflow-hidden">

                {/* Decorative circle */}
                <div className="absolute -right-16 -top-16 w-40 h-40 rounded-full border-[25px] border-white/70" />

                <div className="relative">
                  <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                    Before you begin
                  </h2>

                  <p className="text-sm text-slate-500 mt-2 mb-7">
                    A few things you'll need to get the most from this course.
                  </p>

                  <div className="grid sm:grid-cols-2 gap-4">
                    {course.requirements?.map((requirement, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-4 bg-white rounded-2xl p-4 border border-slate-100"
                      >
                        <span className="flex-shrink-0 w-7 h-7 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center">
                          {i + 1}
                        </span>

                        <p className="text-sm leading-6 text-slate-600">
                          {requirement}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mt-20"
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="text-xs font-bold tracking-[0.2em] text-primary-600 uppercase">
                  03 — Course Roadmap
                </span>

                <div className="h-px flex-1 bg-slate-200" />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
                <div>
                  <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                    Your learning
                    <br />
                    <span className="text-slate-400">
                      roadmap.
                    </span>
                  </h2>
                </div>

                <div className="flex gap-2 text-xs text-slate-500">
                  <span className="px-3 py-2 rounded-full bg-slate-100">
                    {course.sections?.length || 0} Sections
                  </span>

                  <span className="px-3 py-2 rounded-full bg-slate-100">
                    {course.totalLectures || 0} Lectures
                  </span>
                </div>
              </div>

              {/* Timeline */}
              <div className="relative">

                {/* Timeline line */}
                <div className="absolute left-[18px] top-7 bottom-7 w-px bg-slate-200 hidden sm:block" />

                <div className="space-y-5">
                  {course.sections?.map((section, sIdx) => {
                    const isOpen = openSection === sIdx;

                    return (
                      <div
                        key={section._id || sIdx}
                        className="relative"
                      >
                        {/* Timeline number */}
                        <div
                          className={`absolute left-0 top-5 hidden sm:flex w-9 h-9 rounded-full items-center justify-center text-xs font-bold z-10 transition-all ${isOpen
                              ? "bg-primary-600 text-white shadow-lg shadow-primary-200"
                              : "bg-white border-2 border-slate-200 text-slate-400"
                            }`}
                        >
                          {String(sIdx + 1).padStart(2, "0")}
                        </div>

                        {/* Section */}
                        <div className="sm:ml-14">
                          <button
                            type="button"
                            onClick={() =>
                              setOpenSection(isOpen ? -1 : sIdx)
                            }
                            className={`w-full text-left rounded-2xl p-5 sm:p-6 transition-all duration-300 ${isOpen
                                ? "bg-[#c4c8ee] text-black shadow-md"
                                : "bg-white hover:border-slate-300 hover:shadow-md"
                              }`}
                          >
                            <div className="flex items-center gap-4">

                              {/* Mobile number */}
                              <span
                                className={`sm:hidden flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold ${isOpen
                                    ? "bg-white/10 text-white"
                                    : "bg-slate-100 text-slate-500"
                                  }`}
                              >
                                {String(sIdx + 1).padStart(2, "0")}
                              </span>

                              <div className="flex-1 min-w-0">
                                <h3
                                  className={`font-medium text-sm sm:text-xl ${isOpen
                                      ? "text-black"
                                      : "text-slate-800"
                                    }`}
                                >
                                  {section.title}
                                </h3>

                                <div
                                  className={`flex items-center gap-2 mt-1 text-sm ${isOpen
                                      ? "text-black"
                                      : "text-slate-400"
                                    }`}
                                >
                                  <span>
                                    {section.lectures?.length || 0} lectures
                                  </span>

                                  <span>•</span>

                                  <span>
                                    Structured learning
                                  </span>
                                </div>
                              </div>

                              <motion.div
                                animate={{
                                  rotate: isOpen ? 180 : 0,
                                }}
                                transition={{ duration: 0.25 }}
                              >
                                <ChevronDown
                                  className={`w-5 h-5 ${isOpen
                                      ? "text-black"
                                      : "text-black"
                                    }`}
                                />
                              </motion.div>
                            </div>

                            {/* Lecture list */}
                            <AnimatePresence initial={false}>
                              {isOpen && (
                                <motion.div
                                  initial={{
                                    height: 0,
                                    opacity: 0,
                                  }}
                                  animate={{
                                    height: "auto",
                                    opacity: 1,
                                  }}
                                  exit={{
                                    height: 0,
                                    opacity: 0,
                                  }}
                                  transition={{
                                    duration: 0.3,
                                  }}
                                  className="overflow-hidden"
                                >
                                  <div className="mt-6 pt-5 border-t border-black/20 space-y-1">
                                    {section.lectures?.map(
                                      (lec, lecIdx) => (
                                        <div
                                          key={lec._id}
                                          className="flex items-center gap-3 py-3 px-3 rounded-xl hover:bg-white/5 transition-colors"
                                        >
                                          {lec.isPreview || isEnrolled ? (
                                            <PlayCircle className="w-5 h-5 text-primary-900 flex-shrink-0" />
                                          ) : (
                                            <Lock className="w-5 h-5 text-slate-900 flex-shrink-0" />
                                          )}

                                          <div className="flex-1 min-w-0">
                                            <p className="text-base text-black truncate">
                                              {lec.title}
                                            </p>

                                            <p className="text-sm text-slate-700 mt-0.5">
                                              Lecture {lecIdx + 1}
                                              {lec.duration &&
                                                ` • ${lec.duration}`}
                                            </p>
                                          </div>

                                          {lec.isPreview &&
                                            !isEnrolled && (
                                              <button
                                                type="button"
                                                onClick={() =>
                                                  setPreviewLecture(
                                                    lec
                                                  )
                                                }
                                                className="text-base font-medium text-primary-900"
                                              >
                                                Preview
                                              </button>
                                            )}
                                        </div>
                                      )
                                    )}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </motion.section>
          </div>

          <motion.aside
            initial={{
              opacity: 0,
              x: 25,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              duration: 0.5,
              delay: 0.15,
            }}
            className="lg:sticky lg:top-24"
          >
            <div className="relative">

              {/* Floating accent */}
              <div className="absolute -inset-1 bg-gradient-to-br from-primary-200 via-transparent to-slate-200 rounded-[26px] blur-sm opacity-70" />

              <div className="relative bg-white rounded-3xl border border-slate-200 shadow-2xl shadow-slate-200/50 overflow-hidden">

                {/* Image */}
                <div className="relative">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full aspect-[16/10] object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                  {discountPct > 0 && (
                    <span className="absolute top-4 left-4 bg-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                      SAVE {discountPct}%
                    </span>
                  )}

                  <div className="absolute bottom-4 left-5 right-5">
                    <p className="text-white/80 text-xs font-medium">
                      Start learning today
                    </p>

                    <p className="text-white font-semibold text-sm mt-1">
                      Lifetime course access
                    </p>
                  </div>
                </div>

                <div className="p-6">

                  {/* Price */}
                  <div className="flex items-end gap-3">
                    <span className="text-4xl font-bold tracking-tight text-slate-900">
                      ₹{course.discountPrice}
                    </span>

                    {discountPct > 0 && (
                      <span className="text-sm text-slate-400 line-through mb-1.5">
                        ₹{course.price}
                      </span>
                    )}
                  </div>

                  {discountPct > 0 && (
                    <p className="text-xs text-emerald-600 font-semibold mt-2">
                      Special price available now
                    </p>
                  )}

                  {/* Error */}
                  {payError && (
                    <div className="mt-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl p-3">
                      {payError}
                    </div>
                  )}

                  {/* CTA */}
                  {isEnrolled ? (
                    <Link
                      to={`/learn/${course._id}`}
                      className="btn-primary w-full mt-5 flex items-center justify-center"
                    >
                      Continue Learning
                    </Link>
                  ) : (
                    <motion.button
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleBuyNow}
                      disabled={paying}
                      className="btn-primary w-full mt-5 py-3.5 disabled:opacity-60"
                    >
                      {paying ? "Processing..." : "Get Started"}
                    </motion.button>
                  )}

                  {/* Security */}
                  <div className="flex items-center justify-center gap-2 mt-4">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />

                    <span className="text-xs text-slate-400">
                      Secure checkout · Razorpay
                    </span>
                  </div>

                  {/* Includes */}
                  <div className="mt-7 pt-6 border-t border-slate-100">
                    <p className="text-sm font-bold text-slate-900 mb-4">
                      What's included
                    </p>

                    <div className="space-y-3.5">

                      <div className="flex items-center gap-3">
                        <Clock className="w-4 h-4 text-slate-400" />

                        <span className="text-sm text-slate-600">
                          {course.duration} of content
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <PlayCircle className="w-4 h-4 text-slate-400" />

                        <span className="text-sm text-slate-600">
                          {course.totalLectures} video lectures
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <BarChart3 className="w-4 h-4 text-slate-400" />

                        <span className="text-sm text-slate-600">
                          {course.level} level
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <Globe2 className="w-4 h-4 text-slate-400" />

                        <span className="text-sm text-slate-600">
                          {course.language}
                        </span>
                      </div>

                    </div>
                  </div>

                  {/* Guarantee */}
                  <div className="mt-6 rounded-2xl bg-slate-50 p-4">
                    <div className="flex gap-3">
                      <ShieldCheck className="w-5 h-5 text-emerald-500 flex-shrink-0" />

                      <div>
                        <p className="text-xs font-semibold text-slate-800">
                          Learn at your own pace
                        </p>

                        <p className="text-[11px] text-slate-500 mt-1 leading-5">
                          Access your course materials whenever you want
                          and continue learning from where you left off.
                        </p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </motion.aside>
        </div>
      </div>

      <AnimatePresence>
        {previewLecture && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-[60] flex items-center justify-center p-4"
            onClick={() => setPreviewLecture(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl overflow-hidden max-w-2xl w-full"
            >
              <video src={previewLecture.videoUrl} controls autoPlay className="w-full h-72 bg-black" />
              <div className="p-4">
                <h3 className="font-semibold text-slate-900">{previewLecture.title}</h3>
                <p className="text-sm text-slate-500 mt-1">{previewLecture.description}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CourseDetails;
