
export default function Footer() {
    return (
        <footer style={{
            backgroundColor: 'var(--color-secondary)',
            color: 'var(--color-text)',
            padding: '3rem 0',
            textAlign: 'center'
        }}>
            <div className="container">
                <div style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem' }}>
                    Babysis
                </div>
                <p style={{ opacity: 0.9, marginBottom: '2rem' }}>
                    Cuidado infantil con corazón y profesionalismo.
                </p>

                <div style={{ marginBottom: '2rem' }}>
                    <a href="https://instagram.com/babysis.cl" target="_blank" rel="noopener noreferrer" style={{
                        color: 'var(--color-primary)',
                        textDecoration: 'none',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.5rem 1rem',
                        border: '2px solid var(--color-primary)',
                        borderRadius: '50px',
                        fontWeight: '600',
                        transition: 'all 0.2s'
                    }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.backgroundColor = 'var(--color-primary)';
                            e.currentTarget.style.color = 'white';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.color = 'var(--color-primary)';
                        }}
                    >
                        <span>📷</span> Instagram
                    </a>
                </div>
                <p style={{ fontSize: '0.9rem', opacity: 0.7 }}>
                    &copy; {new Date().getFullYear()} Babysis. Todos los derechos reservados.
                </p>
            </div>
        </footer>
    );
}
