import React, { useState } from 'react'
import styled from 'styled-components'
import Logo from './Logo'
import { useDispatch, useSelector } from 'react-redux'
import { FaUserCircle, FaCaretDown } from 'react-icons/fa'
import { toggleSidebar,logoutUser } from '../../features/user/userSlice'
import { FiMenu } from "react-icons/fi";




const Navbar = () => {
  const {user} = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const toggle = () => {
    dispatch(toggleSidebar())
  }
  const [showLogout, setShowLogout] = useState(false)
  
  return (
    <Wrapper>
      <div className="nav-center">
        <button
        type='button'
        className='toggle-btn'
        onClick={toggle}
        >
          <FiMenu />
        </button>
        <div>
          <div className="Logo">
          <Logo/>
            </div>
          <h3 className="logo-text">Control Panel</h3>
        </div>
        <div className="btn-container">
          <button 
          className='btn'
          type='button'
          onClick={() =>setShowLogout(!showLogout)}
          >
            <FaUserCircle />
            {user?.name}
            <FaCaretDown />
          </button>
          <div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
            <button
            type='button'
            className='dropdown-btn'
            onClick={() => dispatch(logoutUser('Logging out...'))}
            >
              logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}


const Wrapper = styled.main`

height: var(--nav-height);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 0px 0px rgba(0, 0, 0, 0.1);
  .logo {
    display: flex;
    align-items: center;
  }
  .nav-center {
    display: flex;
    width: 90vw;
    align-items: center;
    justify-content: space-between;
  }
  .toggle-btn {
    background: transparent;
    border-color: transparent;
    font-size: 1.75rem;
    color: var(--primary-500);
    cursor: pointer;
    display: flex;
    align-items: center;
  }
  background: var(--primary-50);
  .btn-container {
    position: relative;
  }
  .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0 0.5rem;
    position: relative;
    box-shadow: var(--shadow-2);
  }

  .dropdown {
    position: absolute;
    top: 40px;
    left: 0;
    width: 100%;
    background: var(--primary-100);
    box-shadow: var(--shadow-2);
    padding: 0.5rem;
    text-align: center;
    visibility: hidden;
    border-radius: var(--borderRadius);
  }
  .show-dropdown {
    visibility: visible;
  }
  .dropdown-btn {
    background: transparent;
    border-color: transparent;
    color: var(--primary-500);
    letter-spacing: var(--letterSpacing);
    text-transform: capitalize;
    cursor: pointer;
  }
  .logo-text {
    display: none;
    margin: 0;
  }
  @media (min-width: 992px) {
    position: sticky;
    top: 0;

    .nav-center {
      width: 90%;
    }
    .logo {
      display: none;
    }
    .logo-text {
      display: block;
    }
    .Logo{
      display : none;
    }
  }
`

export default Navbar