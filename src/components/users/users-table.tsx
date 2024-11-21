'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogDescription,
} from '@/components/ui/dialog';
import { Plus as PlusIcon, ChevronDown } from 'lucide-react';
import { useUsers } from '@/services/use-users';
import { UserSchemaType as User } from '@/schemas/user';
import { AddUserForm } from '@/components/users/add-user-form';
import { ScrollIndicator } from '@/components/ui/scroll-indicator';
import Image from 'next/image';

export function UsersTable() {
	const { users, loading } = useUsers();
	const [searchQuery, setSearchQuery] = useState('');
	const [localUsers, setLocalUsers] = useState<User[]>([]);
	const [dialogOpen, setDialogOpen] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [sortBy, setSortBy] = useState<'id' | 'name' | 'email' | 'newest' | null>(null);
	const [showAll, setShowAll] = useState(false);
	const [showScrollIndicator, setShowScrollIndicator] = useState(true);
	const tableContainerRef = useRef<HTMLDivElement>(null);
	const itemsPerPage = 10;

	useEffect(() => {
		if (users) {
			setLocalUsers(users);
		}
	}, [users]);

	const handleAddUser = (userData: Omit<User, 'id'>) => {
		const maxId = Math.max(0, ...localUsers.map(user => user.id));
		const newUser = {
			...userData,
			id: maxId + 1,
		};
		setLocalUsers((prevUsers) => [newUser, ...prevUsers]);
		setCurrentPage(1); // Return to first page to see the new user
		setDialogOpen(false);
	};

	const sortedUsers = useMemo(() => {
		if (!sortBy) return [...localUsers]; // Create a new array to avoid mutation
		
		return [...localUsers].sort((a, b) => {
			switch (sortBy) {
				case 'id':
					return a.id - b.id;
				case 'name':
					return a.name.localeCompare(b.name);
				case 'email':
					return a.email.localeCompare(b.email);
				case 'newest':
					return b.id - a.id;
				default:
					return 0;
			}
		});
	}, [localUsers, sortBy]);

	const filteredUsers = useMemo(() => {
		const query = searchQuery.toLowerCase();
		return sortedUsers.filter((user) => 
			user.name.toLowerCase().includes(query) ||
			user.email.toLowerCase().includes(query)
		);
	}, [sortedUsers, searchQuery]);

	const displayedUsers = useMemo(() => {
		if (showAll) {
			return filteredUsers;
		}
		const startIndex = (currentPage - 1) * itemsPerPage;
		return filteredUsers.slice(startIndex, startIndex + itemsPerPage);
	}, [filteredUsers, currentPage, showAll]);

	const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

	const handlePreviousPage = () => {
		setCurrentPage((prev) => Math.max(1, prev - 1));
	};

	const handleNextPage = () => {
		setCurrentPage((prev) => Math.min(totalPages, prev + 1));
	};

	const handleLoadAll = () => {
		setShowAll(true);
		setCurrentPage(1);
	};

	return (
		<div className="h-full flex flex-col">
			<div className="bg-white border-b">
				<div className="px-4 sm:px-32 py-3 space-y-3">
					<h1 className="text-2xl font-semibold text-gray-900 sm:hidden mb-4">Users</h1>
					<div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-2">
						<div className="w-full sm:flex-1 sm:max-w-[calc(theme(maxWidth.sm)+theme(spacing.24))]">
							<Input
								type="text"
								placeholder="Search users..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
							/>
						</div>
						<div className="flex gap-2 items-center">
							<Button
								variant="outline"
								size="default"
								className="hover:bg-gray-100 transition-colors"
								onClick={() => setSearchQuery('')}
							>
								Clear Search
							</Button>
							<Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
								<DialogTrigger asChild>
									<Button>
										<PlusIcon className="h-4 w-4 mr-2" />
										Add User
									</Button>
								</DialogTrigger>
								<DialogContent
									aria-describedby="add-user-description"
								>
									<DialogHeader>
										<DialogTitle>Add New User</DialogTitle>
										<DialogDescription>
											Fill in the details below to add a new user to the system.
										</DialogDescription>
									</DialogHeader>
									<AddUserForm
										onSubmit={handleAddUser}
										onCancel={() => setDialogOpen(false)}
									/>
								</DialogContent>
							</Dialog>
							<Button
								variant="outline"
								className="relative flex items-center gap-2 hover:bg-gray-100 transition-colors hidden sm:flex"
							>
								Sort
								<select
									value={sortBy || ''}
									onChange={(e) =>
										setSortBy(e.target.value as 'id' | 'name' | 'email' | 'newest' | null || null)
									}
									className="absolute inset-0 appearance-none opacity-0 w-full cursor-pointer"
								>
									<option value="">No Sort</option>
									<option value="newest">Newest First</option>
									<option value="id">By ID</option>
									<option value="name">By Name</option>
									<option value="email">By Email</option>
								</select>
							</Button>
							{!showAll && (
								<Button
									variant="outline"
									onClick={handleLoadAll}
									className="hover:bg-gray-100 transition-colors hidden sm:flex"
								>
									Show All
								</Button>
							)}
						</div>
					</div>
					<div className="hidden sm:flex justify-between items-center">
						<p className="text-sm text-muted-foreground">
							Showing {displayedUsers.length} of {filteredUsers.length} users
						</p>
						{!showAll && (
							<div className="flex items-center gap-2">
								<Button
									variant="outline"
									size="sm"
									onClick={handlePreviousPage}
									disabled={currentPage === 1}
									className="hover:bg-gray-100 transition-colors"
								>
									Previous
								</Button>
								<span className="text-sm text-muted-foreground">
									Page {currentPage} of {totalPages}
								</span>
								<Button
									variant="outline"
									size="sm"
									onClick={handleNextPage}
									disabled={currentPage === totalPages}
									className="hover:bg-gray-100 transition-colors"
								>
									Next
								</Button>
							</div>
						)}
					</div>
				</div>
			</div>

			{/* Mobile List View */}
			<div className="flex-1 overflow-auto sm:hidden">
				<div className="divide-y divide-gray-200">
					{displayedUsers.map((user) => (
						<div key={user.id} className="p-4 flex items-center space-x-4">
							<div className="relative h-12 w-12 flex-shrink-0">
								<Image
									src={`https://api.dicebear.com/7.x/personas/svg?seed=${encodeURIComponent(user.username)}&backgroundColor=b6e3f4`}
									alt={user.name}
									className="rounded-full"
									fill
									sizes="(max-width: 48px) 100vw"
								/>
							</div>
							<div className="min-w-0 flex-1">
								<p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
								<p className="text-sm text-gray-500 truncate">{user.email}</p>
							</div>
						</div>
					))}
				</div>
			</div>

			{/* Desktop Table View */}
			<div className="hidden sm:flex flex-1 min-h-0 relative">
				<div className="absolute inset-0">
					<div className="h-full">
						{loading ? (
							<div className="h-full flex items-center justify-center">
								<div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full" />
							</div>
						) : (
							<div
								ref={tableContainerRef}
								className="h-full px-32 overflow-y-auto overflow-x-hidden scrollbar-hide"
							>
								<table className="w-full divide-y divide-gray-200">
									<thead className="bg-gray-50 sticky top-0 z-10 shadow-sm">
										<tr>
											<th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 w-[80px]">
												ID
											</th>
											<th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 w-[100px]" />
											<th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 min-w-[200px]">
												Name
											</th>
											<th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 min-w-[160px]">
												Username
											</th>
											<th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 min-w-[240px]">
												Email
											</th>
										</tr>
									</thead>
									<tbody className="bg-white divide-y divide-gray-200">
										{displayedUsers.length === 0 ? (
											<tr>
												<td
													colSpan={5}
													className="px-3 py-3.5 whitespace-nowrap text-sm text-center text-gray-500"
												>
													No users found.
												</td>
											</tr>
										) : (
											displayedUsers.map((user) => (
												<tr key={user.id} className="hover:bg-gray-50">
													<td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900 w-[80px]">
														{user.id}
													</td>
													<td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 w-[100px]">
														<div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-100">
															<Image
																priority
																src={`https://api.dicebear.com/7.x/personas/svg?seed=${encodeURIComponent(user.username)}&backgroundColor=b6e3f4`}
																alt={`${user.name}'s avatar`}
																width={64}
																height={64}
																className="w-full h-full object-cover"
															/>
														</div>
													</td>
													<td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 min-w-[200px]">
														{user.name}
													</td>
													<td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 min-w-[160px]">
														{user.username}
													</td>
													<td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 min-w-[240px]">
														{user.email}
													</td>
												</tr>
											))
										)}
									</tbody>
								</table>
								<div className="h-24" />
								<ScrollIndicator containerRef={tableContainerRef} loading={loading} />
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
