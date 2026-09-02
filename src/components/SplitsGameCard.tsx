import { BettingSplitsPanel } from "./BettingSplitsPanel";
import { MLB_BY_ABBREV } from "@shared/mlbTeams";
import { getNbaTeamByDbSlug } from "@shared/nbaTeams";
import { NHL_BY_DB_SLUG } from "@shared/nhlTeams";

interface SplitsGame {
  id: number;
  sport: string | null;
  awayTeam: string;
  homeTeam: string;
  gameDate: string;
  startTimeEst: string | null;
  gameStatus?: string | null;
  gameClock?: string | null;
  awayScore?: number | string | null;
  homeScore?: number | string | null;
  awayBookSpread?: string | null;
  homeBookSpread?: string | null;
  bookTotal?: string | null;
  spreadAwayBetsPct: number | null | undefined;
  spreadAwayMoneyPct: number | null | undefined;
  totalOverBetsPct: number | null | undefined;
  totalOverMoneyPct: number | null | undefined;
  mlAwayBetsPct: number | null | undefined;
  mlAwayMoneyPct: number | null | undefined;
  awayML: string | null | undefined;
  homeML: string | null | undefined;
}

function titleCase(slug: string): string {
  return slug.replace(/_/g, " ").replace(/\b\w/g, letter => letter.toUpperCase());
}

function teamDisplay(slug: string) {
  const nba = getNbaTeamByDbSlug(slug);
  const nhl = !nba ? (NHL_BY_DB_SLUG.get(slug) ?? null) : null;
  const mlb = !nba && !nhl ? (MLB_BY_ABBREV.get(slug) ?? null) : null;
  const team = nba ?? nhl ?? mlb;
  const city = team?.city ?? titleCase(slug);
  const nickname = team?.nickname ?? "";
  const abbreviation =
    team?.abbrev ??
    slug
      .split(/[_\s]+/)
      .map(word => word[0]?.toUpperCase() ?? "")
      .join("")
      .slice(0, 3);

  return {
    label: nickname ? `${city} ${nickname}` : city,
    nickname,
    abbreviation,
  };
}

function startLabel(time: string | null): string {
  if (!time || /^(TBD|TBA)$/i.test(time)) return "TBD";
  const [hourText, minuteText] = time.split(":");
  const hour = Number(hourText);
  const minute = Number(minuteText);
  if (!Number.isFinite(hour) || !Number.isFinite(minute)) return "TBD";
  const suffix = hour >= 12 ? "PM" : "AM";
  return `${hour % 12 || 12}:${String(minute).padStart(2, "0")} ${suffix} ET`;
}

export function SplitsGameCard({ game }: { game: SplitsGame }) {
  const away = teamDisplay(game.awayTeam);
  const home = teamDisplay(game.homeTeam);
  const isLive = game.gameStatus === "live";
  const isFinal = game.gameStatus === "final";
  const status = isLive
    ? game.gameClock || "LIVE"
    : isFinal
      ? "FINAL"
      : startLabel(game.startTimeEst);

  return (
    <article
      className="border-b border-border px-4 py-5"
      aria-label={`${away.label} at ${home.label}`}
    >
      <div className="mx-auto w-full max-w-5xl">
        <header className="mb-4 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
          <div className="min-w-0 text-right">
            <p className="truncate text-sm font-semibold text-foreground">
              {away.label}
            </p>
            {(isLive || isFinal) && (
              <p className="mt-1 text-xl font-bold tabular-nums text-foreground">
                {game.awayScore ?? "—"}
              </p>
            )}
          </div>

          <div className="min-w-16 text-center">
            <p
              className="text-[10px] font-semibold uppercase tracking-[0.12em]"
              style={{ color: isLive ? "#45E0A8" : "var(--dime-text-secondary)" }}
            >
              {status}
            </p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.1em] text-muted-foreground">
              {away.abbreviation} @ {home.abbreviation}
            </p>
          </div>

          <div className="min-w-0 text-left">
            <p className="truncate text-sm font-semibold text-foreground">
              {home.label}
            </p>
            {(isLive || isFinal) && (
              <p className="mt-1 text-xl font-bold tabular-nums text-foreground">
                {game.homeScore ?? "—"}
              </p>
            )}
          </div>
        </header>

        <BettingSplitsPanel
          gameId={game.id}
          game={game}
          awayLabel={away.label}
          homeLabel={home.label}
          awayAbbr={away.abbreviation}
          homeAbbr={home.abbreviation}
          awayNickname={away.nickname}
          homeNickname={home.nickname}
        />
      </div>
    </article>
  );
}
