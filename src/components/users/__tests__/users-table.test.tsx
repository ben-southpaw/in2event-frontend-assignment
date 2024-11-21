import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { UsersTable } from '../users-table';

// Mock the useUsers hook
vi.mock('@/services/use-users', () => ({
	useUsers: () => ({
		data: [
			{
				id: 1,
				name: 'John Smith',
				email: 'john@example.com',
				username: 'johnuser',
			},
			{
				id: 2,
				name: 'Jane Wilson',
				email: 'jane@example.com',
				username: 'janeuser',
			},
			{ id: 3, name: 'Bob Smith', email: 'bob@test.com', username: 'bobuser' },
		],
		isLoading: false,
		error: null,
	}),
}));

describe('UsersTable', () => {
	it('renders the add user button', () => {
		render(<UsersTable />);
		expect(screen.getByText('Add User')).toBeInTheDocument();
	});

	it('renders the search input', () => {
		render(<UsersTable />);
		expect(screen.getByPlaceholderText('Search users...')).toBeInTheDocument();
	});

	describe('search filtering', () => {
		it('shows results when searching by name', async () => {
			const user = userEvent.setup();
			render(<UsersTable />);

			const searchInput = screen.getByPlaceholderText('Search users...');
			await user.type(searchInput, 'Smith');

			// Should find both users with "Smith" in their name
			expect(screen.getByText('john@example.com')).toBeInTheDocument();
			expect(screen.getByText('bob@test.com')).toBeInTheDocument();
			// Should not show user without "Smith" in name
			expect(screen.queryByText('jane@example.com')).not.toBeInTheDocument();
		});

		it('shows results when searching by email', async () => {
			const user = userEvent.setup();
			render(<UsersTable />);

			const searchInput = screen.getByPlaceholderText('Search users...');
			await user.type(searchInput, '@example.com');

			// Should find both users with "@example.com" in their email
			expect(screen.getByText('John Smith')).toBeInTheDocument();
			expect(screen.getByText('Jane Wilson')).toBeInTheDocument();
			// Should not show user without "@example.com" in email
			expect(screen.queryByText('Bob Smith')).not.toBeInTheDocument();
		});
	});
});
