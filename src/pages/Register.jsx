import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "candidate" });
  const [error, setError] = useState("");

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    if (form.name.trim().length < 2) return setError("Please enter your full name.");
    if (!form.email.includes("@")) return setError("Please enter a valid email.");
    if (form.password.length < 6) return setError("Password must contain at least 6 characters.");
    login(form.email, form.role);
    navigate(form.role === "recruiter" ? "/recruiter" : "/candidate");
  };

  return <div className="auth-page"><div className="auth-card wide">
    <div className="auth-logo">HireHub<span>AI</span></div>
    <h1>Create your account</h1><p>Start your intelligent recruitment journey.</p>
    {error && <div className="error-box">{error}</div>}
    <form onSubmit={submit}>
      <label className="form-label">Full name<input required name="name" value={form.name} onChange={update} placeholder="Your name" /></label>
      <label className="form-label">Email<input required name="email" type="email" value={form.email} onChange={update} placeholder="you@example.com" /></label>
      <label className="form-label">Password<input required name="password" type="password" value={form.password} onChange={update} placeholder="At least 6 characters" /></label>
      <label className="form-label">I am a
        <select name="role" value={form.role} onChange={update}><option value="candidate">Candidate</option><option value="recruiter">Recruiter</option></select>
      </label>
      <button className="btn btn-primary btn-full" type="submit">Create account</button>
    </form>
    <p className="form-foot">Already registered? <Link to="/login">Sign in</Link></p>
  </div></div>;
}