import React from "react";
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { Video } from "@remotion/media";
import { colors, RADIUS_LG } from "../../theme";
import { fontSans, fontSerif, fontMono } from "../../fonts";
import type { VignetteKind } from "./processData";

/**
 * Real silent browser recordings under public/recordings/.
 * write-questions is an animated mock (agent question) — not Springboard.
 */
export const RECORDING_FILES: Partial<Record<VignetteKind, string>> = {
  "explain-routes": "recordings/fetch-courses-scroll-cropped.mp4",
  // V2.3: explain-routes = hold-then-scroll FETCH crop; star-board = STAR panel (not problem screen)
};

export const STILL_FILES: Partial<Record<VignetteKind, string>> = {
  "explain-routes": "recordings/stills/fetch-results-cropped.png",
  "star-board": "recordings/stills/demo-board.png",
};

const TITLES: Record<VignetteKind, string> = {
  "parse-cv": "skillsatlas.app / capture / parse",
  "write-questions": "skillsatlas.app / questioning / write",
  "fold-answers": "skillsatlas.app / questioning / fold",
  "pick-2-routes": "skillsatlas.app / routes / pick-2",
  "explain-routes": "skillsatlas.app / routes / courses",
  "star-board": "skillsatlas.vercel.app/demo.html · 04 BOARD",
};

