interface MiniBallsProps {
  numbers: string[];
  stars: string[];
}

/**
 * Compact, non-interactive version of the winning numbers/stars, used inside
 * list rows where the full ConstellationBoard would be too much visual noise.
 * Plain presentational component — no "use client" needed, and no
 * server-only APIs, so it can be safely rendered from either a server or a
 * client component.
 */
export default function MiniBalls({ numbers, stars }: MiniBallsProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-1.5">
      {numbers.map((n, i) => (
        <span
          key={`n-${i}`}
          className="flex h-7 w-7 items-center justify-center rounded-full bg-nebula-light font-mono text-xs text-cream ring-1 ring-inset ring-comet/40"
        >
          {n}
        </span>
      ))}
      <span className="mx-0.5 text-slate">·</span>
      {stars.map((s, i) => (
        <span
          key={`s-${i}`}
          className="flex h-7 w-7 items-center justify-center rounded-full bg-gold/90 font-mono text-xs font-semibold text-midnight ring-1 ring-inset ring-gold"
        >
          {s}
        </span>
      ))}
    </div>
  );
}
