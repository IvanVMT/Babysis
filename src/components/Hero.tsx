import './Hero.css';


interface HeroProps {
    onOpenAbout: () => void;
}

export default function Hero({ onOpenAbout }: HeroProps) {
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
                        <a href="#contact" className="btn-primary">Reservar Cita</a>
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
                </div>
            </div>
        </section>
    );
}
