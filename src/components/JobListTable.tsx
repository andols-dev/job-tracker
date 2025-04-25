import React, {  useState, useMemo } from 'react'
import { Job, Status } from '../services/types'

interface JobListProps {
    jobList: Job[],

}

const JobListTable: React.FC<JobListProps> = ({ jobList }) => {
  const [filter, setFilter] = useState<string>('');
  const [isModalShowing, setIsModalShowing] = useState(false);

  

  const filteredJobs = useMemo(() => {
    return jobList.filter(job => (filter ? Status[job.status] === filter : true));
  }, [jobList, filter]);

  return (
    <>
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex justify-between items-center mb-4">
        <div className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"><button onClick={() => setIsModalShowing(true)}>Add job</button></div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="p-2 border border-gray-300 rounded bg-blue-100 text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All jobs</option>
            {Object.keys(Status)
              .filter((key) => isNaN(Number(key))) // Filter out numeric keys
              .map((status) => (
                <option key={status} value={status} className="text-gray-700">
                  {status}
                </option>
              ))}
          </select>
        </div>
        <table className="min-w-full border-collapse border border-gray-300 shadow-lg rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gradient-to-r from-blue-500 to-purple-500 text-white uppercase text-sm leading-normal">
              <th className="border border-gray-300 px-6 py-3 text-left">Company</th>
              <th className="border border-gray-300 px-6 py-3 text-left">Title</th>
              <th className="border border-gray-300 px-6 py-3 text-left">Date Applied</th>
              <th className="border border-gray-300 px-6 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredJobs.map((job) => (
              <tr key={job.id} className="hover:bg-blue-100 text-gray-700 text-sm">
                <td className="border border-gray-300 px-6 py-4 font-medium">{job.companyName}</td>
                <td className="border border-gray-300 px-6 py-4">{job.title}</td>
                <td className="border border-gray-300 px-6 py-4">{job.dateApplied}</td>
                <td className="border border-gray-300 px-6 py-4 font-semibold text-blue-600">{Status[job.status]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalShowing && (
  <div
    className="modal modal-open fixed inset-0 flex items-center justify-center bg-gray-800"
    style={{ backgroundColor: 'rgba(31, 41, 55, 0.85)' }} // Custom background opacity
  >
    <div className="modal-box w-96 bg-white p-6">
      <h3 className="font-bold text-lg">Add a new job</h3>
      <form className="py-4 space-y-6">
  <div>
    <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">Company Name</label>
    <input
      type="text"
      id="companyName"
      name="companyName"
      className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
      placeholder="Enter company name"
    />
  </div>
  <div>
    <label htmlFor="jobTitle" className="block text-sm font-medium text-gray-700">Job Title</label>
    <input
      type="text"
      id="jobTitle"
      name="jobTitle"
      className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
      placeholder="Enter job title"
    />
  </div>
  <div>
    <label htmlFor="dateApplied" className="block text-sm font-medium text-gray-700">Date Applied</label>
    <input
      type="date"
      id="dateApplied"
      name="dateApplied"
      className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
    />
  </div>
  <div>
    <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
    <select
      id="status"
      name="status"
      className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
    >
      <option value="">Select status</option>
      {Object.keys(Status)
        .filter((key) => isNaN(Number(key)))
        .map((status) => (
          <option key={status} value={status}>{status}</option>
        ))}
    </select>
  </div>
  <div>
    <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Notes</label>
    <textarea
      id="notes"
      name="notes"
      rows={4}
      className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
      placeholder="Add any notes here..."
    ></textarea>
  </div>
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
      onClick={() => setIsModalShowing(false)}
    >
      Cancel
    </button>
  </div>
</form>
    </div>
  </div>
)}

    </>
  )
}

export default JobListTable