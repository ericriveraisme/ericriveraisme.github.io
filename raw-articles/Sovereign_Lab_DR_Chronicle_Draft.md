# 🧟 Hubris, Hardening, and the Resurrection of the Sovereign Lab

**Date:** April 2026

**Author:** Eric

**Category:** Systems Engineering / Disaster Recovery / Learning in Public

---

There's a specific kind of silence that happens when your hypervisor doesn't POST. It's not like a quiet room. It's the silence of every service you built, every container you configured, every late-night fix you documented — all of it holding its breath, waiting to find out if it still exists.

I heard that silence on a random Tuesday after an ungraceful power loss took out my Proxmox node. No UPS. No graceful shutdown. Just a hard cut to power, followed by a GRUB rescue prompt that might as well have said: *"You thought you were an engineer? Prove it."*

This is the story of how a preventable hardware failure turned into a full-scale Disaster Recovery operation — and how the architectural decisions I'd made months earlier were the only reason it wasn't a total loss. It's a story about hubris, because I knew I needed a UPS and didn't buy one. It's a story about architecture, because the backup strategy I *did* build saved everything that mattered. And it's a story about hardening, because by the time I was done, the Sovereign Lab came back stronger than the version that went down.

If you're building a homelab and you think disaster recovery is something that happens to other people — this one's for you.

---

## 💀 Act I: The Catalyst — Layer 1 Fails First

The first thing I saw after power came back was the Proxmox host dropping into a GRUB rescue shell:

```
error: unknown filesystem.
grub rescue>
```

In my many years of help desk, I've seen plenty of boot failures. The instinct is to start Googling GRUB recovery commands. But something about the way the error appeared — no hesitation, no partial load, just an immediate wall — told me this wasn't a software problem.

I grabbed an Ubuntu Live USB, booted into a recovery environment, and pulled the kernel logs. What I found was not subtle:

```
Buffer I/O error on dev dm-0, logical block 0, async page read
```

That's not a corrupted bootloader. That's the Linux kernel saying, "I tried to read physical data off this drive, and the drive said no." Block zero. The very first logical block. The foundation of the filesystem was gone.

The victim was a 120GB Patriot SSD that had been hosting the Proxmox OS. And here's where it gets instructive — because if you plugged that same drive into a Windows machine and opened Diskpart, you'd see something dangerously misleading:

```
Disk 3    Online    120 GB
Volume 7  Healthy   (FAT32)
```

*Healthy.* Windows was reporting the drive as healthy. The Diskpart status, the Disk Management UI — everything looked fine. Because the FAT32 EFI boot partition at the front of the drive was still physically intact. The controller was happy to serve up those first few hundred megabytes of partition table and boot code. But the LVM root partition — where Proxmox actually *lives* — was physically destroyed. The NAND flash cells that held the operating system had been wiped out by the power surge.

It's called a **"Zombie Drive."** It walks. It talks. Windows says it's alive. But the brain is gone. The kernel logs told the real story, and the real story was: this drive is dead. Decommission it immediately.

**The Lesson:** High-level health indicators lie. Disk Management lies. Diskpart lies. The only truth lives in `dmesg`. If you're ever in doubt about drive integrity after a power event, don't trust the GUI — trust the kernel.

---

## 🏗️ Act II: The Architectural Win — Why Decoupling Saved Everything

Here's the part where past-Eric gets to feel smug for exactly thirty seconds before present-Eric reminds him that the whole disaster was also his fault.

When I originally built the Sovereign Lab, I made a deliberate architectural decision: **decouple the hypervisor OS from the virtual machine payload.** The Proxmox operating system lived on the Patriot 120GB SSD. The actual VMs and containers — the Core-Router, Sovereign-Ops, Technitium DNS, Netdata, everything that makes the lab a lab — lived on a completely separate 465GB SSD mounted as `Sovereign_VMs`.

That decision saved the entire lab.

