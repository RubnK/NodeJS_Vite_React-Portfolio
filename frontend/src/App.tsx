import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Photos from './pages/Photos';
import Cv from './pages/Cv';
import Navbar from './components/Navbar';

export default function App() {
  return (
    <Router>
      <Navbar />
      <div className="pt-20 px-6">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cv" element={<Cv />} />
        <Route path="/projets" element={<Projects />} />
        <Route path="/photos" element={<Photos />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      </div>
    </Router>
  );
}
