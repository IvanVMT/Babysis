import './Contact.css';

export default function Contact() {
    return (
        <section id="contact" className="section">
            <div className="container contact-container">
                <div className="contact-info">
                    <span className="section-subtitle">Contacto</span>
                    <h2 className="section-title">¿Listo/a para tener tiempo para ti?</h2>
                    <p className="contact-text">
                        Envíanos un WhatsApp presionando el botón de reservar indicando:
                    </p>
                    <ul className="contact-list">
                        <li>
                            <div style={{ lineHeight: '1.4' }}>
                                ✨ Servicio que desea<br />
                                <span style={{ fontSize: '0.85rem', color: 'var(--color-text-light)', fontWeight: '400', display: 'block', marginTop: '0.2rem' }}>
                                    Ej: Babysitter esporádico
                                </span>
                            </div>
                        </li>
                        <li>
                            <div style={{ lineHeight: '1.4' }}>
                                📅 Día/s y horario exacto<br />
                                <span style={{ fontSize: '0.85rem', color: 'var(--color-text-light)', fontWeight: '400', display: 'block', marginTop: '0.2rem' }}>
                                    Ej: Lunes y Martes de 10:00 a 14:00hrs y Jueves de 14:00 a 17:00hrs
                                </span>
                            </div>
                        </li>
                        <li>
                            <div style={{ lineHeight: '1.4' }}>
                                📍 Dirección y comuna<br />
                                <span style={{ fontSize: '0.85rem', color: 'var(--color-text-light)', fontWeight: '400', display: 'block', marginTop: '0.2rem' }}>
                                    Ej: Av. Andrés Bello 2425, Providencia
                                </span>
                            </div>
                        </li>
                        <li>
                            <div style={{ lineHeight: '1.4' }}>
                                👶 Edad del menor<br />
                                <span style={{ fontSize: '0.85rem', color: 'var(--color-text-light)', fontWeight: '400', display: 'block', marginTop: '0.2rem' }}>
                                    Ej: 1 año y 11 meses
                                </span>
                            </div>
                        </li>
                    </ul>

                    <div className="contact-methods">
                        <div className="method">
                            <span className="method-icon">📱</span>
                            <span>+56 9 2224 4956</span>
                        </div>
                    </div>
                </div>

                <div className="contact-form">
                    <p className="contact-cta-text">
                        ¡Reserva tu cita de forma rápida y directa!
                    </p>
                    <a href="https://wa.me/56922244956?text=Hola%20quisiera%20agendar%20un%20servicio%20por%20favor.%0A%0A•%20Servicio%20deseado:%0A%0A•%20Días%20y%20horario%20exacto:%0A%0A•%20Dirección%20y%20comuna:%0A%0A•%20Edad%20de%20el/la%20menor:" target="_blank" rel="noopener noreferrer" className="btn-whatsapp btn-block">
                        <span className="whatsapp-icon">💬</span> Reservar por WhatsApp
                    </a>
                </div>
            </div>
        </section>
    );
}
