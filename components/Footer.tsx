export default function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-6 py-8 text-xs text-slate sm:flex-row sm:items-center sm:justify-between">
        <p>
          &copy; {new Date().getFullYear()} LuckyStars. Results are provided for
          informational purposes only.
        </p>
        <p>Always verify winning numbers against the official EuroMillions operator.</p>
      </div>
    </footer>
  );
}
