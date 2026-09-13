const screens = [...document.querySelectorAll(".screen")];
const navBtns = [...document.querySelectorAll("nav [data-go]")];
const film = document.getElementById("film");
const filmIdle = document.getElementById("film-idle");

if (film) {
  film.addEventListener("ended", () => {
    film.currentTime = 0;
  });
  film.addEventListener("error", () => {
    if (!filmIdle) return;
    const label = filmIdle.querySelector("span");
    if (label) label.textContent = "Skip below if the film does not load";
  });
}

let currentScreen = 0;
let questionNumber = 1;
let hadSkip = false;
let evidenceState = "unconfirmed";
let selectedRoute = "a";

function showEl(el) {
  if (!el) return;
  el.hidden = false;
  el.removeAttribute("hidden");
}

function hideEl(el) {
  if (!el) return;
  el.hidden = true;
  el.setAttribute("hidden", "");
}

function go(index) {
  currentScreen = index;
  if (film && index !== 0) film.pause();
  if (index === 3) syncRoutes();
  if (index === 4) syncBoard();
  screens.forEach((screen) => {
    const on = screen.id === "s" + index;
    screen.classList.toggle("on", on);
    if (on) screen.removeAttribute("inert");
    else screen.setAttribute("inert", "");
  });
  navBtns.forEach((button) => {
    if (button.dataset.go === String(index)) button.setAttribute("aria-current", "true");
    else button.removeAttribute("aria-current");
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
  if (index === 3) {
    const rail = document.getElementById("routes");
    if (!rail) return;
    const chosen = rail.querySelector("[data-route].sel");
    if (chosen) {
      const left = chosen.getBoundingClientRect().left - rail.getBoundingClientRect().left + rail.scrollLeft;
      rail.scrollLeft = left;
    } else {
      rail.scrollLeft = 0;
    }
  }
}

document.querySelectorAll("[data-go]").forEach((button) => {
  button.addEventListener("click", () => go(Number(button.dataset.go)));
});

const skipLink = document.querySelector(".skip-link");
if (skipLink) {
  skipLink.addEventListener("click", (event) => {
    const main = document.getElementById("main-content");
    if (!main) return;
    event.preventDefault();
    main.focus({ preventScroll: true });
    main.scrollIntoView({ block: "start" });
  });
}

window.addEventListener("keydown", (event) => {
  if (!["0", "1", "2", "3", "4"].includes(event.key)) return;
  if (event.altKey || event.ctrlKey || event.metaKey) return;
  const target = event.target;
  if (
    target instanceof HTMLElement &&
    (target.closest("input, textarea, select, [contenteditable='true']") ||
      target.isContentEditable)
  ) {
    return;
  }
  go(Number(event.key));
});

const confirmBtn = document.getElementById("btn-confirm");
const confirmState = document.getElementById("confirm-state");
const qPanel = document.getElementById("q-panel");
const afterTitle = document.getElementById("after-title");
const afterBody = document.getElementById("after-body");
const afterClass = document.getElementById("after-class");
const stockScore = document.getElementById("stock-score");
const stockClaim = document.getElementById("c-stock");
const stockDetail = document.getElementById("stock-detail");
const claimSourceStatus = document.getElementById("claim-source-status");
const claims = [...document.querySelectorAll("#s2 .claim")];
const stockStrong = document.querySelector("#c-stock strong");
const originalStockText = stockStrong.textContent;
const trainDetail = document.querySelector("#c-train .muted");
const originalTrainDetail = trainDetail ? trainDetail.textContent : "";
const qTiny = document.querySelector("#q-panel .tiny");
const qText = document.getElementById("q-text");
const qWhy = document.getElementById("q-why");
const btnAnswer = document.getElementById("btn-answer");
const btnSkip = document.getElementById("btn-skip");
const btnReviewEvidence = document.getElementById("btn-review-evidence");
const btnToRoutes = document.getElementById("btn-to-routes");
const routeLead = document.getElementById("route-lead");
const routeAStatus = document.getElementById("route-a-status");
const routeBStatus = document.getElementById("route-b-status");
const routeAStock = document.querySelector("[data-route='a'] ul.plain li");

function setStatusChip(el, text, className) {
  el.textContent = text;
  el.className = "chip " + className;
}

function resetEvidence() {
  questionNumber = 1;
  hadSkip = false;
  evidenceState = "unconfirmed";
  selectedRoute = "a";
  claims.forEach((el) => {
    el.setAttribute("aria-pressed", "false");
    el.classList.remove("strong");
  });
  stockClaim.classList.add("weak");
  setStatusChip(stockScore, "Thin — load-bearing", "chip-rep");
  setStatusChip(claimSourceStatus, "From CV · awaiting confirmation", "chip-rep");
  stockStrong.textContent = originalStockText;
  if (trainDetail) trainDetail.textContent = originalTrainDetail;
  stockDetail.textContent = "No number, no system, no date. Matters for a reachable inventory route — tap to confirm, then we ask.";
  confirmState.textContent = "Not confirmed yet · tap a line or this button";
  confirmBtn.classList.add("primary");
  confirmBtn.disabled = false;
  confirmBtn.textContent = "Confirm these lines";
  claims.forEach((el) => {
    el.disabled = false;
  });
  hideEl(qPanel);
  qTiny.textContent = "Question 1 of 2 · skip is always fine";
  qText.innerHTML = "<strong>When you managed stock, roughly how many product lines — and did you use any system?</strong>";
  qWhy.textContent = "Why it matters: a number and a system turn a duty into something an employer can check.";
  btnAnswer.textContent = "Show prepared answer";
  showEl(btnAnswer);
  showEl(btnSkip);
  hideEl(btnReviewEvidence);
  hideEl(btnToRoutes);
  afterTitle.textContent = "A CV claim, not evidence yet";
  afterBody.textContent = "In the intended production flow, the worker confirms before the claim is used and reviews any stronger wording.";
  afterClass.textContent = "Prepared questions and wording remain examples until the worker confirms them.";
  document.querySelectorAll("[data-route]").forEach((card) => card.classList.remove("sel"));
  resetPractice();
  syncRoutes();
  syncBoard();
}

function openQuestions() {
  evidenceState = "base";
  setStatusChip(claimSourceStatus, "Original CV lines confirmed", "chip-obs");
  confirmState.textContent = "Original CV lines confirmed";
  confirmBtn.classList.remove("primary");
  confirmBtn.disabled = true;
  confirmBtn.textContent = "Confirmed";
  claims.forEach((el) => {
    el.disabled = true;
  });
  if (trainDetail) trainDetail.textContent = "Confirmed. Original CV wording.";
  stockDetail.textContent = "Confirmed. Questions can add a number, system, or date — or they can skip.";
  showEl(qPanel);
  afterTitle.textContent = "Waiting on their words";
  afterBody.textContent = "The question is tied to the weak stock claim. The worker can skip.";
  afterClass.textContent = "A prepared answer is not evidence until the worker reviews and confirms the wording.";
  syncRoutes();
  syncBoard();
  qPanel.scrollIntoView({ behavior: "smooth", block: "center" });
}

function confirmClaim(el) {
  el.setAttribute("aria-pressed", "true");
}

function confirmAll() {
  if (evidenceState !== "unconfirmed") return;
  claims.forEach(confirmClaim);
  openQuestions();
}

confirmBtn.addEventListener("click", confirmAll);
claims.forEach((el) => {
  el.addEventListener("click", () => {
    if (evidenceState !== "unconfirmed") return;
    confirmClaim(el);
    const allOn = claims.every((claim) => claim.getAttribute("aria-pressed") === "true");
    if (allOn) confirmAll();
    else confirmState.textContent = "One line confirmed. Tap the other, or Confirm these lines.";
  });
});

function showRouteButton() {
  qTiny.textContent = hadSkip ? "Done · skipped details remain open" : "Done · stronger wording confirmed";
  hideEl(btnAnswer);
  hideEl(btnSkip);
  hideEl(btnReviewEvidence);
  showEl(btnToRoutes);
}

function keepOriginalClaim() {
  evidenceState = "base";
  stockClaim.classList.remove("strong");
  stockClaim.classList.add("weak");
  stockStrong.textContent = originalStockText;
  setStatusChip(stockScore, "Confirmed CV wording · details skipped", "chip-obs");
  stockDetail.textContent = "No number, system, or date was added. The original CV wording remains.";
  afterTitle.textContent = "Original claim kept";
  afterBody.textContent = "The worker skipped the detail. Matching may use only the original confirmed wording.";
  afterClass.textContent = "No number, system, or date was added.";
  qText.innerHTML = "<strong>Details skipped. The original confirmed CV wording remains.</strong>";
  qWhy.textContent = "They can add detail later. There is no penalty for skipping.";
  syncRoutes();
  syncBoard();
  showRouteButton();
}

function proposeStrongerWording() {
  evidenceState = "proposed";
  stockClaim.classList.remove("weak");
  stockClaim.classList.add("strong");
  stockStrong.textContent = "Managed about 2,400 product lines in SAP, monthly cycle counts, 2019–2024";
  setStatusChip(stockScore, "Prepared wording · confirm before use", "chip-prop");
  stockDetail.textContent = "Prepared from the two example answers. Awaiting the worker's confirmation.";
  afterTitle.textContent = "Review the stronger wording";
  afterBody.textContent = "Number, system, and dates make the claim specific. The worker must confirm it before routes or the Board may use it.";
  afterClass.textContent = "Prepared from this practice case. Not confirmed yet.";
  qText.innerHTML = "<strong>Does this stronger wording accurately describe what you did?</strong>";
  qWhy.textContent = "Nothing downstream changes until the worker confirms this wording.";
  hideEl(btnAnswer);
  hideEl(btnSkip);
  showEl(btnReviewEvidence);
  hideEl(btnToRoutes);
  syncRoutes();
  syncBoard();
}

function confirmStrongerWording() {
  evidenceState = "enriched";
  setStatusChip(stockScore, "Confirmed", "chip-obs");
  stockDetail.textContent = "Number, system, and dates — worker-confirmed practice-case wording.";
  afterTitle.textContent = "Confirmed evidence";
  afterBody.textContent = "Number, system, and dates. This confirmed practice-case wording may now support the two routes and Interview Board.";
  afterClass.textContent = "The original CV claim remains the source; the worker approved the stronger wording.";
  qText.innerHTML = "<strong>Stronger wording confirmed.</strong>";
  qWhy.textContent = "The worker still chooses the route.";
  syncRoutes();
  syncBoard();
  showRouteButton();
}

btnAnswer.addEventListener("click", () => {
  if (questionNumber === 1) {
    questionNumber = 2;
    qTiny.textContent = "Question 2 of 2 · skip is always fine";
    qText.innerHTML = "<strong>When did that start — and were the cycle counts on a schedule?</strong>";
    qWhy.textContent = "A date and a repeated task make the evidence easier to explain.";
  } else if (hadSkip) {
    keepOriginalClaim();
  } else {
    proposeStrongerWording();
  }
});

btnSkip.addEventListener("click", () => {
  hadSkip = true;
  afterTitle.textContent = "Skipped · no penalty";
  afterBody.textContent = "The original confirmed CV wording stays. Missing detail is not invented.";
  afterClass.textContent = "The worker can add detail later.";
  if (questionNumber === 1) {
    questionNumber = 2;
    qTiny.textContent = "Question 2 of 2 · skip is always fine";
    qText.innerHTML = "<strong>Would you like to add a system name or date, or skip and keep the original wording?</strong>";
    qWhy.textContent = "Skipping keeps the original confirmed line and leaves the detail open.";
  } else {
    keepOriginalClaim();
  }
});

btnReviewEvidence.addEventListener("click", confirmStrongerWording);

function syncRoutes() {
  const task = "Pick one of these two roles to take into the Interview Board.";
  if (evidenceState === "enriched") {
    routeLead.textContent = task + " Two prepared examples from confirmed evidence. Not jobs available now, and not a ranking.";
    setStatusChip(routeAStatus, "Confirmed evidence", "chip-obs");
    setStatusChip(routeBStatus, "Confirmed evidence", "chip-obs");
    routeAStock.textContent = "Stock control — 2,400 product lines in SAP, monthly cycle counts";
  } else if (evidenceState === "base") {
    routeLead.textContent = task + " These use the original confirmed CV wording. The stock detail stays open because it was skipped.";
    setStatusChip(routeAStatus, "Confirmed CV wording", "chip-obs");
    setStatusChip(routeBStatus, "Confirmed CV wording", "chip-obs");
    routeAStock.textContent = "Managed stock — confirmed CV wording; detail still open";
  } else if (evidenceState === "proposed") {
    routeLead.textContent = task + " Preview only. Confirm the stronger stock wording on Evidence before a route can use it. You can still pick a role to look ahead.";
    setStatusChip(routeAStatus, "Awaiting worker confirmation", "chip-prop");
    setStatusChip(routeBStatus, "Practice preview", "chip-prop");
    routeAStock.textContent = "Managed stock — stronger wording not confirmed yet";
  } else {
    routeLead.textContent = task + " Preview only. Confirm the lines on Evidence first. You can still pick a role to look ahead.";
    setStatusChip(routeAStatus, "Practice preview", "chip-prop");
    setStatusChip(routeBStatus, "Practice preview", "chip-prop");
    routeAStock.textContent = "Managed stock — practice CV; not confirmed in this session";
  }
}

const routeCopy = {
  a: {
    title: "SkillsAtlas Interview Board · inventory / stock controller",
    step: "Check a current inventory / WMS learning option with the adviser or recruiter this week.",
    enriched: {
      s: "Night shift, one site, stock was the job.",
      t: "Keep stock records accurate and investigate count differences.",
      a: "Managed about 2,400 product lines in SAP and completed monthly cycle counts from 2019 to 2024 — worker-confirmed practice wording.",
      r: "Can stand over the number, system, and dates. Do not claim a certification that is not on the CV.",
    },
    base: {
      s: "Warehouse work on a night shift at one site.",
      t: "Managed stock as part of the role.",
      a: "Managed stock — original CV wording confirmed; number, system, and dates remain open.",
      r: "Can stand over the original claim. Add detail later rather than invent it now.",
    },
  },
  b: {
    title: "SkillsAtlas Interview Board · warehouse team lead",
    step: "Ask the adviser or recruiter to verify a current supervisory-skills learning option this week.",
    enriched: {
      s: "New starters needed help with the site safety paperwork.",
      t: "Help them understand the checklist without claiming formal line-management responsibility.",
      a: "Helped new staff with safety paperwork — original CV wording confirmed.",
      r: "Can stand over the support given. Do not claim a team-lead title that is not on the CV.",
    },
    base: {
      s: "New starters needed help with the site safety paperwork.",
      t: "Help them understand the checklist without claiming formal line-management responsibility.",
      a: "Helped new staff with safety paperwork — original CV wording confirmed.",
      r: "Can stand over the support given. Do not claim a team-lead title that is not on the CV.",
    },
  },
};

const questions = {
  a: {
    "screen-recruiter": "Have you used a stock system, even a simple one?",
    "screen-hm": "In one minute, how did you keep counts accurate on your shift?",
    "first-recruiter": "Tell me about a time a count was wrong. What did you do?",
    "first-hm": "Walk me through a monthly cycle count in your own words.",
    "panel-recruiter": "How would you explain your stock experience to a panel unfamiliar with warehouse work?",
    "panel-hm": "What would you check first if a stock count did not match the system?",
  },
  b: {
    "screen-recruiter": "What did you personally show a new starter about the safety paperwork?",
    "screen-hm": "In one minute, how did you help a new starter work safely?",
    "first-recruiter": "Tell me about a time a new starter needed help with the safety checklist.",
    "first-hm": "Walk me through what you explained and what the new starter did next.",
    "panel-recruiter": "How would you explain that safety-support example to a panel?",
    "panel-hm": "If a new starter joined tomorrow, what part of the checklist would you explain first?",
  },
};

function boardIsConfirmed() {
  return evidenceState === "base" || evidenceState === "enriched";
}

function settingKey() {
  const stage = document.querySelector("#stage .opt.on").dataset.val;
  const who = document.querySelector("#who .opt.on").dataset.val;
  return stage + "-" + (who === "hm" ? "hm" : "recruiter");
}

function syncQuestion() {
  const key = settingKey();
  const question = boardIsConfirmed()
    ? questions[selectedRoute][key]
    : "Complete the Evidence screen before using a worker-specific interview question.";
  document.getElementById("pq").innerHTML = "<strong>" + question + "</strong>";
  document.getElementById("pq-note").textContent = boardIsConfirmed()
    ? "The setting changes the question. The confirmed evidence stays the same."
    : "Practice preview only. No worker-specific evidence is confirmed in this session.";
  syncHelper();
}

function syncBoard() {
  const copy = routeCopy[selectedRoute];
  const confirmed = boardIsConfirmed();
  const story = confirmed ? copy[evidenceState] : null;
  document.getElementById("board-title").textContent = copy.title;
  document.getElementById("step-text").textContent = copy.step;
  if (story) {
    document.getElementById("star-s").textContent = story.s;
    document.getElementById("star-t").textContent = story.t;
    document.getElementById("star-a").textContent = story.a;
    document.getElementById("star-r").textContent = story.r;
    document.getElementById("board-status").textContent = "SkillsAtlas Interview Board · confirmed practice-case evidence";
    document.getElementById("board-status-chip").textContent = "worker confirmed";
  } else {
    document.getElementById("star-s").textContent = "Practice preview — complete the Evidence screen first.";
    document.getElementById("star-t").textContent = "No worker-specific task is confirmed in this session.";
    document.getElementById("star-a").textContent = "No enriched claim is available for the Board.";
    document.getElementById("star-r").textContent = "Return to Evidence. Confirm or skip before using the Board.";
    document.getElementById("board-status").textContent = "SkillsAtlas Interview Board · seeded preview";
    document.getElementById("board-status-chip").textContent = "not worker-confirmed";
  }
  syncQuestion();
}

function pickRoute(pick, event) {
  if (event) event.stopPropagation();
  selectedRoute = pick;
  document.querySelectorAll("[data-route]").forEach((card) => card.classList.remove("sel"));
  document.querySelector("[data-route='" + pick + "']").classList.add("sel");
  syncBoard();
  go(4);
}

document.querySelectorAll("[data-pick]").forEach((button) => {
  button.addEventListener("click", (event) => pickRoute(button.dataset.pick, event));
});

document.querySelectorAll("[data-route]").forEach((card) => {
  card.addEventListener("click", () => pickRoute(card.dataset.route));
});

function bindGroup(id) {
  const buttons = [...document.querySelectorAll("#" + id + " .opt")];
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      buttons.forEach((item) => {
        item.classList.remove("on");
        item.setAttribute("aria-pressed", "false");
      });
      button.classList.add("on");
      button.setAttribute("aria-pressed", "true");
      syncQuestion();
    });
  });
}

