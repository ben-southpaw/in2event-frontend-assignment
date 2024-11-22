import { User } from '@/types/user';
import { generateRandomUsers } from '@/utils/generate-users';
import { useQuery } from '@tanstack/react-query';

const fetchUsers = async (): Promise<User[]> => {
	const response = await fetch('https://jsonplaceholder.typicode.com/users');
	if (!response.ok) {
		throw new Error('Failed to fetch users');
	}
	const data = await response.json();

	// Generate 25 random users pop on end
	const randomUsers = generateRandomUsers(25, data.length + 1);

	// Combine users with randoms
	return [...data, ...randomUsers];
};

export const useUsers = () => {
	return useQuery({
		queryKey: ['users'],
		queryFn: fetchUsers,
	});
};
