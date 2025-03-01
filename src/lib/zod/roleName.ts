import { z } from 'zod';

export const roleName = z.enum(['User', 'Storyteller Protektorat', 'Storyteller Anarchen']);
export type RoleName = z.infer<typeof roleName>;