bindGroup("stage");
bindGroup("who");

function settingLabel() {
  const stage = document.querySelector("#stage .opt.on");
  const who = document.querySelector("#who .opt.on");
  return (stage ? stage.textContent : "") + " · " + (who ? who.textContent : "");
}

function pdfPlain(value) {
  return String(value || "")
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/—/g, "-")
    .replace(/·/g, "-")
    .replace(/[^\x20-\x7E]/g, " ");
}

function pdfEscape(value) {
  return pdfPlain(value).replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
}

function wrapWords(text, maxChars) {
  const words = pdfPlain(text).split(/\s+/).filter(Boolean);
  const rows = [];
  let current = "";
  words.forEach((word) => {
    const next = current ? current + " " + word : word;
    if (next.length > maxChars && current) {
      rows.push(current);
      current = word;
    } else {
      current = next;
    }
  });
  if (current) rows.push(current);
  return rows.length ? rows : [""];
}

function boardDisclaimer() {
  if (evidenceState === "enriched") {
    return "Worker-confirmed practice-case wording only. We do not say they would be hired.";
  }
  if (evidenceState === "base") {
    return "Original confirmed CV wording only; skipped detail remains open. We do not say they would be hired.";
  }
  return "Seeded practice preview; no worker-specific evidence was confirmed in this session.";
}

