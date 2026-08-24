import { createContext, useContext, useReducer } from "react";

const initialState = {
  savedJobs: JSON.parse(localStorage.getItem("hirehub_saved_jobs") || "[]"),
  applications: JSON.parse(localStorage.getItem("hirehub_applications") || "[]")
};

function reducer(state, action) {
  switch (action.type) {
    case "TOGGLE_SAVE": {
      const exists = state.savedJobs.includes(action.jobId);
      const savedJobs = exists
        ? state.savedJobs.filter((id) => id !== action.jobId)
        : [...state.savedJobs, action.jobId];
      localStorage.setItem("hirehub_saved_jobs", JSON.stringify(savedJobs));
      return { ...state, savedJobs };
    }
    case "APPLY": {
      const applications = [
        ...state.applications.filter((a) => a.jobId !== action.jobId),
        { jobId: action.jobId, status: "Applied", appliedAt: new Date().toISOString() }
      ];
      localStorage.setItem("hirehub_applications", JSON.stringify(applications));
      return { ...state, applications };
    }
    default:
      return state;
  }
}

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
}

export const useApp = () => useContext(AppContext);