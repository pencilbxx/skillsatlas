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
import { colors, RADIUS, RADIUS_LG } from "../theme";
import { fontSans, fontSerif } from "../fonts";

export const EmailOutro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 14], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const fadeOut = interpolate(
    frame,
    [durationInFrames - 28, durationInFrames - 6],
    [1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.4, 0, 0.2, 1),
    },
  );

  const slideY = interpolate(frame, [0, 22], [80, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const cardScale = interpolate(frame, [0, 22], [0.94, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const previewOpacity = interpolate(frame, [18, 36], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const endBadge = interpolate(frame, [0.2 * fps, 0.7 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: colors.bg,
        fontFamily: fontSans,
        opacity: Math.min(fadeIn, fadeOut),
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 48,
          opacity: endBadge,
          color: colors.accent,
          fontSize: 14,
          fontWeight: 800,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
        }}
      >
        They leave with the board
      </div>

      <div
        style={{
          width: 920,
          background: colors.card,
          borderRadius: RADIUS_LG,
          overflow: "hidden",
          border: `1px solid ${colors.border}`,
          boxShadow: "0 32px 80px rgba(16,43,63,0.14)",
          transform: `translateY(${slideY}px) scale(${cardScale})`,
        }}
      >
        <div
          style={{
            background: colors.navy,
            color: colors.textOnDark,
            padding: "18px 24px",
            display: "flex",
            alignItems: "center",
            gap: 14,
          }}
        >
          <div
            style={{
              width: 42,
              height: 42,
              borderRadius: RADIUS,
              background: colors.accent,
              color: colors.accentInk,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 800,
              fontSize: 16,
              fontFamily: fontSerif,
            }}
          >
            SA
          </div>
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: 13,
                color: colors.textOnDarkMuted,
                fontWeight: 500,
              }}
            >
              Inbox · just now
            </div>
            <div
              style={{
                fontSize: 22,
                fontWeight: 400,
                fontFamily: fontSerif,
              }}
            >
              Your SkillsAtlas board
            </div>
          </div>
          <div
            style={{
              background: colors.chipHumanBg,
              color: colors.chipHumanFg,
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              padding: "6px 12px",
              borderRadius: 999,
            }}
          >
            Arrived
          </div>
        </div>

        <div style={{ padding: 28, opacity: previewOpacity }}>
          <div
            style={{
              color: colors.textMuted,
              fontSize: 15,
              marginBottom: 18,
            }}
          >
            From: board@skillsatlas.app · To: jordan@example.com
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.2fr 1fr",
              gap: 18,
            }}
          >
            <div
              style={{
                background: colors.bgSoft,
                borderRadius: RADIUS,
                padding: 18,
                border: `1px solid ${colors.border}`,
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 800,
                  color: colors.accent,
                  letterSpacing: "0.14em",
                  marginBottom: 10,
                  textTransform: "uppercase",
                }}
              >
                STAR stories
              </div>
              {[
                "Trained 4 juniors on CNC setup",
                "Stabilized night-shift handovers",
              ].map((s) => (
                <div
                  key={s}
                  style={{
                    background: colors.card,
                    borderRadius: RADIUS,
                    padding: "12px 14px",
                    marginBottom: 8,
                    color: colors.textDark,
                    fontSize: 16,
                    border: `1px solid ${colors.border}`,
                    borderLeft: `3px solid ${colors.human}`,
                  }}
                >
                  {s}
                </div>
              ))}
            </div>

            <div
              style={{
                background: colors.navy,
                borderRadius: RADIUS,
                padding: 18,
                color: colors.textOnDark,
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 800,
                  color: colors.accent,
                  letterSpacing: "0.14em",
                  marginBottom: 10,
                  textTransform: "uppercase",
                }}
              >
                One committed step
              </div>
              <div
                style={{
                  fontSize: 20,
                  fontWeight: 600,
                  lineHeight: 1.35,
                }}
              >
                Enroll in SOLAS Team Lead micro-credential (evenings).
              </div>
              <div
                style={{
                  marginTop: 18,
                  display: "inline-block",
                  background: colors.accent,
                  color: colors.accentInk,
                  borderRadius: RADIUS,
                  padding: "10px 16px",
                  fontWeight: 700,
                  fontSize: 15,
                }}
              >
                Open board
              </div>
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const EndCard: React.FC = () => {
  const frame = useCurrentFrame();

  const contentOpacity = interpolate(frame, [8, 24], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const y = interpolate(frame, [8, 28], [18, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const flourishIn = interpolate(frame, [16, 34], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const flourishScale = interpolate(frame, [16, 50], [1.06, 1.0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

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
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 22,
      }}
    >
      <div
        style={{
          opacity: flourishIn,
          width: 360,
          height: 220,
          borderRadius: RADIUS_LG,
          overflow: "hidden",
          border: `1px solid ${colors.border}`,
          background: colors.card,
          boxShadow: "0 18px 48px rgba(16,43,63,0.1)",
          marginBottom: 4,
        }}
      >
        <Img
          src={staticFile("brand/intro-pencil-team.png")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            transform: `scale(${flourishScale})`,
          }}
        />
      </div>

      <div
        style={{
          opacity: contentOpacity,
          transform: `translateY(${y}px)`,
          textAlign: "center",
        }}
      >
        <div
          style={{
            color: colors.navy,
            fontSize: 64,
            fontWeight: 400,
            letterSpacing: "-0.02em",
            fontFamily: fontSerif,
          }}
        >
          Skills<span style={{ color: colors.accent, fontStyle: "italic" }}>Atlas</span>
        </div>
        <div
          style={{
            marginTop: 14,
            color: colors.textMuted,
            fontSize: 24,
            fontWeight: 500,
          }}
        >
          TechIreland National AI Challenge 2026
        </div>
      </div>

      <div style={{ display: "flex", gap: 14, marginTop: 8 }}>
        {chips.map((item, i) => {
          const o = interpolate(frame, [20 + i * 6, 34 + i * 6], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          });
          return (
            <div
              key={item.label}
              style={{
                opacity: o,
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                background: item.bg,
                color: item.fg,
                borderRadius: 999,
                padding: "12px 22px",
                fontSize: 16,
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              <span
                style={{
                  width: 11,
                  height: 11,
                  borderRadius: 99,
                  background: item.dot,
                }}
              />
              {item.label}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
