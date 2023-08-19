import { z } from 'zod';

export const archetypeName = z.enum(['Leader', 'Protector', 'Loner']);
export type ArchetypeName = z.infer<typeof archetypeName>;
