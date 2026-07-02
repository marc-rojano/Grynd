import { useState, useEffect } from 'react';
import axios from 'axios';

// Estilos básicos para el ejemplo
const styles = {
  container: { fontFamily: 'sans-serif', maxWidth: '500px', margin: 'auto', padding: '20px' },
  form: { display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' },
  input: { padding: '8px', borderRadius: '4px', border: '1px solid #ddd' },
  button: { padding: '10px', borderRadius: '4px', border: 'none', background: '#007bff', color: 'white', cursor: 'pointer' },
  profile: { padding: '20px', border: '1px solid #4caf50', borderRadius: '8px', background: '#f0fff0' },
  error: { color: 'red', marginBottom: '10px' },
  header: { textAlign: 'center' }
};

function App() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [profile, setProfile] = useState<{ username: string; email: string } | null>(null);
  const [error, setError] = useState('');

  // Efecto para obtener el perfil si ya hay un token al cargar la página
  useEffect(() => {
    if (token) {
      fetchProfile(token);
    }
  }, [token]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('/api/auth/register', { username, email, password });
      setToken(res.data.token);
      localStorage.setItem('token', res.data.token);
    } catch (err: any) {
      setError(err.response?.data?.msg || 'Error en el registro');
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('/api/auth/login', { email, password });
      setToken(res.data.token);
      localStorage.setItem('token', res.data.token);
    } catch (err: any) {
      setError(err.response?.data?.msg || 'Error en el login');
    }
  };

  const fetchProfile = async (authToken: string) => {
    setError('');
    try {
      const res = await axios.get('/api/auth/profile', {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
      setProfile(res.data);
    } catch (err: any) {
      setError(err.response?.data?.msg || 'Error al obtener el perfil');
      // Si el token no es válido, lo limpiamos
      handleLogout();
    }
  };

  const handleLogout = () => {
    setToken(null);
    setProfile(null);
    localStorage.removeItem('token');
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>💪 Grynd</h1>

      {error && <p style={styles.error}>{error}</p>}

      {!token ? (
        <div>
          {/* Formulario de Registro */}
          <form onSubmit={handleRegister} style={styles.form}>
            <h2>Registro</h2>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required style={styles.input} />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required style={styles.input} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required style={styles.input} />
            <button type="submit" style={styles.button}>Registrarse</button>
          </form>

          {/* Formulario de Login */}
          <form onSubmit={handleLogin} style={styles.form}>
            <h2>Login</h2>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required style={styles.input} />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required style={styles.input} />
            <button type="submit" style={styles.button}>Iniciar Sesión</button>
          </form>
        </div>
      ) : (
        <div>
          {profile ? (
            <div style={styles.profile}>
              <h2>Perfil de Usuario</h2>
              <p><strong>Username:</strong> {profile.username}</p>
              <p><strong>Email:</strong> {profile.email}</p>
              <p>¡Conexión con Backend y DB exitosa!</p>
            </div>
          ) : (
            <p>Cargando perfil...</p>
          )}
          <button onClick={handleLogout} style={{ ...styles.button, background: '#dc3545', width: '100%', marginTop: '20px' }}>Cerrar Sesión</button>
        </div>
      )}
    </div>
  );
}

export default App;