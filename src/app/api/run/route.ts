import { NextResponse } from "next/server";
import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";
import { testCaseSchema } from "@/lib/schemas";
export const maxDuration = 120;
export async function POST(request: Request) {
  let browser: Awaited<ReturnType<typeof chromium.launch>> | undefined;
  try {
    const body: unknown = await request.json();
    if (typeof body !== "object" || body === null || !("testCases" in body) || !Array.isArray(body.testCases) || body.testCases.length === 0 || body.testCases.length > 30) return NextResponse.json({ error: "Provide between 1 and 30 valid test cases." }, { status: 400 });
    const cases = body.testCases.map((testCase, index) => ({ ...testCaseSchema.parse(testCase), id: `TC${String(index + 1).padStart(3, "0")}` }));
    const evidenceDir = path.join(process.cwd(), "public", "evidence"); await mkdir(evidenceDir, { recursive: true });
    browser = await chromium.launch({ headless: true });
    const results = [];
    for (const testCase of cases) {
      const started = Date.now(); const page = await browser.newPage(); const consoleErrors: string[] = [];
      page.on("pageerror", error => consoleErrors.push(error.message));
      page.on("console", message => { if (message.type() === "error") consoleErrors.push(message.text()); });
      let status: "passed" | "failed" = "failed"; let actualResult = ""; let error: string | undefined; let screenshot: string | undefined;
      try {
        await page.goto("https://www.saucedemo.com/", { waitUntil: "domcontentloaded", timeout: 20000 });
        const isPositive = testCase.type === "positive";
        await page.getByPlaceholder("Username").fill(isPositive ? "standard_user" : "standard_user");
        await page.getByPlaceholder("Password").fill(isPositive ? "secret_sauce" : "invalid_password");
        await page.getByRole("button", { name: "Login" }).click();
        if (isPositive) { await page.locator(".inventory_list").waitFor({ timeout: 8000 }); status = "passed"; actualResult = "Inventory page loaded after login."; }
        else { await page.locator("[data-test='error']").waitFor({ timeout: 8000 }); status = "passed"; actualResult = "Login form displayed an error for invalid credentials."; }
      } catch (cause) { error = cause instanceof Error ? cause.message : "Browser execution failed."; actualResult = error; const filename = `${testCase.id}-${randomUUID()}.png`; try { await page.screenshot({ path: path.join(evidenceDir, filename), fullPage: true }); screenshot = `/evidence/${filename}`; } catch { /* Browser closed or screenshot unavailable. */ } }
      results.push({ id: testCase.id, status, durationMs: Date.now() - started, actualResult, consoleErrors, error, screenshot }); await page.close();
    }
    await writeFile(path.join(evidenceDir, "test-result.json"), JSON.stringify({ executedAt: new Date().toISOString(), target: "https://www.saucedemo.com/", results }, null, 2));
    return NextResponse.json({ total: results.length, passed: results.filter(result => result.status === "passed").length, failed: results.filter(result => result.status === "failed").length, results });
  } catch (error) { const message = error instanceof Error ? error.message : "Test execution failed."; return NextResponse.json({ error: message }, { status: 500 }); }
  finally { await browser?.close().catch(() => undefined); }
}
