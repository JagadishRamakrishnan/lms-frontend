export const CourseCardSkeleton = () => (
  <div className="card overflow-hidden animate-pulse">
    <div className="h-44 bg-slate-200" />
    <div className="p-4 space-y-3">
      <div className="h-4 bg-slate-200 rounded w-3/4" />
      <div className="h-3 bg-slate-200 rounded w-1/2" />
      <div className="h-3 bg-slate-200 rounded w-1/3" />
      <div className="h-6 bg-slate-200 rounded w-1/4" />
    </div>
  </div>
);

export const CourseGridSkeleton = ({ count = 6 }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {Array.from({ length: count }).map((_, i) => (
      <CourseCardSkeleton key={i} />
    ))}
  </div>
);

export const TextLineSkeleton = ({ width = "w-full" }) => (
  <div className={`h-4 bg-slate-200 rounded animate-pulse ${width}`} />
);
