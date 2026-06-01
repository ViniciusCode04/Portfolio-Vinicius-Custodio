import React from "react";
import type { CSSProperties, RefObject } from "react";
import {
  useState, useEffect, useRef, useCallback,
  useMemo, memo, createContext, useContext,
} from "react";

// ─── PALETTE ──────────────────────────────────────────────────────────────────
const C = {
  bg:      "#03050C",
  surface: "#070A14",
  card:    "#0A0E1A",
  cardHov: "#0D1220",
  border:  "rgba(255,255,255,0.06)",
  text:    "#DCE8F8",
  muted:   "rgba(220,232,248,0.45)",
  faint:   "rgba(220,232,248,0.18)",
  cyan:    "#22D3EE",
  indigo:  "#818CF8",
  emerald: "#34D399",
  amber:   "#FBBF24",
  rose:    "#FB7185",
  violet:  "#A78BFA",
  grid:    "rgba(34,211,238,0.022)",
};

// ─── PROFILE ──────────────────────────────────────────────────────────────────
const profile = {
  name:     "Vinicius Custódio",
  handle:   "viniciuscustodiopavan1",
  role:     "Software Engineer",
  email:    "custodiovinicius22@gmail.com",
  github:   "https://github.com/ViniciusCode04",
  linkedin: "https://www.linkedin.com/in/viniciuscustodiopavan1",
  phone:    "(11) 97826-1271",
};

// ─── DATA ─────────────────────────────────────────────────────────────────────
const EXPERIENCE = [
  {
    company: "Recovery — Grupo Itaú",
    role:    "Estagiário em Engenharia de Software",
    period:  "06/2025 — 06/2026",
    badge:   "LIVE",
    color:   C.cyan,
    bullets: [
      "Migração de módulos de sistema legado → arquitetura de microsserviços",
      "Pipeline ETL com Azure Data Factory · múltiplas fontes · triggers agendados",
      "Automação de fluxos com Azure Logic Apps · integração com APIs externas",
      "Microsserviço de base veicular com +1M de registros — queries otimizadas",
      "CI/CD com Azure DevOps · squad ágil Scrum/Kanban",
    ],
    tags: ["Pipeline ETL","Azure Data Factory","Logic Apps","Microsserviços","SQL Server","C#/.NET","Scrum"],
  },
  {
    company: "Azurion — Plataforma Educacional",
    role:    "Desenvolvedor Full Stack",
    period:  "2024",
    badge:   "TCC",
    color:   C.indigo,
    bullets: [
      "Sistema educacional com IA integrada via OpenAI GPT-3",
      "Recomendação personalizada de trilhas de aprendizado por aluno",
      "Interface projetada no Figma · backend em C#",
    ],
    tags: ["C#","OpenAI GPT-3","Figma","SQL Server"],
  },
  {
    company: "Instituições Estaduais — SP",
    role:    "Monitor de Programação Python",
    period:  "2023",
    badge:   "EDU",
    color:   C.emerald,
    bullets: [
      "Ensino de fundamentos de Python para alunos do ensino técnico",
      "Lógica, estruturas de controle, funções e resolução de problemas",
    ],
    tags: ["Python","Ensino","Lógica"],
  },
];

const EDUCATION = [
  { school:"UNICID",          degree:"Análise e Desenvolvimento de Sistemas", period:"2025–2026", status:"Cursando",  color:C.cyan },
  { school:"Etec São Mateus", degree:"Técnico em ADS + Ensino Médio",         period:"2022–2024", status:"Concluído", color:C.emerald },
];

const SKILLS = [
  { label:"Backend",      color:C.cyan,    items:["C#/.NET 8","ASP.NET Core","APIs REST","Clean Architecture","RabbitMQ","MongoDB","SQL Server"] },
  { label:"Cloud & Azure",color:C.indigo,  items:["Azure Cloud","Azure Data Factory","Logic Apps","App Service","Key Vault","Application Insights"] },
  { label:"Frontend",     color:C.emerald, items:["React","TypeScript","Angular","HTML/CSS","JavaScript"] },
  { label:"DevOps",       color:C.amber,   items:["Docker","Git","Azure DevOps","CI/CD","Scrum","Kanban"] },
];

// Eventra deep-dive layers
const EVENTRA_ARCH = [
  {
    name:"ASP.NET Core API",
    icon:"◈",
    color:C.indigo,
    role:"Gateway",
    desc:"API REST com Clean Architecture (Domain / Application / Infrastructure). Valida, autentica via JWT e publica jobs na fila.",
    details:["Minimal APIs + Controllers híbridos","Clean Architecture 4 camadas","JWT Bearer + refresh token"],
    metric:"< 8ms",
    metricLabel:"Resposta média",
  },
  {
    name:"RabbitMQ",
    icon:"⬡",
    color:C.amber,
    role:"Mensageria",
    desc:"Exchange Direct com dead-letter queue e retry automático. Garante desacoplamento total entre produtores e workers.",
    details:["Exchange Direct + DLQ","Prefetch count para controle de concorrência","Retry exponencial até 3 tentativas"],
    metric:"~2k",
    metricLabel:"Msgs/min",
  },
  {
    name:"Workers .NET",
    icon:"⚙",
    color:C.cyan,
    role:"Processamento",
    desc:"BackgroundService escaláveis horizontalmente via Docker. Consomem filas, processam jobs e atualizam status de forma atômica.",
    details:["IHostedService + BackgroundService","Escalabilidade horizontal via replicas Docker","Estado atômico no MongoDB com transações"],
    metric:"×N",
    metricLabel:"Escalável",
  },
  {
    name:"MongoDB",
    icon:"🍃",
    color:C.emerald,
    role:"Persistência",
    desc:"NoSQL para jobs, histórico de execuções e estados. Schema flexível ideal para eventos variados com TTL automático.",
    details:["Coleções por tipo de job","Índices compostos em status + createdAt","TTL index para expiração automática de logs"],
    metric:"O(1)",
    metricLabel:"Read by id",
  },
  {
    name:"SendGrid",
    icon:"✉",
    color:C.violet,
    role:"Notificações",
    desc:"Envio transacional de e-mails ao concluir ou falhar jobs. Templates dinâmicos por tipo de evento com retry em falha.",
    details:["SDK oficial + templates dinâmicos","Retry automático em falha de entrega","Webhook de status para tracking"],
    metric:"99.5%",
    metricLabel:"Delivery rate",
  },
  {
    name:"React Dashboard",
    icon:"⚛",
    color:"#61DAFB",
    role:"Frontend",
    desc:"Painel em tempo real com TanStack Query (polling 3s), gráficos de status por tipo, badges animados e filtros.",
    details:["TanStack Query · polling 3s","Recharts para visualização de status","Tailwind + glassmorphism"],
    metric:"3s",
    metricLabel:"Refresh rate",
  },
];

