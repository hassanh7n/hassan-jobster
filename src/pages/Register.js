import React, { useState, useEffect } from 'react'
import { Logo, FormRow } from '../assets/components'
import styled from 'styled-components'
import { toast } from 'react-toastify'
import img from '../assets/images/logo.png'
import { useDispatch, useSelector } from 'react-redux'
import {registerUser, loginUser} from '../features/user/userSlice'
import { Navigate, useNavigate } from 'react-router-dom'



const initialState = {
  name : '', 
  email : '',
  password : '',
  isMember : true,
}


const Register = () => {
  const [values, setValues] = useState(initialState);
  const Navigate = useNavigate();

  const dispatch = useDispatch();
  const {isLoading, user} = useSelector((store) => store.user);
  console.log(isLoading, user)

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setValues({ ...values, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      toast.error('Please Fill Out All Fields');
      return;
    }
    if (isMember) {
      dispatch(loginUser({ email: email, password: password }));
      return;
    }
    dispatch(registerUser({ name, email, password }));
  };

  const toggleMember = () => {
    setValues({...values, isMember : !values.isMember})
  }
  useEffect(() => {
    if(user){
      
      setTimeout(() => {
        Navigate('/')
      }, 3000);
    }
  }, [user, Navigate])
  
  
  return (
    <Wrapper className='full-page'>
      <form className='form' onSubmit={onSubmit} action="">
      <nav>
            <img className='logo' src={img} alt="Jobify" />
            <h1 className='web-name'>Jobify</h1>
        </nav>
        
        <h3>{values.isMember? 'Login' : 'Register'}</h3>


        {/* name field */}
        {!values.isMember && (
          <FormRow
            type='text'
            name='name'
            value={values.name}
            handleChange={handleChange}
          />
        )}

       {/* email field */}
       <FormRow 
          type='email'
          name='email'
          value={values.email}
          handleChange={handleChange}
          />

        {/* password field */}
        <FormRow 
            type='password'
            name='password'
            value={values.password}
            handleChange={handleChange}
            />

      <button type='submit' className='btn btn-block btn-hipster' disabled={isLoading}
      >
        
        {isLoading ? 'loading...' : 'submit'}
      </button>
      <button
          type='button'
          className='btn btn-block btn-hipster'
          disabled={isLoading}
          onClick={() =>
            dispatch(
              loginUser({ email: 'testUser@gmail.com', password: '123456' })
            )
          }
        >
          {isLoading ? 'loading...' : 'demo app'}
        </button>
      
      </form>
    </Wrapper>
  )
}

const Wrapper = styled.main`
display : grid;
align-items: center;
justify-content:center;
nav{
    padding-top:25px;
    display : flex;
    color : var(--textColor);
}
.logo{
    height : 40px;
    width : 40px;
}
.web-name{
    padding-left : 10px;
    font-weight : 300px;
    font-size : 35px;
}
@media (min-width: 500px){
    nav{
        padding-top : 20px;
    }
    .logo{
    width : 60px;
    height : 60px;
    margin-right : 10px
    }
    .web-name {
    font-size: 45px;
    }
}
/* .logo{
  display : block;
  margin-bottom : 1.40rem
  margin : 0 auto;
} */
.form :{
  max-width : 400px;
  border-top: 5px solid var(--primary-500);
}
h3{
  text-align : center;
}
p{
  margin : 0;
  margin-top : 1rem;
  text-align : center;
}
.btn{
  margin-top : 1rem;
}
.member-btn {
    background: transparent;
    border: transparent;
    color: var(--primary-500);
    cursor: pointer;
    letter-spacing: var(--letterSpacing);
  }
  
`


export default Register