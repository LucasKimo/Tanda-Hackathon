import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

function QRGenerator() {
  const [eventId] = useState("TANDA");
  const baseUrl = "https://tanda-hackathon-wecc.vercel.app/create-profile";
  const qrUrl = `${baseUrl}?eventId=${eventId}`;

  return (
    <div style={{
      padding: "20px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      overflow: "hidden",
      boxSizing: "border-box"
    }}>
      <h1 style={{ margin: "0 0 10px 0" }}>BRKR</h1>
      <h2 style={{ fontSize: "32px", margin: "0 0 20px 0" }}>
        Event: TANDA
      </h2>
      <div style={{ textAlign: "center" }}>
        <QRCodeCanvas value={qrUrl} size={400} />
      </div>
      <p style={{ marginTop: "10px", fontSize: "14px" }}>{qrUrl}</p>
    </div>
  );
}

export default QRGenerator;