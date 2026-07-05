interface BallProps {
    children: number;
    star?: boolean;
    rank?: number; // 1-indexed rank, used to highlight top finishers
}

export default function Ball({ children, star = false, rank }: BallProps) {
    const isTop = rank !== undefined && rank <= 3;

    const palette = star
        ? { base: "#3E5FCC", edge: "#1E2E66", glow: "rgba(91,141,239,0.55)" }
        : { base: "#E0A526", edge: "#7A5710", glow: "rgba(240,180,41,0.55)" };

    const medal =
        rank === 1
            ? { base: "#F0B429", edge: "#7A5710", glow: "rgba(240,180,41,0.7)" }
            : rank === 2
              ? { base: "#C7CDDB", edge: "#5A6178", glow: "rgba(199,205,219,0.6)" }
              : rank === 3
                ? { base: "#C97A46", edge: "#5E3A1E", glow: "rgba(201,122,70,0.55)" }
                : palette;

    const colors = isTop ? medal : palette;

    return (
        <span
            className="relative inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[13px] font-bold tabular-nums"
            style={{
                background: `radial-gradient(circle at 32% 28%, #fff8 0%, ${colors.base} 38%, ${colors.edge} 100%)`,
                color: "#0A0E1A",
                boxShadow: `0 0 0 1px ${colors.edge}66, 0 2px 6px -1px ${colors.glow}, inset 0 1px 1px #ffffff66`,
                fontFamily: "var(--font-mono)",
            }}>
            {children}
        </span>
    );
}
