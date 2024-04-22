import { expect, test } from '@playwright/test';
import { getBackButton, getNextButton, getStepHeaderText, navigateToStep } from './utils';

test.describe('step 4', () => {
	test.beforeEach(async ({ page }) => {
		await navigateToStep(page, 1);
		await navigateToStep(page, 2);
		await navigateToStep(page, 3);
		await navigateToStep(page, 4);
	});

	test('page has correct header', async ({ page }) => {
		const headerText = await getStepHeaderText(page);
		expect(headerText).toBe('Step 4: Assign Initial Attributes');
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
		expect(headerText).toBe('Step 3: Choose a Clan');
	});

	test('next button is enabled when attributes and focuses are set', async ({ page }) => {
		await page.click('label:has(input[name=physical-priority-0])');
		await page.click('label:has(input[name=social-priority-2])');
		await page.click('label:has(input[name=mental-priority-1])');

		await page.click('label:has(input[name=physical-focus-0])');
		await page.click('label:has(input[name=social-focus-1])');
		await page.click('label:has(input[name=mental-focus-0])');

		const nextButton5 = getNextButton(page);
		expect(await nextButton5.isEnabled()).toBe(true);
	});
});
