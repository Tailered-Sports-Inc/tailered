import { createTRPCReact } from "@trpc/react-query";

// Public shell: the tRPC client is intentionally UNTYPED here.
// The real AppRouter type lives in the private engine and is never vendored
// into this public repo (it would reveal the full API surface — AGENTS.md LAW 0).
// Response shapes the UI needs are declared as display types in `@shared/types`.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AppRouter = any;
export const trpc = createTRPCReact<AppRouter>();
