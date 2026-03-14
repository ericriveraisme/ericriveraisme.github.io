/**
 * Resume Data Structure
 * This file serves as the single source of truth for all resume content
 * Update this file to reflect your current professional information
 */

export const resumeData = {
  // Personal Information
  personal: {
    name: "Eric Rivera",
    title: "IT Systems Administrator | Infrastructure & Operations Specialist",
    tagline: "<IT Systems Administrator / Infrastructure & Operations Specialist>",
    email: "ericriveraisme@gmail.com",
    linkedin: "https://www.linkedin.com/in/eric-rivera-62240818a/",
    github: "https://github.com/ericriveraisme",
    location: "Paragould, AR"
  },

  // Hero/Featured Section
  featured: {
    title: "Sovereign Lab: Network Automation Framework",
    emoji: "🔮",
    description: "The ultimate grimoire for the public documentation of my home lab with a focus on infrastructure as code (IaC), network automation, and hybrid identity. This project serves as a living portfolio of my hands-on experience and technical expertise in IT systems administration.",
    skills: ["Proxmox", "Bash", "LXC", "CI/CD"],
    ctaText: "Enter The Portal",
    ctaLink: "https://github.com/ericriveraisme/sovereign-lab-docs"

  },

  // Character Sheet / About Section
  about: {
    avatar: "🧙‍♂️",
    photo: "/assets/profile-photo.jpg",
    bio: "Detail-oriented IT professional with 12 years of experience bridging high-level Network Operations (NOC) and corporate systems administration. Specialist in high-availability infrastructure, hybrid identity (Active Directory/Entra ID), and technical documentation, with proven ownership across internal IT operations.",
    class: "IT Systems Administrator",
    guild: "Infrastructure & Operations"
  },

  // Skills Section
  skills: [
    { name: "Certifications: CompTIA Network+", level: 10, max: true, color: "bg-purple-900" },
    { name: "Identity & Access (Active Directory, Entra ID)", level: 9, color: "bg-blue-500" },
    { name: "Identity Governance & Access Audits", level: 8, color: "bg-cyan-500" },
    { name: "Infrastructure (Layer 2/3, BGP, VPRN)", level: 9, color: "bg-cyan-500" },
    { name: "Firewall Administration (Meraki, Pan-OS Fundamentals)", level: 8, color: "bg-blue-500" },
    { name: "Endpoint Management (Intune, Imaging, Patch Mgmt)", level: 8, color: "bg-cyan-500" },
    { name: "Microsoft 365 Admin (Exchange, Teams, SharePoint)", level: 8, color: "bg-indigo-500" },
    { name: "SaaS & Cloud Operations (M365, Google Suite)", level: 8, color: "bg-blue-500" },
    { name: "SQL/MySQL Administration", level: 7, color: "bg-cyan-500" },
    { name: "PowerShell & Bash Automation", level: 8, color: "bg-blue-500" },
    { name: "Technical Documentation (SOPs)", level: 9, color: "bg-cyan-500" },
    { name: "Vendor Management & IT Operations", level: 8, color: "bg-indigo-500" },
    { name: "Technical Support & Troubleshooting", level: 9, color: "bg-blue-500" }
  ],

  // Work Experience / Adventure Log
  experience: [
    {
      title: "Technical Support Specialist",
      company: "Irby Utilities (ISP)",
      startDate: "Sept 2025",
      endDate: "Present",
      description: "Serve as a technical advisor for regional ISP infrastructure, supporting NOC services for electrical co-ops with a focus on uptime and reliability.",
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
      description: "Operated in a high-stakes Network Operations Center (NOC), provisioning and maintaining enterprise fiber services.",
      achievements: [
        "Provisioned and stabilized business-critical network services for enterprise clients",
        "Worked with advanced protocols (BGP, VPRN, VPLS) and platforms from Ciena, Nokia, and Cisco"
      ]
    },
    {
      title: "IT Support Specialist II",
      company: "Teleflora (SaaS/MSP)",
      startDate: "April 2024",
      endDate: "Nov 2024",
      description: "Owned administration of Windows/Linux infrastructure and endpoint security operations using Cisco Meraki.",
      achievements: [
        "Performed critical SQL and Linux server maintenance to support POS system data integrity",
        "Managed vendor procurement, RMA workflows, hardware staging, and deployment lifecycle operations"
      ]
    },
    {
      title: "Technical Support",
      company: "Teleflora (SaaS/MSP)",
      startDate: "April 2018",
      endDate: "April 2024",
      description: "Served as primary administrator and support lead for POS networking, software, and hardware across a nationwide client base.",
      achievements: [
        "Authored and maintained internal knowledge base documentation that improved process consistency and onboarding",
        "Managed automated database backup and restore workflows to support disaster recovery readiness"
      ]
    }
  ],

  // Projects Section (optional)
  projects: [
    {
      title: "Network Automation Framework",
      description: "Python-based framework for automating network device configurations",
      technologies: ["Python", "Ansible", "Netmiko", "YAML"],
      link: "#"
    },
    {
      title: "Infrastructure as Code Pipeline",
      description: "GitLab CI/CD pipeline for managing network configurations",
      technologies: ["GitLab CI", "Ansible", "Docker", "Git"],
      link: "#"
    }
  ],

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
