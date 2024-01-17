import React from 'react'
import './App.css'
import MainLayout from './layout/MainLayout'
import AuthLayout from './layout/AuthLayout'
import { Route, Routes } from 'react-router-dom'
import DefaultLayout from './layout/DefaultLayout'
import Login from './pages/Login'
import Register from './pages/Register'
import ResetPassword from './pages/ResetPassword'
import NotFound from './pages/NotFound'
import Tasks from './pages/Tasks'
import ProfileSetting from './pages/ProfileSetting'
import PrivateUserRoute from './routes/PrivateUserRoute'

function App() {
  return (
    <>

      <Routes>
        <Route path='/' element={<DefaultLayout />}>

          <Route path='/' element={<AuthLayout />}>
            <Route index element={<Login />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/reset-password' element={<ResetPassword />} />
          </Route>

          <Route element={<PrivateUserRoute />}>
            <Route path='/' element={<MainLayout />}>
              <Route path='/tasks' element={<Tasks />} />
              <Route path='/profile' element={<ProfileSetting />} />
            </Route>
          </Route>

          <Route path='*' element={<NotFound />} />
        </Route>
      </Routes>

    </>
  )
}

export default App
