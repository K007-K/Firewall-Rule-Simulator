/* =========================================================
   IPTables Firewall Rule Simulator — Application Logic
   ========================================================= */

// ————— State —————
const state = {
    rules: [],
    trafficLog: [],
    defaultPolicies: {
        INPUT: 'DROP',
        FORWARD: 'DROP',
        OUTPUT: 'ACCEPT'
    },
    counters: { accepted: 0, dropped: 0, rejected: 0 },
    activeFilter: 'all',
    activeTab: 'rules',
    nextId: 1
};

// ————— Presets —————
const PRESETS = {
    'web-server': [
        { chain: 'INPUT', protocol: 'tcp', srcIp: '0.0.0.0/0', dstIp: '0.0.0.0/0', srcPort: 'any', dstPort: '80', action: 'ACCEPT', description: 'Allow HTTP traffic' },
        { chain: 'INPUT', protocol: 'tcp', srcIp: '0.0.0.0/0', dstIp: '0.0.0.0/0', srcPort: 'any', dstPort: '443', action: 'ACCEPT', description: 'Allow HTTPS traffic' },
        { chain: 'INPUT', protocol: 'tcp', srcIp: '192.168.1.0/24', dstIp: '0.0.0.0/0', srcPort: 'any', dstPort: '22', action: 'ACCEPT', description: 'Allow SSH from LAN' },
        { chain: 'INPUT', protocol: 'all', srcIp: '0.0.0.0/0', dstIp: '0.0.0.0/0', srcPort: 'any', dstPort: 'any', action: 'DROP', description: 'Drop all other incoming' },
    ],
    'ssh-only': [
        { chain: 'INPUT', protocol: 'tcp', srcIp: '10.0.0.0/8', dstIp: '0.0.0.0/0', srcPort: 'any', dstPort: '22', action: 'ACCEPT', description: 'Allow SSH from 10.x.x.x' },
        { chain: 'INPUT', protocol: 'icmp', srcIp: '0.0.0.0/0', dstIp: '0.0.0.0/0', srcPort: 'any', dstPort: 'any', action: 'ACCEPT', description: 'Allow ping' },
        { chain: 'INPUT', protocol: 'all', srcIp: '0.0.0.0/0', dstIp: '0.0.0.0/0', srcPort: 'any', dstPort: 'any', action: 'DROP', description: 'Block everything else' },
    ],
    'dns-server': [
        { chain: 'INPUT', protocol: 'udp', srcIp: '0.0.0.0/0', dstIp: '0.0.0.0/0', srcPort: 'any', dstPort: '53', action: 'ACCEPT', description: 'Allow DNS UDP' },
        { chain: 'INPUT', protocol: 'tcp', srcIp: '0.0.0.0/0', dstIp: '0.0.0.0/0', srcPort: 'any', dstPort: '53', action: 'ACCEPT', description: 'Allow DNS TCP' },
        { chain: 'INPUT', protocol: 'tcp', srcIp: '192.168.0.0/16', dstIp: '0.0.0.0/0', srcPort: 'any', dstPort: '22', action: 'ACCEPT', description: 'Allow SSH from private' },
    ],
    'block-all': [
        { chain: 'INPUT', protocol: 'all', srcIp: '0.0.0.0/0', dstIp: '0.0.0.0/0', srcPort: 'any', dstPort: 'any', action: 'DROP', description: 'Block all incoming traffic' },
        { chain: 'FORWARD', protocol: 'all', srcIp: '0.0.0.0/0', dstIp: '0.0.0.0/0', srcPort: 'any', dstPort: 'any', action: 'DROP', description: 'Block all forwarded traffic' },
    ],
    'mail-server': [
        { chain: 'INPUT', protocol: 'tcp', srcIp: '0.0.0.0/0', dstIp: '0.0.0.0/0', srcPort: 'any', dstPort: '25', action: 'ACCEPT', description: 'Allow SMTP' },
        { chain: 'INPUT', protocol: 'tcp', srcIp: '0.0.0.0/0', dstIp: '0.0.0.0/0', srcPort: 'any', dstPort: '587', action: 'ACCEPT', description: 'Allow SMTP Submission' },
        { chain: 'INPUT', protocol: 'tcp', srcIp: '0.0.0.0/0', dstIp: '0.0.0.0/0', srcPort: 'any', dstPort: '993', action: 'ACCEPT', description: 'Allow IMAPS' },
        { chain: 'INPUT', protocol: 'tcp', srcIp: '0.0.0.0/0', dstIp: '0.0.0.0/0', srcPort: 'any', dstPort: '995', action: 'ACCEPT', description: 'Allow POP3S' },
    ],
    'gaming': [
        { chain: 'INPUT', protocol: 'udp', srcIp: '0.0.0.0/0', dstIp: '0.0.0.0/0', srcPort: 'any', dstPort: '27015', action: 'ACCEPT', description: 'Game server port' },
        { chain: 'INPUT', protocol: 'tcp', srcIp: '0.0.0.0/0', dstIp: '0.0.0.0/0', srcPort: 'any', dstPort: '27015', action: 'ACCEPT', description: 'Game server RCON' },
        { chain: 'INPUT', protocol: 'udp', srcIp: '0.0.0.0/0', dstIp: '0.0.0.0/0', srcPort: 'any', dstPort: '27020', action: 'ACCEPT', description: 'Steam query port' },
        { chain: 'INPUT', protocol: 'tcp', srcIp: '192.168.1.0/24', dstIp: '0.0.0.0/0', srcPort: 'any', dstPort: '22', action: 'ACCEPT', description: 'SSH from LAN only' },
    ]
};

