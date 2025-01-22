import { writable } from 'svelte/store';

// Initialize a writable store to hold the Quill editor content as HTML
export const quillHTML = writable<string>('');

// Optional: Function to reset the store to an empty string
export function resetQuillHTML() {
  quillHTML.set('');
}
// Function to update the Quill editor content
export function updateQuillHTML(content: string) {
    quillHTML.set(content);
}

// Function to subscribe to changes in the Quill editor content
export function subscribeToQuillHTML(callback: (value: string) => void) {
    return quillHTML.subscribe(callback);
}