import React from 'react'
import {Job} from '../services/types';
import JobListTable from '../components/JobListTable';

interface DashBoardProps {
    jobList: Job[],
    addJob: (job: Job) => void,
    
}
const DashBoard: React.FC<DashBoardProps> = ({jobList, addJob}) => {

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
    <JobListTable jobList={jobList} addJob={addJob}/>
    </div>
  )
}

export default DashBoard