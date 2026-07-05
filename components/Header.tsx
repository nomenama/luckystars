export default function Header() {
    return (
        <header className="border-b border-white/10">
            <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
                <a href="/public" className="group flex items-center gap-2.5">
                    <span
                        aria-hidden
                        className="text-lg text-gold transition-transform duration-300 group-hover:rotate-12">
                        ✦
                    </span>
                    <span className="font-display text-xl tracking-tight text-cream">
                        Lucky<span className="text-gold">Stars</span>
                    </span>
                </a>

                <nav aria-label="Primary" className="hidden gap-8 text-sm text-slate sm:flex">
                    <a href="#result" className="transition-colors hover:text-cream">
                        Latest draw
                    </a>
                    <a href="#prizes" className="transition-colors hover:text-cream">
                        Prize breakdown
                    </a>
                </nav>
            </div>
        </header>
    );
}
