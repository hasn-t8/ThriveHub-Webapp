import { writable } from 'svelte/store';

// Define the type for a toast notification
export interface Toast {
	id: number;
	message: string;
	type: string; // Use Bulma notification types (e.g., 'is-primary', 'is-danger', etc.)
	duration?: number;
}

export const toasts = writable<Toast[]>([]);

// Function to add a new toast
export function addToast(
	message: string,
	type: string = 'is-primary',
	duration: number = 3000
): void {
	if (type == 'success') type = 'is-primary';

	const id = Date.now(); // Unique ID for each toast
	toasts.update((current) => [...current, { id, message, type: type || 'is-primary', duration }]);

	// Automatically remove the toast after the specified duration
	setTimeout(() => {
		removeToast(id);
	}, duration);
}

// Function to remove a toast by ID
export function removeToast(id: number): void {
	toasts.update((current) => current.filter((toast) => toast.id !== id));
}
