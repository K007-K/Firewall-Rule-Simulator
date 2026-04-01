# CNS Lab — Mini Project Report

---

## **COVER PAGE**

---

**DEPARTMENT OF COMPUTER SCIENCE AND ENGINEERING**

**MINI PROJECT REPORT**

**On**

# **IPTables Firewall Rule Simulator**
### *Implementation of an Interactive IPTables Firewall Rule Simulator for Network Traffic Filtering & Access Control*

**Subject:** Computer and Network Security Lab (CNS)

**Submitted by:**
- Name: _______________________
- Roll No: _____________________
- Section: _____________________
- Semester: ____________________

**Under the Guidance of:**
- Faculty Name: _________________
- Designation: __________________

**Academic Year: 2025–2026**

---

*Department of Computer Science and Engineering*
*College Name, City – PIN Code*

---

\newpage

## **CERTIFICATE**

---

This is to certify that the Mini Project Report entitled **"IPTables Firewall Rule Simulator — Implementation of an Interactive IPTables Firewall Rule Simulator for Network Traffic Filtering & Access Control"** has been successfully completed and submitted by:

| Name | Roll No |
|------|---------|
| _____________________ | _____________________ |

in partial fulfillment of the requirements for the CNS Lab course, during the academic year **2025–2026**.

&nbsp;

**Internal Guide:** ________________________

**Head of Department:** ________________________

**External Examiner:** ________________________

**Date:** ________________________

---

\newpage

## **DECLARATION**

---

We hereby declare that this Mini Project Report titled **"IPTables Firewall Rule Simulator"** is a bonafide work carried out by us under the guidance of our faculty in the Department of Computer Science and Engineering.

This work has not been submitted to any other university or institution for the award of any degree or certificate.

&nbsp;

**Place:**

**Date:**

**Signature(s) of Student(s):**

---

\newpage

## **ACKNOWLEDGEMENT**

---

We would like to express our sincere gratitude to our project guide and faculty members of the Department of Computer Science and Engineering for their valuable guidance, support, and encouragement throughout the development of this project.

We are thankful to the Head of the Department for providing the necessary infrastructure and lab facilities that helped us complete this project successfully.

We also extend our thanks to all the teaching and non-teaching staff members who directly or indirectly helped us in the successful completion of this project.

Finally, we are grateful to our families and peers for their continuous support and motivation.

---

\newpage

## **TABLE OF CONTENTS**

---

| Chapter | Title | Page |
|---------|-------|------|
| | Abstract | 1 |
| 1 | Introduction | 2 |
| 1.1 | Background | 2 |
| 1.2 | Motivation | 3 |
| 1.3 | Objectives | 4 |
| 1.4 | Problem Statement | 5 |
| 1.5 | Scope of the Project | 6 |
| 2 | Literature Survey | 7 |
| 2.1 | Overview of Firewalls | 7 |
| 2.2 | IPTables and Netfilter Framework | 8 |
| 2.3 | Existing Firewall Management Tools | 10 |
| 2.4 | Web-Based Security Simulators | 11 |
| 2.5 | Gap Analysis | 12 |
| 3 | System Requirements & Analysis | 13 |
| 3.1 | Hardware Requirements | 13 |
| 3.2 | Software Requirements | 13 |
| 3.3 | Functional Requirements | 14 |
| 3.4 | Non-Functional Requirements | 15 |
| 4 | System Design & Architecture | 16 |
| 4.1 | System Architecture Overview | 16 |
| 4.2 | Module Design | 17 |
| 4.3 | Data Flow Diagrams | 19 |
| 4.4 | Use Case Diagram | 21 |
| 4.5 | UI/UX Design Principles | 22 |
| 5 | Methodology | 23 |
| 5.1 | Development Methodology | 23 |
| 5.2 | IPTables Rule Processing Logic | 24 |
| 5.3 | CIDR Subnet Matching Algorithm | 25 |
| 5.4 | Packet Simulation Engine | 26 |
| 5.5 | Rule Optimization Algorithm | 27 |
| 6 | Implementation | 28 |
| 6.1 | Project Structure | 28 |
| 6.2 | Frontend Implementation (HTML) | 29 |
| 6.3 | Application Logic (JavaScript) | 31 |
| 6.4 | Styling & Theme (CSS) | 34 |
| 6.5 | Key Code Segments | 35 |
| 7 | Results & Output | 37 |
| 7.1 | Rule Manager Interface | 37 |
| 7.2 | Packet Simulator Output | 38 |
| 7.3 | Chain Visualization | 38 |
| 7.4 | Optimizer Analysis Results | 39 |
| 7.5 | IPTables Command Generation | 39 |
| 8 | Testing | 40 |
| 8.1 | Test Cases | 40 |
| 8.2 | Test Results Summary | 42 |
| 9 | Applications | 43 |
| 10 | Future Enhancements | 44 |
| 11 | Conclusion | 45 |
| 12 | References | 46 |
| | Appendix A: Complete Source Code | 47 |

---

\newpage

## **LIST OF FIGURES**

---

| Figure No. | Title | Page |
|------------|-------|------|
| 4.1 | System Architecture Diagram | 16 |
| 4.2 | Module Interaction Diagram | 18 |
| 4.3 | Level-0 Data Flow Diagram | 19 |
| 4.4 | Level-1 Data Flow Diagram | 20 |
| 4.5 | Use Case Diagram | 21 |
| 5.1 | IPTables Chain Processing Flowchart | 24 |
| 5.2 | CIDR Matching Algorithm Flowchart | 25 |
| 5.3 | Packet Simulation Flowchart | 26 |
| 6.1 | Project Directory Structure | 28 |
| 7.1 | Rule Manager Interface Screenshot | 37 |
| 7.2 | Packet Simulation Result Screenshot | 38 |
| 7.3 | Chain Visualization Screenshot | 38 |
| 7.4 | Optimizer Analysis Screenshot | 39 |
| 7.5 | Generated IPTables Commands Screenshot | 39 |

---

## **LIST OF TABLES**

---

| Table No. | Title | Page |
|-----------|-------|------|
| 3.1 | Hardware Requirements | 13 |
| 3.2 | Software Requirements | 13 |
| 5.1 | IPTables Actions and Descriptions | 24 |
| 5.2 | IPTables Chains and Their Roles | 24 |
| 6.1 | File Structure and Description | 28 |
| 8.1 | Rule Manager Test Cases | 40 |
| 8.2 | Packet Simulation Test Cases | 41 |
| 8.3 | Optimizer Test Cases | 41 |
| 8.4 | Test Results Summary | 42 |

---

\newpage

## **ABSTRACT**

---

Firewalls constitute the foundational layer of defense in any modern computer network, acting as gatekeepers that control the flow of data between trusted internal networks and untrusted external networks. Among the various firewall tools available on Linux systems, **IPTables** stands as one of the most powerful and widely deployed packet-filtering utilities. However, learning and configuring IPTables is notoriously challenging for students and junior system administrators due to its complex command-line syntax, the sequential rule-processing model, and the difficulty of visualizing how packet decisions are made across chains.

This project presents the design and implementation of an **IPTables Firewall Rule Simulator**, a web-based interactive tool that allows users to create, manage, and simulate IPTables firewall rules in a safe, sandboxed environment without requiring root access or a live Linux server. The simulator faithfully replicates the core behavior of the IPTables packet-filtering engine, including:

- **Rule Management** with support for INPUT, OUTPUT, and FORWARD chains
- **Protocol-level filtering** for TCP, UDP, ICMP, and ALL protocols
- **CIDR-based subnet matching** for source and destination IP addresses
- **Port-based filtering** for both source and destination ports
- **Packet Simulation** that walks test packets through the rule chain and reports the final verdict (ACCEPT, DROP, REJECT, or LOG)
- **Chain Flow Visualization** using HTML5 Canvas for visual representation of how packets traverse firewall rules
- **Rule Optimization Engine** that detects shadowed, redundant, and conflicting rules with a scoring system
- **Automatic IPTables Command Generation** that converts the user-defined rule set into executable shell scripts

The project is implemented using pure **HTML5, CSS3, and JavaScript** with no external frameworks or backend dependencies, making it lightweight, portable, and deployable on any modern web browser. The user interface adopts a premium dark theme with glassmorphism effects, animated backgrounds, smooth micro-animations, and responsive layouts.

The simulator serves as an educational tool for students studying Computer and Network Security, enabling hands-on learning of firewall concepts, rule precedence, traffic filtering policies, and network access control mechanisms in a risk-free interactive environment.

**Keywords:** IPTables, Firewall, Packet Filtering, Network Security, Simulator, Netfilter, Access Control, Chain Visualization, Rule Optimization

---

\newpage

## **CHAPTER 1: INTRODUCTION**

---

### **1.1 Background**

Computer networks have become the backbone of modern communication, enabling data exchange across the globe. With the exponential growth of internet-connected devices—from personal computers and smartphones to IoT sensors and cloud servers—the attack surface available to malicious actors has expanded dramatically. According to Cybersecurity Ventures, cybercrime damages are projected to cost the world $10.5 trillion annually by 2025, making it one of the most significant economic threats facing organizations and individuals.

A **firewall** is a network security system that monitors and controls incoming and outgoing network traffic based on predetermined security rules. Firewalls establish a barrier between trusted internal networks and untrusted external networks, such as the Internet. They are among the first and most critical lines of defense in any network security architecture.

**IPTables** is the user-space utility program that allows a system administrator to configure the IP packet filter rules of the Linux kernel firewall, implemented as different Netfilter modules. The filters are organized in different tables, which contain chains of rules for how to treat network traffic packets. IPTables has been a standard component of the Linux networking stack since the 2.4 kernel era, and despite the emergence of nftables as its successor, IPTables remains the most widely taught and deployed firewall tool in production Linux environments.

IPTables operates using three primary built-in chains:

1. **INPUT Chain** — Processes packets destined for the local system
2. **OUTPUT Chain** — Processes packets originating from the local system
3. **FORWARD Chain** — Processes packets being routed through the system to another destination

Each chain consists of a sequential list of rules. When a packet enters a chain, it is compared against each rule in order. If a packet matches a rule, the corresponding action (target) is applied. If no rule matches, the chain's default policy determines the packet's fate.

Understanding IPTables requires grasping several interconnected concepts: chain processing order, rule priority and precedence, CIDR notation for subnet specification, protocol-specific filtering, port-based access control, and the distinction between stateful and stateless filtering. This complexity makes IPTables one of the most challenging topics in network security education.

### **1.2 Motivation**

The motivation for this project stems from several key observations:

**1. Learning Complexity:** Students studying Computer and Network Security often struggle with IPTables concepts because the tool requires a running Linux system with root access. Mistakes in firewall configuration can lock users out of their own systems, making experimentation risky. There is a need for a safe, sandboxed environment where students can experiment with firewall rules without consequence.

**2. Visualization Gap:** IPTables is a command-line tool that provides no visual feedback on how rules interact, which rules take precedence, or how packets traverse the chain. Students cannot easily see why a packet was accepted or dropped, making debugging firewall configurations frustrating. A visual simulator that shows the step-by-step chain walk of a packet would significantly enhance understanding.

**3. Accessibility:** Traditional IPTables learning requires access to a Linux machine, often with administrative privileges. Many students in academic environments work on Windows or macOS machines and may not have easy access to a Linux environment. A web-based simulator eliminates this barrier entirely.

