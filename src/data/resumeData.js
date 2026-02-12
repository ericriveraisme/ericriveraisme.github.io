/**
 * Resume Data Structure
 * This file serves as the single source of truth for all resume content
 * Update this file to reflect your current professional information
 */

export const resumeData = {
  // Personal Information
  personal: {
    name: "Eric Rivera",
    title: "IT Professional",
    tagline: "<IT Professional/Amatuer Vibe-Coder>",
    email: "ericriveraisme@gmail.com",
    github: "https://github.com/ericriveraisme",
    phone: null, // Available upon request
    location: "USA"
  },

  // Hero/Featured Section
  featured: {
    title: "NetDevOps Complete",
    emoji: "🔮",
    description: "The ultimate grimoire for network automation. A comprehensive framework orchestrating the network infrastructure, one packet at a time.",
    skills: ["Python", "Ansible", "Docker", "CI/CD"],
    ctaText: "Enter The Portal",
    ctaLink: "https://github.com/ericriveraisme/netdevops-complete"
  },

  // Character Sheet / About Section
  about: {
    avatar: "🧙‍♂️",
    bio: "12 years of hands-on experience in technical support and systems administration. Proven track record as a trusted technical advisor, excelling in proactive planning, complex problem-solving, and delivering exceptional client service across networking, systems administration, and IT operations.",
    class: "IT Professional",
    guild: "NetDevOps"
  },

  // Skills Section
  skills: [
    { name: "Network Administration", level: 9, color: "bg-blue-500" },
    { name: "System Administration", level: 8, color: "bg-cyan-500" },
    { name: "Networking Protocols (BGP, TCP/IP, DNS, DHCP)", level: 8, color: "bg-cyan-500" },
    { name: "Layer 2/3 Device Management", level: 8, color: "bg-blue-500" },
    { name: "Windows & Linux Systems", level: 8, color: "bg-cyan-500" },
    { name: "Technical Support & Troubleshooting", level: 9, color: "bg-cyan-500" },
    { name: "Active Directory", level: 7, color: "bg-indigo-500" },
    { name: "SQL & Database Management", level: 7, color: "bg-blue-500" },
    { name: "PowerShell & Bash", level: 7, color: "bg-cyan-500" },
    { name: "Virtualization (VMware, Hyper-V)", level: 6, color: "bg-indigo-500" },
    { name: "Client Relations & Communication", level: 9, color: "bg-blue-500" },
    { name: "Problem Solving & Conflict Resolution", level: 9, color: "bg-cyan-500" }
  ],

  // Active Quests / Current Goals
  activeQuests: [
    {
      title: "Physical Cultivation",
      description: "Increasing strength stats & endurance."
    },
    {
      title: "Arcane Studies",
      description: "Mastering NetDevOps & Python scripting."
    },
    {
      title: "Linguistic Decoding",
      description: "Learning Japanese (Nihongo)."
    }
  ],

  // Work Experience / Adventure Log
  experience: [
    {
      title: "Technical Support Specialist",
      company: "Irby Utilities (ISP)",
      startDate: "Sept 2025",
      endDate: "Present",
      description: "Provided essential Tier 1 call center support and troubleshooting for regional ISP support centers, assisting small electrical co-op utilities with technical and NOC services.",
      achievements: [
        "Provided prompt and expedient technical support for various ONT and AP manufacturers across 10+ local ISPs",
        "Managed Calix, TPLink, DZS, Zyxel devices with fiber and wi-fi technologies",
        "Assisted end users with consumer-grade devices"
      ]
    },
    {
      title: "Field Service Technician",
      company: "Visual Edge IT (MSP)",
      startDate: "March 2025",
      endDate: "Sept 2025",
      description: "Responded to and managed service request tickets in a professional and timely manner.",
      achievements: [
        "Interfaced directly with on-site IT teams to troubleshoot complex networking and software issues related to office printing solutions",
        "Provided high-level service to business clients through prompt and effective communication"
      ]
    },
    {
      title: "Network Support Specialist",
      company: "Ritter Communications (ISP)",
      startDate: "Nov 2024",
      endDate: "March 2025",
      description: "Provided high-level network provisioning and troubleshooting support for business clients.",
      achievements: [
        "Operated within a Network Operation Center (NOC) to resolve fiber optic hardware and service issues",
        "Worked with advanced networking protocols (BGP, VPRN, VPSL) and enterprise-level devices from Ciena, Nokia, and Cisco"
      ]
    },
    {
      title: "IT Support Specialist II",
      company: "Teleflora (SaaS/MSP)",
      startDate: "April 2024",
      endDate: "Nov 2024",
      description: "Administered and maintained Windows and Linux systems using Cisco Meraki products.",
      achievements: [
        "Managed vendor relationships, including coordinating RMAs and staging servers",
        "Performed database management on SQL and Linux servers to ensure system reliability"
      ]
    },
    {
      title: "Technical Support",
      company: "Teleflora (SaaS/MSP)",
      startDate: "April 2018",
      endDate: "April 2024",
      description: "Served as the primary point of contact for technical support and troubleshooting of networking, software, and hardware for a point-of-sale system.",
      achievements: [
        "Created and maintained technical documentation, improving procedural efficiency and assisting in the training of new staff",
        "Managed database backups, restores, and bug tracking through a ticketing system"
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
