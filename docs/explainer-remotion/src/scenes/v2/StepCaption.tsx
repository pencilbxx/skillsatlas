import React from "react";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { colors } from "../../theme";
import { fontSans } from "../../fonts";

/** Slow enough that a new line does not flash. */
export const CAPTION_CROSSFADE = 20;

/** Large bottom caption — readable from the back of a Hub room. */
export const StepCaption: React.FC<{
  text: string;
  prevText?: string;
  sinceChange?: number;
  localFrame?: number;
  dimmed?: boolean;
}> = ({ text, prevText, sinceChange, localFrame, dimmed }) => {
  const frame = useCurrentFrame();
  const t = localFrame ?? frame;

  const barIn = interpolate(t, [0, 16], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const crossing =
    Boolean(prevText) &&
    prevText !== text &&
    sinceChange != null &&
    sinceChange < CAPTION_CROSSFADE;

  const incoming = crossing
    ? interpolate(sinceChange ?? 0, [0, CAPTION_CROSSFADE], [0, 1], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.inOut(Easing.quad),
      })
    : 1;

  const fadingOut = !text && Boolean(prevText);
  const out = fadingOut
    ? interpolate(sinceChange ?? 0, [0, CAPTION_CROSSFADE], [1, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
        easing: Easing.inOut(Easing.quad),
      })
    : 1;

  if (!text && !prevText) return null;
  if (fadingOut && out <= 0.02) return null;

  return (
    <div
      style={{
        position: "absolute",
        left: 48,
        right: 48,
        bottom: 22,
        zIndex: 30,
        display: "flex",
        justifyContent: "center",
        pointerEvents: "none",
        opacity: barIn * out * (dimmed ? 0.96 : 1),
      }}
    >
      <div
        style={{
          maxWidth: 1680,
          width: "100%",
          background: colors.navy,
          color: colors.textOnDark,
          borderRadius: 14,
          padding: "16px 32px",
          boxShadow: "0 16px 40px rgba(16,43,63,0.28)",
          fontFamily: fontSans,
          fontSize: 40,
          fontWeight: 700,
          lineHeight: 1.3,
          letterSpacing: "0.01em",
          textAlign: "center",
        }}
      >
        <div style={{ position: "relative", minHeight: 52 }}>
          <div style={{ opacity: fadingOut ? 1 : incoming }}>
            {text || prevText}
          </div>
        </div>
      </div>
    </div>
  );
};
