/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import { Navigate, useLocation } from 'react-router';

import { useAuth } from '@shared/hooks/useAuth'

// export const Login = () => {
//   const { currentUser, onLogin } = useAuth();
//   const location = useLocation()
//   const from = location.state?.from?.pathname || "/";

//   return (
//     currentUser
//       ? <Navigate to={from} replace />
//       : <>
//         <h2>Login page (Public)</h2>
//         <button type="button" onClick={onLogin}>
//           Sign In
//         </button>
//       </>
//   )
// }

export const Login = () => {
  const { currentUser, onLogin } = useAuth();

  const handleLogin = (e: React.SubmitEvent) => {
    e.preventDefault();
    onLogin();
  }


  return (
    <form onSubmit={handleLogin}>
      <h2>Login page (Public)</h2>
      <button type="submit">Sign In </button>
    </form>
  )
}
