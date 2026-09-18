import { useEffect, useState } from "react";
import { ArrowLeft, Bookmark, CheckCircle2, MapPin, Clock3 } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getJobById } from "../services/api";
import { useApp } from "../context/AppContext";
import { useAuth } from "../context/AuthContext";
import MatchScore from "../components/MatchScore";

export default function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const { state, dispatch } = useApp();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => { getJobById(id).then(setJob); }, [id]);

  if (!job) return <div className="loading">Loading job...</div>;

  const saved = state.savedJobs.includes(job.id);
  const applied = state.applications.some((a) => a.jobId === job.id);

  const apply = () => {
    if (!user) return navigate("/login", { state: { from: `/jobs/${job.id}` } });
    dispatch({ type: "APPLY", jobId: job.id });
  };

  return <section className="section">
    <div className="container">
      <Link to="/jobs" className="back-link"><ArrowLeft size={16} /> Back to jobs</Link>
      <div className="details-grid">
        <main>
          <div className="details-header">
            <div className="company-logo large">{job.company.charAt(0)}</div>
            <div><span className="eyebrow">{job.company}</span><h1>{job.title}</h1><div className="job-meta"><span><MapPin size={15}/>{job.location}</span><span><Clock3 size={15}/>{job.type}</span></div></div>
          </div>
          <div className="details-actions">
            <button className="btn btn-primary btn-lg" onClick={apply}>{applied ? "Application submitted" : "Apply now"}</button>
            <button className={`btn btn-outline ${saved ? "saved-action" : ""}`} onClick={() => dispatch({ type: "TOGGLE_SAVE", jobId: job.id })}><Bookmark size={17} /> {saved ? "Saved" : "Save job"}</button>
          </div>
          <article className="content-card"><h2>About the role</h2><p>{job.description}</p><h2>Required skills</h2><div className="skill-row">{job.skills.map((s) => <span className="skill-chip" key={s}>{s}</span>)}</div><h2>What you'll do</h2><ul className="check-list"><li><CheckCircle2 /> Build maintainable product features.</li><li><CheckCircle2 /> Collaborate with design and engineering teams.</li><li><CheckCircle2 /> Write tests and improve application reliability.</li></ul></article>
        </main>
        <aside>
          <div className="side-card"><span className="eyebrow">AI INSIGHT</span><MatchScore score={job.match} /><div className="side-line"><span>Salary</span><strong>{job.salary}</strong></div><div className="side-line"><span>Experience</span><strong>{job.experience}</strong></div><div className="side-line"><span>Posted</span><strong>{job.posted}</strong></div></div>
        </aside>
      </div>
    </div>
  </section>;
}