// ─── PROJECT DATA (compound-ready) ───────────────────────────────────────────
const PROJECTS = [
  {
    id:          "eventra",
    title:       "Eventra",
    subtitle:    "Event-Driven Platform",
    description: "Sistema distribuído de gestão de eventos com arquitetura orientada a mensagens. RabbitMQ, workers .NET escaláveis, MongoDB, notificações SendGrid e dashboard React com polling em tempo real.",
    tags:        [".NET 8","RabbitMQ","MongoDB","React","Docker","SendGrid","JWT"],
    color:       C.cyan,
    link:        "https://eventra-frontend-259f.onrender.com/",
    featured:    true,
    hasDeepDive: true,
    metrics:     [{ v:"99.9%",label:"Uptime" },{ v:"<8ms",label:"P50 API" },{ v:"Live",label:"Status" }],
  },
  {
    id:          "pipeline",
    title:       "Pipeline ETL",
    subtitle:    "Azure Data Engineering",
    description: "Pipeline de ingestão e transformação de dados com Azure Data Factory. Múltiplas fontes, triggers agendados, monitoramento em tempo real e Logic Apps para alertas.",
    tags:        ["Azure Data Factory","Azure Blob","SQL Server","Logic Apps"],
    color:       C.indigo,
    proLabel:    "Produção · Recovery",
    metrics:     [{ v:"1M+",label:"Registros" },{ v:"12/h",label:"Runs" },{ v:"PRD",label:"Env" }],
  },
  {
    id:          "microservices",
    title:       "Microsserviços .NET",
    subtitle:    "Distributed Architecture",
    description: "Migração de sistema legado para microsserviços com API Gateway, JWT, comunicação assíncrona e CI/CD no Azure DevOps.",
    tags:        [".NET 8","RabbitMQ","Docker","JWT","API Gateway","Azure DevOps"],
    color:       C.emerald,
    proLabel:    "Produção · Recovery",
    metrics:     [{ v:"4",label:"Serviços" },{ v:"JWT",label:"Auth" },{ v:"K8s",label:"Infra" }],
  },
  {
    id:          "azurion",
    title:       "Azurion",
    subtitle:    "AI Educational Platform",
    description: "Plataforma educacional com IA via OpenAI GPT-3 para identificação de déficits, recomendação de trilhas personalizadas e exercícios adaptativos.",
    tags:        ["C#",".NET","OpenAI GPT-3","Angular","SQL Server","Figma"],
    color:       C.amber,
    metrics:     [{ v:"GPT-3",label:"Modelo" },{ v:"2024",label:"Ano" },{ v:"TCC",label:"Tipo" }],
  },
];

// ─── PROJECT CONTEXT (Compound pattern) ──────────────────────────────────────
const ProjectCtx = createContext(null);

function ProjectProvider({ children }) {
  const [activeId,    setActiveId]    = useState(null);
  const [deepDiveId,  setDeepDiveId]  = useState(null);

  const toggle    = useCallback(id => setActiveId(p => p === id ? null : id), []);
  const openDeep  = useCallback(id => { setDeepDiveId(id); document.body.style.overflow = "hidden"; }, []);
  const closeDeep = useCallback(() => { setDeepDiveId(null); document.body.style.overflow = ""; }, []);

  const value = useMemo(() => ({ activeId, toggle, deepDiveId, openDeep, closeDeep }), [activeId, toggle, deepDiveId, openDeep, closeDeep]);
  return <ProjectCtx.Provider value={value}>{children}</ProjectCtx.Provider>;
}

function useProjectCtx() {
  const ctx = useContext(ProjectCtx);
  if (!ctx) throw new Error("useProjectCtx must be inside <ProjectProvider>");
  return ctx;
}

// ─── CANVAS PARTICLE FIELD ────────────────────────────────────────────────────
const ParticleCanvas = memo(function ParticleCanvas() {
  const canvasRef = useRef(null);
  const mouseRef  = useRef({ x: -9999, y: -9999 });
  const frameRef  = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W, H;
    const N = 70;
    const pts = [];

    const resize = () => {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };
    const init = () => {
      pts.length = 0;
      for (let i = 0; i < N; i++) pts.push({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - .5) * .28, vy: (Math.random() - .5) * .28,
        r:  Math.random() * 1.4 + .4,
        a:  Math.random() * .45 + .1,
      });
    };
    resize(); init();
    const ro = new ResizeObserver(() => { resize(); init(); });
    ro.observe(canvas);

    const onMove  = e => { const r = canvas.getBoundingClientRect(); mouseRef.current = { x: e.clientX - r.left, y: e.clientY - r.top }; };
    const onLeave = () => { mouseRef.current = { x: -9999, y: -9999 }; };
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const { x: mx, y: my } = mouseRef.current;
      pts.forEach(p => {
        const dx = mx - p.x, dy = my - p.y;
        const d  = Math.hypot(dx, dy);
        if (d < 90) { p.vx += dx / d * .012; p.vy += dy / d * .012; }
        p.vx *= .992; p.vy *= .992;
        p.x  = (p.x + p.vx + W) % W;
        p.y  = (p.y + p.vy + H) % H;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(34,211,238,${p.a})`;
        ctx.fill();
      });
      for (let i = 0; i < pts.length; i++)
        for (let j = i + 1; j < pts.length; j++) {
          const a = pts[i], b = pts[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 110) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(34,211,238,${(1 - d / 110) * .14})`;
            ctx.lineWidth   = .5;
            ctx.stroke();
          }
        }
      frameRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(frameRef.current);
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
      ro.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} style={{ position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"all", opacity:.65 }} />;
});

// ─── HOOKS ────────────────────────────────────────────────────────────────────
function useInView(threshold = .12): [RefObject<HTMLDivElement>, boolean] {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { threshold });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, [threshold]);
  return [ref, v];
}

function useSpring(delay = 0): [RefObject<HTMLDivElement>, CSSProperties] {
  const [ref, v] = useInView();
  return [ref, {
    opacity:   v ? 1 : 0,
    transform: v ? "translateY(0px) scale(1)" : "translateY(26px) scale(.97)",
    transition:`opacity .6s cubic-bezier(.16,1,.3,1) ${delay}s, transform .6s cubic-bezier(.16,1,.3,1) ${delay}s`,
  }];
}

function useTypewriter(words: string[], speed = 72) {
  const [disp, setDisp]       = useState("");
  const [wi, setWi]           = useState(0);
  const [ci, setCi]           = useState(0);
  const [del, setDel]         = useState(false);
  useEffect(() => {
    const w = words[wi % words.length];
    const t = setTimeout(() => {
      if (!del) {
        setDisp(w.slice(0, ci + 1));
        if (ci + 1 === w.length) setTimeout(() => setDel(true), 2000);
        else setCi(c => c + 1);
      } else {
        setDisp(w.slice(0, ci - 1));
        if (ci - 1 === 0) { setDel(false); setWi(x => x + 1); setCi(0); }
        else setCi(c => c - 1);
      }
    }, del ? speed / 2.5 : speed);
    return () => clearTimeout(t);
  }, [disp, del, ci, wi, words, speed]);
  return disp;
}

// ─── SMALL ATOMS ─────────────────────────────────────────────────────────────
function Spring({ children, delay = 0, style: extra = {} }: { children: React.ReactNode; delay?: number; style?: CSSProperties }) {
  const [ref, style] = useSpring(delay);
  return <div ref={ref} style={{ ...style, ...extra }}>{children}</div>;
}

