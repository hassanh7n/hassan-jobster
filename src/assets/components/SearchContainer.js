import React from 'react'
import FormRow from './FormRow';
import FormRowSelect from './FormRowSelect';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import {
  handleChange,
  clearFilters
} from '../../features/user/job/allJobsSlice';


const SearchContainer = () => {
const dispatch = useDispatch();

const { isLoading, search, searchStatus, searchType, sort, sortOptions } =
    useSelector((store) => store.allJobs);

  const { jobTypeOptions, statusOptions } = useSelector((store) => store.job);

const handleSearch = (e) => {
  if(isLoading) return;
  dispatch(handleChange({name : e.target.name, value : e.target.value}));

};

const handleSubmit = (e) => {
  e.preventDefault();
  dispatch(clearFilters())
}
  
  
  
  return (
    <Wrapper>
      <form className="form">
        <h4>search form</h4>
        <div className="from-center">
          {/* search position */}
          {/* <FormRow
            type='text'
            name='search'
            value={search}
            handleChange={handleSearch}
          /> */}
          <FormRow 
          type='text'
          name='search'
          value={search}
          handleChange={handleSearch}
          />

          {/* search by status */}
          <FormRowSelect
            labelText='status'
            name='searchStatus'
            value={searchStatus}
            handleChange={handleSearch}
            lists={['all', ...statusOptions]}
          />

          {/* Search by type */}
          <FormRowSelect 
          labelText='type'
          name='searchType'
          value={searchType}
          handleChange={handleSearch}
          lists={['all', ...jobTypeOptions]}
          />

          <FormRowSelect
            name='sort'
            value={sort}
            handleChange={handleSearch}
            lists={sortOptions}
          />  

          <button
          className='btn btn-block btn-danger'
          disabled={isLoading}
          onClick={handleSubmit}
          >
            clear filters
          </button>

        </div>
      </form>
    </Wrapper>
  )
}

const Wrapper = styled.main`
.form {
    width: 100%;
    max-width: 100%;
  }
  .form-input,
  .form-select,
  .btn-block {
    height: 35px;
  }
  .form-row {
    margin-bottom: 0;
  }
  .form-center {
    display: grid;
    grid-template-columns: 1fr;
    column-gap: 2rem;
    row-gap: 0.5rem;
  }
  h5 {
    font-weight: 700;
  }
  .btn-block {
    align-self: end;
    margin-top: 1rem;
  }
  @media (min-width: 768px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
    }
  }
  @media (min-width: 992px) {
    .form-center {
      grid-template-columns: 1fr 1fr 1fr;
    }
    .btn-block {
      margin-top: 0;
    }
  }
`


export default SearchContainer