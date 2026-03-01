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

    return (
        <nav className="navbar">
            <div className="container navbar-container">
                <a href="#" className="logo">
                    Baby<span className="logo-accent">sis</span>
                </a>

                <button className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </button>

                <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
                    <li><a href="#about" onClick={handleAboutClick}>Sobre Nosotras</a></li>
                    <li><a href="#services" onClick={() => setIsOpen(false)}>Servicios</a></li>
                    <li><a href="#trust" onClick={() => setIsOpen(false)}>Testimonios</a></li>
                    <li><a href="#contact" className="btn-primary" onClick={() => setIsOpen(false)}>Reservar</a></li>
                </ul>
            </div>
        </nav>
    );
}
