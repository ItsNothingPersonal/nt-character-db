import { z } from 'zod';
import { clanName } from './lotn/enums/clanName';
import { projectName } from './projectName';

const projectDefinition = z.record(
	projectName,
	z.object({
		name: projectName,
		projectLead: z.string(),
		storytellers: z.string().array(),
		defaultClans: clanName.array(),
		startExp: z.number(),
		description: z.string().array(),
		tenets: z.object({ title: z.string(), description: z.string(), icon: z.string() }).array()
	})
);

export type ProjectDefinition = z.infer<typeof projectDefinition>;
