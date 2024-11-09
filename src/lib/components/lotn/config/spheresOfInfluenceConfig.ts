import { type SpheresOfInfluenceName } from '$lib/zod/lotn/enums/spheresOfInfluenceName';

export const spheresOfInfluenceConfig: Record<
	SpheresOfInfluenceName,
	{ description: string; examples?: string }
> = {
	Church: {
		description:
			'Influencing the Church is dangerous, second only to trying to influence the Federal Government. However, cautious manipulation at the local level can dissuade, distract, and mislead more dangerous members of the broader Church Influence Sphere. Mortals found within this Sphere are members of a broad range of organized religious beliefs, from Judaism to Islam to Catholicism and its many subsects. Other groups, perhaps less well known, may also constitute an organized set of religious beliefs. Contacts and Allies within this Sphere of Influence may not be part of the Second Inquisition, nor can they interact directly with them.',
		examples: 'Ministers, rabbis, bhikkhus, priests, activists, evangelists, and nuns.'
	},
	Finance: {
		description:
			'“Money makes the world go round” is an old adage. Influencing mortals who control the currencies of the world is the next best thing to having stacks of money to spend. Mortals in this Sphere are able to move large quantities of money above and below boards, manage stock investments over centuries and through changes in personnel and identities, bribe officials and even drain bank accounts if requested.',
		examples: 'CEOs, bankers, tellers, stock brokers and loan agents.'
	},
	Health: {
		description:
			'Blood bags do not appear out of nowhere. Not only can the Health field provide restricted pharmaceuticals and quick emergency access, but there is often an ample supply of blood that can be influenced into your possession. This Sphere also covers access to morgues, ambulances, first responders, and even the administration of hospitals and clinics. Health is not limited to the mortal health field, either, as veterinarians, lab researchers, and animal care professionals can provide valuable services as well.',
		examples: 'Doctors, nurses, therapists, lab workers, and pharmacists.'
	},
	'High Society': {
		description:
			'Lifestyles of the rich and the famous—few people really know them, but nearly everyone wants to be like them. People within this Sphere are used to power, money, and the adoration of the masses; they know which ears to whisper names or rumors in, can make or break upcoming media or stars, and even draw attention from otherwise suspicious nightly activities with their presence. Within this Sphere, a skilled character can influence the influencers.',
		examples:
			'Movie stars, rock stars, dilettantes, legacies, trust fund inheritors, and fashion models.'
	},
	Industry: {
		description:
			'Most people know someone in Industry, the blue-collar jobs that keep mortal society from collapsing down on itself. Having influence over such workers is often underrated, but others may see the incredible usefulness of favors from a construction team or a farmer. Useful members of this Sphere may be able to help locate buildings owned by specific people, delay or speed up construction, shut off utilities, and influence the mass production of material goods.',
		examples:
			'Union workers, engineers, construction workers, agriculturists, miners, mechanics, farmers, telecommunications staff, technical support workers, and electricians.'
	},
	Legal: {
		description:
			'Litigation is everywhere among those with the power to get things done. For those who tend to prefer less-than-legal activities, knowing someone inside this Sphere can also keep them out of jail or keep their rivals in. Maybe you know a trial lawyer who’s never lost, the bright-eyed, always optimistic district attorney who is resolute on cleaning up the city, or even the bondsmen who organize bail money; all of these people fall within the Legal Sphere.',
		examples:
			'Lawyers, court reporters, judges, clerks, district attorneys, bailiffs, and bail bondsmen.'
	},
	Media: {
		description:
			'Need a story to make headlines? What about squashing something that is sure to make the front page? Navigators in the labyrinthian mazes of news outlets, magazines, and radio, people belonging to this Sphere can do all that and more. They can get press passes allowing access to the most secure events or situations, publish or redact just the right (or wrong) photos, and ensure the public knows everything–or nothing.',
		examples:
			'Reporters, photographers, disc jockeys, station directors, bloggers, and internet streamers.'
	},
	Occult: {
		description:
			'It is wise for any supernatural creature to keep themselves up to speed on the occult goings-on in their area. Whilesome may not know of supernatural creatures’ existence specifically, people in the Occult Sphere form a group of mystics, spiritualists, and devotees who often adhere to non-traditional beliefs and may pursue what they believe to be magic. Along with having information on “conspiracies” such as werewolves nearby, mortal occultists and conspiracy theorists would likely be among the first to notice Masquerade breaches that other, less open-minded groups might dismiss.',
		examples:
			'Occultists, treasure hunters, conspiracy theorists, alternative religion charlatans, and doomsday preppers.'
	},
	Police: {
		description:
			'Not much happens on the street that the Police do not know about. Will they do anything with what they learn? That answer depends on who happens to come across it first and, sometimes, on whom they owe a favor. Knowing someone in law enforcement may give access to evidence, crime insight, or simple confidence that the cops will not interrupt a feeding session',
		examples:
			'Beat cops, SWAT operators, homicide detectives, police department administrators, and dispatchers.'
	},
	Politics: {
		description:
			'For those who want to shape the city, having a Contact in Politics is ideal. People who are trying to make, change, and enact policy belong primarily to this Sphere regardless of the changes they are trying to enact. Your Contacts include bureaucrats drowning in red tape, polling place coordinators, activists, and local politicians alike.',
		examples: 'Pollsters, activists, lobbyists, candidates, and incumbent politicians.'
	},
	'Service Industry': {
		description:
			'The often-overlooked workers in the Service Industry tend to know far more about things happening on the front lines of the mortal world than any high-level corporate bigwigs. Hotel desk staff can locate patrons or make their stays fly under the radar, waitstaff can pick up the juiciest bits of conversation, and anyone who handles money transactions could pick up credit card numbers or a little extra cash on the side.',
		examples:
			'Bartenders, hotel employees, waiters, dishwashers, chefs, delivery drivers, bouncers, janitors, and security guards.'
	},
	Street: {
		description:
			'The society of the Street is just as difficult to navigate as any other, and it’s always best to have a guide. Mortals who fall into this Sphere call the streets their home. They know how to get around unnoticed, survive when the world is out to get them, and pick the best potential targets for the next hustle. If someone needs to disappear, or be impossible to ignore, they know how and when to make those things happen.',
		examples:
			'Unorganized petty thugs, homeless, townies, street vendors, street performers, and sex workers.'
	},
	Transportation: {
		description:
			'Travel can become a necessary part of life, and knowing who and what is moving where can be incredibly useful. Wth the Second Inquisition on the rise, safe travel can be a challenge. Mortals operating within this Sphere range from everyday cab drivers to dispatchers, truckers, pilots, and more. Need a fake flight plan? How about altering cargo manifests? These are the mortals for the job.',
		examples:
			'Cab drivers, pilots, transportation dispatchers, couriers, truckers, travel agents, toll booth employees, and sea captains.'
	},
	Underworld: {
		description:
			'Beneath the surface of every law-ridden society is a seedy collection of individuals seeking to profit from breaking those laws. From trafficking to embezzlement, forgery and petty theft to assassination, if a task needs to be accomplished under the table, these are the mortals who can get it done. All for a price, of course.',
		examples: 'Organized crime groups, hitmen, black market traders, gangs, and drug traffickers.'
	},
	University: {
		description:
			'The leaders of tomorrow are often the students of today. Any paid or volunteer mortal who focuses the majority of their day on education and research belongs to the University Sphere of Influence. These educators, students, and administrators can change curriculums, arrange fundraisers, and influence the expenditure of grant money, as well as being able to shut down campuses, clog streets with partying college kids, and fix scores in sports games.',
		examples:
			'Teachers, college professors, researchers, translators, deans, scientists, and students.'
	},
	'The Federal Government': {
		description:
			'There is a 16th Sphere of Influence: the Federal Government. With the rise of the Second Inquisition, influencing the Federal Government is extremely dangerous. We do not recommend allowing players to purchase Contacts and Allies within the Federal Government Sphere of Influence. Storytellers, however, should include them in their Relationship Map.'
	}
};
