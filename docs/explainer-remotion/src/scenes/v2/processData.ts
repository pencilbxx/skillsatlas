/**
 * Explainer-critical BPMN path (simplified from Camunda diagram).
 * Stripped: Load CV, Weak-claims gateway + bypass, Skip/fold gateways,
 * sticky notes, Camunda chrome, developer comments.
 */

export type NodeKind = "start" | "end" | "code" | "ai" | "human";
export type PhaseId = "CAPTURE" | "QUESTIONING" | "TWO ROUTES" | "BOARD";
export type VignetteKind =
  | "parse-cv"
  | "write-questions"
  | "fold-answers"
  | "esco-search"
  | "pick-2-routes"
  | "explain-routes"
  | "star-board"
  | "practice-helper";

export type ProcessNode = {
  id: string;
  label: string;
  sub?: string;
  kind: NodeKind;
  phase: PhaseId;
  x: number;
  y: number;
  w: number;
  h: number;
  vignette?: VignetteKind;
};

/** Diagram coordinate space (SVG viewBox) */
export const VB = { w: 1680, h: 920 };

export const PHASES: Array<{
  id: PhaseId;
  label: string;
  y: number;
  focusY: number;
}> = [
  { id: "CAPTURE", label: "CAPTURE", y: 28, focusY: 140 },
  { id: "QUESTIONING", label: "QUESTIONING", y: 248, focusY: 360 },
  { id: "TWO ROUTES", label: "TWO ROUTES", y: 468, focusY: 580 },
  { id: "BOARD", label: "BOARD + PRACTICE", y: 688, focusY: 800 },
];

const NW = 168;
const NH = 72;
const NW_WIDE = 188;

export const NODES: ProcessNode[] = [
  // CAPTURE
  {
    id: "cv-in",
    label: "CV in",
    kind: "start",
    phase: "CAPTURE",
    x: 70,
    y: 118,
    w: 64,
    h: 64,
  },
  {
    id: "parse",
    label: "Parse",
    sub: "AI",
    kind: "ai",
    phase: "CAPTURE",
    x: 200,
    y: 110,
    w: NW,
    h: NH,
    vignette: "parse-cv",
  },
  {
    id: "guard1",
    label: "Guard",
    sub: "CODE",
    kind: "code",
    phase: "CAPTURE",
    x: 420,
    y: 110,
    w: NW,
    h: NH,
  },
  {
    id: "confirm",
    label: "Confirm",
    sub: "HUMAN",
    kind: "human",
    phase: "CAPTURE",
    x: 640,
    y: 110,
    w: NW,
    h: NH,
  },
  {
    id: "score",
    label: "Score",
    sub: "CODE",
    kind: "code",
    phase: "CAPTURE",
    x: 860,
    y: 110,
    w: NW,
    h: NH,
  },
  // QUESTIONING
  {
    id: "write-q",
    label: "Write questions",
    sub: "AI",
    kind: "ai",
    phase: "QUESTIONING",
    x: 200,
    y: 330,
    w: NW_WIDE,
    h: NH,
    vignette: "write-questions",
  },
  {
    id: "guard2",
    label: "Guard",
    sub: "CODE",
    kind: "code",
    phase: "QUESTIONING",
    x: 450,
    y: 330,
    w: NW,
    h: NH,
  },
  {
    id: "answer",
    label: "Answer / Skip",
    sub: "HUMAN",
    kind: "human",
    phase: "QUESTIONING",
    x: 670,
    y: 330,
    w: NW_WIDE,
    h: NH,
  },
  {
    id: "fold",
    label: "Fold",
    sub: "AI",
    kind: "ai",
    phase: "QUESTIONING",
    x: 920,
    y: 330,
    w: NW,
    h: NH,
    vignette: "fold-answers",
  },
  // TWO ROUTES
  {
    id: "esco",
    label: "ESCO search",
    sub: "CODE",
    kind: "code",
    phase: "TWO ROUTES",
    x: 210,
    y: 550,
    w: NW_WIDE,
    h: NH,
    vignette: "esco-search",
  },
  {
    id: "pick2",
    label: "Pick 2 routes",
    sub: "CODE",
    kind: "code",
    phase: "TWO ROUTES",
    x: 460,
    y: 550,
    w: NW_WIDE,
    h: NH,
    vignette: "pick-2-routes",
  },
  {
    id: "explain",
    label: "Explain",
    sub: "AI",
    kind: "ai",
    phase: "TWO ROUTES",
    x: 710,
    y: 550,
    w: NW,
    h: NH,
    vignette: "explain-routes",
  },
  {
    id: "choose",
    label: "Choose",
    sub: "HUMAN",
    kind: "human",
    phase: "TWO ROUTES",
    x: 930,
    y: 550,
    w: NW,
    h: NH,
  },
  {
    id: "join",
    label: "Join courses",
    sub: "CODE",
    kind: "code",
    phase: "TWO ROUTES",
    x: 1150,
    y: 550,
    w: NW_WIDE,
    h: NH,
  },
  // BOARD
  {
    id: "commit",
    label: "Commit step",
    sub: "HUMAN",
    kind: "human",
    phase: "BOARD",
    x: 220,
    y: 770,
    w: NW_WIDE,
    h: NH,
  },
  {
    id: "adviser",
    label: "Adviser + STAR",
    sub: "AI",
    kind: "ai",
    phase: "BOARD",
    x: 480,
    y: 770,
    w: NW_WIDE,
    h: NH,
    vignette: "star-board",
  },
  {
    id: "practice",
    label: "Practice helper",
    sub: "AI",
    kind: "ai",
    phase: "BOARD",
    x: 740,
    y: 770,
    w: 210,
    h: NH,
    vignette: "practice-helper",
  },
  {
    id: "end",
    label: "Leave with PDF",
    kind: "end",
    phase: "BOARD",
    x: 1020,
    y: 778,
    w: 72,
    h: 72,
  },
];