const BrowserChrome: React.FC<{
  title: string;
  children: React.ReactNode;
  scale: number;
  flush?: boolean;
}> = ({ title, children, scale, flush }) => (
  <div
    style={{
      width: 1280,
      background: colors.card,
      borderRadius: RADIUS_LG,
      overflow: "hidden",
      boxShadow: "0 32px 80px rgba(16,43,63,0.18)",
      transform: `scale(${scale})`,
      fontFamily: fontSans,
    }}
  >
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "14px 18px",
        background: colors.bgSoft,
        borderBottom: `1px solid ${colors.border}`,
      }}
    >
      <span style={{ width: 12, height: 12, borderRadius: 99, background: colors.accent }} />
      <span style={{ width: 12, height: 12, borderRadius: 99, background: colors.amberBg }} />
      <span style={{ width: 12, height: 12, borderRadius: 99, background: colors.teal }} />
      <div
        style={{
          marginLeft: 16,
          flex: 1,
          background: colors.card,
          borderRadius: 8,
          padding: "6px 14px",
          color: colors.textDarkMuted,
          fontSize: 15,
          fontFamily: fontMono,
        }}
      >
        {title}
      </div>
      <div
        style={{
          background: colors.accent,
          color: colors.accentInk,
          fontSize: 11,
          fontWeight: 800,
          borderRadius: 999,
          padding: "4px 10px",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        AI
      </div>
    </div>
    <div style={{ padding: flush ? 0 : 28, minHeight: flush ? 0 : 440, background: colors.bg }}>
      {children}
    </div>
  </div>
);

type Chip = { label: string; kind: string; line: number };

const PARSE_LINES = [
  "Name: Jordan Murphy",
  "Role: Production Technician — 6 years",
  "Experience: managed stock across warehouse",
  "Skills: CNC setup · Safety lead · Mentoring",
  "Claims: Led shift handovers; trained 4 juniors",
  "Education: Leaving Cert · QQI Level 5 · 2018",
];

const PARSE_CHIPS: Chip[] = [
  { label: "Production Technician", kind: "role", line: 1 },
  { label: "CNC setup", kind: "tool", line: 3 },
  { label: "2018", kind: "date", line: 5 },
  { label: "4 juniors", kind: "number", line: 4 },
  { label: "managed stock", kind: "claim", line: 2 },
];

/** Progressive highlight sweep + claim chips (not a static select flash). */
const ParseCvMock: React.FC<{ frame: number; length: number }> = ({
  frame,
  length,
}) => {
  const sweep = interpolate(frame, [4, length * 0.62], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.22, 1, 0.36, 1),
  });
  const lineH = 42;
  const scanY = 8 + sweep * (PARSE_LINES.length * lineH - 8);

  return (
    <div
      style={{
        position: "relative",
        padding: 28,
        background: colors.card,
        minHeight: 480,
        display: "flex",
        gap: 22,
      }}
    >
      <div style={{ flex: 1.35 }}>
        <div
          style={{
            fontSize: 28,
            fontWeight: 400,
            color: colors.textDark,
            marginBottom: 16,
            fontFamily: fontSerif,
          }}
        >
          Parse the CV
        </div>
        <div
          style={{
            position: "relative",
            background: colors.bgSoft,
            borderRadius: 14,
            padding: "16px 18px",
            fontFamily: fontMono,
            fontSize: 17,
            lineHeight: `${lineH}px`,
            color: colors.textDark,
            overflow: "hidden",
          }}
        >
          {PARSE_LINES.map((line, i) => {
            const lineStart = i / PARSE_LINES.length;
            const lineEnd = (i + 0.85) / PARSE_LINES.length;
            const hl = interpolate(sweep, [lineStart, lineEnd], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            return (
              <div
                key={line}
                style={{
                  position: "relative",
                  height: lineH,
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: 12,
                  marginBottom: 2,
                  borderRadius: 6,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 4,
                    bottom: 4,
                    width: `${hl * 100}%`,
                    background: "rgba(30,93,94,0.18)",
                    borderLeft: hl > 0.05 ? `3px solid ${colors.ai}` : "3px solid transparent",
                    borderRadius: 6,
                  }}
                />
                <span style={{ position: "relative", zIndex: 1 }}>{line}</span>
              </div>
            );
          })}
          <div
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: scanY,
              height: 3,
              background: `linear-gradient(90deg, transparent, ${colors.ai}, transparent)`,
              boxShadow: `0 0 18px ${colors.aiGlow}`,
              opacity: interpolate(frame, [4, 10, length * 0.62, length * 0.7], [0, 1, 1, 0], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          />
        </div>
      </div>

      <div style={{ width: 280, paddingTop: 44 }}>
        <div
          style={{
            fontSize: 12,
            fontWeight: 800,
            letterSpacing: "0.08em",
            color: colors.accent,
            marginBottom: 12,
            textTransform: "uppercase",
          }}
        >
          CLAIMS EXTRACTED
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {PARSE_CHIPS.map((chip, i) => {
            const appearAt = 18 + i * 8;
            const op = interpolate(frame, [appearAt, appearAt + 10], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            });
            const y = interpolate(frame, [appearAt, appearAt + 10], [16, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            });
            return (
              <div
                key={chip.label}
                style={{
                  opacity: op,
                  transform: `translateY(${y}px)`,
                  background: colors.aiFill,
                  border: `1.5px solid ${colors.ai}`,
                  borderRadius: 999,
                  padding: "10px 14px",
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  boxShadow: `0 8px 20px ${colors.aiGlow}`,
                }}
              >
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 800,
                    letterSpacing: "0.05em",
                    color: "#fff",
                    background: colors.ai,
                    borderRadius: 6,
                    padding: "2px 7px",
                    textTransform: "uppercase",
                  }}
                >
                  {chip.kind}
                </span>
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: colors.textDark,
                  }}
                >
                  {chip.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

/** Agent asks the worker about weak evidence — not Springboard. */
const WriteQuestionsMock: React.FC<{ frame: number; length: number }> = ({
  frame,
  length,
}) => {
  const evidenceIn = interpolate(frame, [0, 14], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const qIn = interpolate(frame, [16, 32], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const pulse = interpolate(
    frame % 40,
    [0, 20, 40],
    [0.55, 1, 0.55],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <div
      style={{
        padding: 36,
        background: colors.card,
        minHeight: 480,
        display: "flex",
        flexDirection: "column",
        gap: 22,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ fontSize: 28, fontWeight: 400, color: colors.textDark, fontFamily: fontSerif }}>
          Write questions
        </div>
        <div
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: colors.ai,
            background: colors.aiFill,
            border: `1px solid ${colors.aiBorder}`,
            borderRadius: 999,
            padding: "6px 14px",
          }}
        >
          Agent → worker
        </div>
      </div>

      <div
        style={{
          opacity: evidenceIn,
          transform: `translateY(${(1 - evidenceIn) * 12}px)`,
          background: colors.bgSoft,
          borderRadius: 14,
          padding: "16px 20px",
          borderLeft: `4px solid ${colors.code}`,
        }}
      >
        <div
          style={{
            fontSize: 12,
            fontWeight: 800,
            letterSpacing: "0.06em",
            color: colors.textDarkMuted,
            marginBottom: 8,
          }}
        >
          WEAK EVIDENCE ON CV
        </div>
        <div
          style={{
            fontSize: 22,
            fontWeight: 600,
            color: colors.textDark,
            fontStyle: "italic",
          }}
        >
          “…managed stock…”
        </div>
      </div>

      <div
        style={{
          opacity: qIn,
          transform: `scale(${0.94 + qIn * 0.06}) translateY(${(1 - qIn) * 24}px)`,
          background: `linear-gradient(160deg, ${colors.aiFill}, #fff)`,
          border: `2.5px solid ${colors.ai}`,
          borderRadius: 20,
          padding: "28px 32px",
          boxShadow: `0 20px 50px ${colors.aiGlow}`,
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 18,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            opacity: 0.7 + pulse * 0.3,
          }}
        >
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: 99,
              background: colors.ai,
              boxShadow: `0 0 12px ${colors.aiGlow}`,
            }}
          />
          <span
            style={{
              fontSize: 13,
              fontWeight: 800,
              letterSpacing: "0.08em",
              color: colors.ai,
            }}
          >
            QUESTION FOR JORDAN
          </span>
        </div>
        <div
          style={{
            fontSize: 36,
            fontWeight: 800,
            color: colors.textDark,
            lineHeight: 1.25,
            letterSpacing: "-0.02em",
          }}
        >
          How many SKUs, and what system?
        </div>
        <div style={{ fontSize: 16, color: colors.textDarkMuted, maxWidth: 720 }}>
          Turn a vague keyword into checkable evidence — quantity, tool, and timeframe.
        </div>
      </div>
    </div>
  );
};

/** Slow wow beat: answer → folded strengthened claim with before/after score. */
const FoldAnswersMock: React.FC<{ frame: number; length: number }> = ({
  frame,
  length,
}) => {
  const answerIn = interpolate(frame, [0, 16], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const foldProg = interpolate(frame, [28, length * 0.72], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.22, 1, 0.36, 1),
  });
  const cardIn = interpolate(frame, [42, 62], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const badgeIn = interpolate(frame, [58, 74], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const scoreFill = interpolate(frame, [64, 88], [0.22, 0.92], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.22, 1, 0.36, 1),
  });

  const answerCollapse = interpolate(foldProg, [0, 0.55], [1, 0.35], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        padding: 32,
        background: colors.card,
        minHeight: 480,
        display: "flex",
        flexDirection: "column",
        gap: 20,
      }}
    >
      <div style={{ fontSize: 28, fontWeight: 400, color: colors.textDark, fontFamily: fontSerif }}>
        Fold answers into claims
      </div>

      <div
        style={{
          opacity: answerIn * answerCollapse,
          transform: `scaleY(${0.85 + answerCollapse * 0.15})`,
          transformOrigin: "top center",
          background: colors.bgSoft,
          borderRadius: 14,
          padding: "18px 22px",
        }}
      >
        <div
          style={{
            fontSize: 12,
            fontWeight: 800,
            letterSpacing: "0.06em",
            color: colors.textDarkMuted,
            marginBottom: 8,
          }}
        >
          WORKER ANSWER
        </div>
        <div style={{ fontSize: 20, color: colors.textDark, lineHeight: 1.45 }}>
          “About 2,400 SKUs — we run them in SAP EWM. That was through 2024.”
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
          opacity: interpolate(foldProg, [0.15, 0.4], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <div
          style={{
            height: 3,
            width: 80,
            background: colors.ai,
            borderRadius: 99,
            transform: `scaleX(${interpolate(foldProg, [0.15, 0.7], [0.2, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })})`,
            transformOrigin: "left center",
          }}
        />
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 99,
            background: colors.ai,
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: 800,
            fontSize: 20,
            boxShadow: `0 0 20px ${colors.aiGlow}`,
          }}
        >
          ↓
        </div>
        <div
          style={{
            height: 3,
            width: 80,
            background: colors.human,
            borderRadius: 99,
            transform: `scaleX(${interpolate(foldProg, [0.35, 0.85], [0.2, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })})`,
            transformOrigin: "left center",
          }}
        />
      </div>

      <div
        style={{
          opacity: cardIn,
          transform: `translateY(${(1 - cardIn) * 28}px) scale(${0.94 + cardIn * 0.06})`,
          background: colors.humanFill,
          border: `2.5px solid ${colors.human}`,
          borderRadius: RADIUS_LG,
          padding: "22px 26px",
          boxShadow: `0 18px 44px ${colors.humanGlow}`,
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 16,
            marginBottom: 14,
          }}
        >
          <div>
            <div
              style={{
                fontSize: 12,
                fontWeight: 800,
                letterSpacing: "0.06em",
                color: colors.human,
                marginBottom: 8,
              }}
            >
              STRENGTHENED CLAIM
            </div>
            <div
              style={{
                fontSize: 13,
                color: colors.textDarkMuted,
                textDecoration: "line-through",
                marginBottom: 6,
              }}
            >
              managed stock
            </div>
            <div
              style={{
                fontSize: 26,
                fontWeight: 800,
                color: colors.textDark,
                letterSpacing: "-0.02em",
              }}
            >
              2,400 SKUs in SAP EWM, 2024
            </div>
          </div>
          <div
            style={{
              opacity: badgeIn,
              transform: `scale(${0.7 + badgeIn * 0.3})`,
              background: colors.human,
              color: "#fff",
              fontSize: 13,
              fontWeight: 800,
              letterSpacing: "0.06em",
              borderRadius: 10,
              padding: "10px 14px",
              whiteSpace: "nowrap",
            }}
          >
            CONFIRMED
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ flex: 1 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 6,
                fontSize: 12,
                fontWeight: 700,
                color: colors.textDarkMuted,
              }}
            >
              <span>Evidence strength</span>
              <span>
                <span style={{ color: colors.code }}>22%</span>
                {" → "}
                <span style={{ color: colors.human }}>92%</span>
              </span>
            </div>
            <div
              style={{
                height: 12,
                borderRadius: 99,
                background: colors.bgSoft,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${scoreFill * 100}%`,
                  height: "100%",
                  borderRadius: 99,
                  background: `linear-gradient(90deg, ${colors.ai}, ${colors.human})`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


/** Exactly two reachable, unranked route cards — not a job board of ten. */
const PICK2_ROUTES = [
  {
    title: "Logistics coordinator",
    fit: "Strong transfer",
    skills: ["SAP EWM stock", "2,400 SKU counts", "Shift handovers"],
    gaps: ["Route planning tools", "Carrier SLA language"],
  },
  {
    title: "Warehouse supervisor",
    fit: "Reachable next",
    skills: ["Trained 4 juniors", "CNC + safety lead", "Floor ops"],
    gaps: ["Rostering systems", "KPI pack for leads"],
  },
] as const;

const Pick2RoutesMock: React.FC<{ frame: number; length: number }> = ({
  frame,
  length,
}) => {
  const headerIn = interpolate(frame, [0, 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const badgePulse = interpolate(
    frame % 36,
    [0, 18, 36],
    [0.7, 1, 0.7],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  return (
    <div
      style={{
        padding: "28px 32px 32px",
        background: colors.card,
        minHeight: 480,
        display: "flex",
        flexDirection: "column",
        gap: 20,
      }}
    >
      <div
        style={{
          opacity: headerIn,
          transform: `translateY(${(1 - headerIn) * 12}px)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        <div>
          <div
            style={{
              fontSize: 13,
              fontWeight: 800,
              letterSpacing: "0.08em",
              color: colors.accent,
              marginBottom: 6,
              textTransform: "uppercase",
            }}
          >
            CODE · PICK 2 ROUTES
          </div>
          <div
            style={{
              fontSize: 30,
              fontWeight: 400,
              color: colors.textDark,
              letterSpacing: "-0.02em",
              fontFamily: fontSerif,
            }}
          >
            Two reachable routes — unranked
          </div>
        </div>
        <div
          style={{
            opacity: 0.65 + badgePulse * 0.35,
            background: colors.code,
            color: "#fff",
            fontSize: 18,
            fontWeight: 800,
            borderRadius: 999,
            padding: "12px 20px",
            letterSpacing: "0.04em",
            boxShadow: "0 10px 28px rgba(107,114,128,0.35)",
            whiteSpace: "nowrap",
          }}
        >
          2 of N · not a job board
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 18,
          flex: 1,
        }}
      >
        {PICK2_ROUTES.map((route, i) => {
          const appearAt = 14 + i * 14;
          const op = interpolate(frame, [appearAt, appearAt + 14], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          });
          const y = interpolate(frame, [appearAt, appearAt + 14], [28, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          });
          const scale = interpolate(frame, [appearAt, appearAt + 14], [0.92, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          });
          return (
            <div
              key={route.title}
              style={{
                opacity: op,
                transform: `translateY(${y}px) scale(${scale})`,
                background: i === 0 ? colors.aiFill : colors.humanFill,
                border: `2.5px solid ${i === 0 ? colors.ai : colors.human}`,
                borderRadius: RADIUS_LG,
                padding: "22px 22px 20px",
                boxShadow:
                  i === 0
                    ? `0 18px 40px ${colors.aiGlow}`
                    : `0 18px 40px ${colors.humanGlow}`,
                display: "flex",
                flexDirection: "column",
                gap: 14,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  gap: 10,
                }}
              >
                <div>
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 800,
                      letterSpacing: "0.07em",
                      color: i === 0 ? colors.ai : colors.human,
                      marginBottom: 6,
                    }}
                  >
                    ROUTE {i + 1} · {route.fit.toUpperCase()}
                  </div>
                  <div
                    style={{
                      fontSize: 24,
                      fontWeight: 800,
                      color: colors.textDark,
                      letterSpacing: "-0.02em",
                      lineHeight: 1.2,
                    }}
                  >
                    {route.title}
                  </div>
                </div>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 800,
                    letterSpacing: "0.05em",
                    color: colors.textDarkMuted,
                    background: "rgba(255,255,255,0.7)",
                    borderRadius: 8,
                    padding: "6px 10px",
                    whiteSpace: "nowrap",
                  }}
                >
                  UNRANKED
                </div>
              </div>

              <div>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 800,
                    letterSpacing: "0.06em",
                    color: colors.human,
                    marginBottom: 8,
                  }}
                >
                  TRANSFERABLE SKILLS
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {route.skills.map((s) => (
                    <span
                      key={s}
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: colors.textDark,
                        background: "#fff",
                        border: `1px solid ${colors.humanBorder}`,
                        borderRadius: 999,
                        padding: "6px 12px",
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 800,
                    letterSpacing: "0.06em",
                    color: colors.code,
                    marginBottom: 8,
                  }}
                >
                  GAPS TO CLOSE
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {route.gaps.map((g) => (
                    <span
                      key={g}
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: colors.textDarkMuted,
                        background: colors.bgSoft,
                        border: "1px dashed #9CA3AF",
                        borderRadius: 999,
                        padding: "6px 12px",
                      }}
                    >
                      {g}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div
        style={{
          opacity: interpolate(frame, [48, 62], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          fontSize: 15,
          color: colors.textDarkMuted,
          textAlign: "center",
          fontWeight: 600,
        }}
      >
        ESCO narrows the field to two paths the worker can actually reach — then Explain joins courses.
      </div>
    </div>
  );
};

/** V2.2 leave-with-the-board / STAR artefact — not the problem screen. */
const StarBoardMock: React.FC<{ frame: number; length: number }> = ({
  frame,
  length,
}) => {
  const peach = colors.accent;
  const navy = colors.navy;
  const cream = colors.bg;
  const ink = colors.textDark;
  const mute = colors.textMuted;

  const headerIn = interpolate(frame, [0, 10], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const adviserIn = interpolate(frame, [6, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const boardIn = interpolate(frame, [14, 28], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const starProg = interpolate(frame, [22, Math.min(length - 8, 58)], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.22, 1, 0.36, 1),
  });
  const qIn = interpolate(frame, [36, 50], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const star = [
    { k: "S", pct: "10%", text: "Night shift, one site, stock was the job." },
    { k: "T", pct: "10%", text: "Keep lines moving without a written WMS story." },
    {
      k: "A",
      pct: "50%",
      text: "Ran counts on ~2,400 lines in SAP — their words, confirmed.",
    },
    {
      k: "R",
      pct: "30%",
      text: "Can stand over number, system, date. No invented certs.",
    },
  ];

  return (
    <div
      style={{
        padding: "22px 26px 24px",
        background: cream,
        minHeight: 520,
        color: ink,
        fontFamily: fontSans,
      }}
    >
      <div
        style={{
          opacity: headerIn,
          transform: `translateY(${(1 - headerIn) * 10}px)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 14,
        }}
      >
        <div
          style={{
            fontSize: 12,
            fontWeight: 800,
            letterSpacing: "0.08em",
            color: peach,
          }}
        >
          04 / STATION · LEAVE WITH THE BOARD
        </div>
        <div
          style={{
            fontSize: 12,
            fontWeight: 700,
            color: "#fff",
            background: navy,
            borderRadius: 999,
            padding: "5px 12px",
          }}
        >
          BOARD · STAR
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.05fr 0.95fr",
          gap: 14,
          marginBottom: 14,
          opacity: adviserIn,
          transform: `translateY(${(1 - adviserIn) * 14}px)`,
        }}
      >
        <div
          style={{
            background: "#fff",
            borderRadius: 14,
            padding: "14px 16px",
            border: "1px solid rgba(11,31,51,0.08)",
            boxShadow: "0 10px 28px rgba(11,31,51,0.06)",
          }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: "0.07em",
              color: mute,
              marginBottom: 6,
            }}
          >
            ONE STEP THIS WEEK
          </div>
          <div style={{ fontSize: 18, fontWeight: 700, lineHeight: 1.3 }}>
            Book the Skillnet WMS intro for Thursday
          </div>
        </div>
        <div
          style={{
            background: navy,
            borderRadius: 14,
            padding: "14px 16px",
            color: "#F8FAFC",
            boxShadow: "0 12px 32px rgba(11,31,51,0.28)",
          }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: "0.07em",
              color: peach,
              marginBottom: 6,
            }}
          >
            ADVISER PAGE · THEY KEEP
          </div>
          <div style={{ fontSize: 16, fontWeight: 600, lineHeight: 1.35 }}>
            Confirmed evidence · chosen route · plan · what is still open
          </div>
        </div>
      </div>

      <div
        style={{
          opacity: boardIn,
          transform: `translateY(${(1 - boardIn) * 18}px) scale(${0.97 + boardIn * 0.03})`,
          background: "#fff",
          borderRadius: 16,
          padding: "16px 18px 18px",
          border: `2px solid ${navy}`,
          boxShadow: "0 18px 44px rgba(11,31,51,0.12)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 8,
          }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: "0.07em",
              color: mute,
            }}
          >
            CHEAT-BOARD · CONFIRMED CLAIMS ONLY
          </div>
          <div
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: mute,
              border: "1px dashed rgba(91,101,117,0.45)",
              borderRadius: 999,
              padding: "4px 10px",
            }}
          >
            proposed never looks like fact
          </div>
        </div>
        <div
          style={{
            fontSize: 26,
            fontWeight: 400,
            letterSpacing: "-0.02em",
            marginBottom: 12,
            color: ink,
            fontFamily: fontSerif,
          }}
        >
          Interview board · inventory / stock controller
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 8,
            marginBottom: 14,
          }}
        >
          {["Phone screen", "First interview", "Panel", "Recruiter", "Hiring manager"].map(
            (label, i) => {
              const on = i === 0 || i === 3;
              return (
                <div
                  key={label}
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    borderRadius: 999,
                    padding: "6px 12px",
                    background: on ? peach : colors.bgSoft,
                    color: on ? "#fff" : mute,
                  }}
                >
                  {label}
                </div>
              );
            },
          )}
        </div>

        <div
          style={{
            fontSize: 12,
            fontWeight: 800,
            letterSpacing: "0.06em",
            color: peach,
            marginBottom: 10,
          }}
        >
          STAR STORY · ACTION IS THE LONG PART
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 10,
            marginBottom: 14,
          }}
        >
          {star.map((s, i) => {
            const local = interpolate(starProg, [i * 0.18, i * 0.18 + 0.28], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            });
            return (
              <div
                key={s.k}
                style={{
                  opacity: local,
                  transform: `translateY(${(1 - local) * 12}px)`,
                  background: cream,
                  borderRadius: 12,
                  padding: "12px 14px",
                  borderLeft: `4px solid ${i === 2 ? peach : navy}`,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: 8,
                    marginBottom: 4,
                  }}
                >
                  <span
                    style={{
                      fontSize: 16,
                      fontWeight: 800,
                      color: i === 2 ? peach : navy,
                    }}
                  >
                    {s.k}
                  </span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: mute }}>
                    {s.pct}
                  </span>
                </div>
                <div style={{ fontSize: 14, lineHeight: 1.35, color: ink }}>{s.text}</div>
              </div>
            );
          })}
        </div>

        <div
          style={{
            opacity: qIn,
            transform: `translateY(${(1 - qIn) * 10}px)`,
            background: navy,
            borderRadius: 12,
            padding: "14px 16px",
            color: "#F8FAFC",
          }}
        >
          <div
            style={{
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: "0.07em",
              color: peach,
              marginBottom: 6,
            }}
          >
            PREDICTED QUESTIONS · THIS ROOM ONLY
          </div>
          <div style={{ fontSize: 17, fontWeight: 600, lineHeight: 1.35 }}>
            Walk me through how you knew a count was off.
          </div>
          <div style={{ fontSize: 13, color: "rgba(248,250,252,0.65)", marginTop: 6 }}>
            Hook: stock claim (confirmed) · phone screen stays short
          </div>
        </div>
      </div>
    </div>
  );
};

const RecordingPanel: React.FC<{ src: string; still?: string }> = ({
  src,
  still,
}) => {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: 656,
        background: colors.bg,
        overflow: "hidden",
      }}
    >
      {still && (
        <Img
          src={staticFile(still)}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "top center",
            opacity: 0.35,
          }}
        />
      )}
      <Video
        src={staticFile(src)}
        muted
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "top center",
        }}
      />
    </div>
  );
};

/**
 * Must be mounted inside a <Sequence> so useCurrentFrame is local (0…length)
 * and @remotion/media Video plays from the start of the cutaway.
 */
export const AiVignetteV2: React.FC<{
  kind: VignetteKind;
  length: number;
}> = ({ kind, length }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 8, length - 8, length], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const scale = interpolate(frame, [0, 10], [0.96, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const recording = RECORDING_FILES[kind];
  const still = STILL_FILES[kind];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.vignetteScrim,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        opacity,
        fontFamily: fontSans,
      }}
    >
      <BrowserChrome title={TITLES[kind]} scale={scale} flush={Boolean(recording)}>
        {recording ? (
          <RecordingPanel src={recording} still={still} />
        ) : (
          <>
            {kind === "parse-cv" && <ParseCvMock frame={frame} length={length} />}
            {kind === "write-questions" && (
              <WriteQuestionsMock frame={frame} length={length} />
            )}
            {kind === "fold-answers" && (
              <FoldAnswersMock frame={frame} length={length} />
            )}
            {kind === "pick-2-routes" && (
              <Pick2RoutesMock frame={frame} length={length} />
            )}
            {kind === "star-board" && (
              <StarBoardMock frame={frame} length={length} />
            )}
          </>
        )}
      </BrowserChrome>
    </AbsoluteFill>
  );
};
