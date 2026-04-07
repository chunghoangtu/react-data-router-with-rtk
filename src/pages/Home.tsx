/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '@shared/hooks/useAuth';

// export const Home = () => {
//   const navigate = useNavigate()
//   const { currentUser } = useAuth()

//   const handleSignIn = () => {
//     navigate('/login')
//   }

//   return (
//     <>
//       <h2>Home  (Public: anyone can access this page)</h2>

//       {!currentUser
//         ? <button type="button" onClick={handleSignIn}>
//           Sign In
//         </button>
//         : <></>}
//     </>
//   )
// }

export const Home = () => {

  return (
    <>
      <h2>Home  (Public: anyone can access this page)</h2>
    </>
  )
}