// ————— DOM References —————
const dom = {
    // Tabs
    navTabs: document.querySelectorAll('.nav-tab'),
    tabPanels: document.querySelectorAll('.tab-panel'),
    // Rule form
    ruleForm: document.getElementById('rule-form'),
    ruleChain: document.getElementById('rule-chain'),
    ruleProtocol: document.getElementById('rule-protocol'),
    ruleAction: document.getElementById('rule-action'),
    ruleSrcIp: document.getElementById('rule-src-ip'),
    ruleDstIp: document.getElementById('rule-dst-ip'),
    ruleSrcPort: document.getElementById('rule-src-port'),
    ruleDstPort: document.getElementById('rule-dst-port'),
    ruleDescription: document.getElementById('rule-description'),
    btnAddRule: document.getElementById('btn-add-rule'),
    btnClearForm: document.getElementById('btn-clear-form'),
    // Presets
    btnPresets: document.getElementById('btn-presets'),
    presetsMenu: document.getElementById('presets-menu'),
    // Rules table
    rulesTbody: document.getElementById('rules-tbody'),
    emptyRules: document.getElementById('empty-rules'),
    filterChips: document.querySelectorAll('.filter-chip'),
    // Stats
    totalRulesCount: document.getElementById('total-rules-count'),
    acceptedCount: document.getElementById('accepted-count'),
    droppedCount: document.getElementById('dropped-count'),
    rejectedCount: document.getElementById('rejected-count'),
    // Packet simulator
    packetForm: document.getElementById('packet-form'),
    pktDirection: document.getElementById('pkt-direction'),
    pktProtocol: document.getElementById('pkt-protocol'),
    pktSrcIp: document.getElementById('pkt-src-ip'),
    pktDstIp: document.getElementById('pkt-dst-ip'),
    pktSrcPort: document.getElementById('pkt-src-port'),
    pktDstPort: document.getElementById('pkt-dst-port'),
    simEmpty: document.getElementById('sim-empty'),
    simResult: document.getElementById('sim-result'),
    simVerdict: document.getElementById('sim-verdict'),
    simChainWalk: document.getElementById('sim-chain-walk'),
    logEntries: document.getElementById('log-entries'),
    btnClearLog: document.getElementById('btn-clear-log'),
    btnBatchSim: document.getElementById('btn-batch-sim'),
    // Visualization
    vizChainSelect: document.getElementById('viz-chain-select'),
    chainCanvas: document.getElementById('chain-canvas'),
    // Optimizer
    btnRunOptimizer: document.getElementById('btn-run-optimizer'),
    optimizerEmpty: document.getElementById('optimizer-empty'),
    optimizerOutput: document.getElementById('optimizer-output'),
    // Commands
    commandsCode: document.getElementById('commands-code'),
    btnCopyCommands: document.getElementById('btn-copy-commands'),
    // Global
    btnResetAll: document.getElementById('btn-reset-all'),
    toastContainer: document.getElementById('toast-container'),
};

// ————— Init —————
document.addEventListener('DOMContentLoaded', () => {
    loadState();
    bindEvents();
    renderRulesTable();
    updateStats();
    generateCommands();
    drawChainVisualization();
    
    // Ensure selects and logs match loaded state
    document.querySelectorAll('.policy-select').forEach(sel => {
        sel.value = state.defaultPolicies[sel.dataset.chain];
    });
    renderLog();

    // Restore active filter visually
    if (state.activeFilter !== 'all') {
        dom.filterChips.forEach(c => c.classList.remove('active'));
        const activeChip = document.querySelector(`.filter-chip[data-filter="${state.activeFilter}"]`);
        if (activeChip) activeChip.classList.add('active');
    }

    // Restore active tab
    if (state.activeTab && state.activeTab !== 'rules') {
        switchTab(state.activeTab);
    }
});

// ————— State Persistence —————
function saveState() {
    localStorage.setItem('iptablesSimulatorState', JSON.stringify({
        rules: state.rules,
        trafficLog: state.trafficLog,
        defaultPolicies: state.defaultPolicies,
        counters: state.counters,
        activeFilter: state.activeFilter,
        activeTab: state.activeTab,
        nextId: state.nextId
    }));
}

function loadState() {
    try {
        const saved = localStorage.getItem('iptablesSimulatorState');
        if (saved) {
            const parsed = JSON.parse(saved);
            if (parsed.rules) state.rules = parsed.rules;
            if (parsed.trafficLog) state.trafficLog = parsed.trafficLog;
            if (parsed.defaultPolicies) Object.assign(state.defaultPolicies, parsed.defaultPolicies);
            if (parsed.counters) Object.assign(state.counters, parsed.counters);
            if (parsed.activeFilter) state.activeFilter = parsed.activeFilter;
            if (parsed.activeTab) state.activeTab = parsed.activeTab;
            if (parsed.nextId) state.nextId = parsed.nextId;
        }
    } catch (e) {
        console.error("Failed to load state", e);
    }
}

