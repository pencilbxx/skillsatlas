import React from "react";
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { colors, RADIUS } from "../theme";
import { fontSans, fontSerif } from "../fonts";

export const OpenTransition: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const fadeOut = interpolate(
    frame,
    [durationInFrames - 18, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  // Soft Ken Burns on primary career-change figure
  const kenScale = interpolate(frame, [0, durationInFrames], [1.04, 1.12], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const kenY = interpolate(frame, [0, durationInFrames], [8, -6], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const titleOpacity = interpolate(frame, [0.28 * fps, 0.7 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const titleY = interpolate(frame, [0.28 * fps, 0.7 * fps], [22, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const subOpacity = interpolate(frame, [0.5 * fps, 0.95 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Secondary pencil-team flourish near the end of the open
  const secondaryIn = interpolate(
    frame,
    [durationInFrames - 42, durationInFrames - 28],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const primaryOut = interpolate(
    frame,
    [durationInFrames - 40, durationInFrames - 26],
    [1, 0.35],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );

  const chips = [
    { label: "Code", bg: colors.codeFill, fg: colors.code, dot: colors.code },
    { label: "AI", bg: colors.chipObsBg, fg: colors.chipObsFg, dot: colors.teal },
    {
      label: "Human",
      bg: colors.chipHumanBg,
      fg: colors.chipHumanFg,
      dot: colors.human,
    },
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.bg,
        fontFamily: fontSans,
        opacity: Math.min(fadeIn, fadeOut),
      }}
    >
      {/* soft coral + teal wash */}
      <div
        style={{
          position: "absolute",
          width: 720,
          height: 720,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(237,106,74,0.16) 0%, transparent 68%)",
          left: "28%",
          top: "32%",
          transform: "translate(-50%, -50%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 560,
          height: 560,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(30,93,94,0.12) 0%, transparent 70%)",
          right: "8%",
          bottom: "6%",
        }}
      />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 28,
        }}
      >
        <div
          style={{
            position: "relative",
            width: 520,
            height: 420,
            borderRadius: RADIUS + 6,
            overflow: "hidden",
            background: colors.card,
            border: `1px solid ${colors.border}`,
            boxShadow: "0 24px 64px rgba(16,43,63,0.12)",
          }}
        >
          <Img
            src={staticFile("brand/intro-career-change.png")}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "contain",
              objectPosition: "center",
              opacity: primaryOut,
              transform: `scale(${kenScale}) translateY(${kenY}px)`,
            }}
          />
          <Img
            src={staticFile("brand/intro-pencil-team.png")}
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "contain",
              objectPosition: "center 55%",
              opacity: secondaryIn,
              transform: `scale(${1.02 + secondaryIn * 0.04})`,
            }}
          />
        </div>

        <div style={{ textAlign: "center" }}>
          <div
            style={{
              color: colors.accent,
              fontSize: 14,
              fontWeight: 800,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              opacity: titleOpacity,
              marginBottom: 8,
              fontFamily: fontSans,
            }}
          >
            Production path
          </div>
          <div
            style={{
              color: colors.navy,
              fontSize: 72,
              fontWeight: 400,
              letterSpacing: "-0.02em",
              opacity: titleOpacity,
              transform: `translateY(${titleY}px)`,
              fontFamily: fontSerif,
            }}
          >
            Skills<span style={{ color: colors.accent, fontStyle: "italic" }}>Atlas</span>
          </div>
          <div
            style={{
              marginTop: 12,
              color: colors.textMuted,
              fontSize: 24,
              fontWeight: 500,
              opacity: subOpacity,
            }}
          >
            Evidence → two routes → a board they hold
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 12,
            opacity: subOpacity,
            marginTop: 4,
          }}
        >
          {chips.map((chip) => (
            <div
              key={chip.label}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: chip.bg,
                color: chip.fg,
                borderRadius: 999,
                padding: "8px 16px",
                fontSize: 14,
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              <span
                style={{
                  width: 9,
                  height: 9,
                  borderRadius: 999,
                  background: chip.dot,
                }}
              />
              {chip.label}
            </div>
          ))}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