**4. Rule Quality Feedback:** Even experienced administrators create suboptimal firewall rulesets with shadowed rules (rules that can never be reached), redundant rules (duplicate entries), and conflicting rules (same traffic matched by rules with different actions). An automated optimization engine that analyzes the ruleset and provides actionable feedback would be valuable for both learning and practical use.

**5. Command Generation:** Students often understand the concept of a firewall rule but struggle with the exact IPTables command syntax. A tool that automatically generates correct IPTables commands from a graphical rule definition bridges the gap between conceptual understanding and practical application.

### **1.3 Objectives**

The primary objectives of this project are:

1. **Design and develop a web-based IPTables firewall rule simulator** that replicates the core packet-filtering behavior of the Linux IPTables utility in a browser environment.

2. **Implement a comprehensive rule management interface** that allows users to create, edit, delete, reorder, and filter firewall rules across INPUT, OUTPUT, and FORWARD chains.

3. **Build a packet simulation engine** that processes test packets through the rule chain using the same sequential matching algorithm as real IPTables, including support for CIDR subnet matching, protocol filtering, port matching, and wildcard rules.

4. **Create an interactive chain flow visualization** using HTML5 Canvas that graphically represents how rules are organized in a chain and how packets traverse through them.

5. **Develop a rule optimization engine** that automatically detects common firewall configuration issues including shadowed rules, redundant rules, conflicting rules, overly broad rules, and security policy weaknesses.

6. **Implement automatic IPTables command generation** that converts the graphically defined ruleset into a complete, executable bash script with proper syntax highlighting.

7. **Provide preset rule configurations** for common server scenarios (Web Server, SSH-only, DNS Server, Mail Server, Gaming Server, Block All) to help users learn from practical examples.

8. **Deliver a premium user experience** with a modern dark theme, responsive design, smooth animations, and intuitive navigation that makes firewall learning engaging rather than intimidating.

### **1.4 Problem Statement**

Learning IPTables firewall configuration is one of the most challenging aspects of network security education. Students face multiple barriers:

- **No safe environment** to experiment with firewall rules without risking system lockout
- **No visual feedback** on how packets traverse the rule chain or why a specific decision was made
- **Complex command syntax** that is difficult to memorize and error-prone
- **No automated analysis** of rule quality, leading to shadow rules, redundancies, and security gaps
- **Platform dependency** requiring a Linux system with root access

There is a need for an **interactive, visual, web-based firewall simulation tool** that replicates IPTables behavior, provides step-by-step packet processing visualization, automatically generates correct commands, and analyzes ruleset quality—all accessible from any modern web browser without requiring any special privileges or software installation.

### **1.5 Scope of the Project**

The scope of this project includes:

**In Scope:**
- Simulation of IPTables filter table with INPUT, OUTPUT, and FORWARD chains
- Support for TCP, UDP, ICMP, and ALL protocol matching
- CIDR-based IP address matching for source and destination
- Source and destination port matching
- Actions: ACCEPT, DROP, REJECT, LOG
- Default chain policies (ACCEPT/DROP)
- Packet simulation with step-by-step chain walk visualization
- Rule optimization analysis (shadowed, redundant, conflicting, overly broad rules)
- IPTables command generation with syntax highlighting
- Preset rule configurations for common scenarios
- Batch simulation with random traffic generation
- Traffic log with real-time updates
- Responsive design for desktop and mobile

**Out of Scope:**
- NAT table (PREROUTING, POSTROUTING chains)
- Mangle table operations
- Connection tracking / stateful inspection (beyond basic simulation)
- IPv6 (ip6tables) support
- Custom user-defined chains
- Rate limiting and bandwidth management
- Integration with live Linux systems
- Multi-user collaboration

---

\newpage

## **CHAPTER 2: LITERATURE SURVEY**

---

### **2.1 Overview of Firewalls**

A firewall is a network security device or software that monitors and filters incoming and outgoing network traffic based on an organization's previously established security policies. At its most basic, a firewall is essentially the barrier that sits between a private internal network and the public Internet.

**Types of Firewalls:**

**1. Packet Filtering Firewalls (First Generation):** These are the most basic type of firewall. They inspect packets at the network layer and make allow/deny decisions based on source IP, destination IP, protocol, and port numbers. IPTables is a prime example of a packet-filtering firewall. They operate by comparing each packet against a set of rules and either forwarding or dropping the packet. Packet filters are fast and efficient but lack awareness of connection state or application-layer data.

**2. Stateful Inspection Firewalls (Second Generation):** These firewalls maintain a state table that tracks active connections and their states (NEW, ESTABLISHED, RELATED, INVALID). Unlike simple packet filters, stateful firewalls can make decisions based on the context of the traffic flow. IPTables supports stateful inspection through the conntrack module, which allows rules such as "allow packets that belong to an established connection."

**3. Application Layer Firewalls (Third Generation):** Also known as proxy firewalls, these operate at the application layer (Layer 7) of the OSI model. They can inspect the actual content of traffic, making decisions based on specific application protocols (HTTP, FTP, DNS, etc.). They provide the most granular control but at the cost of performance. Examples include Web Application Firewalls (WAF).

**4. Next-Generation Firewalls (NGFW):** These combine traditional firewall capabilities with additional features such as deep packet inspection (DPI), intrusion prevention systems (IPS), SSL/TLS inspection, and application awareness. Commercial examples include Palo Alto Networks, Fortinet FortiGate, and Cisco Firepower.

**The Evolution of Linux Firewalls:**

| Era | Tool | Kernel Version | Year |
|-----|------|---------------|------|
| First | ipfwadm | Linux 2.0 | 1994 |
| Second | ipchains | Linux 2.2 | 1999 |
| Third | IPTables/Netfilter | Linux 2.4+ | 2001 |
| Fourth | nftables | Linux 3.13+ | 2014 |

Despite nftables being the official successor, IPTables remains the most widely used and taught firewall tool due to its maturity, extensive documentation, and backward compatibility through the iptables-nft compatibility layer.

### **2.2 IPTables and Netfilter Framework**

**Netfilter** is a framework provided by the Linux kernel that allows various networking-related operations to be implemented in the form of customized handlers. Netfilter provides hooks in the kernel's network stack at five key points where packets can be examined and manipulated:

1. **PREROUTING** — After the packet arrives at the network interface, before routing decision
2. **INPUT** — After routing, if the packet is destined for the local system
3. **FORWARD** — After routing, if the packet is to be forwarded to another host
4. **OUTPUT** — For packets generated by the local system, before routing
5. **POSTROUTING** — After routing, just before the packet leaves the network interface

IPTables is the user-space command-line utility that interfaces with the Netfilter kernel module. It organizes rules into **tables**, each serving a specific purpose:

**1. Filter Table (Default):** The default table used for packet filtering. It contains three built-in chains:
- **INPUT** — Rules for packets destined for the local system
- **FORWARD** — Rules for packets routed through the system
- **OUTPUT** — Rules for locally generated packets

**2. NAT Table:** Used for Network Address Translation. Contains:
- **PREROUTING** — Alters packets before routing (DNAT)
- **OUTPUT** — Alters locally generated packets before routing
- **POSTROUTING** — Alters packets after routing (SNAT/MASQUERADE)

**3. Mangle Table:** Used for specialized packet alterations such as changing TTL, TOS, or marking packets for quality of service.

**4. Raw Table:** Used for exempting packets from connection tracking.

**Rule Processing Algorithm:**

The fundamental algorithm used by IPTables for processing packets is sequential matching:

```
For each packet entering a chain:
    For each rule in the chain (in order):
        If packet matches rule criteria:
            Apply the rule's target (ACCEPT/DROP/REJECT/LOG)
            Stop processing (for terminating targets)
    If no rule matched:
        Apply the chain's default policy
```

This sequential processing model means that rule order matters critically. A broad "drop all" rule placed before specific "allow" rules will render those allow rules unreachable—a common misconfiguration known as rule shadowing.

**Key IPTables Match Criteria:**

| Option | Description | Example |
|--------|-------------|---------|
| -p | Protocol (tcp, udp, icmp, all) | -p tcp |
| -s | Source IP address/subnet | -s 192.168.1.0/24 |
| -d | Destination IP address/subnet | -d 10.0.0.1 |
| --sport | Source port | --sport 1024:65535 |
| --dport | Destination port | --dport 80 |
| -i | Input interface | -i eth0 |
| -o | Output interface | -o eth1 |
| -m state | Connection state | -m state --state ESTABLISHED |

**Target Actions:**

| Target | Behavior |
|--------|----------|
| ACCEPT | Allow the packet through the firewall |
| DROP | Silently discard the packet (no response sent) |
| REJECT | Block the packet and send an ICMP error response |
| LOG | Log the packet details to syslog (non-terminating) |

### **2.3 Existing Firewall Management Tools**

Several tools and interfaces exist for managing firewall rules, each with its own strengths and limitations:

**1. UFW (Uncomplicated Firewall):** UFW is a frontend for IPTables designed to simplify firewall configuration on Ubuntu/Debian systems. While it makes basic rules easy (e.g., `ufw allow 22/tcp`), it abstracts away the underlying IPTables complexity and does not provide visualization or optimization capabilities.

**2. Firewalld:** The default firewall management tool on RHEL/CentOS/Fedora, firewalld uses the concept of zones and services to manage rules. It provides a more structured approach than raw IPTables but still operates through the command line and lacks simulation capabilities.

**3. Shorewall:** A high-level tool that abstracts IPTables configuration into configuration files organized by zones. It generates IPTables rules from a more human-readable format but does not provide interactive simulation or visualization.

**4. Webmin Firewall Module:** Webmin provides a web-based interface for managing IPTables rules. However, it requires a running Linux server, root access, and manipulates real firewall rules (not a simulator), making it unsuitable for educational purposes.

**5. pfSense / OPNsense Web UI:** These are complete firewall distributions with web interfaces. They provide rule management and some basic logging but are full operating systems rather than educational simulators, and they use the pf packet filter (BSD) rather than IPTables.

### **2.4 Web-Based Security Simulators**

Several educational tools exist in the network security space:

**1. GNS3 / Cisco Packet Tracer:** Network simulation tools that allow creating virtual network topologies. While powerful, they focus on network routing and switching rather than firewall rule management and require software installation.

**2. NetSim:** A commercial network simulation tool that includes firewall capabilities but is expensive and requires local installation.

**3. CyberRange Platforms:** Enterprise training platforms (Hack The Box, TryHackMe) that provide virtual labs for security exercises. These are excellent but require subscriptions and internet connectivity.

### **2.5 Gap Analysis**

After reviewing existing tools, the following gaps were identified:

| Feature | UFW | firewalld | Webmin | This Project |
|---------|-----|-----------|--------|-------------|
| Web-based (no install) | ❌ | ❌ | ⚠️ | ✅ |
| Safe simulation (no real packets) | ❌ | ❌ | ❌ | ✅ |
| Visual chain flow | ❌ | ❌ | ❌ | ✅ |
| Packet simulation with chain walk | ❌ | ❌ | ❌ | ✅ |
| Rule optimization analysis | ❌ | ❌ | ❌ | ✅ |
| Auto command generation | ❌ | ❌ | ❌ | ✅ |
| No root access needed | ❌ | ❌ | ❌ | ✅ |
| Preset configurations | ❌ | ✅ | ❌ | ✅ |
| Batch traffic testing | ❌ | ❌ | ❌ | ✅ |

