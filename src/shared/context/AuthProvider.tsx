/* eslint-disable no-debugger */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useMemo, useState } from 'react';

import { useLocation, useNavigate, useOutlet } from 'react-router';

import type { AuthContextType, AuthUser } from "@shared/types/commonTypes";
import { fakeAuth } from '@shared/services/sampleAPIs.service';
import { AuthContext } from '@/shared/context/AuthContext';

export const AuthProvider = () => {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const navigate = useNavigate()
  const outlet = useOutlet();

  const providerValue: AuthContextType = useMemo(() => {
    const handleLogin = async () => {
      await fakeAuth();
      setCurrentUser({ id: "1", fullName: "robin", permissions: ['modify'], roles: ['admin'] });

      navigate("/dashboard");
    }

    const handleLogout = () => {
      setCurrentUser(null);
      // navigate('/', { replace: true })
    }

    return {
      currentUser,
      onLogin: handleLogin,
      onLogout: handleLogout
    }
  }, [currentUser, navigate, setCurrentUser])

  return (
    <AuthContext.Provider value={providerValue}>
      {outlet}
    </AuthContext.Provider>
  )
}