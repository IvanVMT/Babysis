import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Calculator from './components/Calculator';
import Trust from './components/Trust';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AboutModal from './components/AboutModal';
import './App.css';

// Main Landing Page content
function LandingPage({ onOpenAbout }: { onOpenAbout: () => void }) {
  return (
    <main>
      <Hero onOpenAbout={onOpenAbout} />
      <Services />
      <Trust />
      <Contact />
    </main>
  );
}

// Private Calculator Page
function CalculatorPage() {
  return (
    <main style={{ paddingTop: '80px' }}> {/* Add padding to account for fixed navbar */}
      <Calculator />
    </main>
  );
}

function App() {
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  return (
    <div className="app">
      <Navbar onOpenAbout={() => setIsAboutOpen(true)} />
      <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />

      <Routes>
        <Route path="/" element={<LandingPage onOpenAbout={() => setIsAboutOpen(true)} />} />
        <Route path="/calculadora" element={<CalculatorPage />} />
      </Routes>

      <Footer />
    </div>
  )
}

export default App

