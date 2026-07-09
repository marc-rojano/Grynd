// frontend/src/App.tsx
import { useState, useCallback } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './LoginPage';
import ProfilePage from './ProfilePage';
import HomePage from './HomePage';

function App() {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

  const handleLoginSuccess = useCallback((newToken: string) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem('token');
    setToken(null);
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={!token ? <LoginPage onLoginSuccess={handleLoginSuccess} /> : <Navigate to="/home" replace />}
        />
        <Route path="/home" element={<HomePage onLogout={handleLogout} />} />
        <Route
          path="/profile"
          element={token ? <ProfilePage token={token} onLogout={handleLogout} /> : <Navigate to="/" replace />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;