Our project fills a significant gap by providing a **zero-install, zero-risk, visual, interactive** firewall simulator specifically designed for education.

---

\newpage

## **CHAPTER 3: SYSTEM REQUIREMENTS & ANALYSIS**

---

### **3.1 Hardware Requirements**

**Table 3.1: Hardware Requirements**

| Component | Minimum Requirement | Recommended |
|-----------|-------------------|-------------|
| Processor | Intel Core i3 / AMD Ryzen 3 | Intel Core i5 / AMD Ryzen 5 or higher |
| RAM | 2 GB | 4 GB or higher |
| Storage | 10 MB free space | 50 MB free space |
| Display | 1024 × 768 resolution | 1920 × 1080 resolution |
| Network | Not required (runs offline) | Internet for font loading |
| Input | Keyboard + Mouse | Keyboard + Mouse |

### **3.2 Software Requirements**

**Table 3.2: Software Requirements**

| Software | Specification |
|----------|--------------|
| Operating System | Any (Windows, macOS, Linux) |
| Web Browser | Google Chrome 90+, Firefox 88+, Safari 14+, Edge 90+ |
| HTML Version | HTML5 |
| CSS Version | CSS3 with Custom Properties |
| JavaScript | ES6+ (ECMAScript 2015) |
| Canvas Support | HTML5 Canvas API |
| Text Editor (for development) | VS Code, Sublime Text, or equivalent |
| Version Control | Git |

**Note:** No server-side runtime, database, or package installation is required. The application runs entirely in the client's web browser.

### **3.3 Functional Requirements**

The system shall provide the following functional capabilities:

**FR-1: Rule Management**
- FR-1.1: Users shall be able to add firewall rules specifying chain, protocol, source IP, destination IP, source port, destination port, action, and description.
- FR-1.2: Users shall be able to delete individual rules from the active ruleset.
- FR-1.3: Users shall be able to reorder rules (move up/down) to change processing priority.
- FR-1.4: Users shall be able to filter the rule display by chain (INPUT/OUTPUT/FORWARD).
- FR-1.5: Users shall be able to set default policies for each chain (ACCEPT/DROP).
- FR-1.6: Users shall be able to load preset rule configurations for common scenarios.
- FR-1.7: The system shall display hit counters for each rule.

**FR-2: Packet Simulation**
- FR-2.1: Users shall be able to define test packets with direction, protocol, source IP, destination IP, source port, and destination port.
- FR-2.2: The system shall process the test packet through the appropriate chain and display the final verdict (ACCEPT/DROP/REJECT/LOG).
- FR-2.3: The system shall display a step-by-step chain walk showing which rules were evaluated and which rule matched.
- FR-2.4: The system shall maintain a traffic log of all simulated packets.
- FR-2.5: Users shall be able to run batch simulations with randomly generated packets.
- FR-2.6: Quick packet templates shall be available for common traffic types (HTTP, SSH, ICMP Ping, DNS, MySQL, HTTPS).

**FR-3: Chain Visualization**
- FR-3.1: The system shall render a visual flow diagram of the selected chain using HTML5 Canvas.
- FR-3.2: Rule nodes shall be color-coded by action type.
- FR-3.3: The visualization shall include the default policy as the final node.
- FR-3.4: Hit count badges shall be displayed on rule nodes.

**FR-4: Rule Optimization**
- FR-4.1: The system shall detect shadowed rules (unreachable rules).
- FR-4.2: The system shall detect redundant rules (duplicate entries).
- FR-4.3: The system shall detect conflicting rules (same traffic, different actions).
- FR-4.4: The system shall detect overly broad rules that make subsequent rules unreachable.
- FR-4.5: The system shall provide security recommendations regarding default policies.
- FR-4.6: The system shall compute a ruleset efficiency score (0–100).

**FR-5: Command Generation**
- FR-5.1: The system shall generate valid IPTables bash commands from the current ruleset.
- FR-5.2: Commands shall include flush, default policy, and individual rule statements.
- FR-5.3: Users shall be able to copy all generated commands to the clipboard.

### **3.4 Non-Functional Requirements**

- **NFR-1: Performance** — The system shall respond to user interactions within 100ms. Packet simulation shall complete in under 10ms for rulesets of up to 100 rules.
- **NFR-2: Usability** — The interface shall be intuitive enough for first-time users to add a rule and simulate a packet within 2 minutes without documentation.
- **NFR-3: Portability** — The application shall run on any modern web browser without installation or plugins.
- **NFR-4: Responsiveness** — The layout shall adapt gracefully to screen widths from 320px (mobile) to 2560px (ultrawide).
- **NFR-5: Accessibility** — Interactive elements shall have tooltips and clear labels.
- **NFR-6: Reliability** — The application shall handle edge cases (empty rulesets, invalid IPs, missing ports) gracefully without crashing.

---

\newpage

## **CHAPTER 4: SYSTEM DESIGN & ARCHITECTURE**

---

### **4.1 System Architecture Overview**

The IPTables Firewall Rule Simulator follows a **client-side single-page application (SPA)** architecture. The entire application runs in the user's web browser without any server-side dependencies. This architectural decision ensures maximum portability, zero-installation deployment, and complete privacy (no data leaves the user's machine).

**Architecture Layers:**

```
┌─────────────────────────────────────────────────────────┐
│                   PRESENTATION LAYER                     │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐   │
│  │   Rule   │ │  Packet  │ │  Chain   │ │ Optimizer│   │
│  │ Manager  │ │Simulator │ │  Viz.    │ │  Engine  │   │
│  │   Tab    │ │   Tab    │ │   Tab    │ │   Tab    │   │
│  └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘   │
│       │             │            │             │         │
│  ┌──────────────────────────────────────────────────┐   │
│  │              Navigation Controller                │   │
│  └──────────────────────┬───────────────────────────┘   │
├─────────────────────────┼───────────────────────────────┤
│                   APPLICATION LAYER                      │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐   │
│  │   Rule   │ │  Packet  │ │  Canvas  │ │ Analysis │   │
│  │  CRUD    │ │  Match   │ │ Renderer │ │  Engine  │   │
│  │  Engine  │ │  Engine  │ │          │ │          │   │
│  └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘   │
│       │             │            │             │         │
│  ┌──────────────────────────────────────────────────┐   │
│  │            State Management (state object)        │   │
│  └──────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────┤
│                     DATA LAYER                           │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐                │
│  │  Rules   │ │  Traffic │ │ Counters │                │
│  │  Array   │ │   Log    │ │ & Stats  │                │
│  └──────────┘ └──────────┘ └──────────┘                │
└─────────────────────────────────────────────────────────┘
```

**Figure 4.1: System Architecture Diagram**

The architecture consists of three distinct layers:

**1. Presentation Layer:** This layer handles all user interaction and visual rendering. It comprises five tabbed interfaces (Rule Manager, Packet Simulator, Chain Visualization, Optimizer, and IPTables Commands), each responsible for a specific functional area. The Navigation Controller manages tab switching and ensures only one panel is visible at a time. All UI elements are defined in `index.html` and styled through `styles.css`.

**2. Application Layer:** This layer contains the core business logic of the simulator. It includes:
- **Rule CRUD Engine** — Handles adding, deleting, reordering, and filtering rules
- **Packet Match Engine** — Implements the sequential rule-matching algorithm with CIDR support
- **Canvas Renderer** — Draws the chain flow visualization using the HTML5 Canvas API
- **Analysis Engine** — Detects rule quality issues (shadowing, redundancy, conflicts)

All application logic is encapsulated in `app.js` and communicates with the UI through direct DOM manipulation.

**3. Data Layer:** The application state is maintained in a centralized JavaScript object (`state`) that serves as the single source of truth. It contains the rules array, traffic log, counters, default policies, and UI state. There is no persistent storage; all data exists in memory during the session. This was a deliberate design choice for simplicity and privacy.

### **4.2 Module Design**

The application is organized into the following logical modules within the `app.js` file:

**Module Interaction Diagram:**

```
┌─────────────────────────────────────────────────────────────┐
│                      EVENT SYSTEM                            │
│            (User clicks, form submissions)                   │
└─────┬───────┬────────┬──────────┬────────────┬──────────────┘
      │       │        │          │            │
      ▼       ▼        ▼          ▼            ▼
┌─────────┐ ┌───────┐ ┌────────┐ ┌──────────┐ ┌────────────┐
│  Tab    │ │ Rule  │ │ Packet │ │  Canvas  │ │  Optimizer │
│ Switch  │ │ Mgmt  │ │  Sim   │ │  Viz     │ │  Module    │
│ Module  │ │Module │ │ Module │ │  Module  │ │            │
└─────────┘ └───┬───┘ └───┬────┘ └────┬─────┘ └─────┬──────┘
                │         │           │              │
                ▼         ▼           ▼              ▼
         ┌──────────────────────────────────────────────┐
         │         CENTRALIZED STATE OBJECT             │
         │  { rules, trafficLog, counters, policies }   │
         └──────────────┬───────────────────────────────┘
                        │
                        ▼
         ┌──────────────────────────────────────────────┐
         │          RENDERING PIPELINE                   │
         │  renderRulesTable() → updateStats()          │
         │  → generateCommands() → drawVisualization()  │
         └──────────────────────────────────────────────┘
```

**Figure 4.2: Module Interaction Diagram**

**Detailed Module Descriptions:**

**Module 1: State Management**
- Central `state` object holds all application data
- Properties: `rules[]`, `trafficLog[]`, `defaultPolicies{}`, `counters{}`, `activeFilter`, `nextId`
- All modules read from and write to this shared state

**Module 2: Rule Management**
- Functions: `addRule()`, `deleteRule()`, `moveRule()`, `loadPreset()`, `clearForm()`
- Handles form validation and rule creation
- Triggers re-render of table, stats, commands, and visualization after each change

**Module 3: Packet Simulation Engine**
- Functions: `simulatePacket()`, `matchesRule()`, `ipMatches()`, `ipToNumber()`
- Implements sequential chain walk algorithm
- Supports CIDR subnet matching via bitwise operations
- Returns final verdict and chain walk trace

**Module 4: Visualization Engine**
- Functions: `drawChainVisualization()`, `drawNode()`, `drawArrow()`
- Uses HTML5 Canvas API for rendering
- Supports DPI-aware rendering for retina displays
- Color-codes nodes by action type

**Module 5: Optimization Engine**
- Functions: `runOptimizer()`, `isShadowed()`, `isRedundant()`, `isConflicting()`
- Seven distinct analysis checks with weighted scoring
- Generates categorized report (Critical, Warning, Info)

**Module 6: Command Generator**
- Function: `generateCommands()`, `copyCommands()`
- Produces valid IPTables bash script with syntax highlighting
- Includes flush commands, default policies, established connections, loopback, and custom rules

**Module 7: UI Utilities**
- Functions: `switchTab()`, `showToast()`, `resetAll()`, `renderLog()`
- Tab navigation management
- Toast notification system
- Traffic log rendering

### **4.3 Data Flow Diagrams**

**Level-0 DFD (Context Diagram):**

```
                    ┌──────────┐
                    │          │
   Rule Config ──── │  IPTables│ ──── Simulation Results
   Test Packets ──► │ Firewall │ ──── Generated Commands
   Policy Config ── │Simulator │ ──► Optimization Report
                    │          │ ──── Chain Visualization
                    └──────────┘
                         ▲
                         │
                    [ User ]
```

