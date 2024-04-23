import { z } from 'zod';

export const xpConfigBody = z.object({
	background: z.number().min(1).max(2),
	skill: z.number().min(1).max(2),
	outOfClanDiscipline: z.number().min(4).max(5),
	technique: z.number().min(12).max(20).optional(),
	inClanElderPower: z.number().min(18).max(18).optional(),
	outOfClanElderPower: z.number().min(24).max(24).max(30).optional()
});

export type XpConfigBody = z.infer<typeof xpConfigBody>;