// ————— Event Bindings —————
function bindEvents() {
    // Tabs
    dom.navTabs.forEach(tab => {
        tab.addEventListener('click', () => switchTab(tab.dataset.tab));
    });

    // Rule form
    dom.ruleForm.addEventListener('submit', (e) => {
        e.preventDefault();
        addRule();
    });

    dom.btnClearForm.addEventListener('click', clearForm);

    // Presets
    dom.btnPresets.addEventListener('click', (e) => {
        e.stopPropagation();
        dom.presetsMenu.classList.toggle('show');
    });

    document.querySelectorAll('.dropdown-item[data-preset]').forEach(item => {
        item.addEventListener('click', () => loadPreset(item.dataset.preset));
    });

    document.addEventListener('click', () => {
        dom.presetsMenu.classList.remove('show');
    });

    // Chain filter
    dom.filterChips.forEach(chip => {
        chip.addEventListener('click', () => {
            dom.filterChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            state.activeFilter = chip.dataset.filter;
            saveState();
            renderRulesTable();
        });
    });

    // Packet simulator
    dom.packetForm.addEventListener('submit', (e) => {
        e.preventDefault();
        simulatePacket();
    });

    dom.btnBatchSim.addEventListener('click', batchSimulate);
    dom.btnClearLog.addEventListener('click', clearLog);

    // Quick packets
    document.querySelectorAll('.quick-pkt').forEach(btn => {
        btn.addEventListener('click', () => {
            const pkt = JSON.parse(btn.dataset.pkt);
            dom.pktDirection.value = pkt.direction;
            dom.pktProtocol.value = pkt.protocol;
            dom.pktSrcIp.value = pkt.srcIp;
            dom.pktDstIp.value = pkt.dstIp;
            dom.pktSrcPort.value = pkt.srcPort;
            dom.pktDstPort.value = pkt.dstPort;
            showToast('Packet template loaded', 'info');
        });
    });

    // Visualization
    dom.vizChainSelect.addEventListener('change', drawChainVisualization);

    // Optimizer
    dom.btnRunOptimizer.addEventListener('click', runOptimizer);

    // Commands
    dom.btnCopyCommands.addEventListener('click', copyCommands);

    // Reset
    dom.btnResetAll.addEventListener('click', resetAll);

    // Default policies
    document.querySelectorAll('.policy-select').forEach(sel => {
        sel.addEventListener('change', () => {
            state.defaultPolicies[sel.dataset.chain] = sel.value;
            saveState();
            generateCommands();
            drawChainVisualization();
            showToast(`${sel.dataset.chain} default policy set to ${sel.value}`, 'info');
        });
    });

    // Redraw canvas on resize
    window.addEventListener('resize', drawChainVisualization);
}

// ————— Tab Switching —————
function switchTab(tabId) {
    dom.navTabs.forEach(t => t.classList.remove('active'));
    dom.tabPanels.forEach(p => p.classList.remove('active'));
    document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');
    document.getElementById(`panel-${tabId}`).classList.add('active');

    state.activeTab = tabId;
    saveState();

    if (tabId === 'visualization') {
        setTimeout(drawChainVisualization, 50);
    }
    if (tabId === 'commands') {
        generateCommands();
    }
}

// ————— Rule Management —————
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
    saveState();
    renderRulesTable();
    updateStats();
    generateCommands();
    drawChainVisualization();
    clearForm();
    showToast(`Rule #${rule.id} added to ${rule.chain} chain`, 'success');
}

function deleteRule(id) {
    state.rules = state.rules.filter(r => r.id !== id);
    saveState();
    renderRulesTable();
    updateStats();
    generateCommands();
    drawChainVisualization();
    showToast('Rule deleted', 'warning');
}

function moveRule(id, direction) {
    const idx = state.rules.findIndex(r => r.id === id);
    if (idx === -1) return;
    const newIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (newIdx < 0 || newIdx >= state.rules.length) return;
    [state.rules[idx], state.rules[newIdx]] = [state.rules[newIdx], state.rules[idx]];
    saveState();
    renderRulesTable();
    generateCommands();
    drawChainVisualization();
}

function clearForm() {
    dom.ruleSrcIp.value = '0.0.0.0/0';
    dom.ruleDstIp.value = '0.0.0.0/0';
    dom.ruleSrcPort.value = 'any';
    dom.ruleDstPort.value = 'any';
    dom.ruleDescription.value = '';
    dom.ruleChain.value = 'INPUT';
    dom.ruleProtocol.value = 'tcp';
    dom.ruleAction.value = 'ACCEPT';
}

function loadPreset(presetKey) {
    const preset = PRESETS[presetKey];
    if (!preset) return;

    state.rules = [];
    state.nextId = 1;
    preset.forEach(r => {
        state.rules.push({ ...r, id: state.nextId++, hits: 0 });
    });
    saveState();

    renderRulesTable();
    updateStats();
    generateCommands();
    drawChainVisualization();
    dom.presetsMenu.classList.remove('show');
    showToast(`Loaded "${presetKey.replace(/-/g, ' ')}" preset`, 'success');
}

// ————— Render Rules Table —————
function renderRulesTable() {
    const filtered = state.activeFilter === 'all'
        ? state.rules
        : state.rules.filter(r => r.chain === state.activeFilter);

    if (filtered.length === 0) {
        dom.emptyRules.classList.remove('hidden');
        dom.rulesTbody.innerHTML = '';
        return;
    }

    dom.emptyRules.classList.add('hidden');

    dom.rulesTbody.innerHTML = filtered.map((rule, i) => {
        const chainClass = rule.chain.toLowerCase();
        const actionClass = rule.action.toLowerCase();
        const globalIdx = state.rules.indexOf(rule);

        return `
        <tr data-rule-id="${rule.id}" title="${rule.description || ''}">
            <td>${globalIdx + 1}</td>
            <td><span class="chain-badge ${chainClass}">${rule.chain}</span></td>
            <td>${rule.protocol.toUpperCase()}</td>
            <td>${rule.srcIp}</td>
            <td>${rule.dstIp}</td>
            <td>${rule.srcPort}</td>
            <td>${rule.dstPort}</td>
            <td><span class="action-badge ${actionClass}">${rule.action}</span></td>
            <td><span class="hits-counter">${rule.hits}</span></td>
            <td class="td-actions">
                <button onclick="moveRule(${rule.id}, 'up')" title="Move up">▲</button>
                <button onclick="moveRule(${rule.id}, 'down')" title="Move down">▼</button>
                <button onclick="deleteRule(${rule.id})" title="Delete rule">✕</button>
            </td>
        </tr>`;
    }).join('');
}

