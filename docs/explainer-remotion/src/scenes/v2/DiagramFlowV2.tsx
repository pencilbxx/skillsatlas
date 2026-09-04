import React from "react";
import {
  AbsoluteFill,
  Easing,
  Sequence,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { colors, RADIUS_LG } from "../../theme";
import { fontSans, fontSerif } from "../../fonts";
import { BpmnDiagram } from "./BpmnDiagram";
import { AiVignetteV2 } from "./AiVignetteV2";
import { EvidenceBoard } from "./EvidenceBoard";
import {
  DIAGRAM_DURATION,
  PHASES,
  VIGNETTE_SEQUENCES,
  resolveTimeline,
  VB,
} from "./processData";

export { DIAGRAM_DURATION };

export const DiagramFlowV2: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const state = resolveTimeline(frame);

  const fadeIn = interpolate(frame, [0, 16], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(
    frame,
    [durationInFrames - 16, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const focusY = interpolate(
    state.pathProgress,
    [0, 0.22, 0.45, 0.68, 1],
    [
      PHASES[0].focusY,
      PHASES[0].focusY,
      PHASES[1].focusY,
      PHASES[2].focusY,
      PHASES[3].focusY,
    ],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const vignetteDim = Boolean(state.vignette);
  const zoomBase = 1.0;
  const zoom = interpolate(
    frame,
    [0, 24, durationInFrames - 40, durationInFrames - 10],
    [1.0, zoomBase, zoomBase, 1.0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.22, 1, 0.36, 1),
    },
  );

  const ty = ((VB.h / 2 - focusY) / VB.h) * 100 * 0.18;
  const tx = 0;

  const legendOpacity = interpolate(frame, [10, 28], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const showBoard =
    state.phase === "CAPTURE" || state.phase === "QUESTIONING";

  const chips = [
    { label: "CODE", bg: colors.codeFill, fg: colors.code, dot: colors.code },
    { label: "AI", bg: colors.chipObsBg, fg: colors.chipObsFg, dot: colors.teal },
    {
      label: "HUMAN",
      bg: colors.chipHumanBg,
      fg: colors.chipHumanFg,
      dot: colors.human,
    },
  ];

  const phaseDot =
    state.phase === "BOARD"
      ? colors.human
      : state.phase === "CAPTURE"
        ? colors.code
        : colors.teal;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.bg,
        fontFamily: fontSans,
        opacity: Math.min(fadeIn, fadeOut),
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 28,
          left: 40,
          right: 40,
          zIndex: 6,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          opacity: legendOpacity * (vignetteDim ? 0.35 : 1),
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 99,
              background: phaseDot,
              boxShadow: `0 0 14px ${colors.tokenGlow}`,
            }}
          />
          <div
            style={{
              color: colors.navy,
              fontSize: 28,
              fontWeight: 400,
              fontFamily: fontSerif,
            }}
          >
            {state.phase}
          </div>
          <div
            style={{
              color: colors.textMuted,
              fontSize: 16,
              fontWeight: 600,
              letterSpacing: "0.04em",
            }}
          >
            SkillsAtlas · production path
          </div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          {chips.map((c) => (
            <div
              key={c.label}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: c.bg,
                color: c.fg,
                borderRadius: 999,
                padding: "8px 14px",
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: "0.08em",
              }}
            >
              <span
                style={{
                  width: 9,
                  height: 9,
                  borderRadius: 99,
                  background: c.dot,
                }}
              />
              {c.label}
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          inset: "78px 20px 28px 36px",
          display: "flex",
          gap: 22,
          alignItems: "stretch",
        }}
      >
        <div
          style={{
            flex: 1,
            minWidth: 0,
            borderRadius: RADIUS_LG,
            overflow: "hidden",
            background: colors.card,
            border: `1px solid ${colors.border}`,
            boxShadow: "0 24px 64px rgba(16,43,63,0.1)",
            padding: "12px 20px 12px 36px",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              transform: `scale(${zoom}) translate(${tx}%, ${ty}%)`,
              transformOrigin: "center center",
            }}
          >
            <BpmnDiagram
              activeNodeId={state.activeNodeId}
              completedIds={state.completedIds}
              pathProgress={state.pathProgress}
              phase={state.phase}
              dimmed={vignetteDim}
            />
          </div>
        </div>

        {showBoard && (
          <EvidenceBoard
            completedIds={state.completedIds}
            activeNodeId={state.activeNodeId}
            phase={state.phase}
            dimmed={vignetteDim}
          />
        )}
      </div>

      {VIGNETTE_SEQUENCES.map((v) => (
        <Sequence
          key={`${v.kind}-${v.from}`}
          from={v.from}
          durationInFrames={v.frames}
          layout="absolute-fill"
          name={`AI-${v.kind}`}
        >
          <AiVignetteV2 kind={v.kind} length={v.frames} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
