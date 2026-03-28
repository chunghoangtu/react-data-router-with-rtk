import React from 'react'
import { NavLink, type NavLinkRenderProps } from 'react-router'
import { useAuth } from '@shared/hooks/useAuth';

export const Navigation = () => {
  // NavLink has callback props on className, style, and children with the active state for inline styling or conditional rendering
  const activeStyle = ({isActive}: NavLinkRenderProps) => {
    return isActive ? 'bg-green-200' : ''
  }

  const {currentUser, onLogout} = useAuth();

  return (
    currentUser 
    ? <nav className="bg-cyan-500 border border-b-cyan-700 p-1 flex gap-1">
      <NavLink to="/" className={activeStyle}>Home</NavLink>
      <NavLink to="/users" className={activeStyle}>Users</NavLink> 
      <NavLink to="/dashboard" className={activeStyle}>Dashboard</NavLink> 
      <NavLink to="/admin" className={activeStyle}>Admin</NavLink> 
      <button type="button" onClick={onLogout}>
        Sign Out
      </button>
    </nav>
    : <></>
  )
}
