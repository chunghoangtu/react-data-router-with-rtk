import React from 'react'
import { Navigate, useLocation } from 'react-router';

import { useAuth } from '@shared/hooks/useAuth'

export const Login = () => {
  const { currentUser, onLogin } = useAuth();
  const location = useLocation()
  const from = location.state?.from?.pathname || "/";

  return (
    currentUser
      ? <Navigate to={from} replace />
      : <>
        <h2>Login page (Public)</h2>
        <button type="button" onClick={onLogin}>
          Sign In
        </button>
      </>
  )
}
