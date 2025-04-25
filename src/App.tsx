import { useEffect, useState } from "react";
// Importing the CSS file for styling
import "./app.css";

import { Job } from "./services/types";
import DashBoard from "./pages/DashBoard";

function App() {
  // State to manage the list of jobs, initialized from localStorage
  const [jobList, setJobList] = useState<Job[]>(() => {
    try {
      // Retrieve job list from localStorage or initialize as an empty array
      return JSON.parse(localStorage.getItem("jobList") || "[]") as Job[];
    } catch {
      return [];
    }
  });

  // Effect to update localStorage whenever the job list changes
  useEffect(() => {
    localStorage.setItem("jobList", JSON.stringify(jobList));
  }, [jobList]);

  // Function to add a new job to the job list
  const addJob = (job: Job) => {
    setJobList((prevJobs) => [...prevJobs, job]);
  };

  // Render the application with a gradient background and pass props to DashBoard
  return (
    <div className="bg-gradient-to-r from-gray-100 to-gray-200 min-h-screen py-10">
      <DashBoard jobList={jobList} addJob={addJob} />
    </div>
  );
}

export default App;