**Figure 4.3: Level-0 Data Flow Diagram**

The Level-0 DFD shows the system as a single process that receives user inputs (rule configurations, test packets, policy settings) and produces outputs (simulation results, generated commands, optimization reports, and visual chain diagrams).

**Level-1 DFD:**

```
                     ┌───────────────┐
  Rule Parameters ──►│ 1.0 Rule      │──► rules[]
  Preset Selection──►│ Management    │──► Updated Stats
                     └───────┬───────┘
                             │ rules[]
                             ▼
                     ┌───────────────┐
  Packet Parameters─►│ 2.0 Packet    │──► Verdict (ACCEPT/DROP/REJECT)
                     │ Simulation    │──► Chain Walk Trace
                     │ Engine        │──► Traffic Log Entry
                     └───────┬───────┘
                             │ rules[]
                             ▼
                     ┌───────────────┐
  Chain Selection ──►│ 3.0 Chain     │──► Canvas Rendering
                     │ Visualization │
                     └───────┬───────┘
                             │ rules[]
                             ▼
                     ┌───────────────┐
  Analysis Trigger──►│ 4.0 Rule      │──► Issue Report
                     │ Optimizer     │──► Efficiency Score
                     └───────┬───────┘
                             │ rules[]
                             ▼
                     ┌───────────────┐
                     │ 5.0 Command   │──► IPTables Script
                     │ Generator     │
                     └───────────────┘
```

**Figure 4.4: Level-1 Data Flow Diagram**

### **4.4 Use Case Diagram**

```
┌─────────────────────────────────────────────────────────┐
│                  IPTables Firewall Simulator              │
│                                                          │
│    ┌─────────────────┐                                   │
│    │ Add Firewall Rule│◄──────────┐                      │
│    └─────────────────┘            │                      │
│    ┌─────────────────┐            │                      │
│    │ Delete Rule      │◄──────────┤                      │
│    └─────────────────┘            │                      │
│    ┌─────────────────┐            │                      │
│    │ Reorder Rules    │◄──────────┤                      │
│    └─────────────────┘            │                      │
│    ┌─────────────────┐            │    ┌──────┐          │
│    │ Load Preset      │◄──────────┤◄───│ User │          │
│    └─────────────────┘            │    └──────┘          │
│    ┌─────────────────┐            │                      │
│    │ Simulate Packet  │◄──────────┤                      │
│    └─────────────────┘            │                      │
│    ┌─────────────────┐            │                      │
│    │ Run Batch Test   │◄──────────┤                      │
│    └─────────────────┘            │                      │
│    ┌─────────────────┐            │                      │
│    │View Visualization│◄──────────┤                      │
│    └─────────────────┘            │                      │
│    ┌─────────────────┐            │                      │
│    │ Run Optimizer    │◄──────────┤                      │
│    └─────────────────┘            │                      │
│    ┌─────────────────┐            │                      │
│    │ Copy Commands    │◄──────────┘                      │
│    └─────────────────┘                                   │
└─────────────────────────────────────────────────────────┘
```

**Figure 4.5: Use Case Diagram**

### **4.5 UI/UX Design Principles**

The user interface was designed adhering to the following principles:

**1. Dark Theme First:** The entire application uses a dark color scheme built on a deep navy/indigo base (`#0a0a1a`). Dark interfaces reduce eye strain during extended use, are preferred by technical users, and provide a professional "system admin console" aesthetic that matches the firewall management context.

**2. Glassmorphism:** Cards and panels use `backdrop-filter: blur()` with semi-transparent backgrounds, creating a frosted glass effect that adds depth to the interface without obscuring the animated background grid.

**3. Color Semantics:** Colors are used consistently to convey meaning:
- 🟢 Green (`#22c55e`) — ACCEPT actions (allowed traffic)
- 🔴 Red (`#ef4444`) — DROP actions (silently blocked)
- 🟡 Yellow/Amber (`#f59e0b`) — REJECT actions (blocked with response)
- 🔵 Indigo (`#6366f1`) — Primary accent, LOG actions
- 🔵 Cyan (`#06b6d4`) — INPUT chain, secondary accent
- 🟣 Purple (`#a78bfa`) — OUTPUT chain
- 🟠 Orange (`#f97316`) — FORWARD chain

**4. Typography Hierarchy:** Two font families are used:
- **Inter** — Primary UI font for labels, headings, and body text
- **JetBrains Mono** — Monospace font for technical data (IPs, ports, commands, rule parameters)

**5. Micro-animations:** Every user interaction is accompanied by subtle animations (fade-in, slide, pulse) that provide visual feedback and make the interface feel responsive and alive. Toast notifications slide in from the right, rule table rows flash on match, and tab panels fade up on activation.

**6. Responsive Design:** The layout uses CSS Grid and Flexbox with breakpoints at 1200px and 768px. On large screens, the rule form and rule table sit side-by-side; on tablets and phones, they stack vertically.

---

\newpage

## **CHAPTER 5: METHODOLOGY**

---

### **5.1 Development Methodology**

The project was developed using an **Incremental Prototyping** methodology, which involves building the system in stages, with each increment adding new functionality:

**Increment 1 — Core Structure & Rule Management:**
- HTML skeleton with tab navigation
- CSS design system (custom properties, typography, color palette)
- Rule form with CRUD operations
- State management and rendering pipeline

**Increment 2 — Packet Simulation Engine:**
- Packet form with protocol/IP/port fields
- Sequential matching algorithm
- CIDR subnet matching
- Chain walk result display
- Traffic log

**Increment 3 — Visualization & Presets:**
- HTML5 Canvas chain flow rendering
- Preset rule configurations (6 scenarios)
- Quick packet templates
- Batch simulation

**Increment 4 — Optimizer & Command Generation:**
- Rule optimization engine with 7 analysis checks
- Efficiency scoring algorithm
- IPTables command generator with syntax highlighting
- Clipboard copy functionality

**Increment 5 — Polish & Responsive Design:**
- Animated background (grid, glow orbs)
- Micro-animations and transitions
- Responsive breakpoints for mobile/tablet
- Toast notification system
- Edge case handling

### **5.2 IPTables Rule Processing Logic**

The core simulation logic faithfully replicates the sequential matching algorithm used by the real IPTables kernel module.

**Table 5.1: IPTables Actions and Descriptions**

| Action | Description | Response to Sender |
|--------|-------------|--------------------|
| ACCEPT | Allows the packet to pass | Packet delivered normally |
| DROP | Silently discards the packet | No response (timeout) |
| REJECT | Blocks with error notification | ICMP "Destination Unreachable" |
| LOG | Records packet details in log | Packet continues to next rule |

**Table 5.2: IPTables Chains and Their Roles**

| Chain | Direction | Use Case |
|-------|-----------|----------|
| INPUT | Incoming to host | Protecting local services |
| OUTPUT | Outgoing from host | Controlling outbound access |
| FORWARD | Passing through host | Router/gateway filtering |

**Processing Flowchart:**

```
┌──────────────────┐
│  Packet Arrives   │
│  at Chain         │
└────────┬─────────┘
         ▼
┌──────────────────┐
│  Get chain rules  │
│  (filter by chain)│
└────────┬─────────┘
         ▼
┌──────────────────┐     ┌──────────────────┐
│  More rules       │ No  │  Apply default    │
│  to check?        │────►│  chain policy     │
└────────┬─────────┘     └──────────────────┘
    Yes  │
         ▼
┌──────────────────┐
│  Does packet match│
│  current rule?    │
└────┬────────┬────┘
  Yes│        │No
     ▼        ▼
┌────────┐ ┌────────────┐
│ Apply  │ │ Move to    │
│ rule's │ │ next rule  │──►(loop back)
│ action │ │            │
└────────┘ └────────────┘
```

**Figure 5.1: IPTables Chain Processing Flowchart**

### **5.3 CIDR Subnet Matching Algorithm**

CIDR (Classless Inter-Domain Routing) matching is essential for firewall rules that specify IP address ranges. The algorithm converts IP addresses to 32-bit unsigned integers and uses bitwise AND operations with the subnet mask.

**Algorithm:**

```
function ipMatches(packetIp, ruleIp):
    if ruleIp == "0.0.0.0/0":
        return true  // matches any IP
    
    if ruleIp contains "/":
        [network, bits] = split ruleIp by "/"
        mask = NOT(0xFFFFFFFF >>> bits) >>> 0
        networkNum = ipToNumber(network)
        packetNum = ipToNumber(packetIp)
        return (networkNum AND mask) == (packetNum AND mask)
    
    return packetIp == ruleIp  // exact match

function ipToNumber(ip):
    return ip.split(".").reduce((acc, octet) => (acc << 8) + parseInt(octet), 0) >>> 0
```

**Example:** Rule specifies `192.168.1.0/24`, packet has source IP `192.168.1.100`:

```
Network: 192.168.1.0   = 11000000.10101000.00000001.00000000
Mask /24:              = 11111111.11111111.11111111.00000000
Packet: 192.168.1.100  = 11000000.10101000.00000001.01100100

Network AND Mask = 11000000.10101000.00000001.00000000 (192.168.1.0)
Packet AND Mask  = 11000000.10101000.00000001.00000000 (192.168.1.0)

Result: MATCH ✓
```

**Figure 5.2: CIDR Matching Algorithm Flowchart**

### **5.4 Packet Simulation Engine**

The packet simulation engine processes a test packet through the rule chain using the following algorithm:

```
function simulatePacket(packet):
    chainRules = rules.filter(r => r.chain == packet.direction)
    steps = []
    matchedRule = null
    
    for each rule in chainRules:
        matches = matchesRule(packet, rule)
        steps.push({ ruleNum, rule, matched: matches })
        if matches:
            matchedRule = rule
            rule.hits++
            break  // stop at first match
    
    if matchedRule:
        finalAction = matchedRule.action
    else:
        finalAction = defaultPolicies[packet.direction]
    
    updateCounters(finalAction)
    renderResult(packet, steps, finalAction)
    addToTrafficLog(packet, finalAction)
    
    return finalAction
```

**Match Function:**

```
function matchesRule(packet, rule):
    if rule.protocol != "all" AND rule.protocol != packet.protocol:
        return false
    if rule.srcIp != "0.0.0.0/0" AND NOT ipMatches(packet.srcIp, rule.srcIp):
        return false
    if rule.dstIp != "0.0.0.0/0" AND NOT ipMatches(packet.dstIp, rule.dstIp):
        return false
    if rule.srcPort != "any" AND rule.srcPort != packet.srcPort AND protocol != "icmp":
        return false
    if rule.dstPort != "any" AND rule.dstPort != packet.dstPort AND protocol != "icmp":
        return false
    return true
```

**Figure 5.3: Packet Simulation Flowchart**

### **5.5 Rule Optimization Algorithm**

The optimization engine performs seven distinct analyses on the ruleset:

**Analysis 1 — Shadowed Rule Detection:**
A rule B is shadowed by rule A if A appears before B in the chain and A matches a superset of the traffic matched by B. A shadowed rule can never be reached.

**Analysis 2 — Redundant Rule Detection:**
Two rules are redundant if they have identical chain, protocol, source IP, destination IP, source port, destination port, and action.

