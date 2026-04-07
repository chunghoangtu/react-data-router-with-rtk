import { useContext } from "react"
import { AuthContext } from "@/shared/context/AuthContext";

export const useAuth = () => {
  return useContext(AuthContext);
}
