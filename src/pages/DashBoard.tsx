import React from 'react'
import {Job} from '../services/types';
import JobListTable from '../components/JobListTable';
interface DashBoardProps {
    jobList: Job[],
}
const DashBoard: React.FC<DashBoardProps> = ({jobList}) => {

  return (
    <JobListTable jobList={jobList}/>
  )
}

export default DashBoard