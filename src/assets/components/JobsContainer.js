import React, { useEffect } from 'react'
import styled from 'styled-components'
import Job from './Job'
import { useDispatch, useSelector } from 'react-redux'
import { getAllJobs } from '../../features/user/job/allJobsSlice'
import PageBtnContainer from './PageBtncontainer';


const JobsContainer = () => {
  const {jobs,
    isLoading,
    page,
    totalJobs,
    numOfPages,
    search,
    searchStatus,
    searchType,
    sort,} = useSelector((store) => store.allJobs);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllJobs());
    // eslint-disable-next-line
  }, [page, search, searchStatus, searchType, sort]);
  if (isLoading) {
    return (
      <Wrapper>
        <h2>Loading...</h2>
      </Wrapper>
    );
  }

  if(jobs.length === 0){
    return
    <Wrapper>
      <h2>No jobs to display</h2>
    </Wrapper>
  }

  return (
    <Wrapper>
        <h5>
          {totalJobs} job{jobs.length > 1 && 's'}    found
        </h5>
        <div className="jobs">
          {jobs.map((job) => {
            return <Job 
            key={job._id}
            {...job}
            />
          })}
        </div>
        {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  )
}



const Wrapper = styled.main`
margin-top: 4rem;
h2 {
  text-transform: none;
}
& > h5 {
  font-weight: 700;
}
.jobs {
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 2rem;
}
@media (min-width: 992px) {
  .jobs {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
}
`
export default JobsContainer