import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/Authentication_Context.jsx';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(username, password, remember);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Anmeldung fehlgeschlagen.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="login-screen" aria-label="Homelab Login">
      <div className="login-card">
        <div className="login-brand">
          <div className="login-logo"></div>
          <div>
            <div className="login-title">Homelab Login</div>
            <div className="login-subtitle">Bitte anmelden, um das Dashboard zu öffnen.</div>
          </div>
        </div>

        <form className="login-form" onSubmit={handleSubmit} autoComplete="on">
          <div className="form-group">
            <label className="form-label" htmlFor="auth-user">Benutzername</label>
            <input
              className="form-input"
              id="auth-user"
              placeholder="Benutzername"
              autoComplete="username"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="auth-pass">Passwort</label>
            <input
              className="form-input"
              id="auth-pass"
              type="password"
              placeholder="Passwort"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <label className="check-row login-remember" htmlFor="auth-remember">
            <input
              type="checkbox"
              id="auth-remember"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            <span>Angemeldet bleiben</span>
          </label>
          {error && (
            <div className="login-error" role="alert">
              {error}
            </div>
          )}
          <button className="btn btn-primary login-submit" type="submit" disabled={loading}>
            🔐 {loading ? 'Anmelden…' : 'Anmelden'}
          </button>
        </form>
      </div>
    </section>
  );
}
