import React from 'react'
import {Job} from '../services/types';
import JobListTable from '../components/JobListTable';

interface DashBoardProps {
    jobList: Job[],
    addJob: (job: Job) => void,
    removeJob:(job: Job) => void;
    editJob: (job: Job) => void;
    isEditing: boolean;
    setIsEditing: (value: boolean) => void;
    jobEditing: Job | null;
    setJobEditing: (value: Job | ((prev: Job | null) => Job | null)) => void;
    setJobList: (jobList: Job[]) => void;
    
}
const DashBoard: React.FC<DashBoardProps> = ({jobList, addJob, removeJob, editJob, isEditing,setIsEditing,jobEditing,setJobEditing,setJobList}) => {

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
    <JobListTable jobList={jobList} addJob={addJob} removeJob={removeJob} editJob={editJob} isEditing={isEditing} setIsEditing={setIsEditing} jobEditing={jobEditing} setJobEditing={setJobEditing} setJobList={setJobList}/>
    </div>
  )
}

export default DashBoard