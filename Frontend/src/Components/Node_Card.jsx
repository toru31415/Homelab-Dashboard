import { useState } from 'react';
import Icon from './Icon.jsx';
import {
  TYPE_LABELS,
  effectiveStatus,
  endpointLabel,
  nodeUrl,
  ipModeClass,
  statusBadgeClass,
  statusIconName,
  statusLabel,
  showPingMeta,
  fmtTime,
  getPingTarget,
} from '../nodeHelper.js';

function ChildRow({ node, allNodes, depth = 0 }) {
  const sc = effectiveStatus(node);
  const endpoint = endpointLabel(node.domain ? { ...node, port: '' } : node);
  const url = nodeUrl(node);
  const nested = allNodes.filter(
    (n) => n.parentId === node._id && (n.type === 'vm' || n.type === 'container') && n.showOnDashboard
  );
  const safeDepth = Math.min(depth, 4);

  return (
    <div className={`child-tree child-depth-${safeDepth}`}>
      <div className={`child-row status-${sc}`}>
        <div className="child-icon">
          <Icon id={node.icon} />
        </div>
        <div className="child-main">
          <div className="child-name">{node.name}</div>
          <div className="child-meta">
            <span className={`child-endpoint${endpoint ? '' : ' muted'}`}>
              {endpoint ? (
                url ? (
                  <a href={url} target="_blank" rel="noopener noreferrer">
                    {endpoint} ↗
                  </a>
                ) : (
                  endpoint
                )
              ) : (
                '–'
              )}
            </span>
          </div>
        </div>
        <span className={`child-type badge-${node.type}`}>{TYPE_LABELS[node.type] || 'Sonstige'}</span>
      </div>
      {nested.length > 0 && (
        <div className="child-nested">
          {nested.map((c) => (
            <ChildRow key={c._id} node={c} allNodes={allNodes} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

function ChildrenSection({ node, allNodes }) {
  const [open, setOpen] = useState(false);
  const children = allNodes.filter(
    (n) => n.parentId === node._id && (n.type === 'vm' || n.type === 'container') && n.showOnDashboard
  );

  if (children.length === 0) {
    const emptyText =
      node.type === 'vm' ? 'Keine angehängten Container' : 'Keine angehängten VMs oder Container';
    return (
      <div className="children-section empty">
        <div className="children-empty">{emptyText}</div>
      </div>
    );
  }

  function collectAll(list) {
    return list.flatMap((c) => [
      c,
      ...collectAll(
        allNodes.filter(
          (n) => n.parentId === c._id && (n.type === 'vm' || n.type === 'container') && n.showOnDashboard
        )
      ),
    ]);
  }
  const all = collectAll(children);
  const vmCount = all.filter((n) => n.type === 'vm').length;
  const ctCount = all.filter((n) => n.type === 'container').length;

  return (
    <div className={`children-section ${open ? 'open' : ''}`}>
      <button className="children-toggle" type="button" onClick={() => setOpen((o) => !o)}>
        <span className="children-chevron">{open ? '▾' : '▸'}</span>
        <span>Untergeordnete Objekte</span>
        <span className="children-count">
          {vmCount} VM{vmCount === 1 ? '' : 's'} · {ctCount} Container
        </span>
      </button>
      {open && (
        <div className="children-list">
          {children.map((c) => (
            <ChildRow key={c._id} node={c} allNodes={allNodes} />
          ))}
        </div>
      )}
    </div>
  );
}

function SpecChips({ node, parent }) {
  const chip = (label, value, extraClass = '') =>
    value ? (
      <span className={`spec-chip${extraClass ? ` ${extraClass}` : ''}`}>
        {label} <strong>{value}</strong>
      </span>
    ) : null;

  const configChips = [
    chip('CPU', node.cpu),
    chip('RAM', node.ram),
    chip('Disk', node.disk),
    chip('OS', node.os),
  ].filter(Boolean);

  const mode = node.ipMode || 'static';
  const ipChip =
    node.ip || node.ipMode
      ? chip('IP', mode === 'dhcp' ? 'DHCP' : 'Statisch', `ip-mode-chip ${ipModeClass(mode)}`)
      : null;

  const hostChip = parent ? chip('Host', parent.name) : null;

  const groups = [configChips.length > 0 ? configChips : null, ipChip, hostChip].filter(Boolean);
  if (groups.length === 0) return null;

  return (
    <div className="spec-groups spec-groups-compact">
      {groups.map((group, i) => (
        <div className="spec-group" key={i}>
          <div className="specs-row">{group}</div>
        </div>
      ))}
    </div>
  );
}

export default function NodeCard({ node, allNodes, view, onEdit, onDelete, onPing, onInfo, pinging }) {
  const visualStatus = effectiveStatus(node);
  const services = node.services || [];
  const endpoint = endpointLabel(node);
  const url = nodeUrl(node);
  const parent = node.parentId ? allNodes.find((x) => x._id === node.parentId) : null;
  const pingTarget = getPingTarget(node);
  const showChildren = view === 'hardware' || node.type === 'vm';

  return (
    <div className={`node-card status-${visualStatus} ${ipModeClass(node.ipMode || 'static')}`}>
      <div className="node-card-main">
        <div className="node-header">
          <div className="node-icon">
            <Icon id={node.icon} />
          </div>
          <div className="node-title-group">
            <div className="node-name" title={node.name}>
              {node.name}
            </div>
            {endpoint && (
              <div className="node-ip">
                {url ? (
                  <a href={url} target="_blank" rel="noopener noreferrer">
                    {endpoint} ↗
                  </a>
                ) : (
                  endpoint
                )}
              </div>
            )}
          </div>
          <span className={`node-type-badge badge-${node.type || 'other'}`}>
            {TYPE_LABELS[node.type] || 'Sonstige'}
          </span>
        </div>

        <div className="node-desc">{node.desc || ''}</div>

        <SpecChips node={node} parent={parent} />

        <div className="section-label">Services</div>
        <div className="services-list">
          {services.length ? (
            services.map((s, i) => (
              <span className="svc-tag" key={i}>
                <span className={`svc-dot${s.status === 'up' ? '' : ' down'}`} />
                {s.name}
              </span>
            ))
          ) : (
            <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>–</span>
          )}
        </div>
      </div>

      {showChildren && <ChildrenSection node={node} allNodes={allNodes} />}

      <div className="status-row">
        <div>
          <span className={`status-badge ${statusBadgeClass(node)}`}>
            <Icon id={statusIconName(node)} className="btn-icon" /> {statusLabel(node)}
          </span>
          {node.lastCheck && showPingMeta(node) && (
            <div className="ping-meta">
              Geprüft: {fmtTime(node.lastCheck)}{' '}
              {node.latency != null && (
                <span
                  style={{
                    color: node.latency < 5 ? 'var(--green)' : node.latency < 50 ? 'var(--yellow)' : 'var(--red)',
                    fontSize: 10,
                    marginLeft: 4,
                  }}
                >
                  {node.latency.toFixed(1)}ms
                </span>
              )}
            </div>
          )}
        </div>
        <div className="card-actions">
          <button className="action-btn info" title="Infos anzeigen" onClick={() => onInfo(node)}>
            <Icon id="info" className="btn-icon" />
          </button>
          {pingTarget && (
            <button className="action-btn ping-b" title="Host per Ping prüfen" onClick={() => onPing(node)} disabled={pinging}>
              <Icon id="bolt" className="btn-icon" />
            </button>
          )}
          <button className="action-btn" title="Bearbeiten" onClick={() => onEdit(node)}>
            <Icon id="edit" className="btn-icon" />
          </button>
          <button className="action-btn del" title="Löschen" onClick={() => onDelete(node)}>
            <Icon id="trash" className="btn-icon" />
          </button>
        </div>
      </div>
    </div>
  );
}
