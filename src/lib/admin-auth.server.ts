/**
 * Plain server-side helpers for admin authentication.
 *
 * These are NOT createServerFn — they are plain async functions that can only
 * be called from inside server function handlers. The createServerFn wrappers
 * (getAdminSession, ensureAdminSession) live in server-fns.ts so their RPC
 * stubs are available on the client.
 */
import { db } from "@/db/index";
import { logInfo, logWarn } from "@/lib/logger";

const ADMIN_COOKIE = "wdc_admin";

/**
 * Plain server-side helper — reads cookie and validates.
 * Only call from inside a server function handler.
 */
export async function resolveAdminSession() {
	const { getCookie } = await import("@tanstack/react-start/server");
	const token = getCookie(ADMIN_COOKIE);

	if (!token) {
		logWarn("admin-session", "Missing admin cookie");
		return null;
	}

	const admin = await db.query.adminUsers.findFirst({
		where: (table, { eq }) => eq(table.username, token),
	});

	if (!admin) {
		logWarn("admin-session", "Invalid admin cookie", { token });
		return null;
	}

	logInfo("admin-session", "Admin session resolved", {
		username: admin.username,
	});
	return { username: admin.username };
}

/**
 * Plain server-side helper — throws if not authenticated.
 * Only call from inside a server function handler.
 */
export async function ensureAdmin() {
	const session = await resolveAdminSession();
	if (!session) {
		throw new Error("Unauthorized");
	}
	return session;
}
