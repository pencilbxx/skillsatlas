import "./index.css";
import React from "react";
import { Composition, Folder } from "remotion";
import { SkillsAtlasExplainer } from "./SkillsAtlasExplainer";
import {
  SkillsAtlasExplainerV2,
  V2_DURATION,
  OPEN_FRAMES,
  EMAIL_FRAMES,
  END_FRAMES,
} from "./SkillsAtlasExplainerV2";
import { OpenTransition } from "./scenes/OpenTransition";
import { DiagramFlow } from "./scenes/DiagramFlow";
import { DiagramFlowV2, DIAGRAM_DURATION } from "./scenes/v2/DiagramFlowV2";
import { EmailOutro, EndCard } from "./scenes/EmailOutro";
import { AiVignette } from "./scenes/AiVignette";
import { DURATION, FPS, HEIGHT, WIDTH } from "./theme";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="SkillsAtlasExplainerV2"
        component={SkillsAtlasExplainerV2}
        durationInFrames={V2_DURATION}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Composition
        id="SkillsAtlasExplainer"
        component={SkillsAtlasExplainer}
        durationInFrames={DURATION}
        fps={FPS}
        width={WIDTH}
        height={HEIGHT}
      />
      <Folder name="Scenes-V2">
        <Composition
          id="OpenTransitionV2"
          component={OpenTransition}
          durationInFrames={OPEN_FRAMES}
          fps={FPS}
          width={WIDTH}
          height={HEIGHT}
        />
        <Composition
          id="DiagramFlowV2"
          component={DiagramFlowV2}
          durationInFrames={DIAGRAM_DURATION}
          fps={FPS}
          width={WIDTH}
          height={HEIGHT}
        />
        <Composition
          id="EmailOutroV2"
          component={EmailOutro}
          durationInFrames={EMAIL_FRAMES}
          fps={FPS}
          width={WIDTH}
          height={HEIGHT}
        />
        <Composition
          id="EndCardV2"
          component={EndCard}
          durationInFrames={END_FRAMES}
          fps={FPS}
          width={WIDTH}
          height={HEIGHT}
        />
      </Folder>
      <Folder name="Scenes-V1">
        <Composition
          id="OpenTransition"
          component={OpenTransition}
          durationInFrames={100}
          fps={FPS}
          width={WIDTH}
          height={HEIGHT}
        />
        <Composition
          id="DiagramFlow"
          component={DiagramFlow}
          durationInFrames={470}
          fps={FPS}
          width={WIDTH}
          height={HEIGHT}
        />
        <Composition
          id="EmailOutro"
          component={EmailOutro}
          durationInFrames={140}
          fps={FPS}
          width={WIDTH}
          height={HEIGHT}
        />
        <Composition
          id="EndCard"
          component={EndCard}
          durationInFrames={90}
          fps={FPS}
          width={WIDTH}
          height={HEIGHT}
        />
        <Composition
          id="AiVignetteParse"
          component={() => <AiVignette kind="parse-cv" />}
          durationInFrames={55}
          fps={FPS}
          width={WIDTH}
          height={HEIGHT}
        />
      </Folder>
    </>
  );
};
