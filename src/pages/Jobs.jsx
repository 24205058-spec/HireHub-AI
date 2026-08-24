import { useEffect, useMemo, useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import JobCard from "../components/JobCard";
import { getJobs } from "../services/api";

export default function Jobs() {
  const [allJobs, setAllJobs] = useState([]);
  const [query, setQuery] = useState("");
  const [type, setType] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getJobs().then(setAllJobs).finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => allJobs.filter((job) => {
    const text = `${job.title} ${job.company} ${job.location} ${job.skills.join(" ")}`.toLowerCase();
    return text.includes(query.toLowerCase()) && (type === "All" || job.type === type);
  }), [allJobs, query, type]);

  return <section className="section jobs-page">
    <div className="container">
      <div className="page-title-row"><div><span className="eyebrow">OPPORTUNITIES</span><h1>Find your next role</h1><p>Search across roles and let AI help you identify the strongest matches.</p></div><span className="result-count">{filtered.length} jobs</span></div>
      <div className="job-filters">
        <div className="search-input"><Search size={19} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search title, skill, company..." /></div>
        <select value={type} onChange={(e) => setType(e.target.value)}><option>All</option><option>Full-time</option><option>Internship</option></select>
        {(query || type !== "All") && <button className="btn btn-ghost" onClick={() => { setQuery(""); setType("All"); }}><X size={16} /> Clear</button>}
      </div>
      {loading ? <div className="loading">Loading opportunities...</div> :
        filtered.length ? <div className="job-grid">{filtered.map((job) => <JobCard job={job} key={job.id} />)}</div> :
        <div className="empty-state"><SlidersHorizontal size={28} /><h3>No matching jobs</h3><p>Try a different keyword or filter.</p></div>}
    </div>
  </section>;
}