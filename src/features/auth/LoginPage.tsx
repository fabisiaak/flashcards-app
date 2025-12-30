import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn } from "./auth.api";
import { useAuth } from "./useAuth";

export default function LoginPage() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // jesli juz zalogowany, przerzuc do appki
  if (!loading && user) {
    navigate("/", { replace: true });
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await signIn(email.trim(), password);
      navigate("/", { replace: true });
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : "Nie udalo sie zalogowac";
        setError(message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow p-6">
        <h1 className="text-2xl font-semibold">Zaloguj sie</h1>
        <p className="text-sm text-slate-500 mt-1">
          Tylko dla uprawnionych osob. Brak rejestracji.
        </p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium">Email</label>
            <input
              className="w-full rounded-xl border px-3 py-2 outline-none focus:ring"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="twoj@email.com"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">Haslo</label>
            <input
              className="w-full rounded-xl border px-3 py-2 outline-none focus:ring"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <div className="rounded-xl bg-red-50 text-red-700 text-sm p-3">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-xl bg-slate-900 text-white py-2 font-medium disabled:opacity-60"
          >
            {submitting ? "Logowanie..." : "Zaloguj"}
          </button>
        </form>
      </div>
    </div>
  );
}
