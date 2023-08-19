import { z } from 'zod';

export const clanName = z.enum(['Ventrue']);
export type ClanName = z.infer<typeof clanName>;