const Tag = memo(function Tag({ children, color = C.cyan }: { children: React.ReactNode; color?: string }) {
  return (
    <span style={{
      fontFamily:"'DM Mono',monospace", fontSize:".6rem",
      padding:"3px 9px", borderRadius:999,
      border:`1px solid ${color}28`, color:`${color}bb`,
      background:`${color}0c`, display:"inline-block",
      letterSpacing:".03em", lineHeight:1.7,
    }}>{children}</span>
  );
});

function Dot({ color = C.emerald, ping }: { color?: string; ping?: boolean }) {
  return (
    <span style={{ position:"relative", display:"inline-flex", alignItems:"center", justifyContent:"center", width:10, height:10 }}>
      {ping && <span style={{ position:"absolute", width:10, height:10, borderRadius:"50%", background:color, animation:"ping 2s ease-out infinite", opacity:.4 }} />}
      <span style={{ width:7, height:7, borderRadius:"50%", background:color, boxShadow:`0 0 7px ${color}` }} />
    </span>
  );
}

// ─── COMPOUND PROJECT CARD ────────────────────────────────────────────────────
// ProjectCard.Header
const PCHeader = memo(function PCHeader({ title, subtitle, color, badge, isPro, proLabel, isLive, link, isActive, onToggle, onDeepDive }: {
  title: string; subtitle: string; color: string; badge?: string; isPro?: boolean; proLabel?: string;
  isLive?: boolean; link?: string; isActive: boolean; onToggle: () => void; onDeepDive?: (() => void) | null;
}) {
  return (
    <div style={{ padding:"20px 22px" }}>
      {/* Top row */}
      <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:12, marginBottom:14 }}>
        <div style={{ display:"flex", alignItems:"center", gap:11 }}>
          <span style={{ width:9, height:9, borderRadius:"50%", background:color, boxShadow:`0 0 10px ${color}`, flexShrink:0 }} />
          <div>
            <div style={{ fontFamily:"'Syne',sans-serif", fontSize:"1.05rem", fontWeight:700, letterSpacing:"-.025em", color:C.text, lineHeight:1.2 }}>{title}</div>
            <div style={{ fontFamily:"'DM Mono',monospace", fontSize:".65rem", color:C.faint, marginTop:3, letterSpacing:".03em" }}>{subtitle}</div>
          </div>
        </div>
        <div style={{ display:"flex", gap:6, alignItems:"center", flexShrink:0 }}>
          {isPro && (
            <span style={{ fontFamily:"'DM Mono',monospace", fontSize:".56rem", padding:"3px 8px", borderRadius:999, border:`1px solid ${C.cyan}35`, color:C.cyan, background:`${C.cyan}0a`, letterSpacing:".04em" }}>
              {proLabel}
            </span>
          )}
          {isLive && (
            <a href={link} target="_blank" rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              style={{
                display:"inline-flex", alignItems:"center", gap:5,
                fontFamily:"'DM Mono',monospace", fontSize:".62rem",
                padding:"5px 13px", borderRadius:999,
                border:`1px solid ${color}50`, background:`${color}12`,
                color, textDecoration:"none", fontWeight:600, letterSpacing:".04em",
                transition:"all .2s", boxShadow:`0 0 14px ${color}20`,
              }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow=`0 0 22px ${color}40`; e.currentTarget.style.background=`${color}20`; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow=`0 0 14px ${color}20`; e.currentTarget.style.background=`${color}12`; }}
            >
              <Dot color={color} ping /> LIVE ↗
            </a>
          )}
        </div>
      </div>

      {/* Action buttons row */}
      <div style={{ display:"flex", gap:8, alignItems:"center" }}>
        {/* Deep-dive CTA — explicit, big, unmissable */}
        {onDeepDive && (
          <button
            onClick={e => { e.stopPropagation(); onDeepDive(); }}
            style={{
              display:"inline-flex", alignItems:"center", gap:7,
              fontFamily:"'DM Mono',monospace", fontSize:".72rem", fontWeight:600,
              padding:"9px 18px", borderRadius:9,
              background:`linear-gradient(135deg, ${color}22, ${color}0a)`,
              border:`1px solid ${color}55`,
              color, cursor:"pointer",
              transition:"all .22s cubic-bezier(.16,1,.3,1)",
              letterSpacing:".04em",
              boxShadow:`0 0 18px ${color}18`,
            }}
            onMouseEnter={e => { e.currentTarget.style.background=`linear-gradient(135deg,${color}35,${color}18)`; e.currentTarget.style.boxShadow=`0 0 28px ${color}35`; e.currentTarget.style.transform="translateY(-1px)"; }}
            onMouseLeave={e => { e.currentTarget.style.background=`linear-gradient(135deg,${color}22,${color}0a)`; e.currentTarget.style.boxShadow=`0 0 18px ${color}18`; e.currentTarget.style.transform="none"; }}
          >
            <span style={{ fontSize:".8rem" }}>◈</span>
            Ver Arquitetura
            <span style={{ opacity:.7 }}>→</span>
          </button>
        )}

        {/* Expand toggle */}
        <button
          onClick={e => { e.stopPropagation(); onToggle(); }}
          style={{
            display:"inline-flex", alignItems:"center", gap:6,
            fontFamily:"'DM Mono',monospace", fontSize:".65rem",
            padding:"9px 14px", borderRadius:9,
            background:"rgba(255,255,255,.03)", border:`1px solid ${C.border}`,
            color:C.muted, cursor:"pointer",
            transition:"all .2s",
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor=`${color}35`; e.currentTarget.style.color=C.text; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor=C.border; e.currentTarget.style.color=C.muted; }}
        >
          {isActive ? "Recolher" : "Detalhes"}
          <span style={{ transition:"transform .35s cubic-bezier(.16,1,.3,1)", transform:isActive?"rotate(180deg)":"none", display:"inline-block", fontSize:".7rem" }}>↓</span>
        </button>
      </div>
    </div>
  );
});

// ProjectCard.Content
const PCContent = memo(function PCContent({ children, isActive }: { children: React.ReactNode; isActive: boolean }) {
  return (
    <div style={{
      overflow:"hidden",
      maxHeight: isActive ? 600 : 0,
      transition:"max-height .55s cubic-bezier(.16,1,.3,1)",
    }}>
      <div style={{
        padding:"0 22px 22px",
        borderTop:`1px solid ${C.border}`,
        opacity: isActive ? 1 : 0,
        transform: isActive ? "translateY(0)" : "translateY(10px)",
        transition:"opacity .4s ease .1s, transform .4s cubic-bezier(.16,1,.3,1) .1s",
      }}>
        {children}
      </div>
    </div>
  );
});

// ProjectCard.TechGrid
const PCTechGrid = memo(function PCTechGrid({ stacks, color }: { stacks: string[]; color: string }) {
  return (
    <div style={{ marginTop:16 }}>
      <div style={{ fontFamily:"'DM Mono',monospace", fontSize:".58rem", color:C.faint, letterSpacing:".1em", textTransform:"uppercase", marginBottom:8 }}>// stack</div>
      <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
        {stacks.map(s => <Tag key={s} color={color}>{s}</Tag>)}
      </div>
    </div>
  );
});

// ProjectCard.Details
const PCDetails = memo(function PCDetails({ description }: { description: string }) {
  return (
    <p style={{ marginTop:14, fontSize:".83rem", color:C.muted, lineHeight:1.75 }}>{description}</p>
  );
});