The OS drive was dead. Gone. Irrecoverable. But because the VM data was on a physically separate disk, every container, every virtual machine, every configuration — all of it was sitting there untouched, waiting patiently on `sdb` like nothing had happened. The power surge killed the pilot, but the passengers were fine.

**The Hardware Swap:** I didn't have a spare SSD lying around, but I did have a 160GB 2.5" laptop hard drive that had been gathering dust inside an old machine. I shucked it, slotted it into the node, and installed a fresh copy of Proxmox. Is a spinning rust HDD ideal for a hypervisor OS? No. Is it dramatically better than "no hypervisor at all"? Absolutely. You MacGyver with what you have.

**The Lesson:** If you take one architectural principle away from this entire article, let it be this: **never put your eggs on the same spindle.** Separate your OS from your data. Make the operating system disposable. If you can reinstall the hypervisor from scratch and point it at an untouched data drive, you've turned a catastrophe into an afternoon project.

---

## 🔧 Act III: Day 1 Operations — Hardening the Fresh Install

Before I could think about restoring VMs, I needed to get the new Proxmox host into a usable state. A vanilla Proxmox install ships configured for enterprise customers with paid subscriptions. I am not an enterprise customer with a paid subscription. I am a guy with a shucked laptop drive and a healthy disrespect for subscription nag screens.

**Step 1: Fix the Repositories**

The default Enterprise repository requires a license key. Without one, `apt update` throws errors and refuses to pull packages. I disabled the Enterprise repo and added the No-Subscription community repository — which is Proxmox's way of saying "we'll still give you the software, but we're going to make you feel a little guilty about it."

**Step 2: Update Everything**

A full `apt update && apt dist-upgrade` to make sure the fresh install was current. No sense rebuilding on top of stale packages.

**Step 3: Kill the Nag Screen**

Every time you log into the Proxmox web UI without a subscription, a modal pops up reminding you that you don't have a subscription. Every. Single. Time. I ran the classic one-liner to silence it:

```bash
sed -i.bak "s/data.status !== 'Active'/false/g" \
  /usr/share/javascript/proxmox-widget-toolkit/proxmoxlib.js && \
  systemctl restart pveproxy.service
```

Is this petty? Maybe. Is it necessary for my sanity during a disaster recovery operation? Absolutely.

**The Lesson:** When you're doing DR, resist the urge to jump straight to restoring services. Take thirty minutes to harden the foundation. Update the host. Fix the repos. Remove friction. You're about to spend hours in this UI — make it a place you can work efficiently.

---

## 🐔 Act IV: The Chicken-and-Egg Network Paradox

This is the section that would've broken me if I hadn't planned for it.

To restore my VMs, I needed the backup files. My backups lived in three tiers:

- **Tier 1:** Proxmox's built-in snapshot system (gone with the OS drive)
- **Tier 2:** A local physical HDD called `Vault_Backups`, mounted directly to the Proxmox host
- **Tier 3:** An SMB share on my NAS, `Bahamut`, accessible over the network

The obvious play is Tier 3 — the NAS has the most recent, most complete backups. One problem: **the network was down.** The virtualized Core-Router was the gateway for the entire internal network. The Core-Router was a dead container on a data drive that wasn't mounted yet. Without the router, there was no Layer 3 connectivity. Without connectivity, there was no NAS. Without the NAS, there were no Tier 3 backups.

It's the homelab version of "I need my password manager to log into my password manager."

This is exactly why Tier 2 exists. The `Vault_Backups` drive is a physical HDD plugged directly into the Proxmox host. No network required. No router required. No DNS required. Just a SATA cable and a mount point.

```bash
mount /dev/sdc1 /mnt/Vault_Backups
```

One command. No dependencies. The backup files were right there.

**The Lesson:** Off-site and network-accessible backups are critical for day-to-day operations. But in a true DR scenario — where the infrastructure *is* the thing that's broken — your first recovery resource must be physically local. If your gateway is down, any backup that requires the gateway might as well not exist. Always maintain at least one backup tier that requires nothing but physical access to the machine.

