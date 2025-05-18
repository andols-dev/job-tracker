import React, { useState, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import { Job, Status } from "../services/types";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

interface JobListProps {
  jobList: Job[]; // List of jobs to display
  addJob: (job: Job) => void; // Function to add a new job
  removeJob: (job: Job) => void;
  editJob: (job: Job) => void;
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
  jobEditing: Job | null;
  setJobEditing: (value: Job | ((prev: Job | null) => Job | null)) => void;
  setJobList: (jobList: Job[]) => void; 
}

const JobListTable: React.FC<JobListProps> = ({
  jobList,
  addJob,
  removeJob,
  editJob,
  isEditing,
  setIsEditing,
  jobEditing,
  setJobEditing,
  setJobList,
}) => {
  const [filter, setFilter] = useState<string>(""); // State for filtering jobs by status
  const [isModalShowing, setIsModalShowing] = useState(false); // State for showing/hiding the modal

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Function to handle form submission
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const newJob: Job = {
      id: uuidv4(), // Generate a unique ID for the new job
      companyName: data.companyName,
      title: data.jobTitle,
      dateApplied: data.dateApplied,
      status: Status[data.status as keyof typeof Status], // Map string to Status enum
      notes: data.notes,
    };
    addJob(newJob); // Add the new job to the list
    setIsModalShowing(false); // Close the modal
    reset(); // Reset the form
  };

  // Function to update a specific field in jobEditing
  const updateJobEditing = (field: keyof Job, value: any) => {
    setJobEditing((prev: Job | null) => {
      if (!prev) return null; // Ensure jobEditing is not null
      return {
        ...prev,
        [field]: value,
      } as Job; // Explicitly cast the returned object to the Job type
    });
  };

  const onSubmitEdit: SubmitHandler<FieldValues> = (jobData) => {
    // save datato jobList
    const updatedJob: Job = {
   
      id: jobEditing?.id || uuidv4(), // Ensure the id is always defined
      companyName: jobData.companyName,
      title: jobData.jobTitle,
      dateApplied: jobData.dateApplied,
      status: Status[jobData.status as keyof typeof Status], // Map string to Status enum
      notes: jobData.notes,
    };
    const updatedJobList = jobList.map((job) => 
      job.id === jobEditing?.id ? updatedJob : job
    );
    setJobList(updatedJobList); // Update the job list with the edited job
    setIsEditing(false); // Close the editing modal
    setJobEditing(null as unknown as Job | ((prev: Job | null) => Job | null)); // Reset the jobEditing state
    reset(); // Reset the form


  };
  // function to save the edited job
  
  console.log(errors); // Log form errors for debugging

  // Memoized function to filter jobs based on the selected status
  const filteredJobs = useMemo(() => {
    return jobList.filter((job) =>
      filter ? Status[job.status] === filter : true
    );
  }, [jobList, filter]);

  // Function to close the modal and reset the form
  const closingModal = () => {
    setIsModalShowing(false);
    reset();
  };

  
  return (
    <>
      {/* Container for the job list table and controls */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-4">
          {/* Button to open the modal */}
          <div className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            <button onClick={() => setIsModalShowing(true)}>Add job</button>
          </div>
          {/* Dropdown to filter jobs by status */}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="p-2 border border-gray-300 rounded bg-blue-100 text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All jobs</option>
            {Object.keys(Status)
              .filter((key) => isNaN(Number(key))) // Exclude numeric keys from the enum
              .map((status) => (
                <option key={status} value={status} className="text-gray-700">
                  {status}
                </option>
              ))}
          </select>
        </div>
        {/* Table displaying the list of jobs */}
        <table className="min-w-full border-collapse border border-gray-300 shadow-lg rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gradient-to-r from-blue-500 to-purple-500 text-white uppercase text-sm leading-normal">
              <th className="border border-gray-300 px-6 py-3 text-left">
                Company
              </th>
              <th className="border border-gray-300 px-6 py-3 text-left">
                Title
              </th>
              <th className="border border-gray-300 px-6 py-3 text-left">
                Date Applied
              </th>
              <th className="border border-gray-300 px-6 py-3 text-left">
                Status
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredJobs.map((job) => (
              <tr
                key={job.id}
                className="hover:bg-blue-100 text-gray-700 text-sm"
              >
                <td className="border border-gray-300 px-6 py-4 font-medium">
                  {job.companyName}
                </td>
                <td className="border border-gray-300 px-6 py-4">
                  {job.title}
                </td>
                <td className="border border-gray-300 px-6 py-4">
                  {job.dateApplied}
                </td>
                <td className="border border-gray-300 px-6 py-4 font-semibold text-blue-600">
                  {Status[job.status]}
                </td>
                <td>
                  <button
                    onClick={() => editJob(job)}
                    className="px-3 py-1 ml-2 mr-2 bg-yellow-400 text-white rounded hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-300 shadow"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => removeJob(job)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 shadow"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for adding a new job */}
      {isModalShowing && (
        <>
          <div
            className="modal modal-open fixed inset-0 flex items-center justify-center bg-gray-800"
            style={{ backgroundColor: "rgba(31, 41, 55, 0.85)" }} // Custom background opacity
          >
            <div className="modal-box w-96 bg-white p-6">
              <h3 className="font-bold text-lg">Add a new job</h3>
              <form
                className="py-4 space-y-6"
                onSubmit={handleSubmit(onSubmit)}
              >
                {/* Input for company name */}
                <div>
                  <label
                    htmlFor="companyName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Company Name
                  </label>
                  <input
                    type="text"
                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="Enter company name"
                    {...register("companyName", {
                      required: "Company name is required",
                    })}
                  />
                  {errors.companyName?.message && (
                    <span className="text-red-500 text-sm">
                      {String(errors.companyName.message)}
                    </span>
                  )}
                </div>
                {/* Input for job title */}
                <div>
                  <label
                    htmlFor="jobTitle"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Job Title
                  </label>
                  <input
                    type="text"
                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="Enter job title"
                    {...register("jobTitle", { required: "Title is required" })}
                  />
                  {errors.jobTitle?.message && (
                    <span className="text-red-500 text-sm">
                      {String(errors.jobTitle.message)}
                    </span>
                  )}
                </div>
                {/* Input for date applied */}
                <div>
                  <label
                    htmlFor="dateApplied"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Date Applied
                  </label>
                  <input
                    type="date"
                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    {...register("dateApplied", {
                      required: "Date is required",
                    })}
                  />
                  {errors.dateApplied?.message && (
                    <span className="text-red-500 text-sm">
                      {String(errors.dateApplied.message)}
                    </span>
                  )}
                </div>
                {/* Dropdown for job status */}
                <div>
                  <label
                    htmlFor="status"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Status
                  </label>
                  <select
                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    {...register("status", { required: "Status is required" })}
                  >
                    <option value="">Select status</option>
                    {Object.keys(Status)
                      .filter((key) => isNaN(Number(key))) // Exclude numeric keys
                      .map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                  </select>
                  {errors.status?.message && (
                    <span className="text-red-500 text-sm">
                      {String(errors.status.message)}
                    </span>
                  )}
                </div>
                {/* Input for notes */}
                <div>
                  <label
                    htmlFor="notes"
                    className="block text-sm font-medium text-gray-700"
                    {...register("notes")}
                  >
                    Notes
                  </label>
                  <textarea
                    rows={4}
                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="Add any notes here..."
                  ></textarea>
                </div>
                {/* Modal action buttons */}
                <div className="modal-action flex justify-end space-x-4">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg shadow-md hover:bg-gray-400 focus:ring-2 focus:ring-gray-400 focus:outline-none"
                    onClick={closingModal}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}

      {/* Modal for editing a new job */}
      {isEditing && (
        <>
          <div
            className="modal modal-open fixed inset-0 flex items-center justify-center bg-gray-800"
            style={{ backgroundColor: "rgba(31, 41, 55, 0.85)" }} // Custom background opacity
          >
            <div className="modal-box w-96 bg-white p-6">
              <h3 className="font-bold text-lg">Edit job</h3>
              <form
                className="py-4 space-y-6"
                onSubmit={handleSubmit(onSubmitEdit)}
                
              >
                {/* Input for company name */}
                <div>
                  <label
                    htmlFor="companyName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Company Name
                  </label>
                  <input
                    type="text"
                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="Enter company name"
                    value={jobEditing?.companyName || ""}
                    {...register("companyName", {
                      required: "Company name is required",
                      onChange: (e) => updateJobEditing("companyName", e.target.value),
                    })}
                  />
                  {errors.companyName?.message && (
                    <span className="text-red-500 text-sm">
                      {String(errors.companyName.message)}
                    </span>
                  )}
                </div>
                {/* Input for job title */}
                <div>
                  <label
                    htmlFor="jobTitle"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Job Title
                  </label>
                  <input
                    type="text"
                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="Enter job title"
                    value={jobEditing?.title || ""}
                    {...register("jobTitle", {
                      required: "Title is required",
                      onChange: (e) => updateJobEditing("title", e.target.value),
                    })}
                  />
                  {errors.jobTitle?.message && (
                    <span className="text-red-500 text-sm">
                      {String(errors.jobTitle.message)}
                    </span>
                  )}
                </div>
                {/* Input for date applied */}
                <div>
                  <label
                    htmlFor="dateApplied"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Date Applied
                  </label>
                  <input
                    type="date"
                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    {...register("dateApplied", {
                      required: "Date is required",
                      onChange: (e) => updateJobEditing("dateApplied", e.target.value),
                    })}
                    value={jobEditing?.dateApplied || ""}
                  />
                  {errors.dateApplied?.message && (
                    <span className="text-red-500 text-sm">
                      {String(errors.dateApplied.message)}
                    </span>
                  )}
                </div>
                {/* Dropdown for job status */}
                <div>
                  <label
                    htmlFor="status"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Status
                  </label>
                  <select
                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    value={jobEditing?.status || ""}
                    {...register("status", {
                      required: "Status is required",
                      onChange: (e) => updateJobEditing("status", e.target.value),
                    })}
                  >
                    <option value="">Select status</option>
                    {Object.keys(Status)
                      .filter((key) => isNaN(Number(key))) // Exclude numeric keys
                      .map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                      ))}
                  </select>
                  {errors.status?.message && (
                    <span className="text-red-500 text-sm">
                      {String(errors.status.message)}
                    </span>
                  )}
                </div>
                {/* Input for notes */}
                <div>
                  <label
                    htmlFor="notes"
                    className="block text-sm font-medium text-gray-700"
                    {...register("notes")}
                  >
                    Notes
                  </label>
                  <textarea
                    rows={4}
                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    placeholder="Add any notes here..."
                    value={jobEditing?.notes || ""}
                    {...register("notes", {
                      onChange: (e) => updateJobEditing("notes", e.target.value),
                    })}
                  ></textarea>
                </div>
                {/* Modal action buttons */}
                <div className="modal-action flex justify-end space-x-4">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg shadow-md hover:bg-gray-400 focus:ring-2 focus:ring-gray-400 focus:outline-none"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default JobListTable;
