import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage: React.FC = () => {
    const [displayName, setDisplayName] = useState('usuario');

    useEffect(() => {
        const storedName = localStorage.getItem('username') || localStorage.getItem('userName') || localStorage.getItem('displayName');
        if (storedName) {
            setDisplayName(storedName);
        }
    }, []);

    return (
        <div className="home-page">
            <div className="home-shell">
                <header className="hp-header">
                    <div className="brand">
                        <div className="logo">G</div>
                        <div>
                            <div className="brand-title">Grynd</div>
                            <div className="brand-sub">Entrenamiento profesional</div>
                        </div>
                    </div>

                    <nav className="hp-nav">
                        <Link to="/home">Inicio</Link>
                        <Link to="/features">Funciones</Link>
                        <Link to="/programs">Planes</Link>
                        <Link to="/stats">Stats</Link>
                        <Link to="/profile">Perfil</Link>
                    </nav>
                </header>

                <main className="home-main">
                    <section className="hero-card">
                        <div className="hero-copy">
                            <span className="pill">Bienvenido a Grynd</span>
                            <h1>Hola, <span className="accent">{displayName}</span></h1>
                            <p className="hero-subtitle">
                                Tu espacio para organizar rutinas, revisar tu progreso y mantener una rutina más clara y profesional.
                            </p>

                            <div className="cta-row">
                                <Link to="/features" className="btn btn-primary">Explorar funciones</Link>
                                <Link to="/programs" className="btn btn-secondary">Ver planes</Link>
                            </div>
                        </div>

                        <div className="hero-panel">
                            <div className="panel-card">
                                <h3>Acceso rápido</h3>
                                <div className="panel-list">
                                    <Link to="/stats">Estadísticas</Link>
                                    <Link to="/programs">Rutinas</Link>
                                    <Link to="/profile">Tu perfil</Link>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="home-grid">
                        <div className="info-card">
                            <h3>Funciones</h3>
                            <p>Una vista limpia para empezar a navegar por la app.</p>
                            <Link to="/features" className="card-link">Ir a funciones</Link>
                        </div>
                        <div className="info-card">
                            <h3>Planes</h3>
                            <p>Próximamente tendrás rutinas y objetivos organizados.</p>
                            <Link to="/programs" className="card-link">Ir a planes</Link>
                        </div>
                        <div className="info-card">
                            <h3>Stats</h3>
                            <p>Esta sección mostrará tu evolución de forma visual.</p>
                            <Link to="/stats" className="card-link">Ir a stats</Link>
                        </div>
                        <div className="info-card">
                            <h3>Perfil</h3>
                            <p>Tu espacio personal para ver y gestionar tu cuenta.</p>
                            <Link to="/profile" className="card-link">Ir a perfil</Link>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
};

export default HomePage;