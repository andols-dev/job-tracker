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
  const [isEditing,setIsEditing] = useState(false);

  const [jobEditing, setJobEditing] = useState<Job | null>(null);

  // Effect to update localStorage whenever the job list changes
  useEffect(() => {
    localStorage.setItem("jobList", JSON.stringify(jobList));
  }, [jobList]);

  // Function to add a new job to the job list
  const addJob = (job: Job) => {
    
    setJobList((prevJobs) => [...prevJobs, job]);
  };

const removeJob = (jobToRemove: Job) => {
  const updatedJobList = jobList.filter(job => job.id !== jobToRemove.id);
  setJobList(updatedJobList);
}
const editJob = (job: Job ) => {
  setIsEditing(true);
  setJobEditing(job); // Set the job to be edited
  // Example usage of 'job' to avoid the error
  
  console.log(jobEditing);
}

  // Render the application with a gradient background and pass props to DashBoard
  return (
    <div className="bg-gradient-to-r from-gray-100 to-gray-200 min-h-screen py-10">
      <DashBoard jobList={jobList} addJob={addJob} removeJob={removeJob} editJob={editJob} isEditing={isEditing} setIsEditing={setIsEditing} jobEditing={jobEditing} setJobEditing={setJobEditing} setJobList={setJobList}/>
    </div>
  );
}

export default App;
