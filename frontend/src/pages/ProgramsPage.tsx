import React from 'react';
import { Link } from 'react-router-dom';
import '../components/home/HomePage.css';

const ProgramsPage: React.FC = () => {
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

                <main className="page-content">
                    <section className="hero-card placeholder-card">
                        <div className="hero-copy">
                            <span className="pill">Vista provisional</span>
                            <h1 className="page-title">Hola, soy ProgramsPage</h1>
                            <p className="page-subtitle">
                                Aquí se verán los planes y rutinas cuando se termine el diseño. Por ahora sirve como prueba del flujo del frontend.
                            </p>
                            <div className="cta-row">
                                <Link to="/home" className="btn btn-primary">Volver al inicio</Link>
                            </div>
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
};

export default ProgramsPage;