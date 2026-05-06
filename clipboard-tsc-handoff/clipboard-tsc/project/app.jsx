const { useState, useEffect, useRef, useMemo } = React;

// ============ Icons ============
const Icon = {
  Copy: (p) => <svg {...p} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>,
  Check: (p) => <svg {...p} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  Star: ({ filled, ...p }) => <svg {...p} width="16" height="16" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  Edit: (p) => <svg {...p} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>,
  Trash: (p) => <svg {...p} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-2 14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/></svg>,
  Plus: (p) => <svg {...p} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  Search: (p) => <svg {...p} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  Arrow: (p) => <svg {...p} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  Down: (p) => <svg {...p} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/></svg>,
  Settings: (p) => <svg {...p} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9c.36.16.69.4 1 .69V12a2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
  Folder: (p) => <svg {...p} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>,
};

// ============ Defaults & seed data ============
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#3D2BFF",
  "density": "comfy",
  "showShapes": true,
  "headlineFont": "Space Grotesk"
}/*EDITMODE-END*/;

const SEED = [
  {
    section: "Atajos rápidos", items: [
      { id: "1", title: "Saludo cliente", color: "blue", size: "feature", tags: ["ventas", "es"], content: "¡Hola! Hablas con Nicolás de Tattoo Shop Colombia 👋\n\n¿En qué te puedo ayudar hoy? Estoy disponible para resolver dudas sobre kits, máquinas y envíos a todo el país. Cuéntame qué estás buscando y te armo la mejor opción 🚀", showShapes: true },
      { id: "2", title: "Email firma", color: "white", size: "normal", tags: ["email"], content: "Saludos cordiales,\n\nNicolás Pérez\nDirector Comercial — Tattoo Shop\nnicolas@tattooshop.co\n+57 320 555 1234" },
      { id: "3", title: "Política devolución", color: "default", size: "normal", tags: ["legal"], content: "Aceptamos devoluciones dentro de los 30 días posteriores a la compra. El producto debe estar sin uso y en su empaque original. Reembolso al método de pago original en 5–7 días hábiles." },
    ]
  },
  {
    section: "Productos", items: [
      { id: "4", title: "Kit Yilong", color: "yellow", size: "half", tags: ["kit", "popular"], content: "🎯 Kit Yilong inalámbrico — Para todo tipo de tatuaje\n\n• 1× Máquina Yilong inalámbrica\n• Carga con USB tipo C\n• 2× Batería inalámbrica\n• Duración: 6h continuas\n\n💰 $1.890.000 COP" },
      { id: "5", title: "EZ Lancer", color: "default", size: "normal", tags: ["kit"], content: "🎯 Máquina EZ Lancer — Línea profesional\n\n• Motor coreless de 11W\n• Stroke ajustable 2.5–4mm\n• Carga USB-C inalámbrica\n• Bateria 2200mAh\n\n💰 $2.450.000 COP" },
      { id: "6", title: "Poseidon Clear", color: "mint", size: "normal", tags: ["kit", "nuevo"], content: "✨ Máquina Poseidon Clear — Edición transparente\n\n• Diseño semi-translúcido\n• Stroke 3.5mm fijo\n• Ideal para sombreado\n• Garantía 1 año\n\n💰 $2.100.000 COP" },
      { id: "7", title: "ES Caster", color: "default", size: "normal", tags: ["kit"], content: "🎯 Máquina EZ Caster — Para todo tipo de tatuaje\n\n• Stroke variable\n• 2× Batería inalámbrica de larga duración\n• Carga USB tipo C\n• Estuche rígido\n\n💰 $1.690.000 COP" },
    ]
  },
  {
    section: "Información", items: [
      { id: "8", title: "Guía Inter", color: "pink", size: "half", tags: ["envíos"], content: "📦 ¡Muchas gracias por tu pedido! 👀\n\n👉 Rastrea tu pedido aquí: https://interrapidisimo.com\n📞 Número de guía: ————\n⚠️ Importante: mantente pendiente de las notificaciones y actualizaciones." },
      { id: "9", title: "Horario tienda", color: "default", size: "normal", tags: ["info"], content: "🕒 Horario de atención\n\nLun–Vie: 9:00 a 19:00\nSáb: 10:00 a 17:00\nDom: cerrado\n\n📍 Cra 13 #45-67, Bogotá" },
    ]
  }
];

