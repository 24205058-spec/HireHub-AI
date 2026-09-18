import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user } = useAuth();
  return <section className="section"><div className="container narrow">
    <div className="page-title centered"><span className="eyebrow">PROFILE</span><h1>Your HireHub profile</h1><p>Keep your professional information ready for intelligent matching.</p></div>
    <div className="content-card profile-card">
      <div className="profile-avatar">{user?.name?.charAt(0).toUpperCase()}</div>
      <label className="form-label">Name<input defaultValue={user?.name}/></label>
      <label className="form-label">Email<input defaultValue={user?.email}/></label>
      <label className="form-label">Role<input defaultValue={user?.role}/></label>
      <label className="form-label">Professional headline<input placeholder="Full Stack Developer | React | Node.js"/></label>
      <label className="form-label">Bio<textarea rows="4" placeholder="Tell recruiters about your skills and experience." /></label>
      <button className="btn btn-primary">Save profile</button>
    </div>
  </div></section>;
}