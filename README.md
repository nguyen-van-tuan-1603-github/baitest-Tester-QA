# TestPilot AI

An AI-assisted QA workspace that turns a user story into a structured test suite, runs browser checks, captures failure evidence, and drafts AI bug reports.

## Problem

QA teams spend time translating prose into test scenarios, repeating browser checks, and collecting enough context to report failures clearly.

## Solution

TestPilot AI connects requirement analysis, test design, browser execution, evidence, and failure analysis in one dashboard. AI responses are JSON and validated before they reach the UI.

## Features

- Generate at least 15 positive, negative, boundary, and validation cases from a requirement.
- Create a scoped test strategy with test types and risks.
- Review cases, steps, priority, expected result, and run status in a responsive dashboard.
- Execute browser checks using Playwright against SauceDemo authentication.
- Save screenshots for failed runs and a JSON execution log under `public/evidence/`.
- Ask AI to draft a structured bug report from failure details.
- Explore the public SauceDemo login page in the browser and suggest smoke scenarios. Browser-only page inspection is intentionally limited to SauceDemo; page content is not sent to the server.

## Architecture

- **Frontend:** Next.js 15 App Router, React, TypeScript, Tailwind CSS, Zustand, and Lucide React.
- **Backend:** Next.js route handlers in `src/app/api`.
- **AI:** OpenAI Chat Completions JSON mode, followed by Zod validation.
- **Automation:** Playwright Chromium launched by the execution route.
- **Evidence:** `public/evidence/` (created at runtime; generated evidence is git-ignored).

## Workflow

1. Enter a user story and generate a strategy plus test cases.
2. Review the generated scenarios and run browser checks.
3. Inspect pass/fail results, console errors, duration, and screenshot evidence.
4. Ask AI to analyze a failed run and review the resulting bug report.

## AI Integration

The generator asks for at least 15 distinct test cases across four categories. The response must match a Zod schema before the dashboard accepts it. The bug analyzer receives a failed case and its actual result and returns title, severity, expected/actual behavior, and a possible cause. API errors and malformed output are returned as readable errors rather than crashing the app.

## Test Automation

SauceDemo (`https://www.saucedemo.com/`) is the selected website. Its public demo account supports repeatable login smoke checks without setting up an application of our own. The current runner maps positive cases to valid login and other case types to invalid-password login; it executes the cases as authentication smoke checks and does **not** translate arbitrary generated steps into browser actions. The suite checks that valid credentials reach inventory and invalid credentials display an error. Each failed run attempts to save a screenshot; every run writes `public/evidence/test-result.json`.

This narrow runner is deliberate: generated natural-language steps are untrusted input and are not evaluated as executable code. A future version should add reviewed, typed action plans for supported flows.

## Test Strategy

The generated strategy covers functional behavior, input validation, negative cases, and boundaries. Authentication risks include credential rejection, invalid input, and failed navigation. The current automation verifies the login smoke flow only.

## Installation

Requirements: Node.js 20 or later and npm.

```bash
npm install
npx playwright install chromium
Copy-Item .env.example .env.local
```

Add an OpenAI API key to `.env.local`:

```dotenv
OPENAI_API_KEY=...
OPENAI_MODEL=gpt-4.1-mini
```

## Running Project

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). AI generation and bug analysis require a valid API key. The browser runner also requires Playwright Chromium to be installed and access to SauceDemo.

## Environment Variables

| Name | Required | Description |
| --- | --- | --- |
| `OPENAI_API_KEY` | Yes for AI features | OpenAI API key, kept server-side. |
| `OPENAI_MODEL` | No | Chat model; defaults to `gpt-4.1-mini`. |

## Verification

```bash
npm run build
```

Playwright is used by the in-app execution flow. The API runner writes result evidence at runtime. The repository's build and browser checks should be run after dependencies and environment are configured.

## Limitations

- The runner checks only SauceDemo login outcomes; arbitrary generated cases are not converted into matching browser behavior.
- At present the runner checks positive versus non-positive login scenarios, so boundary and validation cases are smoke-tested with invalid credentials rather than their exact input conditions.
- AI features require external OpenAI access and incur API usage.
- Website Explorer is browser-only and restricted to SauceDemo.
- Runtime evidence is local to the running server and excluded from Git.

## Future Improvements

- Add typed, reviewed action plans for registration, cart, checkout, and field validation.
- Attach browser traces and separate console/network logs to failure evidence.
- Add persistence, team projects, and export to common test-management tools.
- Expand website exploration with an explicit user-approved allowlist and domain policy.

## Demo Video Flow (under 5 minutes)

- **0:00–0:30:** Introduce the QA workflow problem.
- **0:30–1:30:** Enter a login requirement.
- **1:30–2:30:** Review generated cases and the strategy.
- **2:30–3:30:** Run SauceDemo browser checks.
- **3:30–4:30:** Open a failed result and its screenshot evidence.
- **4:30–5:00:** Generate and review an AI bug report.
