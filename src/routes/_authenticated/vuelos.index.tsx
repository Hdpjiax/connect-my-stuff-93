import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Card, PageHeader } from "@/components/DashboardShell";
import { formatCurrency, formatDate, formatTime, statusBadge } from "@/lib/format";

export const Route = createFileRoute("/_authenticated/vuelos/")({
  head: () => ({ meta: [{ title: "Mis vuelos — VuelosDk" }, { name: "robots", content: "noindex" }] }),
  component: VuelosList,
});

type Row = {
  id: string;
  flight_folio: string | null;
  flight_type: string;
  flight_date: string;
  flight_time: string;
  return_flight_date: string | null;
  return_flight_time: string | null;
  fare_type: string;
  total_amount: number;
  amount_to_pay: number;
  status: string;
  created_at: string;
};

function VuelosList() {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("flights")
      .select("id, flight_folio, flight_type, flight_date, flight_time, return_flight_date, return_flight_time, fare_type, total_amount, amount_to_pay, status, created_at")
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setRows((data as Row[]) ?? []);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <PageHeader
        title="Mis vuelos"
        subtitle="Todos tus vuelos registrados."
        action={
          <Link
            to="/vuelos/nuevo"
            className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-neutral-800"
          >
            <Plus className="h-4 w-4" /> Nuevo vuelo
          </Link>
        }
      />
      <Card>
        {loading ? (
          <p className="py-8 text-center text-sm text-neutral-500">Cargando…</p>
        ) : rows.length === 0 ? (
          <p className="py-10 text-center text-sm text-neutral-500">Aún no tienes vuelos registrados.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-sm">
              <thead className="text-left text-xs uppercase tracking-wider text-neutral-500">
                <tr>
                  <th className="py-2">Folio</th>
                  <th>Tipo</th>
                  <th>Ida</th>
                  <th>Regreso</th>
                  <th>Total</th>
                  <th>A pagar</th>
                  <th>Estado</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {rows.map((f) => {
                  const badge = statusBadge(f.status);
                  return (
                    <tr key={f.id}>
                      <td className="py-3 font-medium">{f.flight_folio ?? "—"}</td>
                      <td className="capitalize text-neutral-600">{f.flight_type}</td>
                      <td className="text-neutral-600">
                        {formatDate(f.flight_date)} · {formatTime(f.flight_time)}
                      </td>
                      <td className="text-neutral-600">
                        {f.return_flight_date ? `${formatDate(f.return_flight_date)} · ${formatTime(f.return_flight_time)}` : "—"}
                      </td>
                      <td>{formatCurrency(f.total_amount)}</td>
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
                          className="font-medium text-neutral-700 hover:underline"
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