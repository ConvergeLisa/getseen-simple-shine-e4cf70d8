import logo from "@/assets/getseen-logo-transparent.png";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <a href="#top" className="inline-flex items-center gap-3">
              <img src={logo} alt="GetSeen logo" className="h-12 w-12 object-contain sm:h-14 sm:w-14" />
              <span className="font-display text-2xl font-bold text-white">GetSeen</span>
            </a>
            <p className="mt-3 max-w-sm text-sm text-slate-300">
              Helping small businesses get noticed online — without the tech headaches.
            </p>
          </div>
          <div className="grid gap-2 text-sm md:text-right">
            <a
              href="mailto:hello@getseen.co.za"
              className="font-medium text-white transition-colors hover:text-cyan-300"
            >
              hello@getseen.co.za
            </a>
            <a
              href="https://www.getseen.co.za"
              className="text-slate-300 transition-colors hover:text-cyan-300"
            >
              www.getseen.co.za
            </a>
          </div>
        </div>
        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} GetSeen. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