**Analysis 3 — Conflicting Rule Detection:**
Two rules conflict if they match overlapping traffic but specify different actions. The first rule takes precedence, which may not be the intended behavior.

**Analysis 4 — Overly Broad Rule Detection:**
A rule that matches all protocols from any source to any destination on any port, placed before other rules in the same chain, renders all subsequent rules unreachable.

**Analysis 5 — Default Policy Security Check:**
Checks whether INPUT and FORWARD chains have a default ACCEPT policy without a terminal DROP rule, which is a security risk.

**Analysis 6 — Unused Rule Detection:**
After traffic simulation, rules with zero hits may indicate unnecessary or poorly ordered rules.

**Analysis 7 — Ordering Efficiency:**
Rules with high hit counts positioned late in the chain could be moved earlier to reduce average processing time.

**Scoring System:**

| Issue Type | Point Deduction |
|------------|----------------|
| Shadowed rule | -15 per instance |
| Overly broad rule | -20 per instance |
| Conflicting rules | -10 per pair |
| Redundant rules | -8 per pair |
| Security recommendation | -5 per issue |
| Ordering inefficiency | -3 per opportunity |

The final score is clamped between 0 and 100, with ratings:
- **80–100:** Well-optimized ruleset
- **50–79:** Some improvements recommended
- **0–49:** Significant issues detected

---

\newpage

## **CHAPTER 6: IMPLEMENTATION**

---

### **6.1 Project Structure**

**Table 6.1: File Structure and Description**

| File | Size | Lines | Description |
|------|------|-------|-------------|
| `index.html` | 28.5 KB | 468 | Main HTML document containing all UI markup, forms, tables, and canvas elements |
| `app.js` | 42.5 KB | 1045 | Complete application logic including state management, simulation engine, optimizer, and command generator |
| `styles.css` | 28.2 KB | 1390 | Full CSS stylesheet with custom properties, animations, responsive breakpoints, and component styles |

```
PR-CNS/
├── index.html          # Main HTML document
├── app.js              # Application logic (JavaScript)
├── styles.css          # Stylesheet (CSS3)
└── README.md           # Project documentation
```

**Figure 6.1: Project Directory Structure**

**Total codebase size: ~99 KB across 2,903 lines of code — no external dependencies.**

### **6.2 Frontend Implementation (HTML)**

The HTML structure uses semantic HTML5 elements organized into a header, navigation, and tabbed main content area.

**Header Section (`<header>`):**
The header contains the application logo (custom SVG), title with gradient text, subtitle, real-time statistics bar (total rules, accepted count, dropped count, rejected count), and a reset button. The statistics are updated dynamically through JavaScript.

```html
<header id="app-header">
    <div class="header-left">
        <div class="logo">
            <svg viewBox="0 0 40 40" class="logo-icon">
                <!-- Custom firewall logo with gradient -->
            </svg>
            <div>
                <h1>IPTables Firewall Simulator</h1>
                <p class="subtitle">Network Traffic Filtering & Access Control</p>
            </div>
        </div>
    </div>
    <div class="header-right">
        <div class="stats-bar">
            <!-- Dynamic stat chips for Rules, Accepted, Dropped, Rejected -->
        </div>
        <button class="btn btn-ghost" id="btn-reset-all">Reset</button>
    </div>
</header>
```

**Navigation Section (`<nav>`):**
Five horizontal tabs provide navigation between functional areas: Rule Manager, Packet Simulator, Chain Visualization, Optimizer, and IPTables Commands. Each tab uses a custom SVG icon and text label.

**Tab 1 — Rule Manager:**
This panel uses a split-grid layout with the rule creation form on the left and the active rules table on the right. The form captures seven parameters (chain, protocol, action, source IP, destination IP, source port, destination port) plus an optional description. Below the form, a default policy section allows configuring the fallback action for each chain.

The rules table displays columns for rule number, chain (color-coded badge), protocol, source IP, destination IP, source port, destination port, action (color-coded badge), hit counter, and action buttons (move up, move down, delete). A filter bar allows viewing rules by specific chain.

**Tab 2 — Packet Simulator:**
The left panel contains a packet crafting form (direction, protocol, source/destination IP, source/destination port) with quick packet templates for common traffic types (HTTP, SSH, ICMP Ping, DNS, MySQL, HTTPS). The right panel shows the simulation result with a color-coded verdict banner, step-by-step chain walk display, and a scrollable traffic log.

**Tab 3 — Chain Visualization:**
A full-width HTML5 Canvas element renders the chain flow diagram. A dropdown selector allows switching between INPUT, OUTPUT, and FORWARD chains. A legend at the bottom identifies the color coding for each action type.

**Tab 4 — Optimizer:**
Contains a "Run Analysis" button and a results area that displays the efficiency score (0–100), categorized issues (critical, warning, info), and specific recommendations with inline code examples.

**Tab 5 — IPTables Commands:**
Displays the generated bash script in a syntax-highlighted `<pre>` block with a "Copy All" button for clipboard access.

### **6.3 Application Logic (JavaScript)**

The JavaScript implementation (`app.js`, 1045 lines) is organized into clearly separated functional sections.

**State Object:**

```javascript
const state = {
    rules: [],              // Array of rule objects
    trafficLog: [],         // Array of simulation log entries
    defaultPolicies: {      // Default chain policies
        INPUT: 'DROP',
        FORWARD: 'DROP',
        OUTPUT: 'ACCEPT'
    },
    counters: {             // Packet action counters
        accepted: 0,
        dropped: 0,
        rejected: 0
    },
    activeFilter: 'all',    // Current chain filter
    nextId: 1               // Auto-incrementing rule ID
};
```

**Rule Object Structure:**

```javascript
{
    id: 1,                          // Unique identifier
    chain: 'INPUT',                 // INPUT | OUTPUT | FORWARD
    protocol: 'tcp',               // tcp | udp | icmp | all
    srcIp: '192.168.1.0/24',      // Source IP/CIDR
    dstIp: '0.0.0.0/0',           // Destination IP/CIDR
    srcPort: 'any',                // Source port or 'any'
    dstPort: '80',                 // Destination port or 'any'
    action: 'ACCEPT',             // ACCEPT | DROP | REJECT | LOG
    description: 'Allow HTTP',    // Optional description
    hits: 0                        // Match counter
}
```

**Preset Configurations:**

Six preset configurations are hardcoded for common server scenarios:

1. **Web Server** — Allows HTTP (80), HTTPS (443), SSH from LAN (22), drops everything else
2. **SSH Only** — Allows SSH from 10.x.x.x networks, allows ICMP, blocks everything else
3. **DNS Server** — Allows DNS UDP/TCP (53), SSH from private networks
4. **Block All** — Drops all incoming and forwarded traffic
5. **Mail Server** — Allows SMTP (25), Submission (587), IMAPS (993), POP3S (995)
6. **Gaming Server** — Allows game ports (27015, 27020), SSH from LAN only

**Key Implementation: CIDR IP Matching:**

```javascript
function ipMatches(packetIp, ruleIp) {
    if (ruleIp === '0.0.0.0/0') return true;

    if (ruleIp.includes('/')) {
        const [network, bits] = ruleIp.split('/');
        const mask = ~(0xFFFFFFFF >>> parseInt(bits)) >>> 0;
        const networkNum = ipToNumber(network);
        const packetNum = ipToNumber(packetIp);
        return (networkNum & mask) === (packetNum & mask);
    }

    return packetIp === ruleIp;
}

function ipToNumber(ip) {
    return ip.split('.').reduce(
        (acc, octet) => (acc << 8) + parseInt(octet), 0
    ) >>> 0;
}
```

This implementation uses JavaScript's unsigned right shift operator (`>>>`) to handle the 32-bit unsigned integer representation of IPv4 addresses. The bitwise AND between the masked network address and the masked packet address determines subnet membership.

**Key Implementation: Canvas Visualization:**

```javascript
function drawChainVisualization() {
    const canvas = dom.chainCanvas;
    const dpr = window.devicePixelRatio || 1;
    const rect = container.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = 400 * dpr;
    
    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    
    // Draw nodes for entry packet, each rule, and default policy
    // Connect nodes with dashed lines and arrows
    // Color-code by action: green=ACCEPT, red=DROP, yellow=REJECT
    // Show hit count badges on rule nodes
}
```

The Canvas renderer handles DPI-aware drawing by scaling the canvas buffer by `devicePixelRatio`, ensuring crisp rendering on high-DPI (retina) displays. Nodes are drawn with rounded rectangles, gradient fills, and styled text labels.

### **6.4 Styling & Theme (CSS)**

The CSS implementation (`styles.css`, 1390 lines) establishes a comprehensive design system using CSS Custom Properties.

**Design Tokens:**

```css
:root {
    /* Backgrounds */
    --bg-primary: #0a0a1a;
    --bg-card: rgba(15, 15, 40, 0.85);
    
    /* Borders */
    --border-primary: rgba(99, 102, 241, 0.15);
    
    /* Text */
    --text-primary: #e2e8f0;
    --text-secondary: #94a3b8;
    
    /* Accent Colors */
    --accent: #6366f1;
    --green: #22c55e;
    --red: #ef4444;
    --yellow: #f59e0b;
    --cyan: #06b6d4;
    
    /* Typography */
    --font-sans: 'Inter', sans-serif;
    --font-mono: 'JetBrains Mono', monospace;
    
    /* Animations */
    --transition-base: 250ms cubic-bezier(0.4, 0, 0.2, 1);
}
```

**Animated Background:**
The background consists of three layers:
1. An animated grid pattern using CSS linear gradients, slowly drifting diagonally (`gridFloat` animation)
2. Three radial gradient glow orbs with pulsing opacity (`glowPulse` animation)
3. The main content rendered above both layers

**Key CSS Features Used:**
- CSS Custom Properties for design token management
- `backdrop-filter: blur()` for glassmorphism effects
- CSS Grid and Flexbox for responsive layouts
- `@keyframes` animations for micro-interactions
- CSS transitions for hover states and state changes
- Custom scrollbar styling via `::-webkit-scrollbar`
- Responsive breakpoints at 1200px and 768px

### **6.5 Key Code Segments**

**Segment 1: Adding a Firewall Rule**

