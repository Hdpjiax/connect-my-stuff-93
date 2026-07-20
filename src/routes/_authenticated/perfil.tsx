import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, PageHeader } from "@/components/DashboardShell";

export const Route = createFileRoute("/_authenticated/perfil")({
  head: () => ({ meta: [{ title: "Perfil — VuelosDk" }, { name: "robots", content: "noindex" }] }),
  component: Profile,
});

function Profile() {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) return;
      setEmail(u.user.email ?? "");
      const { data } = await supabase.from("profiles").select("*").eq("id", u.user.id).maybeSingle();
      if (data) {
        setFullName(data.full_name ?? "");
        setPhone(data.phone ?? "");
        setCompany(data.company_name ?? "");
      }
    })();
  }, []);

  async function save(e: FormEvent) {
    e.preventDefault();
    setMsg(null);
    const { data: u } = await supabase.auth.getUser();
    if (!u.user) return;
    const { error } = await supabase
      .from("profiles")
      .update({ full_name: fullName, phone, company_name: company })
      .eq("id", u.user.id);
    setMsg(error ? error.message : "Perfil actualizado.");
  }

  const input =
    "w-full rounded-xl border border-neutral-300 bg-white px-3 py-2.5 text-sm outline-none focus:border-neutral-900";
  const label = "text-xs font-medium uppercase tracking-wider text-neutral-500";

  return (
    <>
      <PageHeader title="Mi perfil" subtitle="Actualiza tus datos personales." />
      <Card className="max-w-2xl">
        <form onSubmit={save} className="space-y-4">
          <div>
            <label className={label}>Correo</label>
            <input value={email} disabled className={input + " opacity-60"} />
          </div>
          <div>
            <label className={label}>Nombre completo</label>
            <input value={fullName} onChange={(e) => setFullName(e.target.value)} className={input} />
          </div>
          <div>
            <label className={label}>Teléfono</label>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} className={input} />
          </div>
          <div>
            <label className={label}>Empresa</label>
            <input value={company} onChange={(e) => setCompany(e.target.value)} className={input} />
          </div>
          {msg && <p className="rounded-lg bg-neutral-50 px-3 py-2 text-sm">{msg}</p>}
          <button className="rounded-full bg-neutral-900 px-6 py-2.5 text-sm font-medium text-white">Guardar</button>
        </form>
      </Card>
    </>
  );
}