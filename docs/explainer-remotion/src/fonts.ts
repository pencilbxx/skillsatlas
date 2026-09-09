import { loadFont as loadManrope } from "@remotion/google-fonts/Manrope";
import { loadFont as loadDMSerif } from "@remotion/google-fonts/DMSerifDisplay";
import { loadFont as loadMono } from "@remotion/google-fonts/JetBrainsMono";

const manrope = loadManrope("normal", {
  weights: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

const dmSerif = loadDMSerif("normal", {
  weights: ["400"],
  subsets: ["latin"],
});

const jetbrains = loadMono("normal", {
  weights: ["400", "500"],
  subsets: ["latin"],
});

/** UI body / chrome — Manrope */
export const fontSans = manrope.fontFamily;
/** Titles / brand — DM Serif Display */
export const fontSerif = dmSerif.fontFamily;
/** Mono for URL bars / parse lines */
export const fontMono = jetbrains.fontFamily;
