import { useState } from "react";
import "./App.css";
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
      title: "Front-end developer",
      companyName: "Manpower",
      dateApplied: "2025-09-17",
      status: Status.Applied,
    },
  ]);

  return (
    <>
      <DashBoard jobList={jobList}/>
    </>
  );
}

export default App;
