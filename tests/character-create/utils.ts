import type { BackgroundName } from '$lib/zod/enums/backgroundName';
import type { SkillName } from '$lib/zod/enums/skillName';
import type { Page } from '@playwright/test';

export function getNextButton(page: Page) {
	return page.locator('button:has-text("Next →")');
}

export function getBackButton(page: Page) {
	return page.locator('button:has-text("← Back")');
}

export function getStepHeaderText(page: Page) {
	return page.innerText('.step-header');
}

export async function navigateToStep(page: Page, step: number) {
	switch (step) {
		case 1:
			await page.goto('/sheet/create');
			break;
		case 2: {
			const nameInput = page.locator('#name');
			await nameInput.fill('test');
			break;
		}
		case 3: {
			break;
		}
		case 4: {
			await page.locator('#select-clan').first().selectOption({ label: 'Brujah' });
			break;
		}
		case 5: {
			await page.click('label:has(input[name=physical-priority-0])');
			await page.click('label:has(input[name=social-priority-2])');
			await page.click('label:has(input[name=mental-priority-1])');

			await page.click('label:has(input[name=physical-focus-0])');
			await page.click('label:has(input[name=social-focus-1])');
			await page.click('label:has(input[name=mental-focus-0])');
			break;
		}
		case 6: {
			await setSkill(page, 'Academics');
			await clickAddSkillButton(page);

			await setSkill(page, 'Animal Ken');
			await clickAddSkillButton(page);

			await setSkill(page, 'Athletics');
			await clickAddSkillButton(page);

			await setSkill(page, 'Awareness');
			await clickAddSkillButton(page);

			await setSkill(page, 'Brawl');
			await clickAddSkillButton(page);

			await setSkill(page, 'Computers');
			await clickAddSkillButton(page);

			await setSkill(page, 'Crafts');
			await clickAddSkillButton(page);

			await setSkill(page, 'Dodge');
			await clickAddSkillButton(page);

			await setSkill(page, 'Drive');
			await clickAddSkillButton(page);

			await setSkill(page, 'Empathy');
			await clickAddSkillButton(page);
			break;
		}
		case 7: {
			await setBackground(page, 'Contacts');
			await clickAddBackgroundButton(page);

			await setBackground(page, 'Generation');
			await clickAddBackgroundButton(page);

			await setBackground(page, 'Resources');
			await clickAddBackgroundButton(page);
			break;
		}
		case 8: {
			await setPrimaryDiscipline(page);
		}
	}

	if (step !== 1) {
		await page.click('button:has-text("Next →")');
	}
}

export async function setSkill(page: Page, name: SkillName) {
	await page.locator('#select-skill').selectOption({ label: name });
}

export async function clickAddSkillButton(page: Page) {
	await page.click('button:has-text("Add Skill")');
}

export async function setBackground(page: Page, name: BackgroundName) {
	await page.locator('#select-background').selectOption({ label: name });
}

export async function clickAddBackgroundButton(page: Page) {
	await page.click('button:has-text("Add Background")');
}

export async function setPrimaryDiscipline(page: Page) {
	await page.click('label:has(input[name=primary-discipline-1])');
}
