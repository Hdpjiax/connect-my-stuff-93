import { createFileRoute, Link } from "@tanstack/react-router";
import { LegalLayout } from "@/components/legal-layout";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Política de privacidad · VuelosDk" },
      {
        name: "description",
        content:
          "Cómo VuelosDk recoge, usa, comparte y protege tus datos personales, y cómo puedes ejercer tus derechos.",
      },
      { property: "og:title", content: "Política de privacidad · VuelosDk" },
      {
        property: "og:description",
        content:
          "Tratamiento de datos personales, bases legales, plazos de conservación y derechos del usuario en VuelosDk.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <LegalLayout
      eyebrow="Protección de datos"
      title="Política de privacidad"
      updated="19 de julio de 2026"
      intro="En VuelosDk nos tomamos en serio tu privacidad. Este documento explica qué datos recopilamos, con qué finalidad, en qué bases legales nos apoyamos y qué derechos puedes ejercer."
    >
      <section>
        <h2>1. Responsable del tratamiento</h2>
        <p>
          El responsable del tratamiento es VuelosDk. Puedes contactarnos en{" "}
          <a href="mailto:privacy@vuelosdk.com">privacy@vuelosdk.com</a> para cualquier
          cuestión relacionada con tus datos personales.
        </p>
      </section>

      <section>
        <h2>2. Datos que recopilamos</h2>
        <ul>
          <li>
            <strong>Datos de cuenta:</strong> nombre, correo electrónico y credenciales cifradas cuando creas una cuenta.
          </li>
          <li>
            <strong>Datos de reserva:</strong> pasajeros, documentos de viaje, fechas, origen y destino.
          </li>
          <li>
            <strong>Datos de pago:</strong> procesados por proveedores certificados PCI-DSS; VuelosDk no almacena los datos completos de la tarjeta.
          </li>
          <li>
            <strong>Datos técnicos:</strong> dirección IP, dispositivo, navegador y páginas visitadas.
          </li>
          <li>
            <strong>Comunicaciones:</strong> mensajes que nos envías a través de soporte o correo.
          </li>
        </ul>
      </section>

      <section>
        <h2>3. Finalidades y bases legales</h2>
        <ul>
          <li><strong>Ejecución del contrato:</strong> gestionar reservas, pagos y atención al cliente.</li>
          <li><strong>Obligación legal:</strong> cumplir con normativa fiscal, contable y de seguridad aérea.</li>
          <li><strong>Interés legítimo:</strong> prevención de fraude, mejora del servicio y seguridad del Sitio.</li>
          <li><strong>Consentimiento:</strong> envío de comunicaciones comerciales, cookies no esenciales y personalización avanzada.</li>
        </ul>
      </section>

      <section>
        <h2>4. Con quién compartimos tus datos</h2>
        <ul>
          <li>Aerolíneas y proveedores necesarios para emitir el billete (por ejemplo, Aeroméxico, Viva Aerobus, Volaris).</li>
          <li>Procesadores de pago y prevención de fraude.</li>
          <li>Proveedores de infraestructura, alojamiento y analítica bajo contrato de encargo del tratamiento.</li>
          <li>Autoridades competentes cuando exista requerimiento legal.</li>
        </ul>
        <p>
          Algunos proveedores pueden estar ubicados fuera del país del usuario. En esos
          casos aplicamos garantías adecuadas como cláusulas contractuales tipo.
        </p>
      </section>

      <section>
        <h2>5. Plazos de conservación</h2>
        <p>
          Conservamos tus datos durante el tiempo necesario para prestar el servicio y,
          después, durante los plazos exigidos por la normativa fiscal y de prescripción
          de acciones legales. Los datos de marketing se conservan hasta que retires tu
          consentimiento.
        </p>
      </section>

      <section>
        <h2>6. Tus derechos</h2>
        <p>Puedes ejercer, en cualquier momento y de forma gratuita, los derechos de:</p>
        <ul>
          <li>Acceso, rectificación y supresión.</li>
          <li>Oposición y limitación del tratamiento.</li>
          <li>Portabilidad de tus datos.</li>
          <li>Retirar el consentimiento otorgado.</li>
          <li>Presentar una reclamación ante la autoridad de control competente.</li>
        </ul>
        <p>
          Escribe a <a href="mailto:privacy@vuelosdk.com">privacy@vuelosdk.com</a>{" "}
          indicando el derecho que deseas ejercer. Podremos solicitarte información
          adicional para verificar tu identidad.
        </p>
      </section>

      <section>
        <h2>7. Seguridad</h2>
        <p>
          Aplicamos medidas técnicas y organizativas razonables — cifrado en tránsito,
          control de accesos, registro de actividad y revisión periódica — para proteger
          tus datos frente a accesos no autorizados, pérdida o alteración.
        </p>
      </section>

      <section>
        <h2>8. Menores</h2>
        <p>
          El servicio está dirigido a mayores de edad. Los menores solo pueden viajar como
          pasajeros incluidos en una reserva creada por un adulto responsable.
        </p>
      </section>

      <section>
        <h2>9. Cambios</h2>
        <p>
          Podemos actualizar esta política para reflejar cambios legales o del servicio.
          Publicaremos la versión vigente en esta página con su fecha de actualización.
          Consulta también nuestra <Link to="/cookies">Política de Cookies</Link>.
        </p>
      </section>
    </LegalLayout>
  );
}