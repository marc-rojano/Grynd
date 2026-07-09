import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient, { isAxiosError } from './axios';
import './LoginPage.css';

interface LoginPageProps {
    onLoginSuccess: (token: string) => void;
}

function LoginPage({ onLoginSuccess }: LoginPageProps) {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleToggleForm = (loginView: boolean) => {
        if (isLogin === loginView) return;
        setIsLogin(loginView);
        setUsername('');
        setEmail('');
        setPassword('');
        setError('');
    };

    const handleAuthAction = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        const url = isLogin ? '/auth/login' : '/auth/register';
        const payload = isLogin ? { email, password } : { username, email, password };

        try {
            const res = await apiClient.post(url, payload);
            onLoginSuccess(res.data.token);
            navigate('/home');
        } catch (err: unknown) {
            if (isAxiosError(err)) {
                setError(err.response?.data?.msg || `Error en ${isLogin ? 'el login' : 'el registro'}`);
            } else {
                setError('Ha ocurrido un error inesperado. Revisa la conexión.');
                console.error('Error no relacionado con Axios:', err);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <header className="header-banner">
                <div className="banner-pill">Entrena con constancia</div>
                <h1>GRYND</h1>
                <p>Tu cuaderno de entrenamiento siempre contigo.</p>
            </header>

            <main className="form-container">
                <div className="form-toggle">
                    <button type="button" onClick={() => handleToggleForm(true)} className={isLogin ? 'active' : ''}>Iniciar Sesión</button>
                    <button type="button" onClick={() => handleToggleForm(false)} className={!isLogin ? 'active' : ''}>Registro</button>
                </div>

                <form onSubmit={handleAuthAction}>
                    <h2>{isLogin ? 'Bienvenido de nuevo' : 'Crea tu cuenta'}</h2>
                    <p className="form-subtitle">{isLogin ? 'Accede a tu plan y sigue avanzando.' : 'Únete y empieza a registrar tus sesiones.'}</p>

                    {error && <p className="error-message">{error}</p>}

                    {!isLogin && (
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    )}
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit" className="submit-button" disabled={loading}>
                        {loading ? 'Procesando...' : isLogin ? 'Iniciar Sesión' : 'Registrarse'}
                    </button>
                </form>
            </main>
        </div>
    );
}

export default LoginPage;