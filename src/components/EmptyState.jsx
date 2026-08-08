import { PackageOpen } from "lucide-react";

const EmptyState = ({ title = "No results found.", subtitle }) => (
  <div className="flex flex-col items-center justify-center text-center py-16">
    <PackageOpen className="w-12 h-12 text-slate-300 mb-4" />
    <p className="text-slate-600 font-medium">{title}</p>
    {subtitle && <p className="text-slate-400 text-sm mt-1">{subtitle}</p>}
  </div>
);

export default EmptyState;
