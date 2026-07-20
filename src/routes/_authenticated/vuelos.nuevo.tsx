import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, PageHeader } from "@/components/DashboardShell";

export const Route = createFileRoute("/_authenticated/vuelos/nuevo")({
  head: () => ({ meta: [{ title: "Nuevo vuelo — VuelosDk" }, { name: "robots", content: "noindex" }] }),
  component: NuevoVuelo,
});

function NuevoVuelo() {
  const navigate = useNavigate();
  const [flightType, setFlightType] = useState<"sencillo" | "redondo">("sencillo");
  const [flightDate, setFlightDate] = useState("");
  const [flightTime, setFlightTime] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [returnTime, setReturnTime] = useState("");
  const [fareType, setFareType] = useState("Básica");
  const [passengerName, setPassengerName] = useState("");
  const [total, setTotal] = useState<string>("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (!flightDate || !flightTime || !passengerName || !total) {
      setError("Completa fecha, hora, pasajero y total.");
      return;
    }
    if (flightType === "redondo" && (!returnDate || !returnTime)) {
      setError("Agrega la fecha y hora de regreso.");
      return;
    }
    setPending(true);
    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) {
      setError("Sesión requerida.");
      setPending(false);
      return;
    }
    const totalNum = Number(total);
    const { error } = await supabase.from("flights").insert({
      user_id: userData.user.id,
      flight_type: flightType,
      flight_date: flightDate,
      flight_time: flightTime,
      return_flight_date: flightType === "redondo" ? returnDate : null,
      return_flight_time: flightType === "redondo" ? returnTime : null,
      passengers: [{ name: passengerName }],
      fare_type: fareType,
      total_amount: totalNum,
      amount_to_pay: totalNum,
      extras: notes ? { notes } : {},
      status: "pendiente_revision",
    });
    setPending(false);
    if (error) {
      setError(error.message);
      return;
    }
    navigate({ to: "/vuelos" });
  }

  const input =
    "w-full rounded-xl border border-neutral-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-neutral-900";
  const label = "text-xs font-medium uppercase tracking-wider text-neutral-500";

  return (
    <>
      <PageHeader title="Nuevo vuelo" subtitle="Sube los datos del vuelo. Administración lo revisará." />
      <Card className="max-w-3xl">
        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <p className={label + " mb-2"}>Tipo de vuelo</p>
            <div className="flex gap-2">
              {(["sencillo", "redondo"] as const).map((t) => (
                <button
                  type="button"
                  key={t}
                  onClick={() => setFlightType(t)}
                  className={`rounded-full border px-4 py-1.5 text-sm capitalize ${
                    flightType === t ? "border-neutral-900 bg-neutral-900 text-white" : "border-neutral-300"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={label}>Fecha de ida</label>
              <input type="date" value={flightDate} onChange={(e) => setFlightDate(e.target.value)} className={input} />
            </div>
            <div>
              <label className={label}>Hora de ida</label>
              <input type="time" value={flightTime} onChange={(e) => setFlightTime(e.target.value)} className={input} />
            </div>
            {flightType === "redondo" && (
              <>
                <div>
                  <label className={label}>Fecha de regreso</label>
                  <input type="date" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} className={input} />
                </div>
                <div>
                  <label className={label}>Hora de regreso</label>
                  <input type="time" value={returnTime} onChange={(e) => setReturnTime(e.target.value)} className={input} />
                </div>
              </>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={label}>Nombre del pasajero</label>
              <input value={passengerName} onChange={(e) => setPassengerName(e.target.value)} className={input} placeholder="Nombre completo" />
            </div>
            <div>
              <label className={label}>Tarifa</label>
              <select value={fareType} onChange={(e) => setFareType(e.target.value)} className={input}>
                <option>Básica</option>
                <option>Clásica</option>
                <option>Flexible</option>
                <option>Premium</option>
              </select>
            </div>
            <div>
              <label className={label}>Total (MXN)</label>
              <input type="number" min={0} step="0.01" value={total} onChange={(e) => setTotal(e.target.value)} className={input} placeholder="0.00" />
            </div>
          </div>

          <div>
            <label className={label}>Notas (opcional)</label>
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} className={input} rows={3} />
          </div>

          {error && <p className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-800">{error}</p>}

          <div className="flex gap-3">
            <button
              type="submit"
              disabled={pending}
              className="rounded-full bg-neutral-900 px-6 py-2.5 text-sm font-medium text-white hover:bg-neutral-800 disabled:opacity-50"
            >
              {pending ? "Guardando…" : "Enviar vuelo"}
            </button>
            <button
              type="button"
              onClick={() => navigate({ to: "/vuelos" })}
              className="rounded-full border border-neutral-300 px-6 py-2.5 text-sm"
            >
              Cancelar
            </button>
          </div>
        </form>
      </Card>
    </>
  );
}