import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, PageHeader } from "@/components/DashboardShell";

export const Route = createFileRoute("/_authenticated/notificaciones")({
  head: () => ({ meta: [{ title: "Notificaciones — VuelosDk" }, { name: "robots", content: "noindex" }] }),
  component: Notif,
});

function Notif() {
  const [items, setItems] = useState<any[]>([]);

  async function load() {
    const { data } = await supabase
      .from("notifications")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50);
    setItems(data ?? []);
  }
  useEffect(() => {
    load();
  }, []);

  async function markRead(id: string) {
    await supabase.from("notifications").update({ read: true }).eq("id", id);
    load();
  }

  return (
    <>
      <PageHeader title="Notificaciones" subtitle="Tu centro de mensajes." />
      <Card>
        {items.length === 0 ? (
          <p className="py-6 text-center text-sm text-neutral-500">Sin notificaciones.</p>
        ) : (
          <div className="space-y-3">
            {items.map((n) => (
              <div
                key={n.id}
                className={`rounded-xl border p-4 ${
                  n.read ? "border-neutral-200 bg-white" : "border-sky-200 bg-sky-50"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-medium">{n.title}</p>
                    <p className="mt-1 text-sm text-neutral-600">{n.body}</p>
                    <p className="mt-1 text-[10px] uppercase tracking-wider text-neutral-500">
                      {new Date(n.created_at).toLocaleString("es-MX")}
                    </p>
                  </div>
                  {!n.read && (
                    <button onClick={() => markRead(n.id)} className="text-xs font-medium text-sky-800 hover:underline">
                      Marcar leída
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </>
  );
}