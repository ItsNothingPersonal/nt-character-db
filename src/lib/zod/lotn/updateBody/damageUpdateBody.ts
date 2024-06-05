import type { z } from 'zod';
import { damageTypeName } from '../enums/damageTypeName';
import { numberUpdateBody } from './numberUpdateBody';

export const damageUpdateBody = numberUpdateBody.extend({ damageType: damageTypeName });

export type DamageUpdateBody = z.infer<typeof damageUpdateBody>;
