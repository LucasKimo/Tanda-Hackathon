import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import QRGenerator from './pages/QRGenerator';
import AttendeeApp from './AttendeeApp';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<QRGenerator />} />
        <Route path="/attendee" element={<AttendeeApp />} />

      </Routes>
    </Router>
  );
}

export default App;

// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import AttendeeApp from './AttendeeApp';
// import QRGenerator from './pages/QRGenerator';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* Attendee flow (what you built in AttendeeApp.tsx) */}
//         <Route path="/" element={<AttendeeApp />} />

//         {/* Host QR generator view */}
//         <Route path="/host" element={<QRGenerator />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;