// ProjectCard.Metrics
const PCMetrics = memo(function PCMetrics({ items, color }: { items: { v: string; label: string }[]; color: string }) {
  return (
    <div style={{ display:"flex", gap:8, marginTop:16 }}>
      {items.map(m => (
        <div key={m.label} style={{
          flex:1, background:`${color}06`, border:`1px solid ${color}18`,
          borderRadius:9, padding:"9px 10px", textAlign:"center",
        }}>
          <span style={{ display:"block", fontFamily:"'DM Mono',monospace", fontWeight:600, fontSize:".95rem", color, letterSpacing:"-.01em" }}>{m.v}</span>
          <span style={{ display:"block", fontFamily:"'DM Mono',monospace", fontSize:".56rem", color:`${color}70`, letterSpacing:".07em", textTransform:"uppercase", marginTop:2 }}>{m.label}</span>
        </div>
      ))}
    </div>
  );
});

// ProjectCard shell — reads from context
function ProjectCard({ project }) {
  const { activeId, toggle, openDeep } = useProjectCtx();
  const isActive = activeId === project.id;
  const [ref, style] = useSpring(0);

  return (
    <div ref={ref} style={style}>
      <div style={{
        background: C.card,
        border:`1px solid ${isActive ? `${project.color}30` : C.border}`,
        borderRadius:16,
        transition:"all .35s cubic-bezier(.16,1,.3,1)",
        transform: isActive ? "translateY(-2px)" : "none",
        boxShadow: isActive ? `0 12px 40px ${project.color}10, inset 0 0 28px ${project.color}04` : "none",
        overflow:"hidden",
        position:"relative",
      }}>
        {/* Corner glow */}
        <div style={{
          position:"absolute", top:0, right:0, width:80, height:80,
          background:`radial-gradient(circle at top right, ${project.color}${isActive?"18":"0a"}, transparent 70%)`,
          pointerEvents:"none", transition:"all .35s",
        }} />

        <PCHeader
          title={project.title}
          subtitle={project.subtitle}
          color={project.color}
          badge={project.badge}
          isPro={!!project.proLabel}
          proLabel={project.proLabel}
          isLive={project.featured}
          link={project.link}
          isActive={isActive}
          onToggle={() => toggle(project.id)}
          onDeepDive={project.hasDeepDive ? () => openDeep(project.id) : null}
        />

        <PCContent isActive={isActive}>
          <PCTechGrid stacks={project.tags} color={project.color} />
          <PCDetails description={project.description} />
          <PCMetrics items={project.metrics} color={project.color} />
        </PCContent>
      </div>
    </div>
  );
}

