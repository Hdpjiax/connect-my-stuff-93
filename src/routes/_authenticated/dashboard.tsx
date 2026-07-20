import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Plane, Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Card, PageHeader, StatCard } from "@/components/DashboardShell";
import { formatCurrency, formatDate, statusBadge } from "@/lib/format";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({
    meta: [{ title: "Resumen — VuelosDk" }, { name: "robots", content: "noindex" }],
  }),
  component: DashboardPage,
});

type Flight = {
  id: string;
  flight_folio: string | null;
  flight_type: string;
  flight_date: string;
  flight_time: string;
  fare_type: string;
  total_amount: number;
  amount_to_pay: number;
  status: string;
};

function DashboardPage() {
  const navigate = useNavigate();
  const [flights, setFlights] = useState<Flight[]>([]);
  const [unread, setUnread] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) return;

      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", userData.user.id)
        .maybeSingle();
      if (profile?.role === "admin") {
        navigate({ to: "/admin", replace: true });
        return;
      }

      const [flightsRes, unreadRes] = await Promise.all([
        supabase
          .from("flights")
          .select("id, flight_folio, flight_type, flight_date, flight_time, fare_type, total_amount, amount_to_pay, status")
          .order("created_at", { ascending: false })
          .limit(8),
        supabase
          .from("notifications")
          .select("id", { count: "exact", head: true })
          .eq("read", false),
      ]);
      setFlights((flightsRes.data as Flight[]) ?? []);
      setUnread(unreadRes.count ?? 0);
      setLoading(false);
    })();
  }, [navigate]);

  const total = flights.length;
  const waiting = flights.filter((f) => f.status === "esperando_pago").length;
  const qrs = flights.filter((f) => f.status === "qr_enviado" || f.status === "completado").length;
  const acc = flights.reduce((s, f) => s + Number(f.amount_to_pay ?? 0), 0);

  return (
    <>
      <PageHeader
        title="Mi resumen"
        subtitle="Sube vuelos, revisa estados, envía comprobantes y descarga tus QR."
        action={
          <Link
            to="/vuelos/nuevo"
            className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-neutral-800"
          >
            <Plus className="h-4 w-4" /> Subir nuevo vuelo
          </Link>
        }
      />

      <section className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Mis vuelos" value={total} helper="Últimos registros" />
        <StatCard label="Esperando pago" value={waiting} helper="Cuenta enviada" />
        <StatCard label="QR recibidos" value={qrs} helper="Vuelos listos" />
        <StatCard label="Total acumulado" value={formatCurrency(acc)} helper={`${unread} notif. sin leer`} />
      </section>

      <Card>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Últimos vuelos</h2>
            <p className="text-sm text-neutral-500">Seguimiento rápido de tus solicitudes.</p>
          </div>
          <Link
            to="/vuelos"
            className="rounded-full border border-neutral-200 px-4 py-2 text-sm hover:bg-neutral-50"
          >
            Ver todos
          </Link>
        </div>

        {loading ? (
          <p className="py-8 text-center text-sm text-neutral-500">Cargando…</p>
        ) : flights.length === 0 ? (
          <div className="rounded-xl border border-dashed border-neutral-300 p-10 text-center">
            <Plane className="mx-auto h-8 w-8 text-neutral-400" />
            <p className="mt-3 font-medium">Aún no has subido vuelos</p>
            <p className="mt-1 text-sm text-neutral-500">
              Ya puedes registrar vuelos con fecha, pasajeros, extras, total e imagen.
            </p>
            <Link
              to="/vuelos/nuevo"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white"
            >
              <Plus className="h-4 w-4" /> Subir mi primer vuelo
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-sm">
              <thead className="text-left text-xs uppercase tracking-wider text-neutral-500">
                <tr>
                  <th className="py-2">Folio</th>
                  <th>Fecha</th>
                  <th>Tarifa</th>
                  <th>A pagar</th>
                  <th>Estado</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {flights.map((f) => {
                  const badge = statusBadge(f.status);
                  return (
                    <tr key={f.id}>
                      <td className="py-3 font-medium">{f.flight_folio ?? "—"}</td>
                      <td className="text-neutral-600">{formatDate(f.flight_date)}</td>
                      <td className="text-neutral-600">{f.fare_type}</td>
                      <td className="font-medium">{formatCurrency(f.amount_to_pay || f.total_amount)}</td>
                      <td>
                        <span className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium ${badge.className}`}>
                          {badge.label}
                        </span>
                      </td>
                      <td className="text-right">
                        <Link
                          to="/vuelos/$id"
                          params={{ id: f.id }}
                          className="text-sm font-medium text-neutral-700 hover:underline"
                        >
                          Ver →
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </>
  );
}