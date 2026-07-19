import { createFileRoute, Link } from "@tanstack/react-router";
import { LegalLayout } from "@/components/legal-layout";

export const Route = createFileRoute("/legal")({
  head: () => ({
    meta: [
      { title: "Aviso legal · VuelosDk" },
      {
        name: "description",
        content:
          "Aviso legal de VuelosDk: información del responsable, condiciones generales de uso y marco normativo aplicable a la plataforma de reserva de vuelos.",
      },
      { property: "og:title", content: "Aviso legal · VuelosDk" },
      {
        property: "og:description",
        content:
          "Información del responsable y condiciones generales de uso de VuelosDk.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: LegalPage,
});

function LegalPage() {
  return (
    <LegalLayout
      eyebrow="Documento oficial"
      title="Aviso legal"
      updated="19 de julio de 2026"
      intro="Este aviso legal regula el uso del sitio VuelosDk y describe la información que la normativa aplicable exige poner a disposición de los usuarios."
    >
      <section>
        <h2>1. Titularidad del sitio</h2>
        <p>
          El sitio web accesible desde este dominio (en adelante, "VuelosDk" o el "Sitio") es
          operado por el titular indicado en la sección de contacto. VuelosDk actúa como
          intermediario tecnológico que facilita la búsqueda, comparación y reserva de
          vuelos ofrecidos por aerolíneas y proveedores terceros.
        </p>
      </section>

      <section>
        <h2>2. Objeto</h2>
        <p>
          Las presentes condiciones regulan el acceso y uso del Sitio. La navegación,
          consulta de tarifas o realización de una reserva implica la aceptación expresa
          de este aviso legal, de los <Link to="/terms">Términos y Condiciones</Link> y de
          la <Link to="/privacy">Política de Privacidad</Link>.
        </p>
      </section>

      <section>
        <h2>3. Condiciones de uso</h2>
        <ul>
          <li>El usuario se compromete a hacer un uso lícito, diligente y de buena fe del Sitio.</li>
          <li>Queda prohibido introducir información falsa, suplantar identidades o intentar acceder a áreas restringidas.</li>
          <li>VuelosDk podrá suspender el acceso ante usos indebidos, fraudulentos o que vulneren derechos de terceros.</li>
        </ul>
      </section>

      <section>
        <h2>4. Propiedad intelectual e industrial</h2>
        <p>
          Todos los contenidos del Sitio — incluyendo textos, gráficos, logotipos, iconos,
          código, diseños y marcas — están protegidos por derechos de propiedad
          intelectual e industrial. Su reproducción, distribución, transformación o
          comunicación pública sin autorización previa y por escrito está prohibida.
        </p>
      </section>

      <section>
        <h2>5. Responsabilidad</h2>
        <p>
          VuelosDk realiza esfuerzos razonables para mantener la información actualizada,
          pero no garantiza la disponibilidad continua del Sitio ni la exactitud absoluta
          de tarifas, horarios o disponibilidad, ya que dependen de terceros. La relación
          contractual del transporte aéreo se establece entre el usuario y la aerolínea
          emisora del billete.
        </p>
      </section>

      <section>
        <h2>6. Enlaces a terceros</h2>
        <p>
          El Sitio puede contener enlaces a plataformas de aerolíneas o proveedores
          externos. VuelosDk no controla ni asume responsabilidad por sus contenidos,
          políticas o prácticas.
        </p>
      </section>

      <section>
        <h2>7. Legislación aplicable</h2>
        <p>
          Este aviso legal se rige por la legislación aplicable al domicilio del titular.
          Cualquier controversia se someterá a los tribunales competentes salvo que la
          normativa de consumo disponga otra cosa.
        </p>
      </section>

      <section>
        <h2>8. Contacto</h2>
        <p>
          Para cualquier consulta relacionada con este aviso legal puedes escribir a{" "}
          <a href="mailto:legal@vuelosdk.com">legal@vuelosdk.com</a>.
        </p>
      </section>
    </LegalLayout>
  );
}