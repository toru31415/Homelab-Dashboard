import Icon from './Icon.jsx';

const tabs = [
  { id: 'hardware', icon: 'server', label: 'Hardware' },
  { id: 'vm', icon: 'vm', label: 'VM' },
  { id: 'container', icon: 'container', label: 'Container' },
];

export default function Tabs({ active, onChange }) {
  return (
    <div className="tabs">
      {tabs.map((t) => (
        <button key={t.id} className={`tab ${active === t.id ? 'active' : ''}`} onClick={() => onChange(t.id)}>
          <Icon id={t.icon} className="btn-icon" /> {t.label}
        </button>
      ))}
    </div>
  );
}