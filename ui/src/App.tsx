import React, { useEffect } from 'react'
import Header from './components/Header'

import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Hero from './components/Homepage/Hero/Hero';
import Layout from './components/Layout/Layout';
import Homepage from './components/Homepage/homepage';
import Login from './components/Auth/Login';
import Footer from './components/Footer';
import Registration from './components/Auth/Registration';
import { useAppDispatch } from './hooks';
import { getUser } from './Store/Action/AuthActions';
import Patient from './components/Patient/Patient';
const App:React.FC = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    console.log("working")
    dispatch(getUser())
    
  }, [])
  return (


    <div className = 'min-h-screen bg-blue-50 flex  flex-col justify-between'>
      <Router>
      <Header />
      <Layout>
          <Routes>
         <Route element = {<Homepage />} path='/'/>
          <Route element = {<Login />} path='/Login' />
          <Route element = {<Registration />} path  =  "/Registration" />
          <Route element = {<Patient />} path = "/Patient/*" />
          </Routes>
        </Layout>
        <Footer />
      </Router>
    </div>
  )
}

export default App