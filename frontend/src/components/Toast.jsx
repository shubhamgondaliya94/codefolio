import React, { useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react';

const Toast = ({ message, type = 'success', onClose, duration = 4000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const styles = {
    success: 'bg-emerald-950/80 border-emerald-500/50 text-emerald-200',
    error: 'bg-rose-950/80 border-rose-500/50 text-rose-200',
    info: 'bg-indigo-950/80 border-indigo-500/50 text-indigo-200',
  };

  const icons = {
    success: <CheckCircle className="w-5 h-5 text-emerald-400" />,
    error: <XCircle className="w-5 h-5 text-rose-400" />,
    info: <AlertCircle className="w-5 h-5 text-indigo-400" />,
  };

  return (
    <div className={`fixed bottom-5 right-5 z-50 flex items-center gap-3 px-4 py-3 rounded-xl border backdrop-blur-md shadow-2xl animate-slide-up ${styles[type]}`}>
      {icons[type]}
      <p className="text-sm font-medium pr-4">{message}</p>
      <button
        onClick={onClose}
        className="p-1 hover:bg-white/10 rounded-lg transition-colors ml-auto"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Toast;
