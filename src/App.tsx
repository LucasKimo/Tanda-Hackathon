import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import './App.css'


function App() {
  const [eventId, setEventId] = useState("TANDA");
  const baseUrl = "https://mixr.vercel.app/join"; // 나중에 배포 URL로 변경

  const qrUrl = `${baseUrl}?eventId=${eventId}`;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Mixr QR Generator</h1>

      <input
        value={eventId}
        onChange={(e) => setEventId(e.target.value)}
        placeholder="Event ID"
        style={{ padding: "8px", marginBottom: "20px" }}
      />

      <div style={{ marginTop: "20px" }}>
        <QRCodeCanvas value={qrUrl} size={200} />
      </div>

      <p style={{ marginTop: "10px" }}>{qrUrl}</p>
    </div>
  );
}

export default App;
