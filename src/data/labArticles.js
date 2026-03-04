export const labArticles = [
  {
    slug: 'hybrid-cloud-identity-bridge-ad-entra-id',
    questTitle: 'Hybrid Cloud Identity Bridge (AD → Entra ID)',
    publishedAt: '2026-03-03',
    content: [
      'This lab validated a practical hybrid identity foundation from an on-prem style Active Directory domain controller to Microsoft Entra ID. The objective was to prove account lifecycle consistency from initial provisioning through cloud synchronization and sign-in readiness.',
      'The build started with Azure Windows Server 2025 base hardening, AD DS and DNS role configuration, and replication health checks. After baseline validation, users were bulk-provisioned with structured naming patterns through PowerShell to verify repeatable automation instead of manual point-and-click account creation.',
      'Once identity objects were stable in AD, Entra Connect synchronization cycles were observed for initial import and delta updates. Attribute consistency and expected object states were verified to ensure that account metadata remained predictable across directory boundaries.',
      'The final outcome was a repeatable identity bridge pattern that can be reused for future tenant and lab scenarios. This work is now logged as a completed quest and serves as a foundation for upcoming hardening and hybrid infrastructure experiments.'
    ]
  },
  {
    slug: 'ssh-via-vscode-and-server-hardening',
    questTitle: 'SSH via VS Code & Server Hardening',
    publishedAt: '2026-03-03',
    content: [
      'This workstream focuses on replacing ad-hoc RDP habits with a terminal-first workflow through VS Code Remote SSH while reducing exposed attack surface at the network and host layers. The key objective is to keep remote administration fast without keeping unnecessary ports or privileges open.',
      'Current steps include standardizing SSH key authentication, validating least-privilege user assignments, and tightening NSG rules so management access is explicit and auditable. System updates are being moved to a repeatable cadence with clear rollback points to avoid configuration drift.',
      'The expected result is an admin workflow that is both faster for daily operations and safer by default. This quest remains in progress while hardening controls are documented and tested across the full server lifecycle.'
    ]
  },
  {
    slug: 'hypervisor-one-proxmox-home-lab-future',
    questTitle: 'Hypervisor I Proxmox Home Lab (Future)',
    publishedAt: '2026-03-03',
    content: [
      'This planning article outlines the design target for a Proxmox-based home lab that can host a headless Ubuntu workload and integrate securely with the existing Azure-connected identity environment. The primary intent is to simulate hybrid operations in a low-cost and repeatable test platform.',
      'Initial architecture decisions include segmented networking, controlled management paths, and Tailscale-based site-to-site access to avoid broad inbound exposure. Resource planning will prioritize predictable performance for small automation and monitoring experiments rather than raw VM density.',
      'Once implemented, this lab will serve as a proving ground for configuration management, patching workflows, and resilience tests before production-facing changes. This quest is currently marked as next up and will move into active execution after SSH hardening milestones are closed.'
    ]
  },
  {
    slug: 'hybrid-cloud-identity-bridge-sync-validation-pass-2',
    questTitle: 'Hybrid Cloud Identity Bridge (AD → Entra ID)',
    publishedAt: '2026-03-04',
    content: [
      'This follow-up pass focused on validating day-two identity operations after the initial bridge build. The goal was to confirm that account updates, disable actions, and attribute changes propagate predictably from AD to Entra without manual reconciliation.',
      'A controlled batch of test users was modified using scripted updates for department values, group membership, and account state transitions. Delta sync timing was observed to establish practical expectations for operational change windows and support response procedures.',
      'Validation checks confirmed object consistency and expected access behavior after synchronization cycles completed. This pass establishes confidence that routine identity maintenance can be automated while preserving clear auditability and rollback options.'
    ]
  },
  {
    slug: 'ssh-via-vscode-and-server-hardening-baseline-controls',
    questTitle: 'SSH via VS Code & Server Hardening',
    publishedAt: '2026-03-05',
    content: [
      'This test article captures the first hardening baseline checkpoint for the SSH-focused administration workflow. The objective was to verify that secure defaults are enforced before expanding remote operations across additional hosts.',
      'Baseline controls included key-only SSH authentication, explicit sudo role boundaries, and tightened network exposure to only approved management sources. Session logging and update cadence notes were also documented to improve incident reconstruction and maintenance consistency.',
      'The resulting baseline creates a safer and more predictable operating posture while keeping the developer workflow efficient. Subsequent iterations will focus on incremental policy automation and expanded host coverage using the same control pattern.'
    ]
  }
];
