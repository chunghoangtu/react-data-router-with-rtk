import { useCallback, useState } from "react";

import type { User } from "@shared/types/commonTypes";

export const useUser = () => {

  const [users, setUsers] = useState<User[]>([
    { id: "1", fullName: "Robin Wieruch" },
    { id: "2", fullName: "Sarah Finnley" },
  ])

  const addUsers = useCallback((...newUsers: User[]) => {
    setUsers(currentUsers => currentUsers.concat(newUsers))
  }, [])

  const removeUserById = useCallback((userId: string | undefined) => {
    if (!userId) return;
    setUsers((state) => state.filter((user) => user.id !== userId));
  }, [])

  return {
    users,
    addUsers,
    removeUserById
  }
}