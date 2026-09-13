import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { colors, RADIUS } from "../../theme";
import { fontSans } from "../../fonts";
import type { PhaseId } from "./processData";

export type EvidenceItem = {
  id: string;
  weak: string;
  strong?: string;
  tag: string;
  /** Node id at/after which weak chip appears */
  revealAt: string;
  /** Node id at/after which claim upgrades to CONFIRMED */
  confirmAt?: string;
};

export const EVIDENCE_ITEMS: EvidenceItem[] = [
  {
    id: "role",
    weak: "Production Technician",
    strong: "Production Technician · 6 yrs",
    tag: "role",
    revealAt: "parse",
    confirmAt: "confirm",
  },
  {
    id: "stock",
    weak: "managed stock",
    strong: "2,400 SKUs in SAP EWM, 2024",
    tag: "claim",
    revealAt: "parse",
    confirmAt: "fold",
  },
  {
    id: "cnc",
    weak: "CNC setup",
    strong: "CNC setup · Safety lead",
    tag: "tool",
    revealAt: "parse",
    confirmAt: "confirm",
  },
  {
    id: "mentor",
    weak: "trained juniors",
    strong: "Trained 4 juniors on CNC",
    tag: "number",
    revealAt: "score",
    confirmAt: "fold",
  },
];

const NODE_ORDER = [
  "cv-in",
  "parse",
  "guard1",
  "confirm",
  "score",
  "write-q",
  "guard2",
  "answer",
  "fold",
  "esco",
  "pick2",
  "explain",
  "choose",
  "join",
  "commit",
  "adviser",
  "practice",
  "end",
];

function progressIndex(completedIds: Set<string>, activeNodeId: string): number {
  let max = NODE_ORDER.indexOf(activeNodeId);
  for (const id of completedIds) {
    max = Math.max(max, NODE_ORDER.indexOf(id));
  }
  return max;
}

function atOrPast(
  completedIds: Set<string>,
  activeNodeId: string,
  target: string,
): boolean {
  const ti = NODE_ORDER.indexOf(target);
  if (ti < 0) return false;
  return progressIndex(completedIds, activeNodeId) >= ti;
}

export const EvidenceBoard: React.FC<{
  completedIds: Set<string>;
  activeNodeId: string;
  phase: PhaseId;
  dimmed?: boolean;
  /** 0–1: something just landed in this column. */
  attention?: number;
}> = ({ completedIds, activeNodeId, phase, dimmed, attention = 0 }) => {
  const frame = useCurrentFrame();
  const glow = Math.max(0, Math.min(1, attention));

  const enter = interpolate(frame, [18, 38], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const phaseOpacity =
    phase === "CAPTURE" || phase === "QUESTIONING"
      ? 1
      : phase === "TWO ROUTES"
        ? 0.45
        : 0.12;

  const opacity = enter * phaseOpacity * (dimmed ? 0.5 : 1);

  return (
    <div
      style={{
        width: 248,
        flexShrink: 0,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 8,
        padding: "12px 10px",
        background:
          glow > 0.02
            ? `linear-gradient(180deg, ${colors.tealBg} 0%, ${colors.card} 58%)`
            : colors.card,
        borderRadius: RADIUS + 4,
        border: `${glow > 0.08 ? 2 : 1}px solid ${
          glow > 0.08 ? colors.teal : colors.border
        }`,
        boxShadow:
          glow > 0.02
            ? `inset 3px 0 0 ${colors.teal}, 0 0 0 ${3 + glow * 3}px rgba(30,93,94,${0.14 + glow * 0.18}), 0 16px 40px rgba(16,43,63,0.08)`
            : "0 16px 40px rgba(16,43,63,0.08)",
        transform: `scale(${1 + glow * 0.01})`,
        transformOrigin: "center top",
        opacity: Math.max(0, Math.min(1, opacity)),
        fontFamily: fontSans,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 4,
        }}
      >
        <div
          style={{
            color: colors.accent,
            fontSize: 12,
            fontWeight: 800,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
          }}
        >
          Evidence
        </div>
        <div
          style={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: colors.chipObsFg,
            background: colors.chipObsBg,
            borderRadius: 999,
            padding: "4px 10px",
          }}
        >
          agent trail
        </div>
      </div>
      <div
        style={{
          color: colors.textMuted,
          fontSize: 12,
          lineHeight: 1.4,
          marginBottom: 6,
        }}
      >
        Collect & confirm — weak keywords become checkable claims
      </div>

      {EVIDENCE_ITEMS.map((item, i) => {
        const revealed = atOrPast(completedIds, activeNodeId, item.revealAt);
        const confirmed =
          item.confirmAt != null &&
          atOrPast(completedIds, activeNodeId, item.confirmAt);

        const delay = i * 4;
        const pop = revealed
          ? interpolate(frame, [28 + delay, 46 + delay], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            })
          : 0;

        if (!revealed) {
          return (
            <div
              key={item.id}
              style={{
                height: 52,
                borderRadius: RADIUS,
                border: `1px dashed ${colors.borderStrong}`,
                background: colors.bgSoft,
                opacity: 0.45,
              }}
            />
          );
        }

        return (
          <div
            key={item.id}
            style={{
              borderRadius: RADIUS,
              padding: "9px 10px 8px",
              background: confirmed ? colors.humanFill : "#fff",
              border: confirmed
                ? `1.5px solid ${colors.humanBorder}`
                : item.tag === "claim"
                  ? `1.5px solid ${colors.accent}`
                  : `1px solid ${colors.border}`,
              opacity: pop,
              transform: `translateY(${(1 - pop) * 14}px) scale(${0.96 + pop * 0.04})`,
              boxShadow: confirmed
                ? `0 0 16px ${colors.humanGlow}`
                : "0 4px 12px rgba(16,43,63,0.04)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 6,
              }}
            >
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 800,
                  letterSpacing: "0.06em",
                  color: confirmed ? colors.human : colors.teal,
                  textTransform: "uppercase",
                }}
              >
                {item.tag}
              </span>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 800,
                  letterSpacing: "0.04em",
                  color: confirmed ? colors.chipHumanFg : colors.amberInk,
                  background: confirmed ? colors.chipHumanBg : colors.amberBg,
                  borderRadius: 6,
                  padding: "2px 8px",
                }}
              >
                {confirmed ? "CONFIRMED" : "WEAK"}
              </span>
            </div>
            {!confirmed && (
              <div
                style={{
                  fontSize: 14,
                  color: colors.textMuted,
                  fontStyle: "italic",
                }}
              >
                “{item.weak}”
              </div>
            )}
            {confirmed && (
              <>
                <div
                  style={{
                    fontSize: 11,
                    color: colors.textMuted,
                    textDecoration: "line-through",
                    marginBottom: 4,
                  }}
                >
                  {item.weak}
                </div>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: colors.textDark,
                    lineHeight: 1.35,
                  }}
                >
                  {item.strong}
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};
