import './AboutModal.css';

interface AboutModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AboutModal({ isOpen, onClose }: AboutModalProps) {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>&times;</button>
                <h2 className="modal-title">Sobre Nosotras</h2>
                <div className="modal-body">
                    <p>
                        En <strong>Babysis</strong> somos una pyme de estudiantes y egresadas de carreras relacionadas con la educación y salud.
                    </p>
                    <p>Nuestro equipo está formado por profesionales en áreas como:</p>
                    <ul className="modal-list">
                        <li>✨ Pedagogía</li>
                        <li>✨ Terapia Ocupacional</li>
                        <li>✨ Obstetricia y Puericultura</li>
                        <li>✨ Fonoaudiología</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
