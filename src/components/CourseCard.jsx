import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, Users, Clock, BarChart3 } from "lucide-react";

const CourseCard = ({ course, index = 0 }) => {
  const discountPct = course.price > course.discountPrice
    ? Math.round(((course.price - course.discountPrice) / course.price) * 100)
    : 0;
const cardColors = [ "#ffefb0", "#e1e3f6", "#fadfca", ]; 
 const cardBg = cardColors[index % cardColors.length];
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      style={{ backgroundColor: cardBg }}
      className="overflow-hidden group border-none rounded-lg"
    >
      <Link to={`/courses/${course.slug || course._id}`}>
        <div className="h-50 rounded-md p-4">
          <img
            src={course.thumbnail}
            alt={course.title}
            className="h-full w-full rounded-md object-cover"
          />
        </div>
        <div className="p-4">
          <p className="text-base font-medium text-primary-600 mb-1">{course.category}</p>
          <h3 className="font-medium text-xl text-neutral-900 leading-snug line-clamp-2 min-h-[2.75rem]">
            {course.title}
          </h3>
          <p className="text-base text-neutral-900 mt-1">{course.instructor}</p>

          <div className="flex items-center gap-3 mt-2 text-base text-neutral-900">
            <span className="flex items-center gap-1 text-amber-500 font-medium">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" /> {course.rating}
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-4 h-4" /> {course.studentsCount}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" /> {course.duration}
            </span>
          </div>

          <div className="flex items-center gap-2 mt-1 text-xs text-slate-500">
            <BarChart3 className="w-4 h-4" /> {course.level}
          </div>

          <div className="flex items-center gap-2 mt-3">
            <span className="text-3xl font-semibold text-neutral-900">₹ {course.discountPrice}</span>
            {discountPct > 0 && (
              <>
                <span className="text-lg text-slate-400 line-through">₹{course.price}</span>
                <span className="text-lg font-semibold text-emerald-600">{discountPct}% off</span>
              </>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default CourseCard;
