import type { MaskConfigSchema } from '$lib/zod/lotn/background/mask';

export const maskConfig: MaskConfigSchema = {
	name: 'Mask',
	description:
		'In the time of the Second Inquisition, getting by in the mortal world and “passing” as human is more important than ever. A Mask is what a vampire “wears” to blend into mortal society. It is the night job he pretends to have, the pen or stage name he gives, etc. The better a Mask is, the better it explains a character’s nocturnal habits and the more opportunities it provides to get close to humans. Many times a Mask involves forged documents; sometimes it involves makeup and solid acting skills. Vampires can have multiple Masks that suit different situations. However, a vampire without any dots in the Mask Mortal Connection cannot pass a background check and is easily flagged when interacting with authorities.\nWhen you purchase dots in Mask, think of a pseudonym and a few short sentences to summarize your fake identity. This could include your profession (and why it’s a night time job), place of birth, education, names of fake relatives, etc. Most Masks are meant to be unremarkable and forgettable; however, some Predator types enjoy a more recognizable Mask, one that hides their true identity under a more famous false identity. A Mask cannot make you someone who already exists. You cannot use a Mask to impersonate another character, player or non-player.\nMask cannot be purchased after character creation unless a character with the Cobbler Merit (page 182) makes them a Mask. Once complete, the receiving character may spend the necessary XP to cement the Mask and apply it to their sheet.\nIn some cases, you may wish to abandon your Mask. Perhaps your Mask was arrested; you had to escape to avoid perishing in the sun, and now that identity is too difficult to maintain. Perhaps you were shot and had to play dead when you were portraying your Mask. In this case, you temporarily lose your Mask dots. You regain your dots in Mask when you find a Cobbler to make you a new one.',
	level1:
		'Your Mask will pass a routine inspection; you have an identity and a disguise that is believable and works well enough without close scrutiny.',
	level2:
		'Your Mask is strong enough to pass a state-level background check or a run through the local police database.',
	level3:
		'Your Mask will pass an intense background check, even a deep investigation from a national government agent.'
};
