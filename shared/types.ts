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

/** A tracked bet ticket as shown in the BetTracker UI. */
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
  odds: number | null;
  stake: string | number | null;
  toWin: string | number | null;
  result: BetResult;
  legs?: TrackedBetLeg[];
  createdAt: string | Date;
  updatedAt?: string | Date;
  [key: string]: unknown;
}
