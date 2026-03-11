# **Sovereign Lab Day 1: Breaking the Concrete and Laying the Foundation**

**By: Eric** | *March 9, 2024* | #Proxmox #HomeLab #CCNA #Networking #LearningInPublic

They say that at 40, you should probably be looking for hobbies that are "relaxing." Instead, I decided to spend eight hours in the middle of a night shift building a sovereign infrastructure from the bare metal up.

Welcome to **Day 1 of the Sovereign Lab**.

This isn't just a home lab; it's a dedicated environment designed for CCNA mastery, total data sovereignty, and—eventually—enterprise-grade visibility. Here is exactly how the first marathon session went down.

## **🏗️ The Vision: Why "Sovereign"?**

Most home labs are built on "best effort" networking. You plug a server into your ISP router, get a DHCP address, and hope for the best. I wanted something different. I wanted a "Glass Box"—a lab that is architecturally isolated from my home life but visible to the world.

The goal for Day 1 was simple but daunting: Get Proxmox running, establish a tiered storage system, and spin up the first two pillars of the network.

## **🛠️ Phase 1: The Bare Metal & Proxmox Install**

The heart of the lab is a dedicated physical server. I started by installing **Proxmox VE**. If you've never used it, Proxmox is a Type-1 Hypervisor based on Debian. It’s the "Gold Standard" for open-source virtualization.

### **The First "Fix": The No-Subscription Nag**

One of the first things any Proxmox user does is swap the enterprise repository for the "no-subscription" version so you can actually update the system.

**The Code:**

```
# Remove the enterprise list  
rm /etc/apt/sources.list.d/pve-enterprise.list

# Add the no-subscription repository  
echo "deb http://download.proxmox.com/debian/pve bookworm pve-no-subscription" > /etc/apt/sources.list.d/pve-install-repo.list

# Update the system  
apt update && apt upgrade -y
```

## **💾 Phase 2: Tiered Storage (The SSD/HDD Split)**

I didn't want a "flat" storage pool. I wanted performance where it counts and mass storage where it lasts.

* **Tier 1 (Performance):** A high-speed SSD for the Proxmox OS and active VM disks.  
* **Tier 2 (The Vault):** A physical 2TB HDD dedicated strictly to snapshots and backups.

I physically mounted the "Vault" drive and mapped it to `/mnt/pve/Vault_Backups`. This ensures that even if I destroy a VM during a CCNA lab, I can restore it in seconds from a local physical disk.

## **🌐 Phase 3: The Virtual Bridge & The Tailscale Pivot**

Networking is where the "House of Cards" usually starts to wobble.

### **The Linux Bridge**

I configured vmbr0 to act as the primary bridge, linking my physical NIC to my virtual world. I also began the logical mapping of my VLANs:

* **VLAN 10:** Management Plane (The "Adults" table).  
* **VLAN 20:** Sandbox (Where I break things).

### **The Tailscale Pivot (A Major Success)**

I initially tried managing the lab via standard Windows networking, but it was clunky. I pivoted and installed **Tailscale** directly on the Proxmox host. This was a game-changer.

**The Code:**

```
# Installing Tailscale on the Proxmox Host  
curl -fsSL https://tailscale.com/install.sh | sh  
tailscale up
```

Suddenly, I had a secure, encrypted tunnel into my datacenter that worked from my laptop (Tiamat) and my workstation (Bahamut) regardless of where I was sitting.

## **💻 Phase 4: The First Inhabitants (LXC 100 & VM 101)**

By hour six, it was time to breathe life into the machines.

1. **LXC 100 (The Core-Router):** A lightweight Linux Container. This is the brain of the lab's network. I installed **FRRouting (FRR)** here, preparing it for the Cisco-style configuration to come.  
2. **VM 101 (Sovereign-Ops):** My Ubuntu Server management cockpit. This is where my scripts, Git repos, and orchestration tools live.

## **❌ Failures & Lessons Learned (The "Learning in Public" Part)**

No 8-hour session is without its "bang your head against the wall" moments.

### **Failure 1: The Case-Sensitivity Trap**

I spent nearly an hour debugging a "Drive Not Found" error. I was looking for `/mnt/pve/vault_backups`. The drive was mounted at `/mnt/pve/Vault_Backups`.

* **Lesson:** Linux is a strict teacher. In Windows, we get lazy with case sensitivity. In Proxmox, "V" and "v" are different universes.

### **Failure 2: The Relative Path Mistake**

I tried to run my first backup script using relative paths. When the script ran, it couldn't find the rsync binary because the environment didn't have my $PATH.

* **Lesson:** Automation has no "sense of place." Always use absolute paths (e.g., /usr/bin/rsync) in scripts.

## **✅ Day 1 Successes**

* **Physical to Logical:** Successfully transformed a pile of hardware into a functional virtual datacenter.  
* **Tiered Backups:** Verified that I could snap a VM from the SSD to the HDD Vault in under 60 seconds.  
* **Remote Dev Access:** Established password-less SSH keys on the Ops VM.

**The Code:**

```
# Generating the identity for the Ops VM  
ssh-keygen -t ed25519 -C "eric-sovereign-ops"
```

## **🏁 Conclusion**

As the night shift ended, I looked at a dashboard with two green icons and a secure Tailscale tunnel. Day 1 was a success not because everything went perfectly, but because every failure taught me something about the architecture I'm building.

The foundation is poured. The "House of Cards" has its first steel beams.

*Stay tuned for Day 2, where we tackle persistent Cisco-grade routing and the battle against the "Ghost IP."*
