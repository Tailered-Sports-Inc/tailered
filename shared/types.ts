/**
 * Shared display/DTO types for the public shell.
 *
 * The private engine owns the database schema; we do NOT re-export it here
 * (that would leak the full data model — AGENTS.md LAW 0). Instead we declare
 * the minimal display shapes the UI actually consumes.
 */

export * from "./_core/errors";

export type BetMarket = "ML" | "RL" | "TOTAL";
export type BetSide = "AWAY" | "HOME" | "OVER" | "UNDER";
export type BetResult = "PENDING" | "WIN" | "LOSS" | "PUSH" | "VOID";
export type BetTimeframe =
  | "FULL_GAME"
  | "FIRST_5"
  | "FIRST_INNING"
  | "NRFI"
  | "YRFI"
  | "REGULATION"
  | "FIRST_PERIOD"
  | "FIRST_HALF"
  | "FIRST_QUARTER";

/** A single leg of a tracked (parlay or straight) bet, as shown in the UI. */
export interface TrackedBetLeg {
  id: number;
  betId: number;
  legIndex: number;
  sport: string;
  gameDate: string;
  awayTeam: string | null;
  homeTeam: string | null;
  anGameId: number | null;
  gameNumber: number | null;
  market: BetMarket;
  pickSide: BetSide | null;
  timeframe: BetTimeframe;
  line: string | null;
  odds: number;
  pick: string;
  result: BetResult;
  awayScore: string | null;
  homeScore: string | null;
  createdAt: string | Date;
  updatedAt: string | Date;
}

/**
 * A tracked bet ticket as shown in the BetTracker UI.
 * Nullability mirrors the origin `tracked_bets` table exactly — `odds`, `risk`,
 * `toWin`, `pick`, `legCount` and the timestamps are NOT NULL there, so the UI
 * may rely on them; everything the origin leaves nullable stays nullable here.
 */
export interface TrackedBet {
  id: number;
  userId: number;
  gameId: number | null;
  anGameId: number | null;
  gameNumber: number | null;
  timeframe: BetTimeframe;
  market: BetMarket;
  pickSide: BetSide | null;
  sport: string;
  gameDate: string;
  awayTeam: string | null;
  homeTeam: string | null;
  betType: string;
  pick: string;
  line: string | null;
  /** NOT NULL in the origin schema (american odds). */
  odds: number;
  originalOdds: number | null;
  legCount: number;
  /** NOT NULL decimals — serialized as strings on the wire. */
  risk: string;
  toWin: string;
  riskUnits: string | null;
  toWinUnits: string | null;
  book: string | null;
  result: BetResult;
  awayScore: string | null;
  homeScore: string | null;
  wagerType: "PREGAME" | "LIVE";
  customLine: string | null;
  legs?: TrackedBetLeg[];
  createdAt: string | Date;
  updatedAt: string | Date;
  /**
   * The private API returns more columns than the shell declares here. They are
   * intentionally untyped (LAW 0: the schema is not vendored into this repo),
   * so unlisted fields resolve to `any` rather than `unknown` — the shell
   * cannot narrow what it cannot see.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}
