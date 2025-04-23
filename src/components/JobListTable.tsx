import React from 'react'
import {Job} from '../services/types'
interface JobListProps {
    jobList: Job[],
}
const JobListTable:React.FC<JobListProps> = ({jobList}) => {
  return (
    <div>JobListTable</div>
  )
}

export default JobListTable