import React from "react";
import Register from "../components/Register/Register";
import FrontPageContent from "../components/FrontPageContent/FrontPageContent";

export default function RegisterPage() {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
      }}
    >
      <FrontPageContent />
      <Register />
    </div>
  );
}
