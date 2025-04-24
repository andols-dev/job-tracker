import { useState } from "react";
// import app.css
import "./app.css";

import { Job, Status } from "./services/types";
import DashBoard from "./pages/DashBoard";
function App() {
  const [jobList, setJobList] = useState<Job[]>([
    {
      id: "1",
      title: "Front-end developer",
      companyName: "Saab",
      dateApplied: "2025-09-15",
      status: Status.Applied,
    },
    {
      id: "2",
      title: "Back-end developer",
      companyName: "Manpower",
      dateApplied: "2025-09-17",
      status: Status.Applied,
    },
    {
      id: "3",
      title: "Full-stack developer",
      companyName: "TechCorp",
      dateApplied: "2025-09-20",
      status: Status.Interviewing,
    },
    {
      id: "4",
      title: "UI/UX Designer",
      companyName: "Designify",
      dateApplied: "2025-09-22",
      status: Status.Offered,
    },
  ]);

  return (
    <>
      <DashBoard jobList={jobList} />
    </>
  );
}

export default App;
