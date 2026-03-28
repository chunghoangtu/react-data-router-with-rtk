import React, { useState } from 'react';

import { useLocation, useNavigate } from 'react-router';

import type { AuthContextType, AuthUser } from "@shared/types/commonTypes";
import { fakeAuth } from '@shared/services/sampleAPIs.service';
import { AuthContext } from '@shared/services/AuthContext';

type AuthProviderProps = {
  children: React.ReactNode
}

export const CustomAuthProvider = ({ children }: AuthProviderProps) => {
  const navigate = useNavigate()
  const location = useLocation()

  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);

  const handleLogin = async () => {
    await fakeAuth();
    setCurrentUser({ id: "1", fullName: "robin", permissions: ['modify'], roles: ['admin'] });

    // Read the pathname from the location state which we putted in when we redirected from unauthenticated page
    navigate(`${location.state?.from?.pathname || '/'}`, { replace: true })
  }

  const handleLogout = () => {
    setCurrentUser(null);
    navigate('/login', { replace: true })
  }

  const providerValue: AuthContextType = {
    currentUser,
    onLogin: handleLogin,
    onLogout: handleLogout
  }

  return <AuthContext.Provider value={providerValue}>{children}</AuthContext.Provider>;
}
