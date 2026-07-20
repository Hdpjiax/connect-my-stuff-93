import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
} from "@tanstack/react-router";
import type { ReactNode } from "react";
import styles from "../styles.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "VuelosDk — Vuelos con estilo, sin fricción" },
      {
        name: "description",
        content:
          "Encuentra y reserva vuelos con Aeroméxico, Viva Aerobus y Volaris. Búsqueda inteligente, precios claros y una experiencia editorial.",
      },
      { property: "og:title", content: "VuelosDk" },
      {
        property: "og:description",
        content: "Vuelos con estilo, sin fricción.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: styles },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=DM+Sans:wght@400;500;600&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <head>
        <HeadContent />
      </head>
      <body className="min-h-dvh bg-background text-foreground antialiased">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function _Root() {
  return <Outlet />;
}
