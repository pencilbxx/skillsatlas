/**
 * SkillsAtlas Hub deck kit.
 *
 * Shared grid, palette, and layout helpers. Slide copy lives in
 * build_hub_pitch_deck.cjs. Live text, placed pictures — never flattened slides.
 */
const PptxGenJS = require('pptxgenjs');
const path = require('path');
const fs = require('fs');

const ASSETS = path.join(__dirname, 'assets');

const C = {
  cream: 'F7F4EF',
  card: 'FFFCFA',
  border: 'D9CFC3',
  navy: '102B3F',
  ink: '183143',
  muted: '49606D',
  coral: 'ED6A4A',
  teal: '1E5D5E',
  wait: 'FFD9CF',
  waitInk: '8B3827',
  onDark: 'F8FAFC',
  quietDark: 'A8B4BC',
  white: 'FFFFFF',
};

const F = { display: 'DM Serif Display', body: 'Manrope' };

const TYPE = {
  caption: 9,
  label: 10.5,
  body: 13,
  card: 15,
  step: 18,
  h1: 28,
  hook: 36,
  close: 56,
  num: 40,
};

const TRACK = {
  display: 0,
  body: 0,
  label: 1.4,
  eyebrow: 2.4,
  footer: 2,
};

const SLIDE_W = 10;
const SLIDE_H = 5.625;
const M = 0.5;
const CW = SLIDE_W - 2 * M;
const G = 0.2;
const Y_EYEBROW = 0.26;
const Y_H1 = 0.54;
const Y_FOOTER = 5.32;
const Y_RULE = 0.48;

const a = (name) => path.join(ASSETS, name);
const has = (name) => fs.existsSync(a(name));

function newDeck({ title, author = 'RedeployMate · SkillsAtlas' } = {}) {
  const pres = new PptxGenJS();
  pres.defineLayout({ name: 'LAYOUT_16x9', width: SLIDE_W, height: SLIDE_H });
  pres.layout = 'LAYOUT_16x9';
  pres.author = author;
  pres.title = title;
  pres.subject = 'TechIreland National AI Challenge 2026';
  return pres;
}

function helpers(pres) {
  const rect = pres.ShapeType.rect;
  const roundRect = pres.ShapeType.roundRect;
  const line = pres.ShapeType.line;
  const oval = pres.ShapeType.ellipse;

  const T = (s, text, o) => s.addText(text, { margin: 0, fontFace: F.body, ...o });

  const slide = (tone = 'light') => {
    const s = pres.addSlide();
    s.background = { color: tone === 'dark' ? C.navy : C.cream };
    return s;
  };

  const card = (s, { x, y, w, h, fill = C.card, stroke = C.border, radius = 0.05 }) => {
    s.addShape(roundRect, {
      x,
      y,
      w,
      h,
      fill: { color: fill },
      line: { color: stroke, width: 1 },
      rectRadius: radius,
    });
  };

  const rule = (s, { x = M, y, w = CW, color = C.border, weight = 1 } = {}) =>
    s.addShape(line, {
      x,
      y,
      w,
      h: 0,
      line: { color, width: weight },
    });

  const eyebrow = (s, text, dark = false) => {
    T(s, text.toUpperCase(), {
      x: M,
      y: Y_EYEBROW,
      w: CW,
      h: 0.18,
      fontSize: 10,
      color: dark ? C.coral : C.teal,
      bold: true,
      charSpacing: TRACK.eyebrow,
    });
    rule(s, { y: Y_RULE, color: dark ? '2A4558' : C.border });
  };

  const masthead = (s, name = 'SkillsAtlas') => {
    T(s, name, {
      x: M,
      y: 0.3,
      w: 4.8,
      h: 0.3,
      fontSize: 15,
      fontFace: F.display,
      color: C.ink,
    });
    T(s, 'TECHIRELAND NATIONAL AI CHALLENGE 2026', {
      x: 5.2,
      y: 0.36,
      w: 4.3,
      h: 0.2,
      fontSize: 9,
      color: C.muted,
      bold: true,
      charSpacing: 1.2,
      align: 'right',
    });
    rule(s, { y: 0.72 });
  };

  const h1 = (s, text, { dark = false, size = TYPE.h1, w = CW, h = 0.8, y = Y_H1, color } = {}) =>
    T(s, text, {
      x: M,
      y,
      w,
      h,
      fontSize: size,
      fontFace: F.display,
      color: color || (dark ? C.onDark : C.ink),
      charSpacing: TRACK.display,
      lineSpacingMultiple: 1.04,
    });

  const label = (s, text, o) =>
    T(s, text, {
      fontSize: TYPE.label,
      color: C.muted,
      bold: true,
      charSpacing: TRACK.label,
      ...o,
    });

  const caption = (s, text, o) =>
    T(s, text, {
      fontSize: TYPE.caption,
      color: C.muted,
      charSpacing: 0.6,
      ...o,
    });

  const coralNum = (s, n, { x, y, w = 0.42 } = {}) =>
    T(s, String(n).padStart(2, '0'), {
      x,
      y,
      w,
      h: 0.24,
      fontSize: 11,
      color: C.coral,
      bold: true,
      charSpacing: TRACK.label,
    });

  const band = (s, { x = M, y, w = CW, h, fill = C.navy }) =>
    card(s, { x, y, w, h, fill, stroke: fill, radius: 0.05 });

  const footer = (s, n, dark = false) => {
    if (has('atlas-mark.png') && !dark) {
      s.addImage({ path: a('atlas-mark.png'), x: M, y: Y_FOOTER - 0.02, w: 0.16, h: 0.16 });
    }
    T(s, 'SKILLSATLAS', {
      x: M + (dark ? 0 : 0.22),
      y: Y_FOOTER,
      w: 2.4,
      h: 0.18,
      fontSize: 8,
      color: dark ? C.quietDark : C.muted,
      bold: true,
      charSpacing: TRACK.footer,
      valign: 'middle',
    });
    T(s, String(n).padStart(2, '0'), {
      x: 8.85,
      y: Y_FOOTER,
      w: 0.65,
      h: 0.18,
      fontSize: 8,
      color: dark ? C.quietDark : C.muted,
      align: 'right',
      valign: 'middle',
    });
  };

  return {
    T,
    slide,
    card,
    rule,
    eyebrow,
    masthead,
    h1,
    label,
    caption,
    coralNum,
    band,
    footer,
    rect,
    roundRect,
    line,
    oval,
  };
}

module.exports = {
  C,
  F,
  TYPE,
  TRACK,
  M,
  CW,
  G,
  SLIDE_W,
  SLIDE_H,
  Y_EYEBROW,
  Y_H1,
  Y_FOOTER,
  ASSETS,
  a,
  has,
  newDeck,
  helpers,
};
