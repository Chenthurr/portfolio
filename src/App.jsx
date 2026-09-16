import { Routes, Route } from 'react-router-dom';
import { DataProvider } from './components/DataContext';
import CustomCursor from './components/CustomCursor';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import AnimatedBackground from './components/AnimatedBackground';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Skills from './pages/Skills';
import Experience from './pages/Experience';
import Achievements from './pages/Achievements';
import Certifications from './pages/Certifications';
import Resume from './pages/Resume';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import { useData } from './components/DataContext';

function AppContent() {
  const { settings } = useData();
  return (
    <div className="site-shell">
      <LoadingScreen />
      <AnimatedBackground />
      <CustomCursor />
      <Navigation />
      <main className="site-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/certifications" element={<Certifications />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
      <Footer settings={settings} />
    </div>
  );
}

export default function App() {
  return (
    <DataProvider>
      <AppContent />
    </DataProvider>
  );
}
