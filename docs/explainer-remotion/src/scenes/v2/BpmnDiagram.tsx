import React from "react";
import { colors } from "../../theme";
import {
  NODES,
  PHASES,
  VB,
  buildEdgeGeoms,
  nodeById,
  pointAlong,
  type PhaseId,
  type ProcessNode,
} from "./processData";

const EDGE_GEOMS = buildEdgeGeoms();

function kindColors(kind: ProcessNode["kind"]) {
  switch (kind) {
    case "ai":
      return {
        fill: colors.aiFill,
        border: colors.aiBorder,
        tagBg: colors.teal,
        tagFg: "#fff",
        glow: colors.aiGlow,
        badge: colors.teal,
      };
    case "human":
      return {
        fill: colors.humanFill,
        border: colors.humanBorder,
        tagBg: colors.human,
        tagFg: "#fff",
        glow: colors.humanGlow,
        badge: colors.human,
      };
    case "code":
      return {
        fill: colors.codeFill,
        border: colors.codeBorder,
        tagBg: colors.code,
        tagFg: "#fff",
        glow: "rgba(73,96,109,0.35)",
        badge: colors.code,
      };
    case "start":
      return {
        fill: "#fff",
        border: colors.start,
        tagBg: colors.start,
        tagFg: "#fff",
        glow: "rgba(138,155,165,0.35)",
        badge: colors.start,
      };
    case "end":
      return {
        fill: colors.humanFill,
        border: colors.end,
        tagBg: colors.end,
        tagFg: "#fff",
        glow: colors.humanGlow,
        badge: colors.end,
      };
  }
}

const TaskNode: React.FC<{
  node: ProcessNode;
  state: "pending" | "active" | "completed";
}> = ({ node, state }) => {
  const c = kindColors(node.kind);
  const isRound = node.kind === "start" || node.kind === "end";
  const opacity = state === "pending" ? 0.55 : 1;
  const strokeW = state === "active" ? 4 : state === "completed" ? 2.5 : 2;
  const glow =
    state === "active"
      ? `drop-shadow(0 0 14px ${c.glow})`
      : "none";

  // Soft coral outline for active AI nodes
  const activeOutline =
    state === "active" && node.kind === "ai"
      ? colors.accent
      : c.border;

  if (isRound) {
    const r = node.w / 2;
    const cx = node.x + r;
    const cy = node.y + r;
    return (
      <g opacity={opacity} style={{ filter: glow }}>
        <circle
          cx={cx}
          cy={cy}
          r={r - (node.kind === "end" ? 3 : 0)}
          fill={c.fill}
          stroke={activeOutline}
          strokeWidth={strokeW}
        />
        {node.kind === "end" && (
          <circle
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke={c.border}
            strokeWidth={2}
          />
        )}
        <text
          x={cx}
          y={cy + r + 22}
          textAnchor="middle"
          fill={colors.textDark}
          fontSize={15}
          fontWeight={700}
        >
          {node.label}
        </text>
        {state === "completed" && (
          <text
            x={cx}
            y={cy + 6}
            textAnchor="middle"
            fill={c.badge}
            fontSize={22}
            fontWeight={700}
          >
            ✓
          </text>
        )}
      </g>
    );
  }

  const rx = 10;
  return (
    <g opacity={opacity} style={{ filter: glow }}>
      <rect
        x={node.x}
        y={node.y}
        width={node.w}
        height={node.h}
        rx={rx}
        fill={c.fill}
        stroke={activeOutline}
        strokeWidth={strokeW}
      />
      {state === "active" && (
        <rect
          x={node.x - 3}
          y={node.y - 3}
          width={node.w + 6}
          height={node.h + 6}
          rx={rx + 2}
          fill="none"
          stroke={node.kind === "ai" ? colors.accent : c.border}
          strokeWidth={1.5}
          opacity={0.45}
        />
      )}
      <rect
        x={node.x + 12}
        y={node.y + 10}
        width={52}
        height={20}
        rx={6}
        fill={c.tagBg}
      />
      <text
        x={node.x + 38}
        y={node.y + 25}
        textAnchor="middle"
        fill={c.tagFg}
        fontSize={12}
        fontWeight={700}
        letterSpacing={0.6}
      >
        {node.sub}
      </text>
      <text
        x={node.x + node.w / 2}
        y={node.y + 52}
        textAnchor="middle"
        fill={colors.textDark}
        fontSize={18}
        fontWeight={700}
      >
        {node.label}
      </text>
      {state === "completed" && (
        <circle
          cx={node.x + node.w - 16}
          cy={node.y + 16}
          r={10}
          fill={c.badge}
        />
      )}
      {state === "completed" && (
        <text
          x={node.x + node.w - 16}
          y={node.y + 21}
          textAnchor="middle"
          fill="#fff"
          fontSize={13}
          fontWeight={700}
        >
          ✓
        </text>
      )}
    </g>
  );
};

