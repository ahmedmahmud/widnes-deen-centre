import { config } from "dotenv";

config({ path: [".env.local", ".env"] });

const { db } = await import("../src/db/index");
const { adminUsers } = await import("../src/db/schema");

const username = process.env.ADMIN_USERNAME ?? "admin";
const password = process.env.ADMIN_PASSWORD ?? "admin1234";

const existing = await db.query.adminUsers.findFirst({
	where: (table, { eq }) => eq(table.username, username),
});

if (existing) {
	console.log("Admin user already exists", { username });
	process.exit(0);
}

await db.insert(adminUsers).values({ username, password });

console.log("Seeded admin user", { username });
