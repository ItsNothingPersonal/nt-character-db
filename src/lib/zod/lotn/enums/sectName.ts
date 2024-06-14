import { z } from 'zod';

export const sectName = z.enum(['Camarilla', 'Anarchs']);
export type SectName = z.infer<typeof sectName>;
