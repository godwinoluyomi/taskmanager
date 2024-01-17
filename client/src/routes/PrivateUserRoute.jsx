import React from 'react'
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectAuthStatus } from '../redux/authSlice';

const PrivateUserRoute = () => {

  // const isAuthenticated = false;
  // const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const isAuthenticated = useSelector(selectAuthStatus);

  return !isAuthenticated ? <Navigate to={'/login'} /> : <Outlet />;

}

export default PrivateUserRoute