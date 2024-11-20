import { User } from "@/types/user";
import { generateRandomUsers } from "@/utils/generate-users";
import { useQuery } from "@tanstack/react-query";

const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  const data = await response.json();
  
  // Generate 25 random users starting from ID 11 (after the 10 API users)
  const randomUsers = generateRandomUsers(25, data.length + 1);
  
  // Combine API users with random users
  return [...data, ...randomUsers];
};

export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });
};
