import Link from "next/link";

interface PaginationProps {
  page: number;
  totalPages: number;
}

/**
 * Plain prev/next pagination built from <Link>s. No client interactivity is
 * needed here — navigation is just a URL change — so this stays a server
 * component.
 */
export default function Pagination({ page, totalPages }: PaginationProps) {
  if (totalPages <= 1) return null;

  const prevHref = `/results?page=${Math.max(1, page - 1)}`;
  const nextHref = `/results?page=${Math.min(totalPages, page + 1)}`;
  const isFirst = page <= 1;
  const isLast = page >= totalPages;

  return (
    <nav
      aria-label="Past results pagination"
      className="mt-8 flex items-center justify-between text-sm"
    >
      {isFirst ? (
        <span className="cursor-not-allowed text-slate/40">&larr; Newer</span>
      ) : (
        <Link href={prevHref} className="text-comet transition-colors hover:text-cream">
          &larr; Newer
        </Link>
      )}

      <span className="font-mono text-xs text-slate">
        Page {page} of {totalPages}
      </span>

      {isLast ? (
        <span className="cursor-not-allowed text-slate/40">Older &rarr;</span>
      ) : (
        <Link href={nextHref} className="text-comet transition-colors hover:text-cream">
          Older &rarr;
        </Link>
      )}
    </nav>
  );
}