// ————— Update Stats —————
function updateStats() {
    dom.totalRulesCount.textContent = state.rules.length;
    dom.acceptedCount.textContent = state.counters.accepted;
    dom.droppedCount.textContent = state.counters.dropped;
    dom.rejectedCount.textContent = state.counters.rejected;
}

// ————— Packet Simulation —————
function simulatePacket(customPacket) {
    const packet = customPacket || {
        direction: dom.pktDirection.value,
        protocol: dom.pktProtocol.value,
        srcIp: dom.pktSrcIp.value.trim(),
        dstIp: dom.pktDstIp.value.trim(),
        srcPort: dom.pktSrcPort.value.trim(),
        dstPort: dom.pktDstPort.value.trim()
    };

    if (!packet.srcIp || !packet.dstIp) {
        showToast('Please enter source and destination IP', 'error');
        return null;
    }

    const chainRules = state.rules.filter(r => r.chain === packet.direction);
    const steps = [];
    let matchedRule = null;

    for (let i = 0; i < chainRules.length; i++) {
        const rule = chainRules[i];
        const matches = matchesRule(packet, rule);
        steps.push({
            ruleNum: state.rules.indexOf(rule) + 1,
            rule,
            matched: matches,
        });
        if (matches) {
            matchedRule = rule;
            rule.hits++;
            break;
        }
    }

    // Determine final action
    let finalAction;
    let matchedByDefault = false;
    if (matchedRule) {
        finalAction = matchedRule.action;
    } else {
        finalAction = state.defaultPolicies[packet.direction];
        matchedByDefault = true;
    }

    // Update counters
    if (finalAction === 'ACCEPT') state.counters.accepted++;
    else if (finalAction === 'DROP') state.counters.dropped++;
    else if (finalAction === 'REJECT') state.counters.rejected++;
    updateStats();

    // Render result (only for direct simulation, not batch)
    if (!customPacket) {
        renderSimResult(packet, steps, finalAction, matchedRule, matchedByDefault);
    }

    // Add to traffic log
    addLogEntry(packet, finalAction, matchedRule);

    // Highlight matched rule in table
    if (matchedRule) {
        const row = document.querySelector(`tr[data-rule-id="${matchedRule.id}"]`);
        if (row) {
            row.classList.add('highlight-match');
            setTimeout(() => row.classList.remove('highlight-match'), 1500);
        }
    }

    renderRulesTable();
    saveState();
    return finalAction;
}

function matchesRule(packet, rule) {
    // Protocol check
    if (rule.protocol !== 'all' && rule.protocol !== packet.protocol) return false;

    // Source IP check
    if (rule.srcIp !== '0.0.0.0/0' && !ipMatches(packet.srcIp, rule.srcIp)) return false;

    // Destination IP check
    if (rule.dstIp !== '0.0.0.0/0' && !ipMatches(packet.dstIp, rule.dstIp)) return false;

    // Source port check
    if (rule.srcPort !== 'any' && rule.srcPort !== packet.srcPort && packet.protocol !== 'icmp') return false;

    // Destination port check
    if (rule.dstPort !== 'any' && rule.dstPort !== packet.dstPort && packet.protocol !== 'icmp') return false;

    return true;
}

function ipMatches(packetIp, ruleIp) {
    if (ruleIp === '0.0.0.0/0') return true;

    // CIDR matching
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
    return ip.split('.').reduce((acc, octet) => (acc << 8) + parseInt(octet), 0) >>> 0;
}

