import { expect, test } from '@playwright/test';
import { getBackButton, getNextButton, getStepHeaderText, navigateToStep } from './utils';

test.describe('step 3', () => {
	test.beforeEach(async ({ page }) => {
		await navigateToStep(page, 1);
		await navigateToStep(page, 2);
		await navigateToStep(page, 3);
	});

	test('page has correct header', async ({ page }) => {
		const headerText = await getStepHeaderText(page);
		expect(headerText).toBe('Step 3: Choose a Clan');
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
		expect(headerText).toBe('Step 2: Record Initial XP');
	});

	test('nextButton gets enabled when a clan is selected', async ({ page }) => {
		const clanSelect = page.locator('#select-clan');
		await clanSelect.selectOption({ label: 'Brujah' });

		expect(await clanSelect.isEnabled()).toBe(true);
	});
});