// ============ App ============
function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem("clipboard-data-v2");
      return saved ? JSON.parse(saved) : SEED;
    } catch { return SEED; }
  });
  const [favorites, setFavorites] = useState(() => {
    try { return JSON.parse(localStorage.getItem("clipboard-favs-v2") || "[]"); } catch { return []; }
  });
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState(null); // {sectionIdx, itemIdx, item} or {new: true, sectionIdx}
  const [copiedId, setCopiedId] = useState(null);
  const [toast, setToast] = useState(null);

  // Persist
  useEffect(() => { localStorage.setItem("clipboard-data-v2", JSON.stringify(data)); }, [data]);
  useEffect(() => { localStorage.setItem("clipboard-favs-v2", JSON.stringify(favorites)); }, [favorites]);

  // Apply accent
  useEffect(() => {
    document.documentElement.style.setProperty("--accent", tweaks.accent);
  }, [tweaks.accent]);

  // Apply font
  useEffect(() => {
    document.documentElement.style.setProperty("--display-font", `'${tweaks.headlineFont}', sans-serif`);
  }, [tweaks.headlineFont]);

  const handleCopy = async (item) => {
    try {
      await navigator.clipboard.writeText(item.content);
    } catch (e) {
      const ta = document.createElement("textarea");
      ta.value = item.content; document.body.appendChild(ta);
      ta.select(); document.execCommand("copy"); document.body.removeChild(ta);
    }
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 1200);
    setToast({ msg: `Copiado: ${item.title}`, ts: Date.now() });
    setTimeout(() => setToast(null), 1800);
  };

  const toggleFav = (id) => {
    setFavorites((f) => f.includes(id) ? f.filter(x => x !== id) : [...f, id]);
  };

  const saveItem = (newItem, ctx) => {
    setData(d => {
      const nd = d.map(s => ({ ...s, items: [...s.items] }));
      if (ctx.new) {
        const targetIdx = ctx.sectionIdx ?? 0;
        const idStr = "n" + Date.now();
        nd[targetIdx].items.push({ ...newItem, id: idStr });
      } else {
        nd[ctx.sectionIdx].items[ctx.itemIdx] = { ...nd[ctx.sectionIdx].items[ctx.itemIdx], ...newItem };
      }
      return nd;
    });
  };

  const deleteItem = (ctx) => {
    setData(d => {
      const nd = d.map(s => ({ ...s, items: [...s.items] }));
      nd[ctx.sectionIdx].items.splice(ctx.itemIdx, 1);
      return nd;
    });
  };

  // Search filter
  const filteredData = useMemo(() => {
    if (!search.trim()) return data;
    const q = search.toLowerCase();
    return data.map(s => ({
      ...s,
      items: s.items.filter(it =>
        it.title.toLowerCase().includes(q) ||
        it.content.toLowerCase().includes(q) ||
        (it.tags || []).some(t => t.toLowerCase().includes(q))
      )
    })).filter(s => s.items.length > 0);
  }, [data, search]);

  const totalItems = data.reduce((acc, s) => acc + s.items.length, 0);

  return (
    <>
      <TopBar search={search} setSearch={setSearch} />
      <Hero totalItems={totalItems} sectionsCount={data.length} favCount={favorites.length} headlineFont={tweaks.headlineFont} />

      <div className="grid-wrap">
        {filteredData.map((section, sIdx) => (
          <div key={section.section}>
            <div className="section-head">
              <h2>{section.section} <span className="pill">{section.items.length}</span></h2>
              <button className="add" onClick={() => setEditing({ new: true, sectionIdx: data.findIndex(x => x.section === section.section) })}>
                <Icon.Plus /> Añadir
              </button>
            </div>
            <div className="bento">
              {section.items.map((item, iIdx) => {
                const realSectionIdx = data.findIndex(x => x.section === section.section);
                const realIdx = data[realSectionIdx].items.findIndex(x => x.id === item.id);
                return (
                  <ClipCard
                    key={item.id}
                    item={item}
                    isFav={favorites.includes(item.id)}
                    isCopied={copiedId === item.id}
                    onCopy={() => handleCopy(item)}
                    onFav={() => toggleFav(item.id)}
                    onEdit={() => setEditing({ sectionIdx: realSectionIdx, itemIdx: realIdx, item })}
                    showShapes={tweaks.showShapes}
                  />
                );
              })}
              {sIdx === 0 && !search && (
                <div className="add-card" onClick={() => setEditing({ new: true, sectionIdx: 0 })}>
                  <div className="plus"><Icon.Plus /></div>
                  <div style={{ fontSize: 13, fontWeight: 500 }}>Crear nuevo bloque</div>
                </div>
              )}
            </div>
          </div>
        ))}
        {filteredData.length === 0 && (
          <div style={{ textAlign: "center", padding: "80px 20px", color: "var(--text-dim)" }}>
            <div className="display" style={{ fontSize: 32, color: "white", marginBottom: 8 }}>Sin resultados</div>
            <div>Intenta con otra palabra o crea un nuevo bloque.</div>
          </div>
        )}
      </div>

      {editing && (
        <Editor
          ctx={editing}
          onSave={(item) => { saveItem(item, editing); setEditing(null); }}
          onDelete={() => { deleteItem(editing); setEditing(null); }}
          onClose={() => setEditing(null)}
          sections={data.map(s => s.section)}
        />
      )}

      {toast && (
        <div className="toast-wrap">
          <div className="toast"><span className="dot"></span>{toast.msg}</div>
        </div>
      )}

      <TweaksPanel title="Tweaks" defaultPosition={{ right: 24, top: 90 }}>
        <TweakSection title="Visual">
          <TweakColor label="Acento principal" value={tweaks.accent} onChange={(v) => setTweak("accent", v)} />
          <TweakRadio label="Tipografía display" value={tweaks.headlineFont} onChange={(v) => setTweak("headlineFont", v)}
            options={[
              { value: "Space Grotesk", label: "Grotesk" },
              { value: "Inter", label: "Inter" },
              { value: "JetBrains Mono", label: "Mono" }
            ]} />
          <TweakRadio label="Densidad" value={tweaks.density} onChange={(v) => setTweak("density", v)}
            options={[
              { value: "compact", label: "Compacta" },
              { value: "comfy", label: "Cómoda" },
              { value: "spacious", label: "Amplia" },
            ]} />
          <TweakToggle label="Formas decorativas" value={tweaks.showShapes} onChange={(v) => setTweak("showShapes", v)} />
        </TweakSection>
        <TweakSection title="Datos">
          <TweakButton onClick={() => { if (confirm("¿Restaurar datos de ejemplo?")) { localStorage.removeItem("clipboard-data-v2"); location.reload(); } }}>
            Restaurar datos de ejemplo
          </TweakButton>
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

// ============ Top bar ============
function TopBar({ search, setSearch }) {
  return (
    <div className="topbar">
      <div className="brand">
        <div className="brand-mark">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2"/>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
          </svg>
        </div>
        copiar.online
      </div>
      <div className="search">
        <Icon.Search style={{ color: "var(--text-dim)" }} />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar bloques, etiquetas, contenido…" />
        <span className="kbd">⌘K</span>
      </div>
      <div className="nav">
        <a href="#">Mis bloques</a>
        <a href="#">Compartidos</a>
        <a href="#">Plantillas</a>
        <a href="#" style={{ color: "white", background: "var(--accent)" }}>Ingresar</a>
      </div>
    </div>
  );
}

// ============ Hero ============
function Hero({ totalItems, sectionsCount, favCount, headlineFont }) {
  return (
    <div className="hero">
      <h1 style={{ fontFamily: `'${headlineFont}', sans-serif` }}>
        Copia. Pega.<br />
        <em>Sin fricción.</em> <span className="accent">→</span>
      </h1>
      <div className="hero-meta">
        <span className="pill"><span style={{ width: 6, height: 6, borderRadius: 999, background: "var(--mint)" }}></span>Sincronizado</span>
        <span className="pill">Tu portapapeles · público</span>
        <span className="pill">v 4.2</span>
      </div>
      <div className="stats-row">
        <div className="stat"><strong>{totalItems}</strong>Bloques guardados</div>
        <div className="stat"><strong>{sectionsCount}</strong>Categorías</div>
        <div className="stat"><strong>{favCount}</strong>Favoritos</div>
        <div className="stat"><strong>∞</strong>Sincronización</div>
      </div>
    </div>
  );
}

// ============ Clip card ============
function ClipCard({ item, isFav, isCopied, onCopy, onFav, onEdit, showShapes }) {
  const sizeClass = item.size === "feature" ? "feature" : item.size === "wide" ? "wide" : item.size === "half" ? "half" : item.size === "tall" ? "tall" : "";
  const colorClass = item.color === "default" ? "" : item.color;
  const isLight = ["yellow", "white", "mint", "pink"].includes(item.color);
  const arrowColor = isLight ? "dark" : "";

  return (
    <div className={`clip-card card ${sizeClass} ${colorClass} ${isCopied ? "copied" : ""}`} onClick={onCopy}>
      <div className="card-tl">
        <span className="card-title">{item.title}</span>
        <div style={{ display: "flex", gap: 6 }}>
          <button className={`icon-btn ${arrowColor}`} onClick={(e) => { e.stopPropagation(); onFav(); }} title="Favorito">
            <Icon.Star filled={isFav} />
          </button>
          <button className={`icon-btn ${arrowColor}`} onClick={(e) => { e.stopPropagation(); onEdit(); }} title="Editar">
            <Icon.Edit />
          </button>
        </div>
      </div>

      {item.size === "feature" && showShapes && (
        <>
          <div className="deco dot"></div>
          <div className="deco sq"></div>
          <div className="deco tri"></div>
        </>
      )}

      <div className="clip-headline">{previewHeadline(item)}</div>
      <div className="clip-preview">{item.content}</div>

      <div className="card-bl">
        <div className="clip-meta-row">
          {(item.tags || []).map(t => <span key={t} className="clip-tag">{t}</span>)}
        </div>
        <button className={`icon-btn ${arrowColor}`} onClick={(e) => { e.stopPropagation(); onCopy(); }} title="Copiar">
          {item.size === "feature" ? <Icon.Down /> : <Icon.Arrow />}
        </button>
      </div>

      <div className="copy-burst">
        <span className="check"><Icon.Check /></span>
        ¡Copiado!
      </div>
    </div>
  );
}

function previewHeadline(item) {
  if (item.size === "feature") {
    const firstSentence = item.content.split(/[.\n]/)[0];
    return firstSentence.length > 80 ? firstSentence.slice(0, 80) + "…" : firstSentence;
  }
  return null;
}

// ============ Editor modal ============
function Editor({ ctx, onSave, onDelete, onClose, sections }) {
  const seed = ctx.new
    ? { title: "", content: "", color: "default", size: "normal", tags: [] }
    : ctx.item;
  const [title, setTitle] = useState(seed.title);
  const [content, setContent] = useState(seed.content);
  const [color, setColor] = useState(seed.color);
  const [size, setSize] = useState(seed.size);
  const [tagsStr, setTagsStr] = useState((seed.tags || []).join(", "));

  const colors = [
    { id: "default", v: "#161618" },
    { id: "blue", v: "#3D2BFF" },
    { id: "yellow", v: "#F4F378" },
    { id: "white", v: "#FFFFFF" },
    { id: "mint", v: "#C9F27E" },
    { id: "pink", v: "#FF87C8" },
  ];

  const submit = () => {
    if (!title.trim() || !content.trim()) { alert("Falta título o contenido"); return; }
    onSave({
      title: title.trim(),
      content: content.trim(),
      color, size,
      tags: tagsStr.split(",").map(t => t.trim()).filter(Boolean),
    });
  };

  return (
    <div className="modal-bg" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3>{ctx.new ? "Nuevo bloque" : "Editar bloque"}</h3>
        <p className="sub">Crea un atajo de copy-paste con título, contenido y estilo.</p>

        <label>Título</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Ej. Saludo cliente" />

        <label>Contenido</label>
        <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Escribe el texto a copiar…" />

        <label>Etiquetas (separadas por coma)</label>
        <input value={tagsStr} onChange={(e) => setTagsStr(e.target.value)} placeholder="ventas, es, popular" />

        <label>Color</label>
        <div className="color-row">
          {colors.map(c => (
            <div key={c.id}
              className={`color-swatch ${color === c.id ? "active" : ""}`}
              style={{ background: c.v, border: c.id === "default" ? "2px solid rgba(255,255,255,0.15)" : undefined }}
              onClick={() => setColor(c.id)} />
          ))}
        </div>

        <label>Tamaño</label>
        <select value={size} onChange={(e) => setSize(e.target.value)}>
          <option value="normal">Normal · 1 columna</option>
          <option value="half">Mediano · ½ ancho</option>
          <option value="wide">Ancho · ⅔ ancho</option>
          <option value="feature">Destacado · grande con formas</option>
        </select>

        <div className="modal-actions">
          {!ctx.new && <button className="btn btn-danger" onClick={() => { if (confirm("¿Eliminar bloque?")) onDelete(); }}>Eliminar</button>}
          <div style={{ flex: 1 }}></div>
          <button className="btn btn-ghost" onClick={onClose}>Cancelar</button>
          <button className="btn btn-primary" onClick={submit}>Guardar</button>
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("app")).render(<App />);
