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
  await page.screenshot({ path: "test-results/scheenshots/cancel.png" });
  expect(page.url()).toEqual(`${baseURL}/login`);

  await page.getByRole("link", { name: "Register" }).click();
  await page.screenshot({ path: "test-results/scheenshots/register.png" });
  expect(page.url()).toEqual(`${baseURL}/register`);
});

test("Test form feedback", async ({ page }) => {
  await page.getByRole("button", { name: "Register" }).click();
  await page.screenshot({ path: "test-results/scheenshots/form-feedback.png" });
  const feedback = await page.locator("div.invalid-feedback").all();
  expect(feedback.length).toEqual(4);
});

test("Create an user and login", async ({ page }) => {
  await page.locator('input[formcontrolname="firstName"]').fill("Monitor");
  await page.locator('input[formcontrolname="lastName"]').fill("Pruebas");
  await page.locator('input[formcontrolname="username"]').fill("pruebas");
  await page.locator('input[formcontrolname="password"]').fill("MISO4208");

  await page.getByRole("button", { name: "Register" }).click();

  await page.screenshot({
    path: "test-results/scheenshots/success-feedback.png",
  });
  await page.locator("div.alert.alert-success").first().isVisible();
  await page.locator('input[formcontrolname="username"]').fill("pruebas");
  await page.locator('input[formcontrolname="password"]').fill("MISO4208");
  await page.getByRole("button", { name: "Login" }).click();

  await page.getByRole("heading", { name: "Hi Monitor!" }).isVisible();
});
