import { z } from 'zod';

export const clanName = z.enum(['Ventrue', 'Lasombra']);
export type ClanName = z.infer<typeof clanName>;