function renderSimResult(packet, steps, finalAction, matchedRule, matchedByDefault) {
    dom.simEmpty.classList.add('hidden');
    dom.simResult.classList.remove('hidden');

    // Verdict
    const verdictConfig = {
        ACCEPT: { cls: 'accepted', icon: '✅', text: 'PACKET ACCEPTED', desc: 'Traffic is allowed through the firewall' },
        DROP: { cls: 'dropped', icon: '🚫', text: 'PACKET DROPPED', desc: 'Traffic is silently discarded' },
        REJECT: { cls: 'rejected', icon: '⛔', text: 'PACKET REJECTED', desc: 'Traffic is blocked with ICMP error response' },
        LOG: { cls: 'logged', icon: '📝', text: 'PACKET LOGGED', desc: 'Traffic is logged and continues processing' },
    };

    const vc = verdictConfig[finalAction] || verdictConfig.DROP;
    dom.simVerdict.className = `sim-verdict ${vc.cls}`;
    dom.simVerdict.innerHTML = `
        <span class="verdict-icon">${vc.icon}</span>
        <div class="verdict-text">
            <h3>${vc.text}</h3>
            <p>${matchedByDefault ? `Default ${packet.direction} policy applied` : `Matched Rule #${steps.find(s => s.matched)?.ruleNum || '?'}: ${matchedRule?.description || matchedRule?.action}`}</p>
        </div>
    `;

    // Chain walk
    let walkHtml = '';
    steps.forEach((step, i) => {
        const cls = step.matched ? 'matched' : 'skipped';
        const resultText = step.matched ? step.rule.action : 'No match';
        const delay = i * 100;
        walkHtml += `
        <div class="chain-step ${cls}" style="animation-delay: ${delay}ms">
            <span class="step-number">${step.ruleNum}</span>
            <span class="step-info">${step.rule.protocol.toUpperCase()} ${step.rule.srcIp}:${step.rule.srcPort} → ${step.rule.dstIp}:${step.rule.dstPort}</span>
            <span class="step-result" style="color: ${step.matched ? (step.rule.action === 'ACCEPT' ? 'var(--green)' : 'var(--red)') : 'var(--text-muted)'}">${resultText}</span>
        </div>`;
    });

    if (matchedByDefault) {
        walkHtml += `
        <div class="chain-step default-policy" style="animation-delay: ${steps.length * 100}ms">
            <span class="step-number">⊘</span>
            <span class="step-info">No rule matched — applying default ${packet.direction} policy</span>
            <span class="step-result" style="color: var(--yellow)">${finalAction}</span>
        </div>`;
    }

    dom.simChainWalk.innerHTML = walkHtml;
}

function addLogEntry(packet, action, matchedRule) {
    const now = new Date();
    const time = now.toLocaleTimeString('en-US', { hour12: false });

    const entry = {
        time,
        direction: packet.direction,
        detail: `${packet.protocol.toUpperCase()} ${packet.srcIp}:${packet.srcPort} → ${packet.dstIp}:${packet.dstPort}`,
        action,
        ruleId: matchedRule ? matchedRule.id : null
    };

    state.trafficLog.unshift(entry);
    if (state.trafficLog.length > 50) state.trafficLog.pop();

    renderLog();
}

function renderLog() {
    dom.logEntries.innerHTML = state.trafficLog.map(entry => {
        const dirColors = { INPUT: 'var(--cyan)', OUTPUT: '#a78bfa', FORWARD: 'var(--orange)' };
        return `
        <div class="log-entry">
            <span class="log-time">${entry.time}</span>
            <span class="log-direction" style="background: ${dirColors[entry.direction]}22; color: ${dirColors[entry.direction]}; border: 1px solid ${dirColors[entry.direction]}44">${entry.direction}</span>
            <span class="log-detail">${entry.detail}</span>
            <span class="log-result ${entry.action.toLowerCase()}">${entry.action}</span>
        </div>`;
    }).join('');
}

function clearLog() {
    state.trafficLog = [];
    state.counters = { accepted: 0, dropped: 0, rejected: 0 };
    dom.logEntries.innerHTML = '';
    dom.simEmpty.classList.remove('hidden');
    dom.simResult.classList.add('hidden');
    updateStats();
    // Reset rule hit counters
    state.rules.forEach(r => r.hits = 0);
    saveState();
    renderRulesTable();
    showToast('Traffic log and counters cleared', 'info');
}

function batchSimulate() {
    if (state.rules.length === 0) {
        showToast('Add some rules before running batch simulation', 'error');
        return;
    }

    const protocols = ['tcp', 'udp', 'icmp'];
    const directions = ['INPUT', 'OUTPUT', 'FORWARD'];
    const ips = ['192.168.1.100', '10.0.0.5', '172.16.0.50', '8.8.8.8', '203.0.113.10', '100.25.30.40', '192.168.0.1', '10.10.10.10'];
    const ports = ['22', '80', '443', '53', '3306', '8080', '27015', '25', '993', '3389'];

    const results = { ACCEPT: 0, DROP: 0, REJECT: 0, LOG: 0 };

    for (let i = 0; i < 10; i++) {
        const pkt = {
            direction: directions[Math.floor(Math.random() * directions.length)],
            protocol: protocols[Math.floor(Math.random() * protocols.length)],
            srcIp: ips[Math.floor(Math.random() * ips.length)],
            dstIp: ips[Math.floor(Math.random() * ips.length)],
            srcPort: ports[Math.floor(Math.random() * ports.length)],
            dstPort: ports[Math.floor(Math.random() * ports.length)]
        };
        const result = simulatePacket(pkt);
        if (result) results[result] = (results[result] || 0) + 1;
    }

    showToast(`Batch test: ${results.ACCEPT} accepted, ${results.DROP} dropped, ${results.REJECT} rejected`, 'info');
}

// ————— Chain Visualization —————
function drawChainVisualization() {
    const canvas = dom.chainCanvas;
    const container = document.getElementById('viz-container');
    if (!container || !canvas) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = container.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = 400 * dpr;
    canvas.style.width = rect.width + 'px';
    canvas.style.height = '400px';

    const ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, rect.width, 400);

    const selectedChain = dom.vizChainSelect.value;
    const chainRules = state.rules.filter(r => r.chain === selectedChain);
    const defaultPolicy = state.defaultPolicies[selectedChain];

    const w = rect.width;
    const h = 400;

    // Packet entry
    const startX = 50;
    const startY = h / 2;
    const nodeW = 160;
    const nodeH = 60;
    const gap = 40;

    const totalNodes = chainRules.length + 2; // entry + rules + default
    const totalWidth = totalNodes * (nodeW + gap);
    const offsetX = Math.max(startX, (w - totalWidth) / 2);

    // Draw connections
    ctx.strokeStyle = 'rgba(99, 102, 241, 0.2)';
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 4]);

    for (let i = 0; i < totalNodes - 1; i++) {
        const x1 = offsetX + i * (nodeW + gap) + nodeW;
        const x2 = offsetX + (i + 1) * (nodeW + gap);
        ctx.beginPath();
        ctx.moveTo(x1, startY);
        ctx.lineTo(x2, startY);
        ctx.stroke();
    }
    ctx.setLineDash([]);

    // Draw arrow at end of each connection
    for (let i = 0; i < totalNodes - 1; i++) {
        const x = offsetX + (i + 1) * (nodeW + gap) - 8;
        drawArrow(ctx, x, startY);
    }

    // Draw entry node (Packet In)
    drawNode(ctx, offsetX, startY - nodeH / 2, nodeW, nodeH,
        '📦 Packet', selectedChain, '#6366f1', 'rgba(99, 102, 241, 0.1)');

    // Draw rule nodes
    chainRules.forEach((rule, i) => {
        const x = offsetX + (i + 1) * (nodeW + gap);
        const colors = {
            ACCEPT: { border: '#22c55e', bg: 'rgba(34, 197, 94, 0.08)' },
            DROP: { border: '#ef4444', bg: 'rgba(239, 68, 68, 0.08)' },
            REJECT: { border: '#f59e0b', bg: 'rgba(245, 158, 11, 0.08)' },
            LOG: { border: '#6366f1', bg: 'rgba(99, 102, 241, 0.08)' },
        };
        const c = colors[rule.action] || colors.DROP;
        const label = `Rule #${state.rules.indexOf(rule) + 1}`;
        const sublabel = `${rule.protocol.toUpperCase()} → ${rule.action}`;
        drawNode(ctx, x, startY - nodeH / 2, nodeW, nodeH, label, sublabel, c.border, c.bg);

        // Draw hits badge
        if (rule.hits > 0) {
            ctx.fillStyle = '#6366f1';
            ctx.beginPath();
            ctx.arc(x + nodeW - 8, startY - nodeH / 2 + 8, 12, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#fff';
            ctx.font = '600 10px Inter';
            ctx.textAlign = 'center';
            ctx.fillText(rule.hits, x + nodeW - 8, startY - nodeH / 2 + 12);
        }
    });

    // Draw default policy node
    const defX = offsetX + (chainRules.length + 1) * (nodeW + gap);
    const defColor = defaultPolicy === 'ACCEPT' ? '#22c55e' : '#64748b';
    const defBg = defaultPolicy === 'ACCEPT' ? 'rgba(34, 197, 94, 0.08)' : 'rgba(100, 116, 139, 0.08)';
    drawNode(ctx, defX, startY - nodeH / 2, nodeW, nodeH, 'Default Policy', defaultPolicy, defColor, defBg);
}

