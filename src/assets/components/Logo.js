import React from 'react'
import logo from '../images/logo.png'
import styled from 'styled-components'

const Logo = () => {
  return (
    <Wrapper>
        <nav>
            <img className='logo' src={logo} alt="Jobify" />
            <h1 className='web-name'>Jobify</h1>
        </nav>
    </Wrapper>
  )
}
const Wrapper = styled.main`
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
`

export default Logo