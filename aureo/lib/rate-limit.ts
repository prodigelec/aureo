/**
 * Rate limiter en mémoire par clé (IP, email…).
 * Pour un déploiement multi-instances, remplacer par Redis (Upstash).
 */

const WINDOW_MS = 15 * 60 * 1000; // fenêtre de 15 minutes
const MAX_ATTEMPTS = 5; // tentatives max par fenêtre
const BLOCK_MS = 15 * 60 * 1000; // durée de blocage : 15 minutes

type Record = {
  count: number;
  firstAt: number;
  blockedUntil?: number;
};

const store = new Map<string, Record>();

// Nettoyage automatique des entrées expirées toutes les 10 min
setInterval(() => {
  const now = Date.now();
  for (const [key, rec] of store) {
    const expired =
      (!rec.blockedUntil || rec.blockedUntil <= now) &&
      now - rec.firstAt > WINDOW_MS;
    if (expired) store.delete(key);
  }
}, 10 * 60 * 1000);

export type RateLimitResult =
  | { allowed: true }
  | { allowed: false; retryAfterSeconds: number };

export function checkRateLimit(key: string): RateLimitResult {
  const now = Date.now();
  const rec = store.get(key);

  // Toujours bloqué ?
  if (rec?.blockedUntil && rec.blockedUntil > now) {
    return {
      allowed: false,
      retryAfterSeconds: Math.ceil((rec.blockedUntil - now) / 1000),
    };
  }

  // Fenêtre expirée → repartir de zéro
  if (!rec || now - rec.firstAt > WINDOW_MS) {
    store.set(key, { count: 1, firstAt: now });
    return { allowed: true };
  }

  const newCount = rec.count + 1;

  if (newCount >= MAX_ATTEMPTS) {
    store.set(key, { ...rec, count: newCount, blockedUntil: now + BLOCK_MS });
    return { allowed: false, retryAfterSeconds: BLOCK_MS / 1000 };
  }

  store.set(key, { ...rec, count: newCount });
  return { allowed: true };
}

export function resetRateLimit(key: string) {
  store.delete(key);
}