// ─── EVENTRA DEEP-DIVE MODAL ──────────────────────────────────────────────────
function EventraModal() {
  const { deepDiveId, closeDeep } = useProjectCtx();
  const [active, setActive] = useState(0);
  const isOpen = deepDiveId === "eventra";

  useEffect(() => {
    if (!isOpen) return;
    const fn = e => { if (e.key === "Escape") closeDeep(); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [isOpen, closeDeep]);

  if (!isOpen) return null;
  const tech = EVENTRA_ARCH[active];

  return (
    <div
      onClick={closeDeep}
      style={{
        position:"fixed", inset:0, zIndex:999,
        background:"rgba(2,4,10,.88)",
        backdropFilter:"blur(20px)",
        display:"flex", alignItems:"flex-end", justifyContent:"center",
        padding:0,
        animation:"fadeIn .25s ease",
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width:"100%", maxWidth:620,
          background:"linear-gradient(160deg, #080D1C 0%, #050810 100%)",
          border:`1px solid ${C.cyan}25`,
          borderRadius:"20px 20px 0 0",
          maxHeight:"90vh", overflowY:"auto",
          boxShadow:`0 -20px 60px rgba(34,211,238,.08), inset 0 1px 0 ${C.cyan}20`,
          animation:"slideUp .4s cubic-bezier(.16,1,.3,1)",
        }}
      >
        {/* Handle */}
        <div style={{ display:"flex", justifyContent:"center", padding:"12px 0 6px" }}>
          <div style={{ width:36, height:4, borderRadius:999, background:"rgba(255,255,255,.1)" }} />
        </div>

        {/* Header */}
        <div style={{ padding:"12px 22px 0" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:8 }}>
            <div>
              <div style={{ display:"flex", alignItems:"center", gap:9, marginBottom:3 }}>
                <Dot color={C.cyan} ping />
                <span style={{ fontFamily:"'Syne',sans-serif", fontSize:"1.3rem", fontWeight:700, letterSpacing:"-.03em" }}>Eventra</span>
                <span style={{ fontFamily:"'DM Mono',monospace", fontSize:".6rem", color:C.cyan, border:`1px solid ${C.cyan}35`, padding:"2px 7px", borderRadius:5, letterSpacing:".05em" }}>LIVE</span>
              </div>
              <div style={{ fontFamily:"'DM Mono',monospace", fontSize:".68rem", color:C.faint }}>Event-Driven Platform · Arquitetura Deep-Dive</div>
            </div>
            <button onClick={closeDeep} style={{
              background:"rgba(255,255,255,.06)", border:`1px solid ${C.border}`,
              borderRadius:"50%", width:32, height:32, cursor:"pointer",
              color:C.muted, fontSize:".9rem", display:"flex", alignItems:"center", justifyContent:"center",
              flexShrink:0, transition:"all .2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.background="rgba(255,255,255,.1)"; e.currentTarget.style.color=C.text; }}
              onMouseLeave={e => { e.currentTarget.style.background="rgba(255,255,255,.06)"; e.currentTarget.style.color=C.muted; }}
            >✕</button>
          </div>

          {/* Live link — big, can't miss */}
          <a href="https://eventra-frontend-259f.onrender.com/" target="_blank" rel="noopener noreferrer"
            style={{
              display:"flex", alignItems:"center", justifyContent:"space-between",
              margin:"14px 0 18px",
              padding:"13px 18px", borderRadius:12,
              background:`linear-gradient(135deg, ${C.cyan}18, ${C.cyan}08)`,
              border:`1px solid ${C.cyan}45`,
              color:C.text, textDecoration:"none",
              transition:"all .2s",
              boxShadow:`0 0 20px ${C.cyan}12`,
            }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow=`0 0 30px ${C.cyan}28`; e.currentTarget.style.background=`linear-gradient(135deg,${C.cyan}28,${C.cyan}12)`; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow=`0 0 20px ${C.cyan}12`; e.currentTarget.style.background=`linear-gradient(135deg,${C.cyan}18,${C.cyan}08)`; }}
          >
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              <Dot color={C.cyan} ping />
              <div>
                <div style={{ fontFamily:"'DM Mono',monospace", fontWeight:600, fontSize:".82rem", color:C.cyan }}>Abrir Projeto ao Vivo</div>
                <div style={{ fontFamily:"'DM Mono',monospace", fontSize:".62rem", color:C.faint, marginTop:1 }}>eventra-frontend-259f.onrender.com</div>
              </div>
            </div>
            <span style={{ color:C.cyan, fontSize:"1rem" }}>↗</span>
          </a>

          {/* Architecture summary */}
          <div style={{
            background:"rgba(34,211,238,.04)", border:`1px solid ${C.cyan}18`,
            borderRadius:11, padding:"12px 15px", marginBottom:18,
            fontSize:".8rem", color:C.muted, lineHeight:1.7,
          }}>
            <span style={{ color:C.text, fontWeight:600 }}>Arquitetura orientada a eventos</span> — jobs publicados via{" "}
            <span style={{ color:C.indigo }}>API REST</span>, enfileirados no{" "}
            <span style={{ color:C.amber }}>RabbitMQ</span>, processados por{" "}
            <span style={{ color:C.cyan }}>Workers .NET</span>, persistidos no{" "}
            <span style={{ color:C.emerald }}>MongoDB</span> e notificados via{" "}
            <span style={{ color:C.violet }}>SendGrid</span>.
          </div>
        </div>

        {/* Tech selector pills */}
        <div style={{ padding:"0 22px 12px" }}>
          <div style={{ fontFamily:"'DM Mono',monospace", fontSize:".58rem", color:C.faint, letterSpacing:".09em", textTransform:"uppercase", marginBottom:10 }}>// componentes — selecione para explorar</div>
          <div style={{ display:"flex", flexWrap:"wrap", gap:7 }}>
            {EVENTRA_ARCH.map((t, i) => (
              <button key={i} onClick={() => setActive(i)} style={{
                padding:"7px 13px", borderRadius:9, cursor:"pointer",
                border: active === i ? `1px solid ${t.color}55` : `1px solid ${C.border}`,
                background: active === i ? `${t.color}14` : "rgba(255,255,255,.025)",
                color: active === i ? t.color : C.muted,
                fontSize:".75rem", fontWeight: active === i ? 600 : 400,
                fontFamily:"'DM Mono',monospace",
                transition:"all .18s",
                display:"flex", alignItems:"center", gap:6,
              }}>
                <span>{t.icon}</span>{t.name}
              </button>
            ))}
          </div>
        </div>

        {/* Active tech panel */}
        <div style={{ padding:"0 22px 32px" }}>
          <div style={{
            border:`1px solid ${tech.color}30`,
            borderRadius:14, padding:"18px",
            background:`${tech.color}07`,
            transition:"all .25s",
          }}>
            <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:14 }}>
              <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                <span style={{ fontSize:"1.5rem", lineHeight:1 }}>{tech.icon}</span>
                <div>
                  <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, color:tech.color, fontSize:"1rem", letterSpacing:"-.02em" }}>{tech.name}</div>
                  <div style={{ fontFamily:"'DM Mono',monospace", fontSize:".62rem", color:C.faint }}>{tech.role}</div>
                </div>
              </div>
              <div style={{
                background:`${tech.color}12`, border:`1px solid ${tech.color}30`,
                borderRadius:8, padding:"6px 12px", textAlign:"center",
              }}>
                <div style={{ fontFamily:"'DM Mono',monospace", fontWeight:700, fontSize:".9rem", color:tech.color }}>{tech.metric}</div>
                <div style={{ fontFamily:"'DM Mono',monospace", fontSize:".55rem", color:`${tech.color}70`, letterSpacing:".06em", textTransform:"uppercase" }}>{tech.metricLabel}</div>
              </div>
            </div>

            <p style={{ fontSize:".83rem", color:C.muted, lineHeight:1.72, marginBottom:14 }}>{tech.desc}</p>

            <ul style={{ listStyle:"none", margin:0, padding:0, display:"flex", flexDirection:"column", gap:7 }}>
              {tech.details.map((d, i) => (
                <li key={i} style={{ display:"flex", gap:9, fontSize:".79rem", color:C.text, lineHeight:1.55 }}>
                  <span style={{ color:tech.color, flexShrink:0 }}>▸</span>{d}
                </li>
              ))}
            </ul>
          </div>

          {/* Flow diagram */}
          <div style={{ marginTop:16, padding:"13px 15px", background:"rgba(255,255,255,.02)", borderRadius:11, border:`1px solid ${C.border}` }}>
            <div style={{ fontFamily:"'DM Mono',monospace", fontSize:".58rem", color:C.faint, letterSpacing:".08em", marginBottom:10 }}>// fluxo de um job</div>
            <div style={{ display:"flex", alignItems:"center", gap:5, flexWrap:"wrap" }}>
              {[
                { label:"API REST",  color:C.indigo },
                null,
                { label:"RabbitMQ",  color:C.amber },
                null,
                { label:"Worker",    color:C.cyan },
                null,
                { label:"MongoDB",   color:C.emerald },
                null,
                { label:"SendGrid",  color:C.violet },
              ].map((s, i) => s === null ? (
                <span key={i} style={{ color:C.faint, fontSize:".72rem" }}>→</span>
              ) : (
                <span key={i} style={{
                  padding:"4px 10px", borderRadius:7,
                  background:`${s.color}12`, border:`1px solid ${s.color}30`,
                  color:s.color, fontSize:".68rem", fontFamily:"'DM Mono',monospace",
                  fontWeight:500,
                }}>{s.label}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── NAV ──────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menu,     setMenu]     = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = ["Projetos","Experiência","Stack","Contato"];
  const hrefs = ["#projects","#experience","#skills","#contact"];

  return (
    <>
      <nav style={{
        position:"fixed", top:0, left:0, right:0, zIndex:90, height:52,
        background: scrolled ? "rgba(3,5,12,.94)" : "transparent",
        borderBottom: scrolled ? `1px solid ${C.border}` : "1px solid transparent",
        backdropFilter: scrolled ? "blur(24px)" : "none",
        transition:"all .3s",
        padding:"0 24px",
        display:"flex", alignItems:"center", justifyContent:"space-between",
      }}>
        <a href="#" style={{ textDecoration:"none", display:"flex", alignItems:"center", gap:8 }}>
          <div style={{
            width:26, height:26, borderRadius:6,
            background:`linear-gradient(135deg,${C.cyan},${C.indigo})`,
            display:"flex", alignItems:"center", justifyContent:"center",
            fontSize:".62rem", fontWeight:700, color:"#000",
            fontFamily:"'DM Mono',monospace",
            boxShadow:`0 0 12px ${C.cyan}35`,
          }}>VC</div>
          <span style={{ fontSize:".88rem", fontWeight:600, color:C.text, fontFamily:"'Syne',sans-serif", letterSpacing:"-.02em" }}>Vinicius</span>
          <span style={{
            fontFamily:"'DM Mono',monospace", fontSize:".52rem", color:C.cyan,
            border:`1px solid ${C.cyan}30`, padding:"1px 6px", borderRadius:4, letterSpacing:".05em",
          }}>SWE</span>
        </a>

        <div className="nav-desktop" style={{ display:"flex", gap:0, alignItems:"center" }}>
          {links.map((l, i) => (
            <a key={l} href={hrefs[i]} style={{
              padding:"6px 12px", fontSize:".72rem", color:C.muted,
              textDecoration:"none", fontFamily:"'DM Mono',monospace",
              transition:"color .2s", borderRadius:8,
            }}
              onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = C.text}
              onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = C.muted}
            >{l}</a>
          ))}
          <a href={`mailto:${profile.email}`} style={{
            marginLeft:8, padding:"6px 15px", borderRadius:999,
            border:`1px solid ${C.cyan}45`, background:`${C.cyan}0e`,
            color:C.cyan, textDecoration:"none", fontSize:".72rem", fontWeight:600,
            transition:"all .2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.background=`${C.cyan}1e`; e.currentTarget.style.boxShadow=`0 0 14px ${C.cyan}25`; }}
            onMouseLeave={e => { e.currentTarget.style.background=`${C.cyan}0e`; e.currentTarget.style.boxShadow="none"; }}
          >Contato</a>
        </div>

        <button onClick={() => setMenu(o => !o)} className="nav-mobile" style={{
          background:"none", border:"none", cursor:"pointer", color:C.muted,
          padding:6, display:"none", fontSize:"1.1rem",
        }}>{menu ? "✕" : "☰"}</button>
      </nav>

      {menu && (
        <div style={{
          position:"fixed", top:52, left:0, right:0, zIndex:89,
          background:"rgba(3,5,12,.97)", borderBottom:`1px solid ${C.border}`,
          backdropFilter:"blur(24px)", padding:"12px 24px 20px",
          display:"flex", flexDirection:"column", gap:2,
        }}>
          {links.map((l, i) => (
            <a key={l} href={hrefs[i]} onClick={() => setMenu(false)} style={{
              padding:"10px 0", fontSize:".9rem", color:C.muted,
              textDecoration:"none", borderBottom:`1px solid ${C.border}`,
              fontFamily:"'DM Mono',monospace",
            }}>{l}</a>
          ))}
          <a href={`mailto:${profile.email}`} style={{
            marginTop:12, padding:"11px 0", fontSize:".9rem",
            color:C.cyan, textDecoration:"none", fontWeight:600,
            fontFamily:"'DM Mono',monospace",
          }}>{profile.email}</a>
        </div>
      )}
    </>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  const words = useMemo(() => [
    "Sistemas Distribuídos","Microsserviços .NET",
    "Pipelines ETL · Azure","APIs de Alta Performance","Automação Empresarial",
  ], []);
  const typed = useTypewriter(words, 68);

  return (
    <section style={{
      minHeight:"100vh", display:"flex", alignItems:"center",
      padding:"80px 24px 60px", position:"relative", overflow:"hidden",
    }}>
      <div style={{ position:"absolute", inset:0 }}><ParticleCanvas /></div>
      <div style={{
        position:"absolute", inset:0,
        backgroundImage:`linear-gradient(${C.grid} 1px,transparent 1px),linear-gradient(90deg,${C.grid} 1px,transparent 1px)`,
        backgroundSize:"48px 48px", pointerEvents:"none",
      }} />
      <div style={{
        position:"absolute", top:"30%", left:"50%",
        transform:"translate(-50%,-50%)",
        width:700, height:450,
        background:`radial-gradient(ellipse at center, ${C.cyan}07 0%, transparent 70%)`,
        pointerEvents:"none",
      }} />

      <div style={{ maxWidth:680, margin:"0 auto", position:"relative", width:"100%" }}>
        <Spring delay={0}>
          <div style={{
            display:"inline-flex", alignItems:"center", gap:8,
            fontFamily:"'DM Mono',monospace", fontSize:".6rem",
            border:`1px solid ${C.cyan}28`, background:`${C.cyan}09`,
            padding:"6px 14px", borderRadius:999, marginBottom:28, letterSpacing:".06em",
          }}>
            <Dot color={C.cyan} ping />
            <span style={{ color:C.cyan }}>SISTEMA ONLINE</span>
            <span style={{ color:C.faint }}>·</span>
            <span style={{ color:C.faint }}>SÃO PAULO · BR</span>
          </div>
        </Spring>

        <Spring delay={0.07}>
          <h1 style={{
            fontFamily:"'Syne',sans-serif",
            fontSize:"clamp(2.8rem,11vw,5.2rem)",
            fontWeight:800,
            letterSpacing:"-.048em",
            lineHeight:.95,
            margin:"0 0 6px",
            background:`linear-gradient(140deg, ${C.text} 35%, ${C.cyan} 100%)`,
            WebkitBackgroundClip:"text",
            WebkitTextFillColor:"transparent",
            backgroundClip:"text",
          }}>
            Vinicius<br />Custódio
          </h1>
        </Spring>

        <Spring delay={0.14}>
          <div style={{
            fontFamily:"'DM Mono',monospace",
            fontSize:"clamp(.82rem,2.4vw,1.05rem)",
            color:C.muted, marginBottom:22, marginTop:12, minHeight:"1.6em",
          }}>
            <span style={{ color:C.cyan }}>$ </span>
            <span>{typed}</span>
            <span style={{ animation:"blink 1s step-end infinite", color:C.cyan }}>▋</span>
          </div>
        </Spring>

        <Spring delay={0.2}>
          <p style={{ color:C.muted, fontSize:".9rem", lineHeight:1.78, maxWidth:520, marginBottom:34 }}>
            Engenheiro de software com foco em backend e sistemas escaláveis. Estagiário na{" "}
            <span style={{ color:C.text, fontWeight:600 }}>Recovery (Grupo Itaú)</span>, atuando em
            modernização de sistemas legados, microsserviços, pipelines de dados e automações em nuvem.
          </p>
        </Spring>

        <Spring delay={0.26}>
          <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
            {[
              { href:"#projects", label:"Ver Projetos →", primary:true },
              { href:profile.linkedin, label:"LinkedIn", external:true },
              { href:profile.github,   label:"GitHub",   external:true },
            ].map(btn => (
              <a key={btn.label} href={btn.href}
                target={btn.external ? "_blank" : undefined}
                rel={btn.external ? "noopener noreferrer" : undefined}
                style={{
                  padding:"11px 22px", borderRadius:10,
                  background:  btn.primary ? C.cyan            : "rgba(255,255,255,.03)",
                  border:      btn.primary ? "none"            : `1px solid ${C.border}`,
                  color:       btn.primary ? "#030712"         : C.text,
                  fontFamily:"'DM Mono',monospace",
                  textDecoration:"none", fontSize:".82rem", fontWeight: btn.primary ? 700 : 500,
                  transition:"all .2s",
                  boxShadow: btn.primary ? `0 0 22px ${C.cyan}30` : "none",
                  letterSpacing: btn.primary ? ".02em" : "0",
                }}
                onMouseEnter={e => {
                  if (btn.primary) e.currentTarget.style.boxShadow = `0 0 32px ${C.cyan}55`;
                  else e.currentTarget.style.borderColor = `${C.cyan}40`;
                }}
                onMouseLeave={e => {
                  if (btn.primary) e.currentTarget.style.boxShadow = `0 0 22px ${C.cyan}30`;
                  else e.currentTarget.style.borderColor = C.border;
                }}
              >{btn.label}</a>
            ))}
          </div>
        </Spring>

        <Spring delay={0.38}>
          <div style={{
            marginTop:54, display:"flex", alignItems:"center", gap:9,
            fontFamily:"'DM Mono',monospace", fontSize:".58rem",
            color:C.faint, letterSpacing:".09em",
          }}>
            <span style={{ animation:"bounce 2s ease-in-out infinite", display:"inline-block" }}>↓</span>
            SCROLL TO EXPLORE
          </div>
        </Spring>
      </div>
    </section>
  );
}

// ─── PROJECTS SECTION ─────────────────────────────────────────────────────────
function Projects() {
  return (
    <section id="projects" style={{ padding:"80px 24px", borderTop:`1px solid ${C.border}` }}>
      <div style={{ maxWidth:680, margin:"0 auto" }}>
        <Spring>
          <div style={{ marginBottom:28 }}>
            <p style={{ fontFamily:"'DM Mono',monospace", fontSize:".63rem", color:C.cyan, marginBottom:5, letterSpacing:".09em" }}>// projetos</p>
            <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:"clamp(1.4rem,5vw,1.9rem)", fontWeight:700, letterSpacing:"-.03em", margin:"0 0 7px" }}>Sistemas Construídos</h2>
            <p style={{ color:C.muted, fontSize:".875rem", lineHeight:1.68, maxWidth:500 }}>
              Projetos pessoais e profissionais focados em arquiteturas distribuídas, automação e engenharia de dados.
            </p>
          </div>
        </Spring>

        <ProjectProvider>
          <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
            {PROJECTS.map(p => <ProjectCard key={p.id} project={p} />)}
          </div>
          <EventraModal />
        </ProjectProvider>
      </div>
    </section>
  );
}

// ─── EXPERIENCE ───────────────────────────────────────────────────────────────
function ExperienceEntry({ exp, index }: { exp: typeof EXPERIENCE[0]; index: number }) {
  const [ref, style] = useSpring(index * .09);
  const [open, setOpen] = useState(index === 0);

  return (
    <div ref={ref} style={style}>
      <div
        onClick={() => setOpen(o => !o)}
        style={{
          background: open ? C.cardHov : C.card,
          border:`1px solid ${open ? `${exp.color}45` : "rgba(255,255,255,0.10)"}`,
          borderRadius:14, overflow:"hidden", cursor:"pointer",
          transition:"border-color .3s, background .3s",
        }}
      >
        <div style={{ padding:"18px 20px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div style={{ display:"flex", alignItems:"center", gap:11 }}>
            <div style={{
              width:36, height:36, borderRadius:9,
              background:`${exp.color}13`, border:`1px solid ${exp.color}28`,
              display:"flex", alignItems:"center", justifyContent:"center",
              fontFamily:"'DM Mono',monospace", fontSize:".58rem", color:exp.color, fontWeight:700, flexShrink:0,
            }}>{exp.badge}</div>
            <div>
              <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:".92rem", letterSpacing:"-.015em" }}>{exp.company}</div>
              <div style={{ fontFamily:"'DM Mono',monospace", fontSize:".7rem", color:C.muted, marginTop:1 }}>{exp.role}</div>
            </div>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:9 }}>
            <span style={{ fontFamily:"'DM Mono',monospace", fontSize:".62rem", color:C.faint }}>{exp.period}</span>
            <span style={{ transition:"transform .3s", transform:open?"rotate(180deg)":"none", display:"inline-block", color:C.faint }}>↓</span>
          </div>
        </div>

        <div style={{ overflow:"hidden", maxHeight:open ? 400 : 0, transition:"max-height .5s cubic-bezier(.16,1,.3,1)" }}>
          <div style={{
            padding:"0 20px 20px",
            opacity:open ? 1 : 0, transform:open?"translateY(0)":"translateY(8px)",
            transition:"opacity .35s ease .1s, transform .35s ease .1s",
          }}>
            <div style={{ height:1, background:`linear-gradient(90deg,${exp.color}28,transparent)`, marginBottom:14 }} />
            <ul style={{ listStyle:"none", margin:0, padding:0, display:"flex", flexDirection:"column", gap:8, marginBottom:12 }}>
              {exp.bullets.map((b, i) => (
                <li key={i} style={{ display:"flex", gap:9, fontSize:".82rem", color:C.text, lineHeight:1.65 }}>
                  <span style={{ color:exp.color, flexShrink:0, fontFamily:"'DM Mono',monospace" }}>▸</span>{b}
                </li>
              ))}
            </ul>
            <div style={{ display:"flex", flexWrap:"wrap", gap:5 }}>
              {exp.tags.map(t => <Tag key={t} color={exp.color}>{t}</Tag>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Experience() {
  return (
    <section id="experience" style={{ padding:"80px 24px", borderTop:`1px solid ${C.border}`, position:"relative" }}>
      <div style={{
        position:"absolute", inset:0,
        backgroundImage:`linear-gradient(${C.grid} 1px,transparent 1px),linear-gradient(90deg,${C.grid} 1px,transparent 1px)`,
        backgroundSize:"48px 48px", pointerEvents:"none",
      }} />
      <div style={{ maxWidth:680, margin:"0 auto", position:"relative" }}>
        <Spring>
          <div style={{ marginBottom:28 }}>
            <p style={{ fontFamily:"'DM Mono',monospace", fontSize:".63rem", color:C.cyan, marginBottom:5, letterSpacing:".09em" }}>// experiência</p>
            <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:"clamp(1.4rem,5vw,1.9rem)", fontWeight:700, letterSpacing:"-.03em", margin:"0 0 7px" }}>Histórico Profissional</h2>
          </div>
        </Spring>
        <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:36 }}>
          {EXPERIENCE.map((e, i) => <ExperienceEntry key={e.company} exp={e} index={i} />)}
        </div>
        <Spring delay={0.2}>
          <p style={{ fontFamily:"'DM Mono',monospace", fontSize:".63rem", color:C.indigo, marginBottom:14, letterSpacing:".09em" }}>// educação</p>
          <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
            {EDUCATION.map(e => (
              <div key={e.school} style={{
                background:C.card, border:`1px solid ${C.border}`,
                borderRadius:12, padding:"14px 18px",
                display:"flex", alignItems:"center", justifyContent:"space-between",
                transition:"border-color .2s",
              }}
                onMouseEnter={ev => ev.currentTarget.style.borderColor = `${e.color}28`}
                onMouseLeave={ev => ev.currentTarget.style.borderColor = C.border}
              >
                <div>
                  <div style={{ fontFamily:"'Syne',sans-serif", fontWeight:700, fontSize:".88rem" }}>{e.school}</div>
                  <div style={{ fontSize:".75rem", color:C.muted, marginTop:2 }}>{e.degree}</div>
                </div>
                <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:4 }}>
                  <span style={{ fontFamily:"'DM Mono',monospace", fontSize:".6rem", color:C.faint }}>{e.period}</span>
                  <span style={{
                    fontFamily:"'DM Mono',monospace", fontSize:".56rem",
                    color:e.color, border:`1px solid ${e.color}28`,
                    padding:"2px 7px", borderRadius:999, background:`${e.color}09`,
                  }}>{e.status}</span>
                </div>
              </div>
            ))}
          </div>
        </Spring>
      </div>
    </section>
  );
}

