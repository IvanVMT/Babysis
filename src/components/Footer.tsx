
export default function Footer() {
    return (
        <footer style={{
            backgroundColor: 'var(--color-secondary)',
            color: 'var(--color-text)',
            padding: '3rem 0',
            textAlign: 'center',
            borderTop: '3px solid var(--color-text)'
        }}>
            <div className="container">
                <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: '600', marginBottom: '1rem' }}>
                    Baby<span style={{ color: 'var(--color-primary)' }}>sis</span>
                </div>
                <p style={{ opacity: 0.85, marginBottom: '2rem' }}>
                    Cuidado infantil con corazón y profesionalismo.
                </p>

                <div style={{ marginBottom: '2rem' }}>
                    <a href="https://instagram.com/babysis.cl" target="_blank" rel="noopener noreferrer" style={{
                        color: 'var(--color-text)',
                        backgroundColor: '#fff',
                        textDecoration: 'none',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.5rem 1.25rem',
                        border: '2px solid var(--color-text)',
                        borderRadius: '50px',
                        fontFamily: 'var(--font-heading)',
                        fontWeight: '500',
                        transition: 'all 0.2s'
                    }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.transform = 'translateY(-2px)';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                        }}
                    >
                        <span>📷</span> Instagram
                    </a>
                </div>
                <p style={{ fontSize: '0.9rem', opacity: 0.6 }}>
                    &copy; {new Date().getFullYear()} Babysis. Todos los derechos reservados.
                </p>
            </div>
        </footer>
    );
}
