'use client';

import { User } from "@/types/user";
import { useState, useEffect } from "react";
import { generateRandomUsers } from "@/utils/generate-users";

const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        
        // Generate 25 random users starting from ID 11 (after the 10 API users)
        const randomUsers = generateRandomUsers(25, data.length + 1);
        
        // Combine API users with random users
        setUsers([...data, ...randomUsers]);
      } catch {
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return { users, loading, error };
};

export { useUsers };