// ─── SKILLS ───────────────────────────────────────────────────────────────────
function Skills() {
  return (
    <section id="skills" style={{ padding:"80px 24px", borderTop:`1px solid ${C.border}` }}>
      <div style={{ maxWidth:680, margin:"0 auto" }}>
        <Spring>
          <div style={{ marginBottom:28 }}>
            <p style={{ fontFamily:"'DM Mono',monospace", fontSize:".63rem", color:C.cyan, marginBottom:5, letterSpacing:".09em" }}>// stack</p>
            <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:"clamp(1.4rem,5vw,1.9rem)", fontWeight:700, letterSpacing:"-.03em", margin:"0 0 7px" }}>Tecnologias & Cloud</h2>
            <p style={{ color:C.muted, fontSize:".875rem", lineHeight:1.68, maxWidth:500 }}>Do backend ao cloud — ferramentas que uso para construir sistemas robustos e escaláveis.</p>
          </div>
        </Spring>
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          {SKILLS.map((g, gi) => (
            <Spring key={g.label} delay={gi * .07}>
              <div style={{
                border:`1px solid ${C.border}`, borderRadius:14,
                background:C.card, padding:"16px 18px",
                transition:"border-color .2s",
              }}
                onMouseEnter={e => e.currentTarget.style.borderColor = `${g.color}32`}
                onMouseLeave={e => e.currentTarget.style.borderColor = C.border}
              >
                <div style={{ display:"flex", alignItems:"center", gap:7, marginBottom:11 }}>
                  <span style={{ width:7, height:7, borderRadius:"50%", background:g.color, boxShadow:`0 0 8px ${g.color}` }} />
                  <span style={{ fontFamily:"'DM Mono',monospace", fontSize:".62rem", fontWeight:600, color:g.color, letterSpacing:".05em" }}>{g.label}</span>
                </div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                  {g.items.map(s => (
                    <span key={s} style={{
                      padding:"5px 10px", borderRadius:8,
                      background:"rgba(255,255,255,.025)", border:`1px solid ${C.border}`,
                      fontSize:".77rem", color:C.muted, transition:"all .18s", cursor:"default",
                    }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor=`${g.color}42`; e.currentTarget.style.color=C.text; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor=C.border; e.currentTarget.style.color=C.muted; }}
                    >{s}</span>
                  ))}
                </div>
              </div>
            </Spring>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CONTACT ──────────────────────────────────────────────────────────────────
function Contact() {
  return (
    <section id="contact" style={{ padding:"80px 24px", borderTop:`1px solid ${C.border}`, position:"relative" }}>
      <div style={{
        position:"absolute", inset:0,
        backgroundImage:`linear-gradient(${C.grid} 1px,transparent 1px),linear-gradient(90deg,${C.grid} 1px,transparent 1px)`,
        backgroundSize:"48px 48px", pointerEvents:"none",
      }} />
      <div style={{
        position:"absolute", bottom:0, left:"50%", transform:"translateX(-50%)",
        width:420, height:220,
        background:`radial-gradient(ellipse at bottom,${C.cyan}05 0%,transparent 70%)`,
        pointerEvents:"none",
      }} />
      <div style={{ maxWidth:680, margin:"0 auto", position:"relative" }}>
        <Spring>
          <p style={{ fontFamily:"'DM Mono',monospace", fontSize:".63rem", color:C.cyan, marginBottom:5, letterSpacing:".09em" }}>// contato</p>
          <h2 style={{ fontFamily:"'Syne',sans-serif", fontSize:"clamp(1.8rem,7vw,2.8rem)", fontWeight:800, letterSpacing:"-.04em", margin:"0 0 11px", lineHeight:1.02 }}>
            Entre em<br />contato
          </h2>
          <p style={{ color:C.muted, fontSize:".875rem", lineHeight:1.72, marginBottom:30, maxWidth:440 }}>
            Aberto a oportunidades, colaborações e projetos desafiadores.
          </p>

          <div style={{ display:"flex", flexDirection:"column", gap:9, maxWidth:440 }}>
            {[
              { icon:"✉️", label:profile.email,                        href:`mailto:${profile.email}`,              color:C.cyan,    primary:true },
              { icon:"💼", label:`linkedin.com/in/${profile.handle}`,  href:profile.linkedin,                       color:C.indigo },
              { icon:"⚙️", label:"github.com/ViniciusCode04",           href:profile.github,                         color:C.emerald },
            ].map((item, i) => (
              <Spring key={i} delay={i * .07}>
                <a href={item.href} target={item.primary ? undefined : "_blank"} rel="noopener noreferrer" style={{
                  padding:"15px 18px", borderRadius:13,
                  background: item.primary ? `${item.color}10` : "rgba(255,255,255,.025)",
                  border:     `1px solid ${item.primary ? `${item.color}38` : C.border}`,
                  color:C.text, textDecoration:"none",
                  display:"flex", alignItems:"center", gap:11,
                  fontSize:".84rem", fontWeight:item.primary ? 600 : 400,
                  transition:"all .22s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor=`${item.color}50`; e.currentTarget.style.transform="translateX(3px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor=item.primary?`${item.color}38`:C.border; e.currentTarget.style.transform="none"; }}
                >
                  <span style={{ fontSize:".95rem" }}>{item.icon}</span>
                  <span style={{
                    flex:1, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap",
                    fontFamily:"'DM Mono',monospace", fontSize:".77rem",
                    color:item.primary ? item.color : C.muted,
                  }}>{item.label}</span>
                  <span style={{ fontSize:".7rem", color:item.color }}>→</span>
                </a>
              </Spring>
            ))}
          </div>

          <Spring delay={0.28}>
            <p style={{ marginTop:20, fontSize:".68rem", color:C.faint, fontFamily:"'DM Mono',monospace" }}>
              📞 {profile.phone} · São Paulo, Brasil
            </p>
          </Spring>
        </Spring>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{
      borderTop:`1px solid ${C.border}`, padding:"18px 24px",
      display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:8,
    }}>
      <p style={{ fontSize:".62rem", color:C.faint, fontFamily:"'DM Mono',monospace" }}>
        © 2026 Vinicius Custódio · SWE · C#/.NET · Azure
      </p>
      <div style={{ display:"flex", gap:6, alignItems:"center" }}>
        <Dot color={C.emerald} ping />
        <span style={{ fontSize:".6rem", color:C.emerald, fontFamily:"'DM Mono',monospace" }}>ALL SYSTEMS OPERATIONAL</span>
      </div>
    </footer>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Syne:wght@600;700;800&display=swap');

        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        body{
          background:#03050C;
          color:#DCE8F8;
          font-family:'DM Mono',monospace;
          -webkit-font-smoothing:antialiased;
          overflow-x:hidden;
        }
        button{font-family:inherit}

        @keyframes ping{0%{transform:scale(1);opacity:.6}75%,100%{transform:scale(2.4);opacity:0}}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
        @keyframes bounce{0%,100%{transform:translateY(0)}50%{transform:translateY(5px)}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        @keyframes slideUp{from{transform:translateY(100%);opacity:0}to{transform:translateY(0);opacity:1}}

        ::-webkit-scrollbar{width:3px}
        ::-webkit-scrollbar-thumb{background:rgba(34,211,238,.18);border-radius:4px}

        @media(min-width:640px){.nav-desktop{display:flex!important}.nav-mobile{display:none!important}}
        @media(max-width:639px){.nav-desktop{display:none!important}.nav-mobile{display:flex!important}}

        *{-webkit-tap-highlight-color:transparent}
        a,button{touch-action:manipulation}
        ::selection{background:rgba(34,211,238,.22);color:#DCE8F8}
      `}</style>
      <Nav />
      <main>
        <Hero />
        <Projects />
        <Experience />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
