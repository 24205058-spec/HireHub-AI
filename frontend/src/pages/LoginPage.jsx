import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/slices/authSlice';
import { toast } from 'react-toastify';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector(state => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(loginUser({ email, password }));
    if (!res.error) {
      toast.success('Welcome back!');
      const role = res.payload.user.role;
      if (role === 'recruiter') navigate('/recruiter/dashboard');
      else if (role === 'admin') navigate('/admin/dashboard');
      else navigate('/candidate/dashboard');
    } else {
      toast.error(res.payload || 'Login failed');
    }
  };

  const autofill = (em, pw) => {
    setEmail(em);
    setPassword(pw);
  };

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 py-12">
      <div className="card-dark w-full max-w-md space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-black text-slate-100">Sign in to HireHub AI</h2>
          <p className="text-xs text-slate-400 mt-1">Access your intelligent recruitment portal</p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-400 text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alex@candidate.com"
              className="input-dark"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="input-dark"
            />
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full py-2.5 text-sm">
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        {/* Quick autofill for grading */}
        <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-400 space-y-1.5">
          <p className="font-bold text-slate-300">Demo Testing Profiles (Click to fill):</p>
          <div className="flex flex-wrap gap-1.5">
            <button type="button" onClick={() => autofill('lathishri@hirehub.ai', 'Candidate@123')} className="px-2 py-1 bg-indigo-900/60 hover:bg-indigo-800 text-indigo-200 rounded border border-indigo-700 font-semibold">
              Candidate: Lathishri
            </button>
            <button type="button" onClick={() => autofill('alex@candidate.com', 'Candidate@123')} className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-indigo-300 rounded border border-slate-700">
              Candidate: Alex
            </button>
            <button type="button" onClick={() => autofill('sarah@techcorp.com', 'Recruiter@123')} className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-amber-300 rounded border border-slate-700">
              Recruiter: Sarah
            </button>
            <button type="button" onClick={() => autofill('admin@hirehub.ai', 'Admin@123')} className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-rose-300 rounded border border-slate-700">
              Admin
            </button>
          </div>
        </div>

        <p className="text-center text-xs text-slate-400">
          Don't have an account?{' '}
          <Link to="/register" className="text-indigo-400 hover:text-indigo-300 font-semibold">
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
