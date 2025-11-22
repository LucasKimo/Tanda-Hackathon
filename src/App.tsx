import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateProfile from './components/CreateProfile';
import SwipeCard from './components/SwipeCard';
import GetTalking from './components/GetTalking';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CreateProfile />} />
        <Route path="/swipe" element={<SwipeCard />} />
        <Route path="/get-talking" element={<GetTalking />} />
      </Routes>
    </Router>
  );
}

export default App;