function drawNode(ctx, x, y, w, h, title, subtitle, borderColor, bgColor) {
    // Background
    ctx.fillStyle = bgColor;
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = 2;

    const r = 8;
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Title
    ctx.fillStyle = '#e2e8f0';
    ctx.font = '600 12px Inter';
    ctx.textAlign = 'center';
    ctx.fillText(title, x + w / 2, y + h / 2 - 4);

    // Subtitle
    ctx.fillStyle = borderColor;
    ctx.font = '700 11px JetBrains Mono';
    ctx.fillText(subtitle, x + w / 2, y + h / 2 + 14);
}

function drawArrow(ctx, x, y) {
    ctx.fillStyle = 'rgba(99, 102, 241, 0.4)';
    ctx.beginPath();
    ctx.moveTo(x, y - 5);
    ctx.lineTo(x + 10, y);
    ctx.lineTo(x, y + 5);
    ctx.closePath();
    ctx.fill();
}

// ————— Optimizer —————
function runOptimizer() {
    if (state.rules.length === 0) {
        showToast('Add rules to analyze', 'error');
        return;
    }

    dom.optimizerEmpty.classList.add('hidden');
    dom.optimizerOutput.classList.remove('hidden');

    const issues = [];
    let score = 100;

    // 1. Check for shadowed rules
    for (let i = 0; i < state.rules.length; i++) {
        for (let j = i + 1; j < state.rules.length; j++) {
            if (isShadowed(state.rules[i], state.rules[j])) {
                issues.push({
                    type: 'critical',
                    title: 'Shadowed Rule Detected',
                    desc: `Rule #${j + 1} (<code>${state.rules[j].chain} ${state.rules[j].protocol} ${state.rules[j].srcIp} → ${state.rules[j].dstPort} ${state.rules[j].action}</code>) is completely shadowed by Rule #${i + 1} and will <strong>never be reached</strong>.`
                });
                score -= 15;
            }
        }
    }

    // 2. Check for redundant rules (same rule twice)
    for (let i = 0; i < state.rules.length; i++) {
        for (let j = i + 1; j < state.rules.length; j++) {
            if (isRedundant(state.rules[i], state.rules[j])) {
                issues.push({
                    type: 'warning',
                    title: 'Redundant Rule',
                    desc: `Rule #${j + 1} is a duplicate of Rule #${i + 1}. Consider removing the redundant rule to simplify your ruleset.`
                });
                score -= 8;
            }
        }
    }

    // 3. Check for conflicting rules
    for (let i = 0; i < state.rules.length; i++) {
        for (let j = i + 1; j < state.rules.length; j++) {
            if (isConflicting(state.rules[i], state.rules[j])) {
                issues.push({
                    type: 'warning',
                    title: 'Conflicting Rules',
                    desc: `Rule #${i + 1} (${state.rules[i].action}) and Rule #${j + 1} (${state.rules[j].action}) match the same traffic with <strong>different actions</strong>. Rule #${i + 1} takes precedence.`
                });
                score -= 10;
            }
        }
    }

    // 4. Check for overly broad rules early in chain
    state.rules.forEach((rule, i) => {
        if (i < state.rules.length - 1 && rule.srcIp === '0.0.0.0/0' && rule.dstIp === '0.0.0.0/0' &&
            rule.srcPort === 'any' && rule.dstPort === 'any' && rule.protocol === 'all') {
            const rulesAfter = state.rules.filter((r, j) => j > i && r.chain === rule.chain);
            if (rulesAfter.length > 0) {
                issues.push({
                    type: 'critical',
                    title: 'Overly Broad Rule',
                    desc: `Rule #${i + 1} matches <strong>all traffic</strong> in ${rule.chain} chain, making ${rulesAfter.length} subsequent rule(s) in this chain unreachable.`
                });
                score -= 20;
            }
        }
    });

    // 5. Check for no drop/reject at end
    ['INPUT', 'FORWARD'].forEach(chain => {
        const chainRules = state.rules.filter(r => r.chain === chain);
        if (chainRules.length > 0 && state.defaultPolicies[chain] === 'ACCEPT') {
            const hasDropAll = chainRules.some(r => r.action === 'DROP' && r.srcIp === '0.0.0.0/0' && r.protocol === 'all');
            if (!hasDropAll) {
                issues.push({
                    type: 'info',
                    title: 'Security Recommendation',
                    desc: `The ${chain} chain has a default ACCEPT policy without a "drop all" rule at the end. Consider setting the default policy to <code>DROP</code> for better security.`
                });
                score -= 5;
            }
        }
    });

    // 6. Check for unused rules (0 hits)
    const unusedRules = state.rules.filter(r => r.hits === 0);
    if (unusedRules.length > 0 && state.trafficLog.length > 5) {
        issues.push({
            type: 'info',
            title: 'Potentially Unused Rules',
            desc: `${unusedRules.length} rule(s) have 0 hits. They may be unnecessary or poorly ordered. Consider running more traffic simulations.`
        });
    }

    // 7. Ordering efficiency suggestion
    const highHitRules = state.rules.filter(r => r.hits > 3);
    highHitRules.forEach(rule => {
        const idx = state.rules.indexOf(rule);
        if (idx > 2) {
            issues.push({
                type: 'info',
                title: 'Optimization Opportunity',
                desc: `Rule #${idx + 1} has <strong>${rule.hits} hits</strong> but is positioned at #${idx + 1}. Moving frequently matched rules higher in the chain can improve performance.`
            });
            score -= 3;
        }
    });

    score = Math.max(0, Math.min(100, score));

    // Render
    let html = `
    <div class="opt-score">
        <span class="opt-score-number">${score}/100</span>
        <div>
            <div class="opt-score-label">Ruleset Efficiency Score</div>
            <div class="opt-score-desc">${score >= 80 ? 'Your ruleset is well-optimized' : score >= 50 ? 'Some improvements recommended' : 'Significant issues detected'}</div>
        </div>
    </div>`;

    if (issues.length === 0) {
        html += `
        <div class="opt-section">
            <div class="opt-section-header">
                <h3>✅ All Clear</h3>
                <span class="opt-badge success">No Issues</span>
            </div>
            <div class="opt-item">Your firewall ruleset is clean and optimized. No redundant, shadowed, or conflicting rules were detected.</div>
        </div>`;
    } else {
        const grouped = {
            critical: issues.filter(i => i.type === 'critical'),
            warning: issues.filter(i => i.type === 'warning'),
            info: issues.filter(i => i.type === 'info'),
        };

        if (grouped.critical.length) {
            html += `
            <div class="opt-section">
                <div class="opt-section-header">
                    <h3>🚨 Critical Issues</h3>
                    <span class="opt-badge critical">${grouped.critical.length}</span>
                </div>
                ${grouped.critical.map(i => `<div class="opt-item"><strong>${i.title}:</strong> ${i.desc}</div>`).join('')}
            </div>`;
        }

        if (grouped.warning.length) {
            html += `
            <div class="opt-section">
                <div class="opt-section-header">
                    <h3>⚠️ Warnings</h3>
                    <span class="opt-badge warning">${grouped.warning.length}</span>
                </div>
                ${grouped.warning.map(i => `<div class="opt-item"><strong>${i.title}:</strong> ${i.desc}</div>`).join('')}
            </div>`;
        }

        if (grouped.info.length) {
            html += `
            <div class="opt-section">
                <div class="opt-section-header">
                    <h3>💡 Suggestions</h3>
                    <span class="opt-badge info">${grouped.info.length}</span>
                </div>
                ${grouped.info.map(i => `<div class="opt-item"><strong>${i.title}:</strong> ${i.desc}</div>`).join('')}
            </div>`;
        }
    }

    dom.optimizerOutput.innerHTML = html;
    showToast(`Analysis complete: ${issues.length} issue(s) found`, issues.length > 0 ? 'warning' : 'success');
}

