import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";
import { loadFont as loadMono } from "@remotion/google-fonts/JetBrainsMono";
import { colors } from "../theme";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "500", "600", "700"],
  subsets: ["latin"],
});
const { fontFamily: mono } = loadMono("normal", {
  weights: ["400", "500"],
  subsets: ["latin"],
});

export type VignetteKind =
  | "parse-cv"
  | "write-questions"
  | "explain-routes"
  | "star-board";

const PanelShell: React.FC<{
  title: string;
  children: React.ReactNode;
  opacity: number;
  scale: number;
}> = ({ title, children, opacity, scale }) => (
  <AbsoluteFill
    style={{
      backgroundColor: "rgba(11,18,32,0.72)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily,
      opacity,
    }}
  >
    <div
      style={{
        width: 1100,
        background: colors.card,
        borderRadius: 20,
        overflow: "hidden",
        boxShadow: "0 40px 100px rgba(0,0,0,0.55)",
        scale: String(scale),
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "14px 18px",
          background: "#E5E7EB",
          borderBottom: "1px solid #D1D5DB",
        }}
      >
        <span style={{ width: 12, height: 12, borderRadius: 99, background: "#F87171" }} />
        <span style={{ width: 12, height: 12, borderRadius: 99, background: "#FBBF24" }} />
        <span style={{ width: 12, height: 12, borderRadius: 99, background: "#34D399" }} />
        <div
          style={{
            marginLeft: 16,
            flex: 1,
            background: "#F9FAFB",
            borderRadius: 8,
            padding: "6px 14px",
            color: colors.textDarkMuted,
            fontSize: 15,
            fontFamily: mono,
          }}
        >
          {title}
        </div>
        <div
          style={{
            background: colors.ai,
            color: "white",
            fontSize: 12,
            fontWeight: 700,
            borderRadius: 6,
            padding: "4px 10px",
            letterSpacing: "0.04em",
          }}
        >
          AI
        </div>
      </div>
      <div style={{ padding: 28, minHeight: 420 }}>{children}</div>
    </div>
  </AbsoluteFill>
);

const ParseCv: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const scanY = interpolate(frame, [0, 1.6 * fps], [20, 340], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const lines = [
    "Name: Jordan Murphy",
    "Role: Production Technician — 6 years",
    "Skills: CNC setup · Safety lead · Mentoring",
    "Claims: Led shift handovers; trained 4 juniors",
    "Education: Leaving Cert · QQI Level 5",
  ];
  const highlightCount = Math.floor(
    interpolate(frame, [0.2 * fps, 1.4 * fps], [0, lines.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );

  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          fontSize: 22,
          fontWeight: 700,
          color: colors.textDark,
          marginBottom: 18,
        }}
      >
        Parse the CV
      </div>
      <div
        style={{
          position: "relative",
          background: "#F3F4F6",
          borderRadius: 14,
          padding: 22,
          fontFamily: mono,
          fontSize: 18,
          lineHeight: 1.7,
          color: colors.textDark,
          overflow: "hidden",
        }}
      >
        {lines.map((line, i) => (
          <div
            key={line}
            style={{
              background:
                i < highlightCount ? "rgba(59,130,246,0.18)" : "transparent",
              borderLeft:
                i < highlightCount
                  ? `3px solid ${colors.ai}`
                  : "3px solid transparent",
              paddingLeft: 12,
              marginBottom: 6,
              borderRadius: 4,
            }}
          >
            {line}
          </div>
        ))}
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: scanY,
            height: 3,
            background: `linear-gradient(90deg, transparent, ${colors.ai}, transparent)`,
            boxShadow: `0 0 18px ${colors.aiGlow}`,
          }}
        />
      </div>
    </div>
  );
};

