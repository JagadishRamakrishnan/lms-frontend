import { motion } from "framer-motion";
import { GraduationCap, Target, Rocket } from "lucide-react";

const About = () => (
  <div className="container-x py-16">
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="max-w-2xl">
      <h1 className="text-3xl font-bold text-slate-900">About LearnHub</h1>
      <p className="mt-4 text-slate-600 leading-relaxed">
        LearnHub is a project-based learning platform focused on practical web development skills.
        Our courses are built by working engineers and designed to take you from fundamentals to
        production-ready projects, with lifetime access and progress tracking along the way.
      </p>
    </motion.div>

    <div className="grid sm:grid-cols-3 gap-6 mt-12">
      {[
        { icon: GraduationCap, title: "Practical Learning", text: "Every course is built around real projects, not just theory." },
        { icon: Target, title: "Focused Curriculum", text: "Concise, well-structured lessons that respect your time." },
        { icon: Rocket, title: "Career Ready", text: "Skills mapped to what teams actually use in production." },
      ].map((f, i) => (
        <motion.div
          key={f.title}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.1 }}
          className="card p-6"
        >
          <f.icon className="w-8 h-8 text-primary-600 mb-3" />
          <h3 className="font-semibold text-slate-900">{f.title}</h3>
          <p className="text-sm text-slate-500 mt-2">{f.text}</p>
        </motion.div>
      ))}
    </div>
  </div>
);

export default About;
