export type CaseType = "positive" | "negative" | "boundary" | "validation";
export type Priority = "high" | "medium" | "low";
export type TestCase = { id: string; title: string; type: CaseType; priority: Priority; steps: string[]; expectedResult: string };
export type TestResult = { id: string; status: "passed" | "failed"; durationMs: number; actualResult: string; consoleErrors: string[]; screenshot?: string; error?: string };
export type BugReport = { title: string; severity: Priority; testCase: string; expected: string; actual: string; possibleCause: string };
