import { useSelector, useDispatch } from 'react-redux';
import { fetchJobs } from '../redux/slices/jobSlice';

export const useJobs = () => {
  const dispatch = useDispatch();
  const { list, total, pages, page, loading, error } = useSelector(state => state.jobs);

  return {
    jobs: list,
    total,
    pages,
    page,
    loading,
    error,
    getJobs: (params) => dispatch(fetchJobs(params)),
  };
};
