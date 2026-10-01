# AI Worklog

## AI Tools Used

- OpenAI API (runtime feature, when configured)
- Codex (implementation assistance)

## How AI Helped

The runtime generator is instructed to produce positive, negative, boundary, and validation cases plus a test strategy. A separate prompt analyzes failed browser evidence into a bug report. Zod validation checks both response shapes.

## Incorrect AI Outputs

No runtime AI output has been observed in this workspace yet; an API key has not been supplied during implementation. No incorrect AI responses are claimed here.

## How I Improved Them

The API rejects empty requirements, requests JSON mode, validates the response schema and the 15-case minimum, and surfaces errors in the dashboard. Runtime behavior still needs review with a configured API key.

## Verification Process

The generator and bug endpoints validate request input and response structure. The Playwright execution endpoint uses SauceDemo login selectors and checks the inventory page for valid credentials and the error banner for invalid credentials. Build verification is documented in README; report actual results after running it in the development environment.

## What I Would Improve With 7 More Days

- Introduce typed browser actions so generated tests can map to supported UI interactions safely.
- Add the SauceDemo cart and checkout flow and matching test coverage.
- Persist runs, attach traces, and export bug reports.
- Validate prompts and AI outputs against a broader set of real requirements.
