import { d as db, s as sunsetCache } from "./index-Dinle6nz.mjs";
import "../_libs/pg.mjs";
import "../_libs/react.mjs";
import "events";
import "../_libs/pg-types.mjs";
import "../_libs/postgres-array.mjs";
import "../_libs/postgres-date.mjs";
import "../_libs/postgres-interval.mjs";
import "../_libs/xtend.mjs";
import "../_libs/postgres-bytea.mjs";
import "../_libs/pg-int8.mjs";
import "util";
import "crypto";
import "dns";
import "../_libs/pg-connection-string.mjs";
import "fs";
import "../_libs/pg-protocol.mjs";
import "net";
import "tls";
import "../_libs/pg-cloudflare.mjs";
import "../_libs/pgpass.mjs";
import "path";
import "stream";
import "../_libs/split2.mjs";
import "string_decoder";
import "../_libs/pg-pool.mjs";
import "../_libs/drizzle-orm.mjs";
async function getSunsetTime({
  date,
  latitude,
  longitude
}) {
  const cached = await db.query.sunsetCache.findFirst({
    where: (table, { eq, and }) => and(
      eq(table.date, date),
      eq(table.latitude, latitude),
      eq(table.longitude, longitude)
    )
  });
  if (cached) {
    return { sunsetUtc: cached.sunsetUtc, cached: true };
  }
  const response = await fetch(
    `https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}&date=${date}&formatted=0`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch sunset time");
  }
  const payload = await response.json();
  const sunsetIso = payload.results?.sunset;
  if (!sunsetIso) {
    throw new Error("Invalid sunset API response");
  }
  const sunsetUtc = new Date(sunsetIso);
  await db.insert(sunsetCache).values({ date, latitude, longitude, sunsetUtc }).onConflictDoNothing();
  return { sunsetUtc, cached: false };
}
function formatSunsetTime({
  sunsetUtc,
  offsetMinutes,
  timeZone
}) {
  const date = new Date(sunsetUtc.getTime() + offsetMinutes * 60 * 1e3);
  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone,
    hour12: false
  }).format(date);
}
export {
  formatSunsetTime,
  getSunsetTime
};
