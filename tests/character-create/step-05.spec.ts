import { expect, test } from '@playwright/test';
import {
	clickAddSkillButton,
	getBackButton,
	getNextButton,
	getStepHeaderText,
	navigateToStep,
	setSkill
} from './utils';

test.describe('step 5', () => {
	test.beforeEach(async ({ page }) => {
		await navigateToStep(page, 1);
		await navigateToStep(page, 2);
		await navigateToStep(page, 3);
		await navigateToStep(page, 4);
		await navigateToStep(page, 5);
	});

	test('page has correct header', async ({ page }) => {
		const headerText = await getStepHeaderText(page);
		expect(headerText).toBe('Step 5: Assign Initial Skills');
	});

	test('next button is initially disabled', async ({ page }) => {
		const nextButton = getNextButton(page);
		const backButton = getBackButton(page);

		expect(await nextButton.isDisabled()).toBe(true);
		expect(await backButton.isEnabled()).toBe(true);
	});

	test('navigation one step back works', async ({ page }) => {
		await getBackButton(page).click();

		const headerText = await getStepHeaderText(page);
		expect(headerText).toBe('Step 4: Assign Initial Attributes');
	});

	test('next button is enabled when skills are set', async ({ page }) => {
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

		const nextButton = getNextButton(page);
		expect(await nextButton.isEnabled()).toBe(true);
	});
});
