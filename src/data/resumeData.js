/**
 * Resume Data Structure
 * This file serves as the single source of truth for all resume content
 * Update this file to reflect your current professional information
 */

export const resumeData = {
  // Personal Information
  personal: {
    name: "Eric Rivera",
    title: "Infrastructure & Network Engineer | NOC Operations",
    tagline: "<Infrastructure & Network Engineer / NOC Operations>",
    email: "ericriveraisme@gmail.com",
    linkedin: "https://www.linkedin.com/in/eric-rivera-62240818a/",
    github: "https://github.com/ericriveraisme",
    location: "Paragould, AR"
  },

  // Hero/Featured Section
  featured: {
    title: "Sovereign Lab: Network Automation Framework",
    emoji: "🔮",
    description: "A self-hosted virtual data center built on Proxmox — Layer 3 routing, authoritative DNS, automated backup pipelines, and full documentation. Designed, deployed, and documented from scratch as a living portfolio of hands-on infrastructure engineering.",
    skills: ["Proxmox", "Bash", "LXC", "CI/CD", "Ansible", "Python", "Git", "BGP"],
    ctaText: "Enter The Portal",
    ctaLink: "https://github.com/ericriveraisme/sovereign-lab-docs"
  },

  // Character Sheet / About Section
  about: {
    avatar: "🧙‍♂️",
    photo: "/assets/profile-photo.jpg",
    bio: "Infrastructure engineer with 12 years across NOC operations, systems administration, and hybrid identity (AD/Entra ID). Currently building a self-hosted virtual data center — designing Layer 3 routing, authoritative DNS, automated backup pipelines, and the documentation to match. 12 years of keeping systems running; now engineering them from the ground up.",
    class: "Network Engineer",
    guild: "Infrastructure & NOC Operations",
    nextMission: "A senior infrastructure role where I can bring NOC operations experience, automation discipline, and the ownership mindset I've built across 12 years of keeping systems alive."
  },

  // Skills Section
  skills: [
    { name: "Certifications: CompTIA Network+", level: 10, max: true, color: "bg-purple-900", qualifier: "Verified" },
    { name: "Infrastructure (Layer 2/3, BGP, VPRN)", level: 9, color: "bg-cyan-500", qualifier: "Production NOC" },
    { name: "DNS & Network Services", level: 9, color: "bg-cyan-500", qualifier: "Self-hosted Authoritative" },
    { name: "Firewall Administration (Meraki, Pan-OS)", level: 8, color: "bg-blue-500", qualifier: "Enterprise" },
    { name: "Hybrid Identity (Active Directory / Entra ID)", level: 9, color: "bg-blue-500", qualifier: "6+ Years" },
    { name: "Linux Systems Administration", level: 8, color: "bg-cyan-500", qualifier: "Proxmox / Ubuntu / Debian" },
    { name: "Automation (Bash, Git, Cron, Ansible)", level: 8, color: "bg-blue-500", qualifier: "Production Scripts" },
    { name: "Endpoint Management (Intune, SCCM)", level: 8, color: "bg-cyan-500", qualifier: "Corporate Fleet" },
    { name: "Technical Documentation (SOPs, Runbooks)", level: 9, color: "bg-cyan-500", qualifier: "Published Articles" },
    { name: "Technical Support & Troubleshooting", level: 9, color: "bg-blue-500", qualifier: "Tier 1–3 Escalation" }
  ],

  // Work Experience / Adventure Log
  experience: [
    {
      title: "Technical Support Specialist",
      company: "Irby Utilities (ISP)",
      startDate: "Sept 2025",
      endDate: "Present",
      context: "Current role — supporting regional ISP infrastructure with a focus on uptime and reliability.",
      description: "Serve as a technical advisor for regional ISP infrastructure, supporting NOC services for electrical co-ops.",
      achievements: [
        "Administer and troubleshoot enterprise ONT/AP platforms (Calix, DZS, Zyxel) across fiber and Wi-Fi environments",
        "Execute complex Tier 1/2 troubleshooting to maintain consistent service availability",
        "Provide escalation-ready diagnostics and clear customer-impact communication"
      ]
    },
    {
      title: "Field Service Technician",
      company: "Visual Edge IT (MSP)",
      startDate: "March 2025",
      endDate: "Sept 2025",
      context: "Took a field role to broaden hardware and on-site troubleshooting across diverse business environments.",
      description: "Managed the full lifecycle of office printing and networking solutions for business clients across diverse environments.",
      achievements: [
        "Collaborated directly with onsite IT teams to resolve critical hardware and software bottlenecks",
        "Improved service quality through stronger documentation, reporting, and communication standards"
      ]
    },
    {
      title: "Network Support Specialist",
      company: "Ritter Communications (ISP)",
      startDate: "Nov 2024",
      endDate: "March 2025",
      context: "Moved into ISP infrastructure to get hands-on NOC experience with BGP, VPLS, and Ciena/Nokia platforms.",
      description: "Operated in a high-stakes Network Operations Center (NOC), provisioning and maintaining enterprise fiber services.",
      achievements: [
        "Provisioned and stabilized business-critical network services for enterprise clients",
        "Worked with advanced protocols (BGP, VPRN, VPLS) and platforms from Ciena, Nokia, and Cisco"
      ]
    },
    {
      title: "Technical Support → IT Support Specialist II",
      company: "Teleflora (SaaS/MSP)",
      startDate: "April 2018",
      endDate: "Nov 2024",
      context: "6+ years — promoted from frontline support to infrastructure administration and endpoint security.",
      description: "Started as primary support lead for POS networking across a nationwide client base, promoted to own Windows/Linux infrastructure administration and endpoint security operations using Cisco Meraki.",
      achievements: [
        "Promoted from Technical Support to IT Support Specialist II based on performance and infrastructure ownership",
        "Performed critical SQL and Linux server maintenance to support POS system data integrity",
        "Managed vendor procurement, RMA workflows, hardware staging, and deployment lifecycle operations",
        "Authored and maintained internal knowledge base documentation that improved process consistency and onboarding",
        "Managed automated database backup and restore workflows to support disaster recovery readiness"
      ]
    }
  ],

  // Projects Section
  projects: [],  // Sovereign Lab is featured above — no placeholder projects

  // Certifications (optional)
  certifications: [
    // Add your actual certifications here
    // Ensure certifications match your work history and are verifiable
  ],

  // Footer
  footer: {
    copyright: "Eric Rivera",
    craftedWith: "React & Tailwind"
  }
};
