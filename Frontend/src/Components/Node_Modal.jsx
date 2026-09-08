import { useEffect, useState } from 'react';
import { ICONS } from '../icons.js';
import Icon, { normalizeIcon } from './Icon.jsx';

const DEVICE_ICON_IDS = [
  'server', 'switch', 'router', 'firewall', 'nas', 'vm', 'laptop', 'pc',
  'printer', 'scanner', 'iot', 'container', 'wlan', 'cloud', 'service',
  'security', 'home', 'internet',
];
const deviceIcons = ICONS.filter((i) => DEVICE_ICON_IDS.includes(i.id));

const empty = {
  name: '',
  domain: '',
  protocol: 'http',
  ip: '',
  port: '',
  path: '',
  ipMode: 'static',
  linkEnabled: false,
  type: 'physical',
  status: 'online',
  parentId: '',
  showOnDashboard: false,
  desc: '',
  cpu: '',
  ram: '',
  disk: '',
  os: '',
  icon: 'server',
  services: [],
};

export default function NodeModal({ node, allNodes, onSave, onClose }) {
  const [form, setForm] = useState(empty);

  useEffect(() => {
    if (node) {
      setForm({ ...empty, ...node, parentId: node.parentId || '' });
    } else {
      setForm(empty);
    }
  }, [node]);

  function set(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function updateService(i, field, value) {
    setForm((f) => {
      const services = [...f.services];
      services[i] = { ...services[i], [field]: value };
      return { ...f, services };
    });
  }

  function addService() {
    setForm((f) => ({ ...f, services: [...f.services, { name: '', status: 'up' }] }));
  }

  function removeService(i) {
    setForm((f) => ({ ...f, services: f.services.filter((_, idx) => idx !== i) }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim()) return;
    const payload = { ...form, parentId: form.parentId || null };
    onSave(payload);
  }

  const isAttachable = form.type === 'vm' || form.type === 'container';
  // Mögliche Hosts: alles ausser sich selbst und ausser Container (nur Hardware/VM als Host sinnvoll)
  const possibleParents = allNodes.filter(
    (n) => n._id !== node?._id && (n.type === 'physical' || n.type === 'vm')
  );

  return (
    <div className="modal-overlay open">
      <div className="modal" role="dialog" aria-modal="true">
        <div className="modal-header">
          <div className="modal-title">
            <Icon id={node ? 'edit' : 'pc'} className="btn-icon" /> {node ? 'Eintrag bearbeiten' : 'Eintrag hinzufügen'}
          </div>
          <button className="modal-close" aria-label="Schliessen" onClick={onClose}>
            <Icon id="close" className="btn-icon" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-row identity-row">
              <div className="form-group">
                <label className="form-label">Name *</label>
                <input
                  className="form-input"
                  placeholder="z.B. proxmox-01"
                  value={form.name}
                  onChange={(e) => set('name', e.target.value)}
                  autoFocus
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Domänenname</label>
                <input
                  className="form-input"
                  placeholder="z.B. proxmox.vawhome.ch"
                  value={form.domain}
                  onChange={(e) => set('domain', e.target.value)}
                />
              </div>
            </div>

            <div className="form-row endpoint-row">
              <div className="form-group protocol-field">
                <label className="form-label">Protokoll</label>
                <select className="form-select" value={form.protocol} onChange={(e) => set('protocol', e.target.value)}>
                  <option value="http">HTTP</option>
                  <option value="https">HTTPS</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">IP / Hostname</label>
                <input
                  className="form-input"
                  placeholder="192.168.1.10"
                  value={form.ip}
                  onChange={(e) => set('ip', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Port</label>
                <input
                  className="form-input"
                  placeholder="z.B. 8080"
                  value={form.port}
                  onChange={(e) => set('port', e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Pfad</label>
                <input
                  className="form-input"
                  placeholder="z.B. /admin"
                  value={form.path}
                  onChange={(e) => set('path', e.target.value)}
                />
              </div>
            </div>

            <div className="form-row ip-mode-row">
              <div className="form-group">
                <label className="form-label">IP-Vergabe</label>
                <div className="ip-mode-options" role="radiogroup">
                  <label className="check-row ip-mode-option">
                    <input
                      type="radio"
                      name="ip-mode"
                      checked={form.ipMode === 'static'}
                      onChange={() => set('ipMode', 'static')}
                    />
                    <span>Statisch</span>
                  </label>
                  <label className="check-row ip-mode-option">
                    <input
                      type="radio"
                      name="ip-mode"
                      checked={form.ipMode === 'dhcp'}
                      onChange={() => set('ipMode', 'dhcp')}
                    />
                    <span>DHCP</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="form-checks form-checks-highlight">
              <label className="check-row">
                <input
                  type="checkbox"
                  checked={form.linkEnabled}
                  onChange={(e) => set('linkEnabled', e.target.checked)}
                />
                <span>Direktlink zur Webseite erstellen</span>
              </label>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Typ</label>
                <select className="form-select" value={form.type} onChange={(e) => set('type', e.target.value)}>
                  <option value="physical">● Hardware</option>
                  <option value="vm">● VM</option>
                  <option value="container">● Container</option>
                  <option value="network">● Network</option>
                  <option value="storage">● Storage</option>
                  <option value="other">○ Sonstige</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Status (manuell)</label>
                <select className="form-select" value={form.status} onChange={(e) => set('status', e.target.value)}>
                  <option value="online">● Online</option>
                  <option value="dhcp">● DHCP</option>
                  <option value="offline">● Offline</option>
                  <option value="warning">● Warnung</option>
                  <option value="unknown">○ Unbekannt</option>
                </select>
              </div>
            </div>

            {isAttachable && (
              <div className="attach-settings">
                <div className="form-section">Zuordnung im Hardware-Dashboard</div>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Übergeordnetes Gerät</label>
                    <select className="form-select" value={form.parentId} onChange={(e) => set('parentId', e.target.value)}>
                      <option value="">Kein Host ausgewählt</option>
                      {possibleParents.map((p) => (
                        <option key={p._id} value={p._id}>
                          {p.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group check-field">
                    <label className="check-row">
                      <input
                        type="checkbox"
                        checked={form.showOnDashboard}
                        onChange={(e) => set('showOnDashboard', e.target.checked)}
                      />
                      <span>Im Hardware-Dashboard anhängen</span>
                    </label>
                  </div>
                </div>
                <div className="form-help attach-help">
                  Wähle aus, wo dieser Eintrag im Dashboard untergeordnet angezeigt werden soll.
                </div>
              </div>
            )}

            <div className="form-group">
              <label className="form-label">Beschreibung</label>
              <textarea
                className="form-textarea"
                rows={2}
                placeholder="Kurze Beschreibung des Node…"
                value={form.desc}
                onChange={(e) => set('desc', e.target.value)}
              />
            </div>

            <div className="form-section">Hardware / OS</div>
            <div className="form-row form-row-4">
              <div className="form-group">
                <label className="form-label">CPU</label>
                <input className="form-input" placeholder="z.B. 4 vCores" value={form.cpu} onChange={(e) => set('cpu', e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">RAM</label>
                <input className="form-input" placeholder="z.B. 16 GB" value={form.ram} onChange={(e) => set('ram', e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Speicher</label>
                <input className="form-input" placeholder="z.B. 500 GB SSD" value={form.disk} onChange={(e) => set('disk', e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Betriebssystem</label>
                <input className="form-input" placeholder="z.B. Ubuntu 24.04" value={form.os} onChange={(e) => set('os', e.target.value)} />
              </div>
            </div>

            <div className="form-section">Icon</div>
            <div className="emoji-picker">
              {deviceIcons.map((icon) => (
                <button
                  type="button"
                  key={icon.id}
                  className={`emoji-opt ${normalizeIcon(form.icon) === icon.id ? 'selected' : ''}`}
                  title={icon.title}
                  onClick={() => set('icon', icon.id)}
                >
                  <Icon id={icon.id} />
                </button>
              ))}
            </div>

            <div className="form-section">Services &amp; Apps</div>
            <div className="services-input-area">
              <div id="services-inputs">
                {form.services.map((s, i) => (
                  <div className="svc-row" key={i}>
                    <input
                      className="form-input svc-name"
                      placeholder="Service-Name (z.B. Nginx, SSH, Grafana)"
                      value={s.name}
                      onChange={(e) => updateService(i, 'name', e.target.value)}
                    />
                    <select
                      className="svc-status-sel"
                      value={s.status}
                      onChange={(e) => updateService(i, 'status', e.target.value)}
                    >
                      <option value="up">🟢 Up</option>
                      <option value="down">🔴 Down</option>
                    </select>
                    <button type="button" className="rm-svc" title="Service entfernen" onClick={() => removeService(i)}>
                      <Icon id="close" className="btn-icon" />
                    </button>
                  </div>
                ))}
              </div>
              <button type="button" className="btn-add-svc" onClick={addService}>
                + Service hinzufügen
              </button>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-cancel" onClick={onClose}>
              Abbrechen
            </button>
            <button type="submit" className="btn btn-primary">
              <Icon id="save" className="btn-icon" /> Speichern
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
