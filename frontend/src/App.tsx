import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Photos from './pages/Photos';
import Cv from './pages/Cv';
import Error404 from './pages/Error404';
import AdminPanel from './pages/Admin';
import ProjectDetail from './pages/ProjectDetail';
import Navbar from './components/Navbar';

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cv" element={<Cv />} />
        <Route path="/projets" element={<Projects />} />
        <Route path="/photos" element={<Photos />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/projets/:id" element={<ProjectDetail />} />
        <Route path="*" element={<Error404 />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}
