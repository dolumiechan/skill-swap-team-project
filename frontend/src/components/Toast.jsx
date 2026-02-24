import { useEffect } from 'react';
import { CheckCircle, AlertCircle, X } from 'lucide-react';
import PropTypes from 'prop-types';

export default function Toast({ message, type = 'success', onClose }) {
        }, 3200);
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3200);

    return () => clearTimeout(timer);
  }, [onClose]);

  const icons = {
    success: <CheckCircle className="w-5 h-5" />,
    error: <AlertCircle className="w-5 h-5" />,
  };

  const bgColors = {
    success: 'bg-green-600',
    error: 'bg-red-600',
  };

  return (
    <div 
      className={`fixed bottom-6 right-6 ${bgColors[type]} text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 z-50 animate-in fade-in slide-in-from-bottom-5 duration-300`}
    >
      {icons[type]}
      <span className="font-medium">{message}</span>
      <button 
        onClick={onClose}
        className="ml-2 text-white/80 hover:text-white"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

Toast.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['success', 'error']),
  onClose: PropTypes.func.isRequired,
};