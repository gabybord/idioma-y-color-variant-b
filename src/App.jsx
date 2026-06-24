import { useState, useMemo } from "react";

const F = "'DM Sans', sans-serif";

const T = {
  bgPage:"#070F21", bgL1:"#1B202F", bgL2:"#262B39",
  cian:"#22CFAB", cianH:"#00B188", cianDark:"rgba(34,207,171,.1)",
  blue:"#23A5FF", blueDark:"rgba(35,165,255,.12)",
  cDef:"#FFFFFF", cSec:"#C6C7CB", dis:"#626C82",
  sDef:"#262B39", sInt:"#626C82",
  green:"#09A432", greenBg:"rgba(9,164,50,.12)",
  red:"#FC543D", fg:"#070F21",
};

// ── ICONS ──────────────────────────────────────────────────────────────────
const ISearch  = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={T.dis} strokeWidth="1.8" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>;
const ICart    = ({ c=T.cSec, s=14 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>;
const IFile    = ({ c=T.fg, s=12 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/></svg>;
const ICheck   = ({ c=T.cian, s=14 }) => <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>;
const ICopy    = () => <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={T.cian} strokeWidth="1.8" strokeLinecap="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>;
const IX       = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={T.dis} strokeWidth="1.8" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;
const IChev    = ({ c=T.dis, open=false }) => <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" style={{ transform: open ? "rotate(180deg)" : "none", transition:"transform .2s" }}><polyline points="6 9 12 15 18 9"/></svg>;
const IFilter  = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={T.cDef} strokeWidth="1.8" strokeLinecap="round"><line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/></svg>;
const IGrid    = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={T.cDef} strokeWidth="1.8" strokeLinecap="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>;
const IPlus    = ({ c=T.cian }) => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;
const IMinus   = ({ c=T.cian }) => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12"/></svg>;
const ITrash   = ({ c=T.cian }) => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>;
const ICal     = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={T.cSec} strokeWidth="1.5" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
const IInfo    = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={T.blue} strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>;
const IArrow   = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={T.cSec} strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 16 16 12 12 8"/><line x1="8" y1="12" x2="16" y2="12"/></svg>;
const ILaptop  = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>;
const IBox     = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/></svg>;
const IMonitor = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>;
const IChair   = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M5 12V7a2 2 0 012-2h10a2 2 0 012 2v5"/><path d="M3 12h18v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4z"/><line x1="5" y1="18" x2="5" y2="21"/><line x1="19" y1="18" x2="19" y2="21"/></svg>;
const IPhones  = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M3 18v-6a9 9 0 0118 0v6"/><path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3z"/><path d="M3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z"/></svg>;
const AppleBadge = () => <svg width="15" height="15" viewBox="0 0 24 24" fill={T.dis}><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>;
const IChevL   = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={T.cDef} strokeWidth="2" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>;

// ── DATA ───────────────────────────────────────────────────────────────────
const COLOR_MAP = {
  Silver:      { hex:"#C8C8C8", screen:"#0d0d1a", accent:"#22CFAB" },
  Midnight:    { hex:"#252A4A", screen:"#080812", accent:"#4096F0" },
  "Space Gray":{ hex:"#7A7A7A", screen:"#0d0d1a", accent:"#22CFAB" },
  Starlight:   { hex:"#EDE8DC", screen:"#0d0d1a", accent:"#22CFAB" },
  "Sky Blue":  { hex:"#87CEEB", screen:"#0d0d1a", accent:"#22CFAB" },
};
const ALL_COLORS  = Object.keys(COLOR_MAP);
const ALL_LANGS   = ["ES-LA","EN-US","EN-UK","PT-BR"];
const FLAGS       = { "ES-LA":"🇲🇽","EN-US":"🇺🇸","EN-UK":"🇬🇧","PT-BR":"🇧🇷" };
const AVAIL_COLORS = ["Silver","Space Gray","Starlight"];
const AVAIL_LANGS  = ["ES-LA","EN-US"];

function isAvailable(color, lang) {
  return AVAIL_COLORS.includes(color) && AVAIL_LANGS.includes(lang);
}
function makeMPN(color, lang) {
  const cc = { Silver:"SL","Space Gray":"SG",Starlight:"ST",Midnight:"MN","Sky Blue":"SB" }[color];
  const lc = { "ES-LA":"ES","EN-US":"US","EN-UK":"UK","PT-BR":"BR" }[lang];
  return `MBA13-M3-${cc}-${lc}`;
}

// Build all 20 variants, sorted: disponibles primero, bajo pedido al final
function buildVariants() {
  const all = [];
  ALL_COLORS.forEach(color => {
    ALL_LANGS.forEach(lang => {
      all.push({
        id: `${color}-${lang}`,
        color, lang,
        mpn: makeMPN(color, lang),
        available: isAvailable(color, lang),
        price: isAvailable(color, lang) ? "$1,299.00" : null,
        disc: "3% off",
      });
    });
  });
  // disponibles primero, bajo pedido al final
  return [
    ...all.filter(v => v.available),
    ...all.filter(v => !v.available),
  ];
}
const ALL_VARIANTS = buildVariants();

// ── LAPTOP SVG ─────────────────────────────────────────────────────────────
function LaptopSVG({ color, screen="#0d0d1a", accent="#22CFAB", size=100, dimmed=false }) {
  const h = Math.round(size * 0.69);
  return (
    <svg width={size} height={h} viewBox="0 0 130 90" fill="none" style={{ opacity: dimmed ? 0.22 : 1 }}>
      <rect x="8" y="3" width="114" height="70" rx="5" fill={color}/>
      <rect x="12" y="7" width="106" height="62" rx="3" fill={screen}/>
      <rect x="14" y="9" width="102" height="58" rx="2" fill={screen} opacity=".95"/>
      <ellipse cx="65" cy="37" rx="32" ry="22" fill={accent} opacity=".07"/>
      <circle cx="65" cy="37" r="6" fill={accent} opacity=".18"/>
      <rect x="0" y="75" width="130" height="12" rx="2" fill={color} opacity=".85"/>
      <rect x="46" y="73" width="38" height="4" rx="2" fill={color} opacity=".55"/>
      <rect x="54" y="74" width="22" height="3" rx="1" fill="#000" opacity=".2"/>
    </svg>
  );
}

// ── MPN BADGE copiable ─────────────────────────────────────────────────────
function MPNBadge({ mpn }) {
  const [copied, setCopied] = useState(false);
  const copy = (e) => {
    e.stopPropagation();
    navigator.clipboard?.writeText(mpn);
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };
  return (
    <div
      onClick={copy}
      title="Copiar MPN"
      style={{
        display:"inline-flex", alignItems:"center", gap:5,
        background:T.bgPage, border:`0.5px solid ${T.sDef}`,
        borderRadius:6, padding:"3px 8px",
        cursor:"pointer", transition:"border-color .15s",
        fontFamily:"monospace", fontSize:11,
        letterSpacing:".4px", color: copied ? T.cian : T.cSec,
      }}
      onMouseEnter={e => e.currentTarget.style.borderColor = T.cian}
      onMouseLeave={e => e.currentTarget.style.borderColor = T.sDef}
    >
      {copied ? <ICheck c={T.cian} s={11}/> : <ICopy/>}
      <span>{mpn}</span>
    </div>
  );
}

// ── QTY STEPPER ────────────────────────────────────────────────────────────
function QtyStepper({ qty, onQtyChange, available, compact=false }) {
  const accent = available ? T.cian : T.blue;
  const bg     = available ? T.greenBg : T.blueDark;
  return (
    <div style={{
      display:"flex", alignItems:"center",
      background:bg, border:`0.5px solid ${accent}`,
      borderRadius:8, overflow:"hidden", width:"100%",
    }}>
      <button
        onClick={() => onQtyChange(-1)}
        style={{ background:"transparent", border:"none", cursor:"pointer",
          padding: compact ? "9px 12px" : "11px 16px",
          borderRight:`0.5px solid ${T.sDef}`, display:"flex", alignItems:"center" }}
      >
        {qty === 1 ? <ITrash c={accent}/> : <IMinus c={accent}/>}
      </button>
      <span style={{ flex:1, textAlign:"center", fontSize:14, fontWeight:700, color:T.cDef, fontFamily:F }}>{qty}</span>
      <button
        onClick={() => onQtyChange(1)}
        style={{ background:"transparent", border:"none", cursor:"pointer",
          padding: compact ? "9px 12px" : "11px 16px",
          borderLeft:`0.5px solid ${T.sDef}`, display:"flex", alignItems:"center" }}
      >
        <IPlus c={accent}/>
      </button>
    </div>
  );
}

// ── VARIANT CARD ───────────────────────────────────────────────────────────
// Visually identical to Variant A cards — no modal, no availability pill,
// no qty badge. Solo se agrega el MPN como diferenciador.
function VariantCard({ variant, cartQty, onQtyChange, onGoDetail }) {
  const { color, lang, mpn, available, price, disc } = variant;
  const cm = COLOR_MAP[color];

  return (
    <div
      style={{
        background:T.bgL1, borderRadius:12,
        border:`0.5px solid ${T.sInt}`,
        overflow:"hidden", display:"flex", flexDirection:"column",
        gap:12, paddingBottom:12,
        cursor:"pointer", fontFamily:F,
        transition:"box-shadow .2s, border-color .2s",
      }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow="0 4px 20px rgba(0,0,0,.4)"; }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow="none"; }}
    >
      {/* Image */}
      <div style={{
        background:"#F4F5F6", height:120,
        display:"flex", alignItems:"center", justifyContent:"center",
        position:"relative", borderBottom:`0.5px solid ${T.sInt}`, flexShrink:0,
      }}>
        <LaptopSVG color={cm.hex} screen={cm.screen} accent={cm.accent} dimmed={!available}/>
        <div style={{
          position:"absolute", top:7, left:7,
          width:32, height:32, borderRadius:10,
          border:`0.5px solid ${T.cSec}`, background:T.bgL1,
          display:"flex", alignItems:"center", justifyContent:"center",
        }}>
          <AppleBadge/>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding:"0 12px", display:"flex", flexDirection:"column", gap:8 }}>
        {/* Name — color + lang como diferenciadores */}
        <div style={{ fontSize:14, fontWeight:500, color:T.cDef, lineHeight:1.3 }}>
          MacBook Air 13 — {color}
        </div>

        {/* Price row */}
        {price ? (
          <div style={{ display:"flex", alignItems:"center", gap:4 }}>
            <span style={{ fontSize:12, color:T.cDef }}>{price} USD</span>
            <span style={{ background:"rgba(34,207,171,.12)", border:`0.5px solid ${T.cian}`, borderRadius:24, padding:"1px 7px", fontSize:10, color:T.cDef }}>
              {disc}
            </span>
          </div>
        ) : (
          <div style={{ display:"flex", alignItems:"center", gap:4, fontSize:12, color:T.blue }}>
            Cotiza para recibir precio <IInfo/>
          </div>
        )}
      </div>

      {/* Divider */}
      <div style={{ height:"0.5px", background:T.sDef }}/>

      {/* Spec pills — color dot + lang flag, idéntico a Variant A */}
      <div style={{ padding:"0 12px", display:"flex", flexWrap:"wrap", gap:4 }}>
        {/* Color pill */}
        <span style={{ background:T.bgL2, borderRadius:24, padding:"3px 8px", fontSize:10, color:T.cDef, display:"flex", alignItems:"center", gap:4 }}>
          <span style={{ width:8, height:8, borderRadius:"50%", background:cm.hex, border:"1px solid rgba(255,255,255,.2)", display:"inline-block", flexShrink:0 }}/>
          {color}
        </span>
        {/* Lang pill */}
        <span style={{ background:T.bgL2, borderRadius:24, padding:"3px 8px", fontSize:10, color:T.cDef }}>
          {FLAGS[lang]} {lang}
        </span>
        {/* Specs */}
        {["Medios","16GB","M3","512GB SSD"].map(s => (
          <span key={s} style={{ background:T.bgL2, borderRadius:24, padding:"3px 8px", fontSize:10, color:T.cDef }}>{s}</span>
        ))}
      </div>

      {/* MPN */}
      <div style={{ padding:"0 12px" }}>
        <MPNBadge mpn={mpn}/>
      </div>

      {/* Actions */}
      <div style={{ padding:"0 12px", display:"flex", alignItems:"center", justifyContent:"space-between", gap:12 }}>
        <button onClick={() => onGoDetail(variant)} style={{ display:"flex", alignItems:"center", gap:5, background:"transparent", border:"none", cursor:"pointer", fontSize:12, fontWeight:500, color:T.cSec, fontFamily:F, padding:"8px 0", flexShrink:0 }}>
          Conocer más <IArrow/>
        </button>

        <div style={{ width:120 }} onClick={e => e.stopPropagation()}>
          {cartQty > 0 ? (
            <QtyStepper qty={cartQty} onQtyChange={onQtyChange} available={available} compact/>
          ) : available ? (
            <button
              onClick={() => onQtyChange(1)}
              style={{ display:"flex", alignItems:"center", gap:7, background:T.cian, border:"none", borderRadius:8, padding:"8px 0", width:"100%", justifyContent:"center", cursor:"pointer", fontSize:12, fontWeight:500, color:T.fg, fontFamily:F, transition:"background .15s" }}
              onMouseEnter={e => e.currentTarget.style.background=T.cianH}
              onMouseLeave={e => e.currentTarget.style.background=T.cian}
            >
              Agregar <ICart c={T.fg} s={12}/>
            </button>
          ) : (
            <button
              onClick={() => onQtyChange(1)}
              style={{ display:"flex", alignItems:"center", gap:7, background:T.blue, border:"none", borderRadius:8, padding:"8px 0", width:"100%", justifyContent:"center", cursor:"pointer", fontSize:12, fontWeight:500, color:T.fg, fontFamily:F, transition:"opacity .15s" }}
              onMouseEnter={e => e.currentTarget.style.opacity=".85"}
              onMouseLeave={e => e.currentTarget.style.opacity="1"}
            >
              Cotizar <IFile c={T.fg} s={12}/>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ── SIDEBAR ────────────────────────────────────────────────────────────────
// Filtros cerrados por defecto
function Sidebar({ filterColors, filterLangs, onToggleColor, onToggleLang, onClear }) {
  const [openSections, setOpenSections] = useState({ color:false, lang:false, specs:false });
  const toggle = (k) => setOpenSections(p => ({ ...p, [k]:!p[k] }));
  const hasFilters = filterColors.length > 0 || filterLangs.length > 0;

  return (
    <div style={{
      width:200, flexShrink:0, background:T.bgL1,
      borderRight:`0.5px solid ${T.sDef}`,
      minHeight:"calc(100vh - 88px)",
      display:"flex", flexDirection:"column", justifyContent:"space-between",
      padding:"24px 16px 16px", fontFamily:F,
    }}>
      <div style={{ display:"flex", flexDirection:"column", gap:0 }}>
        <div style={{ textAlign:"center", marginBottom:16 }}>
          <span style={{ fontSize:26, fontWeight:700, letterSpacing:-1 }}>
            <span style={{ color:T.cian }}>.</span><span style={{ color:T.cDef }}>bord</span>
          </span>
        </div>
        <div style={{ height:"0.5px", background:T.sDef, marginBottom:16 }}/>
        <button style={{ display:"flex", alignItems:"center", gap:8, border:`0.5px solid ${T.cDef}`, background:"transparent", borderRadius:8, padding:"10px", cursor:"pointer", fontFamily:F, color:T.cDef, fontSize:13, fontWeight:500, width:"100%", justifyContent:"center", marginBottom:20 }}>
          <IGrid/> Dash.bord
        </button>
        <div style={{ height:"0.5px", background:T.sDef, marginBottom:16 }}/>

        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:12 }}>
          <div style={{ display:"flex", alignItems:"center", gap:6 }}>
            <IFilter/>
            <span style={{ fontSize:14, fontWeight:500, color:T.cDef }}>Filtros</span>
          </div>
          {hasFilters && (
            <button onClick={onClear} style={{ background:"transparent", border:"none", cursor:"pointer", fontSize:10, color:T.cian, fontFamily:F, fontWeight:600 }}>
              Limpiar
            </button>
          )}
        </div>

        {/* Color — cerrado por defecto */}
        <div style={{ marginBottom:2 }}>
          <div onClick={() => toggle("color")} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", cursor:"pointer", padding:"8px 0" }}>
            <span style={{ fontSize:13, color:T.cDef }}>Color</span>
            <IChev open={openSections.color}/>
          </div>
          {openSections.color && (
            <div style={{ display:"flex", flexDirection:"column", gap:6, paddingBottom:10 }}>
              {ALL_COLORS.map(c => {
                const active = filterColors.includes(c);
                return (
                  <div key={c} onClick={() => onToggleColor(c)} style={{ display:"flex", alignItems:"center", gap:8, cursor:"pointer" }}>
                    <div style={{ width:14, height:14, borderRadius:3, border:`0.5px solid ${active ? T.cian : T.dis}`, background: active ? "rgba(34,207,171,.15)" : "transparent", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, transition:"all .12s" }}>
                      {active && <ICheck c={T.cian} s={10}/>}
                    </div>
                    <div style={{ width:10, height:10, borderRadius:"50%", background:COLOR_MAP[c].hex, border:"1px solid rgba(255,255,255,.2)", flexShrink:0 }}/>
                    <span style={{ fontSize:12, color: active ? T.cDef : T.cSec }}>{c}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div style={{ height:"0.5px", background:T.sDef }}/>

        {/* Idioma — cerrado por defecto */}
        <div style={{ marginBottom:2 }}>
          <div onClick={() => toggle("lang")} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", cursor:"pointer", padding:"8px 0" }}>
            <span style={{ fontSize:13, color:T.cDef }}>Idioma del teclado</span>
            <IChev open={openSections.lang}/>
          </div>
          {openSections.lang && (
            <div style={{ display:"flex", flexDirection:"column", gap:6, paddingBottom:10 }}>
              {ALL_LANGS.map(l => {
                const active = filterLangs.includes(l);
                return (
                  <div key={l} onClick={() => onToggleLang(l)} style={{ display:"flex", alignItems:"center", gap:8, cursor:"pointer" }}>
                    <div style={{ width:14, height:14, borderRadius:3, border:`0.5px solid ${active ? T.cian : T.dis}`, background: active ? "rgba(34,207,171,.15)" : "transparent", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, transition:"all .12s" }}>
                      {active && <ICheck c={T.cian} s={10}/>}
                    </div>
                    <span style={{ fontSize:14 }}>{FLAGS[l]}</span>
                    <span style={{ fontSize:12, color: active ? T.cDef : T.cSec }}>{l}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div style={{ height:"0.5px", background:T.sDef }}/>

        {/* Otros filtros cerrados */}
        {["Procesador","Memoria","Almacenamiento"].map(item => (
          <div key={item}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", cursor:"pointer", padding:"8px 0" }}>
              <span style={{ fontSize:13, color:T.cDef }}>{item}</span>
              <IChev/>
            </div>
            <div style={{ height:"0.5px", background:T.sDef }}/>
          </div>
        ))}
      </div>

      {/* Bottom widget */}
      <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
        <div style={{ background:T.bgL2, borderRadius:8, padding:"14px 12px" }}>
          <p style={{ fontSize:12, fontWeight:700, color:T.cSec, textAlign:"center", marginBottom:10 }}>¿No sabes qué comprar?</p>
          {["Tecnología","Diseño","Producto","Financiero"].map(p => (
            <div key={p} style={{ display:"flex", alignItems:"center", gap:6, marginBottom:5, cursor:"pointer" }}>
              <div style={{ width:13, height:13, borderRadius:3, border:`0.5px solid ${T.dis}`, flexShrink:0 }}/>
              <span style={{ fontSize:11, color:T.cSec }}>{p}</span>
            </div>
          ))}
        </div>
        <button style={{ display:"flex", alignItems:"center", gap:8, background:"transparent", border:"none", cursor:"pointer", fontFamily:F, color:T.dis, fontSize:13, fontWeight:500, justifyContent:"center", padding:"8px" }}>
          Limpiar filtros <IX/>
        </button>
      </div>
    </div>
  );
}


// ── LAPTOP HERO ────────────────────────────────────────────────────────────
function LaptopHero({ color, screen="#0d0d1a", accent="#22CFAB", size=240 }) {
  const h = Math.round(size * 0.69);
  return (
    <svg width={size} height={h} viewBox="0 0 130 90" fill="none">
      <rect x="8" y="3" width="114" height="70" rx="5" fill={color}/>
      <rect x="12" y="7" width="106" height="62" rx="3" fill={screen}/>
      <rect x="14" y="9" width="102" height="58" rx="2" fill={screen} opacity=".95"/>
      <ellipse cx="65" cy="37" rx="32" ry="22" fill={accent} opacity=".07"/>
      <circle cx="65" cy="37" r="6" fill={accent} opacity=".18"/>
      <rect x="0" y="75" width="130" height="12" rx="2" fill={color} opacity=".85"/>
      <rect x="46" y="73" width="38" height="4" rx="2" fill={color} opacity=".55"/>
      <rect x="54" y="74" width="22" height="3" rx="1" fill="#000" opacity=".2"/>
    </svg>
  );
}

// ── DETAIL PAGE B ───────────────────────────────────────────────────────────
// Color + idioma ya resueltos desde la card — no hay configurador.
// Layout fiel al Figma 1.0: info izquierda, foto+MPN+CTA derecha.
function DetailPageB({ variant, cart, onQtyChange, onBack, cartTotal }) {
  const { color, lang, mpn, available, price } = variant;
  const cm  = COLOR_MAP[color];
  const qty = cart[variant.id] || 0;
  const specs1 = [["Color",color],["Idioma teclado",lang],["Pantalla","13.6\u2033 Retina"],["Memoria","16GB"]];
  const specs2 = [["Almacenamiento","512GB SSD"],["Chip","Apple M3"],["Garantía","1 año"],["Accesorios","Cargador"]];
  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap'); *{box-sizing:border-box;margin:0;padding:0;} body{font-family:'DM Sans',sans-serif;background:#070F21;} ::-webkit-scrollbar{width:4px;} ::-webkit-scrollbar-track{background:#070F21;} ::-webkit-scrollbar-thumb{background:#262B39;border-radius:4px;} input::placeholder{color:#626C82;} @keyframes fadeIn{from{opacity:0;transform:scale(.97)}to{opacity:1;transform:scale(1)}}`}</style>
      <div style={{ background:T.bgPage, color:T.cDef, minHeight:"100vh", fontFamily:F }}>
        {/* Topbar */}
        <div style={{ background:T.bgL1, borderBottom:`0.5px solid ${T.sDef}`, padding:"0 20px", height:56, display:"flex", alignItems:"center", justifyContent:"space-between", position:"sticky", top:0, zIndex:100, gap:16 }}>
          <span style={{ fontSize:15, fontWeight:500, color:T.cSec, flexShrink:0 }}>.bord Store</span>
          <div style={{ flex:1, maxWidth:560, position:"relative" }}>
            <div style={{ background:T.bgPage, border:`0.5px solid ${T.sInt}`, borderRadius:6, height:38, display:"flex", alignItems:"center", padding:"0 12px 0 34px" }}>
              <div style={{ position:"absolute", left:22, top:"50%", transform:"translateY(-50%)", pointerEvents:"none" }}><ISearch/></div>
              <input placeholder="Busca por nombre, color, idioma o MPN" readOnly style={{ flex:1, background:"transparent", border:"none", outline:"none", fontSize:13, color:T.cDef, fontFamily:F }}/>
            </div>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:14, flexShrink:0 }}>
            <div style={{ position:"relative" }}>
              <button style={{ width:38, height:38, borderRadius:8, border:`0.5px solid ${T.cSec}`, background:"transparent", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}><ICart c={T.cSec} s={14}/></button>
              {cartTotal > 0 && <div style={{ position:"absolute", top:-5, right:-5, background:T.cian, color:T.fg, borderRadius:"50%", width:17, height:17, display:"flex", alignItems:"center", justifyContent:"center", fontSize:9, fontWeight:700 }}>{cartTotal}</div>}
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:4, fontSize:12 }}>
              {FLAGS["ES-LA"]} <span style={{ color:T.cSec }}>Tienda</span> <span style={{ color:T.cian, textDecoration:"underline", cursor:"pointer" }}>Colombia</span>
            </div>
          </div>
        </div>
        {/* SLA bar */}
        <div style={{ background:"#0D1F38", borderBottom:"0.5px solid #1a2d4a", padding:"8px 20px", display:"flex", alignItems:"center", justifyContent:"center", gap:8, fontSize:12, color:T.cSec }}>
          <ICal/> SLA: {FLAGS["ES-LA"]} <strong style={{ color:T.cDef }}>Colombia: 2–5 Días hábiles</strong>
        </div>
        {/* Content */}
        <div style={{ padding:"20px 130px 60px" }}>
          <button onClick={onBack} style={{ display:"flex", alignItems:"center", gap:4, background:"transparent", border:"none", cursor:"pointer", fontSize:12, color:T.cDef, fontFamily:F, padding:0, marginBottom:20 }}>
            <IChevL/> Volver a la tienda
          </button>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 580px", gap:60, alignItems:"start" }}>
            {/* IZQUIERDA */}
            <div style={{ display:"flex", flexDirection:"column", gap:0 }}>
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
                <div style={{ width:32, height:32, borderRadius:"50%", border:`0.5px solid ${T.sInt}`, background:T.bgL2, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}><AppleBadge/></div>
                <h1 style={{ fontSize:20, fontWeight:700, color:T.cDef, margin:0, lineHeight:1.2, fontFamily:F }}>MacBook Air 13 — {color}</h1>
              </div>
              <div style={{ display:"flex", gap:4, flexWrap:"wrap", marginBottom:12 }}>
                {[color, lang,"Medios","16GB","M3","512GB SSD"].map(s => (
                  <span key={s} style={{ background:T.bgL2, borderRadius:24, padding:"3px 9px", fontSize:10, color:T.cDef, display:"flex", alignItems:"center", gap:4 }}>
                    {s === color && <span style={{ width:8, height:8, borderRadius:"50%", background:cm.hex, border:"1px solid rgba(255,255,255,.2)", display:"inline-block", flexShrink:0 }}/>}
                    {s === lang && <span style={{ fontSize:12 }}>{FLAGS[lang]}</span>}
                    {s}
                  </span>
                ))}
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:14 }}>
                <span style={{ fontSize:12, color:T.cSec }}>Tags:</span>
                <div style={{ display:"flex", border:`1px solid ${T.sDef}`, borderRadius:8 }}>
                  {["Producto","Tecnología","Directivo","Diseño"].map((tag,i,arr) => (
                    <div key={tag} style={{ display:"flex", alignItems:"center" }}>
                      <span style={{ padding:"6px 12px", fontSize:12, color:T.cDef, whiteSpace:"nowrap" }}>{tag}</span>
                      {i < arr.length-1 && <div style={{ width:"0.5px", alignSelf:"stretch", background:T.sDef }}/>}
                    </div>
                  ))}
                </div>
              </div>
              <p style={{ fontSize:14, color:T.cSec, lineHeight:1.55, marginBottom:14, maxWidth:480 }}>
                MacBook Air 13 con chip M3 en {color}, teclado {lang}. Diseñado para quienes necesitan potencia y portabilidad. Hasta 18 horas de batería con un diseño ultradelgado de tan solo 1.24 kg.
              </p>
              <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"#052143", border:"1px solid rgba(35,165,255,.1)", borderRadius:8, padding:"8px 12px", marginBottom:16, alignSelf:"flex-start" }}>
                <ICal/><span style={{ fontSize:12, color:T.cSec }}>Entrega estimada:</span><span style={{ fontSize:12, color:T.cDef }}>🇨🇴 Colombia: 2–5 Días hábiles</span>
              </div>
              <div style={{ display:"flex", gap:12, alignItems:"flex-start", marginBottom:16 }}>
                <div style={{ display:"flex", flexDirection:"column", gap:8, width:200 }}>
                  {specs1.map(([l,v]) => (
                    <div key={l} style={{ display:"flex", gap:8, alignItems:"center", fontSize:12 }}>
                      <span style={{ color:T.cSec, whiteSpace:"nowrap" }}>{l}</span>
                      <span style={{ color:T.cDef, fontWeight:700 }}>{v}</span>
                    </div>
                  ))}
                </div>
                <div style={{ width:"0.5px", alignSelf:"stretch", background:T.sDef, flexShrink:0 }}/>
                <div style={{ display:"flex", flexDirection:"column", gap:8, width:200 }}>
                  {specs2.map(([l,v]) => (
                    <div key={l} style={{ display:"flex", gap:8, alignItems:"center", fontSize:12 }}>
                      <span style={{ color:T.cSec, whiteSpace:"nowrap" }}>{l}</span>
                      <span style={{ color:T.cDef, fontWeight:700 }}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ height:"0.5px", background:T.sDef }}/>
            </div>
            {/* DERECHA */}
            <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
              <div style={{ background:T.bgL1, borderRadius:12, padding:16, display:"flex", gap:16, opacity:.9 }}>
                <div style={{ flex:1, background:"white", borderRadius:12, border:`1px solid ${T.sInt}`, height:220, display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden" }}>
                  <div style={{ animation:"fadeIn .25s ease" }}><LaptopHero color={cm.hex} screen={cm.screen} accent={cm.accent} size={240}/></div>
                </div>
                <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                  {[0,1,2].map(i => (
                    <div key={i} style={{ width:72, height:60, background:"white", borderRadius:10, border:`1.5px solid ${T.sInt}`, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", overflow:"hidden", flexShrink:0 }}>
                      <LaptopSVG color={cm.hex} screen={cm.screen} accent={cm.accent} size={60}/>
                    </div>
                  ))}
                </div>
              </div>
              {/* MPN prominente */}
              <div style={{ background:T.bgPage, border:`0.5px solid ${T.sInt}`, borderRadius:8, padding:"12px 14px" }}>
                <div style={{ fontSize:10, fontWeight:700, color:T.dis, textTransform:"uppercase", letterSpacing:".7px", marginBottom:6 }}>MPN</div>
                <MPNBadge mpn={mpn}/>
              </div>
              {!available && (
                <div style={{ background:T.blueDark, borderRadius:8, padding:"10px 12px", fontSize:12, color:T.dis, lineHeight:1.5 }}>
                  <span style={{ color:T.blue }}>Esta combinación es bajo pedido.</span> Recibirás una propuesta de precio para Colombia.
                </div>
              )}
              {/* CTA + precio */}
              <div style={{ display:"flex", gap:32, alignItems:"flex-start" }}>
                <div style={{ flexShrink:0 }}>
                  {qty > 0 ? (
                    <QtyStepper qty={qty} onQtyChange={onQtyChange} available={available}/>
                  ) : available ? (
                    <button onClick={() => onQtyChange(1)} style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, background:T.cian, border:"none", borderRadius:8, padding:"10px 0", width:180, cursor:"pointer", fontSize:14, fontWeight:500, color:T.fg, fontFamily:F }} onMouseEnter={e=>e.currentTarget.style.opacity=".88"} onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
                      <ICart c={T.fg} s={14}/> Agregar al carrito
                    </button>
                  ) : (
                    <button onClick={() => onQtyChange(1)} style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, background:T.blue, border:"none", borderRadius:8, padding:"10px 0", width:180, cursor:"pointer", fontSize:14, fontWeight:500, color:T.fg, fontFamily:F }} onMouseEnter={e=>e.currentTarget.style.opacity=".88"} onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
                      <IFile c={T.fg} s={14}/> Agregar a cotización
                    </button>
                  )}
                </div>
                <div style={{ flex:1, display:"flex", flexDirection:"column", gap:8, alignItems:"flex-end" }}>
                  <div style={{ display:"flex", flexDirection:"column", gap:8, width:"100%" }}>
                    <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                      <span style={{ fontSize:16, fontWeight:500, color:T.dis }}>Total en Colombia 🇨🇴</span>
                      <span style={{ fontSize:16, fontWeight:700, color:qty>0?T.cDef:T.dis }}>{qty>0&&price?`$${(parseFloat(price.replace(/[$,]/g,""))*qty).toLocaleString("es")} USD`:"$0 USD"}</span>
                    </div>
                    <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                      <span style={{ fontSize:14, color:T.cDef }}>Precio por producto</span>
                      <span style={{ fontSize:14, fontWeight:500, color:T.cDef }}>{price?`${price} USD`:"—"}</span>
                    </div>
                  </div>
                  <div style={{ height:"0.5px", background:T.sDef, width:"100%" }}/>
                  <span style={{ fontSize:10, color:T.cSec }}>*Todos los precios incluyen impuestos</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ── CATEGORIES ─────────────────────────────────────────────────────────────
const CATS = [
  { label:"Laptops", IC:ILaptop, active:true },
  { label:"Laptops con DEP", IC:ILaptop },
  { label:"Bajo pedido", IC:IBox },
  { label:"Monitores", IC:IMonitor },
  { label:"Mobiliario", IC:IChair },
  { label:"Accesorios", IC:IPhones },
];

// ── MAIN APP ───────────────────────────────────────────────────────────────
export default function App() {
  const [query, setQuery]     = useState("");
  const [filterColors, setFC] = useState([]);
  const [filterLangs, setFL]  = useState([]);
  const [cart, setCart]       = useState({});
  const [detailVariant, setDetailVariant] = useState(null);

  const cartTotal = Object.values(cart).reduce((s, v) => s + v, 0);

  const handleQtyChange = (variantId, available, delta) => {
    setCart(prev => {
      const cur  = prev[variantId] || 0;
      const next = cur + delta;
      if (next <= 0) { const copy = { ...prev }; delete copy[variantId]; return copy; }
      return { ...prev, [variantId]: next };
    });
  };

  const toggleColor = (c) => setFC(p => p.includes(c) ? p.filter(x => x !== c) : [...p, c]);
  const toggleLang  = (l) => setFL(p => p.includes(l) ? p.filter(x => x !== l) : [...p, l]);
  const clearAll    = () => { setFC([]); setFL([]); };

  // useMemo SIEMPRE antes de cualquier return condicional (regla de hooks)
  const filtered = useMemo(() => {
    let list = ALL_VARIANTS;
    if (filterColors.length) list = list.filter(v => filterColors.includes(v.color));
    if (filterLangs.length)  list = list.filter(v => filterLangs.includes(v.lang));
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(v =>
        v.color.toLowerCase().includes(q) ||
        v.lang.toLowerCase().includes(q) ||
        v.mpn.toLowerCase().includes(q) ||
        "macbook air 13".includes(q)
      );
    }
    return list;
  }, [filterColors, filterLangs, query]);

  // Vista de detalle
  if (detailVariant) {
    return (
      <DetailPageB
        variant={detailVariant}
        cart={cart}
        onQtyChange={(delta) => handleQtyChange(detailVariant.id, detailVariant.available, delta)}
        onBack={() => { setDetailVariant(null); window.scrollTo(0,0); }}
        cartTotal={cartTotal}
      />
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        body{font-family:'DM Sans',sans-serif;background:#070F21;}
        ::-webkit-scrollbar{width:4px;}
        ::-webkit-scrollbar-track{background:#070F21;}
        ::-webkit-scrollbar-thumb{background:#262B39;border-radius:4px;}
        input::placeholder{color:#626C82;}
      `}</style>

      <div style={{ fontFamily:F, background:T.bgPage, color:T.cDef, minHeight:"100vh" }}>

        {/* Topbar */}
        <div style={{
          background:T.bgL1, borderBottom:`0.5px solid ${T.sDef}`,
          padding:"0 20px", height:56,
          display:"flex", alignItems:"center", justifyContent:"space-between",
          position:"sticky", top:0, zIndex:100, gap:16,
        }}>
          <span style={{ fontSize:15, fontWeight:500, color:T.cSec, flexShrink:0 }}>.bord Store</span>
          <div style={{ flex:1, maxWidth:560, position:"relative" }}>
            <div style={{ background:T.bgPage, border:`0.5px solid ${T.sInt}`, borderRadius:6, height:38, display:"flex", alignItems:"center", padding:"0 12px 0 34px", gap:8 }}>
              <div style={{ position:"absolute", left:22, top:"50%", transform:"translateY(-50%)", pointerEvents:"none", display:"flex" }}>
                <ISearch/>
              </div>
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Busca por nombre, color, idioma o MPN"
                style={{ flex:1, background:"transparent", border:"none", outline:"none", fontSize:13, color:T.cDef, fontFamily:F }}
              />
              {query && (
                <button onClick={() => setQuery("")} style={{ background:"transparent", border:"none", cursor:"pointer", display:"flex", padding:0 }}>
                  <IX/>
                </button>
              )}
            </div>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:14, flexShrink:0 }}>
            <div style={{ position:"relative" }}>
              <button style={{ width:38, height:38, borderRadius:8, border:`0.5px solid ${T.cSec}`, background:"transparent", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer" }}>
                <ICart c={T.cSec} s={14}/>
              </button>
              {cartTotal > 0 && (
                <div style={{ position:"absolute", top:-5, right:-5, background:T.cian, color:T.fg, borderRadius:"50%", width:17, height:17, display:"flex", alignItems:"center", justifyContent:"center", fontSize:9, fontWeight:700 }}>
                  {cartTotal}
                </div>
              )}
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:4, fontSize:12 }}>
              🇲🇽 <span style={{ color:T.cSec }}>Tienda</span> <span style={{ color:T.cian, textDecoration:"underline", cursor:"pointer" }}>Colombia</span>
            </div>
          </div>
        </div>

        {/* SLA bar */}
        <div style={{ background:"#0D1F38", borderBottom:"0.5px solid #1a2d4a", padding:"8px 20px", display:"flex", alignItems:"center", justifyContent:"center", gap:8, fontSize:12, color:T.cSec }}>
          <ICal/> SLA: 🇲🇽 <strong style={{ color:T.cDef }}>Colombia: 2–5 Días hábiles</strong>
        </div>

        <div style={{ display:"flex" }}>
          <Sidebar
            filterColors={filterColors}
            filterLangs={filterLangs}
            onToggleColor={toggleColor}
            onToggleLang={toggleLang}
            onClear={clearAll}
          />

          <div style={{ flex:1, padding:"20px" }}>
            {/* Category tabs */}
            <div style={{ display:"flex", gap:8, marginBottom:20, overflowX:"auto", paddingBottom:2 }}>
              {CATS.map(c => (
                <div key={c.label} style={{
                  display:"flex", flexDirection:"column", alignItems:"center", gap:5,
                  padding:"12px 14px", borderRadius:8,
                  border:`0.5px solid ${c.active ? T.cian : T.sDef}`,
                  background: c.active ? "rgba(28,50,59,.9)" : T.bgL1,
                  minWidth:90, flexShrink:0, fontSize:11,
                  color: c.active ? T.cDef : T.dis, cursor:"pointer",
                }}>
                  <c.IC/> {c.label}
                </div>
              ))}
            </div>

            {/* Search results feedback — solo si hay query activo */}
            {query && (
              <div style={{ fontSize:12, color:T.dis, marginBottom:14 }}>
                <strong style={{ color:T.cDef }}>{filtered.length}</strong> resultado{filtered.length !== 1 ? "s" : ""} para <strong style={{ color:T.cDef }}>"{query}"</strong>
              </div>
            )}

            {/* Grid */}
            {filtered.length > 0 ? (
              <div style={{ display:"grid", gridTemplateColumns:"repeat(4, 1fr)", gap:12, paddingBottom:40 }}>
                {filtered.map(v => (
                  <VariantCard
                    key={v.id}
                    variant={v}
                    cartQty={cart[v.id] || 0}
                    onQtyChange={(delta) => handleQtyChange(v.id, v.available, delta)}
                    onGoDetail={(variant) => { setDetailVariant(variant); window.scrollTo(0,0); }}
                  />
                ))}
              </div>
            ) : (
              <div style={{ textAlign:"center", padding:"60px 0", color:T.dis }}>
                <div style={{ fontSize:14, marginBottom:6 }}>
                  Sin resultados para{" "}
                  {query ? <strong style={{ color:T.cDef }}>"{query}"</strong> : "los filtros seleccionados"}
                </div>
                <div style={{ fontSize:12 }}>Intenta con otro color, idioma o MPN</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
