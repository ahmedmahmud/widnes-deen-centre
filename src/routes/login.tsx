import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { getAdminSession, loginFn } from "@/lib/server-fns";

export const Route = createFileRoute("/login" as never)({
  beforeLoad: async () => {
    const session = await getAdminSession();
    if (session) {
      throw redirect({ to: "/admin" as never });
    }
  },
  component: LoginRoute,
});

function LoginRoute() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const result = await loginFn({ data: { username: "admin", password } });
      if (result.ok) {
        navigate({ to: "/admin" as never });
      } else {
        setError("error" in result ? result.error : "Login failed");
        setLoading(false);
      }
    } catch {
      setError("Login failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-sand text-plum flex items-center justify-center px-4">
      <div className="bg-white/80 border border-forest/10 p-8 w-full max-w-md space-y-6">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-forest/60">
            Widnes Deen Centre
          </p>
          <h1 className="font-serif text-3xl text-forest">Admin Sign In</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="flex flex-col gap-2">
            <span className="font-mono text-xs uppercase tracking-widest text-forest/60">
              Password
            </span>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="border border-forest/20 px-4 py-2 bg-white/70"
              required
            />
          </label>
          {error ? (
            <div className="text-sm text-clay font-mono">{error}</div>
          ) : null}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-forest text-sand px-6 py-3 font-mono uppercase tracking-widest disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
