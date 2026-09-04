import React from "react";
import { AbsoluteFill } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { OpenTransition } from "./scenes/OpenTransition";
import { DiagramFlowV2, DIAGRAM_DURATION } from "./scenes/v2/DiagramFlowV2";
import { EmailOutro, EndCard } from "./scenes/EmailOutro";
import { colors } from "./theme";

/**
 * V2.4 brand-unified timeline (~52s @ 30fps):
 * Open 75 + Diagram DIAGRAM_DURATION + Email 120 + End 75 − 2×15 fades
 * Cutaways: Pick-2 route cards; FETCH hold-then-scroll (explain-routes); STAR board.
 */
export const OPEN_FRAMES = 75;
export const EMAIL_FRAMES = 120;
export const END_FRAMES = 75;
export const FADE_FRAMES = 15;

export const V2_DURATION =
  OPEN_FRAMES + DIAGRAM_DURATION + EMAIL_FRAMES + END_FRAMES - FADE_FRAMES * 2;

export const SkillsAtlasExplainerV2: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: colors.bg }}>
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={OPEN_FRAMES} name="Open">
          <OpenTransition />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: FADE_FRAMES })}
        />
        <TransitionSeries.Sequence
          durationInFrames={DIAGRAM_DURATION}
          name="DiagramFlowV2"
        >
          <DiagramFlowV2 />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: FADE_FRAMES })}
        />
        <TransitionSeries.Sequence durationInFrames={EMAIL_FRAMES} name="EmailOutro">
          <EmailOutro />
        </TransitionSeries.Sequence>
        <TransitionSeries.Sequence durationInFrames={END_FRAMES} name="EndCard">
          <EndCard />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
