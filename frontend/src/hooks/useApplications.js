import { useSelector, useDispatch } from 'react-redux';
import { fetchMyApplications } from '../redux/slices/applicationSlice';

export const useApplications = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector(state => state.applications);

  return {
    applications: items,
    loading,
    error,
    getApplications: () => dispatch(fetchMyApplications()),
  };
};
