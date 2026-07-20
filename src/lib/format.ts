export function formatCurrency(n: number | null | undefined) {
  const v = Number(n ?? 0);
  return new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }).format(v);
}

export function formatDate(d: string | null | undefined) {
  if (!d) return "—";
  try {
    return new Date(d + (d.length === 10 ? "T00:00:00" : "")).toLocaleDateString("es-MX", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return d;
  }
}

export function formatTime(t: string | null | undefined) {
  if (!t) return "—";
  return t.slice(0, 5);
}

export const STATUS_LABEL: Record<string, string> = {
  pendiente_revision: "Pendiente revisión",
  esperando_pago: "Esperando pago",
  pago_subido: "Pago subido",
  pago_confirmado: "Pago confirmado",
  pendiente_qr: "Pendiente QR",
  qr_enviado: "QR enviado",
  completado: "Completado",
  cancelado: "Cancelado",
};

export const STATUS_TONE: Record<string, string> = {
  pendiente_revision: "bg-amber-100 text-amber-900 border-amber-200",
  esperando_pago: "bg-sky-100 text-sky-900 border-sky-200",
  pago_subido: "bg-indigo-100 text-indigo-900 border-indigo-200",
  pago_confirmado: "bg-emerald-100 text-emerald-900 border-emerald-200",
  pendiente_qr: "bg-violet-100 text-violet-900 border-violet-200",
  qr_enviado: "bg-teal-100 text-teal-900 border-teal-200",
  completado: "bg-green-100 text-green-900 border-green-200",
  cancelado: "bg-rose-100 text-rose-900 border-rose-200",
};

export function statusBadge(status: string) {
  return {
    label: STATUS_LABEL[status] ?? status,
    className: STATUS_TONE[status] ?? "bg-slate-100 text-slate-900 border-slate-200",
  };
}