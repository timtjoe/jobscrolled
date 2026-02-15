import { useAtom } from 'jotai';
import { selectedJobIdAtom } from '@/store/jobAtom';
import { useJobs } from '@/hooks/useJobs'; // Your React Query hook

export const JobList = () => {
  const [, setSelectedId] = useAtom(selectedJobIdAtom);
  const { data: jobs, isLoading } = useJobs();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col">
      {jobs.map((job) => (
        <div 
          key={job.id} 
          onClick={() => setSelectedId(job.id)}
          style={{ cursor: 'pointer', borderBottom: '1px solid #eee', padding: '16px' }}
        >
          <h3>{job.title}</h3>
          <p>{job.company}</p>
        </div>
      ))}
    </div>
  );
};