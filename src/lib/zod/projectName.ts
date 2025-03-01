import { z } from 'zod';

export const projectName = z.enum(['Protektorat', 'Anarchen']);
export type ProjectName = z.infer<typeof projectName>;
