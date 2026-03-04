const article = {
  slug: 'hypervisor-one-proxmox-home-lab-future',
  questTitle: 'Hypervisor I Proxmox Home Lab (Future)',
  publishedAt: '2026-03-03',
  content: [
    'This planning article outlines the design target for a Proxmox-based home lab that can host a headless Ubuntu workload and integrate securely with the existing Azure-connected identity environment. The primary intent is to simulate hybrid operations in a low-cost and repeatable test platform.',
    'Initial architecture decisions include segmented networking, controlled management paths, and Tailscale-based site-to-site access to avoid broad inbound exposure. Resource planning will prioritize predictable performance for small automation and monitoring experiments rather than raw VM density.',
    'Once implemented, this lab will serve as a proving ground for configuration management, patching workflows, and resilience tests before production-facing changes. This quest is currently marked as next up and will move into active execution after SSH hardening milestones are closed.'
  ]
};

export default article;
