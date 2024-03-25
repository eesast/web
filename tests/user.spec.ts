import { test, expect, type Page } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000/");
});

const account = {
  username: "xuesheng",
  email: "xuesheng@test.com",
  phone: "19168067312",
  password: "Abc!11111111",
};

async function login(page: Page, user: string, password: string) {
  await page.getByRole("button", { name: "登 录" }).click();
  await page.getByPlaceholder("用户名/邮箱/手机号").fill(user);
  await page.getByPlaceholder("密码").fill(password);
  await page.getByRole("main").getByRole("button", { name: "登 录" }).click();
}

test.describe("Login", () => {
  // test("should login with username", async ({ page }) => {
  //   await login(page, account.username, account.password);
  //   await expect(page.getByRole('heading', { name: '用户信息' })).toBeVisible();
  // });

  test("should login with email", async ({ page }) => {
    await login(page, account.email, account.password);
    await expect(page.getByRole("heading", { name: "用户信息" })).toBeVisible();
  });

  test("should login with phone", async ({ page }) => {
    await login(page, account.phone, account.password);
    await expect(page.getByRole("heading", { name: "用户信息" })).toBeVisible();
  });
});

test.describe("Profile", () => {
  test.beforeEach(async ({ page }) => {
    await login(page, account.email, account.password);
  });

  test("should update department", async ({ page }) => {
    if ((await page.getByRole("rowgroup").innerText()).includes("电子系")) {
      await page
        .getByRole("cell", { name: "电子系 edit" })
        .locator("svg")
        .click();
      await page.getByText("电子系").click();
      await page.getByTitle("计算机系").locator("div").click();
      await page
        .getByRole("row", { name: "院系 : 计算机系 计算机系 check close" })
        .locator("a")
        .first()
        .click();
      await expect(page.locator("#root")).toContainText("计算机系");
    } else {
      await page
        .getByRole("cell", { name: "计算机系 edit" })
        .locator("svg")
        .click();
      await page.getByText("计算机系").click();
      await page.getByTitle("电子系").locator("div").click();
      await page
        .getByRole("row", { name: "院系 : 电子系 电子系 check close" })
        .locator("a")
        .first()
        .click();
      await expect(page.locator("#root")).toContainText("电子系");
    }
  });
});
