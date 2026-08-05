import './Services.css';

export default function Services() {
    const services = [
        {
            title: "Babysitter Casual",
            description: "Flexibilidad total para esas salidas imprevistas, cenas o compromisos de última hora.",
            icon: "🌙",
            color: "coral"
        },
        {
            title: "Babysitter Fijo",
            description: "Apoyo estable para tu rutina semanal. Horarios garantizados y la misma niñera siempre.",
            icon: "📅",
            color: "sky"
        },
        {
            title: "Babysitter Nocturno",
            description: "Descansa tranquila toda la noche. Nos encargamos de todo mientras tú recargas energías.",
            icon: "💤",
            color: "grape"
        },
        {
            title: "Jardín en Casa",
            description: "La experiencia preescolar en la comodidad de tu hogar. Actividades lúdicas y educativas seguras.",
            icon: "🏠",
            color: "mint"
        },
        {
            title: "Clases Particulares",
            description: "Refuerzo escolar personalizado. Modalidad online o presencial para apoyar su aprendizaje.",
            icon: "📚",
            color: "sunshine"
        },
        {
            title: "Estimulación Temprana",
            description: "Ejercicios y juegos especializados para potenciar el desarrollo cognitivo y motor de tu bebé.",
            icon: "🧸",
            color: "coral"
        }
    ];

    return (
        <section id="services" className="section bg-white">
            <div className="container">
                <div className="section-header text-center">
                    <span className="section-subtitle">Nuestros Servicios</span>
                    <h2 className="section-title">Cuidado adaptado a tu familia</h2>
                </div>

                <div className="services-grid">
                    {services.map((service, index) => (
                        <div className={`service-card service-card--${service.color}`} key={index}>
                            <div className="service-icon">{service.icon}</div>
                            <h3 className="service-title">{service.title}</h3>
                            <p className="service-description">{service.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
