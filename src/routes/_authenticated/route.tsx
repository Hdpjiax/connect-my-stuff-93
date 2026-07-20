import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { DashboardShell } from "@/components/DashboardShell";

export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) throw redirect({ to: "/login" });
    return { user: data.user };
  },
  component: AuthedLayout,
});

function AuthedLayout() {
  const { user } = Route.useRouteContext();
  const [role, setRole] = useState<"admin" | "user" | null>(null);

  useEffect(() => {
    let mounted = true;
    supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .maybeSingle()
      .then(({ data }) => {
        if (!mounted) return;
        setRole((data?.role as "admin" | "user") ?? "user");
      });
    return () => {
      mounted = false;
    };
  }, [user.id]);

  if (!role) {
    return (
      <div className="grid min-h-dvh place-items-center bg-neutral-50 text-sm text-neutral-500">
        Cargando panel…
      </div>
    );
  }

  return (
    <DashboardShell role={role} userEmail={user.email ?? null}>
      <Outlet />
    </DashboardShell>
  );
}