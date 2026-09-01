import Icon from './Icon.jsx';

export default function Toolbar({ search, onSearch, typeFilter, onTypeFilter, statusFilter, onStatusFilter, view, count }) {
  return (
    <div className="toolbar">
      <div className="search-box">
        <Icon id="search" className="search-icon" />
        <input
          type="text"
          placeholder="Suchen nach Name, IP, Service…"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      {view === 'hardware' && (
        <select className="filter-sel" value={typeFilter} onChange={(e) => onTypeFilter(e.target.value)}>
          <option value="">Alle Hardware-Typen</option>
          <option value="physical">Hardware</option>
          <option value="network">Network</option>
          <option value="storage">Storage</option>
          <option value="other">Sonstige</option>
        </select>
      )}

      <select className="filter-sel" value={statusFilter} onChange={(e) => onStatusFilter(e.target.value)}>
        <option value="">Alle Status</option>
        <option value="online">Online</option>
        <option value="dhcp">DHCP</option>
        <option value="offline">Offline</option>
        <option value="warning">Warnung</option>
        <option value="unknown">Unbekannt</option>
      </select>

      <div className="spacer" />
      <span className="node-count">{count}</span>
    </div>
  );
}
