# HireHub AI — Frontend

A professional React/Vite frontend for an AI-assisted recruitment platform.

## Course Outcomes Covered

- CO1: Basic design principles and interactive frontend UI
- CO3: HTML, CSS, JavaScript, DOM-style form validation, objects/arrays, events, async API handling
- CO4: React components, props, lists/keys, hooks, routing, conditional rendering, Context/Reducer
- CO6: Frontend foundation for a real-world MERN-stack recruitment application

## Features

- Responsive professional recruitment UI
- Candidate and recruiter dashboards
- Job search with filters
- Job details and application flow
- Resume upload interface
- Resume score and AI insights
- AI job-candidate match score
- Skill-gap analysis
- Candidate ranking
- Saved jobs
- Application tracking
- Notifications
- Dark/light mode
- React Router navigation
- Context + useReducer authentication/state pattern
- Axios API service ready for Node/Express backend
- LocalStorage persistence for demo data
- Async mock API layer for frontend demonstration

## Run

```bash
npm install
npm run dev
```

Open the Vite URL shown in the terminal.

## Demo login

The login form accepts any valid-looking email and password of at least 6 characters. Select Candidate or Recruiter to preview the corresponding dashboard.

## Backend integration

Set:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Then replace mock calls in `src/services/api.js` with the Express endpoints when the backend is connected.
