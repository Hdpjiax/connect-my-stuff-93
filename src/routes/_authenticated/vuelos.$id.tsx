import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Card, PageHeader } from "@/components/DashboardShell";
import { formatCurrency, formatDate, formatTime, statusBadge } from "@/lib/format";

export const Route = createFileRoute("/_authenticated/vuelos/$id")({
  head: () => ({ meta: [{ title: "Detalle de vuelo — VuelosDk" }, { name: "robots", content: "noindex" }] }),
  component: FlightDetail,
});

type Flight = Record<string, any>;
type Message = { id: string; message: string; sender_id: string; created_at: string; message_type: string };

function FlightDetail() {
  const { id } = Route.useParams();
  const [flight, setFlight] = useState<Flight | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMsg, setNewMsg] = useState("");
  const [loading, setLoading] = useState(true);

  async function load() {
    const [f, m] = await Promise.all([
      supabase.from("flights").select("*").eq("id", id).maybeSingle(),
      supabase.from("flight_messages").select("*").eq("flight_id", id).order("created_at", { ascending: true }),
    ]);
    setFlight(f.data);
    setMessages((m.data as Message[]) ?? []);
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, [id]);

  async function sendMessage() {
    if (!newMsg.trim()) return;
    const { data: u } = await supabase.auth.getUser();
    if (!u.user) return;
    await supabase.from("flight_messages").insert({
      flight_id: id,
      sender_id: u.user.id,
      message: newMsg.trim(),
    });
    setNewMsg("");
    load();
  }

  if (loading) return <p className="text-sm text-neutral-500">Cargando…</p>;
  if (!flight)
    return (
      <>
        <p className="text-sm text-neutral-500">Vuelo no encontrado.</p>
        <Link to="/vuelos" className="mt-4 inline-block text-sm underline">
          Volver
        </Link>
      </>
    );

  const badge = statusBadge(flight.status);

  return (
    <>
      <Link to="/vuelos" className="mb-4 inline-flex items-center gap-1 text-sm text-neutral-600 hover:underline">
        <ArrowLeft className="h-4 w-4" /> Volver
      </Link>
      <PageHeader
        title={flight.flight_folio ?? "Vuelo"}
        subtitle={`${flight.flight_type} · ${flight.fare_type}`}
        action={
          <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${badge.className}`}>
            {badge.label}
          </span>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <Card>
          <h2 className="mb-4 text-lg font-semibold">Detalles</h2>
          <dl className="grid grid-cols-2 gap-4 text-sm">
            <Field label="Ida">
              {formatDate(flight.flight_date)} · {formatTime(flight.flight_time)}
            </Field>
            {flight.flight_type === "redondo" && (
              <Field label="Regreso">
                {formatDate(flight.return_flight_date)} · {formatTime(flight.return_flight_time)}
              </Field>
            )}
            <Field label="Tarifa">{flight.fare_type}</Field>
            <Field label="Total">{formatCurrency(flight.total_amount)}</Field>
            <Field label="A pagar">{formatCurrency(flight.amount_to_pay || flight.total_amount)}</Field>
            <Field label="Pasajeros">
              {Array.isArray(flight.passengers) ? flight.passengers.length : 0}
            </Field>
          </dl>
          {flight.admin_notes && (
            <div className="mt-6 rounded-xl bg-neutral-50 p-4 text-sm">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-neutral-500">
                Notas de administración
              </p>
              {flight.admin_notes}
            </div>
          )}
        </Card>

        <Card>
          <h2 className="mb-4 text-lg font-semibold">Mensajes</h2>
          <div className="mb-4 max-h-80 space-y-3 overflow-y-auto">
            {messages.length === 0 ? (
              <p className="text-sm text-neutral-500">Sin mensajes todavía.</p>
            ) : (
              messages.map((m) => (
                <div key={m.id} className="rounded-xl bg-neutral-50 p-3 text-sm">
                  <p>{m.message}</p>
                  <p className="mt-1 text-[10px] uppercase tracking-wider text-neutral-500">
                    {new Date(m.created_at).toLocaleString("es-MX")}
                  </p>
                </div>
              ))
            )}
          </div>
          <div className="flex gap-2">
            <input
              value={newMsg}
              onChange={(e) => setNewMsg(e.target.value)}
              placeholder="Escribe un mensaje…"
              className="flex-1 rounded-xl border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-neutral-900"
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="rounded-xl bg-neutral-900 px-4 py-2 text-sm font-medium text-white"
            >
              Enviar
            </button>
          </div>
        </Card>
      </div>
    </>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wider text-neutral-500">{label}</dt>
      <dd className="mt-0.5 font-medium">{children}</dd>
    </div>
  );
}