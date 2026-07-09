// frontend/src/HomePage.tsx
import React from 'react';

type HomePageProps = {
    onLogout?: () => void;
};

function HomePage({ onLogout }: HomePageProps) {

    return (
        <div className="login-page">
            <header className="header-banner">
                <div className="banner-pill">Entrena con constancia</div>
                <h1>GRYND</h1>
                <p>Bienvenido a la página de inicio!</p>
            </header>

            <main className="form-container">
                {/* Content will be added here */}
                {onLogout && (
                    <button onClick={onLogout} className="logout-button">
                        Cerrar sesión
                    </button>
                )}
            </main>
        </div>
    );
}

export default HomePage;