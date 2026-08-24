import axios from "axios";
import { jobs } from "../data/jobs";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
  timeout: 8000,
  headers: { "Content-Type": "application/json" }
});

export async function getJobs() {
  await new Promise((resolve) => setTimeout(resolve, 350));
  return jobs;
}

export async function getJobById(id) {
  await new Promise((resolve) => setTimeout(resolve, 250));
  return jobs.find((job) => job.id === id);
}

export async function analyzeResume(file) {
  await new Promise((resolve) => setTimeout(resolve, 900));
  return {
    fileName: file.name,
    score: 87,
    skills: ["JavaScript", "React", "Node.js", "PostgreSQL", "REST API"],
    missing: ["Docker", "AWS"],
    suggestions: [
      "Add measurable outcomes to project descriptions.",
      "Mention deployment or cloud experience if available.",
      "Use role-specific keywords from target job descriptions."
    ]
  };
}

export async function calculateMatch(jobSkills, candidateSkills) {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const normalizedCandidate = candidateSkills.map((s) => s.toLowerCase());
  const matched = jobSkills.filter((skill) =>
    normalizedCandidate.includes(skill.toLowerCase())
  );
  const score = Math.round((matched.length / jobSkills.length) * 100);
  return { score, matched };
}