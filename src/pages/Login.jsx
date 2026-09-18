import { FormEvent, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LockKeyhole, Mail } from "lucide-react";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("candidate");
  const [error, setError] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (!email.includes("@")) return setError("Enter a valid email address.");
    if (password.length < 6) return setError("Password must contain at least 6 characters.");
    login(email, role);
    const destination = location.state?.from || (role === "recruiter" ? "/recruiter" : "/candidate");
    navigate(destination);
  };

  return <AuthForm title="Welcome back" subtitle="Sign in to continue to HireHub AI." onSubmit={submit} error={error}>
    <Field icon={<Mail size={18} />} label="Email" type="email" value={email} onChange={setEmail} placeholder="you@example.com" />
    <Field icon={<LockKeyhole size={18} />} label="Password" type="password" value={password} onChange={setPassword} placeholder="••••••••" />
    <label className="form-label">Account type
      <select value={role} onChange={(e) => setRole(e.target.value)}><option value="candidate">Candidate</option><option value="recruiter">Recruiter</option></select>
    </label>
    <button className="btn btn-primary btn-full" type="submit">Sign in</button>
    <p className="form-foot">New to HireHub? <Link to="/register">Create an account</Link></p>
  </AuthForm>;
}

function Field({ icon, label, type, value, onChange, placeholder }) {
  return <label className="form-label">{label}<div className="input-wrap">{icon}<input required type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} /></div></label>;
}

function AuthForm({ title, subtitle, onSubmit, error, children }) {
  return <div className="auth-page"><div className="auth-card"><div className="auth-logo">HireHub<span>AI</span></div><h1>{title}</h1><p>{subtitle}</p>{error && <div className="error-box">{error}</div>}<form onSubmit={onSubmit}>{children}</form></div></div>;
}