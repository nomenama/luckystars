"use client";

import { useState } from "react";

interface ConstellationBoardProps {
  numbers: string[];
  stars: string[];
}

// Fixed positions (in a 0-100 viewBox) so the numbers/stars read like a
// hand-charted constellation rather than a neat, generic grid of chips.
const NUMBER_POSITIONS = [
  { x: 8, y: 55 },
  { x: 27, y: 20 },
  { x: 50, y: 62 },
  { x: 71, y: 15 },
  { x: 92, y: 48 },
];

const STAR_POSITIONS = [
  { x: 38, y: 88 },
  { x: 63, y: 90 },
];

export default function ConstellationBoard({ numbers, stars }: ConstellationBoardProps) {
  const [active, setActive] = useState<string | null>(null);

  const numberNodes = numbers.map((value, i) => ({
    id: `n-${i}`,
    value,
    kind: "number" as const,
    ...NUMBER_POSITIONS[i % NUMBER_POSITIONS.length],
  }));
  const starNodes = stars.map((value, i) => ({
    id: `s-${i}`,
    value,
    kind: "star" as const,
    ...STAR_POSITIONS[i % STAR_POSITIONS.length],
  }));
  const allNodes = [...numberNodes, ...starNodes];

  return (
    <div className="relative mx-auto w-full max-w-3xl">
      <svg
        viewBox="0 0 100 100"
        className="w-full overflow-visible"
        role="img"
        aria-label={`Winning numbers ${numbers.join(", ")} with lucky stars ${stars.join(" and ")}`}
      >
        {/* faint constellation lines connecting every ball in draw order */}
        {allNodes.slice(0, -1).map((node, i) => {
          const next = allNodes[i + 1];
          return (
            <line
              key={`line-${node.id}`}
              x1={node.x}
              y1={node.y}
              x2={next.x}
              y2={next.y}
              stroke="url(#lineGradient)"
              strokeWidth="0.25"
              strokeDasharray="1.2 1.4"
              className="opacity-40"
            />
          );
        })}

        <defs>
          <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#6FC3DF" />
            <stop offset="100%" stopColor="#F2C94C" />
          </linearGradient>
        </defs>

        {numberNodes.map((node, i) => (
          <g key={node.id}>
            <circle
              cx={node.x}
              cy={node.y}
              r={active === node.id ? 8.5 : 7.5}
              className="cursor-pointer fill-nebula-light stroke-comet transition-[r] duration-200 ease-out"
              strokeWidth="0.4"
              style={{
                filter:
                  active === node.id
                    ? "drop-shadow(0 0 6px rgba(111,195,223,0.85))"
                    : "drop-shadow(0 0 3px rgba(111,195,223,0.35))",
                animationDelay: `${i * 0.4}s`,
              }}
              tabIndex={0}
              role="button"
              aria-label={`Number ${node.value}`}
              onMouseEnter={() => setActive(node.id)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(node.id)}
              onBlur={() => setActive(null)}
            />
            <text
              x={node.x}
              y={node.y + 2.6}
              textAnchor="middle"
              className="pointer-events-none select-none fill-cream font-mono text-[6px] font-medium"
            >
              {node.value}
            </text>
          </g>
        ))}

        {starNodes.map((node, i) => (
          <g key={node.id} className="animate-twinkle" style={{ animationDelay: `${i * 0.9}s` }}>
            <circle
              cx={node.x}
              cy={node.y}
              r={active === node.id ? 8.5 : 7.5}
              className="cursor-pointer fill-gold/90 stroke-gold transition-[r] duration-200 ease-out"
              strokeWidth="0.4"
              style={{
                filter:
                  active === node.id
                    ? "drop-shadow(0 0 8px rgba(242,201,76,0.95))"
                    : "drop-shadow(0 0 4px rgba(242,201,76,0.55))",
              }}
              tabIndex={0}
              role="button"
              aria-label={`Lucky star ${node.value}`}
              onMouseEnter={() => setActive(node.id)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(node.id)}
              onBlur={() => setActive(null)}
            />
            <text
              x={node.x}
              y={node.y + 2.6}
              textAnchor="middle"
              className="pointer-events-none select-none fill-midnight font-mono text-[6px] font-semibold"
            >
              {node.value}
            </text>
          </g>
        ))}
      </svg>

      <p className="mt-4 text-center text-xs text-slate">
        Hover or tab through a star to bring it into focus.
      </p>
    </div>
  );
}