---

## 🌉 Act V: Rebuilding Layer 2 — The Bridge Nobody Remembers

With the backup files accessible, I restored the Core-Router LXC container first. It's the foundation — without it, nothing else on the network can talk to anything. I imported the container, verified the config looked sane, and hit start.

It didn't work.

The container came up, but it couldn't reach the internal network. FRRouting was running, the interfaces were configured, but packets weren't moving. And for a solid twenty minutes, I stared at the container config trying to figure out what was wrong, because *the container config was fine*.

The problem wasn't inside the guest. It was on the host.

When Proxmox restores a container, it restores the guest configuration — the virtual NICs, the IP assignments, the firewall rules. What it does *not* restore is the **host-level network fabric**. The Core-Router's internal interface was mapped to `vmbr1` — a virtual bridge on the Proxmox host that connects the guest's virtual NIC to the internal VLAN. On the old Proxmox install, `vmbr1` existed. On this fresh install, it didn't. The container was trying to plug into a switch that wasn't there.

I navigated to the Proxmox host's network configuration and manually recreated `vmbr1` — the internal virtual bridge that serves as the backbone for all inter-VLAN traffic. Applied the config. Rebooted the container.

FRRouting took over. Outbound NAT resumed. The internal subnets — `10.0.10.0/24` and `10.0.20.0/24` — came back online. The lab had a heartbeat again.

**The Lesson:** Guest configuration and host network fabric are two completely separate layers. Restoring a VM doesn't restore the host-level bridges, bonds, or VLANs it depends on. In DR planning, document your host network topology with the same rigor you document your guest configurations. `vmbr1` isn't glamorous, but without it, nothing works.

---

## 👻 Act VI: Ghosts in the Machine — Post-Restore Papercuts

With the Core-Router online and the network functional, I restored the rest of the fleet: Sovereign-Ops, Technitium DNS, Netdata, and the user-facing containers. Most of them came up clean. Two of them didn't.

### The Ghost in the CD Tray

One restored VM refused to boot entirely. The error was immediate and cryptic:

```
content-type 'iso' is not available on storage 'local'
```

The VM was trying to boot from a virtual CD-ROM that still had an installation ISO mounted from the original deployment — an ISO that no longer existed on the new host's local storage. The VM was essentially looking for a disc in a tray that had been thrown in the garbage with the old SSD.

**The Fix:** Open the VM's Hardware tab in the Proxmox UI, find the CD/DVD drive, and eject the phantom media. One click. But if you don't know to look for it, you'll spend an embarrassing amount of time wondering why your perfectly good backup won't boot.

### The Proxmox DNS Override

The second issue was more insidious. After restoring the Technitium DNS container, I ran a test query from inside the container itself:

```bash
nslookup google.com 127.0.0.1
```

It should have resolved through Technitium's own resolver. Instead, the container was quietly bypassing itself and querying `1.1.1.1` — Cloudflare's public DNS. My authoritative DNS server was ignoring its own authority and phoning a stranger.

The culprit: Proxmox's LXC management layer. By default, the Proxmox host *owns* the `/etc/resolv.conf` file inside every LXC container. Even if you manually edit it, the hypervisor overwrites it on every boot with whatever DNS settings are configured in the Proxmox GUI. Your container thinks it's in charge. Proxmox knows better.

**The Fix:** Create a hidden flag file inside the container that tells Proxmox to back off:

```bash
touch /etc/.pve-ignore.resolv.conf
```

Then manually set the resolver:

```bash
echo "nameserver 127.0.0.1" > /etc/resolv.conf
```

The `.pve-ignore.resolv.conf` flag is Proxmox's signal to stop managing that file. It's not documented prominently, it's not intuitive, and if you don't know it exists, you'll spend hours wondering why your DNS config keeps reverting. Now Technitium answers for itself, as intended.

