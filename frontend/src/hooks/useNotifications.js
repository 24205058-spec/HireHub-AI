import { useSelector, useDispatch } from 'react-redux';
import { fetchNotifications, markReadLocal } from '../redux/slices/notificationSlice';
import api from '../services/api';

export const useNotifications = () => {
  const dispatch = useDispatch();
  const { items, unreadCount, loading } = useSelector(state => state.notifications);

  const markAsRead = async (id) => {
    dispatch(markReadLocal(id));
    await api.put(`/notifications/${id}/read`);
  };

  return {
    notifications: items,
    unreadCount,
    loading,
    loadNotifications: () => dispatch(fetchNotifications()),
    markAsRead,
  };
};
