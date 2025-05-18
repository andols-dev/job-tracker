# Job Tracker

A finished **Job Tracker** application built with **React**, **TypeScript**, and **Vite**. It helps users manage and track their job applications efficiently.

## Live Demo

👉 [Open the app on GitHub Pages](https://andols-dev.github.io/job-tracker/)

## Features

- Add, edit, and delete job applications
- Track the status of applications (e.g., Applied, Interviewing, Offered, Rejected)
- Responsive and user-friendly interface
- Data is persisted to localStorage

## Tech Stack

- **React**: For building the user interface
- **TypeScript**: For type safety and better developer experience
- **Vite**: For fast development and build tooling
- **TailwindCSS**: For styling
- **LocalStorage**: For data persistence

## Key Functions

### Add a Job
The `addJob` function allows users to add a new job to the job list. It updates the state and persists the data to localStorage.

```tsx
// src/App.tsx
const addJob = (job: Job) => {
  setJobList((prevJobs) => [...prevJobs, job]);
};
```

### Filter Jobs by Status
The `filteredJobs` function filters the job list based on the selected status.

```tsx
// src/components/JobListTable.tsx
const filteredJobs = useMemo(() => {
  return jobList.filter((job) =>
    filter ? Status[job.status] === filter : true
  );
}, [jobList, filter]);
```

### Persist Data to LocalStorage
The app uses `useEffect` to save the job list to localStorage whenever it changes.

```tsx
// src/App.tsx
useEffect(() => {
  localStorage.setItem("jobList", JSON.stringify(jobList));
}, [jobList]);
```

### Modal for Adding Jobs
A modal is used to collect job details from the user.

```tsx
// src/components/JobListTable.tsx
{isModalShowing && (
  <div className="modal modal-open">
    <div className="modal-box">
      <h3>Add a new job</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Form fields */}
        <button type="submit">Submit</button>
      </form>
    </div>
  </div>
)}
```

