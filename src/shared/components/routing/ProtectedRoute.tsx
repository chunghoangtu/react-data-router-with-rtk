import React from 'react'
import { Navigate, Outlet, useLocation } from 'react-router';
import { useAuth } from '@shared/hooks/useAuth';
import type { AuthUser } from '@shared/types/commonTypes';

type ProtectedRouteProps = {
  redirectPath?: string;
  children?: React.ReactNode
}

type ProtectedRouteExtendedProps<T = AuthUser, R = boolean> = {
  isAuthorized?: (...args: T[]) => R;
  redirectPath?: string;
  children?: React.ReactNode
}

/**
 * The ProtectedRoute here accept both children and Outlet in case we want to render our page as a children of this ProtectedRoute Component
 * or we want this ProtectedRoute component act like a Layout Component which render its child via the Outlet
 */
export const ProtectedRoute = ({ redirectPath = '/', children }: ProtectedRouteProps) => {
  const location = useLocation()
  const { currentUser } = useAuth()

  // Put current location to routing state
  return currentUser
    ? (children || <Outlet />)
    : <Navigate to={redirectPath} replace state={{ from: location }} />
}

export const ProtectedRouteExtended = ({ isAuthorized = () => false, redirectPath = '/', children }: ProtectedRouteExtendedProps) => {
  const location = useLocation()
  const { currentUser } = useAuth()

  const hasAccessible = !!(currentUser && isAuthorized && isAuthorized(currentUser))

  // Put current location to routing state
  return hasAccessible
    ? (children || <Outlet />)
    : <Navigate to={redirectPath} replace state={{ from: location }} />
}
