import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, PageHeader } from "@/components/DashboardShell";
import { formatCurrency, formatDate, statusBadge, STATUS_LABEL } from "@/lib/format";

export const Route = createFileRoute("/_authenticated/admin/vuelos")({
  head: () => ({ meta: [{ title: "Vuelos (admin) — VuelosDk" }, { name: "robots", content: "noindex" }] }),
  component: AdminFlights,
});

function AdminFlights() {
  const [rows, setRows] = useState<any[]>([]);
  const [filter, setFilter] = useState<string>("todos");

  async function load() {
    let q = supabase
      .from("flights")
      .select("id, flight_folio, flight_date, fare_type, total_amount, amount_to_pay, status, user_id")
      .order("created_at", { ascending: false });
    if (filter !== "todos") q = q.eq("status", filter as any);
    const { data } = await q;
    setRows(data ?? []);
  }

  useEffect(() => {
    load();
  }, [filter]);

  async function updateStatus(id: string, status: string) {
    await supabase.from("flights").update({ status }).eq("id", id);
    load();
  }

  return (
    <>
      <PageHeader title="Todos los vuelos" subtitle="Gestión operativa." />
      <div className="mb-4 flex flex-wrap gap-2">
        {["todos", ...Object.keys(STATUS_LABEL)].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`rounded-full border px-3 py-1 text-xs ${
              filter === s ? "border-neutral-900 bg-neutral-900 text-white" : "border-neutral-300"
            }`}
          >
            {s === "todos" ? "Todos" : STATUS_LABEL[s]}
          </button>
        ))}
      </div>
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-sm">
            <thead className="text-left text-xs uppercase tracking-wider text-neutral-500">
              <tr>
                <th className="py-2">Folio</th>
                <th>Fecha</th>
                <th>Tarifa</th>
                <th>A pagar</th>
                <th>Estado</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {rows.map((f) => {
                const b = statusBadge(f.status);
                return (
                  <tr key={f.id}>
                    <td className="py-3 font-medium">{f.flight_folio ?? "—"}</td>
                    <td className="text-neutral-600">{formatDate(f.flight_date)}</td>
                    <td className="text-neutral-600">{f.fare_type}</td>
                    <td className="font-medium">{formatCurrency(f.amount_to_pay || f.total_amount)}</td>
                    <td>
                      <span className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium ${b.className}`}>
                        {b.label}
                      </span>
                    </td>
                    <td>
                      <select
                        value={f.status}
                        onChange={(e) => updateStatus(f.id, e.target.value)}
                        className="rounded-lg border border-neutral-300 bg-white px-2 py-1 text-xs"
                      >
                        {Object.entries(STATUS_LABEL).map(([k, v]) => (
                          <option key={k} value={k}>
                            {v}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                );
              })}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-6 text-center text-neutral-500">
                    Sin resultados.
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