function buildBoardPdfBytes() {
  const lines = [];
  function add(text, size, rgb, maxChars) {
    wrapWords(text, maxChars || 88).forEach((row) => lines.push({ text: row, size, rgb }));
  }

  add("SKILLSATLAS - INTERVIEW BOARD", 10, [237, 106, 74], 70);
  lines.push({ spacer: 8 });
  add(document.getElementById("board-title").textContent, 18, [16, 43, 63], 42);
  lines.push({ spacer: 6 });
  add(settingLabel(), 11, [73, 96, 109], 88);
  lines.push({ spacer: 10 });
  add("This week's step", 10, [237, 106, 74], 70);
  add(document.getElementById("step-text").textContent, 12, [16, 43, 63], 78);
  lines.push({ spacer: 10 });
  add("STAR story - Action is the long part", 10, [237, 106, 74], 70);
  const starChildren = [...document.querySelector("#board .star").children];
  for (let index = 0; index < starChildren.length; index += 2) {
    lines.push({ spacer: 6 });
    add(starChildren[index].textContent, 10, [237, 106, 74], 70);
    add(starChildren[index + 1] ? starChildren[index + 1].textContent : "", 11, [16, 43, 63], 82);
  }
  lines.push({ spacer: 12 });
  add("Question for this setting", 10, [237, 106, 74], 70);
  add(document.getElementById("pq").textContent, 12, [16, 43, 63], 78);
  lines.push({ spacer: 14 });
  add(boardDisclaimer(), 9, [73, 96, 109], 88);

  const operations = [];
  let y = 800;
  lines.forEach((item) => {
    if (item.spacer) {
      y -= item.spacer;
      return;
    }
    const red = (item.rgb[0] / 255).toFixed(3);
    const green = (item.rgb[1] / 255).toFixed(3);
    const blue = (item.rgb[2] / 255).toFixed(3);
    operations.push(red + " " + green + " " + blue + " rg");
    operations.push("BT /F1 " + item.size + " Tf 48 " + y + " Td (" + pdfEscape(item.text) + ") Tj ET");
    y -= item.size + 6;
  });

  const stream = operations.join("\n");
  function object(number, body) {
    return number + " 0 obj\n" + body + "\nendobj\n";
  }
  const chunks = [
    object(1, "<< /Type /Catalog /Pages 2 0 R >>"),
    object(2, "<< /Type /Pages /Kids [3 0 R] /Count 1 >>"),
    object(3, "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Resources << /Font << /F1 5 0 R >> >> /Contents 4 0 R >>"),
    object(4, "<< /Length " + stream.length + " >>\nstream\n" + stream + "\nendstream"),
    object(5, "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>"),
  ];
  let pdf = "%PDF-1.4\n";
  const offsets = [0];
  chunks.forEach((chunk) => {
    offsets.push(pdf.length);
    pdf += chunk;
  });
  const xrefAt = pdf.length;
  let xref = "xref\n0 6\n0000000000 65535 f \n";
  for (let index = 1; index <= 5; index += 1) {
    xref += String(offsets[index]).padStart(10, "0") + " 00000 n \n";
  }
  pdf += xref;
  pdf += "trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n" + xrefAt + "\n%%EOF";
  const bytes = new Uint8Array(pdf.length);
  for (let index = 0; index < pdf.length; index += 1) bytes[index] = pdf.charCodeAt(index) & 0xff;
  return bytes;
}

