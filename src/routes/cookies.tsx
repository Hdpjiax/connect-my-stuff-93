import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout } from "@/components/legal-layout";

export const Route = createFileRoute("/cookies")({
  head: () => ({
    meta: [
      { title: "Política de cookies · VuelosDk" },
      {
        name: "description",
        content:
          "Tipos de cookies que usa VuelosDk, sus finalidades y cómo gestionarlas o desactivarlas.",
      },
      { property: "og:title", content: "Política de cookies · VuelosDk" },
      {
        property: "og:description",
        content: "Uso de cookies técnicas, analíticas y de marketing en VuelosDk.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: CookiesPage,
});

function CookiesPage() {
  return (
    <LegalLayout
      eyebrow="Trazadores y almacenamiento"
      title="Política de cookies"
      updated="19 de julio de 2026"
      intro="Esta política describe las cookies y tecnologías similares que utilizamos en VuelosDk, para qué sirven y cómo puedes controlarlas."
    >
      <section>
        <h2>1. ¿Qué son las cookies?</h2>
        <p>
          Las cookies son pequeños archivos que se almacenan en tu dispositivo cuando
          visitas un sitio web. Permiten recordar información sobre tu visita, como el
          idioma preferido, la sesión iniciada u otras preferencias.
        </p>
      </section>

      <section>
        <h2>2. Tipos de cookies que usamos</h2>
        <ul>
          <li>
            <strong>Técnicas (necesarias):</strong> imprescindibles para la navegación, el
            inicio de sesión y la gestión de reservas. No requieren consentimiento.
          </li>
          <li>
            <strong>Preferencias:</strong> guardan opciones como el idioma o la moneda.
          </li>
          <li>
            <strong>Analíticas:</strong> nos ayudan a entender cómo se usa el Sitio y a
            mejorarlo. Se activan solo con tu consentimiento.
          </li>
          <li>
            <strong>Marketing:</strong> permiten mostrar publicidad relevante y medir
            campañas. Se activan solo con tu consentimiento.
          </li>
        </ul>
      </section>

      <section>
        <h2>3. Cookies de terceros</h2>
        <p>
          Algunos servicios integrados — como proveedores de analítica, mapas o pasarelas
          de pago — pueden instalar sus propias cookies. Su tratamiento se rige por las
          políticas de esos terceros.
        </p>
      </section>

      <section>
        <h2>4. Cómo gestionar las cookies</h2>
        <ul>
          <li>Puedes aceptar, rechazar o configurar las cookies desde el banner al entrar al Sitio.</li>
          <li>Puedes revocar tu consentimiento en cualquier momento borrando las cookies del navegador.</li>
          <li>Cada navegador ofrece opciones para bloquear o eliminar cookies (Chrome, Safari, Firefox, Edge).</li>
        </ul>
        <p>
          Ten en cuenta que si desactivas las cookies técnicas es posible que algunas
          funciones del Sitio dejen de funcionar correctamente.
        </p>
      </section>

      <section>
        <h2>5. Cambios en esta política</h2>
        <p>
          Podemos actualizar esta política cuando cambien los servicios o la normativa
          aplicable. La versión vigente estará siempre publicada en esta página.
        </p>
      </section>

      <section>
        <h2>6. Contacto</h2>
        <p>
          Para dudas sobre cookies escribe a{" "}
          <a href="mailto:privacy@vuelosdk.com">privacy@vuelosdk.com</a>.
        </p>
      </section>
    </LegalLayout>
  );
}