export type Edge = { from: string; to: string };

export const EDGES: Edge[] = [
  { from: "cv-in", to: "parse" },
  { from: "parse", to: "guard1" },
  { from: "guard1", to: "confirm" },
  { from: "confirm", to: "score" },
  { from: "score", to: "write-q" },
  { from: "write-q", to: "guard2" },
  { from: "guard2", to: "answer" },
  { from: "answer", to: "fold" },
  { from: "fold", to: "esco" },
  { from: "esco", to: "pick2" },
  { from: "pick2", to: "explain" },
  { from: "explain", to: "choose" },
  { from: "choose", to: "join" },
  { from: "join", to: "commit" },
  { from: "commit", to: "adviser" },
  { from: "adviser", to: "practice" },
  { from: "practice", to: "end" },
];

export function nodeCenter(n: ProcessNode): { x: number; y: number } {
  return { x: n.x + n.w / 2, y: n.y + n.h / 2 };
}

export function nodeById(id: string): ProcessNode {
  const n = NODES.find((x) => x.id === id);
  if (!n) throw new Error(`Unknown node ${id}`);
  return n;
}

/** Orthogonal-ish waypoints between two nodes (for SVG path + token). */
export function edgeWaypoints(fromId: string, toId: string): Array<{ x: number; y: number }> {
  const a = nodeById(fromId);
  const b = nodeById(toId);
  const ac = nodeCenter(a);
  const bc = nodeCenter(b);

  // Same row: straight left→right from right edge to left edge
  if (a.phase === b.phase) {
    return [
      { x: a.x + a.w, y: ac.y },
      { x: b.x, y: bc.y },
    ];
  }

  // Down to next phase: exit bottom, elbow, enter top/left
  const midY = (ac.y + bc.y) / 2;
  return [
    { x: ac.x, y: a.y + a.h },
    { x: ac.x, y: midY },
    { x: bc.x, y: midY },
    { x: bc.x, y: b.y },
  ];
}

export function pathLength(points: Array<{ x: number; y: number }>): number {
  let len = 0;
  for (let i = 1; i < points.length; i++) {
    const dx = points[i].x - points[i - 1].x;
    const dy = points[i].y - points[i - 1].y;
    len += Math.hypot(dx, dy);
  }
  return len;
}

export function pointAlong(
  points: Array<{ x: number; y: number }>,
  t: number,
): { x: number; y: number } {
  if (points.length === 0) return { x: 0, y: 0 };
  if (points.length === 1) return points[0];
  const total = pathLength(points);
  if (total === 0) return points[0];
  let dist = Math.max(0, Math.min(1, t)) * total;
  for (let i = 1; i < points.length; i++) {
    const dx = points[i].x - points[i - 1].x;
    const dy = points[i].y - points[i - 1].y;
    const seg = Math.hypot(dx, dy);
    if (dist <= seg || i === points.length - 1) {
      const u = seg === 0 ? 0 : dist / seg;
      return {
        x: points[i - 1].x + dx * u,
        y: points[i - 1].y + dy * u,
      };
    }
    dist -= seg;
  }
  return points[points.length - 1];
}

