import { createContext } from "react";
import type { AuthContextType } from "@shared/types/commonTypes";

export const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  onLogin: () => { },
  onLogout: () => { }
})