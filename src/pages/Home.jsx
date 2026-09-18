import { ArrowRight, BrainCircuit, CheckCircle2, FileSearch, Search, ShieldCheck, Sparkles, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { jobs } from "../data/jobs";
import JobCard from "../components/JobCard";

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5 }}>
            <div className="badge"><Sparkles size={15} /> AI-powered career matching</div>
            <h1>Find work that <span>fits you.</span></h1>
            <p className="hero-copy">
              HireHub AI connects talent with opportunity using intelligent resume analysis,
              semantic job matching, and recruiter-side candidate ranking.
            </p>
            <div className="hero-actions">
              <Link to="/jobs" className="btn btn-primary btn-lg">Explore jobs <ArrowRight size={18} /></Link>
              <Link to="/resume-analyzer" className="btn btn-outline btn-lg">Analyze my resume</Link>
            </div>
            <div className="trust-row">
              <span><CheckCircle2 size={16} /> AI matching</span>
              <span><CheckCircle2 size={16} /> Skill-gap insights</span>
              <span><CheckCircle2 size={16} /> Recruiter ranking</span>
            </div>
          </motion.div>

          <motion.div className="hero-panel" initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .6 }}>
            <div className="panel-header"><span>AI Match Overview</span><span className="status-dot">Live</span></div>
            <div className="match-preview">
              <div className="big-score">94<span>%</span></div>
              <div><strong>Full Stack Developer</strong><p>NovaTech Solutions</p></div>
            </div>
            <div className="progress"><span style={{ width: "94%" }} /></div>
            <div className="mini-grid">
              <div><span>Skills</span><strong>92%</strong></div>
              <div><span>Experience</span><strong>90%</strong></div>
              <div><span>Education</span><strong>100%</strong></div>
              <div><span>Semantic fit</span><strong>95%</strong></div>
            </div>
            <div className="ai-note"><BrainCircuit size={18} /><span>Strong match based on your profile and target role.</span></div>
          </motion.div>
        </div>
      </section>

      <section className="search-strip">
        <div className="container search-box">
          <Search size={21} />
          <input placeholder="Search jobs, skills or companies" />
          <Link className="btn btn-primary" to="/jobs">Search Jobs</Link>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading"><div><span className="eyebrow">DISCOVER</span><h2>Featured opportunities</h2></div><Link to="/jobs" className="text-link">View all <ArrowRight size={16} /></Link></div>
          <div className="job-grid">{jobs.slice(0, 3).map((job) => <JobCard job={job} key={job.id} />)}</div>
        </div>
      </section>

      <section className="section muted-section">
        <div className="container">
          <div className="section-heading centered"><span className="eyebrow">HOW IT WORKS</span><h2>Recruitment, redesigned with intelligence.</h2></div>
          <div className="feature-grid">
            <Feature icon={<FileSearch />} title="Analyze" text="Extract skills, experience and profile signals from your resume." />
            <Feature icon={<BrainCircuit />} title="Match" text="Compare your profile with jobs using weighted and semantic similarity." />
            <Feature icon={<Users />} title="Connect" text="Help recruiters prioritize strong candidates and move faster." />
            <Feature icon={<ShieldCheck />} title="Track" text="Follow every application from applied to interview and hiring." />
          </div>
        </div>
      </section>
    </>
  );
}

function Feature({ icon, title, text }) {
  return <div className="feature-card"><div className="feature-icon">{icon}</div><h3>{title}</h3><p>{text}</p></div>;
}