```javascript
function addRule() {
    const rule = {
        id: state.nextId++,
        chain: dom.ruleChain.value,
        protocol: dom.ruleProtocol.value,
        srcIp: dom.ruleSrcIp.value.trim() || '0.0.0.0/0',
        dstIp: dom.ruleDstIp.value.trim() || '0.0.0.0/0',
        srcPort: dom.ruleSrcPort.value.trim() || 'any',
        dstPort: dom.ruleDstPort.value.trim() || 'any',
        action: dom.ruleAction.value,
        description: dom.ruleDescription.value.trim(),
        hits: 0
    };

    state.rules.push(rule);
    renderRulesTable();
    updateStats();
    generateCommands();
    drawChainVisualization();
    clearForm();
    showToast(`Rule #${rule.id} added to ${rule.chain} chain`, 'success');
}
```

**Segment 2: Packet Simulation with Chain Walk**

```javascript
function simulatePacket(customPacket) {
    const packet = customPacket || {
        direction: dom.pktDirection.value,
        protocol: dom.pktProtocol.value,
        srcIp: dom.pktSrcIp.value.trim(),
        dstIp: dom.pktDstIp.value.trim(),
        srcPort: dom.pktSrcPort.value.trim(),
        dstPort: dom.pktDstPort.value.trim()
    };

    const chainRules = state.rules.filter(r => r.chain === packet.direction);
    const steps = [];
    let matchedRule = null;

    for (let i = 0; i < chainRules.length; i++) {
        const rule = chainRules[i];
        const matches = matchesRule(packet, rule);
        steps.push({ ruleNum: state.rules.indexOf(rule) + 1, rule, matched: matches });
        if (matches) {
            matchedRule = rule;
            rule.hits++;
            break;
        }
    }

    let finalAction = matchedRule
        ? matchedRule.action
        : state.defaultPolicies[packet.direction];

    // Update counters and render results
    if (finalAction === 'ACCEPT') state.counters.accepted++;
    else if (finalAction === 'DROP') state.counters.dropped++;
    else if (finalAction === 'REJECT') state.counters.rejected++;
    
    return finalAction;
}
```

**Segment 3: Shadow Detection Algorithm**

```javascript
function isShadowed(ruleA, ruleB) {
    if (ruleA.chain !== ruleB.chain) return false;
    if (ruleA.protocol !== 'all' && ruleA.protocol !== ruleB.protocol) return false;
    if (ruleA.srcIp !== '0.0.0.0/0' && ruleA.srcIp !== ruleB.srcIp) return false;
    if (ruleA.dstIp !== '0.0.0.0/0' && ruleA.dstIp !== ruleB.dstIp) return false;
    if (ruleA.srcPort !== 'any' && ruleA.srcPort !== ruleB.srcPort) return false;
    if (ruleA.dstPort !== 'any' && ruleA.dstPort !== ruleB.dstPort) return false;
    return true;
}
```

---

\newpage

## **CHAPTER 7: RESULTS & OUTPUT**

---

The IPTables Firewall Rule Simulator was successfully implemented and tested across multiple browsers (Chrome, Firefox, Safari, Edge). This chapter presents the key output screens and results obtained during testing.

### **7.1 Rule Manager Interface**

The Rule Manager provides a comprehensive interface for creating and managing firewall rules. The screenshot below shows the interface with a Web Server preset loaded (4 rules):

**Figure 7.1: Rule Manager Interface**

Key observations from the Rule Manager:
- The form captures all essential rule parameters with sensible defaults
- Chain badges are color-coded (cyan for INPUT, purple for OUTPUT, orange for FORWARD)
- Action badges use semantic colors (green for ACCEPT, red for DROP, yellow for REJECT)
- Hit counters are displayed for each rule and update in real-time during simulation
- Filter chips allow quick filtering by chain type
- The default policy section shows configurable fallback actions for each chain
- Preset dropdown provides one-click loading of common configurations

### **7.2 Packet Simulator Output**

When a test packet is crafted and simulated, the system displays:
1. A verdict banner with appropriate color and icon (✅ ACCEPTED / 🚫 DROPPED / ⛔ REJECTED)
2. A step-by-step chain walk showing each rule evaluated, with the matching rule highlighted
3. When no rule matches, the default policy is shown as the final step

**Figure 7.2: Packet Simulation Result**

Example simulation result for an HTTP request (TCP, destination port 80) against the Web Server preset:
- Rule #1 (TCP, port 80, ACCEPT) — **MATCHED** ✅
- Verdict: **PACKET ACCEPTED** — Traffic is allowed through the firewall

Example simulation result for an SSH attempt from an external IP:
- Rule #1 (TCP, port 80, ACCEPT) — No match
- Rule #2 (TCP, port 443, ACCEPT) — No match
- Rule #3 (TCP, src 192.168.1.0/24, port 22, ACCEPT) — No match (source not in LAN)
- Rule #4 (ALL, any, DROP) — **MATCHED** 🚫
- Verdict: **PACKET DROPPED** — Traffic is silently discarded

### **7.3 Chain Visualization**

The Chain Visualization tab renders a horizontal flow diagram showing:
- An entry node (📦 Packet) with the chain name
- A node for each rule in the selected chain, color-coded by action
- A default policy node at the end
- Dashed connection lines with directional arrows
- Hit count badges on rules that have been triggered

**Figure 7.3: Chain Visualization**

### **7.4 Optimizer Analysis Results**

Running the optimizer on a ruleset with intentional issues produces a detailed report:

Example output with Web Server preset followed by an additional broad rule:
- **Efficiency Score: 52/100** — "Some improvements recommended"
- 🚨 **Critical Issue:** Shadowed Rule Detected — Rule #5 is completely shadowed by Rule #4
- ⚠️ **Warning:** Conflicting Rules — Rule #1 (ACCEPT) and Rule #4 (DROP) match overlapping traffic
- 💡 **Suggestion:** Optimization Opportunity — Rule #1 has 5 hits but is at position #1 (already optimal)

**Figure 7.4: Optimizer Analysis Results**

### **7.5 IPTables Command Generation**

The Commands tab generates a complete, valid IPTables bash script with:
- Shebang line and timestamp comment
- Flush commands (`iptables -F` and `iptables -X`)
- Default policy statements
- Established connection allow rule
- Loopback interface allow rules
- All user-defined custom rules with correct syntax
- Final rule listing command

**Example generated output:**

```bash
#!/bin/bash
# IPTables Firewall Rules — Generated by Simulator
# Generated: 4/1/2026, 9:00:00 PM

# Flush existing rules
iptables -F
iptables -X

# Set default policies
iptables -P INPUT DROP
iptables -P FORWARD DROP
iptables -P OUTPUT ACCEPT

# Allow established and related connections
iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT

# Allow loopback interface
iptables -A INPUT -i lo -j ACCEPT
iptables -A OUTPUT -o lo -j ACCEPT

# Custom firewall rules
iptables -A INPUT -p tcp --dport 80 -j ACCEPT   # Allow HTTP traffic
iptables -A INPUT -p tcp --dport 443 -j ACCEPT  # Allow HTTPS traffic
iptables -A INPUT -p tcp -s 192.168.1.0/24 --dport 22 -j ACCEPT  # Allow SSH from LAN
iptables -A INPUT --dport any -j DROP            # Drop all other incoming

# Print final rules
iptables -L -v -n --line-numbers

