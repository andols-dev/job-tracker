import React, {  useState, useMemo } from 'react'
import { Job, Status } from '../services/types'

interface JobListProps {
    jobList: Job[],

}

const JobListTable: React.FC<JobListProps> = ({ jobList }) => {
  const [filter, setFilter] = useState<string>('');

  const filteredJobs = useMemo(() => {
    return jobList.filter(job => (filter ? Status[job.status] === filter : true));
  }, [jobList, filter]);

  return (
    <>
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-end mb-4">
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
    </>
  )
}

export default JobListTable