import * as React from "react";

interface WelcomeEmailTemplateProps {
  firstName: string;
  companyName: string;
  supportEmail: string;
}

export const WelcomeEmailTemplate = () => (
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
    <h1 style={{ color: "#4CAF50", textAlign: "center" }}>Welcome to Erp System</h1>
    <p>Hi there,</p>
    <p>
      We're thrilled to have you on board! At erp, we strive to provide the best experience for our users, and we're excited to have you join our community.
    </p>
    <p>
      Whether you're here to explore, learn, or grow, we are here to help you every step of the way. If you ever have questions, need assistance, or just want to say hello, don’t hesitate to reach out.
    </p>
    <p>
      You can contact our support team at{" "}
      <a href={`mailto:sr.santyquinteror@gmail.com`} style={{ color: "#4CAF50", textDecoration: "none" }}>
        sr.santyquinteror@gmail.com
      </a>
      .
    </p>
    <p>
      Thank you for choosing erp. We’re excited to see what you’ll accomplish!
    </p>
    <p style={{ fontStyle: "italic", color: "#777" }}>
      Best wishes,<br />
      The erp Team
    </p>
    <footer
      style={{
        marginTop: "20px",
        fontSize: "12px",
        color: "#999",
        textAlign: "center",
      }}
    >
      &copy; {new Date().getFullYear()} erp. All rights reserved.
    </footer>
  </div>
);