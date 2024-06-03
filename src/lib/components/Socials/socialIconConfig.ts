export const socialIconConfig: SocialIconConfig = {
	discord: {
		icon: 'ic:baseline-discord',
		href: 'https://discord.gg/gWM7Yjnser'
	},
	facebook: {
		icon: 'mdi:facebook',
		href: 'https://www.facebook.com/naechtlichestheater'
	},
	instagram: {
		icon: 'mdi:instagram',
		href: 'https://www.instagram.com/naechtlichestheater/'
	},
	email: {
		icon: 'mdi:email'
	}
};

type SocialIconConfig = {
	[key in SocialMedia]: { icon: string; href?: string };
};

export type SocialMedia = 'discord' | 'facebook' | 'instagram' | 'email';
