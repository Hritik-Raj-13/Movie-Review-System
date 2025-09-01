import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  className?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, className = '' }) => {
  return (
    <div className={`flex items-center justify-center p-4 ${className}`}>
      <div className="flex items-center space-x-2 text-red-400 bg-red-900/20 p-4 rounded-lg border border-red-800">
        <AlertCircle className="h-5 w-5 flex-shrink-0" />
        <span>{message}</span>
      </div>
    </div>
  );
};

export default ErrorMessage;