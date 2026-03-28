import React from 'react'
import { useAuth } from '@shared/hooks/useAuth'

export const Admin = () => {
  const { currentUser } = useAuth()

  return (
    <div>
      <h2>Current user: {currentUser?.fullName}</h2>
      Admin (Protected: authenticated user with permission 'Admin' required)
    </div>
  );
};