const WriteQuestions: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const tokenCount = Math.floor(
    interpolate(frame, [0, 1.5 * fps], [0, 28], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );
  const jsonReveal = interpolate(frame, [0.4 * fps, 1.6 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const json = `{
  "questions": [
    "Tell me about a time you trained someone.",
    "What changed after your safety briefings?",
    "Which CNC setup are you strongest on?"
  ],
  "fold": "claim_strength += answers"
}`;

  const shown = json.slice(0, Math.floor(json.length * jsonReveal));

  return (
    <div>
      <div
        style={{
          fontSize: 22,
          fontWeight: 700,
          color: colors.textDark,
          marginBottom: 14,
        }}
      >
        Write questions · fold answers
      </div>
      <div style={{ display: "flex", gap: 18 }}>
        <div style={{ flex: 1 }}>
          <div
            style={{
              fontSize: 13,
              color: colors.textDarkMuted,
              marginBottom: 10,
              fontWeight: 600,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            Thinking tokens
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {Array.from({ length: 28 }).map((_, i) => (
              <div
                key={i}
                style={{
                  width: 18,
                  height: 10,
                  borderRadius: 3,
                  background:
                    i < tokenCount
                      ? i % 5 === 0
                        ? colors.ai
                        : "#93C5FD"
                      : "#E5E7EB",
                  opacity: i < tokenCount ? 1 : 0.5,
                }}
              />
            ))}
          </div>
        </div>
        <div
          style={{
            flex: 1.4,
            background: "#0F172A",
            color: "#E2E8F0",
            borderRadius: 12,
            padding: 18,
            fontFamily: mono,
            fontSize: 15,
            whiteSpace: "pre",
            minHeight: 260,
            boxShadow: `inset 0 0 0 1px ${colors.aiGlow}`,
          }}
        >
          {shown}
          <span style={{ color: colors.aiSoft }}>▍</span>
        </div>
      </div>
    </div>
  );
};

const ExplainRoutes: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const scroll = interpolate(frame, [0, 1.7 * fps], [0, -160], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.22, 1, 0.36, 1),
  });

  const courses = [
    { tag: "Skillnet", title: "Advanced Manufacturing Leadership", meta: "12 weeks · blended" },
    { tag: "SOLAS", title: "Team Lead Micro-credential", meta: "QQI Level 6 · evenings" },
    { tag: "Springboard+", title: "Digital Operations for Industry", meta: "Part-time · funded" },
    { tag: "Skillnet", title: "Coaching on the Floor", meta: "6 weeks · workplace" },
    { tag: "SOLAS", title: "Lean Production Fundamentals", meta: "Online · self-paced" },
  ];

  return (
    <div>
      <div
        style={{
          fontSize: 22,
          fontWeight: 700,
          color: colors.textDark,
          marginBottom: 14,
        }}
      >
        Explain the two routes
      </div>
      <div
        style={{
          height: 320,
          overflow: "hidden",
          borderRadius: 14,
          border: "1px solid #E5E7EB",
          background: "#F9FAFB",
        }}
      >
        <div style={{ transform: `translateY(${scroll}px)`, padding: 16 }}>
          {courses.map((c) => (
            <div
              key={c.title}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                background: "white",
                border: "1px solid #E5E7EB",
                borderRadius: 12,
                padding: "16px 18px",
                marginBottom: 12,
              }}
            >
              <div
                style={{
                  background: "#DBEAFE",
                  color: colors.ai,
                  fontWeight: 700,
                  fontSize: 12,
                  padding: "6px 10px",
                  borderRadius: 8,
                  minWidth: 96,
                  textAlign: "center",
                }}
              >
                {c.tag}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, color: colors.textDark, fontSize: 18 }}>
                  {c.title}
                </div>
                <div style={{ color: colors.textDarkMuted, fontSize: 14, marginTop: 2 }}>
                  {c.meta}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const StarBoard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const assemble = interpolate(frame, [0, 1.5 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const cards = [
    { label: "Situation", text: "Night shift handover gaps" },
    { label: "Task", text: "Stabilize briefings in 2 weeks" },
    { label: "Action", text: "Wrote checklist; coached 4 juniors" },
    { label: "Result", text: "Fewer misses; kept as lead" },
  ];

  return (
    <div>
      <div
        style={{
          fontSize: 22,
          fontWeight: 700,
          color: colors.textDark,
          marginBottom: 14,
        }}
      >
        Adviser page + STAR board
      </div>
      <div style={{ display: "flex", gap: 18 }}>
        <div
          style={{
            flex: 1,
            background: "#0B1220",
            borderRadius: 14,
            padding: 18,
            color: colors.text,
            opacity: interpolate(assemble, [0, 0.4], [0, 1]),
            transform: `translateY(${interpolate(assemble, [0, 0.4], [20, 0])}px)`,
          }}
        >
          <div style={{ fontSize: 13, color: colors.textMuted, marginBottom: 8 }}>
            ADVISER
          </div>
          <div style={{ fontSize: 20, fontWeight: 600, marginBottom: 10 }}>
            Jordan · Production → Team Lead
          </div>
          <div style={{ fontSize: 15, color: colors.textMuted, lineHeight: 1.5 }}>
            One committed next step: enroll in Team Lead micro-credential
            (SOLAS evenings).
          </div>
        </div>
        <div style={{ flex: 1.2, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
          {cards.map((c, i) => {
            const local = interpolate(assemble, [0.15 + i * 0.15, 0.35 + i * 0.15], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            return (
              <div
                key={c.label}
                style={{
                  background: "white",
                  border: `1px solid ${colors.humanSoft}`,
                  borderRadius: 12,
                  padding: 14,
                  opacity: local,
                  transform: `translateY(${(1 - local) * 16}px)`,
                }}
              >
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: colors.human,
                    letterSpacing: "0.06em",
                    marginBottom: 6,
                  }}
                >
                  {c.label}
                </div>
                <div style={{ fontSize: 15, color: colors.textDark }}>{c.text}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export const AiVignette: React.FC<{ kind: VignetteKind; length?: number }> = ({
  kind,
  length = 55,
}) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(
    frame,
    [0, 8, length - 8, length],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const scale = interpolate(frame, [0, 10], [0.96, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const titles: Record<VignetteKind, string> = {
    "parse-cv": "skillsatlas.app / capture / parse",
    "write-questions": "skillsatlas.app / questioning",
    "explain-routes": "skillsatlas.app / routes / catalogue",
    "star-board": "skillsatlas.app / board / star",
  };

  return (
    <PanelShell title={titles[kind]} opacity={opacity} scale={scale}>
      {kind === "parse-cv" && <ParseCv />}
      {kind === "write-questions" && <WriteQuestions />}
      {kind === "explain-routes" && <ExplainRoutes />}
      {kind === "star-board" && <StarBoard />}
    </PanelShell>
  );
};
