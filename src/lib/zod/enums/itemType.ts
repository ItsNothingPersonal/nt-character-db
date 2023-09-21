import { z } from 'zod';

export const itemType = z.enum(['melee', 'ranged', 'protective', 'miscellaneous']);
export type ItemType = z.infer<typeof itemType>;
