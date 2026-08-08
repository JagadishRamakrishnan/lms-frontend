import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight, BookOpen, Award, Infinity as InfinityIcon, Users2,
  Search, PlayCircle, CheckCircle2,
} from "lucide-react";
import { getCourses } from "../api";
import CourseCard from "../components/CourseCard";
import { CourseGridSkeleton } from "../components/Skeletons";
import ErrorState from "../components/ErrorState";
import Hero from "../hooks/Hero";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Star, Quote } from "lucide-react";
import "swiper/css"; import "swiper/css/pagination";
const features = [
  { icon: Award, title: "Expert-led Courses", desc: "Learn from instructors with real industry experience." },
  { icon: InfinityIcon, title: "Lifetime Access", desc: "Revisit your courses anytime, at your own pace." },
  { icon: BookOpen, title: "Learn at Your Own Pace", desc: "Structured curriculum you can follow on your schedule." },
  { icon: Users2, title: "Certificates", desc: "Earn a certificate of completion for every course." },
];

const steps = ["Choose Course", "Enroll", "Learn", "Complete", "Certificate"];

const testimonials = [
  {
    name: "Arun Kumar",
    role: "MERN Stack Developer",
    text: "The course helped me understand React and Node.js much better. The projects were really useful for building my confidence.",
    image: "/images/students/student-1.jpg",
    rating: 5,
  },
  {
    name: "Priya S",
    role: "Frontend Developer",
    text: "The practical sessions were excellent. I was able to build real projects and improve my development skills.",
    image: "/images/students/student-2.jpg",
    rating: 5,
  },
  {
    name: "Vignesh R",
    role: "Full Stack Developer",
    text: "The instructors explained everything clearly and the project-based learning helped me a lot.",
    image: "/images/students/student-3.jpg",
    rating: 5,
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Home = () => {
  const [courses, setCourses] = useState([]);
  const [status, setStatus] = useState("loading");

  const fetchCourses = async () => {
    setStatus("loading");
    try {
      const res = await getCourses();
      setCourses(res.courses.slice(0, 3));
      setStatus("success");
    } catch (err) {
      setStatus("error");
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div>
      <section className="relative overflow-hidden">
        <Hero />
      </section>

      {/* FEATURED COURSES */}
      <section className="md:px-16 px-5 py-20">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">Featured Courses</h2>
            <p className="text-slate-500 mt-1">Hand-picked courses to get you started</p>
          </div>
          <Link to="/courses" className="hidden sm:flex items-center gap-1 text-primary-600 font-medium text-lg">
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {status === "loading" && <CourseGridSkeleton count={3} />}
        {status === "error" && <ErrorState onRetry={fetchCourses} />}
        {status === "success" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {courses.map((course, i) => (
              <CourseCard key={course._id} course={course} index={i} />
            ))}
          </div>
        )}
      </section>

      {/* TESTIMONIALS */}
      <section className="py-10">
        <div className="md:px-16 px-5">
          {/* Heading */}
          <div className="text-center mb-12">
            <p className="text-base font-semibold text-indigo-600 mb-2">
              STUDENT REVIEWS
            </p>

            <h2 className="text-3xl sm:text-3xl font-bold text-neutral-900">
              What Our Students Say
            </h2>

            <p className="text-neutral-900 text-base mt-3 max-w-xl mx-auto">
              Hear from students who have transformed their skills through our
              courses.
            </p>
          </div>

          {/* Swiper */}
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="pb-12"
          >
            {testimonials.map((t, i) => (
              <SwiperSlide key={`${t.name}-${i}`} className="!h-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.4,
                    delay: i * 0.1,
                  }}
                  className="bg-white rounded-2xl p-7 border border-slate-100 shadow-sm h-full flex flex-col"
                >
                  {/* Quote + Rating */}
                  <div className="flex justify-between items-start">

                    <div className="flex gap-1">
                      {[...Array(t.rating || 5)].map((_, index) => (
                        <Star
                          key={index}
                          className="w-4 h-4 text-amber-400"
                          fill="currentColor"
                        />
                      ))}
                    </div>
                  </div>

                  {/* Review */}
                  <p className="text-neutral-900 text-lg leading-relaxed mt-6 flex-1">
                    "{t.text}"
                  </p>

                  {/* Student */}
                  <div className="flex items-center gap-4 mt-7 pt-5 border-t border-neutral-300">
                    <img
                      src={t.image}
                      alt={t.name}
                      className="w-12 h-12 rounded-full object-cover shadow-sm"
                    />

                    <div>
                      <p className="font-medium text-neutral-900 text-lg">
                        {t.name}
                      </p>

                      <p className="text-sm text-neutral-900 mt-1">
                        {t.role}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* CTA */}
      <section className="py-10 md:px-16 px-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl bg-[#c4dac8] text-black px-8 py-14 text-center"
        >
          <h2 className="text-3xl font-bold">Ready to start learning?</h2>
          <p className="mt-3 max-w-xl mx-auto">
            Join thousands of learners building real skills with LearnHub's project-based courses.
          </p>
          <Link to="/courses" className="inline-flex items-center gap-2 mt-6 bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors">
            <Search className="w-4 h-4" /> Browse Courses
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
