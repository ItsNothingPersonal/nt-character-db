import { z } from 'zod';

export const sectName = z.enum(['Camarilla', 'Anarch']);
export type SectName = z.infer<typeof sectName>;
