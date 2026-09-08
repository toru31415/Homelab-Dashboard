import Icon from './Icon.jsx';
import { TYPE_LABELS, endpointLabel, nodeUrl, statusBadgeClass, statusIconName, statusLabel } from '../nodeHelper.js';

export default function InfoModal({ node, onClose }) {
  const endpoint = endpointLabel(node);
  const url = nodeUrl(node);

  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) onClose();
  }

  const rows = [
    ['Typ', TYPE_LABELS[node.type] || 'Sonstige'],
    ['IP / Hostname', node.ip || '–'],
    ['Domain', node.domain || '–'],
    ['CPU', node.cpu || '–'],
    ['RAM', node.ram || '–'],
    ['Speicher', node.disk || '–'],
    ['Betriebssystem', node.os || '–'],
    ['IP-Modus', node.ipMode === 'dhcp' ? 'DHCP' : 'Statisch'],
  ];

  return (
    <div className="modal-overlay info-modal-overlay open" onClick={handleOverlayClick}>
      <div className="modal info-detail-modal" role="dialog" aria-modal="true">
        <div className="modal-header">
          <div className="modal-title">
            <Icon id="info" className="btn-icon" /> {node.name}
          </div>
          <button className="modal-close" aria-label="Schliessen" onClick={onClose}>
            <Icon id="close" className="btn-icon" />
          </button>
        </div>
        <div className="modal-body">
          <div className="device-info-icon">
            <Icon id={node.icon} />
          </div>
          <p style={{ marginBottom: 12 }}>
            <span className={`status-badge ${statusBadgeClass(node)}`}>
              <Icon id={statusIconName(node)} className="btn-icon" /> {statusLabel(node)}
            </span>
          </p>
          {node.desc && <p style={{ marginBottom: 16, color: 'var(--text-dim)' }}>{node.desc}</p>}
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <tbody>
              {rows.map(([label, value]) => (
                <tr key={label}>
                  <td style={{ padding: '6px 0', color: 'var(--text-muted)', width: '40%' }}>{label}</td>
                  <td style={{ padding: '6px 0' }}>{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {url && (
            <p style={{ marginTop: 16 }}>
              <a href={url} target="_blank" rel="noopener noreferrer">
                {endpoint} ↗
              </a>
            </p>
          )}
        </div>
        <div className="modal-footer">
          <button className="btn btn-cancel" onClick={onClose}>
            Schliessen
          </button>
        </div>
      </div>
    </div>
  );
}
