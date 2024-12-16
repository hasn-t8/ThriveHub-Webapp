// src/routes/admin-area/edit-business/[id]/+page.ts
import type { LoadEvent } from '@sveltejs/kit';
import { getProfiles } from '$lib/stores/profile';

export async function load({ params }: LoadEvent) {
  const { id } = params;

  try {
    const profiles = await getProfiles();

    if (!profiles || !Array.isArray(profiles)) {
      throw new Error('Failed to fetch profiles.');
    }

    // Find the specific profile by ID
    const profile = profiles.find((profile) => profile.id === Number(id));

    if (!profile) {
      throw new Error(`Business profile with ID ${id} not found.`);
    }

    return {
      props: { profile }
    };
  } catch (error) {
    console.error('Error loading profile:', error);
    return {
      status: 404,
      error: new Error('Profile not found.')
    };
  }
}