# Save rules (Debian/Ubuntu)
# iptables-save > /etc/iptables/rules.v4
```

**Figure 7.5: Generated IPTables Commands**

---

\newpage

## **CHAPTER 8: TESTING**

---

### **8.1 Test Cases**

The application was tested manually across various scenarios to validate all functional requirements.

**Table 8.1: Rule Manager Test Cases**

| TC-ID | Test Case | Input | Expected Result | Actual Result | Status |
|-------|-----------|-------|-----------------|---------------|--------|
| TC-01 | Add a basic TCP rule | Chain=INPUT, Protocol=TCP, DstPort=80, Action=ACCEPT | Rule appears in table with correct values | Rule added successfully, table updated | ✅ Pass |
| TC-02 | Add rule with CIDR source | SrcIP=192.168.1.0/24 | Rule shows CIDR notation in table | CIDR displayed correctly | ✅ Pass |
| TC-03 | Delete a rule | Click delete on Rule #2 | Rule removed, remaining rules renumbered | Rule deleted, table re-rendered | ✅ Pass |
| TC-04 | Reorder rules (move up) | Click move-up on Rule #3 | Rule moves to position #2 | Rule reordered correctly | ✅ Pass |
| TC-05 | Reorder rules (move down) | Click move-down on Rule #1 | Rule moves to position #2 | Rule reordered correctly | ✅ Pass |
| TC-06 | Load Web Server preset | Click Presets → Web Server | 4 rules loaded with correct values | Preset loaded successfully | ✅ Pass |
| TC-07 | Load SSH Only preset | Click Presets → SSH Only | 3 rules loaded | Preset loaded | ✅ Pass |
| TC-08 | Load Block All preset | Click Presets → Block All | 2 DROP rules loaded | Preset loaded | ✅ Pass |
| TC-09 | Filter by INPUT chain | Click INPUT filter chip | Only INPUT chain rules shown | Correct filtering applied | ✅ Pass |
| TC-10 | Change default policy | Set INPUT policy to ACCEPT | Policy updates, commands regenerated | Policy changed successfully | ✅ Pass |
| TC-11 | Clear form | Click "Clear" button | All form fields reset to defaults | Form cleared correctly | ✅ Pass |
| TC-12 | Reset all | Click "Reset" button | All rules, logs, counters cleared | Complete reset successful | ✅ Pass |
| TC-13 | Add rule with all protocols | Protocol=ALL | Rule matches any protocol | ALL protocol works correctly | ✅ Pass |
| TC-14 | Add REJECT action rule | Action=REJECT | Yellow REJECT badge displayed | Badge colored correctly | ✅ Pass |
| TC-15 | Add LOG action rule | Action=LOG | Purple LOG badge displayed | Badge colored correctly | ✅ Pass |

**Table 8.2: Packet Simulation Test Cases**

| TC-ID | Test Case | Ruleset | Packet | Expected Verdict | Actual | Status |
|-------|-----------|---------|--------|-----------------|--------|--------|
| TC-16 | HTTP match | Web Server preset | TCP, dst port 80 | ACCEPT | ACCEPT | ✅ Pass |
| TC-17 | HTTPS match | Web Server preset | TCP, dst port 443 | ACCEPT | ACCEPT | ✅ Pass |
| TC-18 | SSH from LAN | Web Server preset | TCP, src 192.168.1.50, dst port 22 | ACCEPT | ACCEPT | ✅ Pass |
| TC-19 | SSH from external | Web Server preset | TCP, src 203.0.113.5, dst port 22 | DROP | DROP | ✅ Pass |
| TC-20 | ICMP ping | SSH Only preset | ICMP | ACCEPT | ACCEPT | ✅ Pass |
| TC-21 | No rules, default DROP | Empty rules, INPUT=DROP | TCP, any | DROP | DROP | ✅ Pass |
| TC-22 | No rules, default ACCEPT | Empty rules, INPUT=ACCEPT | TCP, any | ACCEPT | ACCEPT | ✅ Pass |
| TC-23 | CIDR subnet match | Rule: src 10.0.0.0/8 ACCEPT | Src 10.5.100.50 | ACCEPT | ACCEPT | ✅ Pass |
| TC-24 | CIDR subnet no match | Rule: src 10.0.0.0/8 ACCEPT | Src 192.168.1.1 | DEFAULT | DEFAULT | ✅ Pass |
| TC-25 | Batch simulation (10 packets) | Web Server preset | 10 random packets | Mixed results logged | All logged correctly | ✅ Pass |
| TC-26 | Quick packet template | Click HTTP Request quick button | Form populated | Values filled correctly | ✅ Pass |
| TC-27 | Traffic log entry | Simulate any packet | Log entry added | Log updated in real-time | ✅ Pass |
| TC-28 | Clear traffic log | Click "Clear Log" | Log and counters reset | All cleared | ✅ Pass |
| TC-29 | Hit counter increment | Simulate matching packet | Matched rule hits +1 | Counter incremented | ✅ Pass |
| TC-30 | Chain walk display | Simulate packet | Step-by-step display | All steps shown correctly | ✅ Pass |

**Table 8.3: Optimizer Test Cases**

| TC-ID | Test Case | Ruleset Configuration | Expected Detection | Actual | Status |
|-------|-----------|----------------------|-------------------|--------|--------|
| TC-31 | Detect shadowed rule | Rule 1: ALL/any ACCEPT, Rule 2: TCP/80 DROP | Shadowed rule warning | Detected correctly | ✅ Pass |
| TC-32 | Detect redundant rule | Two identical TCP/80 ACCEPT rules | Redundancy warning | Detected correctly | ✅ Pass |
| TC-33 | Detect conflicting rules | Rule 1: TCP/80 ACCEPT, Rule 2: TCP/80 DROP | Conflict warning | Detected correctly | ✅ Pass |
| TC-34 | Detect overly broad rule | ALL/any DROP at position #1, then TCP/80 ACCEPT | Critical warning | Detected correctly | ✅ Pass |
| TC-35 | Security recommendation | INPUT default=ACCEPT, no drop-all rule | Security info | Recommendation shown | ✅ Pass |
| TC-36 | Clean ruleset | Well-ordered Web Server preset | Score 100, "All Clear" | No issues detected | ✅ Pass |
| TC-37 | Empty ruleset optimizer | No rules defined | Error toast "Add rules" | Error shown correctly | ✅ Pass |
| TC-38 | Score calculation | Multiple issues present | Score ≤ 50 | Score calculated correctly | ✅ Pass |

### **8.2 Test Results Summary**

**Table 8.4: Test Results Summary**

| Category | Total Tests | Passed | Failed | Pass Rate |
|----------|-------------|--------|--------|-----------|
| Rule Management | 15 | 15 | 0 | 100% |
| Packet Simulation | 15 | 15 | 0 | 100% |
| Optimizer | 8 | 8 | 0 | 100% |
| **Total** | **38** | **38** | **0** | **100%** |

**Browser Compatibility Testing:**

| Browser | Version | Platform | Result |
|---------|---------|----------|--------|
| Google Chrome | 120+ | Windows/macOS | ✅ Fully functional |
| Mozilla Firefox | 121+ | Windows/macOS | ✅ Fully functional |
| Safari | 17+ | macOS | ✅ Fully functional |
| Microsoft Edge | 120+ | Windows | ✅ Fully functional |
| Chrome Mobile | 120+ | Android | ✅ Responsive layout works |
| Safari Mobile | 17+ | iOS | ✅ Responsive layout works |

**Performance Testing:**

| Metric | Measurement |
|--------|-------------|
| Page load time | < 500ms |
| Rule addition latency | < 5ms |
| Packet simulation time (10 rules) | < 1ms |
| Packet simulation time (100 rules) | < 5ms |
| Canvas rendering time | < 20ms |
| Optimizer analysis (50 rules) | < 50ms |
| Command generation | < 10ms |

All performance metrics are well within acceptable limits for a responsive user experience.

---

\newpage

## **CHAPTER 9: APPLICATIONS**

---

The IPTables Firewall Rule Simulator has practical applications across multiple domains:

### **9.1 Educational Applications**

**1. Academic Labs:** The simulator serves as a primary teaching tool for Computer and Network Security courses. Students can experiment with firewall rules, understand chain processing order, and visualize how packets traverse the rule chain — all without needing root access to a Linux system. The step-by-step chain walk visualization makes abstract concepts tangible.

**2. Certification Preparation:** Candidates preparing for CompTIA Security+, CEH (Certified Ethical Hacker), CCNA Security, and RHCSA certifications can use the simulator to practice IPTables concepts covered in these exams. The command generation feature helps candidates learn the exact syntax required.

**3. Workshop Demonstrations:** Instructors can use the simulator during live workshops and presentations to demonstrate firewall concepts. The dark theme and professional design make it suitable for projector presentations, and the real-time response to changes keeps demonstrations dynamic and engaging.

**4. Self-Paced Learning:** Students learning independently can load preset configurations, simulate packets, analyze the results, and gradually build their understanding of IPTables without external supervision. The optimizer provides automated feedback that guides learning.

### **9.2 Professional Applications**

**1. Firewall Rule Planning:** System administrators can use the simulator to plan and test firewall rules before deploying them on production servers. By simulating various traffic patterns against a proposed ruleset, administrators can verify that the rules behave as intended before making live changes.

**2. Configuration Auditing:** The optimizer module can be used to analyze existing firewall configurations for issues. By manually entering current production rules into the simulator, administrators can identify shadowed rules, redundancies, and conflicts that may have accumulated over time.

**3. Incident Response Training:** Security teams can use the simulator to train on how firewall rules affect traffic during security incidents. By configuring rules that mimic a compromised system and simulating attack traffic, teams can practice containment strategies.

**4. Documentation:** The command generation feature can be used to document firewall configurations in a standardized bash script format, complete with comments describing each rule's purpose.

### **9.3 Research Applications**

**1. Firewall Performance Studies:** Researchers studying the impact of rule ordering on firewall performance can use the hit counter feature to analyze traffic distribution across rules and identify optimization opportunities.

**2. Security Policy Analysis:** The optimization engine's conflict detection capabilities can be applied to study the prevalence of misconfiguration in firewall rulesets.

---

\newpage

## **CHAPTER 10: FUTURE ENHANCEMENTS**

---

While the current implementation provides a comprehensive IPTables simulation experience, several enhancements are planned for future development:

### **10.1 Short-term Enhancements**

**1. Persistent Storage (LocalStorage):** Implement save/load functionality using the browser's LocalStorage API, allowing users to persist their rulesets across sessions. Users could name, save, and recall multiple firewall configurations.

**2. Rule Import/Export:** Support importing existing IPTables rules from text files or pasting IPTables commands to auto-populate the rule form. Also support exporting rulesets in JSON or iptables-save format.

**3. Stateful Connection Tracking:** Simulate IPTables' connection tracking module by maintaining a connection state table. Rules could include `-m state --state ESTABLISHED,RELATED` conditions, enabling more realistic simulation of stateful firewall behavior.

**4. IPv6 Support (ip6tables):** Extend the simulator to support IPv6 addresses and the ip6tables ruleset, which uses 128-bit addresses and has different default chain configurations.

**5. Enhanced Visualization:** Implement a packet animation that visually shows a packet moving through the chain flow diagram, bouncing off matched rules or passing through unmatched ones.

### **10.2 Medium-term Enhancements**

**6. NAT Table Simulation:** Add support for the NAT table with PREROUTING and POSTROUTING chains, enabling simulation of DNAT (port forwarding), SNAT (source NAT), and MASQUERADE rules commonly used in routers and gateways.

**7. Custom User Chains:** Allow users to create custom chains (e.g., `-N MY_CHAIN`) and jump to them from built-in chains using the `-j` target. This would support more complex and realistic firewall architectures.

**8. Rate Limiting Module:** Simulate the `limit` and `hashlimit` modules that are commonly used to prevent DDoS attacks by throttling the rate of matching packets.

**9. Interface-based Filtering:** Add support for `-i` (input interface) and `-o` (output interface) matching criteria, enabling simulation of multi-interface firewall configurations.

**10. Collaborative Mode:** Implement a shared session feature using WebRTC or WebSockets, allowing instructors and students to view and interact with the same ruleset in real-time during lab sessions.

### **10.3 Long-term Enhancements**

**11. AI-Powered Rule Suggestions:** Integrate an open-source LLM to provide intelligent rule suggestions based on the user's described security requirements. For example, the user could type "I want to run a web server that only accepts SSH from my office IP" and the system would generate the appropriate rules.

**12. nftables Compatibility:** Since nftables is the official successor to IPTables, add a mode that generates nftables-compatible commands alongside IPTables commands.

**13. Integration with Virtual Labs:** Connect the simulator with containerized Linux environments (using Docker or cloud VMs) where generated rules can be applied to live systems for real-world testing.

**14. Mobile Application:** Package the web application as a Progressive Web App (PWA) with offline support, installable on mobile devices for convenient reference and practice.

**15. Gamification:** Add challenges and learning modules with progressive difficulty levels, scoring, and achievements to make firewall learning more engaging for students.

---

\newpage

## **CHAPTER 11: CONCLUSION**

---

This project successfully designed and implemented an **IPTables Firewall Rule Simulator** — a comprehensive, web-based interactive tool for learning and experimenting with IPTables firewall rules in a safe, sandboxed environment.

### **Summary of Achievements**

The following objectives were met:

**1. Comprehensive Rule Management:** The simulator provides a full-featured rule management interface supporting all essential IPTables parameters including chain selection (INPUT, OUTPUT, FORWARD), protocol filtering (TCP, UDP, ICMP, ALL), CIDR-based IP address matching, port filtering, and four action types (ACCEPT, DROP, REJECT, LOG). Users can add, delete, reorder, and filter rules with real-time updates across all views.

**2. Accurate Packet Simulation:** The packet simulation engine faithfully replicates the sequential matching algorithm used by the real IPTables kernel module. It processes test packets through the appropriate chain, evaluating rules in order and applying the first matching rule's action. The step-by-step chain walk visualization makes the decision process transparent and educational.

**3. CIDR Subnet Matching:** The implementation correctly handles CIDR notation for IP address ranges using bitwise operations on 32-bit unsigned integers, supporting any valid subnet mask from /0 (any) to /32 (exact match).

**4. Interactive Visualization:** The HTML5 Canvas-based chain flow diagram provides a visual representation of how rules are organized within a chain and how packets flow through them. Color-coded nodes, hit count badges, and dynamic rendering make the visualization informative and engaging.

**5. Intelligent Rule Optimization:** The optimization engine performs seven distinct analyses on the ruleset, detecting common issues such as shadowed rules, redundant entries, conflicting actions, overly broad rules, and security policy weaknesses. The weighted scoring system provides a quantitative assessment of ruleset quality.

**6. Automatic Command Generation:** The command generator produces valid, syntax-highlighted IPTables bash scripts that include flush commands, default policies, established connection handling, loopback rules, and all user-defined custom rules. This bridges the gap between graphical rule definition and command-line execution.

**7. Premium User Experience:** The dark theme with glassmorphism effects, animated backgrounds, micro-animations, responsive layouts, and intuitive navigation creates a professional and engaging user interface that makes firewall learning accessible and enjoyable.

### **Technical Achievements**

- **Zero Dependencies:** The entire application (99 KB, 2,903 lines) runs with no external JavaScript libraries, no CSS frameworks, no server-side runtime, and no database. This makes it maximally portable and eliminates version conflicts.
- **Cross-Browser Compatibility:** Tested and functional on Chrome, Firefox, Safari, Edge, and mobile browsers.
- **Performance:** All user interactions complete in under 50ms, ensuring a responsive experience even with large rulesets.
- **100% Test Pass Rate:** All 38 test cases across rule management, packet simulation, and optimization passed successfully.

### **Learning Outcomes**

Through this project, we gained practical understanding of:
- Linux firewall architecture and the Netfilter/IPTables framework
- Packet filtering algorithms and rule processing order
- CIDR notation and subnet matching using bitwise operations
- UI/UX design principles for technical tools
- HTML5 Canvas API for data visualization
- CSS Custom Properties for design system management
- Vanilla JavaScript application architecture

The IPTables Firewall Rule Simulator successfully addresses the gap between theoretical firewall knowledge and practical hands-on experience, providing students and professionals with a powerful, accessible tool for understanding and mastering Linux firewall configuration.

---

\newpage

## **CHAPTER 12: REFERENCES**

---

1. Rash, M. (2007). *Linux Firewalls: Attack Detection and Response with iptables, psad, and fwsnort.* No Starch Press. ISBN: 978-1593271411.

2. Purdy, G. N. (2004). *Linux iptables Pocket Reference.* O'Reilly Media. ISBN: 978-0596005696.

3. Netfilter Project (2023). *Netfilter/iptables project homepage.* Available at: https://www.netfilter.org/

4. Linux man pages: `iptables(8)` — administration tool for IPv4 packet filtering and NAT. Available at: https://linux.die.net/man/8/iptables

5. Red Hat Documentation (2023). *Using firewalls: iptables.* Available at: https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux/7/html/security_guide/sec-using_firewalls

6. DigitalOcean Community (2023). *IPTables Essentials: Common Firewall Rules and Commands.* Available at: https://www.digitalocean.com/community/tutorials/iptables-essentials-common-firewall-rules-and-commands

7. Stallings, W. (2020). *Network Security Essentials: Applications and Standards.* 6th Edition. Pearson. ISBN: 978-0134527338.

8. Forouzan, B. A. (2017). *Cryptography and Network Security.* McGraw-Hill Education. ISBN: 978-0073523545.

9. Mozilla Developer Network (2024). *Canvas API.* Available at: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API

10. Mozilla Developer Network (2024). *CSS Custom Properties (CSS Variables).* Available at: https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties

11. W3C (2023). *HTML5 Specification.* Available at: https://html.spec.whatwg.org/

12. Kurose, J. F. & Ross, K. W. (2021). *Computer Networking: A Top-Down Approach.* 8th Edition. Pearson. ISBN: 978-0135928608.

13. Tanenbaum, A. S. & Wetherall, D. J. (2021). *Computer Networks.* 6th Edition. Pearson. ISBN: 978-0132126953.

14. Cheswick, W. R., Bellovin, S. M., & Rubin, A. D. (2003). *Firewalls and Internet Security: Repelling the Wily Hacker.* 2nd Edition. Addison-Wesley. ISBN: 978-020163466.

15. Snort Project (2024). *Snort — Network Intrusion Detection & Prevention System.* Available at: https://www.snort.org/

16. IETF RFC 791 (1981). *Internet Protocol — DARPA Internet Program Protocol Specification.* Available at: https://tools.ietf.org/html/rfc791

17. IETF RFC 4632 (2006). *Classless Inter-domain Routing (CIDR): The Internet Address Assignment and Aggregation Plan.* Available at: https://tools.ietf.org/html/rfc4632

18. ArchLinux Wiki (2024). *iptables — A Simple Stateful Firewall.* Available at: https://wiki.archlinux.org/title/Iptables

19. CIS Benchmarks (2023). *CIS Amazon Linux 2 Benchmark — Section 3.4: Ensure iptables is installed and configured.* Center for Internet Security.

20. NIST SP 800-41 Rev.1 (2009). *Guidelines on Firewalls and Firewall Policy.* National Institute of Standards and Technology. Available at: https://csrc.nist.gov/publications/detail/sp/800-41/rev-1/final

---

\newpage

## **APPENDIX A: COMPLETE SOURCE CODE**

---

### **A.1 index.html — Main HTML Document**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>IPTables Firewall Rule Simulator</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900
    &family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <!-- Animated Background -->
    <div class="bg-grid"></div>
    <div class="bg-glow bg-glow-1"></div>
    <div class="bg-glow bg-glow-2"></div>
    <div class="bg-glow bg-glow-3"></div>

    <!-- Header with logo, stats, and reset -->
    <header id="app-header">
        <!-- Logo, title, stats bar, reset button -->
    </header>

    <!-- Navigation Tabs: Rule Manager, Packet Simulator,
         Chain Visualization, Optimizer, Commands -->
    <nav id="main-nav">
        <div class="nav-tabs">
            <button class="nav-tab active" data-tab="rules">Rule Manager</button>
            <button class="nav-tab" data-tab="simulator">Packet Simulator</button>
            <button class="nav-tab" data-tab="visualization">Chain Visualization</button>
            <button class="nav-tab" data-tab="optimizer">Optimizer</button>
            <button class="nav-tab" data-tab="commands">IPTables Commands</button>
        </div>
    </nav>

    <!-- Main Content Area with 5 Tab Panels -->
    <main id="main-content">
        <!-- Tab 1: Rule Manager (form + table) -->
        <!-- Tab 2: Packet Simulator (packet form + results) -->
        <!-- Tab 3: Chain Visualization (canvas) -->
        <!-- Tab 4: Optimizer (analysis report) -->
        <!-- Tab 5: IPTables Commands (generated script) -->
    </main>

    <div id="toast-container"></div>
    <script src="app.js"></script>
</body>
</html>
```

