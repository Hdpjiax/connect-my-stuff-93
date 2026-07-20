import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, PageHeader } from "@/components/DashboardShell";

export const Route = createFileRoute("/_authenticated/admin/usuarios")({
  head: () => ({ meta: [{ title: "Usuarios (admin) — VuelosDk" }, { name: "robots", content: "noindex" }] }),
  component: AdminUsers,
});

function AdminUsers() {
  const [rows, setRows] = useState<any[]>([]);

  async function load() {
    const { data } = await supabase.from("profiles").select("*").order("created_at", { ascending: false });
    setRows(data ?? []);
  }
  useEffect(() => {
    load();
  }, []);

  async function toggleRole(id: string, current: string) {
    const next = current === "admin" ? "user" : "admin";
    await supabase.from("profiles").update({ role: next as any }).eq("id", id);
    load();
  }

  return (
    <>
      <PageHeader title="Usuarios" subtitle="Gestiona roles y accesos." />
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] text-sm">
            <thead className="text-left text-xs uppercase tracking-wider text-neutral-500">
              <tr>
                <th className="py-2">Nombre</th>
                <th>Correo</th>
                <th>Rol</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {rows.map((u) => (
                <tr key={u.id}>
                  <td className="py-3 font-medium">{u.full_name || "—"}</td>
                  <td className="text-neutral-600">{u.email}</td>
                  <td>
                    <span
                      className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium ${
                        u.role === "admin"
                          ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                          : "border-neutral-200 bg-neutral-50 text-neutral-700"
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td className="text-right">
                    <button
                      onClick={() => toggleRole(u.id, u.role)}
                      className="rounded-full border border-neutral-300 px-3 py-1 text-xs hover:bg-neutral-50"
                    >
                      {u.role === "admin" ? "Quitar admin" : "Hacer admin"}
                    </button>
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={4} className="py-6 text-center text-neutral-500">
                    Sin usuarios.
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