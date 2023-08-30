import React from 'react'
import image from '../assets/images/undraw_page_not_found_re_e9o6(3).svg';
import styled from 'styled-components';
import { Link } from 'react-router-dom';


const Error = () => {
  return (
    <Wrapper className='full-page'>
      <div className='box'>
        <img src={image} alt="" />
        <h3>Oooh! Page not found</h3>
        <p>Something went wrong</p>
        <Link to='/'>back home</Link>
      </div>
    </Wrapper>
  )
}


const Wrapper = styled.main`
text-align:center;
img{
  width : 40vw;
  max-width : 600px
  display : block;
  margin-bottom : 2rem;
}
display : flex;
align-items : center;
justify-content : center;
p {
    margin-top: 0;
    margin-bottom: 0.5rem;
    color: var(--grey-500);
  }
`

export default Error