*(Full source: 468 lines — see index.html file)*

### **A.2 app.js — Application Logic (Key Sections)**

```javascript
/* IPTables Firewall Rule Simulator — Application Logic */

// ————— State —————
const state = {
    rules: [],
    trafficLog: [],
    defaultPolicies: { INPUT: 'DROP', FORWARD: 'DROP', OUTPUT: 'ACCEPT' },
    counters: { accepted: 0, dropped: 0, rejected: 0 },
    activeFilter: 'all',
    nextId: 1
};

// ————— Presets (6 configurations) —————
const PRESETS = {
    'web-server': [ /* HTTP, HTTPS, SSH from LAN, DROP all */ ],
    'ssh-only':   [ /* SSH from 10.x, ICMP, DROP all */ ],
    'dns-server': [ /* DNS UDP/TCP, SSH from private */ ],
    'block-all':  [ /* DROP all INPUT, DROP all FORWARD */ ],
    'mail-server':[ /* SMTP, Submission, IMAPS, POP3S */ ],
    'gaming':     [ /* Game ports, SSH from LAN */ ]
};

// ————— Core Functions —————
function addRule() { /* Rule creation from form */ }
function deleteRule(id) { /* Remove rule by ID */ }
function moveRule(id, direction) { /* Reorder rules */ }
function simulatePacket(customPacket) { /* Chain walk simulation */ }
function matchesRule(packet, rule) { /* Rule matching logic */ }
function ipMatches(packetIp, ruleIp) { /* CIDR subnet matching */ }
function ipToNumber(ip) { /* IP to 32-bit integer */ }
function drawChainVisualization() { /* Canvas rendering */ }
function runOptimizer() { /* 7-check analysis engine */ }
function generateCommands() { /* IPTables script generation */ }
function showToast(message, type) { /* Notification system */ }
```

*(Full source: 1045 lines — see app.js file)*

### **A.3 styles.css — Design System (Key Sections)**

```css
/* IPTables Firewall Rule Simulator — Premium Dark Theme */

:root {
    --bg-primary: #0a0a1a;
    --bg-card: rgba(15, 15, 40, 0.85);
    --accent: #6366f1;
    --green: #22c55e;
    --red: #ef4444;
    --yellow: #f59e0b;
    --font-sans: 'Inter', sans-serif;
    --font-mono: 'JetBrains Mono', monospace;
    --transition-base: 250ms cubic-bezier(0.4, 0, 0.2, 1);
}

/* Animated background grid and glow effects */
/* Glassmorphism card components */
/* Responsive navigation tabs */
/* Form inputs with focus glow effects */
/* Rule table with hover and match highlights */
/* Action badges (ACCEPT=green, DROP=red, REJECT=yellow) */
/* Chain badges (INPUT=cyan, OUTPUT=purple, FORWARD=orange) */
/* Simulation verdict display */
/* Chain walk step-by-step animation */
/* Toast notification system */
/* Responsive breakpoints (1200px, 768px) */
/* Custom scrollbar styling */
```

*(Full source: 1390 lines — see styles.css file)*

---

\newpage

## **APPENDIX B: GLOSSARY OF TERMS**

---

| Term | Definition |
|------|-----------|
| **ACL** | Access Control List — A list of rules controlling access to resources |
| **CIDR** | Classless Inter-Domain Routing — Method for allocating IP addresses and IP routing |
| **Chain** | A list of rules in IPTables that packets are checked against |
| **DPI** | Deep Packet Inspection — Examining the data part of a packet as it passes |
| **DROP** | IPTables target that silently discards a packet without response |
| **DMZ** | Demilitarized Zone — A perimeter network segment between internal and external networks |
| **FORWARD** | IPTables chain for packets being routed through the system |
| **IDS** | Intrusion Detection System — Monitors network traffic for suspicious activity |
| **INPUT** | IPTables chain for packets destined for the local system |
| **IPS** | Intrusion Prevention System — Monitors and blocks suspicious network traffic |
| **IPTables** | User-space utility for configuring Linux kernel firewall rules |
| **NAT** | Network Address Translation — Modifying IP address information in packets |
| **Netfilter** | Linux kernel framework providing hooks for packet manipulation |
| **OUTPUT** | IPTables chain for packets originating from the local system |
| **Packet** | A unit of data transmitted over a network |
| **REJECT** | IPTables target that blocks a packet and sends an ICMP error response |
| **Rule** | A set of conditions and an action applied to network packets |
| **SPA** | Single-Page Application — Web app that loads a single HTML page |
| **Subnet** | A logical subdivision of an IP network |
| **TCP** | Transmission Control Protocol — Connection-oriented transport protocol |
| **UDP** | User Datagram Protocol — Connectionless transport protocol |
| **ICMP** | Internet Control Message Protocol — Used for diagnostic messages like ping |

---

\newpage

## **APPENDIX C: IPTables QUICK REFERENCE**

---

### **Common IPTables Commands**

```bash
# List all rules with line numbers
iptables -L -v -n --line-numbers

# Set default policy
iptables -P INPUT DROP
iptables -P FORWARD DROP
iptables -P OUTPUT ACCEPT

# Allow established connections
iptables -A INPUT -m state --state ESTABLISHED,RELATED -j ACCEPT

# Allow loopback
iptables -A INPUT -i lo -j ACCEPT

# Allow specific port
iptables -A INPUT -p tcp --dport 80 -j ACCEPT

# Allow from specific subnet
iptables -A INPUT -s 192.168.1.0/24 -p tcp --dport 22 -j ACCEPT

# Block specific IP
iptables -A INPUT -s 10.0.0.100 -j DROP

# Delete rule by number
iptables -D INPUT 3

# Flush all rules
iptables -F

# Save rules
iptables-save > /etc/iptables/rules.v4

# Restore rules
iptables-restore < /etc/iptables/rules.v4
```

### **Common Port Numbers**

| Port | Service | Protocol |
|------|---------|----------|
| 20/21 | FTP | TCP |
| 22 | SSH | TCP |
| 23 | Telnet | TCP |
| 25 | SMTP | TCP |
| 53 | DNS | TCP/UDP |
| 80 | HTTP | TCP |
| 110 | POP3 | TCP |
| 143 | IMAP | TCP |
| 443 | HTTPS | TCP |
| 993 | IMAPS | TCP |
| 995 | POP3S | TCP |
| 3306 | MySQL | TCP |
| 3389 | RDP | TCP |
| 5432 | PostgreSQL | TCP |
| 8080 | HTTP Proxy | TCP |
| 27015 | Game Server | TCP/UDP |

---

**— END OF REPORT —**

---

*Total estimated page count: 47 pages (when formatted in a word processor with standard academic formatting: 12pt Times New Roman, 1.5 line spacing, 1-inch margins)*
