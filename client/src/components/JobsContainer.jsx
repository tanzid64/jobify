import Wrapper from "../assets/wrappers/JobsContainer";
import { useAllJobsContext } from "../pages/AllJobs";
import Job from "./Job";
import PageBtnContainer from "./PageBtnContainer";
const JobsContainer = () => {
  const { totalJobs, numOfPages, jobs } = useAllJobsContext();

  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No Jobs to display</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>
        {totalJobs} job{jobs.length > 1 && "s"} found
      </h5>
      <div className="jobs">
        {jobs.map((job) => (
          <Job key={job._id} {...job} />
        ))}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  );
};
export default JobsContainer;
