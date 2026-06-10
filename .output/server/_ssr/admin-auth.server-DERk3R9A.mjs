import { d as db } from "./index-Dinle6nz.mjs";
import { logWarn, logInfo } from "./logger-CsgR-Ne_.mjs";
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
const ADMIN_COOKIE = "wdc_admin";
async function resolveAdminSession() {
  const { getCookie } = await import("./server-CMzxgZBk.mjs").then(function(n) {
    return n.s;
  });
  const token = getCookie(ADMIN_COOKIE);
  if (!token) {
    logWarn("admin-session", "Missing admin cookie");
    return null;
  }
  const admin = await db.query.adminUsers.findFirst({
    where: (table, { eq }) => eq(table.username, token)
  });
  if (!admin) {
    logWarn("admin-session", "Invalid admin cookie", { token });
    return null;
  }
  logInfo("admin-session", "Admin session resolved", {
    username: admin.username
  });
  return { username: admin.username };
}
async function ensureAdmin() {
  const session = await resolveAdminSession();
  if (!session) {
    throw new Error("Unauthorized");
  }
  return session;
}
export {
  ensureAdmin,
  resolveAdminSession
};
