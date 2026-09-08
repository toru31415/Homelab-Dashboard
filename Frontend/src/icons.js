export const ICONS = [
    {
      id: "server",
      title: "Server",
      svg: `
        <svg class="net-svg-icon" viewBox="0 0 64 64" aria-hidden="true">
          <rect x="18" y="8" width="28" height="48" rx="4"></rect>
          <line x1="24" y1="18" x2="40" y2="18"></line>
          <line x1="24" y1="28" x2="40" y2="28"></line>
          <line x1="24" y1="38" x2="40" y2="38"></line>
          <circle cx="26" cy="48" r="2.4" class="fill"></circle>
          <circle cx="36" cy="48" r="2.4" class="fill"></circle>
        </svg>`,
    },
    {
      id: "switch",
      title: "Switch",
      svg: `
        <svg class="net-svg-icon switch-icon" viewBox="0 0 64 40" aria-hidden="true">
          <rect x="5" y="8" width="54" height="24" rx="4"></rect>
          <rect x="12" y="17" width="8" height="8" rx="1"></rect>
          <rect x="24" y="17" width="8" height="8" rx="1"></rect>
          <rect x="36" y="17" width="8" height="8" rx="1"></rect>
          <rect x="48" y="17" width="7" height="8" rx="1"></rect>
          <circle cx="14" cy="13" r="1.5" class="fill"></circle>
          <circle cx="22" cy="13" r="1.5" class="fill"></circle>
          <circle cx="30" cy="13" r="1.5" class="fill"></circle>
          <circle cx="38" cy="13" r="1.5" class="fill"></circle>
          <rect x="12" y="32" width="8" height="3" rx="1"></rect>
          <rect x="44" y="32" width="8" height="3" rx="1"></rect>
        </svg>`,
    },
    {
      id: "router",
      title: "Router",
      svg: `
        <svg class="net-svg-icon" viewBox="0 0 64 64" aria-hidden="true">
          <circle cx="32" cy="32" r="21"></circle>
          <path d="M19 32h26"></path>
          <path d="M32 19v26"></path>
          <path d="M23 23l-6 6 6 6"></path>
          <path d="M41 41l6-6-6-6"></path>
        </svg>`,
    },
    {
      id: "firewall",
      title: "Firewall",
      svg: `
        <svg class="net-svg-icon" viewBox="0 0 64 64" aria-hidden="true">
          <path d="M32 6l22 8v15c0 15-9 24-22 29C19 53 10 44 10 29V14l22-8z"></path>
          <path d="M22 31h20"></path>
          <path d="M22 40h20"></path>
          <path d="M32 22v27"></path>
        </svg>`,
    },
    {
      id: "nas",
      title: "NAS / Storage",
      svg: `
        <svg class="net-svg-icon" viewBox="0 0 64 64" aria-hidden="true">
          <ellipse cx="32" cy="15" rx="20" ry="7"></ellipse>
          <path d="M12 15v31c0 4 9 8 20 8s20-4 20-8V15"></path>
          <path d="M12 30c0 4 9 8 20 8s20-4 20-8"></path>
        </svg>`,
    },
    {
      id: "vm",
      title: "VM",
      svg: `
        <svg class="net-svg-icon" viewBox="0 0 64 64" aria-hidden="true">
          <rect x="11" y="14" width="42" height="30" rx="3"></rect>
          <path d="M24 52h16"></path>
          <path d="M29 44v8"></path>
          <path d="M35 44v8"></path>
        </svg>`,
    },

    {
      id: "laptop",
      title: "Laptop",
      svg: `
        <svg class="net-svg-icon" viewBox="0 0 64 64" aria-hidden="true">
          <rect x="16" y="14" width="32" height="26" rx="3"></rect>
          <path d="M10 48h44l-5-8H15l-5 8z"></path>
          <path d="M25 44h14"></path>
        </svg>`,
    },
    {
      id: "pc",
      title: "PC / Desktop",
      svg: `
        <svg class="net-svg-icon" viewBox="0 0 64 64" aria-hidden="true">
          <rect x="8" y="12" width="34" height="27" rx="3"></rect>
          <path d="M22 39v7"></path>
          <path d="M15 49h20"></path>
          <rect x="48" y="16" width="8" height="35" rx="2"></rect>
          <circle cx="52" cy="44" r="1.8" class="fill"></circle>
        </svg>`,
    },
    {
      id: "printer",
      title: "Drucker",
      svg: `
        <svg class="net-svg-icon" viewBox="0 0 64 64" aria-hidden="true">
          <path d="M18 24V10h28v14"></path>
          <rect x="12" y="24" width="40" height="24" rx="4"></rect>
          <path d="M20 42h24v12H20z"></path>
          <path d="M22 17h20"></path>
          <circle cx="45" cy="34" r="2" class="fill"></circle>
        </svg>`,
    },
    {
      id: "scanner",
      title: "Scanner",
      svg: `
        <svg class="net-svg-icon" viewBox="0 0 64 64" aria-hidden="true">
          <rect x="12" y="28" width="40" height="18" rx="3"></rect>
          <path d="M18 28l5-14h18l5 14"></path>
          <path d="M19 38h26"></path>
          <path d="M22 14h20"></path>
          <circle cx="47" cy="37" r="2" class="fill"></circle>
        </svg>`,
    },
    {
      id: "iot",
      title: "IoT / Smart Device",
      svg: `
        <svg class="net-svg-icon" viewBox="0 0 64 64" aria-hidden="true">
          <rect x="21" y="18" width="22" height="28" rx="4"></rect>
          <path d="M27 26h10"></path>
          <path d="M27 32h10"></path>
          <circle cx="32" cy="39" r="2" class="fill"></circle>
          <path d="M18 12a22 22 0 0 1 28 0"></path>
          <path d="M22 16a15 15 0 0 1 20 0"></path>
          <path d="M14 24h7"></path>
          <path d="M43 24h7"></path>
          <path d="M14 40h7"></path>
          <path d="M43 40h7"></path>
        </svg>`,
    },
    {
      id: "container",
      title: "Container",
      svg: `
        <svg class="net-svg-icon" viewBox="0 0 64 64" aria-hidden="true">
          <path d="M12 21l20-10 20 10-20 10-20-10z"></path>
          <path d="M12 21v22l20 10 20-10V21"></path>
          <path d="M32 31v22"></path>
        </svg>`,
    },
    {
      id: "wlan",
      title: "WLAN",
      svg: `
        <svg class="net-svg-icon" viewBox="0 0 64 64" aria-hidden="true">
          <path d="M12 25a32 32 0 0 1 40 0"></path>
          <path d="M20 34a20 20 0 0 1 24 0"></path>
          <path d="M28 43a8 8 0 0 1 8 0"></path>
          <circle cx="32" cy="51" r="2.5" class="fill"></circle>
        </svg>`,
    },
    {
      id: "cloud",
      title: "Cloud",
      svg: `
        <svg class="net-svg-icon" viewBox="0 0 64 64" aria-hidden="true">
          <path d="M22 46h25a12 12 0 0 0 0-24h-1A17 17 0 0 0 14 29a9 9 0 0 0 8 17z"></path>
        </svg>`,
    },
    {
      id: "service",
      title: "Service",
      svg: `
        <svg class="net-svg-icon" viewBox="0 0 64 64" aria-hidden="true">
          <circle cx="32" cy="32" r="8"></circle>
          <path d="M32 10v8"></path>
          <path d="M32 46v8"></path>
          <path d="M10 32h8"></path>
          <path d="M46 32h8"></path>
          <path d="M17 17l6 6"></path>
          <path d="M41 41l6 6"></path>
          <path d="M47 17l-6 6"></path>
          <path d="M23 41l-6 6"></path>
        </svg>`,
    },
    {
      id: "security",
      title: "Security",
      svg: `
        <svg class="net-svg-icon" viewBox="0 0 64 64" aria-hidden="true">
          <rect x="16" y="29" width="32" height="24" rx="4"></rect>
          <path d="M23 29v-8a9 9 0 0 1 18 0v8"></path>
          <circle cx="32" cy="41" r="2.5" class="fill"></circle>
        </svg>`,
    },
    {
      id: "home",
      title: "Home / LAN",
      svg: `
        <svg class="net-svg-icon" viewBox="0 0 64 64" aria-hidden="true">
          <path d="M10 31l22-18 22 18"></path>
          <path d="M17 29v24h30V29"></path>
          <path d="M27 53V39h10v14"></path>
        </svg>`,
    },
    {
      id: "internet",
      title: "Internet",
      svg: `
        <svg class="net-svg-icon internet-icon" viewBox="0 0 64 64" aria-hidden="true">
          <circle cx="32" cy="32" r="23"></circle>
          <ellipse cx="32" cy="32" rx="10" ry="23"></ellipse>
          <path d="M9 32h46"></path>
          <path d="M14 21h36"></path>
          <path d="M14 43h36"></path>
          <path d="M32 9v46"></path>
        </svg>`,
    },
    {
      id: "power",
      title: "Logout",
      svg: `
        <svg class="net-svg-icon" viewBox="0 0 64 64" aria-hidden="true">
          <path d="M32 10v20"></path>
          <path d="M20 18a20 20 0 1 0 24 0"></path>
        </svg>`,
    },
    {
      id: "key",
      title: "Passwort",
      svg: `
        <svg class="net-svg-icon" viewBox="0 0 64 64" aria-hidden="true">
          <circle cx="20" cy="32" r="10"></circle>
          <path d="M29 32h27"></path>
          <path d="M46 32v8"></path>
          <path d="M54 32v6"></path>
        </svg>`,
    },
    {
      id: "bolt",
      title: "Ping",
      svg: `
        <svg class="net-svg-icon" viewBox="0 0 64 64" aria-hidden="true">
          <path class="fill" d="M34 6L14 36h14l-4 22 22-30H32l2-22z"></path>
        </svg>`,
    },
    {
      id: "status-online",
      title: "Online",
      svg: `<svg class="net-svg-icon" viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="14" class="fill"></circle></svg>`,
    },
    {
      id: "status-dhcp",
      title: "DHCP",
      svg: `
        <svg class="net-svg-icon" viewBox="0 0 64 64" aria-hidden="true">
          <path d="M46 20a18 18 0 1 0 4 20"></path>
          <path d="M50 8v14h-14"></path>
        </svg>`,
    },
    {
      id: "status-offline",
      title: "Offline",
      svg: `<svg class="net-svg-icon" viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="16"></circle></svg>`,
    },
    {
      id: "status-warning",
      title: "Warnung",
      svg: `
        <svg class="net-svg-icon" viewBox="0 0 64 64" aria-hidden="true">
          <path d="M32 10l24 40H8z"></path>
          <path d="M32 26v12"></path>
          <circle cx="32" cy="44" r="2" class="fill"></circle>
        </svg>`,
    },
    {
      id: "status-unknown",
      title: "Unbekannt",
      svg: `<svg class="net-svg-icon" viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="16" stroke-dasharray="6 6"></circle></svg>`,
    },
    {
      id: "dashboard",
      title: "Homelab",
      svg: `
        <svg class="net-svg-icon" viewBox="0 0 64 64" aria-hidden="true">
          <rect x="8" y="8" width="20" height="20" rx="3"></rect>
          <rect x="36" y="8" width="20" height="20" rx="3"></rect>
          <rect x="8" y="36" width="20" height="20" rx="3"></rect>
          <rect x="36" y="36" width="20" height="20" rx="3"></rect>
        </svg>`,
    },
    {
      id: "info",
      title: "Info",
      svg: `
        <svg class="net-svg-icon" viewBox="0 0 64 64" aria-hidden="true">
          <circle cx="32" cy="32" r="22"></circle>
          <line x1="32" y1="30" x2="32" y2="44"></line>
          <circle cx="32" cy="20" r="1.5" class="fill"></circle>
        </svg>`,
    },
    {
      id: "edit",
      title: "Bearbeiten",
      svg: `
        <svg class="net-svg-icon" viewBox="0 0 64 64" aria-hidden="true">
          <path d="M40 10l14 14-30 30H10V40z"></path>
          <path d="M34 16l14 14"></path>
        </svg>`,
    },
    {
      id: "trash",
      title: "Löschen",
      svg: `
        <svg class="net-svg-icon" viewBox="0 0 64 64" aria-hidden="true">
          <path d="M14 18h36"></path>
          <path d="M24 18V12h16v6"></path>
          <path d="M18 18l3 34h22l3-34"></path>
          <path d="M27 27v17"></path>
          <path d="M37 27v17"></path>
        </svg>`,
    },
    {
      id: "close",
      title: "Schliessen",
      svg: `
        <svg class="net-svg-icon" viewBox="0 0 64 64" aria-hidden="true">
          <path d="M16 16l32 32"></path>
          <path d="M48 16l-32 32"></path>
        </svg>`,
    },
    {
      id: "save",
      title: "Speichern",
      svg: `
        <svg class="net-svg-icon" viewBox="0 0 64 64" aria-hidden="true">
          <path d="M12 10h32l8 8v36H12z"></path>
          <path d="M20 10v14h20V10"></path>
          <path d="M20 54v-16h24v16"></path>
        </svg>`,
    },
    {
      id: "search",
      title: "Suchen",
      svg: `
        <svg class="net-svg-icon" viewBox="0 0 64 64" aria-hidden="true">
          <circle cx="27" cy="27" r="15"></circle>
          <path d="M38 38l14 14"></path>
        </svg>`,
    },
  ];
