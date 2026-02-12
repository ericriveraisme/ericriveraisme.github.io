/**
 * Resume Data Structure
 * This file serves as the single source of truth for all resume content
 * Update this file to reflect your current professional information
 */

export const resumeData = {
  // Personal Information
  personal: {
    name: "Eric Rivera",
    title: "NetDevOps Mage",
    tagline: "&lt;NetDevOps Mage /&gt;",
    email: "eric@example.com",
    github: "https://github.com/ericriveraisme",
    phone: "+1 (XXX) XXX-XXXX",
    location: "City, State"
  },

  // Hero/Featured Section
  featured: {
    title: "NetDevOps Complete",
    emoji: "🔮",
    description: "The ultimate grimoire for network automation. A comprehensive framework orchestrating the network infrastructure, one packet at a time.",
    skills: ["Python", "Ansible", "Docker", "CI/CD"],
    ctaText: "Enter The Portal",
    ctaLink: "#"
  },

  // Character Sheet / About Section
  about: {
    avatar: "🧙‍♂️",
    bio: "Greetings, traveler. I am Eric Rivera, a Full Stack Developer specializing in Network Automation. I bridge the gap between traditional networking hardware and modern software development practices.",
    class: "Technomancer",
    guild: "NetDevOps"
  },

  // Skills Section
  skills: [
    { name: "Network Engineering", level: 10, color: "bg-blue-500" },
    { name: "Python Automation", level: 9, color: "bg-cyan-500" },
    { name: "Ansible", level: 9, color: "bg-cyan-500" },
    { name: "Docker/K8s", level: 7, color: "bg-indigo-500" },
    { name: "BGP/OSPF Routing", level: 9, color: "bg-blue-500" },
    { name: "CI/CD Pipeline", level: 8, color: "bg-cyan-500" }
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
      title: "Senior Network Engineer",
      company: "TechCorp Citadel",
      startDate: "2020",
      endDate: "Present",
      description: "Led the modernization of legacy infrastructure into a software-defined network. Implemented CI/CD pipelines for network config changes using GitLab and Ansible, reducing deployment time by 80%.",
      achievements: [
        "Designed and deployed software-defined networking (SDN) solutions",
        "Automated 200+ network devices using Ansible playbooks",
        "Implemented GitLab CI/CD pipeline for infrastructure-as-code",
        "Reduced network provisioning time from hours to minutes"
      ]
    },
    {
      title: "Network Administrator",
      company: "Regional ISP",
      startDate: "2017",
      endDate: "2020",
      description: "Managed OSPF and BGP routing for a regional backbone serving 50k+ subscribers. Troubleshooting complex layer 2/3 issues.",
      achievements: [
        "Managed core routing infrastructure for 50,000+ customers",
        "Implemented advanced routing protocols (OSPF, BGP, EIGRP)",
        "Troubleshot and resolved layer 2/3 network issues",
        "Maintained 99.95% network uptime"
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
    {
      title: "Certified Kubernetes Administrator (CKA)",
      issuer: "Linux Foundation",
      year: "2023"
    },
    {
      title: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      year: "2022"
    }
  ],

  // Footer
  footer: {
    copyright: "Eric Rivera",
    craftedWith: "React & Tailwind"
  }
};
