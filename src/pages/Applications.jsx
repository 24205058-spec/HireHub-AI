import { CalendarDays, CheckCircle2, Clock3 } from "lucide-react";
import { Link } from "react-router-dom";
import { jobs } from "../data/jobs";
import { useApp } from "../context/AppContext";

export default function Applications() {
  const { state } = useApp();
  const applications = state.applications.map((a) => ({ ...a, job: jobs.find((j) => j.id === a.jobId) })).filter((a) => a.job);

  return <section className="section"><div className="container">
    <div className="page-title-row"><div><span className="eyebrow">CAREER ACTIVITY</span><h1>My applications</h1><p>Track the progress of every opportunity.</p></div></div>
    {applications.length === 0 ? <div className="empty-state"><CheckCircle2 size={30}/><h3>No applications yet</h3><p>Explore jobs and apply to your first opportunity.</p><Link className="btn btn-primary" to="/jobs">Browse jobs</Link></div> :
      <div className="application-list">{applications.map(({ job, status, appliedAt }) => <div className="application-row" key={job.id}><div className="company-logo">{job.company.charAt(0)}</div><div className="application-info"><strong>{job.title}</strong><span>{job.company} · {job.location}</span><small><CalendarDays size={14}/> Applied {new Date(appliedAt).toLocaleDateString()}</small></div><div className="status-pill"><Clock3 size={14}/> {status}</div><Link className="btn btn-ghost" to={`/jobs/${job.id}`}>View</Link></div>)}</div>}
  </div></section>;
}