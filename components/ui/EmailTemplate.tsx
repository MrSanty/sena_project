import * as React from "react";

interface WelcomeEmailTemplateProps {
  name: string;
  company: string;
}

export const WelcomeEmailTemplate: React.FC<WelcomeEmailTemplateProps> = ({
  name,
  company,
}) => (
  <div
    style={{
      fontFamily: "Arial, sans-serif",
      lineHeight: "1.6",
      color: "#333",
      maxWidth: "600px",
      margin: "0 auto",
      border: "1px solid #ddd",
      borderRadius: "8px",
      padding: "20px",
      backgroundColor: "#f9f9f9",
    }}
  >
    <h1 style={{ color: "#4CAF50", textAlign: "center" }}>
      ¡Bienvenido a {company}!
    </h1>
    <p>Hola {name},</p>
    <p>
      ¡Estamos encantados de tenerte con nosotros! En {company}, nos esforzamos
      por brindar la mejor experiencia a nuestros usuarios y estamos emocionados
      de que formes parte de nuestra comunidad.
    </p>
    <p>
      Ya sea que estés aquí para explorar, aprender o crecer, estamos aquí para
      ayudarte en cada paso del camino. Si alguna vez tienes preguntas,
      necesitas ayuda o simplemente quieres saludarnos, no dudes en contactarnos.
    </p>
    <p>
      Puedes comunicarte con nuestro equipo de soporte en{" "}
      <a
        href={`mailto:sr.santyquinteror@gmail.com`}
        style={{ color: "#4CAF50", textDecoration: "none" }}
      >
        sr.santyquinteror@gmail.com
      </a>
      .
    </p>
    <p>
      Gracias por elegir {company}. ¡Estamos emocionados por ver todo lo que
      lograrás!
    </p>
    <p style={{ fontStyle: "italic", color: "#777" }}>
      Con los mejores deseos,
      <br />
      El equipo de {company}
    </p>
    <footer
      style={{
        marginTop: "20px",
        fontSize: "12px",
        color: "#999",
        textAlign: "center",
      }}
    >
      &copy; {new Date().getFullYear()} {company}. Todos los derechos reservados.
    </footer>
  </div>
);
