import { z } from 'zod';
import { damageTypeName } from '../enums/damageTypeName';
import { numberCalculationType } from '../enums/numberCalculationType';
import { numberUpdateBody } from './numberUpdateBody';

export const damageUpdateBody = numberUpdateBody.extend({
	damageType: damageTypeName,
	type: numberCalculationType
});

export type DamageUpdateBody = z.infer<typeof damageUpdateBody>;
