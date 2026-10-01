# Test Strategy

## Scope

Authentication smoke checks for SauceDemo.

## Testing Types

- Functional: successful authentication reaches inventory.
- Negative: wrong password produces a visible login error.
- Validation and boundary: represented in AI-generated plans; not yet mapped to browser inputs.

## Risks

- Credentials or application behavior may change on the external demo site.
- Network availability affects browser execution.
- Generated natural-language steps are not executable actions in the current runner.

## Evidence

Failed browser checks attempt a screenshot in `public/evidence/`; all run summaries are written to `public/evidence/test-result.json`.
