import './Trust.css';

export default function Trust() {
    const reviews = [
        {
            text: "¡El equipo de Babysis es increíble! Mis hijos siempre quedan felices y yo muy tranquila.",
            author: "Carolina M.",
            role: "Mamá de Lucas y Sofía"
        },
        {
            text: "Gran servicio, muy profesional. Nos salvó el fin de semana para poder asistir a un matrimonio.",
            author: "Felipe R.",
            role: "Papá de Mateo"
        },
        {
            text: "Me encanta que sean estudiantes del área de la salud, me da mucha confianza dejar a mi bebé.",
            author: "Andrea S.",
            role: "Mamá de Amanda"
        },
        {
            text: "Contratamos el servicio de Babysitter Fijo y ha sido la mejor decisión para nuestra rutina familiar.",
            author: "Loreto V.",
            role: "Mamá de Agustín"
        },
        {
            text: "Gracias Babysis por la puntualidad y el cariño con el que trataron a mis mellizos.",
            author: "Ignacio B.",
            role: "Papá de Tomás y Martín"
        },
        {
            text: "La estimulación temprana que hacen es real. Mi hijo avanza muchísimo cada vez que vienen.",
            author: "Valentina P.",
            role: "Mamá de Simón"
        },
        {
            text: "Excelente experiencia. Reservar por WhatsApp fue súper rápido y la atención un 7.",
            author: "Camila D.",
            role: "Mamá de Emilia"
        },
        {
            text: "Las chicas de Babysis son un amor. Se nota la vocación y preparación que tienen.",
            author: "Patricia L.",
            role: "Abuela de Vicente"
        },
        {
            text: "Primera vez que dejaba a mis hijos con alguien externo y la experiencia fue inmejorable.",
            author: "Roberto G.",
            role: "Papá de Julieta"
        },
        {
            text: "Súper responsables y atentas. Me mandaron fotos durante la noche para que estuviera tranquila.",
            author: "Isabel M.",
            role: "Mamá de Diego"
        },
        {
            text: "El servicio de Jardín en Casa le cambió la vida a mi hija, aprende jugando en su propio espacio.",
            author: "Fernanda T.",
            role: "Mamá de Emma"
        },
        {
            text: "Recomendadas al 100%. Se nota el respaldo profesional detrás de cada niñera.",
            author: "Javier O.",
            role: "Papá de León"
        }
    ];

    return (
        <section id="trust" className="section trust-section">
            <div className="container">
                <div className="section-header text-center">
                    <span className="section-subtitle">Confianza</span>
                    <h2 className="section-title">Familias Felices</h2>
                </div>

                <div className="carousel-container">
                    <button className="carousel-btn prev" onClick={() => {
                        const container = document.querySelector('.reviews-carousel');
                        if (container) container.scrollBy({ left: -350, behavior: 'smooth' });
                    }}>❮</button>

                    <div className="reviews-carousel">
                        {reviews.map((review, index) => (
                            <div className="review-card" key={index}>
                                <div className="stars">★★★★★</div>
                                <p className="review-text">"{review.text}"</p>
                                <div className="review-author">
                                    <div className="author-avatar">{review.author[0]}</div>
                                    <div>
                                        <div className="author-name">{review.author}</div>
                                        <div className="author-role">{review.role}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button className="carousel-btn next" onClick={() => {
                        const container = document.querySelector('.reviews-carousel');
                        if (container) container.scrollBy({ left: 350, behavior: 'smooth' });
                    }}>❯</button>
                </div>



            </div>
        </section>
    );
}
