import { BriefcaseBusiness, CalendarDays, CheckCircle2, FileText, Users } from "lucide-react";

const icons = { briefcase: BriefcaseBusiness, calendar: CalendarDays, check: CheckCircle2, file: FileText, users: Users };

export default function StatCard({ label, value, icon }) {
  const Icon = icons[icon] || FileText;
  return (
    <div className="stat-card">
      <div className="stat-icon"><Icon size={20} /></div>
      <div><span>{label}</span><strong>{value}</strong></div>
    </div>
  );
}