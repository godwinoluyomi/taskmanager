import React from 'react'
import FooterBar from '../components/FooterBar'
import { Outlet } from 'react-router-dom'

const DefaultLayout = () => {
  return (
    <>
      <Outlet />
      <FooterBar />
    </>
  )
}

export default DefaultLayout