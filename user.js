// ==UserScript==
// @name         Planalto Reader Pro
// @namespace    http://tampermonkey.net/
// @version      16.0
// @description  Dark mode inquebrável + highlights + glosas + pontinhos ressuscitados (Alinhamento Vade Mecum)
// @author       Maurício Corrêa de Moura Rezende
// @license      All Rights Reserved
// @match        https://www.planalto.gov.br/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  document.documentElement.lang = 'pt-BR';

  // --- INJEÇÃO DO CABEÇALHO DO AUTOR ---
  function injectAuthorHeader() {
    if (document.getElementById('plr-author-header')) return;

const headerHTML = `
      <div id="plr-author-header" style="text-align: center; padding: 10px; background: #1e1e1e; border-bottom: 1px solid #c8a84b; margin: 15px auto 25px auto; border-radius: 6px; font-family: 'Segoe UI', sans-serif; max-width: 860px; box-shadow: 0 2px 8px rgba(0,0,0,0.4); opacity: 0.85; transition: opacity 0.2s;">

        <span style="color: #bbb; font-size: 0.75rem; font-weight: 600; display: block; margin-bottom: 4px;">
          Planalto Reader Pro • Desenvolvido por Maurício C. M. Rezende (+ Gemini e Claude)
        </span>

        <span style="color: #888; font-size: 0.65rem; display: block; margin-bottom: 10px; line-height: 1.4;">
          Gratuito para todos os concurseiros que, como eu, têm problemas com a "lei seca".<br>
          Atualizações e outros materiais nos meus perfis:
        </span>

        <div style="display: flex; justify-content: center; gap: 20px; align-items: center;">
          <a href="https://instagram.com/mau_concurseiro" target="_blank" style="color: #e05a9e; text-decoration: none; font-size: 0.7rem; font-weight: 600; display: flex; align-items: center; gap: 5px; transition: filter 0.2s;">
            <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
            </svg>
            @mau_concurseiro
          </a>

          <a href="https://twitter.com/mau_concurseiro" target="_blank" style="color: #5a8fff; text-decoration: none; font-size: 0.7rem; font-weight: 600; display: flex; align-items: center; gap: 5px; transition: filter 0.2s;">
            <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
            </svg>
            @mau_concurseiro
          </a>
        </div>
      </div>
    `;
    if (document.body) {
        document.body.insertAdjacentHTML('afterbegin', headerHTML);
    } else {
        document.addEventListener('DOMContentLoaded', () => {
            document.body.insertAdjacentHTML('afterbegin', headerHTML);
        });
    }
  }

  injectAuthorHeader();

  const css = `
    :root {
        --bg-color: #212121;
        --text-color: #d4d4d4;
        --hl-yellow: rgba(255, 220, 0, 0.25);
        --hl-green: rgba(100, 200, 120, 0.25);
        --hl-blue: rgba(100, 160, 255, 0.25);
        --hl-pink: rgba(255, 120, 180, 0.25);
        --hl-orange: rgba(255, 160, 50, 0.25);
    }

    /* --- 1. RESET NUCLEAR DO DARK MODE --- */
    html { background-color: var(--bg-color) !important; }

    body {
        background-color: var(--bg-color) !important;
        color: var(--text-color) !important;
        background-image: none !important;
        margin: 0 auto !important;
        max-width: 860px !important;
        padding: 2rem 2rem 5rem 3rem !important;
    }

    /* Transparência forçada em todas as tags para o fundo escuro brilhar */
    table, tbody, thead, tfoot, tr, td, th, div, p, span, font, center, blockquote, b, i, u, s, strike, sup, sub, ul, ol, li, h1, h2, h3, h4, h5, h6 {
        background-color: transparent !important;
        background: transparent !important;
        color: var(--text-color) !important;
        font-family: "Segoe UI", sans-serif !important;
    }

    /* ANTI-SOBREPOSIÇÃO: Mata os defeitos de conversores PDF do Planalto */
    span[style*="absolute"], font[style*="absolute"], div[style*="absolute"] {
        position: static !important;
        transform: none !important;
        left: auto !important;
        top: auto !important;
        right: auto !important;
        bottom: auto !important;
        height: auto !important;
        white-space: normal !important;
    }

    /* --- 2. FONT SIZE GLOBAL --- */
    body p, body div, body td, body th, body font, body b, body i, body u, body li, body blockquote,
    body p *, body div *, body td *, body th *, body li *, body blockquote * {
        font-size: 1.05rem !important;
        line-height: 1.8 !important;
    }

    /* Protege Títulos */
    body h1, body h2, body h3, body h4, body h5, body h6,
    body h1 *, body h2 *, body h3 *, body h4 *, body h5 *, body h6 * {
        font-size: 1.25rem !important;
        line-height: 1.5 !important;
        font-weight: bold !important;
        color: #eaeaea !important;
    }

    /* Protege letras pequenas e sobrescritas */
    sup, sub, small, sup *, sub *, small * {
        font-size: 0.75rem !important;
        line-height: 0 !important;
    }

    /* Textos revogados visíveis */
    strike, strike *, s, s *, del, del * {
      text-decoration: line-through !important;
      opacity: 0.55 !important;
    }

    /* --- 3. LIXOS VISUAIS E MARTELINHOS --- */
    a[href*="enfam.jus.br"], a[href*="jurisprudencia.stf.jus.br"], img[src*="martelo"], img[src*="enfam"] {
        display: none !important; width: 0 !important; height: 0 !important; opacity: 0 !important; pointer-events: none !important;
    }

    /* --- 4. LINKS DISCRETOS --- */
    body a:not(.pl-tbtn) {
        color: rgba(212, 212, 212, 0.45) !important;
        text-decoration: none !important;
        border-bottom: 1px dotted rgba(255, 255, 255, 0.25) !important;
        transition: all 0.15s ease !important;
    }
    body a:not(.pl-tbtn):hover {
        color: rgba(255, 255, 255, 0.85) !important;
        border-bottom: 1px solid rgba(255, 255, 255, 0.7) !important;
    }

    /* --- 5. ALINHAMENTO (Vade Mecum Style) --- */
    p, div[align="justify"], td, blockquote, li {
      max-width: 100% !important;
      text-align: justify !important;
      hyphens: auto !important; -webkit-hyphens: auto !important;
    }

    div[align="center"], p[align="center"], center, h1, h2, h3, h4, th {
      text-align: center !important; font-weight: bold !important;
      text-indent: 0 !important;
    }

    table { width: 100% !important; max-width: 100% !important; margin: 1rem 0 !important; border: none !important; }

    body p, body div[align="justify"] { text-indent: 2rem !important; margin: 0 0 1.2rem 0 !important; }

    /* --- 6. ESTRUTURA JURÍDICA --- */
    body p.pl-artigo, body div.pl-artigo, .pl-artigo    { display: block !important; position: relative !important; text-indent: 0 !important; border-left: 3px solid #c8a84b !important; background-color: rgba(200,168,75,0.07) !important; padding: 0.5rem 0.5rem 0.5rem 0.9rem !important; border-radius: 0 4px 4px 0 !important; margin: 2rem 0 1rem 0 !important; }
    body p.pl-paragrafo, body div.pl-paragrafo, .pl-paragrafo { display: block !important; position: relative !important; text-indent: 0 !important; border-left: 3px solid #6b9ab8 !important; background-color: rgba(107,154,184,0.05) !important; padding: 0.4rem 0.4rem 0.4rem 0.8rem !important; border-radius: 0 4px 4px 0 !important; margin: 0.8rem 0 !important; }
    body p.pl-inciso, body div.pl-inciso, .pl-inciso    { display: block !important; position: relative !important; text-indent: 0 !important; border-left: 2px solid #7a9e7e !important; padding-left: 0.8rem !important; margin: 0.8rem 0 0.8rem 1.5rem !important; }
    body p.pl-alinea, body div.pl-alinea, .pl-alinea    { display: block !important; position: relative !important; text-indent: 0 !important; border-left: 2px solid #8a7a9e !important; padding-left: 0.8rem !important; margin: 0.8rem 0 0.8rem 3rem !important; opacity: 0.9 !important; }
    body p.pl-item-num, body div.pl-item-num, .pl-item-num  { display: block !important; position: relative !important; text-indent: 0 !important; border-left: 2px solid #d28e5d !important; padding-left: 0.8rem !important; margin: 0.8rem 0 0.8rem 3rem !important; opacity: 0.9 !important; }

    .pl-token-artigo    { color: #c8a84b !important; font-weight: 700 !important; }
    .pl-token-paragrafo { color: #6b9ab8 !important; font-weight: 700 !important; }
    .pl-token-inciso    { color: #7a9e7e !important; font-weight: 700 !important; }
    .pl-token-alinea    { color: #a898c8 !important; font-weight: 700 !important; }
    .pl-token-item-num  { color: #d28e5d !important; font-weight: 700 !important; }

    /* --- 7. HIGHLIGHTS --- */
    mark.pl-hl { border-radius: 2px; padding: 0 1px; cursor: pointer; color: inherit !important; font-weight: inherit !important; }
    mark.pl-hl-yellow { background-color: var(--hl-yellow) !important; }
    mark.pl-hl-green  { background-color: var(--hl-green) !important; }
    mark.pl-hl-blue   { background-color: var(--hl-blue) !important; }
    mark.pl-hl-pink   { background-color: var(--hl-pink) !important; }
    mark.pl-hl-orange { background-color: var(--hl-orange) !important; }
    mark.pl-hl[data-gloss]::after { content: '↗'; font-size: 0.6em; vertical-align: super; opacity: 0.6; margin-left: 1px; font-weight: bold; color: #fff; }

    /* --- 8. TOOLBAR E GLOSA --- */
    #pl-tb { position: fixed !important; z-index: 999999 !important; background: #252525 !important; border: 1px solid #404040 !important; border-radius: 8px !important; padding: 6px 9px !important; display: none; gap: 6px !important; align-items: center !important; box-shadow: 0 4px 16px rgba(0,0,0,0.7) !important; user-select: none !important; }
    #pl-tb.on { display: flex !important; }
    #pl-tb * { font-family: "Segoe UI", sans-serif !important; }
    .pl-cb { width: 16px !important; height: 16px !important; border-radius: 50% !important; border: 2px solid transparent !important; cursor: pointer !important; transition: border-color .12s, transform .12s !important; flex-shrink: 0 !important; }
    .pl-cb:hover, .pl-cb.active { border-color: #fff !important; transform: scale(1.2) !important; }
    .pl-cb.yellow { background-color: #e6c200 !important; } .pl-cb.green { background-color: #55b86e !important; } .pl-cb.blue { background-color: #5a8fff !important; } .pl-cb.pink { background-color: #e05a9e !important; } .pl-cb.orange { background-color: #e08030 !important; }
    .pl-sep { width: 1px !important; height: 12px !important; background-color: #444 !important; }
    .pl-tbtn { background-color: transparent !important; border: 1px solid #4a4a4a !important; color: #999 !important; border-radius: 4px !important; padding: 1px 7px !important; font-size: 0.75rem !important; cursor: pointer !important; opacity: 1 !important; transition: all .12s !important; }
    .pl-tbtn:hover { border-color: #888 !important; color: #ddd !important; }
    .pl-tbtn.del:hover { border-color: #c05050 !important; color: #f08080 !important; }

    #pl-gi { position: fixed !important; z-index: 999998 !important; background-color: #1e1e1e !important; border: 1px solid #383838 !important; border-left: 2px solid #556677 !important; border-radius: 6px !important; padding: 7px 8px !important; display: none; flex-direction: column !important; gap: 6px !important; width: 180px !important; box-shadow: 0 4px 14px rgba(0,0,0,0.6) !important; }
    #pl-gi.on { display: flex !important; }
    #pl-gi-ta { background-color: #161616 !important; border: 1px solid #303030 !important; border-radius: 3px !important; color: #c8c8c8 !important; font-family: "Segoe UI", sans-serif !important; font-size: 0.8rem !important; padding: 5px 6px !important; resize: none !important; min-height: 56px !important; line-height: 1.5 !important; outline: none !important; }
    #pl-gi-row { display: flex !important; gap: 5px !important; }
    #pl-gi-save, #pl-gi-cancel { flex: 1 !important; border: none !important; border-radius: 3px !important; font-size: 0.72rem !important; padding: 4px !important; cursor: pointer !important; font-family: "Segoe UI", sans-serif !important; }
    #pl-gi-save { background-color: #1e3320 !important; color: #7ec87e !important; } #pl-gi-save:hover { background-color: #253e28 !important; }
    #pl-gi-cancel { background-color: #282828 !important; color: #777 !important; } #pl-gi-cancel:hover { background-color: #313131 !important; }

    .pl-gloss-bub { position: fixed !important; width: 160px !important; background-color: #1a1a1a !important; border-left: 2px solid #445566 !important; border-radius: 0 4px 4px 0 !important; padding: 6px 9px !important; font-size: 0.75rem !important; line-height: 1.45 !important; color: #7a8fa0 !important; z-index: 8000 !important; pointer-events: none !important; box-shadow: 2px 2px 8px rgba(0,0,0,0.3) !important; }
    .pl-gloss-line { position: fixed !important; height: 1px !important; background-color: #334455 !important; z-index: 7999 !important; pointer-events: none !important; }

    /* --- 9. PONTINHOS SUPER VISÍVEIS --- */
    .pl-dots {
        position: absolute !important; left: -44px !important; top: 12px !important;
        width: 32px !important; height: 32px !important;
        cursor: pointer !important; user-select: none !important;
        opacity: 0.4 !important;
        transition: all .2s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
        filter: grayscale(100%) !important;
        z-index: 50 !important;
    }
    .pl-dots:hover {
        opacity: 1 !important;
        transform: scale(1.3) !important;
        filter: grayscale(0%) drop-shadow(0 0 6px rgba(255, 255, 255, 0.6)) !important;
        z-index: 100 !important;
    }
    .pl-dots[data-n]:not([data-n="0"]) { opacity: 0.95 !important; filter: grayscale(0%) !important; }
    .pl-dots svg { display: block !important; width: 100% !important; height: 100% !important; }

    /* --- 10. ÓRFÃOS (LOST & FOUND) --- */
    #pl-orphan-btn { position: fixed !important; bottom: 20px !important; right: 20px !important; background-color: #8f3434 !important; color: #fff !important; padding: 8px 16px !important; border-radius: 20px !important; cursor: pointer !important; z-index: 99999 !important; font-size: 0.85rem !important; font-weight: bold !important; box-shadow: 0 4px 10px rgba(0,0,0,0.6) !important; display: none; border: 1px solid #a34 !important; transition: transform 0.2s !important; }
    #pl-orphan-btn:hover { transform: scale(1.05) !important; }
    #pl-orphan-panel { position: fixed !important; bottom: 70px !important; right: 20px !important; width: 340px !important; max-height: 450px !important; overflow-y: auto !important; background-color: #1a1a1a !important; border: 1px solid #444 !important; border-radius: 8px !important; padding: 15px !important; z-index: 99999 !important; display: none; box-shadow: 0 6px 20px rgba(0,0,0,0.8) !important; }
    #pl-orphan-panel.on { display: block !important; }
    #pl-orphan-panel h3 { margin: 0 0 12px 0 !important; font-size: 0.9rem !important; color: #d06060 !important; text-align: left !important; border-bottom: 1px solid #333 !important; padding-bottom: 8px !important; }
    .pl-orphan-item { background-color: #252525 !important; border-left: 4px solid !important; padding: 10px !important; margin-bottom: 10px !important; border-radius: 4px !important; }
    .pl-orphan-text { color: #aaa !important; font-size: 0.8rem !important; line-height: 1.5 !important; margin-bottom: 6px !important; font-style: italic !important; }
    .pl-orphan-del { background-color: #333 !important; color: #aaa !important; border: 1px solid #444 !important; padding: 4px 10px !important; border-radius: 4px !important; cursor: pointer !important; font-size: 0.75rem !important; width: 100% !important; transition: 0.2s !important; }
  `;

  const sEl = document.createElement('style');
  sEl.textContent = css;
  document.documentElement.appendChild(sEl);

  // ═══ ESTADO ═══
  const STORE_KEY = 'plr_' + location.pathname;
  const DOT_KEY   = 'plr_dots_' + location.pathname;
  let hlData  = JSON.parse(localStorage.getItem(STORE_KEY) || '[]');
  let dotData = JSON.parse(localStorage.getItem(DOT_KEY)   || '{}');
  let pendingRange = null;
  let activeMarkId = null;
  let orphansList = [];

  function persist()     { localStorage.setItem(STORE_KEY, JSON.stringify(hlData)); }
  function persistDots() { localStorage.setItem(DOT_KEY,   JSON.stringify(dotData)); }
  function uid()         { return Date.now().toString(36) + Math.random().toString(36).slice(2, 6); }
  function getRightEdge(){ return window.innerWidth / 2 + 400 + 22; }

  // ═══ COMPONENTES UI ═══
  const tb = document.createElement('div'); tb.id = 'pl-tb';
  ['yellow','green','blue','pink','orange'].forEach(c => {
    const b = document.createElement('div'); b.className = `pl-cb ${c}`;
    b.addEventListener('mousedown', e => { e.preventDefault(); onColorClick(c); }); tb.appendChild(b);
  });
  const sep1 = document.createElement('div'); sep1.className = 'pl-sep'; tb.appendChild(sep1);
  const glossBtn = document.createElement('button'); glossBtn.className = 'pl-tbtn'; glossBtn.textContent = '✎ glosa';
  glossBtn.addEventListener('mousedown', e => { e.preventDefault(); onGlossClick(); }); tb.appendChild(glossBtn);
  const sep2 = document.createElement('div'); sep2.className = 'pl-sep'; tb.appendChild(sep2);
  const delBtn = document.createElement('button'); delBtn.className = 'pl-tbtn del'; delBtn.textContent = '✕'; delBtn.style.display = 'none';
  delBtn.addEventListener('mousedown', e => { e.preventDefault(); onDeleteClick(); }); tb.appendChild(delBtn);

  const gi = document.createElement('div'); gi.id = 'pl-gi';
  const giTa = document.createElement('textarea'); giTa.id = 'pl-gi-ta'; giTa.placeholder = 'Anotação... (Ctrl+Enter)';
  const giRow = document.createElement('div'); giRow.id = 'pl-gi-row';
  const giSave = document.createElement('button'); giSave.id = 'pl-gi-save'; giSave.textContent = '✓';
  const giCancel = document.createElement('button'); giCancel.id = 'pl-gi-cancel'; giCancel.textContent = '✕';
  giRow.appendChild(giSave); giRow.appendChild(giCancel); gi.appendChild(giTa); gi.appendChild(giRow);

  const orphanBtn = document.createElement('div'); orphanBtn.id = 'pl-orphan-btn';
  const orphanPanel = document.createElement('div'); orphanPanel.id = 'pl-orphan-panel';
  orphanBtn.addEventListener('click', () => orphanPanel.classList.toggle('on'));

  // ═══ DOM READY ═══
  document.addEventListener('DOMContentLoaded', () => {
    document.body.appendChild(tb); document.body.appendChild(gi);
    document.body.appendChild(orphanBtn); document.body.appendChild(orphanPanel);

    fixOrdinalsAndHyphens();
    classifyParagraphs();
    addDots();
    restoreHighlights();
    renderGlosses();

    window.addEventListener('scroll', renderGlosses, { passive: true });
    window.addEventListener('resize', renderGlosses, { passive: true });
    document.addEventListener('mouseup', onSelectionChange);
    document.addEventListener('keyup', e => { if (e.key === 'Escape') closeAll(); });
    document.addEventListener('mousedown', e => {
      if (!tb.contains(e.target) && !gi.contains(e.target) && !e.target.closest('mark.pl-hl')) closeAll();
    });
    document.addEventListener('click', e => {
      const mark = e.target.closest('mark.pl-hl');
      if (mark) onMarkClick(mark);
    });
    giSave.addEventListener('click', saveGloss);
    giCancel.addEventListener('click', () => gi.classList.remove('on'));
    giTa.addEventListener('keydown', e => { if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) saveGloss(); });
  });

  // ═══ TRATAMENTO BLINDADO DE TEXTOS ESCONDIDOS ═══
  function fixOrdinalsAndHyphens() {
    try {
        document.querySelectorAll('sup, u, s, strike').forEach(el => {
            const txt = el.textContent.trim().toLowerCase();
            if (txt === 'o' || txt === 'º' || txt === '°' || txt === 'a' || txt === 'ª') {
                const isFem = (txt === 'a' || txt === 'ª');
                const textNode = document.createTextNode(isFem ? '\u00AA' : '\u00BA');
                if (el.parentNode) el.parentNode.replaceChild(textNode, el);
            }
        });
    } catch(e) {}

    try {
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
        const textNodes = [];
        let node;
        while ((node = walker.nextNode())) {
            if (/\d[oO°]/.test(node.nodeValue)) textNodes.push(node);
        }
        textNodes.forEach(n => {
            n.nodeValue = n.nodeValue.replace(/(\d)[oO°]([\s\u00A0\u00AD\u200B-\u200F\uFEFF,;.\-–(]|$)/g, '$1\u00BA$2');
        });
    } catch(e) {}
  }

  // ═══ CLASSIFICAR PARÁGRAFOS E TOKENS ═══
  const reArtigo  = /^[^a-zA-Z0-9§]{0,15}(?:Art[\.\s]*|Artigo)\s*(?:n[º°oO]?\s*\.?)?\s*(\d+)/i;
  const reParaUni = /^[^a-zA-Z0-9§]{0,15}(?:Par[áa]grafo\s+[uú]nico)/i;
  const reParaNum = /^[^a-zA-Z0-9§]{0,15}(?:§|Par[áa]grafo)\s*(\d+)/i;
  const reInciso  = /^[^a-zA-Z0-9§]{0,15}([IVXLCDM]+)\s*[-–—‑‒\.]/i;
  const reAlinea  = /^[^a-zA-Z0-9§]{0,15}([a-z])\)\s+/i;
  const reItemNum = /^[^a-zA-Z0-9§]{0,15}(\d+)\.\s+/i;

  function applyPattern(el, cleanStr, regex, blockClass, tokenClass) {
    const m = cleanStr.match(regex);
    if (!m) return false;

    // 1. Aplica as classes estruturais de margem e borda
    el.classList.add(blockClass);
    el.style.setProperty('position', 'relative', 'important');

    // 2. Salva o número do artigo para os pontinhos
    if (blockClass === 'pl-artigo') {
       el.dataset.artNum = m[1] || m[0].replace(/[^\d]/g, '');
    }

    // 3. Pinta a palavrinha inicial com método blindado
    try {
        if (!el.querySelector('p, div, table, blockquote, ul, ol')) {
             const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null, false);
             let firstTextNode = null;

             while(walker.nextNode()) {
                 if (walker.currentNode.nodeValue.trim().length > 0) {
                     firstTextNode = walker.currentNode;
                     break;
                 }
             }

             if (firstTextNode) {
                 const nodeTxt = firstTextNode.nodeValue;

                 // Captura o token exato ignorando a sujeira inicial (abraça números e ordinais)
                 const tokenRegex = /^[^a-zA-Z0-9§]{0,15}((?:Art(?:igo)?|§|Par[áa]grafo)[\.\s]*(?:n[º°oO]?\s*\.?)?\s*(?:[uú]nico|\d+(?:[º°ª])?(?:-[A-Z])?)?|[IVXLCDM]+\s*[-–—‑‒\.]|[a-z]\)\s*|\d+\.\s+)/i;
                 const localMatch = nodeTxt.match(tokenRegex);

                 if (localMatch) {
                     const targetText = localMatch[1]; // Ex: "Art.", "Art. 1º", "Parágrafo único", "I -"
                     const startIdx = nodeTxt.indexOf(targetText);

                     if (startIdx !== -1) {
                         const endIdx = startIdx + targetText.length;
                         const beforeTxt = nodeTxt.substring(0, startIdx);
                         const remainingTxt = nodeTxt.substring(endIdx);

                         const span = document.createElement('span');
                         span.className = tokenClass;
                         span.textContent = targetText;

                         const parent = firstTextNode.parentNode;
                         if (beforeTxt.length > 0) {
                             parent.insertBefore(document.createTextNode(beforeTxt), firstTextNode);
                         }
                         parent.insertBefore(span, firstTextNode);
                         parent.insertBefore(document.createTextNode(remainingTxt), firstTextNode);
                         parent.removeChild(firstTextNode);
                     }
                 }
             }
        }
    } catch (e) { }

    return true;
  }

  function classifyParagraphs() {
    document.querySelectorAll('p, div, td, li, blockquote, dd, dt').forEach(el => {
      if (el.closest('#pl-tb, #pl-gi, #pl-orphan-panel')) return;

      const rawText = el.textContent || "";

      // Limpeza segura: remove apenas controles invisíveis e normaliza espaços (sem mutilar letras)
      const cleanStr = rawText.replace(/[\x00-\x1F\x7F-\x9F\u200B-\u200F\uFEFF\u00AD]/g, '').replace(/[\s\u00A0]+/g, ' ').trim();

      if (cleanStr.length < 2) return;

      // Inteligência de blocos: Só ignora um contêiner se os filhos blocos dele possuírem texto relevante
      const blockChildren = [...el.children].filter(c => ['P','DIV','TABLE','UL','OL','BLOCKQUOTE'].includes(c.tagName));
      if (blockChildren.length > 0) {
          const childrenHaveText = blockChildren.some(c => c.textContent.trim().length > 5);
          if (childrenHaveText) return; // Deixa o filho bloco assumir a estilização
      }

      if (applyPattern(el, cleanStr, reArtigo,  'pl-artigo',    'pl-token-artigo')) return;
      if (applyPattern(el, cleanStr, reParaUni, 'pl-paragrafo', 'pl-token-paragrafo')) return;
      if (applyPattern(el, cleanStr, reParaNum, 'pl-paragrafo', 'pl-token-paragrafo')) return;
      if (applyPattern(el, cleanStr, reInciso,  'pl-inciso',    'pl-token-inciso')) return;
      if (applyPattern(el, cleanStr, reAlinea,  'pl-alinea',    'pl-token-alinea')) return;
      if (applyPattern(el, cleanStr, reItemNum, 'pl-item-num',  'pl-token-item-num')) return;
    });
  }

  // ═══ SELEÇÃO E HIGHLIGHTS ═══
  function onSelectionChange() {
    setTimeout(() => {
      const sel = window.getSelection();
      if (!sel || sel.isCollapsed || !sel.toString().trim()) return;
      pendingRange = sel.getRangeAt(0).cloneRange();
      activeMarkId = null; delBtn.style.display = 'none';
      tb.querySelectorAll('.pl-cb').forEach(b => b.classList.remove('active'));

      const rect = pendingRange.getBoundingClientRect();
      tb.classList.add('on');
      tb.style.top  = Math.max(4, rect.top - 42) + 'px';
      tb.style.left = Math.max(4, rect.left + rect.width / 2 - 110) + 'px';
    }, 20);
  }

  function closeAll() { tb.classList.remove('on'); gi.classList.remove('on'); pendingRange = null; activeMarkId = null; }

  function applyNewHighlight(color) {
    if (!pendingRange) return null;
    const text = pendingRange.toString().trim();
    if (!text) return null;
    const id = uid();

    let before = "";
    try {
        const block = pendingRange.commonAncestorContainer.nodeType === 3 ? pendingRange.commonAncestorContainer.parentNode.closest('p, div, td') : pendingRange.commonAncestorContainer.closest('p, div, td');
        if (block) {
            const blockText = block.textContent;
            const idx = blockText.indexOf(text);
            if (idx !== -1) before = blockText.slice(Math.max(0, idx - 25), idx);
        }
    } catch(e) {}

    try {
      const mark = document.createElement('mark');
      mark.className = `pl-hl pl-hl-${color}`; mark.dataset.id = id;

      const frag = pendingRange.extractContents();
      mark.appendChild(frag);
      pendingRange.insertNode(mark);

      hlData.push({ id, color, text, before, gloss: null });
      persist(); window.getSelection()?.removeAllRanges();
      return { id, mark };
    } catch {
      alert('Erro ao grifar. Tente selecionar o texto com mais precisão e sem cruzar parágrafos.');
      return null;
    }
  }

  function onColorClick(color) {
    if (activeMarkId) {
      const mark = document.querySelector(`mark[data-id="${activeMarkId}"]`);
      if (mark) {
        ['yellow','green','blue','pink','orange'].forEach(c => mark.classList.remove(`pl-hl-${c}`));
        mark.classList.add(`pl-hl-${color}`);
        const hl = hlData.find(h => h.id === activeMarkId);
        if (hl) { hl.color = color; persist(); }
      }
      closeAll(); return;
    }
    applyNewHighlight(color); closeAll();
  }

  function onDeleteClick() {
    if (!activeMarkId) return;
    const mark = document.querySelector(`mark[data-id="${activeMarkId}"]`);
    if (mark) {
        const frag = document.createDocumentFragment();
        while(mark.firstChild) frag.appendChild(mark.firstChild);
        mark.replaceWith(frag);
    }
    hlData = hlData.filter(h => h.id !== activeMarkId);
    persist(); renderGlosses(); closeAll();
  }

  function onMarkClick(mark) {
    window.getSelection()?.removeAllRanges();
    activeMarkId = mark.dataset.id; pendingRange = null;
    const hl = hlData.find(h => h.id === activeMarkId);
    tb.querySelectorAll('.pl-cb').forEach(b => b.classList.toggle('active', hl ? b.classList.contains(hl.color) : false));
    delBtn.style.display = 'inline-block';
    const rect = mark.getBoundingClientRect();
    tb.classList.add('on');
    tb.style.top  = Math.max(4, rect.top - 42) + 'px'; tb.style.left = Math.max(4, rect.left + rect.width / 2 - 110) + 'px';
  }

  // ═══ GLOSAS ═══
  function onGlossClick() {
    let markId = activeMarkId;
    if (!markId && pendingRange) {
      const result = applyNewHighlight('yellow');
      if (!result) return;
      markId = result.id; tb.classList.remove('on');
    }
    if (!markId) return;
    activeMarkId = markId;
    const hl = hlData.find(h => h.id === markId);
    const mark = document.querySelector(`mark[data-id="${markId}"]`);
    const rect = mark ? mark.getBoundingClientRect() : { top: 100 };
    giTa.value = hl?.gloss || '';
    gi.style.top  = Math.max(4, rect.top) + 'px'; gi.style.left = getRightEdge() + 'px';
    gi.classList.add('on'); setTimeout(() => giTa.focus(), 40);
  }

  function saveGloss() {
    if (!activeMarkId) return;
    const hl = hlData.find(h => h.id === activeMarkId);
    const mark = document.querySelector(`mark[data-id="${activeMarkId}"]`);
    const text = giTa.value.trim();
    if (hl) { hl.gloss = text || null; persist(); }
    if (mark) { text ? (mark.dataset.gloss = text) : delete mark.dataset.gloss; }
    gi.classList.remove('on'); renderGlosses(); activeMarkId = null;
  }

  function renderGlosses() {
    document.querySelectorAll('.pl-gloss-bub, .pl-gloss-line').forEach(el => el.remove());
    const rightEdge = getRightEdge();
    document.querySelectorAll('mark.pl-hl[data-gloss]').forEach(mark => {
      const gloss = mark.dataset.gloss; if (!gloss) return;
      const rect = mark.getBoundingClientRect();
      if (rect.top < -80 || rect.top > window.innerHeight + 80) return;
      const midY = rect.top + rect.height / 2;
      const line = document.createElement('div'); line.className = 'pl-gloss-line';
      line.style.cssText = `top:${midY}px;left:${rect.right}px;width:${rightEdge - rect.right}px`;
      document.body.appendChild(line);
      const bub = document.createElement('div'); bub.className = 'pl-gloss-bub'; bub.textContent = gloss;
      bub.style.cssText = `top:${midY - 10}px;left:${rightEdge}px`;
      document.body.appendChild(bub);
    });
  }

  // ═══ RESTAURAÇÃO DE HIGHLIGHTS & ÓRFÃOS ═══
  function restoreHighlights() {
    orphansList = [];
    hlData.forEach(hl => {
        if (!restoreOne(hl)) orphansList.push(hl);
    });
    renderOrphansUI();
  }

  function restoreOne(hl) {
    const allBlocks = document.querySelectorAll('p, div, td, li, blockquote');
    for (let block of allBlocks) {
      const tc = block.textContent;
      const idx = tc.indexOf(hl.text);
      if (idx === -1) continue;

      if (hl.before) {
        const slice = tc.slice(Math.max(0, idx - 25), idx);
        if (!slice.includes(hl.before.slice(-12))) continue;
      }

      try {
          const range = document.createRange();
          const walker = document.createTreeWalker(block, NodeFilter.SHOW_TEXT, null, false);
          let currentPos = 0, startNode, endNode, startOff, endOff;
          let node;

          while ((node = walker.nextNode())) {
            const nodeLen = node.textContent.length;
            if (!startNode && currentPos + nodeLen > idx) { startNode = node; startOff = idx - currentPos; }
            if (startNode && currentPos + nodeLen >= idx + hl.text.length) { endNode = node; endOff = idx + hl.text.length - currentPos; break; }
            currentPos += nodeLen;
          }

          if (startNode && endNode) {
            range.setStart(startNode, startOff);
            range.setEnd(endNode, endOff);
            const mark = document.createElement('mark');
            mark.className = `pl-hl pl-hl-${hl.color}`;
            mark.dataset.id = hl.id;
            if (hl.gloss) mark.dataset.gloss = hl.gloss;

            const frag = range.extractContents();
            mark.appendChild(frag);
            range.insertNode(mark);
            return true;
          }
      } catch (e) { return false; }
    }
    return false;
  }

  // ═══ PAINEL DE ÓRFÃOS ═══
  function renderOrphansUI() {
    if (orphansList.length === 0) {
        orphanBtn.style.display = 'none'; orphanPanel.classList.remove('on');
        return;
    }
    orphanBtn.style.display = 'block';
    orphanBtn.innerHTML = `⚠️ ${orphansList.length} grifo${orphansList.length > 1 ? 's' : ''} em trecho modificado`;

    let html = `<h3>Grifos Órfãos (Texto Revogado/Alterado)</h3>`;
    const corMap = { yellow: '#e6c200', green: '#55b86e', blue: '#5a8fff', pink: '#e05a9e', orange: '#e08030' };

    orphansList.forEach(orf => {
        html += `
        <div class="pl-orphan-item" style="border-color: ${corMap[orf.color] || '#999'}">
            <div class="pl-orphan-text">"${orf.text}"</div>
            ${orf.gloss ? `<div class="pl-orphan-gloss">✎ ${orf.gloss}</div>` : ''}
            <button class="pl-orphan-del" data-id="${orf.id}">✕ Apagar Grifo Perdido</button>
        </div>`;
    });
    orphanPanel.innerHTML = html;

    orphanPanel.querySelectorAll('.pl-orphan-del').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.target.dataset.id;
            hlData = hlData.filter(h => h.id !== id);
            persist();
            orphansList = orphansList.filter(o => o.id !== id);
            renderOrphansUI();
        });
    });
  }

  // ═══ PONTINHOS ═══
  function ringPositions(n, R) { const cx = 16, cy = 16; return Array.from({ length: n }, (_, i) => { const a = -Math.PI / 2 + (2 * Math.PI * i / n); return [cx + R * Math.cos(a), cy + R * Math.sin(a)]; }); }
  function getDotPositions(n) { const cx = 16, cy = 16, cap = Math.min(n, 9); switch (cap) { case 1: return [[cx, cy]]; case 2: return [[cx-5, cy], [cx+5, cy]]; case 3: return ringPositions(3, 6.5); case 4: return ringPositions(4, 6.5); case 5: return ringPositions(5, 7.5); case 6: return ringPositions(6, 7.5); case 7: return [...ringPositions(6, 8), [cx, cy]]; case 8: return ringPositions(8, 9); case 9: return [...ringPositions(8, 9), [cx, cy]]; default: return []; } }
  function dotTier(n) { return n===0?0:n<=2?1:n<=5?2:3; }
  const TIER_COLOR = ['#777777','#6a8a8a','#c8a84b','#d4603a'];

  function makeDotSvg(n, tier) {
    const S=32,cx=16,cy=16,r=2.8,col=TIER_COLOR[tier];
    if (n===0) return `<svg width="${S}" height="${S}" viewBox="0 0 ${S} ${S}" xmlns="http://www.w3.org/2000/svg"><circle cx="${cx}" cy="${cy}" r="11" fill="none" stroke="#777" stroke-width="1.8" stroke-dasharray="3 2"/></svg>`;
    const circles = getDotPositions(n).map(([x,y])=>`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r}" fill="${col}"/>`).join('');
    const badge = n>9?`<text x="25" y="9" font-size="7" fill="${col}" font-family="sans-serif" text-anchor="middle" font-weight="bold">${n}</text>`:'';
    return `<svg width="${S}" height="${S}" viewBox="0 0 ${S} ${S}" xmlns="http://www.w3.org/2000/svg">${circles}${badge}</svg>`;
  }

  function addDots() {
    document.querySelectorAll('.pl-artigo').forEach(el => {
      const artNum = el.dataset.artNum;
      if (!artNum) return;

      const artId = 'art_' + artNum.replace(/[.\s\-]+/g,'_');
      const n = dotData[artId] || 0;

      const zone = document.createElement('span');
      zone.className = 'pl-dots';
      zone.dataset.n = n;
      zone.title = 'Clique: +pontinho  |  Clique direito: −pontinho';
      zone.innerHTML = makeDotSvg(n, dotTier(n));

      zone.addEventListener('click', e => {
          e.stopPropagation();
          dotData[artId] = (dotData[artId]||0)+1;
          persistDots();
          zone.dataset.n = dotData[artId];
          zone.innerHTML = makeDotSvg(dotData[artId], dotTier(dotData[artId]));
      });
      zone.addEventListener('contextmenu', e => {
          e.preventDefault();
          e.stopPropagation();
          if ((dotData[artId]||0)>0) {
              dotData[artId]--;
              persistDots();
              zone.dataset.n = dotData[artId];
              zone.innerHTML = makeDotSvg(dotData[artId], dotTier(dotData[artId]));
          }
      });
      el.appendChild(zone);
    });
  }

})();
