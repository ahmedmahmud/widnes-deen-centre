import { db } from "@/db/index";
import { sunsetCache } from "@/db/schema";

type SunsetResult = {
	sunsetUtc: Date;
	cached: boolean;
};

export async function getSunsetTime({
	date,
	latitude,
	longitude,
}: {
	date: string;
	latitude: string;
	longitude: string;
}): Promise<SunsetResult> {
	const cached = await db.query.sunsetCache.findFirst({
		where: (table, { eq, and }) =>
			and(
				eq(table.date, date),
				eq(table.latitude, latitude),
				eq(table.longitude, longitude),
			),
	});

	if (cached) {
		return { sunsetUtc: cached.sunsetUtc, cached: true };
	}

	const response = await fetch(
		`https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}&date=${date}&formatted=0`,
	);

	if (!response.ok) {
		throw new Error("Failed to fetch sunset time");
	}

	const payload = (await response.json()) as {
		results?: { sunset?: string };
	};

	const sunsetIso = payload.results?.sunset;
	if (!sunsetIso) {
		throw new Error("Invalid sunset API response");
	}

	const sunsetUtc = new Date(sunsetIso);
	await db
		.insert(sunsetCache)
		.values({ date, latitude, longitude, sunsetUtc })
		.onConflictDoNothing();

	return { sunsetUtc, cached: false };
}

export function formatSunsetTime({
	sunsetUtc,
	offsetMinutes,
	timeZone,
}: {
	sunsetUtc: Date;
	offsetMinutes: number;
	timeZone: string;
}) {
	const date = new Date(sunsetUtc.getTime() + offsetMinutes * 60 * 1000);

	return new Intl.DateTimeFormat("en-GB", {
		hour: "2-digit",
		minute: "2-digit",
		timeZone,
		hour12: false,
	}).format(date);
}
