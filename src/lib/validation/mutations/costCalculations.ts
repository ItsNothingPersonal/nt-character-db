import { isNullOrUndefined } from '$lib/util';
import type { PlayerCharacter } from '$lib/zod/classic/playerCharacter/playerCharacter';
import { xpChartConfig } from '../config/xpChartConfig';

export function calculateAttributeCosts(
	pc: PlayerCharacter,
	name: string,
	action: 'add' | 'remove',
	refund: boolean = false,
	oldValue: number,
	newValue: number
) {
	const increasedAmount = newValue - oldValue;

	if (action === 'add') {
		pc.experience.push({
			reason: `Attribut ${name} von ${oldValue} auf ${newValue} angehoben`,
			date: new Date(),
			type: 'substract',
			value: increasedAmount * 3
		});
	} else if (refund) {
		pc.experience.push({
			reason: `Attribut ${name} von ${oldValue} auf ${newValue} gesenkt`,
			date: new Date(),
			type: 'add',
			value: Math.abs(increasedAmount) * 3
		});
	}

	return pc;
}

export function calculateInClanDisciplineCosts(
	pc: PlayerCharacter,
	name: string,
	action: 'add' | 'remove',
	refund: boolean = false,
	oldValue: number,
	newValue: number
) {
	let totalCost = 0;

	if (action === 'add') {
		for (let i = oldValue + 1; i <= newValue; i++) {
			totalCost = totalCost + i * 3;
		}
		pc.experience.push({
			reason: `Disciplin ${name} von ${oldValue} auf ${newValue} angehoben`,
			date: new Date(),
			type: 'substract',
			value: totalCost
		});
	} else if (refund) {
		for (let i = oldValue; i > newValue; i--) {
			totalCost = totalCost + i * 3;
		}

		pc.experience.push({
			reason: `Disciplin ${name} von ${oldValue} auf ${newValue} gesenkt`,
			date: new Date(),
			type: 'add',
			value: totalCost
		});
	}

	return pc;
}

export function calculateOutOfClanDisciplineCosts(
	pc: PlayerCharacter,
	name: string,
	action: 'add' | 'remove',
	refund: boolean = false,
	oldValue: number,
	newValue: number
) {
	let totalCost = 0;

	const xpConfig = xpChartConfig.get(pc.generation);
	if (isNullOrUndefined(xpConfig)) {
		console.error(`XP-Config für Generation: ${pc.generation} wurde nicht gefunden!`);
		return pc;
	}

	if (action === 'add') {
		for (let i = oldValue + 1; i <= newValue; i++) {
			totalCost = totalCost + i * xpConfig.outOfClanDiscipline;
		}
		pc.experience.push({
			reason: `Disciplin ${name} von ${oldValue} auf ${newValue} angehoben`,
			date: new Date(),
			type: 'substract',
			value: totalCost
		});
	} else if (refund) {
		for (let i = oldValue; i > newValue; i--) {
			totalCost = totalCost + i * xpConfig.outOfClanDiscipline;
		}

		pc.experience.push({
			reason: `Disciplin ${name} von ${oldValue} auf ${newValue} gesenkt`,
			date: new Date(),
			type: 'add',
			value: totalCost
		});
	}

	return pc;
}

export function calculateMoralityCosts(
	pc: PlayerCharacter,
	name: string,
	action: 'add' | 'remove',
	refund: boolean = false,
	oldValue: number,
	newValue: number
) {
	const xpConfig = xpChartConfig.get(pc.generation);
	if (isNullOrUndefined(xpConfig)) {
		console.error(`XP-Config für Generation: ${pc.generation} wurde nicht gefunden!`);
		return pc;
	}
	const increasedAmount = newValue - oldValue;

	if (action === 'add') {
		pc.experience.push({
			reason: `Morality ${name} von ${oldValue} auf ${newValue} angehoben`,
			date: new Date(),
			type: 'substract',
			value: increasedAmount * 10
		});
	} else if (refund) {
		pc.experience.push({
			reason: `Morality ${name} von ${oldValue} auf ${newValue} gesenkt`,
			date: new Date(),
			type: 'add',
			value: Math.abs(increasedAmount) * 10
		});
	}

	return pc;
}

export function calculateTechniqueCosts(
	pc: PlayerCharacter,
	name: string,
	action: 'add' | 'remove',
	refund: boolean = false
) {
	const xpConfig = xpChartConfig.get(pc.generation);
	if (isNullOrUndefined(xpConfig)) {
		console.error(`XP-Config für Generation: ${pc.generation} wurde nicht gefunden!`);
		return pc;
	}

	if (isNullOrUndefined(xpConfig.technique)) {
		console.error(`Charaktere mit Generation ${pc.generation} können keine Techniken lernen`);
		return pc;
	}

	if (action === 'add') {
		pc.experience.push({
			reason: `Technique ${name} hinzugefügt`,
			date: new Date(),
			type: 'substract',
			value: xpConfig.technique
		});
	} else if (refund) {
		pc.experience.push({
			reason: `Technique ${name} entfernt`,
			date: new Date(),
			type: 'add',
			value: xpConfig.technique
		});
	}

	return pc;
}

