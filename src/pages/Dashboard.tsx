import React from 'react'
import { useAuth } from '@shared/hooks/useAuth'

export const Dashboard = () => {
  const { currentUser, onLogout } = useAuth()

  const handleLogout = () => {
    onLogout();
  };

  return (
    <>
      <h2>Current user: {currentUser?.fullName}</h2>
      <div>Dashboard  (Protected: authenticated user required)</div>
      <button onClick={handleLogout}>Logout</button>
    </>
  )
}
