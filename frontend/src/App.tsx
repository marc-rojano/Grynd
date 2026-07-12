import { useState, useCallback } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './components/home/HomePage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import FeaturesPage from './pages/FeaturesPage';
import ProgramsPage from './pages/ProgramsPage';
import StatsPage from './pages/StatsPage';
import './App.css';

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
          path="/login"
          element={token ? <Navigate to="/home" replace /> : <LoginPage onLoginSuccess={handleLoginSuccess} />}
        />
        <Route path="/home" element={token ? <HomePage /> : <Navigate to="/login" replace />} />
        <Route path="/features" element={token ? <FeaturesPage /> : <Navigate to="/login" replace />} />
        <Route path="/programs" element={token ? <ProgramsPage /> : <Navigate to="/login" replace />} />
        <Route path="/stats" element={token ? <StatsPage /> : <Navigate to="/login" replace />} />
        <Route
          path="/profile"
          element={token ? <ProfilePage token={token} onLogout={handleLogout} /> : <Navigate to="/login" replace />}
        />
        <Route path="/" element={<Navigate to={token ? '/home' : '/login'} replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;