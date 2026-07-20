import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/admin")({
  component: AdminGate,
});

function AdminGate() {
  const navigate = useNavigate();
  const [ok, setOk] = useState<boolean | null>(null);

  useEffect(() => {
    (async () => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) {
        navigate({ to: "/login", replace: true });
        return;
      }
      const { data } = await supabase.from("profiles").select("role").eq("id", u.user.id).maybeSingle();
      if (data?.role !== "admin") {
        navigate({ to: "/dashboard", replace: true });
        return;
      }
      setOk(true);
    })();
  }, [navigate]);

  if (!ok) return <p className="text-sm text-neutral-500">Verificando permisos…</p>;
  return <Outlet />;
}