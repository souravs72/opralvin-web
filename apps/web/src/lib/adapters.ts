import { memoryRateLimit, type Adapters } from "@opralvin/lead";

const limit = memoryRateLimit();

export async function verifyTurnstile(token: string | undefined): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (!token) return false;
  const body = new URLSearchParams({ secret, response: token });
  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body,
  });
  const data = (await response.json()) as { success?: boolean };
  return data.success === true;
}

export function productionAdapters(insert: Adapters["insert"]): Adapters {
  return {
    verifyTurnstile,
    rateLimit: async (ip) => {
      const url = process.env.UPSTASH_REDIS_REST_URL;
      const token = process.env.UPSTASH_REDIS_REST_TOKEN;
      if (!url || !token) return limit(ip);
      const key = `lead:${ip}`;
      const response = await fetch(`${url}/incr/${encodeURIComponent(key)}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = (await response.json()) as { result?: number };
      const count = data.result ?? 99;
      if (count === 1) {
        await fetch(`${url}/expire/${encodeURIComponent(key)}/3600`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      return count > 5 ? "limited" : "ok";
    },
    insert,
    mail: async (to) => {
      if (process.env.OPRALVIN_SEND_ACK === "1") {
        throw new Error("Live mail is off. Sandbox only until the owner confirms a send.");
      }
      const id = `sandbox-mail-${Date.now()}`;
      void to;
      console.info(JSON.stringify({ ack: "mail", id, sandbox: true }));
      return { id, sandbox: true };
    },
    whatsapp: async (phone) => {
      if (process.env.OPRALVIN_SEND_ACK === "1") {
        throw new Error("Live WhatsApp is off. Sandbox only. Do not message a real person.");
      }
      const id = `sandbox-wa-${Date.now()}`;
      void phone;
      console.info(JSON.stringify({ ack: "whatsapp", id, sandbox: true }));
      return { id, sandbox: true };
    },
  };
}
