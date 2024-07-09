import type { ResourcesConfigSchema } from '$lib/zod/lotn/background/resources';

export const resourcesConfig: ResourcesConfigSchema = {
	name: 'Resources',
	description:
		'Money cannot buy happiness, but it can buy comfort, equipment, and help. With no dots in Resources, you’re in the lower-middle class: able to afford minor luxuries like a small apartment and a car that consistently sputters to life, with about $300 per month that is not budgeted towards rent or necessities. By purchasing dots of Resources, you’ve learned that money really does make the world go around. You may use Resources in game or during Downtime Actions—to purchase weapons, commission armor, rent a hotel on a trip, pay a security detail to pretend you never crossed their paths, bribe politicians . . . The more you have, the more you can do. You may not buy the Resources Mortal Connection more than once. Each level of Resources provides an amount of disposable income available to you each month. Each month your disposable income resets; it cannot be “banked” and accumulated from month to month. However, you may pool Resources with other characters or pay for things that cost more than your Resources allotment of money by spending on a month-to-month basis.',
	level1:
		'You are comfortably in the middle class. You can afford a decent house or apartment, pay for a nice car, and consistently count on $2,500 in disposable income monthly.',
	level2:
		'You are in the upper class, with a fancy new car and a large suburban home or an upscale condo in the heart of the city. You have $20,000 each month for disposable income.',
	level3:
		'You are rich. You probably live in an elaborate mansion or a penthouse atop one of the city’s most desirable buildings, and you can afford multiple luxury cars and other finery. Each month, you have $100,000 in disposable income.',
	advantages: {
		'Cash Money': {
			name: 'Cash Money',
			description:
				'You are incredibly skilled at making quick cash. Whether or not the source of the money is legal isn’t the question. It is there, and it is ready to spend when you need to line some pockets for your desired outcome.',
			level1:
				'Once per game session, you can spend 15 minutes out of play and obtain $1,000 in disposable cash per dot of your Streetwise Skill. This money is untraceable.',
			level2:
				'You can spend 15 minutes out of play and obtain $3,000 in disposable cash per dot of your Streetwise Skill. This money is untraceable. This is not cumulative with Level 1.'
		},
		Cryptocurrency: {
			name: 'Cryptocurrency',
			level1:
				'Your disposable money is all in carefully-secured Cryptocurrency. Anyone trying to track your monthly expenditures must have two dots of both the Finance and Technology Skills, and they must succeed in an opposed test of Finance + Technology vs. your Intelligence + Finance.'
		},
		Liquidity: {
			name: 'Liquidity',
			level1:
				'Your money is in antiques, precious metals, or other goods that can be sold on short notice for a good amount of money. For one month, you may double the amount of disposable cash you have available to spend. However, you will not have access to any disposable cash for the next two months as you rebuild your stock.'
		},
		'Wall Street Wizard': {
			name: 'Wall Street Wizard',
			description:
				'You are incredibly skilled at playing the Stock Market. Whether this talent is from legitimate skill or insider trading, the money piles up ready to be spent. The purchase of any level of this Advantage requires Resources 3.',
			level1:
				'You gain an extra $50,000 in disposable cash per dot of your Finance Skill each month.',
			level2:
				'You gain an extra $100,000 in disposable cash per dot of your Finance skill each month. This is not cumulative with Level 1.'
		}
	}
};
