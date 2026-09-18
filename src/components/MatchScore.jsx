export default function MatchScore({ score }) {
  const level = score >= 85 ? "Excellent Match" : score >= 70 ? "Good Match" : "Moderate Match";
  return (
    <div className="match-box">
      <div className="match-ring" style={{ "--score": `${score}%` }}>
        <strong>{score}%</strong>
      </div>
      <div>
        <strong>{level}</strong>
        <p>AI-generated compatibility score</p>
      </div>
    </div>
  );
}