export const BpmnDiagram: React.FC<{
  activeNodeId: string;
  completedIds: Set<string>;
  pathProgress: number;
  phase: PhaseId;
  dimmed?: boolean;
}> = ({ activeNodeId, completedIds, pathProgress, phase, dimmed }) => {
  const tokenPt = (() => {
    const { edges, total } = EDGE_GEOMS;
    const dist = pathProgress * total;
    for (const eg of edges) {
      if (dist <= eg.cumEnd || eg === edges[edges.length - 1]) {
        const u = (dist - eg.cumStart) / eg.length;
        return pointAlong(eg.points, Math.max(0, Math.min(1, u)));
      }
    }
    const last = nodeById("end");
    return { x: last.x + last.w / 2, y: last.y + last.h / 2 };
  })();

  const litEdges = EDGE_GEOMS.edges.map((eg) => {
    const start = eg.cumStart / EDGE_GEOMS.total;
    const end = eg.cumEnd / EDGE_GEOMS.total;
    if (pathProgress <= start) return { ...eg, draw: 0 };
    if (pathProgress >= end) return { ...eg, draw: 1 };
    return { ...eg, draw: (pathProgress - start) / (end - start) };
  });

  return (
    <svg
      viewBox={`-120 0 ${VB.w + 120} ${VB.h}`}
      width="100%"
      height="100%"
      style={{
        display: "block",
        opacity: dimmed ? 0.22 : 1,
      }}
    >
      {PHASES.map((p, i) => {
        const nextY = PHASES[i + 1]?.y ?? VB.h - 20;
        const active = p.id === phase;
        return (
          <g key={p.id}>
            <rect
              x={8}
              y={p.y}
              width={VB.w - 32}
              height={nextY - p.y - 16}
              rx={12}
              fill={active ? "rgba(30,93,94,0.07)" : "rgba(16,43,63,0.025)"}
              stroke={active ? "rgba(237,106,74,0.35)" : "rgba(16,43,63,0.08)"}
              strokeWidth={2}
              strokeDasharray={active ? undefined : "8 8"}
            />
            <text
              x={8}
              y={p.y + 36}
              fill={active ? colors.accent : colors.textDarkMuted}
              fontSize={18}
              fontWeight={800}
              letterSpacing={1.2}
            >
              {p.label}
            </text>
          </g>
        );
      })}

      {EDGE_GEOMS.edges.map((eg) => (
        <path
          key={`base-${eg.from}-${eg.to}`}
          d={eg.d}
          fill="none"
          stroke={colors.flow}
          strokeWidth={3}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={0.35}
        />
      ))}

      {litEdges.map((eg) => (
        <path
          key={`lit-${eg.from}-${eg.to}`}
          d={eg.d}
          fill="none"
          stroke={colors.teal}
          strokeWidth={4}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={eg.length}
          strokeDashoffset={eg.length * (1 - eg.draw)}
          opacity={0.95}
        />
      ))}

      <defs>
        <marker
          id="arrow"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="7"
          markerHeight="7"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill={colors.flow} opacity={0.5} />
        </marker>
      </defs>

      {NODES.map((n) => {
        let state: "pending" | "active" | "completed" = "pending";
        if (completedIds.has(n.id) && n.id !== activeNodeId) state = "completed";
        if (n.id === activeNodeId) state = "active";
        return <TaskNode key={n.id} node={n} state={state} />;
      })}

      <g>
        <circle
          cx={tokenPt.x}
          cy={tokenPt.y}
          r={16}
          fill={colors.token}
          stroke="#fff"
          strokeWidth={3}
          opacity={0.95}
          style={{
            filter: `drop-shadow(0 0 12px ${colors.tokenGlow})`,
          }}
        />
        <circle cx={tokenPt.x} cy={tokenPt.y} r={6} fill="#fff" opacity={0.9} />
      </g>
    </svg>
  );
};
