'use client';

import { UsersTable } from '@/components/users/users-table';

export default function UsersPage() {
  return (
    <div className="h-screen flex flex-col">
      <h1 className="text-2xl font-bold p-4">Users List</h1>
      <div className="flex-1 min-h-0 overflow-hidden">
        <UsersTable />
      </div>
    </div>
  );
}
