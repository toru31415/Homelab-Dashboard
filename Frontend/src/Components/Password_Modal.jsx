import { useState } from 'react';
import api from '../api';
import Icon from './Icon.jsx';

export default function PasswordModal({ onClose }) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage('');
    if (newPassword !== confirm) {
      setError(true);
      setMessage('Die neuen Passwörter stimmen nicht überein.');
      return;
    }
    try {
      await api.post('/auth/change-password', { currentPassword, newPassword });
      setError(false);
      setMessage('Passwort erfolgreich geändert.');
      setTimeout(onClose, 1200);
    } catch (err) {
      setError(true);
      setMessage(err.response?.data?.error || 'Passwort konnte nicht geändert werden.');
    }
  }

  return (
    <div className="modal-overlay open">
      <div className="modal password-modal" role="dialog" aria-modal="true">
        <div className="modal-header">
          <div className="modal-title">
            <Icon id="key" className="btn-icon" /> Passwort ändern
          </div>
          <button className="modal-close" aria-label="Schliessen" onClick={onClose}>
            <Icon id="close" className="btn-icon" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label">Aktuelles Passwort</label>
              <input
                className="form-input"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Neues Passwort</label>
              <input
                className="form-input"
                type="password"
                placeholder="Mindestens 8 Zeichen"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Neues Passwort wiederholen</label>
              <input
                className="form-input"
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
              />
            </div>
            {message && (
              <div className="password-message" style={{ color: error ? 'var(--red)' : 'var(--green)' }}>
                {message}
              </div>
            )}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-cancel" onClick={onClose}>
              Abbrechen
            </button>
            <button type="submit" className="btn btn-primary">
              <Icon id="save" className="btn-icon" /> Passwort speichern
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
