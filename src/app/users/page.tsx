'use client';

import { UsersTable } from '@/components/users/users-table';

export default function UsersPage() {
	return (
		<div className="h-screen flex flex-col">
			<h1 className="text-4xl font-semibold p-4">In2event users</h1>
			<div className="flex-1 min-h-0 overflow-hidden">
				<UsersTable />
			</div>
		</div>
	);
}
