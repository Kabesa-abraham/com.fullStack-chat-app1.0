import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import { Route, Routes,Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import SettingPage from './pages/SettingPage'
import ProfilePage from './pages/ProfilePage'
import { useAuthStore } from './store/useAuthStore.js'
import {Loader} from 'lucide-react'
import { Toaster } from 'react-hot-toast'
import { useThemeStore } from './store/useThemeStore.js'

const App = () => {
  const {authUser,isCheckingAuth,checkAuth,onlineUsers} = useAuthStore();
  const {theme} = useThemeStore();

  useEffect(() =>{
    checkAuth();
  },[checkAuth])

  console.log("users Connected",onlineUsers)

  if(isCheckingAuth && !authUser) return(
    <div className='flex items-center justify-center h-screen' >
      <Loader className='size-10 animate-spin' />
    </div>
  )

  return (
    <div data-theme={theme} >
      <Navbar/>
      <Routes>
        <Route path='/' element={ authUser ? <HomePage/>  : <Navigate to={'/login'} /> }/>
        <Route path='/signup' element={!authUser ? <SignupPage/> :<Navigate to={'/'} /> } />
        <Route path='/login' element={!authUser ? <LoginPage/> :<Navigate to={'/'} />} />
        <Route path='/setting' element={<SettingPage/>}/>
        <Route path='/profile' element={authUser ? <ProfilePage/> : <Navigate to={'/login'} /> }/>
      </Routes>

      <Toaster/>
    </div>
  )
}

export default App

