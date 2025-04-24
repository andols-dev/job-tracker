import React, { useState} from 'react'
import { Job, Status } from '../services/types'

interface JobListProps {
    jobList: Job[],
}

const JobListTable: React.FC<JobListProps> = ({ jobList }) => {
  const [filter, setfilter] = useState<string>();

  const filteredJobList = filter
    ? jobList.filter((job) => Status[job.status] === filter)
    : jobList;

  return (
    <>
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-end mb-4">
          <select
            value={filter}
            onChange={(e) => setfilter(e.target.value)}
            className="p-2 border border-gray-300 rounded bg-gray-200 text-gray-700"
          >
            <option value="">Filter status</option>
            {Object.keys(Status)
              .filter((key) => isNaN(Number(key))) // Filter out numeric keys
              .map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
          </select>
        </div>
        <table className="min-w-full border-collapse border border-gray-300 shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
              <th className="border border-gray-300 px-6 py-3 text-left">Company</th>
              <th className="border border-gray-300 px-6 py-3 text-left">Title</th>
              <th className="border border-gray-300 px-6 py-3 text-left">Date Applied</th>
              <th className="border border-gray-300 px-6 py-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredJobList.map((job) => (
              <tr key={job.id} className="hover:bg-gray-100 text-gray-600 text-sm">
                <td className="border border-gray-300 px-6 py-4">{job.companyName}</td>
                <td className="border border-gray-300 px-6 py-4">{job.title}</td>
                <td className="border border-gray-300 px-6 py-4">{job.dateApplied}</td>
                <td className="border border-gray-300 px-6 py-4">{Status[job.status]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default JobListTable