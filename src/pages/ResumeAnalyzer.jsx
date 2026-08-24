import { useState } from "react";
import { BrainCircuit, CheckCircle2, FileText, UploadCloud, XCircle } from "lucide-react";
import { analyzeResume } from "../services/api";
import MatchScore from "../components/MatchScore";

export default function ResumeAnalyzer() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFile = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;
    if (!["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"].includes(selected.type) && !selected.name.match(/\.(pdf|docx)$/i)) {
      setError("Please upload a PDF or DOCX resume.");
      return;
    }
    if (selected.size > 5 * 1024 * 1024) {
      setError("File must be smaller than 5 MB.");
      return;
    }
    setError("");
    setFile(selected);
    setResult(null);
  };

  const analyze = async () => {
    if (!file) return setError("Select a resume first.");
    setLoading(true);
    try { setResult(await analyzeResume(file)); } catch { setError("Unable to analyze the resume."); } finally { setLoading(false); }
  };

  return <section className="section">
    <div className="container narrow">
      <div className="page-title centered"><span className="eyebrow">AI RESUME LAB</span><h1>Understand your resume better.</h1><p>Upload your resume to simulate AI-powered skill extraction, scoring and gap analysis.</p></div>
      <div className="upload-card">
        <div className="upload-icon"><UploadCloud /></div>
        <h2>Upload your resume</h2><p>PDF or DOCX · Maximum 5 MB</p>
        <label className="btn btn-outline upload-btn">Choose file<input hidden type="file" accept=".pdf,.docx" onChange={handleFile}/></label>
        {file && <div className="selected-file"><FileText size={18}/><span>{file.name}</span><button onClick={() => setFile(null)}><XCircle size={17}/></button></div>}
        {error && <div className="error-box">{error}</div>}
        <button className="btn btn-primary btn-lg" disabled={!file || loading} onClick={analyze}>{loading ? "Analyzing..." : "Analyze with AI"} <BrainCircuit size={18}/></button>
      </div>
      {result && <div className="analysis-card">
        <div className="analysis-head"><div><span className="eyebrow">ANALYSIS COMPLETE</span><h2>{result.fileName}</h2></div><MatchScore score={result.score}/></div>
        <div className="analysis-grid">
          <div><h3>Detected skills</h3><div className="skill-row">{result.skills.map((s) => <span className="skill-chip positive" key={s}><CheckCircle2 size={14}/>{s}</span>)}</div></div>
          <div><h3>Skill gaps</h3><div className="skill-row">{result.missing.map((s) => <span className="skill-chip warning" key={s}><XCircle size={14}/>{s}</span>)}</div></div>
        </div>
        <div><h3>AI improvement suggestions</h3><ul className="check-list">{result.suggestions.map((s) => <li key={s}><CheckCircle2 />{s}</li>)}</ul></div>
      </div>}
    </div>
  </section>;
}