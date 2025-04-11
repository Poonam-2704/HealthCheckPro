import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Questions';
import Results from './components/Results';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </Router>
  );
}

export default App;
