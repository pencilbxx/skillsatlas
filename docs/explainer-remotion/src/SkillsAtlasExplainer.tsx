import React from "react";
import { AbsoluteFill } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { OpenTransition } from "./scenes/OpenTransition";
import { DiagramFlow } from "./scenes/DiagramFlow";
import { EmailOutro, EndCard } from "./scenes/EmailOutro";
import { colors } from "./theme";

/**
 * Timeline (approx, after transition overlaps):
 * Open 100 + Diagram 470 + Email 140 + End 90 - 2*20 = 760
 *
 * No TransitionSeries fade between EmailOutro and EndCard — EmailOutro
 * fully fades out, then EndCard fades in (avoids text-on-email overlap).
 */
export const SkillsAtlasExplainer: React.FC = () => {
  const t = 20;

  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg }}>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={100} name="Open">
          <OpenTransition />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: t })}
        />
        <TransitionSeries.Sequence durationInFrames={470} name="DiagramFlow">
          <DiagramFlow />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: t })}
        />
        <TransitionSeries.Sequence durationInFrames={140} name="EmailOutro">
          <EmailOutro />
        </TransitionSeries.Sequence>
        {/* Hard cut: EmailOutro fades to black internally; EndCard fades in */}
        <TransitionSeries.Sequence durationInFrames={90} name="EndCard">
          <EndCard />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};

// 100+470+140+90 - 20*2 = 800 - 40 = 760 ✓
