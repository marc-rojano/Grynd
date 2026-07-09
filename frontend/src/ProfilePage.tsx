import { useState, useEffect } from 'react';
import apiClient, { isAxiosError } from './axios';
import './ProfilePage.css';

interface ProfilePageProps {
    token: string;
    onLogout: () => void;
}

function ProfilePage({ onLogout }: ProfilePageProps) {
    const [profile, setProfile] = useState<{ username: string; email: string } | null>(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            setError('');
            try {
                // El token se añade automáticamente gracias al interceptor de Axios
                const res = await apiClient.get('/auth/profile');
                setProfile(res.data);
            } catch (err: unknown) {
                if (isAxiosError(err)) {
                    setError(err.response?.data?.msg || 'Error al obtener el perfil');
                    if (err.response?.status === 401) {
                        onLogout();
                    }
                } else {
                    setError('Ha ocurrido un error inesperado al cargar el perfil.');
                    console.error('Error no relacionado con Axios:', err);
                }
            }
        };

        fetchProfile();
    }, [onLogout]); // El token ya no es una dependencia directa gracias al interceptor

    return (
        <div className="profile-page-container">
            {error && <p className="profile-error">{error}</p>}
            {profile ? (
                <div>
                    <h2 className="profile-header">Perfil de {profile.username}</h2>
                    <div className="profile-info">
                        <p><strong>Username:</strong> {profile.username}</p>
                        <p><strong>Email:</strong> {profile.email}</p>
                    </div>
                </div>
            ) : (
                <p className="loading-message">Cargando perfil...</p>
            )}
            <button onClick={onLogout} className="logout-button">
                Cerrar Sesión
            </button>
        </div>
    );
}

export default ProfilePage;