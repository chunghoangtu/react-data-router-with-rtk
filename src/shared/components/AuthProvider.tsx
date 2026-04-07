/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';

import { useLocation, useNavigate, useOutlet } from 'react-router';

import type { AuthContextType, AuthUser } from "@shared/types/commonTypes";
import { fakeAuth } from '@shared/services/sampleAPIs.service';
import { AuthContext } from '@shared/services/AuthContext';

export const AuthProvider = () => {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const navigate = useNavigate()
  const outlet = useOutlet();
  // const location = useLocation()


  const handleLogin = async () => {
    await fakeAuth();
    setCurrentUser({ id: "1", fullName: "robin", permissions: ['modify'], roles: ['admin'] });

    // Read the pathname from the location state which we putted in when we redirected from unauthenticated page
    // navigate(`${location.state?.from?.pathname || '/'}`, { replace: true })
    navigate("/dashboard");
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

  return <AuthContext.Provider value={providerValue}>{outlet}</AuthContext.Provider>;
}
