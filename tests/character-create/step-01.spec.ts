import { expect, test } from '@playwright/test';
import { getBackButton, getNextButton, getStepHeaderText, navigateToStep } from './utils';

test.describe('step 1', () => {
	test.beforeEach(async ({ page }) => {
		await navigateToStep(page, 1);
	});
	test('page has correct header', async ({ page }) => {
		const headerText = await getStepHeaderText(page);
		expect(headerText).toBe('Step 1: Inspiration');
	});

	test('both buttons are initially disabled', async ({ page }) => {
		const nextButton = getNextButton(page);
		const backButton = getBackButton(page);

		expect(await nextButton.isDisabled()).toBe(true);
		expect(await backButton.isDisabled()).toBe(true);
	});

	test('next button gets enabled if a name was entered', async ({ page }) => {
		await page.locator('#name').fill('test');

		const nextButton = getNextButton(page);
		const backButton = getBackButton(page);

		expect(await nextButton.isEnabled()).toBe(true);
		expect(await backButton.isDisabled()).toBe(true);
	});
});