function isShadowed(ruleA, ruleB) {
    if (ruleA.chain !== ruleB.chain) return false;
    if (ruleA.protocol !== 'all' && ruleA.protocol !== ruleB.protocol) return false;
    if (ruleA.srcIp !== '0.0.0.0/0' && ruleA.srcIp !== ruleB.srcIp) return false;
    if (ruleA.dstIp !== '0.0.0.0/0' && ruleA.dstIp !== ruleB.dstIp) return false;
    if (ruleA.srcPort !== 'any' && ruleA.srcPort !== ruleB.srcPort) return false;
    if (ruleA.dstPort !== 'any' && ruleA.dstPort !== ruleB.dstPort) return false;
    return true;
}

function isRedundant(ruleA, ruleB) {
    return ruleA.chain === ruleB.chain &&
        ruleA.protocol === ruleB.protocol &&
        ruleA.srcIp === ruleB.srcIp &&
        ruleA.dstIp === ruleB.dstIp &&
        ruleA.srcPort === ruleB.srcPort &&
        ruleA.dstPort === ruleB.dstPort &&
        ruleA.action === ruleB.action;
}

function isConflicting(ruleA, ruleB) {
    if (ruleA.chain !== ruleB.chain) return false;
    if (ruleA.action === ruleB.action) return false;

    // Same matching criteria, different actions
    const sameProto = ruleA.protocol === ruleB.protocol || ruleA.protocol === 'all' || ruleB.protocol === 'all';
    const sameSrc = ruleA.srcIp === ruleB.srcIp || ruleA.srcIp === '0.0.0.0/0' || ruleB.srcIp === '0.0.0.0/0';
    const sameDst = ruleA.dstIp === ruleB.dstIp || ruleA.dstIp === '0.0.0.0/0' || ruleB.dstIp === '0.0.0.0/0';
    const sameSrcPort = ruleA.srcPort === ruleB.srcPort || ruleA.srcPort === 'any' || ruleB.srcPort === 'any';
    const sameDstPort = ruleA.dstPort === ruleB.dstPort || ruleA.dstPort === 'any' || ruleB.dstPort === 'any';

    return sameProto && sameSrc && sameDst && sameSrcPort && sameDstPort;
}

