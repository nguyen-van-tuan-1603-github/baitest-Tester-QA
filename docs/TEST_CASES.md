# Test Cases

The generated cases are requirement-specific and are displayed by the application after an OpenAI response passes schema validation. The runner currently executes the SauceDemo authentication smoke behavior for each submitted case: positive cases use valid demo credentials and all other types use an invalid password.

Expected coverage in AI-generated suites: positive, negative, boundary, and validation scenarios, with at least 15 distinct cases. Review generated steps and expected results before relying on them; only login smoke behavior is automated today.
