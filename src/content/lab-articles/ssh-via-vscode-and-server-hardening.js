const article = {
  slug: 'ssh-via-vscode-and-server-hardening',
  questTitle: 'SSH via VS Code & Server Hardening',
  publishedAt: '2026-03-03',
  content: [
    'This workstream focuses on replacing ad-hoc RDP habits with a terminal-first workflow through VS Code Remote SSH while reducing exposed attack surface at the network and host layers. The key objective is to keep remote administration fast without keeping unnecessary ports or privileges open.',
    'Current steps include standardizing SSH key authentication, validating least-privilege user assignments, and tightening NSG rules so management access is explicit and auditable. System updates are being moved to a repeatable cadence with clear rollback points to avoid configuration drift.',
    'The expected result is an admin workflow that is both faster for daily operations and safer by default. This quest remains in progress while hardening controls are documented and tested across the full server lifecycle.'
  ]
};

export default article;
