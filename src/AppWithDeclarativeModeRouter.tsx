import React, { lazy } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router";

// import type { User as AuthUser } from "@shared/types/commonTypes";
import type { AuthUser } from "@shared/types/commonTypes";
import { CustomAuthProvider } from "@shared/components/AuthProvider";
import { useUser } from "@shared/hooks/useUser";

import { ProtectedRoute, ProtectedRouteExtended } from "@/shared/components/routing/ProtectedRoute";
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

const App = () => {
  const navigate = useNavigate();

  const { users, removeUserById } = useUser()

  const handleRemoveUser = (userId: string | undefined) => {
    removeUserById(userId)
    navigate("/users");
  };

  return (
    <>
      <CustomAuthProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />

            {/* Users page only required user to be present (authenticated) */}
            <Route element={<ProtectedRoute redirectPath="/login" />}>
              <Route path="users" element={<Users users={users} />}>
                <Route path=":userId" element={<User onRemoveUser={handleRemoveUser} />} />
              </Route>
            </Route>

            {/* Admin page required user to have "admin" role */}
            <Route element={<ProtectedRouteExtended redirectPath="/login" isAuthorized={PageAuthorization.get('admin')} />}>
              <Route path="admin" element={<Admin />} />
            </Route>

            {/* Dashboard page required user to have "modify" permission*/}
            <Route element={<ProtectedRouteExtended redirectPath="/login" isAuthorized={PageAuthorization.get('dashboard')} />}>
              <Route path="dashboard" element={<Dashboard />} />
            </Route>

            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
      </CustomAuthProvider>
    </>
  );
};

{/* Using ProtectedRoute via Outlet */ }
{/* <Route element={<ProtectedRoute redirectPath="/login" />}>
  <Route path="admin" element={<ProtectedRouteExtended
    redirectPath="/login"
    isAuthorized={PageAuthorization.get('admin')}>
    {renderLazyPage(<Admin />)}
  </ProtectedRouteExtended>} />
</Route> */}
{/* Using Protected Route as a layout Component */ }
{/* <Route path="dashboard" element={<ProtectedRouteExtended
  redirectPath="/login"
  isAuthorized={PageAuthorization.get('dashboard')}>
  {renderLazyPage(<Dashboard />)}
</ProtectedRouteExtended>} /> */}

const AppWithRouter = () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

export default AppWithRouter;
