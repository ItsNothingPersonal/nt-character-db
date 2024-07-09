import type { FamiliarConfigSchema } from '$lib/zod/lotn/background/familiar';

export const familiarConfig: FamiliarConfigSchema = {
	name: 'Familiar',
	description:
		'You have attracted and made a ghoul of an animal that assists you. You might control it using Animalism or simply good, old-fashioned training. Instead of the variable traits for animals listed in Chapter 10, refer to the statistics below for your Familiar.\nYou may purchase a higher-level companion of a smaller size if you wish. For example, if you want a particularly dangerous dog, you may purchase a level-three dog. When you pick an animal companion, choose Celerity, Potence, or Fortitude. Your Familiar has both level-one powers of that Discipline. A Familiar can never gain more than these two powers. For more information on Ghouls, see page 116.',
	level1:
		'The animal is small, like a bird or cat. It has two Health levels, Physical test pools of three, and Mental and Social test pools of one.',
	level2:
		'The animal is medium-sized, like a dog or a wolf. It has four Health levels, Physical test pools of five, and Mental and Social test pools of one.',
	level3:
		'The animal is large, like a bear or tiger. It has six Health levels, Physical test pools of seven, and Mental and Social test pools of one.'
};
