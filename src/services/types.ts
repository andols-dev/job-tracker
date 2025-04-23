export interface Job {
    id: string,
    companyName: string,
    title: string,
    dateApplied: string,
    notes?: string,
    status: Status,
}

export enum Status {
    'Applied',
    'Interviewing',
    'Offered',
    'Rejected',
}