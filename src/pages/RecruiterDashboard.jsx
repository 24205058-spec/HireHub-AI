import { ArrowRight, BrainCircuit, Search, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import StatCard from "../components/StatCard";
import { candidateRanking, recruiterStats } from "../data/mockData";
import { useAuth } from "../context/AuthContext";

export default function RecruiterDashboard() {
  const { user } = useAuth();
  return <section className="section dashboard">
    <div className="container">
      <div className="dashboard-head"><div><span className="eyebrow">RECRUITER WORKSPACE</span><h1>Hello, {user?.name.split(" ")[0]}</h1><p>Find and prioritize the strongest candidates with AI.</p></div><button className="btn btn-primary">Post a job <ArrowRight size={17}/></button></div>
      <div className="stats-grid">{recruiterStats.map((s) => <StatCard {...s} key={s.label} />)}</div>
      <div className="recruiter-grid">
        <div className="content-card">
          <div className="section-heading"><div><span className="eyebrow">AI RANKING</span><h2>Top candidates</h2></div><button className="icon-btn"><Search size={18}/></button></div>
          <div className="candidate-list">{candidateRanking.map((candidate, index) => <div className="candidate-row" key={candidate.name}><span className="rank">{index + 1}</span><div className="candidate-avatar">{candidate.name.charAt(0)}</div><div className="candidate-info"><strong>{candidate.name}</strong><span>{candidate.role}</span><div className="skill-row">{candidate.skills.map((s) => <span className="mini-chip" key={s}>{s}</span>)}</div></div><div className="candidate-score"><strong>{candidate.score}%</strong><span>match</span></div></div>)}</div>
        </div>
        <div className="side-stack">
          <div className="side-card"><div className="card-icon"><BrainCircuit /></div><span className="eyebrow">MATCHING ENGINE</span><h3>248 applications analyzed</h3><p>AI ranking helps your team focus first on high-fit applicants.</p><div className="metric"><TrendingUp size={17}/> 18% faster shortlist review</div></div>
          <div className="side-card"><span className="eyebrow">OPEN ROLE</span><h3>Full Stack Developer</h3><p>42 applicants · 8 strong matches</p><Link to="/jobs/job-101" className="text-link">View role <ArrowRight size={15}/></Link></div>
        </div>
      </div>
    </div>
  </section>;
}