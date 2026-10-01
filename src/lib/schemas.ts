import { z } from "zod";
export const testCaseSchema = z.object({ id: z.string(), title: z.string(), type: z.enum(["positive", "negative", "boundary", "validation"]), priority: z.enum(["high", "medium", "low"]), steps: z.array(z.string()).min(1), expectedResult: z.string() });
export const generatedSchema = z.object({ testCases: z.array(testCaseSchema).min(15), strategy: z.object({ scope: z.string(), testingTypes: z.array(z.string()), risks: z.array(z.string()) }) });
export const bugSchema = z.object({ title: z.string(), severity: z.enum(["high", "medium", "low"]), testCase: z.string(), expected: z.string(), actual: z.string(), possibleCause: z.string() });
