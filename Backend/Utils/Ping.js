const {exec} = require('child_process');

// Nur IPs/Hostnamen werden zulassen – verhindert Command-Injection über das Ping-Feld / Ist ein Sicherheitsfeature, da der Befehl in einen Shell-Befehl eingebaut wird.
function pingHost(host) {
    return new Promise((resolve) => {
        const safe = /^[a-zA-Z0-9.\-_]+$/.test(host);
        if (!safe) return resolve({online: false, latency: null, error: 'invalid host'});

        const isWin = process.platform === 'win32';
        const cmd = isWin ? `ping -n 3 -w 2500 ${host}` : `ping -c 3 -W 3 ${host}`;

        exec(cmd, {timeout: 12000}, (err, stdout = '', stderr = '') => {
            const output = `${stdout}\n${stderr}`;
            const text = output.toLowerCase();

            const unreachable = 
                text.includes('zielhost nicht erreichbar') ||
                text.includes('destination host unreachable') ||
                text.includes('zeitüberschreitung der anforderung') ||
                text.includes('request timed out') ||
                text.includes('could not find host') ||
                text.includes('name or service not known') ||
                text.includes('temporary failure in name resolution') ||
                text.includes('unknown host') ||
                text.includes('100% loss') ||
                text.includes('100% packet loss');

            const hasReply =
                text.includes(`antwort von ${host.toLowerCase()}`) ||
                text.includes(`reply from ${host.toLowerCase()}`) ||
                /bytes=.*time[=<]/i.test(output) ||
                /ttl=/i.test(output);

            const match = output.match(/(?:time|zeit)[=<]\s*(\d+(?:[.,]\d+)?)\s*ms/i);
            const latency = match ? parseFloat(match[1].replace(',', '.')) : null;

            resolve({ online: hasReply && !unreachable, latency });
        });
    });
}

module.exports = {pingHost}