import { expect, test } from '@playwright/test';
import {
	getBackButton,
	getNextButton,
	getStepHeaderText,
	navigateToStep,
	setPrimaryDiscipline
} from './utils';

test.describe('step 7', () => {
	test.beforeEach(async ({ page }) => {
		await navigateToStep(page, 1);
		await navigateToStep(page, 2);
		await navigateToStep(page, 3);
		await navigateToStep(page, 4);
		await navigateToStep(page, 5);
		await navigateToStep(page, 6);
		await navigateToStep(page, 7);
	});

	test('page has correct header', async ({ page }) => {
		const headerText = await getStepHeaderText(page);
		expect(headerText).toBe('Step 7: Assign Initial Disciplines');
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
		expect(headerText).toBe('Step 6: Assign Initial Backgrounds');
	});

	test('next button is enabled when disciplines are set', async ({ page }) => {
		await setPrimaryDiscipline(page);

		const nextButton = getNextButton(page);
		expect(await nextButton.isEnabled()).toBe(true);
	});
});
