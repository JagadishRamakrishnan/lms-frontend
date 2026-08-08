import { AlertTriangle } from "lucide-react";

const ErrorState = ({ message = "Something went wrong. Please try again.", onRetry }) => (
  <div className="flex flex-col items-center justify-center text-center py-16">
    <AlertTriangle className="w-12 h-12 text-red-300 mb-4" />
    <p className="text-slate-600 font-medium">{message}</p>
    {onRetry && (
      <button onClick={onRetry} className="btn-secondary mt-4">
        Try Again
      </button>
    )}
  </div>
);

export default ErrorState;
