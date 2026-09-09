import React from "react";
import {
  AbsoluteFill,
  Easing,
  Img,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Inter";
import { colors } from "../theme";
import { AiVignette, VignetteKind } from "./AiVignette";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

/**
 * Approximate hotspot positions on the BPMN image (percent of diagram).
 * Token travels CAPTURE → QUESTIONING → TWO ROUTES → LEAVE WITH THE BOARD.
 * Final Leave hotspot kept slightly above the card edge so it can fade cleanly.
 */
const PHASES = [
  { label: "CAPTURE", x: 18, y: 18, color: colors.codeLight },
  { label: "Parse CV", x: 32, y: 18, color: colors.ai, ai: "parse-cv" as VignetteKind },
  { label: "Confirm", x: 55, y: 18, color: colors.humanSoft },
  { label: "QUESTIONING", x: 22, y: 42, color: colors.ai, ai: "write-questions" as VignetteKind },
  { label: "Answers", x: 55, y: 42, color: colors.humanSoft },
  { label: "TWO ROUTES", x: 28, y: 66, color: colors.ai, ai: "explain-routes" as VignetteKind },
  { label: "Choose", x: 58, y: 66, color: colors.humanSoft },
  { label: "BOARD", x: 40, y: 84, color: colors.ai, ai: "star-board" as VignetteKind },
  { label: "Leave", x: 72, y: 84, color: colors.human },
];

const VIGNETTE_BEATS: Array<{
  kind: VignetteKind;
  from: number;
  duration: number;
}> = [
  { kind: "parse-cv", from: 70, duration: 55 },
  { kind: "write-questions", from: 160, duration: 55 },
  { kind: "explain-routes", from: 250, duration: 55 },
  { kind: "star-board", from: 340, duration: 55 },
];

export const DiagramFlow: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Soft Ken Burns — keep main nodes + baked-in annotations readable
  const phaseIndex = Math.min(
    PHASES.length - 1,
    Math.floor(
      interpolate(frame, [20, durationInFrames - 40], [0, PHASES.length - 0.01], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      }),
    ),
  );

  const phaseT = interpolate(
    frame,
    [20, durationInFrames - 40],
    [0, PHASES.length - 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const i0 = Math.floor(phaseT);
  const i1 = Math.min(PHASES.length - 1, i0 + 1);
  const frac = phaseT - i0;
  const focusX = interpolate(frac, [0, 1], [PHASES[i0].x, PHASES[i1].x]);
  const focusY = interpolate(frac, [0, 1], [PHASES[i0].y, PHASES[i1].y]);

  const zoom = interpolate(
    frame,
    [0, 40, durationInFrames - 60, durationInFrames - 20],
    [1.05, 1.28, 1.38, 1.18],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.22, 1, 0.36, 1),
    },
  );

  // Map focus percent → translate so focal point drifts toward center
  const tx = interpolate(focusX, [0, 100], [10, -10]);
  const ty = interpolate(focusY, [0, 100], [6, -10]);

  const fadeIn = interpolate(frame, [0, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const fadeOut = interpolate(
    frame,
    [durationInFrames - 18, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const labelOpacity = interpolate(frame, [8, 28], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Fade token out before it can clip off the bottom of the card
  const tokenOpacity = interpolate(
    frame,
    [20, 40, durationInFrames - 55, durationInFrames - 28],
    [0, 1, 1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.4, 0, 0.2, 1),
    },
  );

  const active = PHASES[phaseIndex];
  const vignetteActive = VIGNETTE_BEATS.some(
    (v) => frame >= v.from && frame < v.from + v.duration,
  );

  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg, fontFamily, opacity: Math.min(fadeIn, fadeOut) }}>
      {/* Phase label */}
      <div
        style={{
          position: "absolute",
          top: 36,
          left: 48,
          zIndex: 5,
          opacity: labelOpacity * (vignetteActive ? 0.35 : 1),
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <div
          style={{
            width: 12,
            height: 12,
            borderRadius: 99,
            background: active.color,
            boxShadow: `0 0 16px ${active.color}`,
          }}
        />
        <div style={{ color: colors.text, fontSize: 28, fontWeight: 600 }}>
          {active.label}
        </div>
        <div style={{ color: colors.textMuted, fontSize: 18, marginLeft: 8 }}>
          SkillsAtlas — production path
        </div>
      </div>

      {/* Diagram card */}
      <div
        style={{
          position: "absolute",
          inset: 80,
          borderRadius: 20,
          overflow: "hidden",
          background: colors.card,
          boxShadow: "0 30px 80px rgba(0,0,0,0.45)",
          opacity: vignetteActive ? 0.25 : 1,
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: `scale(${zoom}) translate(${tx}%, ${ty}%)`,
            transformOrigin: "center center",
          }}
        >
          <Img
            src={staticFile("bpmn-process.png")}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        </div>

        {/* Token highlight — fades out cleanly near Leave */}
        {!vignetteActive && (
          <div
            style={{
              position: "absolute",
              left: `${focusX}%`,
              top: `${focusY}%`,
              width: 56,
              height: 56,
              marginLeft: -28,
              marginTop: -28,
              borderRadius: 99,
              border: `3px solid ${active.color}`,
              background: `${active.color}33`,
              boxShadow: `0 0 30px ${active.color}`,
              opacity: tokenOpacity,
            }}
          />
        )}

        {/* Row glow bands */}
        {[18, 42, 66, 84].map((y, idx) => {
          const lit = Math.abs(focusY - y) < 14;
          return (
            <div
              key={y}
              style={{
                position: "absolute",
                left: "4%",
                right: "4%",
                top: `${y - 8}%`,
                height: "16%",
                borderRadius: 12,
                background: lit
                  ? idx === 0
                    ? "rgba(156,163,175,0.12)"
                    : idx === 1
                      ? "rgba(59,130,246,0.12)"
                      : idx === 2
                        ? "rgba(59,130,246,0.10)"
                        : "rgba(34,197,94,0.12)"
                  : "transparent",
                pointerEvents: "none",
              }}
            />
          );
        })}
      </div>

      {/* AI vignette cutaways */}
      {VIGNETTE_BEATS.map((beat) => (
        <Sequence
          key={beat.kind}
          from={beat.from}
          durationInFrames={beat.duration}
          layout="absolute-fill"
        >
          <AiVignette kind={beat.kind} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
