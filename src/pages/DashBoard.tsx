import React from 'react'
import {Job} from '../services/types';
import JobListTable from '../components/JobListTable';

interface DashBoardProps {
    jobList: Job[],
    
}
const DashBoard: React.FC<DashBoardProps> = ({jobList}) => {

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
    <JobListTable jobList={jobList} />
    </div>
  )
}

export default DashBoard