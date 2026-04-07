import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router';
import { useAuth } from '@shared/hooks/useAuth';
import type { AuthUser } from '@shared/types/commonTypes';

type ProtectedRouteExtendedProps<T = AuthUser, R = boolean> = {
  isAuthorized?: (...args: T[]) => R;
  redirectPath?: string;
  children?: React.ReactNode
}

export const ProtectedRouteExtended = ({ isAuthorized = () => true, redirectPath = '/login', children }: ProtectedRouteExtendedProps) => {
  const location = useLocation()
  const { currentUser } = useAuth()

  const hasAccessible = !!(currentUser && isAuthorized && isAuthorized(currentUser))

  // Put current location to routing state
  return hasAccessible
    ? (children || <Outlet />)
    : <Navigate to={redirectPath} replace state={{ from: location }} />
}
