import { useContext } from "react"
import { AuthContext } from "@shared/services/AuthContext";

export const useAuth = () => {
  return useContext(AuthContext);
}
