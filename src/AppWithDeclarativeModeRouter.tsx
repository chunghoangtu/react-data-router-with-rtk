/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { lazy } from "react";
import { BrowserRouter, Routes, Route, useNavigate, createBrowserRouter, RouterProvider, createRoutesFromElements } from "react-router";

// import type { User as AuthUser } from "@shared/types/commonTypes";
import type { AuthUser } from "@shared/types/commonTypes";
import { AuthProvider } from "@/shared/context/AuthProvider";
import { useUser } from "@shared/hooks/useUser";

import { ProtectedRouteExtended } from "@/shared/routing/ProtectedRoute";
import { Layout } from "@shared/components/Layout";
import { Login } from "@pages/Login";
import { withLazy } from '@shared/components/withLazy';

// Perform lazy loading
// We need to map component to default type (or we can go to the component file and change them to default export)
const Home = withLazy(lazy(() => import("@pages/Home").then(module => ({ default: module.Home }))))
const Users = withLazy(lazy(() => import("@pages/Users").then(module => ({ default: module.Users }))))
const User = withLazy(lazy(() => import("@pages/User").then(module => ({ default: module.User }))))
const Dashboard = withLazy(lazy(() => import("@pages/Dashboard").then(module => ({ default: module.Dashboard }))))
const Admin = withLazy(lazy(() => import("@pages/Admin").then(module => ({ default: module.Admin }))))
const NoMatch = withLazy(lazy(() => import("@pages/NoMatch").then(module => ({ default: module.NoMatch }))))


const PageAuthorization = new Map<PropertyKey, (...args: AuthUser[]) => boolean>([
  ['admin', (user: AuthUser) => user?.roles.includes('admin')],
  ['dashboard', (user: AuthUser) => user?.permissions.includes('modify')],
])

const router = createBrowserRouter([
  {
    Component: AuthProvider,
    children: [
      { index: true, path: "/", Component: Home },
      { path: "/login", Component: Login },
      {
        path: "dashboard",
        element: <ProtectedRouteExtended redirectPath="/login"/>,        
        children: [
          {
            index: true,
            Component: Dashboard
          }
        ]
      }
    ]
  }
])

/**
 * We can create the routes with JSX using the createRoutesFromElements function. 
 * This is a declarative approach for defining routes and works in the same manner as the createBrowserRouter function
 */
const elementRoutes = createRoutesFromElements(
  <>
    <Route index Component={Home} />
    <Route path='login' Component={Login} />
  </>
)
const elementRouter = createBrowserRouter(elementRoutes)

const App = () => {

  return (
    <>
      <RouterProvider router={router} />
      {/* <RouterProvider router={elementRouter} /> */}
    </>
  );
};

const AppWithRouter = () => {
  return (
    <>
      <App />
    </>
  );
};

export default AppWithRouter;
