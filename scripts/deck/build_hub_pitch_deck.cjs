/**
 * SkillsAtlas Hub pitch — editable 10-slide deck.
 *
 * Team wording from the 13 Sep 2026 revision. Design only.
 * Rebuild: node scripts/deck/build_hub_pitch_deck.cjs
 */
const path = require('path');
const kit = require('./deck_kit.cjs');

const { C, F, TYPE, TRACK, M, CW, a, has } = kit;
const OUT = path.join(__dirname, '..', '..', 'docs', 'SkillsAtlas_Hub_Pitch_Deck.pptx');
const URL = 'https://skillsatlas.vercel.app';
const MAIL = 'andrewshche@gmail.com';

async function build() {
  const pres = kit.newDeck({ title: 'SkillsAtlas — TechIreland Hub Pitch' });
  const { T, slide, card, rule, eyebrow, masthead, h1, label, caption, coralNum, band, footer, oval } =
    kit.helpers(pres);

  // ══════════════════════════════════════════════════════════
  // 1 — OPENING
  // ══════════════════════════════════════════════════════════
  {
    const s = slide('light');
    masthead(s);

    T(s, [
      { text: 'SkillsAtlas helps recruiters and employment advisers guide workers more efficiently through career disruption to a ' },
      { text: 'credible next role', options: { italic: true, color: C.coral } },
      { text: '.', options: {} },
    ], {
      x: M,
      y: 1.35,
      w: 8.6,
      h: 2.35,
      fontSize: 28,
      fontFace: F.display,
      color: C.ink,
      margin: 0,
      lineSpacingMultiple: 1.08,
    });

    footer(s, 1);
    s.addNotes(
      'Open on this line. SkillsAtlas is for the recruiter or employment adviser already in the room with the worker. One sitting. A credible next role. Then go to what the sitting does.'
    );
  }

  // ══════════════════════════════════════════════════════════
  // 2 — WHAT IT DOES
  // ══════════════════════════════════════════════════════════
  {
    const s = slide('light');
    T(s, 'SkillsAtlas - AI career-transition guide', {
      x: M,
      y: 0.3,
      w: 6.2,
      h: 0.3,
      fontSize: 14,
      fontFace: F.display,
      color: C.ink,
    });
    T(s, 'TECHIRELAND NATIONAL AI CHALLENGE 2026', {
      x: 5.9,
      y: 0.36,
      w: 3.6,
      h: 0.2,
      fontSize: 8,
      color: C.muted,
      bold: true,
      charSpacing: 0.8,
      align: 'right',
    });
    rule(s, { y: 0.72 });

    T(s, 'In one supported session, SkillsAtlas:', {
      x: M,
      y: 0.96,
      w: CW,
      h: 0.32,
      fontSize: 15,
      color: C.muted,
    });

    const acts = [
      'checks what the worker has actually done;',
      'turns confirmed experience into evidence;',
      'identifies transferable skills and important gaps;',
      'shows two credible next-role options;',
      'creates an Interview Board and helps the worker practise their story.',
    ];
    acts.forEach((line, i) => {
      const y = 1.42 + i * 0.68;
      coralNum(s, i + 1, { x: M, y: y + 0.08 });
      rule(s, { x: M + 0.5, y, w: 8.5, color: i === 0 ? C.border : C.border });
      const last = i === 4;
      T(s, last
        ? [
            { text: 'creates an ', options: {} },
            { text: 'Interview Board', options: { italic: true, color: C.coral } },
            { text: ' and helps the worker practise their story.', options: {} },
          ]
        : line, {
        x: M + 0.55,
        y: y + 0.06,
        w: 8.4,
        h: 0.56,
        fontSize: 18,
        fontFace: F.display,
        color: C.ink,
        margin: 0,
        valign: 'middle',
      });
    });
    rule(s, { x: M + 0.5, y: 1.42 + 5 * 0.68, w: 8.5 });

    footer(s, 2);
    s.addNotes(
      'This sitting turns a person’s own CV into work they can stand over, two honest routes, and one page they can take to an interview. The practice line is proposed — the live click is the prepared Interview Board, not a live AI coach.'
    );
  }

  // ══════════════════════════════════════════════════════════
  // 3 — PROBLEM
  // ══════════════════════════════════════════════════════════
  {
    const s = slide('light');
    eyebrow(s, 'The problem');
    h1(s, 'Job lists show openings—not how to reach them', {
      size: 26,
      h: 0.58,
    });

    const leads = [
      'Workers scroll through endless job lists.',
      'They cannot easily see how their experience connects to a realistic next role.',
      'Job titles often hide valuable transferable skills.',
    ];
    leads.forEach((line, i) => {
      const y = 1.28 + i * 0.58;
      s.addShape(oval, {
        x: M,
        y: y + 0.1,
        w: 0.1,
        h: 0.1,
        fill: { color: C.coral },
        line: { color: C.coral, width: 0 },
      });
      T(s, line, {
        x: M + 0.24,
        y,
        w: 4.55,
        h: 0.56,
        fontSize: 14,
        color: C.ink,
        lineSpacingMultiple: 1.12,
      });
    });

    T(s, 'The missing step may be small:', {
      x: M,
      y: 3.06,
      w: 4.8,
      h: 0.28,
      fontSize: 15,
      fontFace: F.display,
      color: C.teal,
    });
    const gaps = [
      'recognising an existing strength;',
      'learning one additional skill; or',
      'completing one relevant course.',
    ];
    gaps.forEach((line, i) => {
      T(s, line, {
        x: M,
        y: 3.38 + i * 0.36,
        w: 4.8,
        h: 0.34,
        fontSize: 14,
        fontFace: F.display,
        color: C.ink,
      });
    });

    card(s, { x: 5.55, y: 1.26, w: 3.95, h: 3.62 });
    label(s, 'IRELAND UNEMPLOYMENT', {
      x: 5.74,
      y: 1.38,
      w: 3.6,
      h: 0.18,
    });
    T(s, [
      { text: '4.8%', options: { color: C.muted } },
      { text: '  →  ', options: { fontFace: F.body, fontSize: 16, color: C.muted } },
      { text: '5.1%', options: { color: C.coral } },
    ], {
      x: 5.74,
      y: 1.58,
      w: 3.6,
      h: 0.42,
      fontSize: 28,
      fontFace: F.display,
      margin: 0,
    });
    s.addChart(pres.ChartType.line, [
      {
        name: 'Unemployment rate %',
        labels: ['Q2 24', 'Q1 25', 'Q2 25', 'Q3 25', 'Q4 25', 'Q1 26', 'Q2 26'],
        values: [4.6, 4.3, 4.8, 5.3, 4.4, 4.9, 5.1],
      },
    ], {
      x: 5.58,
      y: 2.04,
      w: 3.88,
      h: 2.38,
      showLegend: false,
      showTitle: false,
      showValue: false,
      chartColors: [C.coral],
      lineDataSymbol: 'circle',
      lineDataSymbolSize: 8,
      chartDataBorder: { pt: 0, color: C.coral },
      valAxisMinVal: 4.0,
      valAxisMaxVal: 5.6,
      valAxisMajorUnit: 0.4,
      valAxisLabelFormatCode: '0.0',
      catAxisLabelColor: C.muted,
      valAxisLabelColor: C.muted,
      catAxisLabelFontSize: 8,
      valAxisLabelFontSize: 8,
      catAxisLabelFontFace: F.body,
      valAxisLabelFontFace: F.body,
      valGridLine: { color: C.border, size: 0.75 },
      chartArea: { fill: { color: C.card } },
      plotArea: { fill: { color: C.card } },
    });
    caption(s, 'CSO LFS  ·  up from 4.8% a year earlier', {
      x: 5.74,
      y: 4.5,
      w: 3.6,
      h: 0.24,
    });

    footer(s, 3);
    s.addNotes(
      'Do not say AI caused unemployment. Job lists show openings. They do not show how a person reaches one. The chart is CSO LFS: 4.8% a year earlier, 5.1% now. The line is the real quarterly path, including the dip. No 700. No tech-loss headline. No 99% or 55% on this slide.'
    );
  }

  // ══════════════════════════════════════════════════════════
  // 4 — SOLUTION
  // ══════════════════════════════════════════════════════════
  {
    const s = slide('light');
    eyebrow(s, 'The solution');
    h1(s, 'One guided sitting. A clearer route forward.', { size: 26, h: 0.48 });
    T(s, 'SkillsAtlas turns working experience into evidence that both the worker and adviser can use.', {
      x: M,
      y: 1.1,
      w: CW,
      h: 0.3,
      fontSize: TYPE.body,
      color: C.muted,
    });

    const pillars = [
      ['Confirm the evidence', 'Turn CV preparation into experience the worker can confidently use at interview.'],
      ['Find the route', 'Reveal transferable skills, two credible roles and any gap that matters.'],
      ['Prepare the worker', 'Build confidence through tailored questions and AI-supported interview best practice.'],
    ];
    pillars.forEach(([title, body], i) => {
      const x = M + i * 3.0;
      card(s, { x, y: 1.56, w: 2.85, h: 3.28 });
      s.addShape(pres.ShapeType.rect, {
        x,
        y: 1.56,
        w: 2.85,
        h: 0.04,
        fill: { color: C.coral },
        line: { color: C.coral, width: 0 },
      });
      coralNum(s, i + 1, { x: x + 0.2, y: 1.78 });
      T(s, title, {
        x: x + 0.2,
        y: 2.08,
        w: 2.46,
        h: 0.64,
        fontSize: 18,
        fontFace: F.display,
        color: C.ink,
      });
      T(s, body, {
        x: x + 0.2,
        y: 2.78,
        w: 2.46,
        h: 1.82,
        fontSize: TYPE.body,
        color: C.ink,
        lineSpacingMultiple: 1.28,
      });
    });

    footer(s, 4);
    s.addNotes(
      'One sitting. Confirm the evidence. Find the route. Prepare the worker. Nothing guessed reaches the Interview Board. The live demo is still a prepared walk-through, not a live AI coach.'
    );
  }

  // ══════════════════════════════════════════════════════════
  // 5 — LIVE DEMO
  // ══════════════════════════════════════════════════════════
  {
    const s = slide('dark');
    T(s, 'LIVE DEMONSTRATION', {
      x: M,
      y: 1.35,
      w: CW,
      h: 0.2,
      fontSize: 10,
      color: C.coral,
      bold: true,
      align: 'center',
      charSpacing: 2.6,
    });
    T(s, 'Prototype', {
      x: M,
      y: 1.72,
      w: CW,
      h: 0.78,
      fontSize: 48,
      fontFace: F.display,
      color: C.onDark,
      align: 'center',
    });
    T(s, 'Practice CV   ·   Prepared interaction', {
      x: M,
      y: 2.58,
      w: CW,
      h: 0.26,
      fontSize: TYPE.body,
      color: C.quietDark,
      align: 'center',
    });
    rule(s, { x: 3.4, y: 3.04, w: 3.2, color: '2A4558' });
    T(s, 'skillsatlas.vercel.app', {
      x: M,
      y: 3.18,
      w: CW,
      h: 0.42,
      fontSize: 22,
      fontFace: F.display,
      color: C.coral,
      align: 'center',
      underline: false,
      hyperlink: { url: URL },
    });
    T(s, 'A prepared walk-through. Not a live AI system on this stage.', {
      x: M,
      y: 3.7,
      w: CW,
      h: 0.28,
      fontSize: TYPE.body,
      color: C.quietDark,
      align: 'center',
    });

    footer(s, 5, true);
    s.addNotes(
      'This is a clickable prototype using a prepared practice CV. The production AI pipeline is not live in this demo. Start on Screen 02. Confirm. Two short questions. The person checks the stronger wording. Two unranked routes. They choose. Interview Board. Save as PDF. Talker never holds the mouse.'
    );
  }

  // ══════════════════════════════════════════════════════════
  // 6 — WHO USES IT
  // ══════════════════════════════════════════════════════════
  {
    const s = slide('light');
    eyebrow(s, 'Who uses it');
    h1(s, 'We sell to the recruiter who’s on too much pressure doing administrative work, when they should be getting people jobs', {
      size: 20,
      h: 1.0,
    });

    label(s, 'CUSTOMERS  ·  B2B', {
      x: M,
      y: 1.68,
      w: 5.3,
      h: 0.2,
      color: C.coral,
    });
    T(s, 'Recruitment firms and employment agencies', {
      x: M,
      y: 1.92,
      w: 5.3,
      h: 0.28,
      fontSize: 16,
      fontFace: F.display,
      color: C.ink,
    });
    T(s, [
      { text: '200+', options: { fontFace: F.display, fontSize: 22, color: C.ink } },
      { text: '   ERF member firms in Ireland.', options: { fontSize: 13, color: C.muted } },
    ], {
      x: M,
      y: 2.24,
      w: 5.3,
      h: 0.34,
      fontSize: TYPE.body,
      color: C.ink,
      margin: 0,
      valign: 'middle',
    });
    T(s, 'HR teams beginning with mid-size firms', {
      x: M,
      y: 2.68,
      w: 5.3,
      h: 0.26,
      fontSize: 16,
      fontFace: F.display,
      color: C.ink,
    });
    T(s, '4,662', {
      x: M,
      y: 2.96,
      w: 5.3,
      h: 0.32,
      fontSize: 22,
      fontFace: F.display,
      color: C.ink,
    });
    T(s, 'firms with 50–249 people — big enough for HR, small enough not to build this themselves.', {
      x: M,
      y: 3.28,
      w: 5.3,
      h: 0.5,
      fontSize: TYPE.body,
      color: C.muted,
    });

    rule(s, { x: 5.95, y: 1.72, w: 0, color: C.border, weight: 1 });
    s.addShape(pres.ShapeType.line, {
      x: 5.95,
      y: 1.72,
      w: 0,
      h: 2.1,
      line: { color: C.border, width: 1 },
    });

    label(s, 'BENEFICIARIES', {
      x: 6.25,
      y: 1.68,
      w: 3.25,
      h: 0.2,
      color: C.teal,
    });
    T(s, 'Job seekers', {
      x: 6.25,
      y: 1.92,
      w: 3.25,
      h: 0.34,
      fontSize: 20,
      fontFace: F.display,
      color: C.ink,
    });
    T(s, 'They use it. They confirm. They choose. They leave with the Interview Board.', {
      x: 6.25,
      y: 2.32,
      w: 3.25,
      h: 0.72,
      fontSize: TYPE.body,
      color: C.ink,
      lineSpacingMultiple: 1.22,
    });
    T(s, 'They are not a second customer track. They do not pay.', {
      x: 6.25,
      y: 3.1,
      w: 3.25,
      h: 0.6,
      fontSize: TYPE.body,
      color: C.muted,
      lineSpacingMultiple: 1.22,
    });

    band(s, { y: 3.92, h: 0.88 });
    label(s, 'PROPOSED MODEL', {
      x: M + 0.24,
      y: 4.04,
      w: 2.15,
      h: 0.64,
      color: C.coral,
      valign: 'middle',
    });
    T(s, 'Pay per seat, per caseworker. About 3–5 candidates a day. Same four screens, different professional across the table. Not a consumer app. Price is still open.', {
      x: M + 2.45,
      y: 4.04,
      w: 6.75,
      h: 0.64,
      fontSize: 12.5,
      color: C.onDark,
      valign: 'middle',
    });

    caption(s, 'ERF public member line, 2025–26.   Medium firms: CSO Business in Ireland 2023.   Not a customer count.', {
      x: M,
      y: 4.88,
      w: CW,
      h: 0.18,
    });

    footer(s, 6);
    s.addNotes(
      'B2B only. Recruitment partners, employment agencies, and mid-tier HR teams are the proposed buyers. Job seekers are beneficiaries, not a second track. Per-seat, per caseworker, about three to five people a day, is a proposal — not a signed price. Do not name Turas Nua as a customer.'
    );
  }

  // ══════════════════════════════════════════════════════════
  // 7 — WHAT WE KNOW SO FAR
  // ══════════════════════════════════════════════════════════
  {
    const s = slide('light');
    eyebrow(s, 'What we know so far');
    h1(s, 'Recruitment firms will test agentic workflows that give their teams more time back to sell every day', {
      size: 20,
      h: 0.92,
    });

    card(s, { x: M, y: 1.62, w: 5.55, h: 3.22 });
    label(s, 'FROM ONE FIELD CONVERSATION', {
      x: M + 0.26,
      y: 1.78,
      w: 5.1,
      h: 0.2,
      color: C.teal,
    });
    T(s, '~2 hours gained', {
      x: M + 0.26,
      y: 2.06,
      w: 5.1,
      h: 0.62,
      fontSize: 36,
      fontFace: F.display,
      color: C.coral,
    });
    T(s, 'per candidate — time that today goes into rereading CVs and handling laborious administration.', {
      x: M + 0.26,
      y: 2.76,
      w: 5.1,
      h: 0.72,
      fontSize: TYPE.body,
      color: C.ink,
      lineSpacingMultiple: 1.24,
    });
    T(s, 'This was one conversation with an employment agent. An estimate here of SkillsAtlas being beneficial.', {
      x: M + 0.26,
      y: 3.56,
      w: 5.1,
      h: 1.0,
      fontSize: TYPE.body,
      color: C.muted,
      lineSpacingMultiple: 1.24,
    });

    const opens = [
      ['FIT', 'Will SkillsAtlas fit their existing workflow?'],
      ['BOARD', 'Does the person leave with a useful page?'],
      ['PAY', 'How much will the organisation host and pay?'],
    ];
    opens.forEach(([tag, note], i) => {
      const y = 1.62 + i * 1.08;
      if (i > 0) rule(s, { x: 6.25, y, w: 3.25 });
      label(s, tag, {
        x: 6.25,
        y: y + 0.12,
        w: 3.25,
        h: 0.2,
        color: C.coral,
      });
      T(s, note, {
        x: 6.25,
        y: y + 0.36,
        w: 3.25,
        h: 0.58,
        fontSize: TYPE.body,
        color: C.ink,
      });
    });

    footer(s, 7);
    s.addNotes(
      'We do not have a customer or a price. We had one useful conversation. Frame the two hours as time gained, not time lost, and call it an estimate. The ask is product testing with recruitment firms and employment agencies. Buyer, workflow fit, and price stay open.'
    );
  }

  // ══════════════════════════════════════════════════════════
  // 8 — TEAM
  // ══════════════════════════════════════════════════════════
  {
    const s = slide('light');
    eyebrow(s, 'The team');
    h1(s, 'Challenge team RedeployMate.', { size: 28, h: 0.46 });

    const people = [
      ['andrew', 'Andrew', 'Team lead.\nAI Product builder. UX'],
      ['brigitte', 'Brigitte', 'HR consultant'],
      ['don', 'Don', 'Recruiter and Spoken story'],
      ['sophia', 'Sophia', 'Business strategist'],
      ['sri-karan', 'Sri Karan', 'Data Engineer'],
    ];
    people.forEach(([file, name, line], i) => {
      const x = M + i * 1.82;
      const photo = `team/${file}.png`;
      if (has(photo)) {
        s.addImage({ path: a(photo), x: x + 0.22, y: 1.42, w: 1.28, h: 1.28 });
      } else {
        s.addShape(pres.ShapeType.ellipse, {
          x: x + 0.22,
          y: 1.42,
          w: 1.28,
          h: 1.28,
          fill: { color: C.navy },
        });
      }
      T(s, name, {
        x,
        y: 2.86,
        w: 1.72,
        h: 0.3,
        fontSize: 14,
        fontFace: F.body,
        bold: true,
        color: C.ink,
        align: 'center',
      });
      T(s, line, {
        x,
        y: 3.18,
        w: 1.72,
        h: 0.8,
        fontSize: 12,
        color: C.muted,
        align: 'center',
      });
    });

    footer(s, 8);
    s.addNotes(
      'Andrew is team lead and AI product builder. Brigitte is HR consultant. Don is recruiter and spoken story. Sophia is business strategist. Sri Karan is data engineer. Challenge team RedeployMate. We will not pretend we already have a signed buyer.'
    );
  }

  // ══════════════════════════════════════════════════════════
  // 9 — ROADMAP
  // ══════════════════════════════════════════════════════════
  {
    const s = slide('light');
    eyebrow(s, 'The roadmap');
    h1(s, 'From one guided sitting to connected recruitment.', { size: 24, h: 0.44 });
    T(s, 'Next, SkillsAtlas can work with an agency’s existing CRM—not replace it.', {
      x: M,
      y: 1.04,
      w: CW,
      h: 0.28,
      fontSize: TYPE.body,
      color: C.muted,
    });

    const steps = [
      ['Connect', 'Use MCP—a standard bridge—to connect SkillsAtlas with the agency’s existing systems.'],
      ['Ask', 'Search candidate records, vacancies and job descriptions by asking questions in plain English.'],
      ['Close the gap', 'Find candidates who are close to a role—and reveal the one skill or short course that could help them progress.'],
      ['Reimagine', 'Long term: an agent-to-agent marketplace where confirmed skills meet real hiring needs, with people in control.'],
    ];
    rule(s, { x: M + 0.35, y: 1.62, w: 8.3, color: C.border });
    steps.forEach(([title, body], i) => {
      const x = M + i * 2.3;
      coralNum(s, i + 1, { x: x + 0.08, y: 1.5 });
      T(s, title, {
        x: x + 0.08,
        y: 1.82,
        w: 2.1,
        h: 0.5,
        fontSize: 16,
        fontFace: F.display,
        color: C.ink,
      });
      T(s, body, {
        x: x + 0.08,
        y: 2.36,
        w: 2.1,
        h: 1.45,
        fontSize: 12,
        color: C.ink,
        lineSpacingMultiple: 1.2,
      });
    });

    band(s, { y: 3.96, h: 0.94 });
    const horizon = [
      ['NOW', 'Now: one guided career-transition sitting.'],
      ['NEXT', 'Next: faster, evidence-led CRM search.'],
      ['FUTURE', 'Future: a trusted agent-to-agent recruitment marketplace.'],
    ];
    horizon.forEach(([tag, line], i) => {
      const x = M + 0.22 + i * 3.0;
      label(s, tag, {
        x,
        y: 4.06,
        w: 2.85,
        h: 0.18,
        color: C.coral,
      });
      T(s, line, {
        x,
        y: 4.28,
        w: 2.85,
        h: 0.5,
        fontSize: 12,
        color: C.onDark,
      });
    });

    footer(s, 9);
    s.addNotes(
      'This is the horizon, not what we are showing today. Today is one guided sitting. Next is working with an agency CRM, not replacing it. The marketplace is long term. Do not present Connect / Ask / Close the gap as already built.'
    );
  }

  // ══════════════════════════════════════════════════════════
  // 10 — THANK YOU
  // ══════════════════════════════════════════════════════════
  {
    const s = slide('dark');
    T(s, 'SkillsAtlas', {
      x: M,
      y: 0.58,
      w: 3,
      h: 0.3,
      fontSize: 16,
      fontFace: F.display,
      color: C.onDark,
    });

    T(s, 'Thank you.', {
      x: M,
      y: 1.55,
      w: CW,
      h: 1.05,
      fontSize: TYPE.close,
      fontFace: F.display,
      color: C.onDark,
    });

    rule(s, { x: M, y: 2.78, w: 2.2, color: '2A4558' });

    T(s, 'skillsatlas.vercel.app', {
      x: M,
      y: 3.05,
      w: 7,
      h: 0.42,
      fontSize: 22,
      fontFace: F.display,
      color: C.coral,
      underline: false,
      hyperlink: { url: URL },
    });
    T(s, MAIL, {
      x: M,
      y: 3.52,
      w: 7,
      h: 0.28,
      fontSize: TYPE.body,
      color: C.quietDark,
      underline: false,
      hyperlink: { url: `mailto:${MAIL}` },
    });

    footer(s, 10, true);
    s.addNotes(
      'Stop. Leave this slide up. If they ask: send SkillsAtlas to Galway, then help us test one hosted sitting with a recruitment firm or employment agency. We know what we have built, what is still a guess, and what we need to learn next.'
    );
  }

  await pres.writeFile({ fileName: OUT });
  console.log(`wrote ${OUT}`);
}

build().catch((err) => {
  console.error(err);
  process.exit(1);
});
