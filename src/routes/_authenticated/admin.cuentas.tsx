import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, PageHeader } from "@/components/DashboardShell";

export const Route = createFileRoute("/_authenticated/admin/cuentas")({
  head: () => ({ meta: [{ title: "Cuentas bancarias — VuelosDk" }, { name: "robots", content: "noindex" }] }),
  component: AdminBanks,
});

function AdminBanks() {
  const [rows, setRows] = useState<any[]>([]);
  const [bank, setBank] = useState("");
  const [holder, setHolder] = useState("");
  const [clabe, setClabe] = useState("");

  async function load() {
    const { data } = await supabase.from("bank_accounts").select("*").order("created_at", { ascending: false });
    setRows(data ?? []);
  }
  useEffect(() => {
    load();
  }, []);

  async function add(e: FormEvent) {
    e.preventDefault();
    const { data: u } = await supabase.auth.getUser();
    if (!u.user) return;
    await supabase.from("bank_accounts").insert({
      admin_id: u.user.id,
      bank_name: bank,
      account_holder: holder,
      clabe,
      active: true,
    });
    setBank("");
    setHolder("");
    setClabe("");
    load();
  }

  async function toggle(id: string, active: boolean) {
    await supabase.from("bank_accounts").update({ active: !active }).eq("id", id);
    load();
  }

  const input = "w-full rounded-xl border border-neutral-300 bg-white px-3 py-2 text-sm outline-none focus:border-neutral-900";

  return (
    <>
      <PageHeader title="Cuentas bancarias" subtitle="Cuentas para recibir pagos." />
      <div className="grid gap-6 lg:grid-cols-[1fr_1.5fr]">
        <Card>
          <h2 className="mb-4 text-lg font-semibold">Nueva cuenta</h2>
          <form onSubmit={add} className="space-y-3">
            <input placeholder="Banco" value={bank} onChange={(e) => setBank(e.target.value)} className={input} required />
            <input placeholder="Titular" value={holder} onChange={(e) => setHolder(e.target.value)} className={input} required />
            <input placeholder="CLABE" value={clabe} onChange={(e) => setClabe(e.target.value)} className={input} required />
            <button className="w-full rounded-full bg-neutral-900 px-6 py-2.5 text-sm font-medium text-white">Agregar</button>
          </form>
        </Card>
        <Card>
          <h2 className="mb-4 text-lg font-semibold">Cuentas registradas</h2>
          <div className="space-y-3">
            {rows.map((b) => (
              <div key={b.id} className="flex items-center justify-between rounded-xl border border-neutral-200 p-3">
                <div>
                  <p className="font-medium">{b.bank_name}</p>
                  <p className="text-sm text-neutral-600">{b.account_holder}</p>
                  <p className="text-xs text-neutral-500">CLABE: {b.clabe}</p>
                </div>
                <button
                  onClick={() => toggle(b.id, b.active)}
                  className={`rounded-full border px-3 py-1 text-xs ${
                    b.active ? "border-emerald-200 bg-emerald-50 text-emerald-800" : "border-neutral-300"
                  }`}
                >
                  {b.active ? "Activa" : "Inactiva"}
                </button>
              </div>
            ))}
            {rows.length === 0 && <p className="py-4 text-center text-sm text-neutral-500">Sin cuentas registradas.</p>}
          </div>
        </Card>
      </div>
    </>
  );
}