function downloadPdf(filename, bytes) {
  const blob = new Blob([bytes], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}

const pdfBtn = document.getElementById("btn-pdf");
const pdfState = document.getElementById("pdf-state");
pdfBtn.addEventListener("click", () => {
  pdfBtn.disabled = true;
  pdfState.textContent = "Saving PDF…";
  try {
    const bytes = buildBoardPdfBytes();
    if (bytes.length < 400) throw new Error("empty pdf");
    downloadPdf("SkillsAtlas-interview-board.pdf", bytes);
    pdfState.textContent = "Saved to your downloads.";
  } catch (error) {
    pdfState.textContent = "Could not save the PDF. Try again.";
  } finally {
    pdfBtn.disabled = false;
  }
});


/* Prepared practice helper — Screen 04, between the Board and the PDF row.
   Prepared strings only. No model call, no microphone, no scoring.
   Content is keyed on evidenceState so a skipped detail is never spoken back. */

const practiceCopy = {
  a: {
    enriched: {
      prepared:
        "On nights at one site, stock was my job. I looked after about 2,400 product lines in SAP and ran the monthly cycle counts from 2019 to 2024. If a count did not match, I recounted the location and checked the recent movements before it went out.",
      followup:
        "You said the monthly cycle counts were yours. Tell me about one count that did not match the system — what did you do next?",
      tips: [
        "Lead with the number and the system you confirmed — about 2,400 lines, in SAP. That is the part they can check.",
        "Put the Action in the middle and make it the longest part: what you actually did when a count was wrong.",
      ],
      guard: "Every line above uses wording the worker confirmed on the Evidence screen.",
    },
    base: {
      prepared:
        "Stock was my job on the night shift at one site. I managed stock day to day, and if something did not look right I checked it before it went out.",
      followup:
        "You said stock was the job on your shift. Talk me through what you did when something did not add up.",
      tips: [
        "You confirmed \u201Cmanaged stock\u201D. Practise standing over that. Do not add a number or system you did not confirm.",
        "If they ask for a figure you do not have, say what you can stand over and offer to check it.",
      ],
      guard: "Detail was skipped on the Evidence screen, so the helper stays on the original confirmed CV wording.",
    },
  },
  b: {
    enriched: {
      prepared:
        "When new starters came in, I helped them with the site safety paperwork — what the checklist covered and what they had to sign before they went out on the floor.",
      followup:
        "Tell me about a new starter who was unsure about the checklist. What did you explain first?",
      tips: [
        "You confirmed \u201Chelped new staff with safety paperwork\u201D. Stay on that — you are not claiming a team-lead title.",
        "Put the Action in the middle: what you showed them, and what they did next.",
      ],
      guard: "Every line above uses wording the worker confirmed on the Evidence screen.",
    },
    base: {
      prepared:
        "When new starters came in, I helped them with the site safety paperwork — what the checklist covered and what they had to sign before they went out on the floor.",
      followup:
        "Tell me about a new starter who was unsure about the checklist. What did you explain first?",
      tips: [
        "You confirmed \u201Chelped new staff with safety paperwork\u201D. Stay on that — you are not claiming a team-lead title.",
        "Put the Action in the middle: what you showed them, and what they did next.",
      ],
      guard: "The original confirmed CV wording is the only source for this route.",
    },
  },
};

const settingTips = {
  "screen-recruiter": "This is a phone screen with a recruiter. Keep it to about a minute, in plain words.",
  "screen-hm": "A hiring manager on the phone wants the short version. One minute, then stop and let them ask.",
  "first-recruiter": "A first interview is a conversation, not a screen. It is fine to take a breath before you answer.",
  "first-hm": "A hiring manager in a first interview wants what you did, not the job description.",
  "panel-recruiter": "On a panel, name the setting first so people outside warehouse work can follow you.",
  "panel-hm": "On a panel, say the task once, clearly, then give the example.",
};

const helperRound = document.getElementById("helper-round");
const helperBlock = document.getElementById("helper-block");
const helperReply = document.getElementById("helper-reply");
const helperYou = document.getElementById("helper-you");
const helperYouText = document.getElementById("helper-you-text");
const helperQuestion = document.getElementById("helper-question");
const helperFollowup = document.getElementById("helper-followup");
const helperTips = document.getElementById("helper-tips");
const helperGuard = document.getElementById("helper-guard");
const helperAnswer = document.getElementById("helper-answer");
const btnPractice = document.getElementById("btn-practice");
const btnPrepared = document.getElementById("btn-prepared");
const btnSend = document.getElementById("btn-send");
const practiceState = document.getElementById("practice-state");

let practiceOpen = false;
let practiceReplied = false;
let lastPrepared = "";

function practiceCopyNow() {
  return practiceCopy[selectedRoute][evidenceState === "enriched" ? "enriched" : "base"];
}

function renderHelperQuestion() {
  helperQuestion.textContent = questions[selectedRoute][settingKey()];
}

function renderHelperReply() {
  const copy = practiceCopyNow();
  helperFollowup.textContent = copy.followup;
  helperTips.textContent = "";
  copy.tips.concat([settingTips[settingKey()]]).forEach((tip) => {
    const item = document.createElement("li");
    item.textContent = tip;
    helperTips.appendChild(item);
  });
  helperGuard.textContent = copy.guard;
}

function resetPractice() {
  practiceOpen = false;
  practiceReplied = false;
  lastPrepared = "";
  if (!helperRound) return;
  if (helperAnswer) helperAnswer.value = "";
  if (helperYouText) helperYouText.textContent = "";
  hideEl(helperYou);
  hideEl(helperReply);
  hideEl(helperRound);
  hideEl(helperBlock);
  practiceState.textContent = "One round, about twenty seconds. The Board and the PDF do not change.";
}

function syncHelper() {
  if (!helperRound) return;
  if (!boardIsConfirmed()) {
    hideEl(helperRound);
    hideEl(helperYou);
    hideEl(helperReply);
    if (practiceOpen) showEl(helperBlock);
    return;
  }
  hideEl(helperBlock);
  if (!practiceOpen) return;
  renderHelperQuestion();
  if (helperAnswer.value === lastPrepared) {
    helperAnswer.value = practiceCopyNow().prepared;
    lastPrepared = helperAnswer.value;
    if (helperYouText) helperYouText.textContent = lastPrepared;
  }
  if (practiceReplied) renderHelperReply();
}

function openPractice() {
  practiceOpen = true;
  if (!boardIsConfirmed()) {
    hideEl(helperRound);
    showEl(helperBlock);
    practiceState.textContent = "No confirmed evidence in this session — nothing to practise yet.";
    return;
  }
  hideEl(helperBlock);
  renderHelperQuestion();
  hideEl(helperYou);
  hideEl(helperReply);
  practiceReplied = false;
  showEl(helperRound);
  practiceState.textContent = "Reply in the thread, or show a prepared answer.";
  helperRound.scrollIntoView({ behavior: "smooth", block: "center" });
}

function showPracticeReply() {
  if (!boardIsConfirmed()) return;
  const spoken = helperAnswer.value.trim();
  if (helperYouText) helperYouText.textContent = spoken;
  helperYou.classList.add("helper-msg-in");
  helperReply.classList.add("helper-msg-in");
  showEl(helperYou);
  renderHelperReply();
  showEl(helperReply);
  practiceReplied = true;
  practiceState.textContent = "Prepared round. The Interview Board and the PDF are unchanged.";
  helperReply.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

btnPractice.addEventListener("click", openPractice);

btnPrepared.addEventListener("click", () => {
  if (!boardIsConfirmed()) return;
  helperAnswer.value = practiceCopyNow().prepared;
  lastPrepared = helperAnswer.value;
  showPracticeReply();
});

btnSend.addEventListener("click", () => {
  if (!boardIsConfirmed()) return;
  if (!helperAnswer.value.trim()) {
    practiceState.textContent = "Type a line first, or tap Show a prepared answer.";
    helperAnswer.focus();
    return;
  }
  lastPrepared = "";
  showPracticeReply();
});

resetEvidence();
