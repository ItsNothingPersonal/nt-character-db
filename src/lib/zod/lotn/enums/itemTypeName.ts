import { z } from 'zod';

export const itemTypeName = z.enum(['melee', 'ranged', 'protective', 'miscellaneous']);
export type ItemTypeName = z.infer<typeof itemTypeName>;
