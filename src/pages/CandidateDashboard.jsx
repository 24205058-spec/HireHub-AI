import { ArrowRight, BrainCircuit, FileText, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import StatCard from "../components/StatCard";
import MatchScore from "../components/MatchScore";
import JobCard from "../components/JobCard";
import { candidateStats } from "../data/mockData";
import { jobs } from "../data/jobs";
import { useAuth } from "../context/AuthContext";

export default function CandidateDashboard() {
  const { user } = useAuth();
  return <section className="section dashboard">
    <div className="container">
      <div className="dashboard-head"><div><span className="eyebrow">CANDIDATE WORKSPACE</span><h1>Welcome, {user?.name.split(" ")[0]}</h1><p>Your personalized career command center.</p></div><Link className="btn btn-primary" to="/jobs">Find jobs <ArrowRight size={17}/></Link></div>
      <div className="stats-grid">{candidateStats.map((s) => <StatCard {...s} key={s.label} />)}</div>
      <div className="dashboard-grid">
        <div>
          <div className="section-heading"><div><span className="eyebrow">RECOMMENDED</span><h2>Jobs for you</h2></div><Link className="text-link" to="/jobs">View all</Link></div>
          <div className="job-grid compact">{jobs.slice(0, 2).map((job) => <JobCard key={job.id} job={job} />)}</div>
        </div>
        <aside className="side-stack">
          <div className="side-card"><div className="card-icon"><BrainCircuit /></div><span className="eyebrow">AI CAREER INSIGHT</span><h3>Your profile is strong for Full Stack roles.</h3><p>Add Docker and AWS to increase your average match score.</p><Link to="/resume-analyzer" className="text-link">Improve profile <ArrowRight size={15}/></Link></div>
          <div className="side-card"><div className="card-icon"><FileText /></div><span className="eyebrow">RESUME</span><h3>Resume score: 87/100</h3><div className="progress"><span style={{width:"87%"}} /></div><Link to="/resume-analyzer" className="text-link">Analyze resume <Sparkles size={15}/></Link></div>
        </aside>
      </div>
    </div>
  </section>;
}