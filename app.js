const { useState, useEffect, useRef } = React;
const C = {
  navy: "#0A192F",
  navyMid: "#0d2340",
  navyDark: "#060f1e",
  navyLight: "#112240",
  green: "#00C853",
  greenDark: "#00897B",
  greenGlow: "rgba(0,200,83,0.18)",
  yellow: "#FFD600",
  yellowGlow: "rgba(255,214,0,0.15)",
  red: "#FF3D00",
  redGlow: "rgba(255,61,0,0.15)",
  purple: "#635BFF",
  purpleGlow: "rgba(99,91,255,0.18)",
  blue: "#60A5FA",
  blueGlow: "rgba(96,165,250,0.15)",
  teal: "#00BCD4",
  g600: "rgba(255,255,255,0.6)",
  g500: "rgba(255,255,255,0.45)",
  g400: "rgba(255,255,255,0.3)",
  g300: "rgba(255,255,255,0.15)",
  g200: "rgba(255,255,255,0.1)",
  g100: "rgba(255,255,255,0.06)",
  border: "rgba(255,255,255,0.08)",
  borderMed: "rgba(255,255,255,0.12)",
};
const mobile = {
  maxWidth: 430,
  margin: "0 auto",
  minHeight: "100vh",
  position: "relative",
  background: `linear-gradient(160deg,${C.navy} 0%,${C.navyMid} 100%)`,
};
const Pill = ({ children, color = C.green, style = {} }) => (
  <span
    style={{
      background: color + "22",
      color,
      border: `1px solid ${color}44`,
      fontSize: 11,
      fontWeight: 700,
      padding: "3px 10px",
      borderRadius: 20,
      whiteSpace: "nowrap",
      ...style,
    }}
  >
    {children}
  </span>
);
const BtnPrimary = ({ children, onClick, style = {}, disabled = false }) => (
  <button
    className="btn-primary"
    onClick={onClick}
    disabled={disabled}
    style={{
      width: "100%",
      padding: "15px",
      borderRadius: 14,
      background: disabled
        ? C.g200
        : `linear-gradient(135deg,${C.green},${C.greenDark})`,
      color: disabled ? C.g400 : "#fff",
      fontSize: 15,
      fontWeight: 700,
      border: "none",
      cursor: disabled ? "not-allowed" : "pointer",
      letterSpacing: 0.3,
      transition: "all .2s",
      ...style,
    }}
  >
    {children}
  </button>
);
const BtnSecondary = ({ children, onClick, style = {} }) => (
  <button
    onClick={onClick}
    style={{
      width: "100%",
      padding: "14px",
      borderRadius: 14,
      background: C.g100,
      border: `1px solid ${C.border}`,
      color: "#fff",
      fontSize: 14,
      fontWeight: 600,
      cursor: "pointer",
      ...style,
    }}
  >
    {children}
  </button>
);
const Card = ({ children, style = {} }) => (
  <div
    style={{
      background: C.g100,
      border: `1px solid ${C.border}`,
      borderRadius: 18,
      padding: "16px 18px",
      ...style,
    }}
  >
    {children}
  </div>
);
const Field = ({
  icon,
  placeholder,
  type = "text",
  value,
  onChange,
  label,
}) => (
  <div style={{ marginBottom: 12 }}>
    {label && (
      <p
        style={{
          color: C.g500,
          fontSize: 12,
          marginBottom: 6,
          fontWeight: 500,
        }}
      >
        {label}
      </p>
    )}
    <div style={{ position: "relative" }}>
      {icon && (
        <span
          style={{
            position: "absolute",
            left: 14,
            top: "50%",
            transform: "translateY(-50%)",
            fontSize: 16,
          }}
        >
          {icon}
        </span>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: "100%",
          padding: `15px 15px 15px ${icon ? "44px" : "16px"}`,
          borderRadius: 13,
          background: C.g100,
          border: `1px solid ${C.border}`,
          color: "#fff",
          fontSize: 15,
        }}
      />
    </div>
  </div>
);
const BackBtn = ({ go, to, style = {} }) => (
  <button
    onClick={() => go(to)}
    style={{
      background: "none",
      border: "none",
      color: C.g400,
      fontSize: 26,
      cursor: "pointer",
      padding: 0,
      lineHeight: 1,
      marginBottom: 16,
      ...style,
    }}
  >
    ‹
  </button>
);
const Label = ({ children, style = {} }) => (
  <p
    style={{
      color: C.g500,
      fontSize: 11,
      textTransform: "uppercase",
      letterSpacing: "0.09em",
      marginBottom: 6,
      ...style,
    }}
  >
    {children}
  </p>
);
const Dots = ({ current, total = 5 }) => (
  <div
    style={{
      display: "flex",
      gap: 6,
      justifyContent: "center",
      padding: "16px 0 4px",
    }}
  >
    {Array(total)
      .fill(0)
      .map((_, i) => (
        <div
          key={i}
          style={{
            height: 6,
            width: i === current ? 22 : 6,
            borderRadius: 3,
            background: i === current ? C.green : C.g300,
            transition: "all .3s",
          }}
        />
      ))}
  </div>
);
const Toggle = ({ on, onToggle, color = C.green }) => (
  <div
    onClick={onToggle}
    style={{
      width: 48,
      height: 28,
      borderRadius: 14,
      background: on ? color : C.g100,
      border: `1px solid ${on ? color : C.border}`,
      position: "relative",
      cursor: "pointer",
      transition: "all .25s",
      flexShrink: 0,
    }}
  >
    <div
      style={{
        width: 22,
        height: 22,
        borderRadius: "50%",
        background: "#fff",
        position: "absolute",
        top: 3,
        left: on ? 22 : 3,
        transition: "left .25s",
        boxShadow: "0 1px 4px rgba(0,0,0,.3)",
      }}
    />
  </div>
);
const Radial = ({ score, size = 140, label = "" }) => {
  const r = size / 2 - 14,
    cx = size / 2,
    circ = 2 * Math.PI * r;
  const col = score >= 80 ? C.green : score >= 60 ? C.yellow : C.red;
  return (
    <svg
      width={size}
      height={size}
      style={{ filter: `drop-shadow(0 0 18px ${col}55)`, overflow: "visible" }}
    >
      <circle
        cx={cx}
        cy={cx}
        r={r}
        fill="none"
        stroke="rgba(255,255,255,0.07)"
        strokeWidth={10}
      />
      <circle
        cx={cx}
        cy={cx}
        r={r}
        fill="none"
        stroke={col}
        strokeWidth={10}
        strokeDasharray={`${(score / 100) * circ} ${circ}`}
        strokeLinecap="round"
        transform={`rotate(-90 ${cx} ${cx})`}
        style={{ transition: "stroke-dasharray 1.5s ease" }}
      />
      <text
        x={cx}
        y={cx - (label ? 10 : 4)}
        textAnchor="middle"
        fill="white"
        fontSize={size > 120 ? 32 : 24}
        fontWeight={700}
        fontFamily="DM Sans"
      >
        {score}
      </text>
      <text
        x={cx}
        y={cx + (label ? 8 : 15)}
        textAnchor="middle"
        fill="rgba(255,255,255,0.4)"
        fontSize={12}
        fontFamily="DM Sans"
      >
        {label || "/100"}
      </text>
    </svg>
  );
};
const MiniRadial = ({ pct, size = 56, color = C.green }) => {
  const r = size / 2 - 5,
    cx = size / 2,
    circ = 2 * Math.PI * r;
  return (
    <svg width={size} height={size}>
      <circle
        cx={cx}
        cy={cx}
        r={r}
        fill="none"
        stroke="rgba(255,255,255,0.07)"
        strokeWidth={5}
      />
      <circle
        cx={cx}
        cy={cx}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={5}
        strokeDasharray={`${(pct / 100) * circ} ${circ}`}
        strokeLinecap="round"
        transform={`rotate(-90 ${cx} ${cx})`}
      />
      <text
        x={cx}
        y={cx + 4}
        textAnchor="middle"
        fill="white"
        fontSize={13}
        fontWeight={700}
        fontFamily="DM Sans"
      >
        {pct}
      </text>
    </svg>
  );
};
const LineChart = ({
  data,
  width = 300,
  height = 100,
  color = C.green,
  showDots = true,
  showFill = true,
}) => {
  if (!data || data.length < 2) return null;
  const maxY = Math.max(...data.map((d) => d.y)),
    minY = Math.min(...data.map((d) => d.y));
  const range = maxY - minY || 1;
  const pad = 14;
  const xStep = (width - pad * 2) / (data.length - 1);
  const pts = data.map((d, i) => ({
    x: pad + i * xStep,
    y: pad + (1 - (d.y - minY) / range) * (height - pad * 2),
  }));
  const path = pts
    .map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`)
    .join(" ");
  const area = `${path} L${pts[pts.length - 1].x},${height} L${pts[0].x},${height} Z`;
  const uid = Math.random().toString(36).slice(2, 8);
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{ overflow: "visible" }}
    >
      <defs>
        <linearGradient id={`lg${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.35" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      {showFill && <path d={area} fill={`url(#lg${uid})`} />}
      <path
        d={path}
        fill="none"
        stroke={color}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {showDots &&
        pts.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={3.5}
            fill={color}
            stroke={C.navy}
            strokeWidth={2}
          />
        ))}
    </svg>
  );
};
const HBarChart = ({ items, color = C.green, height = 20 }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
    {items.map((item, i) => (
      <div key={i}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 5,
          }}
        >
          <span style={{ color: C.g500, fontSize: 12 }}>{item.label}</span>
          <span style={{ color: "#fff", fontSize: 12, fontWeight: 700 }}>
            {item.pct}%
          </span>
        </div>
        <div
          style={{
            height,
            background: C.g100,
            borderRadius: height / 2,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${item.pct}%`,
              background: item.color || color,
              borderRadius: height / 2,
              transition: "width 1s ease",
            }}
          />
        </div>
      </div>
    ))}
  </div>
);
const FunnelViz = ({ stages, compact = false }) => {
  const maxW = compact ? 200 : 280,
    minW = compact ? 60 : 80,
    h = compact ? 40 : 50;
  return (
    <svg
      width={maxW + 20}
      height={(h + 6) * stages.length - 6}
      style={{ overflow: "visible" }}
    >
      {stages.map((s, i) => {
        const w = maxW - (maxW - minW) * (i / (stages.length - 1 || 1));
        const x = (maxW - w) / 2 + 10;
        const y = i * (h + 6);
        const col = [C.blue, C.purple, C.yellow, C.green, C.teal][i % 5];
        return (
          <g key={i}>
            <rect
              x={x}
              y={y}
              width={w}
              height={h}
              rx={8}
              fill={col + "22"}
              stroke={col + "66"}
              strokeWidth={1.5}
            />
            <text
              x={maxW / 2 + 10}
              y={y + h / 2 + 1}
              textAnchor="middle"
              fill="white"
              fontSize={compact ? 11 : 12}
              fontWeight={700}
              fontFamily="DM Sans"
            >
              {s.label}
            </text>
            <text
              x={maxW / 2 + 10}
              y={y + h / 2 + 14}
              textAnchor="middle"
              fill={col}
              fontSize={compact ? 10 : 11}
              fontFamily="DM Sans"
            >
              {s.value}
            </text>
          </g>
        );
      })}
    </svg>
  );
};
const RadarChart = ({ skills, size = 160 }) => {
  const cx = size / 2,
    cy = size / 2,
    r = size / 2 - 24;
  const n = skills.length;
  const angle = (i) => -Math.PI / 2 + (2 * Math.PI * i) / n;
  const pt = (i, pct) => {
    const a = angle(i);
    return { x: cx + r * pct * Math.cos(a), y: cy + r * pct * Math.sin(a) };
  };
  const grid = [0.25, 0.5, 0.75, 1].map(
    (g) =>
      skills
        .map((_, i) => pt(i, g))
        .map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`)
        .join(" ") + "Z",
  );
  const shape =
    skills
      .map((s, i) => pt(i, s.pct / 100))
      .map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`)
      .join(" ") + "Z";
  return (
    <svg width={size} height={size}>
      {grid.map((d, i) => (
        <path key={i} d={d} fill="none" stroke={C.border} strokeWidth={1} />
      ))}
      {skills.map((_, i) => {
        const p = pt(i, 1);
        return (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={p.x}
            y2={p.y}
            stroke={C.border}
            strokeWidth={1}
          />
        );
      })}
      <path
        d={shape}
        fill={`${C.purple}33`}
        stroke={C.purple}
        strokeWidth={2}
      />
      {skills.map((s, i) => {
        const p = pt(i, s.pct / 100);
        return <circle key={i} cx={p.x} cy={p.y} r={4} fill={C.purple} />;
      })}
      {skills.map((s, i) => {
        const lp = pt(i, 1.22);
        return (
          <text
            key={i}
            x={lp.x}
            y={lp.y + 4}
            textAnchor="middle"
            fill={C.g500}
            fontSize={10}
            fontFamily="DM Sans"
          >
            {s.label}
          </text>
        );
      })}
    </svg>
  );
};
const BottomNav = ({ active, go }) => {
  const items = [
    { icon: "⊞", label: "Home", s: "dashboard" },
    { icon: "🔍", label: "Search", s: "search" },
    { icon: "📋", label: "Apps", s: "applications" },
    { icon: "🎓", label: "Learn", s: "learning" },
    { icon: "👤", label: "Profile", s: "profile" },
  ];
  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        maxWidth: 430,
        left: "50%",
        transform: "translateX(-50%)",
        background: "rgba(10,25,47,0.97)",
        backdropFilter: "blur(20px)",
        borderTop: `1px solid ${C.border}`,
        display: "flex",
        justifyContent: "space-around",
        padding: "10px 8px 20px",
        zIndex: 200,
      }}
    >
      {items.map((item, i) => (
        <button
          key={i}
          onClick={() => go(item.s)}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 4,
            background: "none",
            border: "none",
            cursor: "pointer",
            color: active === item.s ? C.green : "rgba(255,255,255,0.3)",
            minWidth: 44,
          }}
        >
          <span style={{ fontSize: 20 }}>{item.icon}</span>
          <span
            style={{ fontSize: 10, fontWeight: active === item.s ? 700 : 400 }}
          >
            {item.label}
          </span>
          {active === item.s && (
            <div
              style={{
                width: 4,
                height: 4,
                borderRadius: "50%",
                background: C.green,
              }}
            />
          )}
        </button>
      ))}
    </div>
  );
};
function Splash({ go }) {
  useEffect(() => {
    const t = setTimeout(() => go("welcome"), 2400);
    return () => clearTimeout(t);
  }, []);
  return (
    <div
      className="screen"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        textAlign: "center",
        padding: 40,
      }}
    >
      <div
        style={{
          width: 96,
          height: 96,
          borderRadius: 28,
          background: `linear-gradient(135deg,${C.green},${C.greenDark})`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 44,
          margin: "0 auto 24px",
          animation: "glow 2s ease infinite",
        }}
      >
        ✦
      </div>
      <h1
        style={{
          fontSize: 40,
          fontWeight: 800,
          letterSpacing: -2,
          marginBottom: 8,
        }}
      >
        ClearHire
      </h1>
      <p
        style={{
          color: C.g500,
          fontSize: 13,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          marginBottom: 52,
        }}
      >
        ATS Platform v2.0
      </p>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: i === 0 ? C.green : C.g300,
              animation: `pulse ${1 + i * 0.3}s ease infinite`,
            }}
          />
        ))}
      </div>
      <p style={{ color: C.g300, fontSize: 12 }}>
        Initializing secure environment…
      </p>
    </div>
  );
}
function Welcome({ go }) {
  return (
    <div
      className="screen"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: "100vh",
        padding: "60px 28px 50px",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            fontSize: 96,
            marginBottom: 24,
            filter: `drop-shadow(0 0 30px rgba(0,200,83,0.5))`,
          }}
        >
          🤝
        </div>
        <h1
          style={{
            fontSize: 36,
            fontWeight: 800,
            letterSpacing: -1.5,
            marginBottom: 14,
            lineHeight: 1.1,
          }}
        >
          Hiring,
          <br />
          Demystified.
        </h1>
        <p
          style={{
            color: C.g500,
            fontSize: 16,
            lineHeight: 1.7,
            maxWidth: 300,
            margin: "0 auto 28px",
          }}
        >
          Get instant ATS feedback, bias-free screening, and a clear roadmap to
          your dream role.
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 8,
            flexWrap: "wrap",
          }}
        >
          {["NYC LL144 Compliant", "GDPR Ready", "Zero Data Sales"].map((t) => (
            <span
              key={t}
              style={{
                background: C.greenGlow,
                border: `1px solid ${C.green}33`,
                color: C.green,
                fontSize: 11,
                padding: "4px 10px",
                borderRadius: 20,
                fontWeight: 600,
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
      <div>
        <BtnPrimary onClick={() => go("signup")} style={{ marginBottom: 12 }}>
          Get Started Free
        </BtnPrimary>
        <BtnSecondary onClick={() => go("login")}>
          I already have an account
        </BtnSecondary>
      </div>
    </div>
  );
}
function Login({ go }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const handleLogin = async () => {
    const res = await window.API.login(email, pass);
    if (res.success) {
      window.API.user = res.user;
      if (res.user.role === 'Recruiter') go("recruiterdesk");
      else if (res.user.role === 'Admin') go("admindesk");
      else go("dashboard");
    } else {
      alert(res.message);
    }
  };

  return (
    <div className="screen" style={{ padding: "16px 24px 40px" }}>
      <Dots current={0} />
      <div style={{ textAlign: "center", padding: "28px 0 24px" }}>
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: 16,
            background: `linear-gradient(135deg,${C.green},${C.greenDark})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 24,
            margin: "0 auto 14px",
          }}
        >
          ✦
        </div>
        <h1
          style={{
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: -0.8,
            marginBottom: 6,
          }}
        >
          Welcome Back
        </h1>
        <p style={{ color: C.g500, fontSize: 14 }}>
          Sign in to your ClearHire account
        </p>
      </div>
      <Field
        icon="✉️"
        placeholder="Email address"
        value={email}
        onChange={setEmail}
      />
      <Field
        icon="🔒"
        placeholder="Password"
        type="password"
        value={pass}
        onChange={setPass}
      />
      <div style={{ textAlign: "right", marginBottom: 20 }}>
        <span
          onClick={() => go("forgotpassword")}
          style={{ color: C.green, fontSize: 13, cursor: "pointer" }}
        >
          Forgot password?
        </span>
      </div>
      <BtnPrimary onClick={handleLogin}>Log In</BtnPrimary>
      <div
        style={{
          textAlign: "center",
          margin: "20px 0",
          color: C.g300,
          fontSize: 13,
        }}
      >
        — or continue with —
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 10,
          marginBottom: 24,
        }}
      >
        {[
          ["G", "#EA4335"],
          ["🍎", "#fff"],
          ["in", "#0A66C2"],
        ].map(([l, c], i) => (
          <button
            key={i}
            onClick={() => go("roleselect")}
            style={{
              padding: 14,
              borderRadius: 12,
              background: C.g100,
              border: `1px solid ${C.border}`,
              color: c,
              fontWeight: 700,
              fontSize: 16,
              cursor: "pointer",
            }}
          >
            {l}
          </button>
        ))}
      </div>
      <p style={{ textAlign: "center", color: C.g500, fontSize: 13 }}>
        No account?{" "}
        <span
          style={{ color: C.green, cursor: "pointer" }}
          onClick={() => go("signup")}
        >
          Join ClearHire →
        </span>
      </p>
    </div>
  );
}
function Signup({ go }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const str =
    pass.length === 0 ? 0 : pass.length < 6 ? 1 : pass.length < 10 ? 2 : 3;
  const strInfo = [
    { c: "transparent", t: "" },
    { c: C.red, t: "Weak" },
    { c: C.yellow, t: "Good" },
    { c: C.green, t: "Strong ✓" },
  ][str];
  return (
    <div className="screen" style={{ padding: "16px 24px 40px" }}>
      <Dots current={0} />
      <BackBtn go={go} to="login" />
      <h1
        style={{
          fontSize: 28,
          fontWeight: 700,
          letterSpacing: -0.8,
          marginBottom: 6,
        }}
      >
        Join ClearHire
      </h1>
      <p style={{ color: C.g500, fontSize: 14, marginBottom: 24 }}>
        Your transparent hiring journey starts here.
      </p>
      <Field
        icon="👤"
        placeholder="Full Name"
        value={name}
        onChange={setName}
      />
      <Field
        icon="✉️"
        placeholder="Email address"
        value={email}
        onChange={setEmail}
      />
      <Field
        icon="🔒"
        placeholder="Create password"
        type="password"
        value={pass}
        onChange={setPass}
      />
      {pass.length > 0 && (
        <div style={{ marginBottom: 18 }}>
          <div
            style={{
              height: 5,
              background: C.g100,
              borderRadius: 3,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${(str / 3) * 100}%`,
                background: strInfo.c,
                borderRadius: 3,
                transition: "all .3s",
              }}
            />
          </div>
          <p
            style={{
              color: strInfo.c,
              fontSize: 11,
              marginTop: 5,
              fontWeight: 600,
            }}
          >
            {strInfo.t}
          </p>
        </div>
      )}
      <BtnPrimary onClick={() => {
        window.pendingUser = { name, email, pass };
        go("roleselect");
      }}>Create Account</BtnPrimary>
      <p
        style={{
          textAlign: "center",
          color: "rgba(255,255,255,0.2)",
          fontSize: 11,
          marginTop: 16,
        }}
      >
        By joining you agree to our Terms & Privacy Policy.
      </p>
    </div>
  );
}
function ForgotPassword({ go }) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  return (
    <div className="screen" style={{ padding: "16px 24px 40px" }}>
      <BackBtn go={go} to="login" />
      {!sent ? (
        <>
          <div style={{ textAlign: "center", padding: "24px 0 28px" }}>
            <div
              style={{
                fontSize: 72,
                marginBottom: 16,
                filter: `drop-shadow(0 0 20px ${C.blue}44)`,
              }}
            >
              🔐
            </div>
            <h1
              style={{
                fontSize: 26,
                fontWeight: 700,
                letterSpacing: -0.8,
                marginBottom: 8,
              }}
            >
              Reset Password
            </h1>
            <p style={{ color: C.g500, fontSize: 14, lineHeight: 1.7 }}>
              Enter your email and we will send a secure reset link.
            </p>
          </div>
          <Field
            icon="✉️"
            placeholder="Email address"
            value={email}
            onChange={setEmail}
          />
          <BtnPrimary
            onClick={() => setSent(true)}
            disabled={!email.includes("@")}
            style={{ marginTop: 8 }}
          >
            Send Reset Link
          </BtnPrimary>
        </>
      ) : (
        <div style={{ textAlign: "center", padding: "60px 0" }}>
          <div style={{ fontSize: 72, marginBottom: 20 }}>📨</div>
          <h2
            style={{
              fontSize: 24,
              fontWeight: 700,
              marginBottom: 10,
              color: C.green,
            }}
          >
            Check Your Inbox
          </h2>
          <p
            style={{
              color: C.g500,
              fontSize: 14,
              lineHeight: 1.7,
              marginBottom: 28,
            }}
          >
            We sent a reset link to{" "}
            <span style={{ color: "#fff", fontWeight: 600 }}>{email}</span>. It
            expires in 30 minutes.
          </p>
          <BtnSecondary
            onClick={() => go("login")}
            style={{ maxWidth: 200, margin: "0 auto" }}
          >
            Back to Login
          </BtnSecondary>
        </div>
      )}
    </div>
  );
}
function RoleSelect({ go }) {
  const handleRole = async (r) => {
    if (window.pendingUser) {
      const { name, email, pass } = window.pendingUser;
      const roleName = r.title.replace('I am a ', '').replace('I am an ', '');
      const res = await window.API.register(name, email, pass, roleName);
      if (res.success) {
        window.API.user = { id: res.userId, name, email, role: roleName };
        window.pendingUser = null;
        go(r.s);
      } else {
        alert(res.message);
      }
    } else {
      go(r.s);
    }
  };

  return (
    <div className="screen" style={{ padding: "40px 24px" }}>
      <Dots current={1} />
      <div style={{ textAlign: "center", margin: "24px 0 30px" }}>
        <h1
          style={{
            fontSize: 26,
            fontWeight: 700,
            letterSpacing: -0.5,
            marginBottom: 8,
          }}
        >
          How will you use ClearHire?
        </h1>
        <p style={{ color: C.g500, fontSize: 14 }}>
          Choose your role to get started
        </p>
      </div>
      {[
        {
          icon: "💼",
          title: "I am a Job Seeker",
          sub: "Find jobs, optimize your resume & track applications",
          col: C.green,
          s: "upload",
        },
        {
          icon: "🔍",
          title: "I am a Recruiter",
          sub: "Post jobs, review candidates & reduce hiring bias",
          col: C.purple,
          s: "recruiterdesk",
        },
        {
          icon: "⚙️",
          title: "I am an Admin",
          sub: "Monitor platform, analytics & compliance",
          col: C.blue,
          s: "admindesk",
        },
      ].map((r, i) => (
        <div
          key={i}
          onClick={() => handleRole(r)}
          style={{
            background: `${r.col}11`,
            border: `2px solid ${r.col}33`,
            borderRadius: 22,
            padding: "22px 20px",
            marginBottom: 12,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 14,
          }}
        >
          <div
            style={{
              width: 54,
              height: 54,
              borderRadius: 17,
              background: `${r.col}22`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 26,
              flexShrink: 0,
            }}
          >
            {r.icon}
          </div>
          <div style={{ flex: 1 }}>
            <p
              style={{
                color: "#fff",
                fontSize: 15,
                fontWeight: 700,
                marginBottom: 3,
              }}
            >
              {r.title}
            </p>
            <p style={{ color: C.g500, fontSize: 12, lineHeight: 1.5 }}>
              {r.sub}
            </p>
          </div>
          <span style={{ color: r.col, fontSize: 22 }}>›</span>
        </div>
      ))}
    </div>
  );
}
function ResumeUpload({ go }) {
  const [drag, setDrag] = useState(false);
  return (
    <div className="screen" style={{ padding: "16px 24px 40px" }}>
      <Dots current={2} />
      <BackBtn go={go} to="roleselect" />
      <h1
        style={{
          fontSize: 26,
          fontWeight: 700,
          letterSpacing: -0.5,
          marginBottom: 6,
        }}
      >
        Add Your Resume
      </h1>
      <p style={{ color: C.g500, fontSize: 14, marginBottom: 22 }}>
        We will scan it instantly and give you a real ATS score.
      </p>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDrag(true);
        }}
        onDragLeave={() => setDrag(false)}
        onDrop={() => {
          setDrag(false);
          go("parsing");
        }}
        onClick={() => go("parsing")}
        style={{
          border: `2px dashed ${drag ? C.green : C.g300}`,
          borderRadius: 22,
          padding: "44px 24px",
          textAlign: "center",
          cursor: "pointer",
          marginBottom: 16,
          background: drag ? `${C.green}08` : "transparent",
          transition: "all .2s",
        }}
      >
        <div style={{ fontSize: 52, marginBottom: 12 }}>📄</div>
        <p
          style={{
            color: "#fff",
            fontWeight: 700,
            fontSize: 16,
            marginBottom: 6,
          }}
        >
          Drop your resume here
        </p>
        <p style={{ color: C.g500, fontSize: 13, marginBottom: 14 }}>
          PDF or DOCX · Max 5MB
        </p>
        <div
          style={{
            display: "inline-block",
            background: `${C.green}22`,
            border: `1px solid ${C.green}44`,
            color: C.green,
            fontSize: 13,
            fontWeight: 600,
            padding: "9px 22px",
            borderRadius: 22,
          }}
        >
          Browse Files
        </div>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 10,
          marginBottom: 14,
        }}
      >
        {[
          ["🔗", "LinkedIn"],
          ["🗂️", "Google Drive"],
          ["✍️", "Build Resume"],
          ["☁️", "Dropbox"],
        ].map(([icon, label], i) => (
          <button
            key={i}
            onClick={() => go("parsing")}
            style={{
              padding: "13px 10px",
              borderRadius: 14,
              background: C.g100,
              border: `1px solid ${C.border}`,
              color: "#fff",
              fontWeight: 500,
              fontSize: 13,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 7,
            }}
          >
            {icon} {label}
          </button>
        ))}
      </div>
      <div
        style={{
          background: `${C.yellow}11`,
          border: `1px solid ${C.yellow}33`,
          borderRadius: 14,
          padding: "12px 16px",
        }}
      >
        <p
          style={{
            color: C.yellow,
            fontSize: 12,
            fontWeight: 700,
            marginBottom: 2,
          }}
        >
          ⚡ Pro Tip
        </p>
        <p style={{ color: C.g500, fontSize: 12 }}>
          Use simple PDF/DOCX without tables for best ATS results.
        </p>
      </div>
    </div>
  );
}
function Parsing({ go }) {
  const steps = [
    "Analyzing document structure…",
    "Extracting keywords & skills…",
    "Identifying impact verbs…",
    "Checking formatting standards…",
    "Detecting ATS blockers…",
    "Calculating final score…",
  ];
  const [step, setStep] = useState(0);
  useEffect(() => {
    if (step < steps.length) {
      const t = setTimeout(() => setStep((s) => s + 1), 720);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => go("score"), 600);
      return () => clearTimeout(t);
    }
  }, [step]);
  const pct = Math.round((step / steps.length) * 100);
  return (
    <div
      className="screen"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        padding: "40px 32px",
        textAlign: "center",
      }}
    >
      <Dots current={2} />
      <div
        style={{
          width: 100,
          height: 100,
          borderRadius: 28,
          background: `${C.green}15`,
          border: `2px solid ${C.green}33`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 46,
          margin: "32px auto 24px",
          position: "relative",
        }}
      >
        📄
        <div
          style={{
            position: "absolute",
            inset: -6,
            borderRadius: 34,
            border: `3px solid ${C.green}`,
            borderTopColor: "transparent",
            animation: "spin 1s linear infinite",
          }}
        />
      </div>
      <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>
        {step >= steps.length ? "Analysis Complete ✓" : "Analyzing Your Resume"}
      </h2>
      <p
        style={{
          color: C.green,
          fontSize: 14,
          fontWeight: 600,
          marginBottom: 30,
          minHeight: 22,
        }}
      >
        {steps[Math.min(step, steps.length - 1)]}
      </p>
      <div
        style={{
          width: "100%",
          maxWidth: 300,
          height: 8,
          background: C.g100,
          borderRadius: 4,
          overflow: "hidden",
          marginBottom: 10,
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${pct}%`,
            background: `linear-gradient(90deg,${C.green},#00E676)`,
            borderRadius: 4,
            transition: "width .65s ease",
          }}
        />
      </div>
      <p style={{ color: C.g500, fontSize: 13 }}>{pct}% complete</p>
    </div>
  );
}
function ATSScore({ go }) {
  const breakdown = [
    {
      label: "Formatting",
      score: 10,
      max: 10,
      note: "PDF format is perfect.",
      col: C.green,
      icon: "✅",
    },
    {
      label: "Keywords",
      score: 5,
      max: 10,
      note: "Missing: Python, Agile, Docker.",
      col: C.yellow,
      icon: "⚠️",
    },
    {
      label: "Impact Verbs",
      score: 3,
      max: 10,
      note: "Low usage of action verbs.",
      col: C.red,
      icon: "❌",
    },
    {
      label: "Readability",
      score: 9,
      max: 10,
      note: "Clear structure & layout.",
      col: C.green,
      icon: "✅",
    },
    {
      label: "Soft Skills",
      score: 7,
      max: 10,
      note: "Communication highlighted.",
      col: C.green,
      icon: "✅",
    },
    {
      label: "ATS Compat.",
      score: 9,
      max: 10,
      note: "No tables or graphics detected.",
      col: C.green,
      icon: "✅",
    },
  ];
  return (
    <div className="screen" style={{ padding: "16px 24px 40px" }}>
      <Dots current={3} />
      <BackBtn go={go} to="upload" />
      <div style={{ textAlign: "center", margin: "8px 0 20px" }}>
        <Label>Your ATS Score</Label>
        <div style={{ margin: "14px 0" }}>
          <Radial score={78} size={166} />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 8,
            flexWrap: "wrap",
          }}
        >
          <Pill color={C.yellow}>Needs Improvement</Pill>
          <Pill color={C.green}>Top 40%</Pill>
        </div>
        <p style={{ color: C.g500, fontSize: 13, marginTop: 10 }}>
          3 key fixes will boost your score significantly.
        </p>
      </div>
      <h3
        style={{
          color: "#fff",
          fontSize: 15,
          fontWeight: 700,
          marginBottom: 12,
        }}
      >
        Score Breakdown
      </h3>
      {breakdown.map((b, i) => (
        <Card key={i} style={{ marginBottom: 10 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 8,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 16 }}>{b.icon}</span>
              <span style={{ color: "#fff", fontWeight: 600, fontSize: 14 }}>
                {b.label}
              </span>
            </div>
            <span style={{ color: b.col, fontWeight: 700, fontSize: 14 }}>
              {b.score}/{b.max}
            </span>
          </div>
          <div
            style={{
              height: 5,
              background: C.g100,
              borderRadius: 3,
              overflow: "hidden",
              marginBottom: 6,
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${(b.score / b.max) * 100}%`,
                background: b.col,
                borderRadius: 3,
              }}
            />
          </div>
          <p style={{ color: C.g500, fontSize: 12 }}>{b.note}</p>
        </Card>
      ))}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 10,
          marginTop: 16,
        }}
      >
        <BtnPrimary onClick={() => go("aifeedback")}>Fix with AI ✦</BtnPrimary>
        <BtnSecondary onClick={() => go("dashboard")}>Dashboard →</BtnSecondary>
      </div>
    </div>
  );
}
function AIFeedback({ go }) {
  const fixes = [
    {
      tag: "🎯 Impact",
      old: "Responsible for managing sales team",
      fix: "Led team of 5, driving 32% revenue growth in Q3",
    },
    {
      tag: "🔑 Keyword",
      old: "Used project tools at work",
      fix: "Delivered projects using Agile & Jira workflows",
    },
    {
      tag: "⚖️ Bias",
      old: "Photo included in resume header",
      fix: "Remove photo to ensure bias-free ATS parsing",
    },
    {
      tag: "⚡ Action",
      old: "Helped with product launches",
      fix: "Spearheaded 4 product launches across APAC markets",
    },
    {
      tag: "📊 Metrics",
      old: "Improved customer satisfaction",
      fix: "Increased NPS by 28 pts, reducing churn by 18%",
    },
  ];
  const [applied, setApplied] = useState(fixes.map(() => false));
  const count = applied.filter(Boolean).length;
  return (
    <div className="screen" style={{ padding: "16px 24px 40px" }}>
      <BackBtn go={go} to="score" />
      <h1
        style={{
          fontSize: 24,
          fontWeight: 700,
          letterSpacing: -0.5,
          marginBottom: 6,
        }}
      >
        AI Suggestions
      </h1>
      <p style={{ color: C.g500, fontSize: 14, marginBottom: 16 }}>
        Apply fixes to boost your score by up to +22 points.
      </p>
      {count > 0 && (
        <div
          style={{
            background: `${C.green}15`,
            border: `1px solid ${C.green}33`,
            borderRadius: 14,
            padding: "10px 16px",
            marginBottom: 16,
          }}
        >
          <p style={{ color: C.green, fontSize: 13, fontWeight: 700 }}>
            ✓ {count} fix{count > 1 ? "es" : ""} applied · Estimated boost: +
            {count * 4}pts
          </p>
        </div>
      )}
      {fixes.map((f, i) => (
        <Card
          key={i}
          style={{
            marginBottom: 12,
            borderColor: applied[i] ? `${C.green}44` : C.border,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 10,
            }}
          >
            <Pill color={C.purple}>{f.tag}</Pill>
            {applied[i] && <Pill color={C.green}>Applied ✓</Pill>}
          </div>
          <p
            style={{
              color: "rgba(255,255,255,0.3)",
              fontSize: 13,
              textDecoration: "line-through",
              marginBottom: 6,
              lineHeight: 1.5,
            }}
          >
            {f.old}
          </p>
          <p
            style={{
              color: C.green,
              fontSize: 13,
              fontWeight: 600,
              lineHeight: 1.5,
            }}
          >
            {f.fix}
          </p>
          {!applied[i] && (
            <button
              onClick={() =>
                setApplied((a) => a.map((v, j) => (j === i ? true : v)))
              }
              style={{
                marginTop: 12,
                padding: "8px 18px",
                borderRadius: 10,
                background: `${C.green}22`,
                border: `1px solid ${C.green}44`,
                color: C.green,
                fontSize: 12,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Apply Fix
            </button>
          )}
        </Card>
      ))}
      <BtnPrimary onClick={() => go("dashboard")} style={{ marginTop: 8 }}>
        {count > 0
          ? `Applied ${count} fix${count > 1 ? "es" : ""} → View Dashboard`
          : "Skip → View Dashboard"}
      </BtnPrimary>
    </div>
  );
}
function Dashboard({ go }) {
  const [jobs, setJobs] = useState([]);
  const [apps, setApps] = useState([]);

  useEffect(() => {
    window.API.getJobs().then(data => {
      if (Array.isArray(data)) {
        setJobs(data.slice(0, 5).map(d => ({
          ...d,
          match: 85 + Math.floor(Math.random() * 12),
          logo: (d.company || 'C')[0],
          col: `hsl(${Math.random() * 360}, 60%, 50%)`,
          loc: d.location || 'Remote'
        })));
      }
    });

    if (window.API.user && window.API.user.id) {
      window.API.getApplications(window.API.user.id).then(data => {
        if (Array.isArray(data)) {
          setApps(data.map(d => ({
            role: d.title,
            company: d.company,
            status: d.status || "Applied",
            col: d.status === 'Applied' ? C.purple : C.green,
            date: "Recent"
          })));
        }
      });
    }
  }, []);
  return (
    <div className="screen" style={{ padding: "16px 20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
          paddingTop: 8,
        }}
      >
        <div>
          <Label>Good morning</Label>
          <h1 style={{ fontSize: 22, fontWeight: 700, letterSpacing: -0.5 }}>
            Alesha Hyocinth 👋
          </h1>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={() => go("notifications")}
            style={{
              width: 38,
              height: 38,
              borderRadius: "50%",
              background: C.g100,
              border: `1px solid ${C.border}`,
              color: "#fff",
              fontSize: 16,
              cursor: "pointer",
              position: "relative",
            }}
          >
            🔔
            <div
              style={{
                position: "absolute",
                top: 6,
                right: 6,
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: C.red,
                border: "2px solid #0d2340",
              }}
            />
          </button>
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: "50%",
              background: `linear-gradient(135deg,${C.green},${C.greenDark})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontWeight: 700,
              fontSize: 15,
            }}
          >
            A
          </div>
        </div>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 10,
          marginBottom: 10,
        }}
      >
        <div
          style={{
            background: `linear-gradient(145deg,rgba(0,200,83,.18),rgba(0,200,83,.04))`,
            border: `1px solid rgba(0,200,83,.25)`,
            borderRadius: 20,
            padding: 16,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Label>ATS Score</Label>
          <div style={{ marginTop: 8 }}>
            <Radial score={78} size={110} />
          </div>
          <span
            style={{
              color: C.yellow,
              fontSize: 11,
              fontWeight: 700,
              marginTop: 8,
            }}
          >
            ↑ +7 this week
          </span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <Card style={{ flex: 1 }}>
            <Label>Active Apps</Label>
            <p
              style={{
                color: "#fff",
                fontSize: 30,
                fontWeight: 700,
                letterSpacing: -1,
                lineHeight: 1,
              }}
            >
              4
            </p>
            <p style={{ color: C.g500, fontSize: 11, marginTop: 3 }}>
              2 viewed this week
            </p>
          </Card>
          <div
            style={{
              background: `linear-gradient(145deg,rgba(255,214,0,.15),rgba(255,214,0,.04))`,
              border: `1px solid rgba(255,214,0,.25)`,
              borderRadius: 18,
              padding: 14,
            }}
          >
            <Label>Interview</Label>
            <p
              style={{
                color: C.yellow,
                fontSize: 30,
                fontWeight: 700,
                letterSpacing: -1,
                lineHeight: 1,
              }}
            >
              1
            </p>
            <p style={{ color: C.g500, fontSize: 11, marginTop: 3 }}>
              @ Figma · Mar 8
            </p>
          </div>
        </div>
      </div>
      <div
        onClick={() => go("autoapply")}
        style={{
          background: `linear-gradient(135deg,rgba(99,91,255,.22),rgba(0,200,83,.12))`,
          border: `1px solid rgba(99,91,255,.35)`,
          borderRadius: 18,
          padding: "14px 16px",
          marginBottom: 10,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 13,
            background: `${C.purple}33`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 22,
            flexShrink: 0,
          }}
        >
          ⚡
        </div>
        <div style={{ flex: 1 }}>
          <p style={{ color: "#fff", fontSize: 14, fontWeight: 700 }}>
            Auto-Apply is Ready!
          </p>
          <p style={{ color: C.g500, fontSize: 12 }}>
            12 jobs match your profile above 90%
          </p>
        </div>
        <span style={{ color: C.green, fontSize: 20 }}>›</span>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <h3 style={{ color: "#fff", fontSize: 15, fontWeight: 700 }}>
          Recommended Jobs
        </h3>
        <span
          style={{ color: C.g500, fontSize: 13, cursor: "pointer" }}
          onClick={() => go("search")}
        >
          See all →
        </span>
      </div>
      <div
        style={{
          display: "flex",
          gap: 10,
          overflowX: "auto",
          paddingBottom: 8,
          marginBottom: 14,
        }}
      >
        {jobs.map((j, i) => (
          <div
            key={i}
            className="hover-lift"
            onClick={() => {
              window.API.selectedJob = j;
              go("jobdetail");
            }}
            style={{
              minWidth: 180,
              background: C.g100,
              border: `1px solid ${C.border}`,
              borderRadius: 18,
              padding: 14,
              cursor: "pointer",
              flexShrink: 0,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 10,
              }}
            >
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  background: j.col,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: 15,
                }}
              >
                {j.logo}
              </div>
              <Pill
                color={
                  j.match >= 90 ? C.green : j.match >= 80 ? C.yellow : C.g500
                }
              >
                {j.match}%
              </Pill>
            </div>
            <p
              style={{
                color: "#fff",
                fontSize: 13,
                fontWeight: 600,
                lineHeight: 1.3,
                marginBottom: 3,
              }}
            >
              {j.title}
            </p>
            <p style={{ color: C.g500, fontSize: 12, marginBottom: 8 }}>
              {j.company} · {j.loc}
            </p>
            <p
              style={{
                color: "rgba(255,255,255,.6)",
                fontSize: 12,
                fontWeight: 500,
                marginBottom: 10,
              }}
            >
              {j.salary}
            </p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                window.API.selectedJob = j;
                go("applyconfirm");
              }}
              style={{
                width: "100%",
                padding: 8,
                borderRadius: 10,
                background: `${C.green}18`,
                border: `1px solid ${C.green}33`,
                color: C.green,
                fontSize: 12,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Quick Apply ⚡
            </button>
          </div>
        ))}
      </div>
      <h3
        style={{
          color: "#fff",
          fontSize: 15,
          fontWeight: 700,
          marginBottom: 10,
        }}
      >
        Application Tracker
      </h3>
      <Card style={{ marginBottom: 12 }}>
        {apps.map((a, i) => (
          <div
            key={i}
            onClick={() => go("applications")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              paddingBottom: i < apps.length - 1 ? 12 : 0,
              marginBottom: i < apps.length - 1 ? 12 : 0,
              borderBottom:
                i < apps.length - 1 ? `1px solid ${C.border}` : "none",
              cursor: "pointer",
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: C.g200,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontWeight: 700,
                fontSize: 14,
                flexShrink: 0,
              }}
            >
              {a.company[0]}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p
                style={{
                  color: "#fff",
                  fontSize: 13,
                  fontWeight: 500,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {a.role}
              </p>
              <p style={{ color: C.g500, fontSize: 12 }}>
                {a.company} · {a.date}
              </p>
            </div>
            <Pill color={a.col}>{a.status}</Pill>
          </div>
        ))}
      </Card>
      <div
        style={{
          background: `linear-gradient(135deg,rgba(99,91,255,.2),rgba(99,91,255,.05))`,
          border: `1px solid rgba(99,91,255,.3)`,
          borderRadius: 18,
          padding: "16px 18px",
        }}
      >
        <div style={{ display: "flex", gap: 12 }}>
          <span style={{ fontSize: 22 }}>✦</span>
          <div>
            <p
              style={{
                color: "#fff",
                fontSize: 13,
                fontWeight: 700,
                marginBottom: 5,
              }}
            >
              AI Insight
            </p>
            <p style={{ color: C.g500, fontSize: 12, lineHeight: 1.7 }}>
              Adding{" "}
              <span style={{ color: C.green, fontWeight: 700 }}>AWS</span> &{" "}
              <span style={{ color: C.green, fontWeight: 700 }}>Docker</span>{" "}
              could boost match rate by{" "}
              <span style={{ color: C.yellow, fontWeight: 700 }}>+23%</span> for
              senior roles.
            </p>
            <button
              onClick={() => go("skillgap")}
              style={{
                marginTop: 10,
                background: "rgba(99,91,255,.3)",
                border: "1px solid rgba(99,91,255,.4)",
                color: "#fff",
                fontSize: 12,
                padding: "6px 14px",
                borderRadius: 20,
                cursor: "pointer",
              }}
            >
              View Skill Gap →
            </button>
          </div>
        </div>
      </div>
      <BottomNav active="dashboard" go={go} />
    </div>
  );
}
function Notifications({ go }) {
  const notifs = [
    {
      icon: "⭐",
      title: "New Match!",
      body: "You are a 96% match for Stripe's Senior Designer role.",
      time: "2m ago",
      col: C.green,
      unread: true,
    },
    {
      icon: "👁️",
      title: "Profile Viewed",
      body: "A recruiter from Figma viewed your profile.",
      time: "1h ago",
      col: C.blue,
      unread: true,
    },
    {
      icon: "📅",
      title: "Interview Scheduled",
      body: "Figma interview confirmed for Mar 8 at 2PM EST.",
      time: "3h ago",
      col: C.yellow,
      unread: true,
    },
    {
      icon: "🎉",
      title: "Offer Received!",
      body: "Linear has sent you an offer letter. Review now.",
      time: "1d ago",
      col: C.green,
      unread: false,
    },
    {
      icon: "⚠️",
      title: "Action Needed",
      body: "Complete your profile to boost visibility by 2×.",
      time: "2d ago",
      col: C.red,
      unread: false,
    },
    {
      icon: "🎓",
      title: "Course Complete",
      body: "Python Basics completed. ATS score boosted +5 pts.",
      time: "3d ago",
      col: C.purple,
      unread: false,
    },
  ];
  const [items, setItems] = useState(notifs);
  const unread = items.filter((n) => n.unread).length;
  return (
    <div className="screen" style={{ padding: "16px 20px 40px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: 8,
          marginBottom: 20,
        }}
      >
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700, letterSpacing: -0.5 }}>
            Notifications
          </h1>
          {unread > 0 && (
            <p style={{ color: C.g500, fontSize: 13 }}>{unread} unread</p>
          )}
        </div>
        <span
          onClick={() =>
            setItems((i) => i.map((n) => ({ ...n, unread: false })))
          }
          style={{ color: C.green, fontSize: 13, cursor: "pointer" }}
        >
          Mark all read
        </span>
      </div>
      {items.map((n, i) => (
        <Card
          key={i}
          style={{
            display: "flex",
            gap: 14,
            marginBottom: 10,
            borderColor: n.unread ? `${n.col}33` : C.border,
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 13,
              background: `${n.col}22`,
              border: `1px solid ${n.col}33`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 20,
              flexShrink: 0,
              position: "relative",
            }}
          >
            {n.icon}
            {n.unread && (
              <div
                style={{
                  position: "absolute",
                  top: 4,
                  right: 4,
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: n.col,
                }}
              />
            )}
          </div>
          <div style={{ flex: 1 }}>
            <p
              style={{
                color: "#fff",
                fontSize: 14,
                fontWeight: 700,
                marginBottom: 3,
              }}
            >
              {n.title}
            </p>
            <p
              style={{
                color: C.g500,
                fontSize: 13,
                lineHeight: 1.5,
                marginBottom: 4,
              }}
            >
              {n.body}
            </p>
            <p style={{ color: "rgba(255,255,255,.25)", fontSize: 11 }}>
              {n.time}
            </p>
          </div>
        </Card>
      ))}
      <BottomNav active="dashboard" go={go} />
    </div>
  );
}
function Search({ go }) {
  const [q, setQ] = useState("");
  const jobs = [
    {
      title: "Senior Product Designer",
      company: "Stripe",
      loc: "Remote",
      salary: "$140–180k",
      match: 96,
      logo: "S",
      col: "#635BFF",
    },
    {
      title: "UX Designer II",
      company: "Airbnb",
      loc: "SF",
      salary: "$120–150k",
      match: 88,
      logo: "A",
      col: "#FF5A5F",
    },
    {
      title: "Product Designer",
      company: "Spotify",
      loc: "NYC",
      salary: "$125–160k",
      match: 85,
      logo: "S",
      col: "#1DB954",
    },
    {
      title: "Design Systems Lead",
      company: "Atlassian",
      loc: "Remote",
      salary: "$130–165k",
      match: 80,
      logo: "A",
      col: "#0052CC",
    },
    {
      title: "Design Engineer",
      company: "Vercel",
      loc: "Remote",
      salary: "$135–170k",
      match: 76,
      logo: "V",
      col: "#111",
    },
    {
      title: "Head of Design",
      company: "Figma",
      loc: "SF",
      salary: "$160–200k",
      match: 72,
      logo: "F",
      col: "#F24E1E",
    },
  ];
  const filtered = jobs.filter(
    (j) =>
      j.title.toLowerCase().includes(q.toLowerCase()) ||
      j.company.toLowerCase().includes(q.toLowerCase()),
  );
  return (
    <div className="screen" style={{ padding: "16px 20px" }}>
      <h1
        style={{
          fontSize: 24,
          fontWeight: 700,
          letterSpacing: -0.5,
          paddingTop: 8,
          marginBottom: 14,
        }}
      >
        Find Jobs
      </h1>
      <div style={{ position: "relative", marginBottom: 14 }}>
        <span
          style={{
            position: "absolute",
            left: 14,
            top: "50%",
            transform: "translateY(-50%)",
            fontSize: 16,
          }}
        >
          🔍
        </span>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search roles, companies…"
          style={{
            width: "100%",
            padding: "14px 14px 14px 44px",
            borderRadius: 14,
            background: C.g100,
            border: `1px solid ${C.border}`,
            color: "#fff",
            fontSize: 14,
          }}
        />
      </div>
      <div
        style={{ display: "flex", gap: 8, marginBottom: 16, overflowX: "auto" }}
      >
        {["All", "Remote", "$100k+", "Design", "Engineering"].map((f) => (
          <button
            key={f}
            style={{
              padding: "7px 14px",
              borderRadius: 20,
              background: f === "All" ? C.green : C.g100,
              border: `1px solid ${f === "All" ? C.green : C.border}`,
              color: f === "All" ? C.navy : C.g500,
              fontSize: 12,
              fontWeight: 700,
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            {f}
          </button>
        ))}
      </div>
      {filtered.length === 0 && (
        <div style={{ textAlign: "center", padding: "40px 0", color: C.g400 }}>
          No results for "{q}"
        </div>
      )}
      {filtered.map((j, i) => (
        <Card
          key={i}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            marginBottom: 10,
            cursor: "pointer",
          }}
          className="hover-lift"
          onClick={() => go("jobdetail")}
        >
          <div
            style={{
              width: 46,
              height: 46,
              borderRadius: 14,
              background: j.col,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontWeight: 700,
              fontSize: 18,
              flexShrink: 0,
            }}
          >
            {j.logo}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p
              style={{
                color: "#fff",
                fontSize: 14,
                fontWeight: 600,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {j.title}
            </p>
            <p style={{ color: C.g500, fontSize: 12, marginBottom: 4 }}>
              {j.company} · {j.loc}
            </p>
            <p
              style={{
                color: "rgba(255,255,255,.5)",
                fontSize: 12,
                fontWeight: 500,
              }}
            >
              {j.salary}
            </p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              gap: 6,
            }}
          >
            <Pill
              color={
                j.match >= 90 ? C.green : j.match >= 80 ? C.yellow : C.g500
              }
            >
              {j.match}%
            </Pill>
            <button
              onClick={(e) => {
                e.stopPropagation();
                go("applyconfirm");
              }}
              style={{
                padding: "6px 12px",
                borderRadius: 10,
                background: `${C.green}18`,
                border: `1px solid ${C.green}33`,
                color: C.green,
                fontSize: 11,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Apply ⚡
            </button>
          </div>
        </Card>
      ))}
      <BottomNav active="search" go={go} />
    </div>
  );
}
function JobDetail({ go }) {
  const [tab, setTab] = useState("Overview");
  const tabs = ["Overview", "Requirements", "Benefits", "Culture"];
  return (
    <div
      className="screen"
      style={{
        padding: 0,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          background: `linear-gradient(160deg,#1a1060,${C.navy})`,
          padding: "50px 24px 24px",
          position: "relative",
        }}
      >
        <button
          onClick={() => go("dashboard")}
          style={{
            position: "absolute",
            top: 14,
            left: 16,
            background: C.g100,
            border: `1px solid ${C.border}`,
            color: "#fff",
            borderRadius: 10,
            width: 36,
            height: 36,
            cursor: "pointer",
            fontSize: 20,
          }}
        >
          ‹
        </button>
        <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              background: "#635BFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontWeight: 700,
              fontSize: 22,
            }}
          >
            S
          </div>
          <div>
            <h2
              style={{
                fontSize: 20,
                fontWeight: 700,
                letterSpacing: -0.5,
                marginBottom: 4,
              }}
            >
              Senior Product Designer
            </h2>
            <p style={{ color: C.g500, fontSize: 13 }}>
              Stripe · Remote · $140–180k
            </p>
          </div>
        </div>
        <div
          style={{ display: "flex", gap: 8, marginTop: 14, flexWrap: "wrap" }}
        >
          <Pill color={C.green}>96% Match</Pill>
          <Pill color={C.purple}>Top Choice</Pill>
          <Pill color={C.yellow}>Closes Mar 20</Pill>
        </div>
      </div>
      <div style={{ display: "flex", borderBottom: `1px solid ${C.border}` }}>
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              flex: 1,
              padding: "13px 4px",
              background: "none",
              border: "none",
              borderBottom:
                tab === t ? `2px solid ${C.green}` : "2px solid transparent",
              color: tab === t ? C.green : C.g500,
              fontSize: 13,
              fontWeight: tab === t ? 700 : 400,
              cursor: "pointer",
            }}
          >
            {t}
          </button>
        ))}
      </div>
      <div style={{ padding: "20px 24px", flex: 1 }}>
        {tab === "Overview" && (
          <>
            <p
              style={{
                color: C.g500,
                fontSize: 14,
                lineHeight: 1.8,
                marginBottom: 16,
              }}
            >
              We are looking for a Senior Product Designer to join Stripe's
              platform team. You will design core products used by millions of
              businesses worldwide.
            </p>
            <h4 style={{ color: "#fff", fontWeight: 700, marginBottom: 10 }}>
              Why this matches you
            </h4>
            {[
              "Matches your Figma & Prototyping skills",
              "Remote-first culture",
              "Competitive equity package",
              "Aligns with your salary expectations",
            ].map((r, i) => (
              <div
                key={i}
                style={{ display: "flex", gap: 10, marginBottom: 8 }}
              >
                <span style={{ color: C.green }}>✓</span>
                <p style={{ color: C.g500, fontSize: 13 }}>{r}</p>
              </div>
            ))}
          </>
        )}
        {tab === "Requirements" &&
          [
            "5+ years product design experience",
            "Expert in Figma & prototyping",
            "Design systems experience",
            "Strong shipped product portfolio",
            "Excellent communication skills",
          ].map((r, i) => (
            <div key={i} style={{ display: "flex", gap: 10, marginBottom: 12 }}>
              <span style={{ color: i < 3 ? C.green : C.yellow }}>
                {i < 3 ? "✓" : "~"}
              </span>
              <p style={{ color: C.g500, fontSize: 13, lineHeight: 1.5 }}>
                {r}
              </p>
            </div>
          ))}
        {tab === "Benefits" && (
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}
          >
            {[
              ["🏥", "Health & Dental"],
              ["📈", "Equity Package"],
              ["🏖️", "Unlimited PTO"],
              ["💻", "$3k Setup Budget"],
              ["🎓", "Learning Fund"],
              ["🌍", "Remote Flex"],
            ].map(([icon, label]) => (
              <Card
                key={label}
                style={{ textAlign: "center", padding: "16px 10px" }}
              >
                <div style={{ fontSize: 26, marginBottom: 6 }}>{icon}</div>
                <p style={{ color: "#fff", fontSize: 12, fontWeight: 600 }}>
                  {label}
                </p>
              </Card>
            ))}
          </div>
        )}
        {tab === "Culture" && (
          <p style={{ color: C.g500, fontSize: 14, lineHeight: 1.8 }}>
            Stripe values curiosity, craft, and global impact. We build economic
            infrastructure for the internet — and design is a first-class
            citizen at every level of our product.
          </p>
        )}
      </div>
      <div
        style={{
          padding: "12px 24px 24px",
          borderTop: `1px solid ${C.border}`,
          display: "grid",
          gridTemplateColumns: "1fr auto",
          gap: 10,
        }}
      >
        <BtnPrimary onClick={() => go("applyconfirm")}>
          Quick Apply ⚡
        </BtnPrimary>
        <button
          style={{
            width: 48,
            height: 50,
            borderRadius: 14,
            background: C.g100,
            border: `1px solid ${C.border}`,
            color: "#fff",
            fontSize: 20,
            cursor: "pointer",
          }}
        >
          🔖
        </button>
      </div>
    </div>
  );
}
function ApplyConfirm({ go }) {
  const [sent, setSent] = useState(false);
  const j = window.API.selectedJob || { title: "Senior Product Designer", company: "Stripe", loc: "Remote", salary: "$140–180k", match: 96, col: "#635BFF", logo: "S" };
  
  const handleApply = async () => {
    if (window.API.user?.id && j.id) {
      await window.API.apply(window.API.user.id, j.id, j.match);
    }
    setSent(true);
  };

  return (
    <div className="screen" style={{ padding: "16px 24px 40px" }}>
      <BackBtn go={go} to="dashboard" />
      <h1
        style={{
          fontSize: 24,
          fontWeight: 700,
          letterSpacing: -0.5,
          marginBottom: 6,
        }}
      >
        Review & Apply
      </h1>
      <p style={{ color: C.g500, fontSize: 14, marginBottom: 22 }}>
        Check everything before sending.
      </p>
      <div
        style={{
          background: `linear-gradient(135deg,rgba(99,91,255,.2),rgba(99,91,255,.05))`,
          border: `1px solid rgba(99,91,255,.3)`,
          borderRadius: 18,
          padding: "18px 20px",
          marginBottom: 14,
        }}
      >
        <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
          <div
            style={{
              width: 50,
              height: 50,
              borderRadius: 14,
              background: j.col || "#635BFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontWeight: 700,
              fontSize: 22,
            }}
          >
            {j.logo}
          </div>
          <div>
            <p style={{ color: "#fff", fontSize: 16, fontWeight: 700 }}>
              {j.title}
            </p>
            <p style={{ color: C.g500, fontSize: 13 }}>
              {j.company} · {j.loc} · {j.salary}
            </p>
          </div>
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
          <Pill color={C.green}>{j.match}% Match</Pill>
          <Pill color={C.purple}>AI Optimized</Pill>
        </div>
      </div>
      {[
        ["📄", "Resume", window.API.user?.name + "_Resume.pdf" || "Alesha_Resume_v2.pdf", "ATS Score: 78/100"],
        ["✉️", "Cover Letter", "AI-Generated", `Tailored for ${j.company}`],
        ["👤", "Contact", window.API.user?.email || "alesha@email.com", "Verified ✓"],
      ].map(([icon, label, val, sub], i) => (
        <Card
          key={i}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            marginBottom: 10,
          }}
        >
          <span style={{ fontSize: 22 }}>{icon}</span>
          <div style={{ flex: 1 }}>
            <Label>{label}</Label>
            <p style={{ color: "#fff", fontSize: 14, fontWeight: 600 }}>
              {val}
            </p>
            <p style={{ color: C.g500, fontSize: 12 }}>{sub}</p>
          </div>
          <span style={{ color: C.green, fontSize: 18 }}>✓</span>
        </Card>
      ))}
      {!sent ? (
        <BtnPrimary onClick={handleApply} style={{ marginTop: 8 }}>
          Tap to Send Application →
        </BtnPrimary>
      ) : (
        <div
          style={{
            textAlign: "center",
            background: `${C.green}11`,
            border: `1px solid ${C.green}33`,
            borderRadius: 20,
            padding: "32px 24px",
          }}
        >
          <div style={{ fontSize: 52, marginBottom: 10 }}>🎉</div>
          <p
            style={{
              color: C.green,
              fontSize: 22,
              fontWeight: 700,
              marginBottom: 8,
            }}
          >
            Application Sent!
          </p>
          <p style={{ color: C.g500, fontSize: 14, marginBottom: 20 }}>
            We will notify you when Stripe views it.
          </p>
          <BtnPrimary
            onClick={() => go("dashboard")}
            style={{
              width: "auto",
              padding: "12px 28px",
              display: "inline-block",
            }}
          >
            Back to Dashboard →
          </BtnPrimary>
        </div>
      )}
    </div>
  );
}
function Applications({ go }) {
  const [filter, setFilter] = useState("All");
  const apps = [
    {
      role: "Senior Product Designer",
      company: "Stripe",
      status: "Interview",
      col: C.yellow,
      date: "Mar 2",
      logo: "S",
      lc: "#635BFF",
    },
    {
      role: "Head of Design",
      company: "Figma",
      status: "Viewed",
      col: C.blue,
      date: "Feb 28",
      logo: "F",
      lc: "#F24E1E",
    },
    {
      role: "Design Lead",
      company: "Linear",
      status: "Offer 🎉",
      col: C.green,
      date: "Feb 20",
      logo: "L",
      lc: "#5E6AD2",
    },
    {
      role: "UX Researcher",
      company: "Notion",
      status: "Applied",
      col: C.g500,
      date: "Feb 25",
      logo: "N",
      lc: "#333",
    },
    {
      role: "Design Engineer",
      company: "Vercel",
      status: "Rejected",
      col: C.red,
      date: "Feb 15",
      logo: "V",
      lc: "#111",
    },
  ];
  const filtered =
    filter === "All" ? apps : apps.filter((a) => a.status.includes(filter));
  return (
    <div className="screen" style={{ padding: "16px 20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: 8,
          marginBottom: 16,
        }}
      >
        <h1 style={{ fontSize: 24, fontWeight: 700, letterSpacing: -0.5 }}>
          Applications
        </h1>
        <span style={{ color: C.g500, fontSize: 13 }}>{apps.length} total</span>
      </div>
      <div
        style={{
          display: "flex",
          gap: 8,
          marginBottom: 16,
          overflowX: "auto",
          paddingBottom: 4,
        }}
      >
        {["All", "Active", "Interview", "Offer", "Rejected"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            style={{
              padding: "7px 14px",
              borderRadius: 20,
              background: filter === f ? C.green : C.g100,
              border: `1px solid ${filter === f ? C.green : C.border}`,
              color: filter === f ? C.navy : C.g500,
              fontSize: 12,
              fontWeight: 700,
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            {f}
          </button>
        ))}
      </div>
      {filtered.map((a, i) => (
        <Card
          key={i}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 10,
            cursor: "pointer",
          }}
          onClick={() => go("jobdetail")}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: a.lc,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontWeight: 700,
              fontSize: 18,
              flexShrink: 0,
            }}
          >
            {a.logo}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p
              style={{
                color: "#fff",
                fontSize: 14,
                fontWeight: 600,
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {a.role}
            </p>
            <p style={{ color: C.g500, fontSize: 12 }}>
              {a.company} · {a.date}
            </p>
          </div>
          <Pill color={a.col}>{a.status}</Pill>
        </Card>
      ))}
      <BottomNav active="applications" go={go} />
    </div>
  );
}
function AutoApply({ go }) {
  const [enabled, setEnabled] = useState(false);
  const [minMatch, setMinMatch] = useState(90);
  const [prefs, setPrefs] = useState({
    remote: true,
    fulltime: true,
    nostartup: false,
    limit: true,
  });
  const jobs = [
    {
      title: "Sr. UX Designer",
      company: "Airbnb",
      match: 94,
      logo: "A",
      col: "#FF5A5F",
    },
    {
      title: "Product Designer",
      company: "Spotify",
      match: 91,
      logo: "S",
      col: "#1DB954",
    },
    {
      title: "Design Lead",
      company: "Shopify",
      match: 92,
      logo: "S",
      col: "#95BF47",
    },
  ];
  return (
    <div className="screen" style={{ padding: "16px 24px 40px" }}>
      <BackBtn go={go} to="dashboard" />
      <h1
        style={{
          fontSize: 24,
          fontWeight: 700,
          letterSpacing: -0.5,
          marginBottom: 6,
        }}
      >
        Auto-Apply
      </h1>
      <p style={{ color: C.g500, fontSize: 14, marginBottom: 20 }}>
        Let AI apply to matching jobs on your behalf.
      </p>
      <Card style={{ marginBottom: 14 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <p
              style={{
                color: "#fff",
                fontSize: 15,
                fontWeight: 700,
                marginBottom: 3,
              }}
            >
              Enable Auto-Apply
            </p>
            <p style={{ color: C.g500, fontSize: 12 }}>
              Automatically apply to high-match jobs
            </p>
          </div>
          <Toggle on={enabled} onToggle={() => setEnabled(!enabled)} />
        </div>
      </Card>
      <Card style={{ marginBottom: 14 }}>
        <p
          style={{
            color: "#fff",
            fontSize: 14,
            fontWeight: 700,
            marginBottom: 4,
          }}
        >
          Minimum Match Score
        </p>
        <p
          style={{
            color: C.green,
            fontSize: 32,
            fontWeight: 700,
            marginBottom: 10,
            letterSpacing: -1,
          }}
        >
          {minMatch}%
        </p>
        <input
          type="range"
          min={70}
          max={99}
          value={minMatch}
          onChange={(e) => setMinMatch(+e.target.value)}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 4,
          }}
        >
          <span style={{ color: C.g500, fontSize: 12 }}>70% (Broad)</span>
          <span style={{ color: C.g500, fontSize: 12 }}>99% (Strict)</span>
        </div>
      </Card>
      <Card style={{ marginBottom: 14 }}>
        <p
          style={{
            color: "#fff",
            fontSize: 14,
            fontWeight: 700,
            marginBottom: 14,
          }}
        >
          Preferences
        </p>
        {[
          ["Remote Only", "remote"],
          ["Full-time Only", "fulltime"],
          ["Exclude Startups", "nostartup"],
          ["Max 2 apps/day", "limit"],
        ].map(([label, key]) => (
          <div
            key={key}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 12,
            }}
          >
            <p style={{ color: C.g500, fontSize: 13 }}>{label}</p>
            <Toggle
              on={prefs[key]}
              onToggle={() => setPrefs((p) => ({ ...p, [key]: !p[key] }))}
            />
          </div>
        ))}
      </Card>
      <h3
        style={{
          color: "#fff",
          fontSize: 15,
          fontWeight: 700,
          marginBottom: 12,
        }}
      >
        Ready Queue ({jobs.length} jobs)
      </h3>
      {jobs.map((j, i) => (
        <Card
          key={i}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 10,
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 12,
              background: j.col,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontWeight: 700,
              fontSize: 16,
            }}
          >
            {j.logo}
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ color: "#fff", fontSize: 13, fontWeight: 600 }}>
              {j.title}
            </p>
            <p style={{ color: C.g500, fontSize: 12 }}>{j.company}</p>
          </div>
          <Pill color={C.green}>{j.match}%</Pill>
        </Card>
      ))}
      <BtnPrimary
        onClick={() => enabled && go("dashboard")}
        style={{ marginTop: 12 }}
        disabled={!enabled}
      >
        {enabled
          ? `⚡ Start Auto-Applying (${jobs.length} jobs)`
          : "Enable Auto-Apply First"}
      </BtnPrimary>
    </div>
  );
}
function SkillGap({ go }) {
  const yours = [
    "Figma",
    "Prototyping",
    "React",
    "User Research",
    "HTML/CSS",
    "Design Systems",
  ];
  const needed = ["AWS", "Docker", "Python", "Figma", "React", "TypeScript"];
  return (
    <div className="screen" style={{ padding: "16px 24px 40px" }}>
      <BackBtn go={go} to="dashboard" />
      <h1
        style={{
          fontSize: 24,
          fontWeight: 700,
          letterSpacing: -0.5,
          marginBottom: 6,
        }}
      >
        Skill Gap Analysis
      </h1>
      <p style={{ color: C.g500, fontSize: 14, marginBottom: 20 }}>
        Target: Senior Designer at Stripe
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 12,
          marginBottom: 18,
        }}
      >
        <div>
          <p
            style={{
              color: C.green,
              fontSize: 12,
              fontWeight: 700,
              marginBottom: 10,
            }}
          >
            ✓ Your Skills
          </p>
          {yours.map((s) => (
            <div
              key={s}
              style={{
                background: `${C.green}15`,
                border: `1px solid ${C.green}33`,
                borderRadius: 9,
                padding: "9px 12px",
                marginBottom: 8,
                color: C.green,
                fontSize: 13,
                fontWeight: 600,
              }}
            >
              {s}
            </div>
          ))}
        </div>
        <div>
          <p
            style={{
              color: C.red,
              fontSize: 12,
              fontWeight: 700,
              marginBottom: 10,
            }}
          >
            ⚠ Role Needs
          </p>
          {needed.map((s) => {
            const has = yours.includes(s);
            return (
              <div
                key={s}
                style={{
                  background: has ? `${C.green}15` : `${C.red}15`,
                  border: `1px solid ${has ? C.green : C.red}33`,
                  borderRadius: 9,
                  padding: "9px 12px",
                  marginBottom: 8,
                  color: has ? C.green : C.red,
                  fontSize: 13,
                  fontWeight: 600,
                }}
              >
                {s} {has ? "✓" : "⚠"}
              </div>
            );
          })}
        </div>
      </div>
      <div
        style={{
          background: `${C.red}11`,
          border: `1px solid ${C.red}33`,
          borderRadius: 16,
          padding: "16px 18px",
          marginBottom: 16,
        }}
      >
        <p
          style={{
            color: C.red,
            fontWeight: 700,
            fontSize: 14,
            marginBottom: 4,
          }}
        >
          ⚠ 4 Skills Missing
        </p>
        <p style={{ color: C.g500, fontSize: 13 }}>
          AWS, Docker, Python & TypeScript are required for 80% of your target
          roles.
        </p>
      </div>
      <BtnPrimary onClick={() => go("learning")}>
        View Learning Roadmap →
      </BtnPrimary>
    </div>
  );
}
function Learning({ go }) {
  const steps = [
    {
      title: "Python Basics",
      provider: "Coursera",
      time: "8 hrs",
      boost: "+5%",
      done: true,
    },
    {
      title: "AWS Fundamentals",
      provider: "AWS Training",
      time: "12 hrs",
      boost: "+10%",
      active: true,
      progress: 65,
    },
    {
      title: "Docker Essentials",
      provider: "Udemy",
      time: "6 hrs",
      boost: "+8%",
      locked: false,
    },
    {
      title: "TypeScript Pro",
      provider: "Frontend Masters",
      time: "10 hrs",
      boost: "+7%",
      locked: true,
    },
    {
      title: "System Design",
      provider: "educative.io",
      time: "20 hrs",
      boost: "+12%",
      locked: true,
    },
  ];
  return (
    <div className="screen" style={{ padding: "16px 24px" }}>
      <h1
        style={{
          fontSize: 24,
          fontWeight: 700,
          letterSpacing: -0.5,
          paddingTop: 8,
          marginBottom: 4,
        }}
      >
        Learning Roadmap
      </h1>
      <p style={{ color: C.g500, fontSize: 14, marginBottom: 20 }}>
        Close your skill gaps step by step.
      </p>
      <div style={{ position: "relative" }}>
        <div
          style={{
            position: "absolute",
            left: 20,
            top: 28,
            bottom: 28,
            width: 2,
            background: `linear-gradient(to bottom,${C.green},${C.g300})`,
            zIndex: 0,
          }}
        />
        {steps.map((s, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              gap: 14,
              marginBottom: 16,
              position: "relative",
              zIndex: 1,
            }}
          >
            <div
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                flexShrink: 0,
                background: s.done
                  ? C.green
                  : s.active
                    ? `${C.green}33`
                    : C.g100,
                border: `2px solid ${s.done ? C.green : s.active ? C.green : C.border}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 16,
              }}
            >
              {s.done ? "✓" : s.active ? "▶" : "🔒"}
            </div>
            <Card style={{ flex: 1, opacity: s.locked ? 0.5 : 1 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 6,
                }}
              >
                <p style={{ color: "#fff", fontSize: 14, fontWeight: 700 }}>
                  {s.title}
                </p>
                <Pill color={C.green}>{s.boost}</Pill>
              </div>
              <p
                style={{
                  color: C.g500,
                  fontSize: 12,
                  marginBottom: s.active ? 10 : 0,
                }}
              >
                {s.provider} · {s.time}
              </p>
              {s.active && (
                <>
                  <div
                    style={{
                      height: 4,
                      background: C.g100,
                      borderRadius: 2,
                      overflow: "hidden",
                      marginBottom: 8,
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${s.progress}%`,
                        background: C.green,
                        borderRadius: 2,
                      }}
                    />
                  </div>
                  <button
                    style={{
                      padding: "7px 16px",
                      borderRadius: 10,
                      background: `${C.green}22`,
                      border: `1px solid ${C.green}44`,
                      color: C.green,
                      fontSize: 12,
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    Continue Learning
                  </button>
                </>
              )}
            </Card>
          </div>
        ))}
      </div>
      <BottomNav active="learning" go={go} />
    </div>
  );
}
function InterviewPrep({ go }) {
  const [openQ, setOpenQ] = useState(null);
  const qs = [
    {
      q: "Tell me about a time you failed and what you learned.",
      hint: "Use the STAR method. Focus on a real example where you showed growth. Mention your learnings explicitly.",
    },
    {
      q: "How do you approach designing for accessibility?",
      hint: "Mention WCAG standards, color contrast, keyboard navigation, and screen readers. Share a specific example.",
    },
    {
      q: "Walk me through your design process for a complex feature.",
      hint: "Cover: research → wireframes → prototyping → testing → iteration. Emphasize user feedback loops.",
    },
    {
      q: "How do you handle design feedback from stakeholders?",
      hint: "Show you welcome feedback, ask clarifying questions, and can diplomatically advocate for UX decisions.",
    },
    {
      q: "What design tools are you proficient in and why do you prefer them?",
      hint: "Lead with Figma. Mention your familiarity with its collaboration features. Mention design systems experience.",
    },
  ];
  return (
    <div className="screen" style={{ padding: "16px 24px 40px" }}>
      <BackBtn go={go} to="dashboard" />
      <div
        style={{
          background: `linear-gradient(135deg,rgba(99,91,255,.22),rgba(0,200,83,.08))`,
          border: `1px solid rgba(99,91,255,.3)`,
          borderRadius: 18,
          padding: "18px 20px",
          marginBottom: 20,
        }}
      >
        <p style={{ color: C.g400, fontSize: 12, marginBottom: 4 }}>
          INTERVIEW PREP FOR
        </p>
        <h1
          style={{
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: -0.5,
            marginBottom: 4,
          }}
        >
          Figma · Head of Design
        </h1>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <span
            style={{
              background: `${C.yellow}22`,
              color: C.yellow,
              fontSize: 12,
              fontWeight: 700,
              padding: "4px 10px",
              borderRadius: 20,
            }}
          >
            📅 In 3 days
          </span>
          <span style={{ color: C.g500, fontSize: 13 }}>
            Mar 8 · 2:00 PM EST
          </span>
        </div>
      </div>
      <div style={{ display: "flex", gap: 10, marginBottom: 18 }}>
        {[
          ["5", "AI Questions"],
          ["3", "Key Topics"],
          ["18", "Prep Score"],
        ].map(([n, l]) => (
          <Card
            key={l}
            style={{ flex: 1, textAlign: "center", padding: "12px 8px" }}
          >
            <p
              style={{
                color: "#fff",
                fontSize: 22,
                fontWeight: 700,
                letterSpacing: -0.5,
              }}
            >
              {n}
            </p>
            <p style={{ color: C.g500, fontSize: 11, marginTop: 2 }}>{l}</p>
          </Card>
        ))}
      </div>
      <h3
        style={{
          color: "#fff",
          fontSize: 15,
          fontWeight: 700,
          marginBottom: 12,
        }}
      >
        ✦ Predicted Questions
      </h3>
      {qs.map((item, i) => (
        <Card
          key={i}
          style={{
            marginBottom: 10,
            cursor: "pointer",
            borderColor: openQ === i ? `${C.purple}44` : C.border,
          }}
          onClick={() => setOpenQ(openQ === i ? null : i)}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              gap: 12,
            }}
          >
            <p
              style={{
                color: "#fff",
                fontSize: 13,
                fontWeight: 600,
                lineHeight: 1.5,
                flex: 1,
              }}
            >
              {item.q}
            </p>
            <span
              style={{
                color: openQ === i ? C.purple : C.g400,
                fontSize: 20,
                flexShrink: 0,
                transition: "transform .2s",
                transform: openQ === i ? "rotate(180deg)" : "rotate(0deg)",
              }}
            >
              ⌄
            </span>
          </div>
          {openQ === i && (
            <div
              style={{
                marginTop: 12,
                padding: "12px 14px",
                background: C.purpleGlow,
                borderRadius: 10,
                border: `1px solid ${C.purple}33`,
              }}
            >
              <p
                style={{
                  color: C.g400,
                  fontSize: 12,
                  fontWeight: 700,
                  marginBottom: 4,
                }}
              >
                ✦ AI Guidance
              </p>
              <p style={{ color: C.g500, fontSize: 13, lineHeight: 1.6 }}>
                {item.hint}
              </p>
            </div>
          )}
        </Card>
      ))}
      <BtnPrimary
        onClick={() => {}}
        style={{
          marginTop: 8,
          background: `linear-gradient(135deg,${C.purple},#4338CA)`,
        }}
      >
        🎤 Start Mock Interview (Voice Mode)
      </BtnPrimary>
    </div>
  );
}
function OfferCompare({ go }) {
  const rows = [
    { label: "Base Salary", a: "$165,000", b: "$130,000", winner: "a" },
    { label: "Annual Bonus", a: "20%", b: "15%", winner: "a" },
    {
      label: "Equity / RSU",
      a: "$120k vest 4yr",
      b: "$200k vest 2yr",
      winner: "b",
    },
    {
      label: "Remote Days",
      a: "5 (Fully Remote)",
      b: "3 (Hybrid)",
      winner: "a",
    },
    { label: "PTO", a: "Unlimited", b: "20 days", winner: "a" },
    { label: "Health Benefits", a: "Gold Plan", b: "Silver Plan", winner: "a" },
    { label: "Total Est. Value", a: "$218k", b: "$198k", winner: "a" },
  ];
  return (
    <div className="screen" style={{ padding: "16px 24px 40px" }}>
      <BackBtn go={go} to="dashboard" />
      <h1
        style={{
          fontSize: 24,
          fontWeight: 700,
          letterSpacing: -0.5,
          marginBottom: 6,
        }}
      >
        Offer Comparison
      </h1>
      <p style={{ color: C.g500, fontSize: 14, marginBottom: 20 }}>
        AI-powered breakdown to help you decide.
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 10,
          marginBottom: 16,
        }}
      >
        {[
          {
            name: "Stripe",
            role: "Sr. Designer",
            score: 82,
            col: C.purple,
            logo: "S",
          },
          {
            name: "Linear",
            role: "Design Lead",
            score: 74,
            col: C.blue,
            logo: "L",
          },
        ].map((o, i) => (
          <div
            key={i}
            style={{
              background: `${o.col}11`,
              border: `2px solid ${i === 0 ? o.col + "55" : "rgba(255,255,255,0.1)"}`,
              borderRadius: 16,
              padding: 16,
              textAlign: "center",
            }}
          >
            {i === 0 && (
              <div
                style={{
                  background: C.green,
                  color: C.navy,
                  fontSize: 10,
                  fontWeight: 800,
                  padding: "2px 8px",
                  borderRadius: 20,
                  marginBottom: 8,
                  display: "inline-block",
                }}
              >
                RECOMMENDED ✦
              </div>
            )}
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 13,
                background: o.col,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontWeight: 700,
                fontSize: 20,
                margin: "0 auto 8px",
              }}
            >
              {o.logo}
            </div>
            <p style={{ color: "#fff", fontWeight: 700, fontSize: 15 }}>
              {o.name}
            </p>
            <p style={{ color: C.g500, fontSize: 12 }}>{o.role}</p>
            <div style={{ marginTop: 8 }}>
              <MiniRadial pct={o.score} size={50} color={o.col} />
            </div>
          </div>
        ))}
      </div>
      {rows.map((r, i) => (
        <div
          key={i}
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 1fr 1fr",
            gap: 6,
            marginBottom: 8,
            padding: "10px 12px",
            borderRadius: 12,
            background:
              r.label === "Total Est. Value" ? `${C.green}11` : C.g100,
            border: `1px solid ${r.label === "Total Est. Value" ? C.green + "44" : C.border}`,
          }}
        >
          <p style={{ color: C.g500, fontSize: 12, alignSelf: "center" }}>
            {r.label}
          </p>
          <p
            style={{
              color: r.winner === "a" ? C.green : C.g400,
              fontSize: 13,
              fontWeight: r.winner === "a" ? 700 : 400,
              textAlign: "center",
            }}
          >
            {r.a}
          </p>
          <p
            style={{
              color: r.winner === "b" ? C.green : C.g400,
              fontSize: 13,
              fontWeight: r.winner === "b" ? 700 : 400,
              textAlign: "center",
            }}
          >
            {r.b}
          </p>
        </div>
      ))}
      <div
        style={{
          background: `${C.purple}11`,
          border: `1px solid ${C.purple}33`,
          borderRadius: 16,
          padding: "16px 18px",
          marginTop: 8,
        }}
      >
        <p
          style={{
            color: C.purple,
            fontWeight: 700,
            fontSize: 13,
            marginBottom: 6,
          }}
        >
          ✦ AI Recommendation
        </p>
        <p style={{ color: C.g500, fontSize: 13, lineHeight: 1.6 }}>
          Stripe offers higher base pay and full remote flexibility. However,
          Linear's equity package has stronger upside if they exit. For
          financial security, Stripe wins. For growth potential, consider
          Linear.
        </p>
      </div>
    </div>
  );
}
function CareerProgress({ go }) {
  const salaryData = [
    { x: 0, y: 85 },
    { x: 1, y: 90 },
    { x: 2, y: 88 },
    { x: 3, y: 95 },
    { x: 4, y: 102 },
    { x: 5, y: 110 },
    { x: 6, y: 108 },
    { x: 7, y: 118 },
    { x: 8, y: 125 },
    { x: 9, y: 138 },
    { x: 10, y: 135 },
    { x: 11, y: 148 },
    { x: 12, y: 158 },
  ];
  const milestones = [
    { step: 2, label: "Learned Figma", col: C.blue },
    { step: 5, label: "First Promotion", col: C.green },
    { step: 8, label: "Learned React", col: C.purple },
    { step: 11, label: "Senior Designer", col: C.yellow },
  ];
  return (
    <div className="screen" style={{ padding: "16px 24px 40px" }}>
      <BackBtn go={go} to="dashboard" />
      <h1
        style={{
          fontSize: 24,
          fontWeight: 700,
          letterSpacing: -0.5,
          marginBottom: 6,
        }}
      >
        Career Progress
      </h1>
      <p style={{ color: C.g500, fontSize: 14, marginBottom: 20 }}>
        Your growth trajectory over 12 months.
      </p>
      <Card style={{ marginBottom: 14 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 16,
          }}
        >
          <div>
            <Label>Market Value</Label>
            <p
              style={{
                color: "#fff",
                fontSize: 26,
                fontWeight: 700,
                letterSpacing: -1,
              }}
            >
              $158k
            </p>
            <p style={{ color: C.green, fontSize: 12, fontWeight: 700 }}>
              ↑ +86% vs last year
            </p>
          </div>
          <div style={{ textAlign: "right" }}>
            <Label>Your Ranking</Label>
            <p
              style={{
                color: C.yellow,
                fontSize: 14,
                fontWeight: 700,
                marginTop: 6,
              }}
            >
              Top 10%
            </p>
            <p style={{ color: C.g500, fontSize: 11 }}>Senior Designers</p>
          </div>
        </div>
        <LineChart data={salaryData} width={340} height={110} color={C.green} />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 8,
          }}
        >
          <span style={{ color: C.g500, fontSize: 11 }}>Jan 2025</span>
          <span style={{ color: C.g500, fontSize: 11 }}>Jan 2026</span>
        </div>
      </Card>
      <h3
        style={{
          color: "#fff",
          fontSize: 15,
          fontWeight: 700,
          marginBottom: 12,
        }}
      >
        Career Milestones
      </h3>
      {milestones.map((m, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 10,
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: `${m.col}22`,
              border: `1px solid ${m.col}44`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            🏆
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ color: "#fff", fontSize: 13, fontWeight: 600 }}>
              {m.label}
            </p>
            <p style={{ color: C.g500, fontSize: 12 }}>
              Month {m.step + 1} · 2025
            </p>
          </div>
          <Pill color={m.col}>+{[12, 18, 8, 22][i]}% salary</Pill>
        </div>
      ))}
      <div
        style={{
          background: `${C.green}11`,
          border: `1px solid ${C.green}33`,
          borderRadius: 16,
          padding: "16px 18px",
          marginTop: 8,
        }}
      >
        <p
          style={{
            color: C.green,
            fontSize: 16,
            fontWeight: 800,
            marginBottom: 4,
          }}
        >
          🎉 Top 10% Achiever
        </p>
        <p style={{ color: C.g500, fontSize: 13, lineHeight: 1.6 }}>
          You are outpacing 90% of candidates in your field. Adding System
          Design to your skill set could push you into the top 5%.
        </p>
      </div>
    </div>
  );
}
function Profile({ go }) {
  const skills = [
    "Figma",
    "Prototyping",
    "React",
    "User Research",
    "HTML/CSS",
    "Design Systems",
    "Accessibility",
    "Motion Design",
  ];
  return (
    <div className="screen" style={{ padding: "0 0 80px" }}>
      <div
        style={{
          background: `linear-gradient(160deg,#1a1060,${C.navy})`,
          padding: "50px 24px 80px",
          textAlign: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: "50%",
            background: `linear-gradient(135deg,${C.green},${C.greenDark})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 34,
            margin: "0 auto 12px",
            border: "3px solid rgba(0,200,83,0.4)",
          }}
        >
          👤
        </div>
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>
          Alesha Hyocinth
        </h2>
        <p style={{ color: C.g500, fontSize: 14, marginBottom: 12 }}>
          Senior Product Designer · San Francisco
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: 8 }}>
          <Pill color={C.green}>Open to Work</Pill>
          <Pill color={C.purple}>Pro Member</Pill>
        </div>
      </div>
      <div style={{ padding: "0 20px", marginTop: -40 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gap: 10,
            marginBottom: 16,
          }}
        >
          {[
            ["12", "Applications"],
            ["3", "Interviews"],
            ["1", "Offer"],
          ].map(([n, l]) => (
            <Card key={l} style={{ textAlign: "center", padding: "14px 8px" }}>
              <p
                style={{
                  color: C.green,
                  fontSize: 24,
                  fontWeight: 700,
                  letterSpacing: -0.5,
                }}
              >
                {n}
              </p>
              <p style={{ color: C.g500, fontSize: 11, marginTop: 2 }}>{l}</p>
            </Card>
          ))}
        </div>
        <Card
          style={{ marginBottom: 12, cursor: "pointer" }}
          onClick={() => go("profilestrength")}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 12,
            }}
          >
            <p style={{ color: "#fff", fontWeight: 700 }}>
              Profile Completeness
            </p>
            <span style={{ color: C.green, fontSize: 14, fontWeight: 700 }}>
              78%
            </span>
          </div>
          <div
            style={{
              height: 6,
              background: C.g100,
              borderRadius: 3,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: "78%",
                background: `linear-gradient(90deg,${C.green},#00E676)`,
                borderRadius: 3,
              }}
            />
          </div>
          <p style={{ color: C.g500, fontSize: 12, marginTop: 8 }}>
            Tap to complete your profile →
          </p>
        </Card>
        <Card style={{ marginBottom: 12 }}>
          <p style={{ color: "#fff", fontWeight: 700, marginBottom: 12 }}>
            Skills
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {skills.map((s) => (
              <Pill key={s} color={C.purple}>
                {s}
              </Pill>
            ))}
            <div
              style={{
                background: C.g100,
                border: `1px solid ${C.border}`,
                borderRadius: 20,
                padding: "3px 11px",
                fontSize: 11,
                fontWeight: 700,
                color: C.g500,
                cursor: "pointer",
              }}
            >
              + Add
            </div>
          </div>
        </Card>
        <Card>
          <p style={{ color: "#fff", fontWeight: 700, marginBottom: 12 }}>
            Account
          </p>
          {[
            ["Resume Versions", "resumeversions", "📄"],
            ["Privacy & Data", "privacy", "🔐"],
            ["Account Settings", "settings", "⚙️"],
            ["Interview Prep", "interviewprep", "🎤"],
            ["Offer Comparison", "offercompare", "⚖️"],
            ["Career Progress", "careerprogress", "📈"],
            ["Sign Out", "login", "🚪"],
          ].map(([item, s, icon], i) => (
            <div
              key={i}
              onClick={() => go(s)}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "12px 0",
                borderBottom: i < 6 ? `1px solid ${C.border}` : "none",
                cursor: "pointer",
              }}
            >
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <span style={{ fontSize: 16 }}>{icon}</span>
                <p style={{ color: i === 6 ? C.red : C.g400, fontSize: 14 }}>
                  {item}
                </p>
              </div>
              {i < 6 && <span style={{ color: C.g300 }}>›</span>}
            </div>
          ))}
        </Card>
      </div>
      <BottomNav active="profile" go={go} />
    </div>
  );
}
function ProfileStrength({ go }) {
  const [done, setDone] = useState({
    linkedin: true,
    photo: false,
    skills: false,
    portfolio: false,
    summary: false,
  });
  const tasks = [
    {
      key: "linkedin",
      label: "Connect LinkedIn",
      desc: "Import experience automatically",
      pts: 20,
      done: true,
    },
    {
      key: "photo",
      label: "Add Profile Photo",
      desc: "Recruiters are 3× more likely to click",
      pts: 15,
    },
    {
      key: "skills",
      label: "Add 5+ Skills",
      desc: "Boost keyword matching by 40%",
      pts: 20,
    },
    {
      key: "portfolio",
      label: "Upload Portfolio",
      desc: "Showcase your best work",
      pts: 25,
    },
    {
      key: "summary",
      label: "Write Bio Summary",
      desc: "Tell your story in 150 words",
      pts: 20,
    },
  ];
  const pct = (Object.values(done).filter(Boolean).length / tasks.length) * 100;
  const tier =
    pct >= 80
      ? "All-Star"
      : pct >= 60
        ? "Advanced"
        : pct >= 40
          ? "Intermediate"
          : "Beginner";
  const tierCol = {
    Beginner: C.red,
    Intermediate: C.yellow,
    Advanced: C.blue,
    "All-Star": C.green,
  }[tier];
  return (
    <div className="screen" style={{ padding: "16px 24px 40px" }}>
      <BackBtn go={go} to="profile" />
      <h1
        style={{
          fontSize: 24,
          fontWeight: 700,
          letterSpacing: -0.5,
          marginBottom: 20,
        }}
      >
        Profile Strength
      </h1>
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <Radial score={Math.round(pct)} size={160} label="%" />
        <div style={{ marginTop: 14 }}>
          <Pill color={tierCol} style={{ fontSize: 14, padding: "6px 16px" }}>
            {tier} ✦
          </Pill>
        </div>
        <p style={{ color: C.g500, fontSize: 13, marginTop: 10 }}>
          {tier === "All-Star"
            ? "Your profile is fully optimized!"
            : "Complete tasks below to reach All-Star status"}
        </p>
      </div>
      {tier !== "All-Star" && (
        <div
          style={{
            background: `${C.yellow}11`,
            border: `1px solid ${C.yellow}33`,
            borderRadius: 14,
            padding: "12px 16px",
            marginBottom: 16,
          }}
        >
          <p
            style={{
              color: C.yellow,
              fontWeight: 700,
              fontSize: 13,
              marginBottom: 4,
            }}
          >
            🏆 Reward
          </p>
          <p style={{ color: C.g500, fontSize: 13 }}>
            Reach All-Star status to boost visibility by{" "}
            <strong style={{ color: "#fff" }}>2× with recruiters</strong>.
          </p>
        </div>
      )}
      {tasks.map((t, i) => (
        <Card
          key={i}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            marginBottom: 10,
            borderColor: done[t.key] ? `${C.green}44` : C.border,
          }}
        >
          <div
            onClick={() => setDone((d) => ({ ...d, [t.key]: !d[t.key] }))}
            style={{
              width: 28,
              height: 28,
              borderRadius: 8,
              background: done[t.key] ? C.green : C.g100,
              border: `2px solid ${done[t.key] ? C.green : C.borderMed}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              flexShrink: 0,
              fontSize: 14,
              color: "#fff",
            }}
          >
            {done[t.key] ? "✓" : ""}
          </div>
          <div style={{ flex: 1 }}>
            <p
              style={{
                color: done[t.key] ? "rgba(255,255,255,0.4)" : "#fff",
                fontSize: 14,
                fontWeight: 600,
                textDecoration: done[t.key] ? "line-through" : "none",
              }}
            >
              {t.label}
            </p>
            <p style={{ color: C.g400, fontSize: 12 }}>{t.desc}</p>
          </div>
          <span
            style={{
              color: C.green,
              fontSize: 12,
              fontWeight: 700,
              flexShrink: 0,
            }}
          >
            +{t.pts}pts
          </span>
        </Card>
      ))}
    </div>
  );
}
function ResumeVersions({ go }) {
  const [menu, setMenu] = useState(null);
  const versions = [
    { name: "General Resume", score: 78, updated: "Mar 2", default: true },
    {
      name: "Senior Role Resume",
      score: 85,
      updated: "Feb 28",
      default: false,
    },
    {
      name: "Design Systems Focus",
      score: 91,
      updated: "Feb 15",
      default: false,
    },
    {
      name: "Tech-Forward Resume",
      score: 82,
      updated: "Jan 20",
      default: false,
    },
  ];
  return (
    <div className="screen" style={{ padding: "16px 24px 40px" }}>
      <BackBtn go={go} to="profile" />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <h1 style={{ fontSize: 24, fontWeight: 700, letterSpacing: -0.5 }}>
          Resume Versions
        </h1>
        <button
          style={{
            padding: "8px 14px",
            borderRadius: 12,
            background: `${C.green}22`,
            border: `1px solid ${C.green}44`,
            color: C.green,
            fontSize: 12,
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          + New
        </button>
      </div>
      {versions.map((v, i) => (
        <Card
          key={i}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            marginBottom: 12,
            position: "relative",
            borderColor: v.default ? `${C.green}44` : C.border,
          }}
        >
          <div
            style={{
              width: 48,
              height: 60,
              borderRadius: 10,
              background: `${C.blue}15`,
              border: `1px solid ${C.blue}33`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 24,
              flexShrink: 0,
            }}
          >
            📄
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                marginBottom: 4,
              }}
            >
              <p style={{ color: "#fff", fontSize: 14, fontWeight: 600 }}>
                {v.name}
              </p>
              {v.default && (
                <span
                  style={{
                    background: `${C.green}22`,
                    color: C.green,
                    fontSize: 10,
                    fontWeight: 700,
                    padding: "2px 7px",
                    borderRadius: 10,
                  }}
                >
                  DEFAULT
                </span>
              )}
            </div>
            <p style={{ color: C.g500, fontSize: 12 }}>Updated {v.updated}</p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                marginTop: 6,
              }}
            >
              <Label style={{ marginBottom: 0 }}>ATS Score:</Label>
              <Pill
                color={
                  v.score >= 90 ? C.green : v.score >= 80 ? C.yellow : C.blue
                }
              >
                {v.score}/100
              </Pill>
            </div>
          </div>
          <button
            onClick={() => setMenu(menu === i ? null : i)}
            style={{
              background: "none",
              border: "none",
              color: C.g400,
              fontSize: 22,
              cursor: "pointer",
              padding: 4,
            }}
          >
            ⋯
          </button>
          {menu === i && (
            <div
              style={{
                position: "absolute",
                right: 16,
                top: 60,
                background: "#1a2f4d",
                border: `1px solid ${C.border}`,
                borderRadius: 12,
                overflow: "hidden",
                zIndex: 10,
                minWidth: 140,
              }}
            >
              {["Set as Default", "Download PDF", "Rename", "Delete"].map(
                (opt, j) => (
                  <div
                    key={j}
                    onClick={() => setMenu(null)}
                    style={{
                      padding: "12px 16px",
                      cursor: "pointer",
                      color: opt === "Delete" ? C.red : C.g400,
                      fontSize: 14,
                      borderBottom: j < 3 ? `1px solid ${C.border}` : "none",
                    }}
                  >
                    {opt}
                  </div>
                ),
              )}
            </div>
          )}
        </Card>
      ))}
    </div>
  );
}
function Settings({ go }) {
  const [notifOn, setNotifOn] = useState(true);
  const [emailOn, setEmailOn] = useState(false);
  const [biometricOn, setBiometricOn] = useState(true);
  const sections = [
    {
      header: "Notifications",
      items: [
        {
          label: "Push Notifications",
          sub: "Job matches, interview updates",
          toggle: notifOn,
          onT: () => setNotifOn(!notifOn),
        },
        {
          label: "Email Digest",
          sub: "Weekly summary of opportunities",
          toggle: emailOn,
          onT: () => setEmailOn(!emailOn),
        },
      ],
    },
    {
      header: "Security",
      items: [
        {
          label: "Biometric Login",
          sub: "Face ID / Touch ID",
          toggle: biometricOn,
          onT: () => setBiometricOn(!biometricOn),
        },
        {
          label: "Change Password",
          sub: "Last changed 30 days ago",
          arrow: true,
          s: "forgotpassword",
        },
        {
          label: "Two-Factor Auth",
          sub: "Enabled via authenticator",
          arrow: true,
        },
      ],
    },
    {
      header: "Subscription",
      items: [
        { label: "Current Plan", sub: "Pro · $12/mo", arrow: true },
        { label: "Billing History", sub: "View past invoices", arrow: true },
      ],
    },
    {
      header: "Data",
      items: [
        {
          label: "Privacy & AI Settings",
          sub: "Manage data & AI permissions",
          arrow: true,
          s: "privacy",
        },
        { label: "Download My Data", sub: "Export all your data" },
        {
          label: "Delete Account",
          sub: "Permanently remove your data",
          danger: true,
        },
      ],
    },
  ];
  return (
    <div className="screen" style={{ padding: "16px 24px 40px" }}>
      <BackBtn go={go} to="profile" />
      <h1
        style={{
          fontSize: 24,
          fontWeight: 700,
          letterSpacing: -0.5,
          marginBottom: 20,
        }}
      >
        Account Settings
      </h1>
      {sections.map((sec, si) => (
        <div key={si} style={{ marginBottom: 20 }}>
          <p
            style={{
              color: C.g400,
              fontSize: 11,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              marginBottom: 8,
            }}
          >
            {sec.header}
          </p>
          <Card>
            {sec.items.map((item, ii) => (
              <div
                key={ii}
                onClick={() => item.s && go(item.s)}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "13px 0",
                  borderBottom:
                    ii < sec.items.length - 1
                      ? `1px solid ${C.border}`
                      : "none",
                  cursor:
                    item.toggle !== undefined || item.arrow || item.s
                      ? "pointer"
                      : "default",
                }}
              >
                <div>
                  <p
                    style={{
                      color: item.danger ? C.red : "#fff",
                      fontSize: 14,
                      fontWeight: 500,
                    }}
                  >
                    {item.label}
                  </p>
                  <p style={{ color: C.g400, fontSize: 12, marginTop: 2 }}>
                    {item.sub}
                  </p>
                </div>
                {item.toggle !== undefined && (
                  <Toggle on={item.toggle} onToggle={item.onT} />
                )}
                {item.arrow && (
                  <span style={{ color: C.g300, fontSize: 18 }}>›</span>
                )}
              </div>
            ))}
          </Card>
        </div>
      ))}
    </div>
  );
}
function Privacy({ go }) {
  const [perms, setPerms] = useState({
    aiMatch: true,
    anonDisc: true,
    recruiterView: true,
    analytics: false,
    marketing: false,
  });
  const permsConf = [
    {
      key: "aiMatch",
      label: "AI Resume Matching",
      sub: "AI compares your resume to job descriptions",
    },
    {
      key: "anonDisc",
      label: "Anonymized Discovery",
      sub: "Recruiters see anonymized profile first",
    },
    {
      key: "recruiterView",
      label: "Full Profile Visibility",
      sub: "Allow recruiters to see your full profile",
    },
    {
      key: "analytics",
      label: "Usage Analytics",
      sub: "Help us improve ClearHire",
    },
    {
      key: "marketing",
      label: "Marketing Emails",
      sub: "Product updates and promotions",
    },
  ];
  return (
    <div className="screen" style={{ padding: "16px 24px 40px" }}>
      <BackBtn go={go} to="settings" />
      <h1
        style={{
          fontSize: 24,
          fontWeight: 700,
          letterSpacing: -0.5,
          marginBottom: 6,
        }}
      >
        Privacy & AI
      </h1>
      <p style={{ color: C.g500, fontSize: 14, marginBottom: 20 }}>
        Control how ClearHire uses your data.
      </p>
      <Card
        style={{
          marginBottom: 16,
          background: `${C.green}08`,
          borderColor: `${C.green}33`,
        }}
      >
        <p
          style={{
            color: C.green,
            fontWeight: 700,
            fontSize: 13,
            marginBottom: 6,
          }}
        >
          🔐 Our Promise
        </p>
        <p style={{ color: C.g500, fontSize: 13, lineHeight: 1.6 }}>
          We never sell your data to third parties. AI is used exclusively for
          matching — your PII never leaves our encrypted servers.
        </p>
      </Card>
      <Card style={{ marginBottom: 16, padding: "16px" }}>
        <p style={{ color: "#fff", fontWeight: 700, marginBottom: 14 }}>
          Your Data Flow
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          {[
            ["👤", "You"],
            ["🔒", "Encrypted\nServer"],
            ["🤖", "AI Engine"],
            ["👔", "Recruiter\n(Anon)"],
          ].map(([icon, label], i) => (
            <React.Fragment key={i}>
              <div style={{ textAlign: "center" }}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 14,
                    background: C.g100,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 22,
                    margin: "0 auto 4px",
                  }}
                >
                  {icon}
                </div>
                <p
                  style={{
                    color: C.g400,
                    fontSize: 10,
                    whiteSpace: "pre-line",
                    textAlign: "center",
                  }}
                >
                  {label}
                </p>
              </div>
              {i < 3 && <span style={{ color: C.green, fontSize: 16 }}>→</span>}
            </React.Fragment>
          ))}
        </div>
      </Card>
      {permsConf.map((p, i) => (
        <Card key={i} style={{ marginBottom: 10 }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ flex: 1, paddingRight: 12 }}>
              <p
                style={{
                  color: "#fff",
                  fontSize: 14,
                  fontWeight: 600,
                  marginBottom: 3,
                }}
              >
                {p.label}
              </p>
              <p style={{ color: C.g500, fontSize: 12 }}>{p.sub}</p>
            </div>
            <Toggle
              on={perms[p.key]}
              onToggle={() =>
                setPerms((pp) => ({ ...pp, [p.key]: !pp[p.key] }))
              }
            />
          </div>
        </Card>
      ))}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 10,
          marginTop: 8,
        }}
      >
        <BtnSecondary onClick={() => {}}>Download My Data</BtnSecondary>
        <button
          style={{
            padding: "14px",
            borderRadius: 14,
            background: `${C.red}11`,
            border: `1px solid ${C.red}33`,
            color: C.red,
            fontSize: 14,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Delete Account
        </button>
      </div>
    </div>
  );
}
function RecruiterDesk({ go }) {
  const [tab, setTab] = useState("overview");
  const navItems = [
    { id: "overview", label: "Dashboard", icon: "⊞" },
    { id: "jobs", label: "Job Posts", icon: "💼" },
    { id: "candidates", label: "Candidates", icon: "👥" },
    { id: "biasaudit", label: "Bias Audit", icon: "⚖️" },
    { id: "schedule", label: "Scheduling", icon: "📅" },
    { id: "funnel", label: "Analytics", icon: "📊" },
  ];
  const tabComponents = {
    overview: <RecruiterOverview />,
    jobs: <RecruiterJobs go={go} />,
    candidates: <RecruiterCandidates />,
    biasaudit: <BiasAudit />,
    schedule: <InterviewSchedule />,
    funnel: <HiringFunnel />,
  };
  return (
    <div
      style={{ display: "flex", minHeight: "100vh", background: C.navyDark }}
    >
      <div
        style={{
          width: 220,
          background: C.navy,
          borderRight: `1px solid ${C.border}`,
          padding: "0 0 24px",
          display: "flex",
          flexDirection: "column",
          position: "sticky",
          top: 0,
          height: "100vh",
          overflowY: "auto",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            padding: "24px 20px 20px",
            borderBottom: `1px solid ${C.border}`,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 16,
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: `linear-gradient(135deg,${C.green},${C.greenDark})`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
              }}
            >
              ✦
            </div>
            <div>
              <p
                style={{
                  color: "#fff",
                  fontWeight: 800,
                  fontSize: 15,
                  letterSpacing: -0.5,
                }}
              >
                ClearHire
              </p>
              <p style={{ color: C.g400, fontSize: 11 }}>Recruiter Portal</p>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: `${C.purple}44`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontWeight: 700,
                fontSize: 14,
              }}
            >
              R
            </div>
            <div>
              <p style={{ color: "#fff", fontSize: 13, fontWeight: 600 }}>
                Rachel Kim
              </p>
              <p style={{ color: C.g400, fontSize: 11 }}>Sr. Recruiter</p>
            </div>
          </div>
        </div>
        <div style={{ padding: "16px 8px", flex: 1 }}>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              style={{
                width: "100%",
                textAlign: "left",
                padding: "10px 12px",
                borderRadius: 10,
                marginBottom: 2,
                background: tab === item.id ? `${C.purple}18` : "none",
                border: `1px solid ${tab === item.id ? `${C.purple}33` : "transparent"}`,
                color: tab === item.id ? "#fff" : C.g400,
                fontSize: 14,
                fontWeight: tab === item.id ? 600 : 400,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <span style={{ fontSize: 16 }}>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </div>
        <div style={{ padding: "0 12px" }}>
          <button
            onClick={() => go("roleselect")}
            style={{
              width: "100%",
              padding: "10px 12px",
              borderRadius: 10,
              background: `${C.red}11`,
              border: `1px solid ${C.red}22`,
              color: C.red,
              fontSize: 13,
              cursor: "pointer",
              textAlign: "left",
            }}
          >
            ← Exit Recruiter
          </button>
        </div>
      </div>
      <div style={{ flex: 1, overflowY: "auto", minWidth: 0 }}>
        <div className="desk-screen">{tabComponents[tab]}</div>
      </div>
    </div>
  );
}
function RecruiterOverview() {
  const metrics = [
    {
      label: "Active Jobs",
      value: "5",
      icon: "💼",
      col: C.blue,
      sub: "+1 this week",
    },
    {
      label: "Total Candidates",
      value: "128",
      icon: "👥",
      col: C.green,
      sub: "42 new today",
    },
    {
      label: "Interviews Today",
      value: "8",
      icon: "📅",
      col: C.yellow,
      sub: "3 this afternoon",
    },
    {
      label: "Avg. Time to Hire",
      value: "12d",
      icon: "⏱️",
      col: C.purple,
      sub: "↓ 3 days faster",
    },
  ];
  const jobs = [
    {
      title: "Senior Product Designer",
      applicants: 42,
      new: 8,
      status: "Live",
      col: C.green,
    },
    {
      title: "UX Researcher",
      applicants: 31,
      new: 5,
      status: "Live",
      col: C.green,
    },
    {
      title: "Design Systems Lead",
      applicants: 28,
      new: 2,
      status: "Live",
      col: C.green,
    },
    {
      title: "Design Director",
      applicants: 12,
      new: 1,
      status: "Draft",
      col: C.g400,
    },
    {
      title: "Visual Designer",
      applicants: 0,
      new: 0,
      status: "Closed",
      col: C.red,
    },
  ];
  return (
    <div style={{ padding: "32px" }}>
      <div style={{ marginBottom: 28 }}>
        <h1
          style={{
            fontSize: 28,
            fontWeight: 800,
            letterSpacing: -1,
            marginBottom: 6,
          }}
        >
          Recruiter Dashboard
        </h1>
        <p style={{ color: C.g500, fontSize: 14 }}>
          Tuesday, March 17, 2026 · 3 interviews scheduled today
        </p>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: 16,
          marginBottom: 28,
        }}
      >
        {metrics.map((m, i) => (
          <div
            key={i}
            style={{
              background: C.navyLight,
              border: `1px solid ${C.border}`,
              borderRadius: 18,
              padding: "20px 22px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: 12,
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 13,
                  background: `${m.col}22`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 22,
                }}
              >
                {m.icon}
              </div>
              <Pill color={m.col}>{m.sub}</Pill>
            </div>
            <p
              style={{
                color: "#fff",
                fontSize: 32,
                fontWeight: 800,
                letterSpacing: -1.5,
                marginBottom: 4,
              }}
            >
              {m.value}
            </p>
            <p style={{ color: C.g400, fontSize: 13 }}>{m.label}</p>
          </div>
        ))}
      </div>
      <div
        style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 20 }}
      >
        <div
          style={{
            background: C.navyLight,
            border: `1px solid ${C.border}`,
            borderRadius: 18,
            padding: "20px 24px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 16,
            }}
          >
            <h3 style={{ color: "#fff", fontWeight: 700 }}>
              Active Job Requisitions
            </h3>
            <button
              style={{
                padding: "6px 14px",
                borderRadius: 10,
                background: `${C.green}22`,
                border: `1px solid ${C.green}44`,
                color: C.green,
                fontSize: 12,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              + Post Job
            </button>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr auto auto auto",
              gap: 0,
            }}
          >
            {["Role", "Applicants", "New", "Status"].map((h) => (
              <p
                key={h}
                style={{
                  color: C.g400,
                  fontSize: 11,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  padding: "0 12px 10px 0",
                  borderBottom: `1px solid ${C.border}`,
                }}
              >
                {h}
              </p>
            ))}
            {jobs.map((j, i) => [
              <p
                key={`t${i}`}
                style={{
                  color: "#fff",
                  fontSize: 14,
                  padding: "12px 12px 12px 0",
                  borderBottom: `1px solid ${C.border}`,
                }}
              >
                {j.title}
              </p>,
              <p
                key={`a${i}`}
                style={{
                  color: C.g400,
                  fontSize: 14,
                  padding: "12px 12px 12px 0",
                  borderBottom: `1px solid ${C.border}`,
                }}
              >
                {j.applicants}
              </p>,
              <p
                key={`n${i}`}
                style={{
                  color: j.new > 0 ? C.green : C.g400,
                  fontSize: 14,
                  padding: "12px 12px 12px 0",
                  fontWeight: j.new > 0 ? 700 : 400,
                  borderBottom: `1px solid ${C.border}`,
                }}
              >
                {j.new > 0 ? `+${j.new}` : "-"}
              </p>,
              <p
                key={`s${i}`}
                style={{
                  padding: "12px 0",
                  borderBottom: `1px solid ${C.border}`,
                }}
              >
                <span
                  style={{
                    background: `${j.col}22`,
                    color: j.col,
                    fontSize: 11,
                    fontWeight: 700,
                    padding: "3px 10px",
                    borderRadius: 20,
                  }}
                >
                  {j.status}
                </span>
              </p>,
            ])}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              background: C.navyLight,
              border: `1px solid ${C.border}`,
              borderRadius: 18,
              padding: "20px 22px",
            }}
          >
            <h3 style={{ color: "#fff", fontWeight: 700, marginBottom: 14 }}>
              Compliance Status
            </h3>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                marginBottom: 12,
              }}
            >
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: "50%",
                  background: `${C.green}22`,
                  border: `2px solid ${C.green}44`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 24,
                }}
              >
                ✦
              </div>
              <div>
                <p style={{ color: C.green, fontWeight: 800, fontSize: 16 }}>
                  NYC LL144 Compliant
                </p>
                <p style={{ color: C.g400, fontSize: 12 }}>
                  Bias audit: Grade A+
                </p>
              </div>
            </div>
            <HBarChart
              items={[
                { label: "Gender Equity", pct: 88, color: C.green },
                { label: "Diversity Score", pct: 76, color: C.blue },
                { label: "Pay Equity", pct: 92, color: C.green },
              ]}
              height={10}
            />
          </div>
          <div
            style={{
              background: C.navyLight,
              border: `1px solid ${C.border}`,
              borderRadius: 18,
              padding: "20px 22px",
            }}
          >
            <h3 style={{ color: "#fff", fontWeight: 700, marginBottom: 14 }}>
              Today Interviews
            </h3>
            {[
              { name: "Alesha H.", role: "Sr. Designer", time: "10:30 AM" },
              { name: "Jordan L.", role: "UX Lead", time: "1:00 PM" },
              { name: "Maya P.", role: "Design Eng.", time: "3:30 PM" },
            ].map((p, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: i < 2 ? 10 : 0,
                }}
              >
                <div
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: "50%",
                    background: `linear-gradient(135deg,${C.green},${C.greenDark})`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: 13,
                  }}
                >
                  {p.name[0]}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ color: "#fff", fontSize: 13, fontWeight: 600 }}>
                    {p.name}
                  </p>
                  <p style={{ color: C.g400, fontSize: 12 }}>{p.role}</p>
                </div>
                <span
                  style={{ color: C.yellow, fontSize: 12, fontWeight: 600 }}
                >
                  {p.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
function RecruiterJobs() {
  const [jobs, setJobs] = useState([]);
  
  useEffect(() => {
    window.API.getJobs().then(data => {
      if (Array.isArray(data)) {
        setJobs(data.map(d => ({
          ...d,
          dept: 'Design',
          loc: d.location || 'Remote',
          type: 'Full-time',
          applicants: Math.floor(Math.random()*20),
          new_: 0,
          updated: 'Today'
        })));
      }
    });
  }, []);
  
  const [showForm, setShowForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newLoc, setNewLoc] = useState("");
  const [newSalary, setNewSalary] = useState("");
  return (
    <div style={{ padding: "32px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <div>
          <h2 style={{ fontSize: 24, fontWeight: 800, letterSpacing: -0.5 }}>
            Job Postings
          </h2>
          <p style={{ color: C.g400, fontSize: 14 }}>
            Manage your active requisitions
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          style={{
            padding: "11px 20px",
            borderRadius: 12,
            background: `linear-gradient(135deg,${C.green},${C.greenDark})`,
            border: "none",
            color: C.navy,
            fontWeight: 700,
            fontSize: 14,
            cursor: "pointer",
          }}
        >
          + Post New Job
        </button>
      </div>
      {showForm && (
        <div
          style={{
            background: C.navyLight,
            border: `1px solid ${C.border}`,
            borderRadius: 18,
            padding: "24px",
            marginBottom: 24,
          }}
        >
          <h3 style={{ color: "#fff", marginBottom: 18 }}>New Job Post</h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 14,
              marginBottom: 14,
            }}
          >
            <Field
              label="Job Title"
              placeholder="e.g. Senior Designer"
              value={newTitle}
              onChange={setNewTitle}
              icon="💼"
            />
            <Field
              label="Department"
              placeholder="e.g. Design"
              value=""
              onChange={() => {}}
              icon="🏢"
            />
            <Field
              label="Location"
              placeholder="Remote / NYC / SF"
              value={newLoc}
              onChange={setNewLoc}
              icon="📍"
            />
            <Field
              label="Salary Range"
              placeholder="e.g. $130-160k"
              value={newSalary}
              onChange={setNewSalary}
              icon="💰"
            />
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <BtnPrimary
              onClick={async () => {
                const title = newTitle || "New Position";
                const company = window.API.user?.company || "ClearHire Corp";
                const loc = newLoc || "Remote";
                const salary = newSalary || "$100-150k";
                
                const res = await window.API.createJob({
                  title, company, location: loc, salary, description: "New job posting."
                });
                
                if (res.success) {
                  setJobs((j) => [
                    {
                      id: res.jobId,
                      title,
                      dept: "Design",
                      loc,
                      type: "Full-time",
                      status: "Live",
                      applicants: 0,
                      new_: 0,
                      updated: "Just now",
                    },
                    ...j,
                  ]);
                  setShowForm(false);
                  setNewTitle("");
                  setNewLoc("");
                  setNewSalary("");
                }
              }}
              style={{ flex: 1 }}
            >
              Publish Job
            </BtnPrimary>
            <BtnSecondary
              onClick={() => setShowForm(false)}
              style={{ flex: 1 }}
            >
              Cancel
            </BtnSecondary>
          </div>
        </div>
      )}
      <div
        style={{
          background: C.navyLight,
          border: `1px solid ${C.border}`,
          borderRadius: 18,
          overflow: "hidden",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {[
                "Job Title",
                "Department",
                "Location",
                "Applicants",
                "Status",
                "Updated",
                "Actions",
              ].map((h) => (
                <th
                  key={h}
                  style={{
                    padding: "14px 16px",
                    textAlign: "left",
                    color: C.g400,
                    fontSize: 11,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    borderBottom: `1px solid ${C.border}`,
                    whiteSpace: "nowrap",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {jobs.map((j, i) => (
              <tr
                key={j.id}
                style={{
                  borderBottom:
                    i < jobs.length - 1 ? `1px solid ${C.border}` : "none",
                }}
              >
                <td style={{ padding: "14px 16px" }}>
                  <p
                    style={{
                      color: "#fff",
                      fontWeight: 600,
                      fontSize: 14,
                      marginBottom: 2,
                    }}
                  >
                    {j.title}
                  </p>
                  <p style={{ color: C.g400, fontSize: 12 }}>{j.type}</p>
                </td>
                <td
                  style={{ padding: "14px 16px", color: C.g400, fontSize: 13 }}
                >
                  {j.dept}
                </td>
                <td
                  style={{ padding: "14px 16px", color: C.g400, fontSize: 13 }}
                >
                  {j.loc}
                </td>
                <td style={{ padding: "14px 16px" }}>
                  <p style={{ color: "#fff", fontWeight: 700, fontSize: 16 }}>
                    {j.applicants}
                  </p>
                  {j.new_ > 0 && (
                    <p
                      style={{ color: C.green, fontSize: 12, fontWeight: 700 }}
                    >
                      +{j.new_} new
                    </p>
                  )}
                </td>
                <td style={{ padding: "14px 16px" }}>
                  <span
                    style={{
                      background: `${j.status === "Live" ? C.green : j.status === "Draft" ? C.yellow : C.red}22`,
                      color:
                        j.status === "Live"
                          ? C.green
                          : j.status === "Draft"
                            ? C.yellow
                            : C.red,
                      fontSize: 12,
                      fontWeight: 700,
                      padding: "4px 12px",
                      borderRadius: 20,
                    }}
                  >
                    {j.status}
                  </span>
                </td>
                <td
                  style={{ padding: "14px 16px", color: C.g400, fontSize: 13 }}
                >
                  {j.updated}
                </td>
                <td style={{ padding: "14px 16px" }}>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button
                      onClick={() =>
                        setJobs(
                          jobs.map((jj) =>
                            jj.id === j.id
                              ? {
                                  ...jj,
                                  status:
                                    jj.status === "Live" ? "Draft" : "Live",
                                }
                              : jj,
                          ),
                        )
                      }
                      style={{
                        padding: "6px 12px",
                        borderRadius: 8,
                        background: `${C.blue}22`,
                        border: `1px solid ${C.blue}33`,
                        color: C.blue,
                        fontSize: 12,
                        fontWeight: 700,
                        cursor: "pointer",
                      }}
                    >
                      Toggle
                    </button>
                    <button
                      onClick={() =>
                        setJobs(jobs.filter((jj) => jj.id !== j.id))
                      }
                      style={{
                        padding: "6px 12px",
                        borderRadius: 8,
                        background: `${C.red}22`,
                        border: `1px solid ${C.red}33`,
                        color: C.red,
                        fontSize: 12,
                        fontWeight: 700,
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
function RecruiterCandidates() {
  const [selected, setSelected] = useState(null);
  const [view, setView] = useState("list");
  const cands = [
    {
      id: 1,
      name: "Alesha Hyocinth",
      role: "Sr. Product Designer",
      ats: 92,
      match: 96,
      status: "Interview Scheduled",
      experience: "7 years",
      loc: "Remote",
      skills: ["Figma", "React", "Design Systems", "UI/UX"],
      col: C.green,
      note: "Exceptional portfolio with end-to-end case studies. Strong systems thinker. Flagged as top candidate.",
    },
    {
      id: 2,
      name: "Jordan Wells",
      role: "Design Systems Lead",
      ats: 88,
      match: 89,
      status: "In Review",
      experience: "9 years",
      loc: "NYC",
      skills: ["Figma", "Design Tokens", "Storybook", "React"],
      col: C.blue,
      note: "Strong system experience. Multiple enterprise-scale component libraries. Reached out proactively.",
    },
    {
      id: 3,
      name: "Maya Patel",
      role: "UX Researcher",
      ats: 81,
      match: 85,
      status: "Applied",
      experience: "5 years",
      loc: "SF (open to remote)",
      skills: ["User Research", "Usability Testing", "Figma", "Data Analysis"],
      col: C.yellow,
      note: "PhD in Human-Computer Interaction. Published research. Excellent written communication skills.",
    },
    {
      id: 4,
      name: "Chris Lee",
      role: "Sr. Product Designer",
      ats: 72,
      match: 78,
      status: "Applied",
      experience: "6 years",
      loc: "Remote",
      skills: ["Sketch", "InVision", "Figma", "Research"],
      col: C.g500,
      note: "Solid generalist. Shows growth trajectory. Sketch reliance may need addressing during transition.",
    },
    {
      id: 5,
      name: "Dana Fox",
      role: "Visual Designer",
      ats: 64,
      match: 62,
      status: "Not Aligned",
      experience: "3 years",
      loc: "NYC",
      skills: ["Illustrator", "Photoshop", "After Effects"],
      col: C.red,
      note: "Strong visual craft. However, lacks product design experience for sr. role requirements.",
    },
  ];
  const C_ = selected ? cands.find((c) => c.id === selected) : null;
  return (
    <div style={{ padding: "32px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <div>
          <h2 style={{ fontSize: 24, fontWeight: 800, letterSpacing: -0.5 }}>
            Candidates
          </h2>
          <p style={{ color: C.g400, fontSize: 14 }}>
            {cands.length} applicants · 1 top pick
          </p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {["list", "card"].map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              style={{
                padding: "8px 16px",
                borderRadius: 10,
                background: view === v ? `${C.purple}33` : C.g100,
                border: `1px solid ${view === v ? C.purple : C.border}`,
                color: view === v ? "#fff" : C.g400,
                fontSize: 13,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              {v === "list" ? "≡ List" : "⊞ Cards"}
            </button>
          ))}
        </div>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: C_ ? "1fr 400px" : "1fr",
          gap: 20,
        }}
      >
        <div>
          {view === "list" ? (
            <div
              style={{
                background: C.navyLight,
                border: `1px solid ${C.border}`,
                borderRadius: 18,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "2fr 1fr auto 1fr auto",
                  padding: "12px 16px",
                  borderBottom: `1px solid ${C.border}`,
                }}
              >
                {["Name & Role", "ATS Score", "Match", "Status", "Action"].map(
                  (h) => (
                    <p
                      key={h}
                      style={{
                        color: C.g400,
                        fontSize: 11,
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.07em",
                      }}
                    >
                      {h}
                    </p>
                  ),
                )}
              </div>
              {cands.map((c, i) => (
                <div
                  key={c.id}
                  onClick={() => setSelected(selected === c.id ? null : c.id)}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "2fr 1fr auto 1fr auto",
                    padding: "16px",
                    borderBottom:
                      i < cands.length - 1 ? `1px solid ${C.border}` : "none",
                    cursor: "pointer",
                    background:
                      selected === c.id ? `${C.purple}11` : "transparent",
                  }}
                >
                  <div
                    style={{ display: "flex", gap: 12, alignItems: "center" }}
                  >
                    <div
                      style={{
                        width: 38,
                        height: 38,
                        borderRadius: "50%",
                        background: `linear-gradient(135deg,${c.col}44,${c.col}22)`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#fff",
                        fontWeight: 700,
                        fontSize: 15,
                      }}
                    >
                      {c.name[0]}
                    </div>
                    <div>
                      <p
                        style={{ color: "#fff", fontWeight: 600, fontSize: 14 }}
                      >
                        {c.name}
                      </p>
                      <p style={{ color: C.g400, fontSize: 12 }}>
                        {c.experience} · {c.loc}
                      </p>
                    </div>
                  </div>
                  <div>
                    <Pill
                      color={
                        c.ats >= 85 ? C.green : c.ats >= 75 ? C.yellow : C.red
                      }
                    >
                      {c.ats}/100
                    </Pill>
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <MiniRadial
                      pct={c.match}
                      size={42}
                      color={c.match >= 90 ? C.green : C.yellow}
                    />
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Pill color={c.col}>{c.status}</Pill>
                  </div>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <button
                      style={{
                        padding: "6px 14px",
                        borderRadius: 8,
                        background: `${C.green}18`,
                        border: `1px solid ${C.green}33`,
                        color: C.green,
                        fontSize: 12,
                        fontWeight: 700,
                        cursor: "pointer",
                      }}
                    >
                      Review
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))",
                gap: 14,
              }}
            >
              {cands.map((c) => (
                <div
                  key={c.id}
                  onClick={() => setSelected(selected === c.id ? null : c.id)}
                  style={{
                    background: C.navyLight,
                    border: `2px solid ${selected === c.id ? C.purple : C.border}`,
                    borderRadius: 18,
                    padding: 20,
                    cursor: "pointer",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 12,
                    }}
                  >
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: "50%",
                        background: `${c.col}33`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#fff",
                        fontWeight: 700,
                        fontSize: 20,
                      }}
                    >
                      {c.name[0]}
                    </div>
                    <Pill color={c.col}>{c.ats}/100</Pill>
                  </div>
                  <p
                    style={{
                      color: "#fff",
                      fontWeight: 700,
                      fontSize: 15,
                      marginBottom: 4,
                    }}
                  >
                    {c.name}
                  </p>
                  <p style={{ color: C.g400, fontSize: 13, marginBottom: 10 }}>
                    {c.role}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 6,
                      marginBottom: 12,
                    }}
                  >
                    {c.skills.slice(0, 3).map((s) => (
                      <Pill key={s} color={C.blue}>
                        {s}
                      </Pill>
                    ))}
                  </div>
                  <Pill color={c.col} style={{ fontSize: 11 }}>
                    {c.status}
                  </Pill>
                </div>
              ))}
            </div>
          )}
        </div>
        {C_ && (
          <div
            style={{
              background: C.navyLight,
              border: `1px solid ${C.border}`,
              borderRadius: 18,
              padding: "24px",
              position: "sticky",
              top: 20,
              maxHeight: "75vh",
              overflowY: "auto",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: 20,
              }}
            >
              <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: "50%",
                    background: `${C_.col}33`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: 22,
                  }}
                >
                  {C_.name[0]}
                </div>
                <div>
                  <h3 style={{ fontSize: 18, fontWeight: 700 }}>{C_.name}</h3>
                  <p style={{ color: C.g400, fontSize: 14 }}>{C_.role}</p>
                </div>
              </div>
              <button
                onClick={() => setSelected(null)}
                style={{
                  background: "none",
                  border: "none",
                  color: C.g400,
                  fontSize: 24,
                  cursor: "pointer",
                }}
              >
                ×
              </button>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 10,
                marginBottom: 16,
              }}
            >
              {[
                {
                  label: "ATS Score",
                  val: `${C_.ats}/100`,
                  col: C_.ats >= 85 ? C.green : C.yellow,
                },
                {
                  label: "AI Match",
                  val: `${C_.match}%`,
                  col: C_.match >= 90 ? C.green : C.yellow,
                },
                { label: "Experience", val: C_.experience, col: C.blue },
                { label: "Location", val: C_.loc, col: C.purple },
              ].map(({ label, val, col }) => (
                <div
                  key={label}
                  style={{
                    background: C.g100,
                    borderRadius: 12,
                    padding: "12px 14px",
                  }}
                >
                  <p style={{ color: C.g400, fontSize: 11, marginBottom: 4 }}>
                    {label}
                  </p>
                  <p style={{ color: col, fontWeight: 700, fontSize: 15 }}>
                    {val}
                  </p>
                </div>
              ))}
            </div>
            <div style={{ marginBottom: 14 }}>
              <p
                style={{
                  color: C.g400,
                  fontSize: 12,
                  fontWeight: 700,
                  marginBottom: 8,
                }}
              >
                SKILLS
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {C_.skills.map((s) => (
                  <Pill key={s} color={C.purple}>
                    {s}
                  </Pill>
                ))}
              </div>
            </div>
            <div
              style={{
                background: C.g100,
                borderRadius: 12,
                padding: "14px",
                marginBottom: 16,
              }}
            >
              <p
                style={{
                  color: C.g400,
                  fontSize: 11,
                  fontWeight: 700,
                  marginBottom: 6,
                }}
              >
                AI RECRUITER NOTE
              </p>
              <p style={{ color: C.g500, fontSize: 13, lineHeight: 1.6 }}>
                {C_.note}
              </p>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 8,
              }}
            >
              <button
                onClick={() => setSelected(null)}
                style={{
                  padding: "11px",
                  borderRadius: 12,
                  background: `linear-gradient(135deg,${C.green},${C.greenDark})`,
                  border: "none",
                  color: C.navy,
                  fontWeight: 700,
                  fontSize: 13,
                  cursor: "pointer",
                }}
              >
                Schedule Interview
              </button>
              <button
                style={{
                  padding: "11px",
                  borderRadius: 12,
                  background: C.g100,
                  border: `1px solid ${C.border}`,
                  color: "#fff",
                  fontWeight: 600,
                  fontSize: 13,
                  cursor: "pointer",
                }}
              >
                Send Message
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
function BiasAudit() {
  const cats = [
    {
      label: "Gender",
      score: 88,
      col: C.green,
      note: "Near-perfect equity. 48F/52M shortlist split.",
    },
    {
      label: "Racial Equity",
      score: 76,
      col: C.blue,
      note: "Slight overindex on 2 groups. Review sourcing channels.",
    },
    {
      label: "Age Bias",
      score: 82,
      col: C.green,
      note: "All age groups proportionally advanced.",
    },
    {
      label: "Language Bias",
      score: 91,
      col: C.green,
      note: "Non-native speaker pass rates aligned.",
    },
    {
      label: "Name Bias",
      score: 94,
      col: C.green,
      note: "Anonymized review mode eliminated name bias.",
    },
    {
      label: "Edu Bias",
      score: 70,
      col: C.yellow,
      note: "Ivy-league over-indexed in final shortlist.",
    },
  ];
  return (
    <div style={{ padding: "32px" }}>
      <div style={{ marginBottom: 24 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 6,
          }}
        >
          <h2 style={{ fontSize: 24, fontWeight: 800, letterSpacing: -0.5 }}>
            Bias Audit
          </h2>
          <Pill color={C.green} style={{ fontSize: 13 }}>
            NYC LL144 Compliant ✦
          </Pill>
        </div>
        <p style={{ color: C.g400, fontSize: 14 }}>
          NYC Local Law 144 requires annual automated employment decision tool
          audits.
        </p>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 16,
          marginBottom: 28,
        }}
      >
        {cats.map((c, i) => (
          <div
            key={i}
            style={{
              background: C.navyLight,
              border: `1px solid ${C.border}`,
              borderRadius: 16,
              padding: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 12,
              }}
            >
              <p style={{ color: "#fff", fontWeight: 700, fontSize: 14 }}>
                {c.label}
              </p>
              <Pill color={c.col}>{c.score}%</Pill>
            </div>
            <div
              style={{
                height: 6,
                background: "rgba(255,255,255,0.07)",
                borderRadius: 3,
                overflow: "hidden",
                marginBottom: 10,
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${c.score}%`,
                  background: c.col,
                  borderRadius: 3,
                }}
              />
            </div>
            <p style={{ color: C.g400, fontSize: 12, lineHeight: 1.5 }}>
              {c.note}
            </p>
          </div>
        ))}
      </div>
      <div
        style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 20 }}
      >
        <div
          style={{
            background: C.navyLight,
            border: `1px solid ${C.border}`,
            borderRadius: 18,
            padding: "24px",
          }}
        >
          <h3 style={{ color: "#fff", fontWeight: 700, marginBottom: 16 }}>
            Intersectional Bias Analysis
          </h3>
          <RadarChart
            skills={[
              { label: "Gender", pct: 88 },
              { label: "Race", pct: 76 },
              { label: "Age", pct: 82 },
              { label: "Language", pct: 91 },
              { label: "Name", pct: 94 },
              { label: "Education", pct: 70 },
            ]}
            size={220}
          />
        </div>
        <div
          style={{
            background: C.navyLight,
            border: `1px solid ${C.border}`,
            borderRadius: 18,
            padding: "24px",
          }}
        >
          <h3 style={{ color: "#fff", fontWeight: 700, marginBottom: 16 }}>
            AI Safety Recommendations
          </h3>
          {[
            {
              t: "Diversify Sourcing",
              d: "Add 3 minority-focused job boards to sourcing mix.",
              col: C.yellow,
            },
            {
              t: "Review Edu Filter",
              d: "Remove 'Ivy-league preference' from automated screening.",
              col: C.red,
            },
            {
              t: "Racial Review",
              d: "Spot-check 15 rejected files for racial correlation.",
              col: C.yellow,
            },
            {
              t: "Maintain Anonymization",
              d: "Keep anonymous review active — strong results shown.",
              col: C.green,
            },
          ].map((r, i) => (
            <div key={i} style={{ display: "flex", gap: 12, marginBottom: 14 }}>
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: r.col,
                  flexShrink: 0,
                  marginTop: 4,
                }}
              />
              <div>
                <p
                  style={{
                    color: "#fff",
                    fontSize: 14,
                    fontWeight: 600,
                    marginBottom: 2,
                  }}
                >
                  {r.t}
                </p>
                <p style={{ color: C.g400, fontSize: 12, lineHeight: 1.5 }}>
                  {r.d}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
function InterviewSchedule() {
  const slots = [
    {
      name: "Alesha H.",
      role: "Sr. Product Designer",
      day: "Today",
      time: "10:30 AM",
      type: "Video",
      status: "Confirmed",
      col: C.green,
    },
    {
      name: "Jordan W.",
      role: "Design Systems",
      day: "Today",
      time: "1:00 PM",
      type: "Video",
      status: "Pending",
      col: C.yellow,
    },
    {
      name: "Maya P.",
      role: "UX Researcher",
      day: "Today",
      time: "3:30 PM",
      type: "Phone",
      status: "Confirmed",
      col: C.green,
    },
    {
      name: "Chris L.",
      role: "Sr. Product Designer",
      day: "Tomorrow",
      time: "11:00 AM",
      type: "Video",
      status: "Confirmed",
      col: C.green,
    },
    {
      name: "Emma R.",
      role: "Visual Designer",
      day: "Tomorrow",
      time: "2:30 PM",
      type: "In-person",
      status: "To Confirm",
      col: C.blue,
    },
    {
      name: "Sam K.",
      role: "Design Director",
      day: "Mar 20",
      time: "10:00 AM",
      type: "Panel",
      status: "Confirmed",
      col: C.green,
    },
  ];
  return (
    <div style={{ padding: "32px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <div>
          <h2 style={{ fontSize: 24, fontWeight: 800, letterSpacing: -0.5 }}>
            Interview Schedule
          </h2>
          <p style={{ color: C.g400, fontSize: 14 }}>6 interviews this week</p>
        </div>
        <button
          style={{
            padding: "11px 20px",
            borderRadius: 12,
            background: `linear-gradient(135deg,${C.green},${C.greenDark})`,
            border: "none",
            color: C.navy,
            fontWeight: 700,
            fontSize: 14,
            cursor: "pointer",
          }}
        >
          + Schedule Interview
        </button>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: 14,
          marginBottom: 24,
        }}
      >
        {[
          { label: "Total This Week", val: "6", icon: "📅", col: C.blue },
          { label: "Confirmed", val: "4", icon: "✓", col: C.green },
          { label: "Pending", val: "2", icon: "⏳", col: C.yellow },
        ].map((m) => (
          <div
            key={m.label}
            style={{
              background: C.navyLight,
              border: `1px solid ${C.border}`,
              borderRadius: 16,
              padding: "18px 20px",
            }}
          >
            <div style={{ fontSize: 28, marginBottom: 6 }}>{m.icon}</div>
            <p
              style={{
                color: "#fff",
                fontSize: 30,
                fontWeight: 800,
                letterSpacing: -1,
                marginBottom: 4,
              }}
            >
              {m.val}
            </p>
            <p style={{ color: C.g400, fontSize: 13 }}>{m.label}</p>
          </div>
        ))}
      </div>
      <div
        style={{
          background: C.navyLight,
          border: `1px solid ${C.border}`,
          borderRadius: 18,
          overflow: "hidden",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {[
                "Candidate",
                "Role",
                "Date & Time",
                "Type",
                "Status",
                "Actions",
              ].map((h) => (
                <th
                  key={h}
                  style={{
                    padding: "14px 18px",
                    textAlign: "left",
                    color: C.g400,
                    fontSize: 11,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    borderBottom: `1px solid ${C.border}`,
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {slots.map((s, i) => (
              <tr
                key={i}
                style={{
                  borderBottom:
                    i < slots.length - 1 ? `1px solid ${C.border}` : "none",
                }}
              >
                <td style={{ padding: "14px 18px" }}>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 10 }}
                  >
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: "50%",
                        background: `linear-gradient(135deg,${s.col}44,${s.col}22)`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#fff",
                        fontWeight: 700,
                        fontSize: 14,
                      }}
                    >
                      {s.name[0]}
                    </div>
                    <p style={{ color: "#fff", fontWeight: 600 }}>{s.name}</p>
                  </div>
                </td>
                <td
                  style={{ padding: "14px 18px", color: C.g400, fontSize: 13 }}
                >
                  {s.role}
                </td>
                <td style={{ padding: "14px 18px" }}>
                  <p style={{ color: "#fff", fontWeight: 600, fontSize: 13 }}>
                    {s.day}
                  </p>
                  <p style={{ color: C.g400, fontSize: 12 }}>{s.time}</p>
                </td>
                <td style={{ padding: "14px 18px" }}>
                  <Pill color={C.blue}>{s.type}</Pill>
                </td>
                <td style={{ padding: "14px 18px" }}>
                  <Pill color={s.col}>{s.status}</Pill>
                </td>
                <td style={{ padding: "14px 18px" }}>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button
                      style={{
                        padding: "6px 12px",
                        borderRadius: 8,
                        background: `${C.green}18`,
                        border: `1px solid ${C.green}33`,
                        color: C.green,
                        fontSize: 12,
                        fontWeight: 700,
                        cursor: "pointer",
                      }}
                    >
                      Join
                    </button>
                    <button
                      style={{
                        padding: "6px 12px",
                        borderRadius: 8,
                        background: `${C.blue}18`,
                        border: `1px solid ${C.blue}33`,
                        color: C.blue,
                        fontSize: 12,
                        fontWeight: 700,
                        cursor: "pointer",
                      }}
                    >
                      Reschedule
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
function HiringFunnel() {
  const stages = [
    { label: "Total Applications", value: "128 candidates" },
    { label: "AI Pre-Screened", value: "94 passed" },
    { label: "Recruiter Review", value: "52 advanced" },
    { label: "Phone Screen", value: "28 scheduled" },
    { label: "Technical Interview", value: "14 selected" },
    { label: "Final Interview", value: "6 finalists" },
    { label: "Offer Stage", value: "2 offers sent" },
  ];
  const trendData = [
    { x: 0, y: 42 },
    { x: 1, y: 58 },
    { x: 2, y: 51 },
    { x: 3, y: 79 },
    { x: 4, y: 68 },
    { x: 5, y: 94 },
    { x: 6, y: 86 },
    { x: 7, y: 112 },
    { x: 8, y: 128 },
  ];
  const speed = [
    { label: "Avg. Time to Screen", val: "4.2 hrs", col: C.green, icon: "⚡" },
    { label: "Avg. Time to Hire", val: "12 days", col: C.blue, icon: "📅" },
    { label: "Offer Acceptance", val: "74%", col: C.yellow, icon: "🤝" },
    { label: "Diversity Rate", val: "42%", col: C.purple, icon: "🌍" },
  ];
  return (
    <div style={{ padding: "32px" }}>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 24, fontWeight: 800, letterSpacing: -0.5 }}>
          Hiring Analytics
        </h2>
        <p style={{ color: C.g400, fontSize: 14 }}>
          Funnel performance for Sr. Product Designer
        </p>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: 14,
          marginBottom: 24,
        }}
      >
        {speed.map((s) => (
          <div
            key={s.label}
            style={{
              background: C.navyLight,
              border: `1px solid ${C.border}`,
              borderRadius: 16,
              padding: "18px 20px",
            }}
          >
            <div style={{ fontSize: 26, marginBottom: 8 }}>{s.icon}</div>
            <p
              style={{
                color: s.col,
                fontSize: 26,
                fontWeight: 800,
                letterSpacing: -1,
                marginBottom: 4,
              }}
            >
              {s.val}
            </p>
            <p style={{ color: C.g400, fontSize: 12 }}>{s.label}</p>
          </div>
        ))}
      </div>
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 20 }}
      >
        <div
          style={{
            background: C.navyLight,
            border: `1px solid ${C.border}`,
            borderRadius: 18,
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h3
            style={{
              color: "#fff",
              fontWeight: 700,
              alignSelf: "flex-start",
              marginBottom: 20,
            }}
          >
            Hiring Funnel
          </h3>
          <FunnelViz stages={stages} />
        </div>
        <div
          style={{
            background: C.navyLight,
            border: `1px solid ${C.border}`,
            borderRadius: 18,
            padding: "24px",
          }}
        >
          <h3 style={{ color: "#fff", fontWeight: 700, marginBottom: 6 }}>
            Application Volume
          </h3>
          <p style={{ color: C.g400, fontSize: 13, marginBottom: 20 }}>
            Past 9 weeks
          </p>
          <LineChart
            data={trendData}
            width={320}
            height={140}
            color={C.green}
          />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 12,
              marginTop: 20,
            }}
          >
            {[
              { label: "Top Source", val: "LinkedIn", col: C.blue },
              { label: "AI Score Avg", val: "81/100", col: C.green },
              { label: "Reject Rate", val: "63%", col: C.red },
              { label: "Bias Grade", val: "A+", col: C.green },
            ].map(({ label, val, col }) => (
              <div
                key={label}
                style={{
                  background: C.g100,
                  borderRadius: 12,
                  padding: "12px 14px",
                }}
              >
                <p style={{ color: C.g400, fontSize: 11, marginBottom: 4 }}>
                  {label}
                </p>
                <p style={{ color: col, fontWeight: 700, fontSize: 16 }}>
                  {val}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
function AdminDesk({ go }) {
  const [tab, setTab] = useState("overview");
  const navItems = [
    { id: "overview", label: "Dashboard", icon: "⊞" },
    { id: "analytics", label: "Analytics", icon: "📊" },
    { id: "ai", label: "AI Metrics", icon: "✦" },
    { id: "users", label: "Users", icon: "👥" },
    { id: "compliance", label: "Compliance", icon: "⚖️" },
    { id: "system", label: "System Health", icon: "💻" },
  ];
  const tabComponents = {
    overview: <AdminOverview />,
    analytics: <AdminAnalytics />,
    ai: <AdminAI />,
    users: <AdminUsers />,
    compliance: <AdminCompliance />,
    system: <AdminSystem />,
  };
  return (
    <div
      style={{ display: "flex", minHeight: "100vh", background: C.navyDark }}
    >
      <div
        style={{
          width: 220,
          background: C.navy,
          borderRight: `1px solid ${C.border}`,
          padding: "0 0 24px",
          display: "flex",
          flexDirection: "column",
          position: "sticky",
          top: 0,
          height: "100vh",
          overflowY: "auto",
          flexShrink: 0,
        }}
      >
        <div
          style={{
            padding: "24px 20px 20px",
            borderBottom: `1px solid ${C.border}`,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 16,
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: `linear-gradient(135deg,${C.blue},${C.purple})`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
              }}
            >
              ⚙️
            </div>
            <div>
              <p style={{ color: "#fff", fontWeight: 800, fontSize: 15 }}>
                ClearHire
              </p>
              <p style={{ color: C.g400, fontSize: 11 }}>Admin Console</p>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: `${C.blue}44`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontWeight: 700,
                fontSize: 14,
              }}
            >
              A
            </div>
            <div>
              <p style={{ color: "#fff", fontSize: 13, fontWeight: 600 }}>
                Admin User
              </p>
              <p style={{ color: C.g400, fontSize: 11 }}>Super Admin</p>
            </div>
          </div>
        </div>
        <div style={{ padding: "16px 8px", flex: 1 }}>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              style={{
                width: "100%",
                textAlign: "left",
                padding: "10px 12px",
                borderRadius: 10,
                marginBottom: 2,
                background: tab === item.id ? `${C.blue}18` : "none",
                border: `1px solid ${tab === item.id ? `${C.blue}33` : "transparent"}`,
                color: tab === item.id ? "#fff" : C.g400,
                fontSize: 14,
                fontWeight: tab === item.id ? 600 : 400,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <span style={{ fontSize: 16 }}>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </div>
        <div style={{ padding: "0 12px" }}>
          <button
            onClick={() => go("roleselect")}
            style={{
              width: "100%",
              padding: "10px 12px",
              borderRadius: 10,
              background: `${C.red}11`,
              border: `1px solid ${C.red}22`,
              color: C.red,
              fontSize: 13,
              cursor: "pointer",
              textAlign: "left",
            }}
          >
            ← Exit Admin
          </button>
        </div>
      </div>
      <div style={{ flex: 1, overflowY: "auto", minWidth: 0 }}>
        <div className="desk-screen">{tabComponents[tab]}</div>
      </div>
    </div>
  );
}
function AdminOverview() {
  const kpis = [
    {
      label: "Total Users",
      value: "84,312",
      icon: "👥",
      col: C.blue,
      sub: "+1,245 this week",
    },
    {
      label: "Active Jobs",
      value: "12,840",
      icon: "💼",
      col: C.green,
      sub: "+3.2% MoM",
    },
    {
      label: "AI Scans Today",
      value: "28,491",
      icon: "✦",
      col: C.purple,
      sub: "99.97% uptime",
    },
    {
      label: "Compliance Rate",
      value: "99.3%",
      icon: "⚖️",
      col: C.yellow,
      sub: "All audits passing",
    },
  ];
  const activity = [
    {
      msg: "User #39221 reported bias flag on Job #FF2211",
      time: "2m ago",
      col: C.red,
    },
    {
      msg: "AI model v3.2 deployed successfully to all regions",
      time: "8m ago",
      col: C.green,
    },
    {
      msg: "New GDPR request received — processing automatically",
      time: "14m ago",
      col: C.blue,
    },
    {
      msg: "Job #12801 hit 500 applications milestone",
      time: "22m ago",
      col: C.green,
    },
    {
      msg: "Company Acme Corp onboarded — 12 open roles",
      time: "1h ago",
      col: C.purple,
    },
    {
      msg: "Scheduled maintenance window starting in 24 hrs",
      time: "2h ago",
      col: C.yellow,
    },
  ];
  return (
    <div style={{ padding: "32px" }}>
      <div style={{ marginBottom: 24 }}>
        <h1
          style={{
            fontSize: 28,
            fontWeight: 800,
            letterSpacing: -1,
            marginBottom: 6,
          }}
        >
          Admin Dashboard
        </h1>
        <p style={{ color: C.g400, fontSize: 14 }}>
          Platform overview for ClearHire ATS · All regions
        </p>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: 16,
          marginBottom: 24,
        }}
      >
        {kpis.map((m, i) => (
          <div
            key={i}
            style={{
              background: C.navyLight,
              border: `1px solid ${C.border}`,
              borderRadius: 18,
              padding: "20px 22px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 12,
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 13,
                  background: `${m.col}22`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 22,
                }}
              >
                {m.icon}
              </div>
              <Pill color={m.col}>{m.sub}</Pill>
            </div>
            <p
              style={{
                color: "#fff",
                fontSize: 32,
                fontWeight: 800,
                letterSpacing: -1.5,
                marginBottom: 4,
              }}
            >
              {m.value}
            </p>
            <p style={{ color: C.g400, fontSize: 13 }}>{m.label}</p>
          </div>
        ))}
      </div>
      <div
        style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 20 }}
      >
        <div
          style={{
            background: C.navyLight,
            border: `1px solid ${C.border}`,
            borderRadius: 18,
            padding: "24px",
          }}
        >
          <h3 style={{ color: "#fff", fontWeight: 700, marginBottom: 16 }}>
            Live Activity Feed
          </h3>
          {activity.map((a, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                gap: 12,
                alignItems: "flex-start",
                marginBottom: i < activity.length - 1 ? 14 : 0,
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: a.col,
                  flexShrink: 0,
                  marginTop: 6,
                }}
              />
              <div style={{ flex: 1 }}>
                <p style={{ color: C.g500, fontSize: 13, lineHeight: 1.5 }}>
                  {a.msg}
                </p>
                <p
                  style={{
                    color: "rgba(255,255,255,0.2)",
                    fontSize: 11,
                    marginTop: 2,
                  }}
                >
                  {a.time}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div
            style={{
              background: C.navyLight,
              border: `1px solid ${C.border}`,
              borderRadius: 18,
              padding: "22px",
            }}
          >
            <h3 style={{ color: "#fff", fontWeight: 700, marginBottom: 14 }}>
              System Status
            </h3>
            {[
              { label: "API Uptime", pct: 99.97, col: C.green },
              { label: "AI Engine", pct: 99.8, col: C.green },
              { label: "Database", pct: 97.5, col: C.yellow },
              { label: "CDN", pct: 100, col: C.green },
            ].map((s) => (
              <div key={s.label} style={{ marginBottom: 10 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 4,
                  }}
                >
                  <p style={{ color: C.g400, fontSize: 12 }}>{s.label}</p>
                  <p style={{ color: s.col, fontSize: 12, fontWeight: 700 }}>
                    {s.pct}%
                  </p>
                </div>
                <div
                  style={{
                    height: 4,
                    background: C.g100,
                    borderRadius: 2,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: `${s.pct}%`,
                      background: s.col,
                      borderRadius: 2,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div
            style={{
              background: C.navyLight,
              border: `1px solid ${C.border}`,
              borderRadius: 18,
              padding: "22px",
            }}
          >
            <h3 style={{ color: "#fff", fontWeight: 700, marginBottom: 14 }}>
              Quick Actions
            </h3>
            {[
              ["📢", "Send Platform Announcement"],
              ["🔄", "Force Model Retrain"],
              ["📊", "Download Reports"],
              ["🔐", "Audit Trail Export"],
            ].map(([ic, label]) => (
              <button
                key={label}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: 10,
                  marginBottom: 8,
                  background: C.g100,
                  border: `1px solid ${C.border}`,
                  color: "#fff",
                  fontSize: 13,
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                <span style={{ fontSize: 16 }}>{ic}</span>
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
function AdminAnalytics() {
  const weekly = [
    { x: 0, y: 65 },
    { x: 1, y: 72 },
    { x: 2, y: 68 },
    { x: 3, y: 85 },
    { x: 4, y: 91 },
    { x: 5, y: 84 },
    { x: 6, y: 108 },
    { x: 7, y: 115 },
    { x: 8, y: 128 },
  ];
  const monthly = [
    { x: 0, y: 48 },
    { x: 1, y: 62 },
    { x: 2, y: 75 },
    { x: 3, y: 91 },
    { x: 4, y: 118 },
    { x: 5, y: 142 },
    { x: 6, y: 168 },
    { x: 7, y: 194 },
    { x: 8, y: 218 },
    { x: 9, y: 241 },
    { x: 10, y: 267 },
    { x: 11, y: 298 },
  ];
  const sources = [
    { label: "LinkedIn", pct: 42, color: C.blue },
    { label: "Direct", pct: 28, color: C.purple },
    { label: "Indeed", pct: 18, color: C.yellow },
    { label: "Referral", pct: 12, color: C.green },
  ];
  return (
    <div style={{ padding: "32px" }}>
      <h2
        style={{
          fontSize: 24,
          fontWeight: 800,
          letterSpacing: -0.5,
          marginBottom: 24,
        }}
      >
        Platform Analytics
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: 14,
          marginBottom: 24,
        }}
      >
        {[
          {
            label: "Monthly Active Users",
            val: "31,240",
            col: C.green,
            sub: "+18% MoM",
          },
          {
            label: "Avg. Session Length",
            val: "8.4 min",
            col: C.blue,
            sub: "+1.2 min vs last month",
          },
          {
            label: "Conversion Rate",
            val: "3.8%",
            col: C.purple,
            sub: "Visit → Application",
          },
        ].map((m) => (
          <div
            key={m.label}
            style={{
              background: C.navyLight,
              border: `1px solid ${C.border}`,
              borderRadius: 16,
              padding: "20px",
            }}
          >
            <p
              style={{
                color: "#fff",
                fontSize: 28,
                fontWeight: 800,
                letterSpacing: -1,
                marginBottom: 4,
              }}
            >
              {m.val}
            </p>
            <p
              style={{
                color: m.col,
                fontSize: 12,
                fontWeight: 700,
                marginBottom: 4,
              }}
            >
              {m.sub}
            </p>
            <p style={{ color: C.g400, fontSize: 12 }}>{m.label}</p>
          </div>
        ))}
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 20,
          marginBottom: 20,
        }}
      >
        <div
          style={{
            background: C.navyLight,
            border: `1px solid ${C.border}`,
            borderRadius: 18,
            padding: "24px",
          }}
        >
          <h3 style={{ color: "#fff", fontWeight: 700, marginBottom: 20 }}>
            Weekly Applications
          </h3>
          <LineChart data={weekly} width={320} height={140} color={C.blue} />
        </div>
        <div
          style={{
            background: C.navyLight,
            border: `1px solid ${C.border}`,
            borderRadius: 18,
            padding: "24px",
          }}
        >
          <h3 style={{ color: "#fff", fontWeight: 700, marginBottom: 20 }}>
            12-Month Growth
          </h3>
          <LineChart data={monthly} width={320} height={140} color={C.green} />
        </div>
      </div>
      <div
        style={{
          background: C.navyLight,
          border: `1px solid ${C.border}`,
          borderRadius: 18,
          padding: "24px",
        }}
      >
        <h3 style={{ color: "#fff", fontWeight: 700, marginBottom: 20 }}>
          Traffic Sources
        </h3>
        <HBarChart items={sources} color={C.blue} height={20} />
      </div>
    </div>
  );
}
function AdminAI() {
  const metrics = [
    { label: "Avg. Bias Reduction", val: "73%", col: C.green, icon: "⚖️" },
    { label: "Resume Scans / Day", val: "28.5K", col: C.blue, icon: "📄" },
    { label: "Model Accuracy", val: "96.4%", col: C.purple, icon: "✦" },
    { label: "False Positive Rate", val: "1.8%", col: C.yellow, icon: "⚠️" },
  ];
  return (
    <div style={{ padding: "32px" }}>
      <h2
        style={{
          fontSize: 24,
          fontWeight: 800,
          letterSpacing: -0.5,
          marginBottom: 24,
        }}
      >
        AI Performance Metrics
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: 14,
          marginBottom: 24,
        }}
      >
        {metrics.map((m) => (
          <div
            key={m.label}
            style={{
              background: C.navyLight,
              border: `1px solid ${C.border}`,
              borderRadius: 16,
              padding: "20px",
            }}
          >
            <div style={{ fontSize: 28, marginBottom: 10 }}>{m.icon}</div>
            <p
              style={{
                color: m.col,
                fontSize: 28,
                fontWeight: 800,
                letterSpacing: -1,
                marginBottom: 4,
              }}
            >
              {m.val}
            </p>
            <p style={{ color: C.g400, fontSize: 12 }}>{m.label}</p>
          </div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <div
          style={{
            background: C.navyLight,
            border: `1px solid ${C.border}`,
            borderRadius: 18,
            padding: "24px",
          }}
        >
          <h3 style={{ color: "#fff", fontWeight: 700, marginBottom: 20 }}>
            Model Versions
          </h3>
          {[
            {
              ver: "v3.2 (Current)",
              date: "Mar 15",
              acc: "96.4%",
              status: "Live",
              col: C.green,
            },
            {
              ver: "v3.1",
              date: "Feb 28",
              acc: "94.1%",
              status: "Retired",
              col: C.g400,
            },
            {
              ver: "v3.0",
              date: "Feb 1",
              acc: "91.8%",
              status: "Retired",
              col: C.g400,
            },
            {
              ver: "v4.0 (Beta)",
              date: "Mar 20",
              acc: "97.2%",
              status: "Testing",
              col: C.yellow,
            },
          ].map((v, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "12px 0",
                borderBottom: i < 3 ? `1px solid ${C.border}` : "none",
              }}
            >
              <div>
                <p style={{ color: "#fff", fontSize: 14, fontWeight: 600 }}>
                  {v.ver}
                </p>
                <p style={{ color: C.g400, fontSize: 12 }}>
                  Deployed: {v.date}
                </p>
              </div>
              <div style={{ textAlign: "right" }}>
                <p
                  style={{
                    color: C.green,
                    fontSize: 14,
                    fontWeight: 700,
                    marginBottom: 4,
                  }}
                >
                  {v.acc}
                </p>
                <Pill color={v.col} style={{ fontSize: 10 }}>
                  {v.status}
                </Pill>
              </div>
            </div>
          ))}
        </div>
        <div
          style={{
            background: C.navyLight,
            border: `1px solid ${C.border}`,
            borderRadius: 18,
            padding: "24px",
          }}
        >
          <h3 style={{ color: "#fff", fontWeight: 700, marginBottom: 20 }}>
            Fair Hiring Score by Category
          </h3>
          <RadarChart
            skills={[
              { label: "Gender", pct: 88 },
              { label: "Race", pct: 79 },
              { label: "Age", pct: 84 },
              { label: "Language", pct: 91 },
              { label: "Education", pct: 73 },
              { label: "Name", pct: 95 },
            ]}
            size={220}
          />
        </div>
      </div>
    </div>
  );
}
function AdminUsers() {
  const [search, setSearch] = useState("");
  const users = [
    {
      name: "Alesha Hyocinth",
      email: "alesha@email.com",
      role: "Job Seeker",
      plan: "Pro",
      joined: "Feb 10",
      status: "Active",
    },
    {
      name: "Jordan Wells",
      email: "jordan@corp.io",
      role: "Recruiter",
      plan: "Business",
      joined: "Jan 22",
      status: "Active",
    },
    {
      name: "Maya Patel",
      email: "maya@corp.com",
      role: "Job Seeker",
      plan: "Free",
      joined: "Feb 28",
      status: "Active",
    },
    {
      name: "Chris Lee",
      email: "chris@corp.com",
      role: "Job Seeker",
      plan: "Pro",
      joined: "Jan 15",
      status: "Suspended",
    },
    {
      name: "Rachel Kim",
      email: "rachel@co.com",
      role: "Recruiter",
      plan: "Business",
      joined: "Mar 1",
      status: "Active",
    },
  ];
  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()),
  );
  return (
    <div style={{ padding: "32px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <h2 style={{ fontSize: 24, fontWeight: 800, letterSpacing: -0.5 }}>
          User Management
        </h2>
        <p style={{ color: C.g400, fontSize: 14 }}>84,312 total users</p>
      </div>
      <div style={{ position: "relative", marginBottom: 16 }}>
        <span
          style={{
            position: "absolute",
            left: 14,
            top: "50%",
            transform: "translateY(-50%)",
            fontSize: 16,
          }}
        >
          🔍
        </span>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search name or email..."
          style={{
            width: "100%",
            maxWidth: 400,
            padding: "11px 14px 11px 44px",
            borderRadius: 12,
            background: C.navyLight,
            border: `1px solid ${C.border}`,
            color: "#fff",
            fontSize: 14,
          }}
        />
      </div>
      <div
        style={{
          background: C.navyLight,
          border: `1px solid ${C.border}`,
          borderRadius: 18,
          overflow: "hidden",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {[
                "User",
                "Email",
                "Role",
                "Plan",
                "Joined",
                "Status",
                "Action",
              ].map((h) => (
                <th
                  key={h}
                  style={{
                    padding: "14px 18px",
                    textAlign: "left",
                    color: C.g400,
                    fontSize: 11,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    borderBottom: `1px solid ${C.border}`,
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((u, i) => (
              <tr
                key={i}
                style={{
                  borderBottom:
                    i < filtered.length - 1 ? `1px solid ${C.border}` : "none",
                }}
              >
                <td style={{ padding: "14px 18px" }}>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 10 }}
                  >
                    <div
                      style={{
                        width: 34,
                        height: 34,
                        borderRadius: "50%",
                        background: `linear-gradient(135deg,${C.blue}44,${C.purple}33)`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#fff",
                        fontWeight: 700,
                        fontSize: 14,
                      }}
                    >
                      {u.name[0]}
                    </div>
                    <p style={{ color: "#fff", fontWeight: 600, fontSize: 14 }}>
                      {u.name}
                    </p>
                  </div>
                </td>
                <td
                  style={{ padding: "14px 18px", color: C.g400, fontSize: 13 }}
                >
                  {u.email}
                </td>
                <td style={{ padding: "14px 18px" }}>
                  <Pill color={u.role === "Recruiter" ? C.purple : C.blue}>
                    {u.role}
                  </Pill>
                </td>
                <td style={{ padding: "14px 18px" }}>
                  <Pill
                    color={
                      u.plan === "Business"
                        ? C.yellow
                        : u.plan === "Pro"
                          ? C.green
                          : C.g400
                    }
                  >
                    {u.plan}
                  </Pill>
                </td>
                <td
                  style={{ padding: "14px 18px", color: C.g400, fontSize: 13 }}
                >
                  {u.joined}
                </td>
                <td style={{ padding: "14px 18px" }}>
                  <Pill color={u.status === "Active" ? C.green : C.red}>
                    {u.status}
                  </Pill>
                </td>
                <td style={{ padding: "14px 18px" }}>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button
                      style={{
                        padding: "6px 12px",
                        borderRadius: 8,
                        background: `${C.blue}18`,
                        border: `1px solid ${C.blue}33`,
                        color: C.blue,
                        fontSize: 12,
                        fontWeight: 700,
                        cursor: "pointer",
                      }}
                    >
                      View
                    </button>
                    <button
                      style={{
                        padding: "6px 12px",
                        borderRadius: 8,
                        background: `${C.red}18`,
                        border: `1px solid ${C.red}33`,
                        color: C.red,
                        fontSize: 12,
                        fontWeight: 700,
                        cursor: "pointer",
                      }}
                    >
                      {u.status === "Active" ? "Suspend" : "Restore"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
function AdminCompliance() {
  const logs = [
    {
      id: "LOG-4821",
      action: "NYC LL144 Audit",
      result: "Pass",
      score: "A+",
      date: "Mar 15",
      col: C.green,
    },
    {
      id: "LOG-4810",
      action: "GDPR Data Request",
      result: "Processed",
      score: "100%",
      date: "Mar 14",
      col: C.blue,
    },
    {
      id: "LOG-4799",
      action: "Bias Flag Review",
      result: "Resolved",
      score: "Pass",
      date: "Mar 12",
      col: C.yellow,
    },
    {
      id: "LOG-4780",
      action: "CCPA Opt-out",
      result: "Processed",
      score: "100%",
      date: "Mar 10",
      col: C.blue,
    },
    {
      id: "LOG-4760",
      action: "AI Audit Report",
      result: "Pass",
      score: "A",
      date: "Mar 5",
      col: C.green,
    },
    {
      id: "LOG-4740",
      action: "Security Scan",
      result: "Pass",
      score: "98%",
      date: "Mar 1",
      col: C.green,
    },
  ];
  return (
    <div style={{ padding: "32px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <h2 style={{ fontSize: 24, fontWeight: 800, letterSpacing: -0.5 }}>
          Compliance & Legal
        </h2>
        <div style={{ display: "flex", gap: 8 }}>
          <Pill color={C.green} style={{ fontSize: 13 }}>
            NYC LL144 ✦
          </Pill>
          <Pill color={C.blue} style={{ fontSize: 13 }}>
            GDPR ✦
          </Pill>
          <Pill color={C.purple} style={{ fontSize: 13 }}>
            CCPA ✦
          </Pill>
        </div>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: 14,
          marginBottom: 24,
        }}
      >
        {[
          { label: "Laws Compliant", val: "4 / 4" },
          { label: "Last Audit", val: "Mar 15" },
          { label: "Violations", val: "0" },
        ].map((m) => (
          <div
            key={m.label}
            style={{
              background: C.navyLight,
              border: `1px solid ${C.border}`,
              borderRadius: 16,
              padding: "18px",
            }}
          >
            <p
              style={{
                color: "#fff",
                fontSize: 26,
                fontWeight: 800,
                letterSpacing: -1,
                marginBottom: 4,
              }}
            >
              {m.val}
            </p>
            <p style={{ color: C.g400, fontSize: 12 }}>{m.label}</p>
          </div>
        ))}
      </div>
      <div
        style={{
          background: C.navyLight,
          border: `1px solid ${C.border}`,
          borderRadius: 18,
          overflow: "hidden",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {["Event ID", "Action", "Result", "Score", "Date"].map((h) => (
                <th
                  key={h}
                  style={{
                    padding: "14px 18px",
                    textAlign: "left",
                    color: C.g400,
                    fontSize: 11,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    borderBottom: `1px solid ${C.border}`,
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {logs.map((log, i) => (
              <tr
                key={i}
                style={{
                  borderBottom:
                    i < logs.length - 1 ? `1px solid ${C.border}` : "none",
                }}
              >
                <td
                  style={{
                    padding: "14px 18px",
                    color: C.g400,
                    fontSize: 13,
                    fontFamily: "monospace",
                  }}
                >
                  {log.id}
                </td>
                <td
                  style={{
                    padding: "14px 18px",
                    color: "#fff",
                    fontWeight: 600,
                    fontSize: 14,
                  }}
                >
                  {log.action}
                </td>
                <td style={{ padding: "14px 18px" }}>
                  <Pill color={log.col}>{log.result}</Pill>
                </td>
                <td
                  style={{
                    padding: "14px 18px",
                    color: log.col,
                    fontWeight: 700,
                    fontSize: 14,
                  }}
                >
                  {log.score}
                </td>
                <td
                  style={{ padding: "14px 18px", color: C.g400, fontSize: 13 }}
                >
                  {log.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
function AdminSystem() {
  const services = [
    {
      name: "API Gateway",
      status: "Operational",
      uptime: "99.97%",
      latency: "42ms",
      col: C.green,
    },
    {
      name: "AI Engine",
      status: "Operational",
      uptime: "99.91%",
      latency: "180ms",
      col: C.green,
    },
    {
      name: "Database Cluster",
      status: "Degraded",
      uptime: "97.50%",
      latency: "280ms",
      col: C.yellow,
    },
    {
      name: "Auth Service",
      status: "Operational",
      uptime: "100%",
      latency: "21ms",
      col: C.green,
    },
    {
      name: "CDN",
      status: "Operational",
      uptime: "100%",
      latency: "12ms",
      col: C.green,
    },
    {
      name: "Email Service",
      status: "Operational",
      uptime: "99.60%",
      latency: "95ms",
      col: C.green,
    },
  ];
  return (
    <div style={{ padding: "32px" }}>
      <h2
        style={{
          fontSize: 24,
          fontWeight: 800,
          letterSpacing: -0.5,
          marginBottom: 24,
        }}
      >
        System Health
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: 14,
          marginBottom: 24,
        }}
      >
        {[
          { label: "Overall Status", val: "Healthy", col: C.green, icon: "✅" },
          {
            label: "Active Incidents",
            val: "1 Minor",
            col: C.yellow,
            icon: "⚠️",
          },
          { label: "Last Deploy", val: "2h ago", col: C.blue, icon: "🚀" },
        ].map((m) => (
          <div
            key={m.label}
            style={{
              background: C.navyLight,
              border: `1px solid ${C.border}`,
              borderRadius: 16,
              padding: "20px",
            }}
          >
            <div style={{ fontSize: 28, marginBottom: 6 }}>{m.icon}</div>
            <p
              style={{
                color: m.col,
                fontSize: 22,
                fontWeight: 800,
                marginBottom: 4,
              }}
            >
              {m.val}
            </p>
            <p style={{ color: C.g400, fontSize: 12 }}>{m.label}</p>
          </div>
        ))}
      </div>
      <div
        style={{
          background: C.navyLight,
          border: `1px solid ${C.border}`,
          borderRadius: 18,
          overflow: "hidden",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {["Service", "Status", "Uptime", "Latency", "Action"].map((h) => (
                <th
                  key={h}
                  style={{
                    padding: "14px 18px",
                    textAlign: "left",
                    color: C.g400,
                    fontSize: 11,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                    borderBottom: `1px solid ${C.border}`,
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {services.map((s, i) => (
              <tr
                key={i}
                style={{
                  borderBottom:
                    i < services.length - 1 ? `1px solid ${C.border}` : "none",
                }}
              >
                <td
                  style={{
                    padding: "14px 18px",
                    color: "#fff",
                    fontWeight: 600,
                    fontSize: 14,
                  }}
                >
                  {s.name}
                </td>
                <td style={{ padding: "14px 18px" }}>
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 8 }}
                  >
                    <div
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: s.col,
                        animation:
                          s.col === C.yellow
                            ? "pulse 1.5s ease infinite"
                            : "none",
                      }}
                    />
                    <Pill color={s.col}>{s.status}</Pill>
                  </div>
                </td>
                <td
                  style={{
                    padding: "14px 18px",
                    color: s.col,
                    fontWeight: 700,
                    fontSize: 14,
                  }}
                >
                  {s.uptime}
                </td>
                <td
                  style={{ padding: "14px 18px", color: C.g500, fontSize: 13 }}
                >
                  {s.latency}
                </td>
                <td style={{ padding: "14px 18px" }}>
                  <button
                    style={{
                      padding: "6px 14px",
                      borderRadius: 8,
                      background: `${C.blue}18`,
                      border: `1px solid ${C.blue}33`,
                      color: C.blue,
                      fontSize: 12,
                      fontWeight: 700,
                      cursor: "pointer",
                    }}
                  >
                    Inspect
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
const SCREENS = {
  splash: Splash,
  welcome: Welcome,
  login: Login,
  signup: Signup,
  forgotpassword: ForgotPassword,
  roleselect: RoleSelect,
  upload: ResumeUpload,
  parsing: Parsing,
  score: ATSScore,
  aifeedback: AIFeedback,
  dashboard: Dashboard,
  notifications: Notifications,
  search: Search,
  jobdetail: JobDetail,
  applyconfirm: ApplyConfirm,
  applications: Applications,
  autoapply: AutoApply,
  skillgap: SkillGap,
  learning: Learning,
  interviewprep: InterviewPrep,
  offercompare: OfferCompare,
  careerprogress: CareerProgress,
  profile: Profile,
  profilestrength: ProfileStrength,
  resumeversions: ResumeVersions,
  settings: Settings,
  privacy: Privacy,
  recruiterdesk: RecruiterDesk,
  admindesk: AdminDesk,
};
function App() {
  const [screen, setScreen] = useState("splash");
  const go = (s) => setScreen(s);
  const Screen = SCREENS[screen] || Dashboard;
  const isDesk = screen === "recruiterdesk" || screen === "admindesk";
  return (
    <div
      style={
        isDesk
          ? { minHeight: "100vh", fontFamily: "'DM Sans',sans-serif" }
          : { ...mobile, fontFamily: "'DM Sans',sans-serif" }
      }
    >
      <style>{`
        @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes fadeIn{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
        @keyframes pulse{0%,100%{opacity:1}50%{opacity:.4}}
        @keyframes glow{0%,100%{box-shadow:0 0 24px rgba(0,200,83,.35)}50%{box-shadow:0 0 48px rgba(0,200,83,.6)}}
        @keyframes shimmer{0%{background-position:-400px 0}100%{background-position:400px 0}}
        .screen{animation:fadeIn .35s ease;position:relative;}
        .desk-screen{animation:fadeIn .25s ease;min-height:100vh;}
        .hover-lift{transition:transform .2s,box-shadow .2s;}
        .hover-lift:hover{transform:translateY(-2px);box-shadow:0 8px 32px rgba(0,0,0,.3);}
        .btn-primary:hover:not(:disabled){filter:brightness(1.1);transform:translateY(-1px);}
      `}</style>
      <Screen go={go} />
    </div>
  );
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(React.createElement(App));
