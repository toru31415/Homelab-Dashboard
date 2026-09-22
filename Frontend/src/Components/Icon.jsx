import { ICONS } from '../icons.js';

export function normalizeIcon(value) {
  return ICONS.some((i) => i.id === value) ? value : 'server';
}

export function getIcon(value) {
  return ICONS.find((i) => i.id === normalizeIcon(value)) || ICONS[0];
}

export default function Icon({ id, className = '' }) {
  const icon = getIcon(id);
  return (
    <span
      className={`node-icon-svg ${className}`}
      title={icon.title}
      dangerouslySetInnerHTML={{ __html: icon.svg }}
    />
  );
}