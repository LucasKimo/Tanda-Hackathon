// src/App.tsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import { AttendeeApp } from "./AttendeeApp";
import { HostApp } from "./HostApp";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AttendeeApp />} />
      <Route path="/host" element={<HostApp />} />
    </Routes>
  );
}
