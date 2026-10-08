/* Avia — Scripted AI Bot for $DLCT Documentary Letter of Credit Token */
(function () {
  'use strict';
  var state = { isOpen: false };
  function el(id) { return document.getElementById(id); }

  var KB = {
    'what': {
      title: 'What is $DLCT?',
      answer: [
        '**$DLCT (Tokenized Documentary Letter of Credit)** — the trade finance layer of AviaTrust on Solana.',
        '',
        'DLCT represents a **Documentary Letter of Credit** (DLC) on-chain — a bank instrument used in international trade.',
        '',
        '**What it does:**',
        '· Exporter ships goods → uploads documents on-chain',
        '· Importer verifies documents → releases payment',
        '· All conditions recorded immutably',
        '',
        '**Conditions (UCP 600):**',
        '· Bill of Lading',
        '· Insurance Certificate',
        '· Inspection Report',
        '',
        '📄 Contract: `AG6J7LmE5TaDyf1Nb41GC7VrCfsNaRbPjPvuocmk9Y65`',
        '⛓ Chain: Solana (Token-2022, 1% transfer fee)'
      ].join('\n')
    },
    'buy': {
      title: 'How to buy $DLCT?',
      answer: [
        '**Buy $DLCT on Solana:**',
        '',
        '**1. Jupiter**',
        '→ https://jup.ag/tokens/AG6J7LmE5TaDyf1Nb41GC7VrCfsNaRbPjPvuocmk9Y65',
        '',
        '**2. OpenSea**',
        '→ https://opensea.io/token/solana/AG6J7LmE5TaDyf1Nb41GC7VrCfsNaRbPjPvuocmk9Y65',
        '',
        '**3. Binance Web3**',
        '→ https://app.binance.com/uni-qr/web3-token-details?tokenCA=AG6J7LmE5TaDyf1Nb41GC7VrCfsNaRbPjPvuocmk9Y65',
        '',
        '💡 Recommend Jupiter for lowest slippage.'
      ].join('\n')
    },
    'contract': {
      title: 'Contract & Pool',
      answer: [
        '**$DLCT Contract (Solana)**',
        '',
        '`AG6J7LmE5TaDyf1Nb41GC7VrCfsNaRbPjPvuocmk9Y65`',
        '',
        '**Meteora Pool**',
        '`e3G6EKMa6JVCgXjASbtc5REM5JANEPnsmGCZtDNYV8g`',
        '',
        '**Verify on:**',
        '· GeckoTerminal: https://www.geckoterminal.com/solana/pools/e3G6EKMa6JVCgXjASbtc5REM5JANEPnsmGCZtDNYV8g',
        '· OpenSea: https://opensea.io/token/solana/AG6J7LmE5TaDyf1Nb41GC7VrCfsNaRbPjPvuocmk9Y65',
        '',
        '⚠️ Always verify contract before buying.'
      ].join('\n')
    },
    'price': {
      title: 'Price & Target',
      answer: [
        '**$DLCT Price**',
        '',
        '· Launch price: **$0.01**',
        '· Community target: **×100 → $1.00**',
        '',
        '**Live price:**',
        '· GeckoTerminal: https://www.geckoterminal.com/solana/pools/e3G6EKMa6JVCgXjASbtc5REM5JANEPnsmGCZtDNYV8g',
        '· Jupiter: https://jup.ag/tokens/AG6J7LmE5TaDyf1Nb41GC7VrCfsNaRbPjPvuocmk9Y65',
        '',
        '⚠️ The ×100 is a community-stated target, not a promise.'
      ].join('\n')
    },
    'dlc': {
      title: 'What is a DLC?',
      answer: [
        '**Documentary Letter of Credit (DLC)** — a bank instrument used in international trade.',
        '',
        '**How the traditional DLC works:**',
        '1. Importer\'s bank issues DLC',
        '2. Exporter ships goods',
        '3. Exporter submits documents to bank',
        '4. Bank verifies → releases payment',
        '',
        '**$DLCT tokenizes this flow:**',
        '· Documents stored on-chain',
        '· Conditions verified by oracle',
        '· Payment released via smart contract',
        '· UCP 600 compliant structure',
        '',
        '**Real-world equivalents:**',
        '· SWIFT MT 700 (bank messaging)',
        '· CIPS LC (China, since 2025)',
        '· CargoX (blockchain trade docs)',
        '',
        '⚠️ $DLCT is a digital representation, not a bank-issued guarantee.'
      ].join('\n')
    },
    'ecosystem': {
      title: 'What is AviaTrust?',
      answer: [
        '**AviaTrust — aviation tokenization ecosystem on Solana.**',
        '',
        '**Financial layer:**',
        '· **$ESCR** — Escrow (trust layer)',
        '· **$DLCT** — Tokenized DLC (you are here)',
        '· **$SBLCT** — Standby LC Token',
        '· **$BRKR** — Broker Commission Protection',
        '',
        '**Aircraft layer (10 tokens):**',
        '$B787 · €A350 · ¥C929 · €A220 · R$E195',
        '$737MAX10 · $FAXX · $F22 · C$CRJ900 · ₽IL96',
        '',
        'Built on Solana for speed and low fees.'
      ].join('\n')
    },
    'risk': {
      title: 'Is $DLCT risky?',
      answer: [
        '**Honest answer: YES.**',
        '',
        '**Known risks:**',
        '· Price volatility',
        '· Liquidity risk',
        '· Smart contract risk',
        '· Regulatory uncertainty',
        '',
        '**Important:** $DLCT is a **digital representation** of a trade finance instrument. It is **NOT a bank-issued guarantee**. Do not use $DLCT as a substitute for regulated trade finance.',
        '',
        '**What reduces risk:**',
        '· Mint Authority disabled',
        '· Freeze Authority disabled',
        '· Built on Solana SDKs',
        '',
        '⚠️ **Not financial advice.** Only invest what you can afford to lose.'
      ].join('\n')
    }
  };

  var SUGGESTIONS = [
    { key: 'what',      label: '📜 What is $DLCT?' },
    { key: 'buy',       label: '🛒 How to buy?' },
    { key: 'contract',  label: '🔗 Contract & Pool' },
    { key: 'price',     label: '💰 Price & Target' },
    { key: 'dlc',       label: '📋 What is a DLC?' },
    { key: 'ecosystem', label: '🌍 AviaTrust' },
    { key: 'risk',      label: '⚠️ Is it risky?' }
  ];

  function createUI() {
    var btn = document.createElement('button');
    btn.id = 'avia-btn';
    btn.className = 'avia-btn';
    btn.innerHTML = '<span class="avia-btn-icon">📜</span><span class="avia-btn-label">Avia</span>';
    document.body.appendChild(btn);

    var win = document.createElement('div');
    win.id = 'avia-window';
    win.className = 'avia-window';
    win.innerHTML = [
      '<div class="avia-header">',
      '  <div class="avia-header-left">',
      '    <img src="dlct_logo.png" alt="Avia" class="avia-avatar" onerror="this.style.display=\'none\'" />',
      '    <div>',
      '      <div class="avia-name">Avia</div>',
      '      <div class="avia-status">AI assistant · $DLCT</div>',
      '    </div>',
      '  </div>',
      '  <button class="avia-close" id="avia-close">×</button>',
      '</div>',
      '<div class="avia-messages" id="avia-messages"></div>',
      '<div class="avia-suggestions" id="avia-suggestions"></div>',
      '<div class="avia-external">',
      '  <a href="https://jup.ag/tokens/AG6J7LmE5TaDyf1Nb41GC7VrCfsNaRbPjPvuocmk9Y65" target="_blank">🔄 Jupiter</a>',
      '  <a href="https://t.me/aviatrust" target="_blank">📱 TG</a>',
      '  <a href="https://x.com/aviatrust" target="_blank">🐦 X</a>',
      '</div>',
      '<div class="avia-footer">Scripted assistant · Not financial advice</div>'
    ].join('');
    document.body.appendChild(win);

    el('avia-btn').addEventListener('click', toggle);
    el('avia-close').addEventListener('click', toggle);

    addMessage('agent', 'Hi! I am Avia — assistant for $DLCT Tokenized DLC. Pick a topic below.');
    renderSuggestions();
  }

  function renderSuggestions() {
    var box = el('avia-suggestions');
    if (!box) return;
    box.innerHTML = '';
    SUGGESTIONS.forEach(function (item) {
      var b = document.createElement('button');
      b.className = 'avia-suggestion';
      b.textContent = item.label;
      b.addEventListener('click', function () { showAnswer(item.key); });
      box.appendChild(b);
    });
  }

  function addMessage(role, text) {
    var box = el('avia-messages');
    if (!box) return;
    var msg = document.createElement('div');
    msg.className = 'avia-msg avia-msg-' + role;
    var bubble = document.createElement('div');
    bubble.className = 'avia-bubble';
    bubble.innerHTML = formatText(text);
    msg.appendChild(bubble);
    box.appendChild(msg);
    box.scrollTop = box.scrollHeight;
  }

  function formatText(text) {
    var safe = String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    safe = safe.replace(/`([^`]+)`/g, '<code>$1</code>');
    safe = safe.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    safe = safe.replace(/\n/g, '<br />');
    safe = safe.replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1" target="_blank" rel="noopener">$1</a>');
    return safe;
  }

  function showAnswer(key) {
    var item = KB[key];
    if (!item) { addMessage('agent', 'Sorry, no info on that.'); return; }
    addMessage('user', item.title);
    setTimeout(function () { addMessage('agent', item.answer); }, 250);
  }

  function toggle() {
    state.isOpen = !state.isOpen;
    var win = el('avia-window');
    var btn = el('avia-btn');
    if (state.isOpen) { win.classList.add('avia-open'); btn.classList.add('avia-btn-hidden'); }
    else { win.classList.remove('avia-open'); btn.classList.remove('avia-btn-hidden'); }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', createUI);
  else createUI();
})();
