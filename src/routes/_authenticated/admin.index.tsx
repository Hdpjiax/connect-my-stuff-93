import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, PageHeader, StatCard } from "@/components/DashboardShell";
import { formatCurrency, formatDate, statusBadge } from "@/lib/format";

export const Route = createFileRoute("/_authenticated/admin/")({
  head: () => ({ meta: [{ title: "Admin — VuelosDk" }, { name: "robots", content: "noindex" }] }),
  component: AdminDashboard,
});

function AdminDashboard() {
  const [stats, setStats] = useState({ total: 0, pending: 0, waitingPay: 0, users: 0 });
  const [recent, setRecent] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const [total, pending, waiting, users, list] = await Promise.all([
        supabase.from("flights").select("id", { count: "exact", head: true }),
        supabase.from("flights").select("id", { count: "exact", head: true }).eq("status", "pendiente_revision"),
        supabase.from("flights").select("id", { count: "exact", head: true }).eq("status", "esperando_pago"),
        supabase.from("profiles").select("id", { count: "exact", head: true }),
        supabase
          .from("flights")
          .select("id, flight_folio, flight_date, status, amount_to_pay, total_amount, user_id")
          .order("created_at", { ascending: false })
          .limit(10),
      ]);
      setStats({
        total: total.count ?? 0,
        pending: pending.count ?? 0,
        waitingPay: waiting.count ?? 0,
        users: users.count ?? 0,
      });
      setRecent(list.data ?? []);
    })();
  }, []);

  return (
    <>
      <PageHeader title="Panel de administración" subtitle="Visión global de la operación." />
      <section className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Vuelos totales" value={stats.total} />
        <StatCard label="Pendientes de revisión" value={stats.pending} />
        <StatCard label="Esperando pago" value={stats.waitingPay} />
        <StatCard label="Usuarios" value={stats.users} />
      </section>
      <Card>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Vuelos recientes</h2>
          <Link to="/admin/vuelos" className="rounded-full border border-neutral-200 px-4 py-2 text-sm hover:bg-neutral-50">
            Ver todos
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead className="text-left text-xs uppercase tracking-wider text-neutral-500">
              <tr>
                <th className="py-2">Folio</th>
                <th>Fecha</th>
                <th>A pagar</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {recent.map((f) => {
                const b = statusBadge(f.status);
                return (
                  <tr key={f.id}>
                    <td className="py-3 font-medium">{f.flight_folio ?? "—"}</td>
                    <td className="text-neutral-600">{formatDate(f.flight_date)}</td>
                    <td className="font-medium">{formatCurrency(f.amount_to_pay || f.total_amount)}</td>
                    <td>
                      <span className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium ${b.className}`}>
                        {b.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
              {recent.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-6 text-center text-neutral-500">
                    Sin vuelos todavía.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
}