**The Lesson:** In highly managed virtualization environments, the hypervisor is the silent landlord. It manages guest configs at a level most administrators don't think about — and it will quietly override your changes without telling you. Understand where the management boundary lies, especially for authoritative services like DNS that *must* control their own resolver.

---

## 🧪 Act VII: The Chaos Test — Trust, but Verify

A DR operation isn't done when the services come up. It's done when they *stay* up — through a reboot, through a power cycle, through the exact scenario that caused the failure in the first place.

**Persistence Checks:**

First, I added the `Vault_Backups` drive to `/etc/fstab` so it mounts automatically:

```
UUID=[DRIVE_UUID] /mnt/Vault_Backups ext4 defaults 0 2
```

Then I verified it with `mount -a` — because writing an fstab entry and *testing* an fstab entry are two very different things, and the gap between them is a boot loop.

I set every restored container and VM to **Start at Boot** in the Proxmox GUI. Then I did the thing that makes every homelab admin's stomach clench: I hard-rebooted the physical server.

Power off. Count to ten. Power on.

Everything came up. The Core-Router initialized. FRRouting rebuilt its routing table. Technitium started answering queries. Netdata began collecting telemetry. The whole stack, from Layer 1 to Layer 7, reassembled itself without a single manual intervention.

**The Asymmetric Ping — A Feature, Not a Bug:**

During post-recovery verification, I noticed something that initially looked like a problem. A user container on VLAN 20 (`10.0.20.x`) could ping my external workstation on the home network (`192.168.0.x`). But when I tried to ping back from the workstation to the container — nothing. Silence.

My help desk reflexes immediately said: *"Something's broken. Check the firewall. Check the routes. Check everything."*

But I stopped. I thought about it. And then I realized — this was the Core-Router doing its job *perfectly*.

The container's outbound ping worked because the Core-Router applies source NAT (masquerading) to all traffic leaving the internal VLANs. The external workstation sees the traffic as coming from the router's WAN IP, not from the internal container. It replies to the router, the router's connection tracking table maps the reply back to the container, and the ping succeeds.

The inbound ping from the workstation failed because there's no existing connection to track. The workstation is trying to initiate a *new* session to a private IP behind a NAT boundary. The router correctly drops it as unsolicited inbound traffic.

This is stateful NAT working exactly as designed. The internal network is protected. Outbound traffic flows freely. Unsolicited inbound traffic gets dropped at the perimeter. The "failure" was actually a validation that the security posture survived the entire DR operation intact.

**The Lesson:** In Disaster Recovery, not every failed ping is a broken configuration. Before you start troubleshooting, ask yourself: *"Is this the intended behavior?"* A true DR test doesn't just verify that services turn on — it verifies that security policies remain enforced.

---

## 🛡️ Act VIII: Day 2 Operations — Never Again

The lab was back. The VMs were running. The routing was correct. The DNS was authoritative. By every reasonable metric, the disaster recovery was complete.

But I wasn't done. Because "recovered" and "hardened" are not the same thing. The lab came back from this event intact, but it came back with the same single point of failure it had before: no host-level configuration backup. If the new OS drive died tomorrow, I'd be recreating `vmbr1` from memory again. Reconfiguring Postfix from scratch again. Rebuilding every host-level customization by hand. Again.

**Permanent Backup Mount:**

I configured a persistent SMB mount to the NAS (`Bahamut`) so Tier 3 backups are available without manual intervention after every reboot.

**Email Alerting:**

I reconfigured Postfix on the management VM to relay through Google's SMTP servers using an App Password. Credential files locked down with `chmod 600` and compiled into hashed database format. The lab can talk to me now — and a system that can't report its own failures is a system you can't trust.

**Automated Host Configuration Backup:**

This is the real hardening. I wrote a Bash script that compresses every critical host-level configuration file into a timestamped archive and sends it to the local backup drive. If the backup succeeds, I get an email. If it fails, I get a different email. No silent failures. No three-week-old surprises.

