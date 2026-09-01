import { createTRPCReact } from "@trpc/react-query";
import type { AnyTRPCRouter } from "@trpc/server";

/**
 * Public shell: the tRPC client is deliberately UNTYPED against the API.
 *
 * The real AppRouter type lives in the private engine and is never vendored
 * into this public repo — it would enumerate the entire backend surface
 * (AGENTS.md LAW 0). The shell talks to a remote API whose types it cannot
 * see, so procedure access is `any` by design; response shapes the UI depends
 * on are declared as display types in `@shared/types`.
 *
 * The cast is what keeps `tsc --noEmit` meaningful for the REST of the app:
 * without it, tRPC's generic machinery resolves an untyped router into its
 * internal collision-guard string union and every call site errors.
 */
export type AppRouter = AnyTRPCRouter;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const trpc = createTRPCReact<AnyTRPCRouter>() as any;
