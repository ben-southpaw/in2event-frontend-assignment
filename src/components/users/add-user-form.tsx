'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserSchema, UserSchemaType } from '@/schemas/user';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import { z } from 'zod';
import { cn } from '@/lib/utils';

const AddUserSchema = UserSchema.omit({ id: true });
type AddUserInput = z.infer<typeof AddUserSchema>;

interface AddUserFormProps {
	onSubmit: (data: Omit<UserSchemaType, 'id'>) => void;
	onCancel: () => void;
}

export function AddUserForm({ onSubmit, onCancel }: AddUserFormProps) {
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
		reset,
	} = useForm<AddUserInput>({
		resolver: zodResolver(AddUserSchema),
	});

	const onSubmitForm = async (data: AddUserInput) => {
		onSubmit(data);
		reset();
	};

	return (
		<form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
			<div className="space-y-2">
				<Input
					{...register('name')}
					placeholder="Name"
					className={cn(
						'bg-transparent text-foreground text-base sm:text-sm',
						errors.name ? 'border-red-500' : ''
					)}
				/>
				{errors.name && (
					<p className="text-sm text-red-500">{errors.name.message}</p>
				)}
			</div>

			<div className="space-y-2">
				<Input
					{...register('username')}
					placeholder="Username"
					className={cn(
						'bg-transparent text-foreground text-base sm:text-sm',
						errors.username ? 'border-red-500' : ''
					)}
				/>
				{errors.username && (
					<p className="text-sm text-red-500">{errors.username.message}</p>
				)}
			</div>

			<div className="space-y-2">
				<Input
					{...register('email')}
					type="email"
					placeholder="Email"
					className={cn(
						'bg-transparent text-foreground text-base sm:text-sm',
						errors.email ? 'border-red-500' : ''
					)}
				/>
				{errors.email && (
					<p className="text-sm text-red-500">{errors.email.message}</p>
				)}
			</div>

			<DialogFooter>
				<Button type="button" variant="outline" onClick={onCancel}>
					Cancel
				</Button>
				<Button type="submit" disabled={isSubmitting}>
					{isSubmitting ? 'Adding...' : 'Add User'}
				</Button>
			</DialogFooter>
		</form>
	);
}
