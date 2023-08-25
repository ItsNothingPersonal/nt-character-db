import { z } from 'zod';

export const itemType = z.enum(['melee', 'ranged', 'miscellaneous']);
export type ItemType = z.infer<typeof itemType>;
