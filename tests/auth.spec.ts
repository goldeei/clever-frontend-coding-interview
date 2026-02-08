import { expect, test } from "@playwright/test";

const BASE_URL = "http://localhost:3000";

test.describe("Authentication Flow", () => {
	test("should redirect unauthenticated users from protected routes to sign-in", async ({
		page,
	}) => {
		// Try to access the protected /all-photos page directly
		await page.goto(`${BASE_URL}/all-photos`);

		// Should be redirected to /sign-in by the proxy
		await expect(page).toHaveURL(`${BASE_URL}/sign-in`);
	});

	test("should allow users to sign in with valid credentials", async ({
		page,
	}) => {
		// Start at sign-in page
		await page.goto(`${BASE_URL}/sign-in`);

		// Fill in the form with valid credentials (from .env.local)
		await page.fill('input[name="username"]', "user@example.com");
		await page.fill('input[name="password"]', "testpass123");

		// Submit the form
		await page.click('button[type="submit"]');

		// Should be redirected to /all-photos after successful login
		await expect(page).toHaveURL(`${BASE_URL}/all-photos`);

		// Verify we can actually see content on the page (not just redirected)
		await expect(page.getByText("All Photos")).toBeVisible();
	});

	test("should show error message with invalid credentials", async ({
		page,
	}) => {
		await page.goto(`${BASE_URL}/sign-in`);

		// Try to sign in with wrong credentials
		await page.fill('input[name="username"]', "wrong@test.com");
		await page.fill('input[name="password"]', "wrongpassword");
		await page.click('button[type="submit"]');

		// Should stay on sign-in page
		await expect(page).toHaveURL(`${BASE_URL}/sign-in`);

		// Should show error message
		await expect(page.getByText("Invalid username")).toBeVisible();
	});

	test("should maintain authentication after page refresh", async ({
		page,
	}) => {
		await page.goto(`${BASE_URL}/sign-in`);
		await page.fill('input[name="username"]', "user@example.com");
		await page.fill('input[name="password"]', "testpass123");
		await page.click('button[type="submit"]');
		await expect(page).toHaveURL(`${BASE_URL}/all-photos`);

		// Refresh the page
		await page.reload();

		// Should still be on /all-photos (not redirected to sign-in)
		await expect(page).toHaveURL(`${BASE_URL}/all-photos`);
		await expect(page.getByText("All Photos")).toBeVisible();
	});

	test("should redirect authenticated users away from sign-in page", async ({
		page,
	}) => {
		await page.goto(`${BASE_URL}/sign-in`);
		await page.fill('input[name="username"]', "user@example.com");
		await page.fill('input[name="password"]', "testpass123");
		await page.click('button[type="submit"]');
		await expect(page).toHaveURL(`${BASE_URL}/all-photos`);

		// Try to navigate back to sign-in
		await page.goto(`${BASE_URL}/sign-in`);

		// Should be immediately redirected back to /all-photos
		await expect(page).toHaveURL(`${BASE_URL}/all-photos`);
	});
});
