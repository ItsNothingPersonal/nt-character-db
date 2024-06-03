import { z } from 'zod';

export const changeTypeName = z.enum(['add', 'substract']);
export type ChangeTypeName = z.infer<typeof changeTypeName>;
