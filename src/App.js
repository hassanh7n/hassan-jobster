import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Landing, Error, Register, ProtectedRoutes } from './pages'
import {
  Profile,
  AddJobs,
  AllJobs,
  Stats,
  SharedLayout,
} from './pages/Dashboard'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
      <Route path='/' element={
        <ProtectedRoutes>
        <SharedLayout/>
      </ProtectedRoutes>
      }>
          <Route index element={<Stats />} />
          <Route path='add-job' element={<AddJobs />} />
          <Route path='all-jobs' element={<AllJobs />} />
          <Route path='profile' element={<Profile />} />
        </Route>
        <Route path='landing' element={<Landing/>} />
        <Route path='register' element={<Register/>} />
        <Route path='*' element={<Error/>} />
      </Routes>
      <ToastContainer position='top-center' />
    </BrowserRouter>
    
  )
}

export default App