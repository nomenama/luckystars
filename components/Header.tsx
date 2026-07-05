import Link from "next/link";

export default function Header() {
    return (
        <header className="border-b border-white/10">
            <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
                <Link href="/" className="group flex items-center gap-2.5">
                    <span
                        aria-hidden
                        className="text-lg text-gold transition-transform duration-300 group-hover:rotate-12">
                        ✦
                    </span>
                    <span className="font-display text-xl tracking-tight text-cream">
                        Lucky<span className="text-gold">Stars</span>
                    </span>
                </Link>

                <nav aria-label="Primary" className="flex gap-8 text-sm text-slate">
                    <Link href="/statistic">Statistic</Link>
                    <Link href="/results">Draw History</Link>
                </nav>
            </div>
        </header>
    );
}
