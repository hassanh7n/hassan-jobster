import React from 'react'
import { Logo } from '../assets/components'
import styled from 'styled-components'
import Main from '../assets/images/undraw_career_progress_ivdb(3).svg'
import { Link } from 'react-router-dom'


const Landing = () => {
  return (
    
        <Wrapper>
            <nav>
                <Logo />
            </nav>
            <div className="container main">
                <div className="left">
                    <h1>Meet new opportunities</h1>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex magni delectus laborum asperiores, dolorum, cumque animi placeat dolore labore facere ad perspiciatis. Sunt nam sequi odit repellendus veniam. Aspernatur, fuga.</p>
                    <Link to='/register' className='btn btn-hero'>Login/Register</Link>
                </div>
                <img className='main-img' src={Main} alt="main image" />
            </div>
        </Wrapper>
  )
}


const Wrapper = styled.main`
nav{
    width : var(--fluid-width);
    max-width : var(--max-width);
    height : var(--nav-height);
    display : flex;
    margin: 0 auto;
    padding-top : 20px;
    color : var(--textColor);
}
.logo{
    width : 60px;
    height : 60px;
    margin-right : 10px
    
}
.web-name{
    font-weight : 500px
}
.main{
    display : grid;
    align-items : center;
    margin-top : -3rem;
    min-height : calc(100vh -  var(--nav-height));
    
}
.main-img {
    display: none;
}
p{
    color : var(--grey-600)
}
@media (min-width: 990px){
    .main{
        grid-template-columns : 1fr 1fr;
        column-gap : 3rem;
        padding : 100px 0;
    }
    .main-img {
    display: block;
    width : 500px
}
}

`

export default Landing