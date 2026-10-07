import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/register");
  await page.getByRole("button").click();
});

test("Test links between registration and login page", async ({
  page,
  baseURL,
}) => {
  await page.getByRole("link", { name: "Cancel" }).click();
  await expect(page).toHaveURL(`${baseURL}/login`);
  await page.screenshot({ path: "test-results/screenshots/cancel.png" });

  await page.getByRole("link", { name: "Register" }).click();
  await expect(page).toHaveURL(`${baseURL}/register`);
  await page.screenshot({ path: "test-results/screenshots/register.png" });
});

test("Test form feedback", async ({ page }) => {
  await page.getByRole("button", { name: "Register" }).click();
  await expect(page.locator("div.invalid-feedback")).toHaveCount(4);
  await page.screenshot({ path: "test-results/screenshots/form-feedback.png" });
});

test("Create an user and login", async ({ page }) => {
  await page.locator('input[formcontrolname="firstName"]').fill("Monitor");
  await page.locator('input[formcontrolname="lastName"]').fill("Pruebas");
  await page.locator('input[formcontrolname="username"]').fill("pruebas");
  await page.locator('input[formcontrolname="password"]').fill("MISO4208");

  await page.getByRole("button", { name: "Register" }).click();

  await page.screenshot({
    path: "test-results/screenshots/success-feedback.png",
  });
  await expect(page.locator("div.alert.alert-success").first()).toBeVisible();
  await page.locator('input[formcontrolname="username"]').fill("pruebas");
  await page.locator('input[formcontrolname="password"]').fill("MISO4208");
  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.getByRole("heading", { name: "Hi Monitor!" })).toBeVisible();
});
