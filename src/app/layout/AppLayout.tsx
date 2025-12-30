import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import { signOut } from "../../features/auth/auth.api";
import { useAuth } from "../../features/auth/useAuth";

const nav = [
  { to: "/", label: "Home" },
  { to: "/words", label: "Slowka" },
  { to: "/training", label: "Trening" },
  { to: "/stats", label: "Staty" },
];

function LinkItem({ to, label, onClick }: { to: string; label: string; onClick?: () => void }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        [
          "block rounded-xl px-3 py-2 text-sm font-medium transition",
          isActive ? "bg-slate-900 text-white" : "text-slate-700 hover:bg-slate-100",
        ].join(" ")
      }
      end={to === "/"}
    >
      {label}
    </NavLink>
  );
}

export default function AppLayout() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  async function onLogout() {
    setLoggingOut(true);
    try {
      await signOut();
      navigate("/login", { replace: true });
    } finally {
      setLoggingOut(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* TOPBAR */}
      <header className="sticky top-0 z-30 border-b bg-white/80 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex h-14 items-center justify-between">
            <div className="flex items-center gap-3">
              {/* hamburger tylko na mobile */}
              <button
                className="md:hidden inline-flex items-center justify-center rounded-xl border px-3 py-2 text-sm"
                onClick={() => setMobileOpen((v) => !v)}
                aria-label="Menu"
              >
                Menu
              </button>
              <div className="font-semibold">Flashcards</div>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden sm:block text-sm text-slate-600">{user?.email}</div>
              <button
                onClick={onLogout}
                disabled={loggingOut}
                className="rounded-xl bg-slate-900 px-3 py-2 text-sm font-medium text-white disabled:opacity-60"
              >
                {loggingOut ? "Wylogowywanie..." : "Wyloguj"}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* CONTENT */}
      <div className="mx-auto max-w-6xl px-4 py-6">
        <div className="grid gap-6 md:grid-cols-[240px_1fr]">
          {/* SIDEBAR desktop */}
          <aside className="hidden md:block">
            <div className="rounded-2xl border bg-white p-3 shadow-sm">
              <div className="mb-2 px-2 text-xs font-semibold text-slate-500">NAWIGACJA</div>
              <nav className="space-y-1">
                {nav.map((n) => (
                  <LinkItem key={n.to} to={n.to} label={n.label} />
                ))}
              </nav>
            </div>
          </aside>

          {/* MAIN */}
          <main className="min-w-0">
            {/* mobile nav panel */}
            {mobileOpen && (
              <div className="md:hidden mb-4 rounded-2xl border bg-white p-3 shadow-sm">
                <div className="mb-2 px-2 text-xs font-semibold text-slate-500">NAWIGACJA</div>
                <nav className="space-y-1">
                  {nav.map((n) => (
                    <LinkItem
                      key={n.to}
                      to={n.to}
                      label={n.label}
                      onClick={() => setMobileOpen(false)}
                    />
                  ))}
                </nav>
              </div>
            )}

            <div className="rounded-2xl border bg-white p-4 shadow-sm">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
