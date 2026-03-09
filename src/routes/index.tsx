import { createFileRoute } from "@tanstack/react-router";
import { LandingPage } from "@/components/landing/LandingPage";
import { getLandingContentFn } from "@/lib/server-fns";

export const Route = createFileRoute("/")({
  loader: async () => getLandingContentFn(),
  component: LandingRoute,
});

function LandingRoute() {
  const data = Route.useLoaderData() as Awaited<ReturnType<typeof getLandingContentFn>>;
  return (
    <LandingPage
      content={data.content}
      jamaatTimes={data.jamaatTimes}
      dateLabel={data.dateLabel}
      hijriLabel={data.hijriLabel}
      downloadHref={data.downloadHref}
    />
  );
}
