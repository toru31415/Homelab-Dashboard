export const TYPE_LABELS = {
  physical: 'Hardware',
  vm: 'VM',
  container: 'Container',
  network: 'Network',
  storage: 'Storage',
  other: 'Sonstige',
};

export const STATUS_ICON_NAME = {
  online: 'status-online',
  dhcp: 'status-dhcp',
  offline: 'status-offline',
  warning: 'status-warning',
  unknown: 'status-unknown',
};

export const HARDWARE_TYPES = ['physical', 'network', 'storage', 'other'];

export function isHardware(n) {
  return HARDWARE_TYPES.includes(n.type || 'other');
}

export function relationChildren(nodes, parentId) {
  return nodes.filter((n) => (n.type === 'vm' || n.type === 'container') && n.parentId === parentId);
}

export function ipModeLabel(value) {
  return value === 'dhcp' ? 'DHCP' : value === 'static' ? 'Statisch' : '-';
}

export function ipModeClass(value) {
  return value === 'dhcp' ? 'ip-mode-dhcp' : 'ip-mode-static';
}

function isDhcpMode(n) {
  return (n.ipMode || 'static') === 'dhcp';
}

export function effectiveStatus(n) {
  const sc = n.status || 'unknown';
  if (sc === 'dhcp') return 'dhcp';
  if (isDhcpMode(n) && sc === 'online') return 'dhcp';
  return sc;
}

export function statusBadgeClass(n) {
  return effectiveStatus(n);
}

export function statusIconName(n) {
  const sc = effectiveStatus(n);
  return STATUS_ICON_NAME[sc] || STATUS_ICON_NAME.unknown;
}

export function statusLabel(n) {
  const sc = effectiveStatus(n);
  return sc === 'dhcp' ? 'DHCP' : String(sc).toUpperCase();
}

export function showPingMeta(n) {
  return effectiveStatus(n) !== 'dhcp';
}

export function getPingTarget(n) {
  return (n.ip || '').trim();
}

export function fmtTime(iso) {
  if (!iso) return '–';
  try {
    return new Date(iso).toLocaleTimeString('de-CH', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  } catch {
    return iso;
  }
}

function cleanPath(path) {
  const p = String(path || '').trim();
  if (!p) return '';
  if (p.startsWith('?') || p.startsWith('#')) return p;
  return '/' + p.replace(/^\/+/, '');
}

function splitHostAndPath(value) {
  let raw = String(value || '').trim().replace(/^https?:\/\//i, '').replace(/\/+$/, '');
  const slashIdx = raw.indexOf('/');
  let path = '';
  if (slashIdx !== -1) {
    path = raw.slice(slashIdx);
    raw = raw.slice(0, slashIdx);
  }
  const [host, port = ''] = raw.split(':');
  return { host, port, path };
}

function nodeProtocol(n, port) {
  if (String(port) === '443') return 'https';
  return n.protocol || 'http';
}

// Anzeigename im Card-Header (bevorzugt die Domain und nimmt sonst die IP.).
export function endpointLabel(n) {
  const hasDomain = Boolean(String(n.domain || '').trim());
  const target = String(hasDomain ? n.domain : n.ip || '').trim();
  if (!target) return '';
  if (hasDomain) {
    try {
      if (/^https?:\/\//i.test(target)) return new URL(target).hostname;
    } catch {
    }
    return target;
  }
  const port = String(n.port || '').trim();
  return port ? `${target}:${port}` : target;
}

// Vollständige und klickbare URL wenn gewollt.
export function nodeUrl(n) {
  const hasDomain = Boolean(String(n.domain || '').trim());
  const target = String(hasDomain ? n.domain : n.ip || '').trim();
  if (!n.linkEnabled || !target) return '';

  const port = hasDomain ? '' : String(n.port || '').trim();
  const path = cleanPath(n.path);

  try {
    if (/^https?:\/\//i.test(target)) {
      const u = new URL(target);
      u.protocol = `${nodeProtocol(n, u.port || port)}:`;
      if (hasDomain) u.port = '';
      else if (port) u.port = port;
      if (path) u.pathname = path;
      return u.toString();
    }
  } catch {
  }

  const parsed = splitHostAndPath(target);
  const effectivePort = hasDomain ? '' : port || parsed.port || '';
  const protocol = nodeProtocol(n, effectivePort);
  const fullPath = path || parsed.path || '';
  return `${protocol}://${parsed.host}${effectivePort ? `:${effectivePort}` : ''}${fullPath}`;
}