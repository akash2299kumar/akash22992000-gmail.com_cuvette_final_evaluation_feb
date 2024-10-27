import React from "react";
import Login from "../components/Login/Login";
import FrontPageContent from "../components/FrontPageContent/FrontPageContent";

export default function LoginPage() {
  return (
    <div
      style={{
        display: "flex",
        backgroundColor:"black",
        minHeight:"100vh"
      }}
    >
      <FrontPageContent />
      <Login />
    </div>
  );
}
