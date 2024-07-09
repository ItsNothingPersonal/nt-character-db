import type { z } from 'zod';
import { createBackgroundConfigSchema } from '../util';

export const contactsConfigSchema = createBackgroundConfigSchema('Contacts');
export type ContactsConfigSchema = z.infer<typeof contactsConfigSchema>;
