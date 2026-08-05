import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Trust from './components/Trust';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AboutModal from './components/AboutModal';
import './App.css';

function App() {
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  return (
    <div className="app">
      <Navbar onOpenAbout={() => setIsAboutOpen(true)} />
      <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />

      <main>
        <Hero onOpenAbout={() => setIsAboutOpen(true)} />
        <Services />
        <Trust />
        <Contact />
      </main>

      <Footer />
    </div>
  )
}

export default App