export function pointsToPath(points: Array<{ x: number; y: number }>): string {
  if (points.length === 0) return "";
  return points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`)
    .join(" ");
}

/** Build cumulative edge lengths for token travel 0→1 */
export type EdgeGeom = {
  from: string;
  to: string;
  points: Array<{ x: number; y: number }>;
  d: string;
  length: number;
  cumStart: number;
  cumEnd: number;
};

export function buildEdgeGeoms(): { edges: EdgeGeom[]; total: number } {
  const edges: EdgeGeom[] = [];
  let cum = 0;
  for (const e of EDGES) {
    const points = edgeWaypoints(e.from, e.to);
    const length = Math.max(1, pathLength(points));
    edges.push({
      from: e.from,
      to: e.to,
      points,
      d: pointsToPath(points),
      length,
      cumStart: cum,
      cumEnd: cum + length,
    });
    cum += length;
  }
  return { edges, total: cum };
}

/**
 * Timeline for the diagram scene.
 * Reading pauses sit on the node before a cutaway opens.
 * Token hops stay short. Captions do not change mid-hop.
 */
export type Beat =
  | { type: "travel"; fromNode: string; toNode: string; frames: number }
  | { type: "dwell"; nodeId: string; frames: number }
  | { type: "vignette"; nodeId: string; kind: VignetteKind; frames: number };

export const DIAGRAM_BEATS: Beat[] = [
  { type: "dwell", nodeId: "cv-in", frames: 42 },
  { type: "travel", fromNode: "cv-in", toNode: "parse", frames: 22 },
  { type: "dwell", nodeId: "parse", frames: 30 },
  { type: "vignette", nodeId: "parse", kind: "parse-cv", frames: 64 },
  { type: "travel", fromNode: "parse", toNode: "guard1", frames: 18 },
  { type: "dwell", nodeId: "guard1", frames: 46 },
  { type: "travel", fromNode: "guard1", toNode: "confirm", frames: 18 },
  { type: "dwell", nodeId: "confirm", frames: 62 },
  { type: "travel", fromNode: "confirm", toNode: "score", frames: 18 },
  { type: "dwell", nodeId: "score", frames: 46 },
  { type: "travel", fromNode: "score", toNode: "write-q", frames: 12 },
  { type: "dwell", nodeId: "write-q", frames: 30 },
  { type: "vignette", nodeId: "write-q", kind: "write-questions", frames: 90 },
  { type: "travel", fromNode: "write-q", toNode: "guard2", frames: 18 },
  { type: "dwell", nodeId: "guard2", frames: 40 },
  { type: "travel", fromNode: "guard2", toNode: "answer", frames: 18 },
  { type: "dwell", nodeId: "answer", frames: 60 },
  { type: "travel", fromNode: "answer", toNode: "fold", frames: 18 },
  { type: "dwell", nodeId: "fold", frames: 32 },
  { type: "vignette", nodeId: "fold", kind: "fold-answers", frames: 104 },
  { type: "travel", fromNode: "fold", toNode: "esco", frames: 12 },
  { type: "dwell", nodeId: "esco", frames: 20 },
  { type: "vignette", nodeId: "esco", kind: "esco-search", frames: 114 },
  { type: "travel", fromNode: "esco", toNode: "pick2", frames: 18 },
  { type: "dwell", nodeId: "pick2", frames: 24 },
  { type: "vignette", nodeId: "pick2", kind: "pick-2-routes", frames: 84 },
  { type: "travel", fromNode: "pick2", toNode: "explain", frames: 18 },
  { type: "dwell", nodeId: "explain", frames: 22 },
  { type: "vignette", nodeId: "explain", kind: "explain-routes", frames: 132 },
  { type: "travel", fromNode: "explain", toNode: "choose", frames: 18 },
  { type: "dwell", nodeId: "choose", frames: 46 },
  { type: "travel", fromNode: "choose", toNode: "join", frames: 18 },
  { type: "dwell", nodeId: "join", frames: 44 },
  { type: "travel", fromNode: "join", toNode: "commit", frames: 12 },
  { type: "dwell", nodeId: "commit", frames: 36 },
  { type: "travel", fromNode: "commit", toNode: "adviser", frames: 14 },
  { type: "dwell", nodeId: "adviser", frames: 20 },
  { type: "vignette", nodeId: "adviser", kind: "star-board", frames: 84 },
  { type: "travel", fromNode: "adviser", toNode: "practice", frames: 12 },
  { type: "dwell", nodeId: "practice", frames: 20 },
  { type: "vignette", nodeId: "practice", kind: "practice-helper", frames: 120 },
  { type: "travel", fromNode: "practice", toNode: "end", frames: 12 },
  { type: "dwell", nodeId: "end", frames: 72 },
];

export function beatsTotalFrames(beats: Beat[] = DIAGRAM_BEATS): number {
  return beats.reduce((s, b) => s + b.frames, 0);
}

export type TimelineState = {
  activeNodeId: string;
  completedIds: Set<string>;
  /** 0..1 along full process path (token position) */
  pathProgress: number;
  phase: PhaseId;
  vignette: VignetteKind | null;
  vignetteLocalFrame: number;
  vignetteLength: number;
  traveling: boolean;
  beatLocalFrame: number;
  /** Frames since this node's caption started (travel-in + dwell + cutaway). */
  captionHoldFrame: number;
};

function beatTargetNode(beat: Beat): string {
  return beat.type === "travel" ? beat.toNode : beat.nodeId;
}

function captionHoldAt(frame: number, activeNodeId: string): number {
  let t = 0;
  let holdStart = 0;
  let current = NODES[0].id;
  for (const beat of DIAGRAM_BEATS) {
    const next = beatTargetNode(beat);
    if (next !== current) {
      current = next;
      holdStart = t;
    }
    if (frame < t + beat.frames) {
      return current === activeNodeId ? frame - holdStart : 0;
    }
    t += beat.frames;
  }
  return 0;
}

export function resolveTimeline(frame: number): TimelineState {
  const { edges, total } = buildEdgeGeoms();
  const edgeIndex = (from: string, to: string) =>
    edges.findIndex((e) => e.from === from && e.to === to);

  let t = 0;
  let pathProgress = 0;
  let activeNodeId = NODES[0].id;
  const completed = new Set<string>();
  let vignette: VignetteKind | null = null;
  let vignetteLocalFrame = 0;
  let vignetteLength = 0;
  let traveling = false;

  // Mark progress: when we finish dwell/vignette on a node, it becomes completed
  // as we leave; during dwell it's active.

  for (const beat of DIAGRAM_BEATS) {
    const start = t;
    const end = t + beat.frames;
    if (frame < end) {
      const local = frame - start;
      if (beat.type === "dwell") {
        activeNodeId = beat.nodeId;
        traveling = false;
        // path at node center: end of previous edge or start
        const idx = NODES.findIndex((n) => n.id === beat.nodeId);
        if (idx <= 0) pathProgress = 0;
        else {
          const prevEdge = edges[idx - 1];
          pathProgress = prevEdge ? prevEdge.cumEnd / total : 0;
        }
      } else if (beat.type === "vignette") {
        activeNodeId = beat.nodeId;
        traveling = false;
        vignette = beat.kind;
        vignetteLocalFrame = local;
        vignetteLength = beat.frames;
        const idx = NODES.findIndex((n) => n.id === beat.nodeId);
        if (idx <= 0) pathProgress = 0;
        else {
          const prevEdge = edges[idx - 1];
          pathProgress = prevEdge ? prevEdge.cumEnd / total : 0;
        }
      } else {
        traveling = true;
        activeNodeId = beat.toNode;
        const ei = edgeIndex(beat.fromNode, beat.toNode);
        const eg = edges[ei];
        const u = beat.frames <= 1 ? 1 : local / beat.frames;
        if (eg) {
          pathProgress = (eg.cumStart + eg.length * u) / total;
        }
        // fromNode completed once travel starts
        completed.add(beat.fromNode);
      }
      // all nodes before active that we've passed
      const activeIdx = NODES.findIndex((n) => n.id === activeNodeId);
      for (let i = 0; i < activeIdx; i++) completed.add(NODES[i].id);
      if (!traveling && beat.type !== "travel") {
        // during dwell/vignette, previous nodes completed
      }

      const node = nodeById(activeNodeId);
      return {
        activeNodeId,
        completedIds: completed,
        pathProgress,
        phase: node.phase,
        vignette,
        vignetteLocalFrame,
        vignetteLength,
        traveling,
        beatLocalFrame: local,
        captionHoldFrame: captionHoldAt(frame, activeNodeId),
      };
    }

    // beat finished — advance completed
    if (beat.type === "dwell" || beat.type === "vignette") {
      completed.add(beat.nodeId);
      const idx = NODES.findIndex((n) => n.id === beat.nodeId);
      if (idx <= 0) pathProgress = 0;
      else {
        const prevEdge = edges[idx - 1];
        pathProgress = prevEdge ? prevEdge.cumEnd / total : 0;
      }
      activeNodeId = beat.nodeId;
    } else {
      completed.add(beat.fromNode);
      const ei = edgeIndex(beat.fromNode, beat.toNode);
      const eg = edges[ei];
      if (eg) pathProgress = eg.cumEnd / total;
      activeNodeId = beat.toNode;
    }
    t = end;
  }

  // past end
  for (const n of NODES) completed.add(n.id);
  return {
    activeNodeId: "end",
    completedIds: completed,
    pathProgress: 1,
    phase: "BOARD",
    vignette: null,
    vignetteLocalFrame: 0,
    vignetteLength: 0,
    traveling: false,
    beatLocalFrame: 0,
    captionHoldFrame: 0,
  };
}

export const DIAGRAM_DURATION = beatsTotalFrames();

export type VignetteSequence = {
  kind: VignetteKind;
  nodeId: string;
  from: number;
  frames: number;
};

/** Absolute start frames (within diagram scene) for AI cutaway Sequences */
export function getVignetteSequences(beats: Beat[] = DIAGRAM_BEATS): VignetteSequence[] {
  const out: VignetteSequence[] = [];
  let t = 0;
  for (const beat of beats) {
    if (beat.type === "vignette") {
      out.push({
        kind: beat.kind,
        nodeId: beat.nodeId,
        from: t,
        frames: beat.frames,
      });
    }
    t += beat.frames;
  }
  return out;
}

export const VIGNETTE_SEQUENCES = getVignetteSequences();

/** Back-row captions. Short. Simple English. One idea per step. */
export const STEP_CAPTIONS: Record<string, string> = {
  parse: "The system reads the CV and lists claims it can check.",
  guard1: "A rule check. No made-up facts. No private traits.",
  confirm: "The worker says yes to a line — or skips. Skip is free.",
  score: "Code scores how strong each confirmed line is.",
  "write-q": "A weak line gets one clear question. Not a long form.",
  // Same words as guard1 so the bar does not blink on a repeat check.
  guard2: "A rule check. No made-up facts. No private traits.",
  answer: "They answer in their own words, or they skip.",
  fold: "If they confirm it, the weak line becomes a stronger claim.",
  esco: "Code looks up official European job names for those skills.",
  pick2: "Code keeps two reachable routes. The worker will choose.",
  explain: "It shows the route in plain words, plus an example course.",
  choose: "The worker picks one of the two routes.",
  join: "Code adds an example course. It is not a booked place.",
  commit: "They pick one next step for this week.",
  adviser: "The Interview Board. A story they can stand over.",
  practice: "They practise saying it. The helper does not score them.",
  end: "They take the Interview Board as a PDF.",
};

export function captionForNode(nodeId: string): string {
  return STEP_CAPTIONS[nodeId] ?? "";
}

export type CaptionState = {
  text: string;
  prevText: string;
  sinceChange: number;
};

/**
 * Caption follows the settled step, not the token hop.
 * Travel keeps the previous line so the bar does not blink mid-move.
 */
export function getCaptionState(frame: number): CaptionState {
  let t = 0;
  let text = "";
  let prevText = "";
  let changeAt = 0;

  for (const beat of DIAGRAM_BEATS) {
    if (frame < t) break;
    const nodeId = beat.type === "travel" ? beat.fromNode : beat.nodeId;
    const next = STEP_CAPTIONS[nodeId] ?? "";
    if (next !== text) {
      if (next === "") {
        // keep the last readable line through hops with no copy
      } else {
        prevText = text;
        text = next;
        changeAt = t;
      }
    }
    t += beat.frames;
  }

  return {
    text,
    prevText,
    sinceChange: Math.max(0, frame - changeAt),
  };
}
