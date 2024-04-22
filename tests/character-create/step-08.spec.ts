import { expect, test } from '@playwright/test';
import { getBackButton, getNextButton, getStepHeaderText, navigateToStep } from './utils';

test.describe('step 8', () => {
	test.beforeEach(async ({ page }) => {
		await navigateToStep(page, 1);
		await navigateToStep(page, 2);
		await navigateToStep(page, 3);
		await navigateToStep(page, 4);
		await navigateToStep(page, 5);
		await navigateToStep(page, 6);
		await navigateToStep(page, 7);
		await navigateToStep(page, 8);
	});

	test('page has correct header', async ({ page }) => {
		const headerText = await getStepHeaderText(page);
		expect(headerText).toBe('Step 8: Choose Merits and Flaws');
	});

	test('next button is initially enabled', async ({ page }) => {
		const nextButton = getNextButton(page);
		const backButton = getBackButton(page);

		expect(await nextButton.isEnabled()).toBe(true);
		expect(await backButton.isEnabled()).toBe(true);
	});

	test('navigation one step back works', async ({ page }) => {
		await getBackButton(page).click();

		const headerText = await getStepHeaderText(page);
		expect(headerText).toBe('Step 7: Assign Initial Disciplines');
	});

	test('choosing a merit subtracts from the maximum total points', async ({ page }) => {
		const maxPoints = page.locator('#maxMerits');

		expect(await maxPoints.innerText()).toBe('7');

		await page.locator('#select-merit').selectOption({ label: 'Burning Wrath' });
		await page.click('#add-merit');

		expect(await maxPoints.innerText()).toBe('5');
	});

	test('removing a merit adds to the maximum total points', async ({ page }) => {
		const maxPoints = page.locator('#maxMerits');

		await page.locator('#select-merit').selectOption({ label: 'Burning Wrath' });
		await page.click('#add-merit');

		expect(await maxPoints.innerText()).toBe('5');

		await page.click('#remove-merit');

		expect(await maxPoints.innerText()).toBe('7');
	});

	test('choosing a flaw subtracts from the maximum total points', async ({ page }) => {
		const maxPoints = page.locator('#maxFlaws');

		expect(await maxPoints.innerText()).toBe('7');

		await page.locator('#select-flaw').selectOption({ label: 'Uncontrollable' });
		await page.click('#add-flaw');

		expect(await maxPoints.innerText()).toBe('4');
	});

	test('removing a flaw adds to the maximum total points', async ({ page }) => {
		const maxPoints = page.locator('#maxFlaws');

		await page.locator('#select-flaw').selectOption({ label: 'Uncontrollable' });
		await page.click('#add-flaw');

		expect(await maxPoints.innerText()).toBe('4');

		await page.click('#remove-flaw');

		expect(await maxPoints.innerText()).toBe('7');
	});
});
