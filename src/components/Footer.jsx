import { Link } from "react-router-dom";
import { GraduationCap, Twitter, Linkedin, Github, Instagram } from "lucide-react";

const Footer = () => (
  <footer className="bg-neutral-900 text-slate-300">
    <div className="container-x py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
      <div>
        <div className="flex items-center gap-2 text-white font-bold text-lg mb-3">
          <span className="h-8 w-8 rounded-lg bg-primary-600 flex items-center justify-center">
            <GraduationCap className="w-4 h-4" />
          </span>
          SMITIV-Edu
        </div>
        <p className="text-sm text-white">
          Learn in-demand skills from expert instructors and build the career you want.
        </p>
      </div>

      <div>
        <h4 className="text-white font-medium mb-3 text-sm">Navigate</h4>
        <ul className="space-y-2 text-sm ">
          <li><Link to="/" className="hover:text-white">Home</Link></li>
          <li><Link to="/courses" className="hover:text-white">Courses</Link></li>
          <li><Link to="/about" className="hover:text-white">About</Link></li>
          <li><Link to="/my-learning" className="hover:text-white">My Learning</Link></li>
        </ul>
      </div>

      <div>
        <h4 className="text-white font-medium mb-3 text-sm">Contact</h4>
        <ul className="space-y-2 text-sm text-slate-400">
          <li>support@learnhub.example</li>
          <li>+91 98765 43210</li>
          <li>Coimbatore, Tamil Nadu, India</li>
        </ul>
      </div>

      <div>
        <h4 className="text-white font-semibold mb-3 text-sm">Follow Us</h4>
        <div className="flex gap-3">
          <a href="#" className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700"><Twitter className="w-4 h-4" /></a>
          <a href="#" className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700"><Linkedin className="w-4 h-4" /></a>
          <a href="#" className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700"><Github className="w-4 h-4" /></a>
          <a href="#" className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700"><Instagram className="w-4 h-4" /></a>
        </div>
      </div>
    </div>
    <div className="border-t border-slate-800 py-6 text-center text-xs text-slate-500">
      © {new Date().getFullYear()} LearnHub. All rights reserved.
    </div>
  </footer>
);

export default Footer;
