import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, profile, isAuthenticated, loading, error } = useSelector(state => state.auth);

  return {
    user,
    profile,
    isAuthenticated,
    loading,
    error,
    isCandidate: user?.role === 'candidate',
    isRecruiter: user?.role === 'recruiter',
    isAdmin: user?.role === 'admin',
    logout: () => dispatch(logout()),
  };
};