// ————— Generate IPTables Commands —————
function generateCommands() {
    let lines = [];
    lines.push('<span class="cmd-comment">#!/bin/bash</span>');
    lines.push('<span class="cmd-comment"># IPTables Firewall Rules — Generated by Simulator</span>');
    lines.push('<span class="cmd-comment"># Generated: ' + new Date().toLocaleString() + '</span>');
    lines.push('');
    lines.push('<span class="cmd-comment"># Flush existing rules</span>');
    lines.push('<span class="cmd-command">iptables</span> <span class="cmd-flag">-F</span>');
    lines.push('<span class="cmd-command">iptables</span> <span class="cmd-flag">-X</span>');
    lines.push('');
    lines.push('<span class="cmd-comment"># Set default policies</span>');

    Object.entries(state.defaultPolicies).forEach(([chain, policy]) => {
        const actionClass = policy === 'ACCEPT' ? 'cmd-action-accept' : 'cmd-action-drop';
        lines.push(`<span class="cmd-command">iptables</span> <span class="cmd-flag">-P</span> <span class="cmd-value">${chain}</span> <span class="${actionClass}">${policy}</span>`);
    });

    lines.push('');
    lines.push('<span class="cmd-comment"># Allow established and related connections</span>');
    lines.push('<span class="cmd-command">iptables</span> <span class="cmd-flag">-A INPUT -m state --state ESTABLISHED,RELATED</span> <span class="cmd-flag">-j</span> <span class="cmd-action-accept">ACCEPT</span>');
    lines.push('');
    lines.push('<span class="cmd-comment"># Allow loopback interface</span>');
    lines.push('<span class="cmd-command">iptables</span> <span class="cmd-flag">-A INPUT -i lo</span> <span class="cmd-flag">-j</span> <span class="cmd-action-accept">ACCEPT</span>');
    lines.push('<span class="cmd-command">iptables</span> <span class="cmd-flag">-A OUTPUT -o lo</span> <span class="cmd-flag">-j</span> <span class="cmd-action-accept">ACCEPT</span>');

    if (state.rules.length > 0) {
        lines.push('');
        lines.push('<span class="cmd-comment"># Custom firewall rules</span>');

        state.rules.forEach((rule, i) => {
            const actionClass = `cmd-action-${rule.action.toLowerCase()}`;
            let cmd = `<span class="cmd-command">iptables</span> <span class="cmd-flag">-A ${rule.chain}</span>`;

            if (rule.protocol !== 'all') {
                cmd += ` <span class="cmd-flag">-p</span> <span class="cmd-value">${rule.protocol}</span>`;
            }

            if (rule.srcIp !== '0.0.0.0/0') {
                cmd += ` <span class="cmd-flag">-s</span> <span class="cmd-value">${rule.srcIp}</span>`;
            }

            if (rule.dstIp !== '0.0.0.0/0') {
                cmd += ` <span class="cmd-flag">-d</span> <span class="cmd-value">${rule.dstIp}</span>`;
            }

            if (rule.srcPort !== 'any' && rule.protocol !== 'icmp') {
                cmd += ` <span class="cmd-flag">--sport</span> <span class="cmd-value">${rule.srcPort}</span>`;
            }

            if (rule.dstPort !== 'any' && rule.protocol !== 'icmp') {
                cmd += ` <span class="cmd-flag">--dport</span> <span class="cmd-value">${rule.dstPort}</span>`;
            }

            cmd += ` <span class="cmd-flag">-j</span> <span class="${actionClass}">${rule.action}</span>`;

            if (rule.description) {
                cmd += `  <span class="cmd-comment"># ${rule.description}</span>`;
            }

            lines.push(cmd);
        });
    }

    lines.push('');
    lines.push('<span class="cmd-comment"># Print final rules</span>');
    lines.push('<span class="cmd-command">iptables</span> <span class="cmd-flag">-L -v -n --line-numbers</span>');
    lines.push('');
    lines.push('<span class="cmd-comment"># Save rules (Debian/Ubuntu)</span>');
    lines.push('<span class="cmd-comment"># iptables-save > /etc/iptables/rules.v4</span>');

    dom.commandsCode.innerHTML = lines.join('\n');
}

function copyCommands() {
    const text = dom.commandsCode.innerText;
    navigator.clipboard.writeText(text).then(() => {
        showToast('Commands copied to clipboard', 'success');
    }).catch(() => {
        showToast('Failed to copy commands', 'error');
    });
}

// ————— Reset —————
function resetAll() {
    state.rules = [];
    state.trafficLog = [];
    state.counters = { accepted: 0, dropped: 0, rejected: 0 };
    state.nextId = 1;
    state.defaultPolicies = { INPUT: 'DROP', FORWARD: 'DROP', OUTPUT: 'ACCEPT' };
    state.activeFilter = 'all';
    state.activeTab = 'rules';
    saveState();

    // Reset policy selects
    document.querySelectorAll('.policy-select').forEach(sel => {
        sel.value = state.defaultPolicies[sel.dataset.chain];
    });

    renderRulesTable();
    updateStats();
    generateCommands();
    drawChainVisualization();
    clearForm();

    dom.logEntries.innerHTML = '';
    dom.simEmpty.classList.remove('hidden');
    dom.simResult.classList.add('hidden');
    dom.optimizerEmpty.classList.remove('hidden');
    dom.optimizerOutput.classList.add('hidden');

    showToast('All rules, logs, and counters reset', 'info');
}

// ————— Toast Notifications —————
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    const icons = { success: '✅', error: '❌', warning: '⚠️', info: 'ℹ️' };
    toast.innerHTML = `<span>${icons[type] || 'ℹ️'}</span> ${message}`;
    dom.toastContainer.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}
