
export type User = {
  id: string;
  fullName: string;
};

export type AuthUser = User & {
  permissions: string[];
  roles: string[];
}

export type AuthContextType<T = unknown, R = unknown> = {
  currentUser: AuthUser | null;
  onLogin: (...args: T[]) => R;
  onLogout: (...args: T[]) => R;
}
