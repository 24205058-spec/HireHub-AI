import { Bookmark, MapPin, Clock3, Building2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function JobCard({ job }) {
  const { state, dispatch } = useApp();
  const saved = state.savedJobs.includes(job.id);
  const applied = state.applications.some((a) => a.jobId === job.id);

  return (
    <article className="job-card">
      <div className="job-top">
        <div className="company-logo">{job.company.charAt(0)}</div>
        <button
          className={`save-btn ${saved ? "saved" : ""}`}
          onClick={() => dispatch({ type: "TOGGLE_SAVE", jobId: job.id })}
          title={saved ? "Remove saved job" : "Save job"}
        >
          <Bookmark size={19} fill={saved ? "currentColor" : "none"} />
        </button>
      </div>
      <div className="job-body">
        <div className="eyebrow">{job.company}</div>
        <Link className="job-title" to={`/jobs/${job.id}`}>{job.title}</Link>
        <div className="job-meta">
          <span><MapPin size={15} />{job.location}</span>
          <span><Clock3 size={15} />{job.type}</span>
          <span><Building2 size={15} />{job.experience}</span>
        </div>
        <div className="skill-row">
          {job.skills.map((skill) => <span className="skill-chip" key={skill}>{skill}</span>)}
        </div>
      </div>
      <div className="job-footer">
        <strong>{job.salary}</strong>
        <span>{applied ? "Applied" : job.posted}</span>
      </div>
    </article>
  );
}