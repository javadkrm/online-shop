import { useEffect, useState } from "react";
import { getUsers } from "../services/usersSerivice";
import { type User } from "../types/User";

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);

        const data = await getUsers();

        setUsers(data);
      } catch {
        setError("دریافت کاربران با خطا مواجه شد");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return { users, loading, error };
}