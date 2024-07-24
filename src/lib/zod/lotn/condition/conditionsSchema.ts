import { z } from 'zod';
import { conditionName } from '../enums/conditionName';

export const conditionConfigSchema = z.map(conditionName, z.string());
export type ConditionConfigSchema = z.infer<typeof conditionConfigSchema>;
