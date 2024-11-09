import { z } from 'zod';

export const characterStatus = z.enum(['draft', 'review', 'accepted', 'rejected', 'archived']);
export type CharacterStatus = z.infer<typeof characterStatus>;