```bash
#!/bin/bash
# /usr/local/bin/pve-host-backup.sh
# Automated Proxmox host configuration backup

DESTINATION="/mnt/Vault_Backups/pve-host-config-$(date +%F).tar.gz"
EMAIL="ericriveraisme@gmail.com"
HOSTNAME=$(hostname)

if tar -czvf "$DESTINATION" \
  /etc/pve \
  /etc/network/interfaces \
  /etc/fstab \
  /etc/postfix \
  /etc/vzdump.conf > /dev/null 2>&1; then
    echo "[$HOSTNAME] Host config backup SUCCESS: $DESTINATION" | \
      mail -s "Sovereign Lab: Backup SUCCESS on $HOSTNAME" "$EMAIL"
else
    echo "[$HOSTNAME] Host config backup FAILED" | \
      mail -s "Sovereign Lab: Backup FAILED on $HOSTNAME" "$EMAIL"
fi
```

Triggered nightly via crontab:

```
0 3 * * * /usr/local/bin/pve-host-backup.sh
```

Every night at 3:00 AM, the script runs, the archive gets written, and I get an email confirming it worked. If the drive fills up, if the mount drops, if something goes sideways — I'll know about it before my morning coffee, not three disasters from now.

**The Lesson:** Recovery is reactive. Hardening is proactive. The goal isn't to get good at rebuilding your environment — it's to make rebuilding unnecessary. Every config file that isn't backed up is a config file you're volunteering to recreate from memory under pressure. Automate the boring stuff so future-you can focus on the interesting problems.

---

## 🔭 Conclusion: The Moral of the Surge

Let me be honest about the root cause, because it deserves to be said plainly: **this entire disaster was preventable.** A UPS — a basic, consumer-grade uninterruptible power supply — would have given the hypervisor enough time to shut down gracefully. The SSD wouldn't have been hit with a dirty power event. The NAND wouldn't have degraded. The LVM partition wouldn't have been destroyed. None of this needed to happen.

I knew I needed a UPS. I'd thought about it. I'd even priced a few out. But I didn't buy one, because the lab was "working fine" and there were always more interesting things to spend time on — a new container to build, a new routing policy to test, a new article to write. Hubris isn't always dramatic. Sometimes it's just quiet procrastination dressed up as prioritization.

But here's the thing about hubris in a homelab: it's also the engine that drives you to build things worth protecting. You don't agonize over a dead drive unless the infrastructure behind it matters to you. You don't spend two days on a full DR operation unless the thing you're recovering is something you're genuinely proud of.

The Sovereign Lab survived this event not because of luck, and not because of heroics. It survived because of **architecture**. The decision to decouple OS and data storage. The decision to maintain a physically local backup tier. The decision to document configurations in Obsidian and version them in Git. Every one of those choices was made on a quiet Tuesday night when nothing was broken — and every one of them paid dividends the moment everything went wrong.

What's different now:

- A UPS is on order. (Yes, I finally bought one.)
- Host-level configs are backed up automatically with email alerting.
- The `Vault_Backups` drive is persistent in fstab — no manual mounts required.
- Every VM is configured to start at boot.
- The full DR process is documented — including this article — so the next time something fails (and it will), the runbook is already written.

Disaster recovery isn't a checkbox on a compliance form. It's an iterative process of making today's catastrophe into tomorrow's minor inconvenience. The lab that went down required two days of manual recovery. The lab that came back up can survive the same failure with a cron job and a reboot.

That's the real lesson of learning in public: you don't just share your wins. You share the moments where your own shortcuts caught up with you, you document exactly how you dug yourself out, and you harden the environment so the same lesson never needs to be learned twice.

The Sovereign Lab is back online. It's backed up. It's monitored. And this time, it's plugged into a UPS.

See you in the terminal.

*Eric Rivera*
*Sovereign Lab Architect (in training)*
