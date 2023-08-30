import React, { useEffect } from 'react'
import {FormRow, FormRowSelect} from '../../assets/components';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { clearValues, createJob, handleChange, editJob } from '../../features/user/job/jobSlice';


const AddJobs = () => {
  const dispatch = useDispatch(); 
  const {user} = useSelector((store) => store.user);
  const {
    isLoading,
    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,
    isEditing,
    editJobId,
  } = useSelector((store) => store.job);


  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(isEditing);

    if(!position || !company || !jobLocation){
      toast.error("Please Fill Out All Fields")
      return
    }
    
    
    if (isEditing === true) {
      dispatch(
        editJob({
          jobId: editJobId,
          job: { position, company, jobLocation, jobType, status },
        })
        );
        return;
      }
      
      dispatch(createJob({ position, company, jobLocation, jobType, status }));
      
  };

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleChange({name, value}))
  };

  useEffect(() => {

    // eventually will check for isEditing
    if (!isEditing) {
      dispatch(handleChange({ name: 'jobLocation', value: user.location }));
    }
  }, []);
  

  return (
    <Wrapper>
      <form onSubmit={handleSubmit} className="form">
        <h3>{!isEditing ? 'edit job' : 'add job ' }</h3>
      <div className="form-center">
        {/* position */}
        <FormRow 
        type='text'
        name='position'
        value={position}
        handleChange={handleInput}
        />
        {/* company */}
        <FormRow
            type='text'
            name='company'
            value={company}
            handleChange={handleInput}
          />
          {/* location */}
          <FormRow
            type='text'
            labelText='job location'
            name='jobLocation'
            value={jobLocation}
            handleChange={handleInput}
          />
          {/* job status */}
          <FormRowSelect
            name='status'
            value={status}
            handleChange={handleInput}
            lists={statusOptions}
          />
          {/* job type */}
          <FormRowSelect
            name='jobType'
            labelText='job type'
            value={jobType}
            handleChange={handleInput}
            lists={jobTypeOptions}
          />

          {/* btn container */}
          <div className='btn-container'>
            <button
              type='button'
              className='btn btn-block clear-btn'
              onClick={() => dispatch(clearValues())}
            >
              clear
            </button>
            <button
              type='submit'
              className='btn btn-block submit-btn'
              onClick={handleSubmit}
              disabled={isLoading}
            >
              submit
            </button>
          </div>


      </div>

      </form>

    </Wrapper>
  )
}

const Wrapper = styled.main`
border-radius: var(--borderRadius);
width: 100%;
background: var(--primary-50);
padding: 3rem 2rem 4rem;
box-shadow: var(--shadow-2);
h3 {
  margin-top: 0;
}
.form {
  margin: 0;
  border-radius: 0;
  box-shadow: none;
  padding: 0;
  max-width: 100%;
  width: 100%;
}
.form-row {
  margin-bottom: 0;
}
.form-center {
  display: grid;
  row-gap: 0.5rem;
}
.form-center button {
  align-self: end;
  height: 35px;
  margin-top: 1rem;
}
.btn-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 1rem;
  align-self: flex-end;
  margin-top: 0.5rem;
  button {
    height: 35px;
  }
}
.clear-btn {
  background: var(--grey-500);
}
.clear-btn:hover {
  background: var(--black);
}
@media (min-width: 992px) {
  .form-center {
    grid-template-columns: 1fr 1fr;
    align-items: center;
    column-gap: 1rem;
  }
  .btn-container {
    margin-top: 0;
  }
}
@media (min-width: 1120px) {
  .form-center {
    grid-template-columns: 1fr 1fr 1fr;
  }
  .form-center button {
    margin-top: 0;
  }
}
`

export default AddJobs