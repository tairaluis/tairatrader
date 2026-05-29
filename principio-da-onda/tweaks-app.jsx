// tweaks-app.jsx — painel de ajustes da página de vendas
const { useEffect } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#21E6E6",
  "displayFont": "Sora",
  "bgStyle": "preto",
  "glow": 1,
  "showSticky": true
}/*EDITMODE-END*/;

const ACCENTS = {
  "#21E6E6": "#0FB9C4", // ciano
  "#4D7CFE": "#2D5BE0", // azul
  "#19E59A": "#0FB87A", // verde
  "#A78BFA": "#7C5CF0"  // violeta
};

const FONT_LINKS = {
  "Sora": "Sora:wght@400;600;700;800",
  "Space Grotesk": "Space+Grotesk:wght@400;500;600;700",
  "Chakra Petch": "Chakra+Petch:wght@500;600;700"
};

function hexToRgb(h) {
  const n = parseInt(h.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // load chosen display font once
  useEffect(() => {
    const id = "dyn-display-font";
    let link = document.getElementById(id);
    if (!link) { link = document.createElement("link"); link.id = id; link.rel = "stylesheet"; document.head.appendChild(link); }
    link.href = "https://fonts.googleapis.com/css2?family=" + FONT_LINKS[t.displayFont] + "&display=swap";
  }, [t.displayFont]);

  // apply css variables
  useEffect(() => {
    const r = document.documentElement.style;
    const deep = ACCENTS[t.accent] || "#0FB9C4";
    const [R, G, B] = hexToRgb(t.accent);
    r.setProperty("--acc", t.accent);
    r.setProperty("--acc-deep", deep);
    r.setProperty("--f-display", `'${t.displayFont}', sans-serif`);
    const g = t.glow;
    r.setProperty("--glow", `0 0 ${28 * g}px rgba(${R},${G},${B},${0.45 * g})`);
    r.setProperty("--glow-soft", `0 0 ${60 * g}px rgba(${R},${G},${B},${0.18 * g})`);

    if (t.bgStyle === "navy") {
      r.setProperty("--bg", "#070D18");
      r.setProperty("--bg-2", "#0A1322");
      r.setProperty("--bg-3", "#0E1A2E");
      r.setProperty("--card", "#102036");
      r.setProperty("--card-2", "#142948");
    } else {
      r.setProperty("--bg", "#070A10");
      r.setProperty("--bg-2", "#0B111B");
      r.setProperty("--bg-3", "#0F1826");
      r.setProperty("--card", "#111C2C");
      r.setProperty("--card-2", "#14233A");
    }
  }, [t.accent, t.displayFont, t.glow, t.bgStyle]);

  useEffect(() => {
    const el = document.querySelector(".sticky-cta");
    if (el && window.innerWidth <= 680) el.style.display = t.showSticky ? "block" : "none";
  }, [t.showSticky]);

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Cor de destaque" />
      <TweakColor label="Néon" value={t.accent}
        options={["#21E6E6", "#4D7CFE", "#19E59A", "#A78BFA"]}
        onChange={(v) => setTweak("accent", v)} />
      <TweakSlider label="Intensidade do brilho" value={t.glow} min={0} max={1.6} step={0.1}
        onChange={(v) => setTweak("glow", v)} />

      <TweakSection label="Tipografia & fundo" />
      <TweakSelect label="Fonte dos títulos" value={t.displayFont}
        options={["Sora", "Space Grotesk", "Chakra Petch"]}
        onChange={(v) => setTweak("displayFont", v)} />
      <TweakRadio label="Fundo" value={t.bgStyle}
        options={["preto", "navy"]}
        onChange={(v) => setTweak("bgStyle", v)} />

      <TweakSection label="Mobile" />
      <TweakToggle label="Botão fixo no celular" value={t.showSticky}
        onChange={(v) => setTweak("showSticky", v)} />
    </TweaksPanel>
  );
}

ReactDOM.createRoot(document.getElementById("tweaks-root")).render(<App />);
