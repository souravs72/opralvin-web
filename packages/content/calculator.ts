export type DayRate = { kind: "token"; token: string } | { kind: "rupees"; rupees: number };

export type Quote = {
  ok: boolean;
  days: number;
  display: string;
  totalRupees: number | null;
  labelled: "token" | "computed" | "invalid";
};

const TOKEN = "{{DAY_RATE}}";

export function parseDayRate(raw: string | undefined): DayRate {
  const trimmed = (raw ?? "").trim();
  if (!trimmed || trimmed.includes("{{")) return { kind: "token", token: trimmed || TOKEN };
  const n = Number(trimmed.replace(/,/g, ""));
  if (!Number.isFinite(n) || n <= 0) return { kind: "token", token: TOKEN };
  return { kind: "rupees", rupees: n };
}

export function formatInr(n: number): string {
  return `₹${Math.round(n).toLocaleString("en-IN")}`;
}

export function quoteWork(days: number, rate: DayRate): Quote {
  if (!Number.isInteger(days) || days < 1 || days > 90) {
    return { ok: false, days, display: "", totalRupees: null, labelled: "invalid" };
  }
  if (rate.kind === "token") {
    return {
      ok: true,
      days,
      display: `${days} × ${rate.token}`,
      totalRupees: null,
      labelled: "token",
    };
  }
  const total = days * rate.rupees;
  return { ok: true, days, display: formatInr(total), totalRupees: total, labelled: "computed" };
}
