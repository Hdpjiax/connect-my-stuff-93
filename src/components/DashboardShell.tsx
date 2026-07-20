import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Plane,
  Bell,
  User as UserIcon,
  LogOut,
  Menu,
  X,
  Shield,
  Users,
  Landmark,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type NavItem = { to: string; label: string; icon: React.ComponentType<{ className?: string }> };

const USER_NAV: NavItem[] = [
  { to: "/dashboard", label: "Resumen", icon: LayoutDashboard },
  { to: "/vuelos", label: "Mis vuelos", icon: Plane },
  { to: "/notificaciones", label: "Notificaciones", icon: Bell },
  { to: "/perfil", label: "Perfil", icon: UserIcon },
];

const ADMIN_NAV: NavItem[] = [
  { to: "/admin", label: "Panel", icon: LayoutDashboard },
  { to: "/admin/vuelos", label: "Vuelos", icon: Plane },
  { to: "/admin/usuarios", label: "Usuarios", icon: Users },
  { to: "/admin/cuentas", label: "Cuentas bancarias", icon: Landmark },
];

export function DashboardShell({
  role,
  userEmail,
  children,
}: {
  role: "admin" | "user";
  userEmail: string | null;
  children: ReactNode;
}) {
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const nav = role === "admin" ? ADMIN_NAV : USER_NAV;

  useEffect(() => setOpen(false), [pathname]);

  async function signOut() {
    await supabase.auth.signOut();
    navigate({ to: "/", replace: true });
  }

  const isActive = (to: string) =>
    to === "/dashboard" || to === "/admin"
      ? pathname === to
      : pathname === to || pathname.startsWith(to + "/");

  return (
    <div className="min-h-dvh bg-neutral-50 text-neutral-900">
      {/* Top bar (mobile) */}
      <header className="lg:hidden sticky top-0 z-30 flex items-center justify-between border-b border-neutral-200 bg-white/90 px-4 py-3 backdrop-blur">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-neutral-900 text-white">
            <Plane className="h-4 w-4 -rotate-45" />
          </span>
          VuelosDk
        </Link>
        <button
          onClick={() => setOpen(true)}
          className="rounded-md border border-neutral-200 p-2"
          aria-label="Abrir menú"
        >
          <Menu className="h-5 w-5" />
        </button>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-neutral-200 bg-white transition-transform lg:sticky lg:top-0 lg:h-dvh lg:translate-x-0 ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between px-6 py-5">
            <Link to="/" className="flex items-center gap-2 font-semibold">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-neutral-900 text-white">
                <Plane className="h-4 w-4 -rotate-45" />
              </span>
              <span className="text-lg tracking-tight">VuelosDk</span>
            </Link>
            <button
              onClick={() => setOpen(false)}
              className="rounded-md border border-neutral-200 p-1.5 lg:hidden"
              aria-label="Cerrar menú"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="px-4">
            <p className="mb-1 px-3 text-[10px] font-semibold uppercase tracking-widest text-neutral-500">
              {role === "admin" ? "Administración" : "Mi cuenta"}
            </p>
            {role === "admin" && (
              <div className="mx-3 mb-3 inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-800">
                <Shield className="h-3 w-3" /> Modo admin
              </div>
            )}
          </div>

          <nav className="flex-1 space-y-1 px-4">
            {nav.map((item) => {
              const active = isActive(item.to);
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
                    active
                      ? "bg-neutral-900 text-white shadow-sm"
                      : "text-neutral-700 hover:bg-neutral-100"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="border-t border-neutral-200 p-4">
            <p className="mb-2 truncate px-2 text-xs text-neutral-500">{userEmail ?? "—"}</p>
            <button
              onClick={signOut}
              className="flex w-full items-center gap-2 rounded-xl border border-neutral-200 px-3 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
            >
              <LogOut className="h-4 w-4" /> Cerrar sesión
            </button>
          </div>
        </aside>

        {open && (
          <div
            className="fixed inset-0 z-30 bg-black/30 lg:hidden"
            onClick={() => setOpen(false)}
            aria-hidden
          />
        )}

        <main className="min-h-dvh flex-1 px-4 py-6 sm:px-8 sm:py-10 lg:px-12">
          {children}
        </main>
      </div>
    </div>
  );
}

export function PageHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h1>
        {subtitle && <p className="mt-2 max-w-2xl text-sm text-neutral-600">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm ${className}`}>
      {children}
    </div>
  );
}

export function StatCard({ label, value, helper }: { label: string; value: string | number; helper?: string }) {
  return (
    <Card>
      <p className="text-xs font-medium uppercase tracking-wider text-neutral-500">{label}</p>
      <p className="mt-2 text-3xl font-semibold tracking-tight">{value}</p>
      {helper && <p className="mt-1 text-xs text-neutral-500">{helper}</p>}
    </Card>
  );
}