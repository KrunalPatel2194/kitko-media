// src/components/common/Notification.tsx
import React from 'react';
import { AlertCircle, CheckCircle, XCircle } from 'lucide-react';

type NotificationType = 'success' | 'error' | 'info';

interface NotificationProps {
  type: NotificationType;
  message: string;
  onClose?: () => void;
}

export const Notification: React.FC<NotificationProps> = ({ type, message, onClose }) => {
  const styles = {
    success: 'bg-green-50 text-green-800 border-green-500',
    error: 'bg-red-50 text-red-800 border-red-500',
    info: 'bg-blue-50 text-blue-800 border-blue-500'
  };

  const icons = {
    success: <CheckCircle className="h-5 w-5" />,
    error: <XCircle className="h-5 w-5" />,
    info: <AlertCircle className="h-5 w-5" />
  };

  return (
    <div className={`rounded-md p-4 border-l-4 ${styles[type]}`}>
      <div className="flex items-center">
        <div className="flex-shrink-0">{icons[type]}</div>
        <div className="ml-3">
          <p className="text-sm font-medium">{message}</p>
        </div>
        {onClose && (
          <div className="ml-auto pl-3">
            <button
              onClick={onClose}
              className="inline-flex rounded-md p-1.5 hover:bg-white hover:bg-opacity-20"
            >
              <XCircle className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};