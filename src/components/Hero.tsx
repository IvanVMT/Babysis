import './Hero.css';


interface HeroProps {
    onOpenAbout: () => void;
}

export default function Hero({ onOpenAbout }: HeroProps) {
    const handleReservarClick = (e: React.MouseEvent) => {
        e.preventDefault();
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="hero section">
            <div className="container hero-container">
                <div className="hero-content">
                    <span className="hero-tag">Cuidado con Amor</span>
                    <h1 className="hero-title">
                        Tu tranquilidad,<br />
                        <span className="text-highlight">nuestra prioridad</span>
                    </h1>
                    <p className="hero-description">
                        Servicio de niñera personalizado y confiable.
                        Creamos un ambiente seguro y divertido para tus pequeños,
                        porque sabemos que son lo más importante.
                    </p>
                    <div className="hero-actions">
                        <a href="#contact" className="btn-primary" onClick={handleReservarClick}>Reservar Cita</a>
                        <button onClick={onOpenAbout} className="btn-secondary">Quiénes Somos</button>
                    </div>


                </div>

                <div className="hero-image-wrapper">
                    <div className="image-blob"></div>
                    <img
                        src="hero-nanny.png"
                        alt="Niñera leyendo un libro a un niño feliz"
                        className="hero-image"
                    />
                    <span className="hero-sticker sticker-star" aria-hidden="true">⭐</span>
                    <span className="hero-sticker sticker-heart" aria-hidden="true">💛</span>
                </div>
            </div>
        </section>
    );
}
