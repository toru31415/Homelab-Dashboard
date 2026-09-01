import { effectiveStatus } from '../nodeHelper.js';
import Icon from './Icon.jsx';

export default function Header({ nodes, username, onLogout, onPingAll, onOpenPassword, onOpenNew, pingingAll }) {
  const online = nodes.filter((n) => effectiveStatus(n) === 'online').length;
  const dhcp = nodes.filter((n) => effectiveStatus(n) === 'dhcp').length;
  const warn = nodes.filter((n) => effectiveStatus(n) === 'warning').length;
  const offline = nodes.filter((n) => effectiveStatus(n) === 'offline').length;

  return (
    <header>
      <div className="logo">
        <div className="logo-icon">
          <Icon id="dashboard" />
        </div>
        <span>Homelab</span>
      </div>

      <div className="header-stats">
        <div className="stat-pill">
          <span className="dot" />
          {online} Online
        </div>
        {dhcp > 0 && (
          <div className="stat-pill dhcp">
            <span className="dot" />
            {dhcp} DHCP
          </div>
        )}
        {warn > 0 && (
          <div className="stat-pill warn">
            <span className="dot" />
            {warn} Warnung
          </div>
        )}
        {offline > 0 && (
          <div className="stat-pill err">
            <span className="dot" />
            {offline} Offline
          </div>
        )}
      </div>

      <div className="header-btns">
        <button className="btn btn-ghost" onClick={onPingAll} disabled={pingingAll}>
          <Icon id="bolt" className="btn-icon" /> {pingingAll ? 'Prüfe…' : 'Alle prüfen'}
        </button>
        <button className="btn btn-ghost" onClick={onOpenPassword}>
          <Icon id="key" className="btn-icon" /> Passwort
        </button>
        <span style={{ color: 'var(--text-dim)', fontSize: 12, alignSelf: 'center', margin: '0 4px' }}>
          {username}
        </span>
        <button className="btn btn-ghost" onClick={onLogout}>
          <Icon id="power" className="btn-icon" /> Logout
        </button>
        <button className="btn btn-primary" onClick={onOpenNew}>
          + Eintrag
        </button>
      </div>
    </header>
  );
}