export function calculateNecromancyOrThaumaturgyRitualCost(
	pc: PlayerCharacter,
	name: string,
	action: 'add' | 'remove',
	refund: boolean = false,
	ritualLevel: number
) {
	if (action === 'add') {
		pc.experience.push({
			reason: `Ritual ${name} hinzugefügt`,
			date: new Date(),
			type: 'substract',
			value: ritualLevel * 2
		});
	} else if (refund) {
		pc.experience.push({
			reason: `Ritual ${name} entfernt`,
			date: new Date(),
			type: 'add',
			value: ritualLevel * 2
		});
	}

	return pc;
}

export function calculateMeritCost(
	pc: PlayerCharacter,
	name: string,
	action: 'add' | 'remove',
	refund: boolean = false,
	meritCost: number
) {
	if (action === 'add') {
		pc.experience.push({
			reason: `Merit ${name} hinzugefügt`,
			date: new Date(),
			type: 'substract',
			value: meritCost
		});
	} else if (refund) {
		pc.experience.push({
			reason: `Merit ${name} entfernt`,
			date: new Date(),
			type: 'add',
			value: meritCost
		});
	}

	return pc;
}

export function calculateFlawCost(
	pc: PlayerCharacter,
	name: string,
	action: 'add' | 'remove',
	refund: boolean = false,
	flawCost: number
) {
	if (action === 'add') {
		pc.experience.push({
			reason: `Flaw ${name} hinzugefügt`,
			date: new Date(),
			type: 'add',
			value: flawCost
		});
	} else if (refund) {
		pc.experience.push({
			reason: `Flaw ${name} entfernt`,
			date: new Date(),
			type: 'substract',
			value: flawCost
		});
	}

	return pc;
}

export function calculateSkillCost(
	pc: PlayerCharacter,
	name: string,
	action: 'add' | 'remove',
	refund: boolean = false,
	oldValue: number,
	newValue: number
) {
	let totalCost = 0;

	const xpConfig = xpChartConfig.get(pc.generation);
	if (isNullOrUndefined(xpConfig)) {
		console.error(`XP-Config für Generation: ${pc.generation} wurde nicht gefunden!`);
		return pc;
	}

	if (isNullOrUndefined(xpConfig.skill)) {
		console.error(
			`Für Charaktere mit Generation ${pc.generation} wurden keine Skill-Kosten konfiguriert`
		);
		return pc;
	}

	if (action === 'add') {
		for (let i = oldValue + 1; i <= newValue; i++) {
			totalCost = totalCost + i * xpConfig.skill;
		}

		pc.experience.push({
			reason: `Skill ${name} von ${oldValue} auf ${newValue} angehoben`,
			date: new Date(),
			type: 'substract',
			value: totalCost
		});
	} else if (refund) {
		for (let i = oldValue; i > newValue; i--) {
			totalCost = totalCost + i * xpConfig.skill;
		}

		pc.experience.push({
			reason: `Skill ${name} von ${oldValue} auf ${newValue} gesenkt`,
			date: new Date(),
			type: 'add',
			value: totalCost
		});
	}

	return pc;
}

export function calculateBackgroundCost(
	pc: PlayerCharacter,
	name: string,
	action: 'add' | 'remove',
	refund: boolean = false,
	oldValue: number,
	newValue: number
) {
	let totalCost = 0;

	const xpConfig = xpChartConfig.get(pc.generation);
	if (isNullOrUndefined(xpConfig)) {
		console.error(`XP-Config für Generation: ${pc.generation} wurde nicht gefunden!`);
		return pc;
	}

	if (isNullOrUndefined(xpConfig.background)) {
		console.error(
			`Für Charaktere mit Generation ${pc.generation} wurden keine Background-Kosten konfiguriert`
		);
		return pc;
	}

	if (action === 'add') {
		for (let i = oldValue + 1; i <= newValue; i++) {
			totalCost = totalCost + i * xpConfig.background;
		}

		pc.experience.push({
			reason: `Background ${name} von ${oldValue} auf ${newValue} angehoben`,
			date: new Date(),
			type: 'substract',
			value: totalCost
		});
	} else if (refund) {
		for (let i = oldValue; i > newValue; i--) {
			totalCost = totalCost + i * xpConfig.background;
		}

		pc.experience.push({
			reason: `Background ${name} von ${oldValue} auf ${newValue} gesenkt`,
			date: new Date(),
			type: 'add',
			value: totalCost
		});
	}

	return pc;
}
