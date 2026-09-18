import React, { useState, useEffect, useRef } from 'react';
import { FiBell, FiCheck } from 'react-icons/fi';
import { useNotifications } from '../hooks/useNotifications';

const NotificationBell = () => {
  const { notifications, unreadCount, loadNotifications, markAsRead } = useNotifications();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    loadNotifications();
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 text-slate-300 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
      >
        <FiBell size={20} />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-4 h-4 bg-indigo-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center animate-pulse">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl p-4 z-50">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-2">
            <h4 className="font-bold text-sm text-slate-100">Live Notifications</h4>
            <span className="text-xs text-indigo-400 font-semibold">{unreadCount} new</span>
          </div>
          <div className="max-h-72 overflow-y-auto space-y-2">
            {notifications.length === 0 ? (
              <p className="text-center text-xs text-slate-500 py-6">No notifications currently.</p>
            ) : (
              notifications.map((n) => (
                <div
                  key={n._id}
                  onClick={() => markAsRead(n._id)}
                  className={`p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                    n.read
                      ? 'bg-slate-950/40 border-slate-800/60 text-slate-400'
                      : 'bg-indigo-950/30 border-indigo-500/30 text-slate-200'
                  }`}
                >
                  <p className="font-bold text-slate-100 mb-0.5">{n.title}</p>
                  <p className="line-clamp-2 text-slate-300">{n.message}</p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
