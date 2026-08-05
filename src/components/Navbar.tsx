import { useState } from 'react';
import './Navbar.css';

interface NavbarProps {
    onOpenAbout: () => void;
}

export default function Navbar({ onOpenAbout }: NavbarProps) {
    const [isOpen, setIsOpen] = useState(false);

    const handleAboutClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsOpen(false);
        onOpenAbout();
    };

    const handleReservarClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsOpen(false);
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <nav className="navbar">
            <div className="container navbar-container">
                <a href="#" className="logo">
                    Baby<span className="logo-accent">sis</span>
                </a>

                <div className="navbar-actions">
                    <a href="#contact" className="btn-primary" onClick={handleReservarClick}>Reservar</a>

                    <button className="menu-toggle" onClick={() => setIsOpen(!isOpen)} aria-label="Abrir menú">
                        <span className="bar"></span>
                        <span className="bar"></span>
                        <span className="bar"></span>
                    </button>

                    <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
                        <li><a href="#about" onClick={handleAboutClick}>Sobre Nosotras</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
