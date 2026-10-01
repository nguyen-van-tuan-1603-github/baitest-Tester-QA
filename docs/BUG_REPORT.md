# Bug Report Format

The AI bug analyzer returns a validated JSON object with:

- `title`
- `severity` (`high`, `medium`, or `low`)
- `testCase`
- `expected`
- `actual`
- `possibleCause`

The possible cause is a hypothesis based on the supplied test and evidence, not a confirmed root cause.
