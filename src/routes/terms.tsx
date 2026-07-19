import { createFileRoute, Link } from "@tanstack/react-router";
import { LegalLayout } from "@/components/legal-layout";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Términos y condiciones · VuelosDk" },
      {
        name: "description",
        content:
          "Condiciones que regulan la reserva de vuelos, pagos, cambios, cancelaciones y responsabilidades en VuelosDk.",
      },
      { property: "og:title", content: "Términos y condiciones · VuelosDk" },
      {
        property: "og:description",
        content:
          "Reglas del servicio VuelosDk: reservas, pagos, cambios, cancelaciones y limitación de responsabilidad.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <LegalLayout
      eyebrow="Contrato de servicio"
      title="Términos y condiciones"
      updated="19 de julio de 2026"
      intro="Estos términos rigen la relación entre VuelosDk y el usuario que utiliza la plataforma para buscar, comparar o reservar vuelos."
    >
      <section>
        <h2>1. Aceptación</h2>
        <p>
          Al utilizar VuelosDk aceptas estos términos, el{" "}
          <Link to="/legal">Aviso Legal</Link> y la{" "}
          <Link to="/privacy">Política de Privacidad</Link>. Si no estás de acuerdo, no
          uses el servicio.
        </p>
      </section>

      <section>
        <h2>2. Naturaleza del servicio</h2>
        <p>
          VuelosDk es un intermediario tecnológico. El contrato de transporte se celebra
          directamente entre el pasajero y la aerolínea, y se rige por las condiciones
          particulares de esta y por los convenios internacionales aplicables (Montreal y
          Varsovia, cuando corresponda).
        </p>
      </section>

      <section>
        <h2>3. Cuenta de usuario</h2>
        <ul>
          <li>Debes proporcionar datos veraces y mantenerlos actualizados.</li>
          <li>Eres responsable de la confidencialidad de tus credenciales.</li>
          <li>Notifícanos cualquier uso no autorizado a <a href="mailto:soporte@vuelosdk.com">soporte@vuelosdk.com</a>.</li>
        </ul>
      </section>

      <section>
        <h2>4. Reservas y pagos</h2>
        <ul>
          <li>El precio final incluye impuestos y cargos aplicables mostrados antes de confirmar.</li>
          <li>La reserva se emite una vez confirmado el pago por el proveedor.</li>
          <li>La disponibilidad y tarifas pueden cambiar hasta el momento de la emisión.</li>
          <li>El usuario es responsable de revisar nombres, fechas y documentación antes de confirmar.</li>
        </ul>
      </section>

      <section>
        <h2>5. Cambios, cancelaciones y reembolsos</h2>
        <p>
          Los cambios, cancelaciones y reembolsos están sujetos a las políticas de la
          aerolínea o proveedor emisor. VuelosDk gestionará la solicitud dentro de dichas
          políticas y podrá aplicar un cargo de gestión informado previamente.
        </p>
      </section>

      <section>
        <h2>6. Obligaciones del pasajero</h2>
        <ul>
          <li>Contar con documentación de viaje válida (pasaporte, visado, requisitos sanitarios).</li>
          <li>Presentarse en el aeropuerto con la antelación indicada por la aerolínea.</li>
          <li>Cumplir la normativa de equipaje y seguridad del transportista.</li>
        </ul>
      </section>

      <section>
        <h2>7. Limitación de responsabilidad</h2>
        <p>
          VuelosDk no responde por retrasos, cancelaciones, denegación de embarque,
          extravío de equipaje u otros hechos imputables a la aerolínea, autoridades o
          fuerza mayor. Nuestra responsabilidad, en la máxima medida permitida por la
          ley, se limita a los importes pagados a través de la plataforma por la reserva
          afectada.
        </p>
      </section>

      <section>
        <h2>8. Uso aceptable</h2>
        <p>
          Está prohibido usar el Sitio con fines fraudulentos, realizar scraping masivo,
          eludir medidas de seguridad o introducir contenido ilícito. Nos reservamos el
          derecho a suspender cuentas que incumplan estas reglas.
        </p>
      </section>

      <section>
        <h2>9. Modificaciones</h2>
        <p>
          Podemos actualizar estos términos por motivos legales, técnicos o de negocio.
          La versión vigente estará siempre publicada en esta página con su fecha de
          actualización.
        </p>
      </section>

      <section>
        <h2>10. Ley aplicable y jurisdicción</h2>
        <p>
          Estos términos se rigen por la legislación aplicable al domicilio del
          responsable. Los consumidores conservan los derechos que la normativa imperativa
          les reconozca en su lugar de residencia.
        </p>
      </section>

      <section>
        <h2>11. Contacto</h2>
        <p>
          Consultas: <a href="mailto:soporte@vuelosdk.com">soporte@vuelosdk.com</a>.
        </p>
      </section>
    </LegalLayout>
  );
}