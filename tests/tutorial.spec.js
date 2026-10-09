import { test, expect } from "@playwright/test";
import abp from "../abp.cjs";

// Example on an external demo (not the application under test): registration and login with the
// administrator credentials of the repository's .env.
const DEMO_URL = "https://angular-6-registration-login-example.stackblitz.io";
const [firstName, ...lastName] = abp.ABP_ADMIN_NAME.split(" ");
const username = abp.ABP_ADMIN_EMAIL;
const password = abp.ABP_ADMIN_PASSWORD;

test.beforeEach(async ({ page }) => {
  await page.goto(`${DEMO_URL}/register`);
  await page.getByRole("button").click();
});

test("Test links between registration and login page", async ({ page }) => {
  await page.getByRole("link", { name: "Cancel" }).click();
  await expect(page).toHaveURL(`${DEMO_URL}/login`);
  await page.screenshot({ path: "test-results/screenshots/cancel.png" });

  await page.getByRole("link", { name: "Register" }).click();
  await expect(page).toHaveURL(`${DEMO_URL}/register`);
  await page.screenshot({ path: "test-results/screenshots/register.png" });
});

test("Test form feedback", async ({ page }) => {
  await page.getByRole("button", { name: "Register" }).click();
  await expect(page.locator("div.invalid-feedback")).toHaveCount(4);
  await page.screenshot({ path: "test-results/screenshots/form-feedback.png" });
});

test("Create an user and login", async ({ page }) => {
  await page.locator('input[formcontrolname="firstName"]').fill(firstName);
  await page.locator('input[formcontrolname="lastName"]').fill(lastName.join(" "));
  await page.locator('input[formcontrolname="username"]').fill(username);
  await page.locator('input[formcontrolname="password"]').fill(password);

  await page.getByRole("button", { name: "Register" }).click();

  await page.screenshot({
    path: "test-results/screenshots/success-feedback.png",
  });
  await expect(page.locator("div.alert.alert-success").first()).toBeVisible();
  await page.locator('input[formcontrolname="username"]').fill(username);
  await page.locator('input[formcontrolname="password"]').fill(password);
  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByRole("heading", { name: `Hi ${firstName}!` })).toBeVisible();
});
