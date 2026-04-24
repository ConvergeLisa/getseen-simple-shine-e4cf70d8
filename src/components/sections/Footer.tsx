import wordmark from "@/assets/getseen-wordmark.png";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <a href="#top" className="inline-block">
              <img
                src={wordmark}
                alt="GetSeen — websites that get you seen"
                className="h-16 w-auto sm:h-20"
              />
            </a>
            <p className="mt-3 max-w-sm text-sm text-muted-foreground">
              Helping small businesses get noticed online — without the tech headaches.
            </p>
          </div>
          <div className="grid gap-2 text-sm md:text-right">
            <a
              href="mailto:hello@getseen.co.za"
              className="font-medium text-foreground transition-colors hover:text-primary"
            >
              hello@getseen.co.za
            </a>
            <a
              href="https://www.getseen.co.za"
              className="text-muted-foreground transition-colors hover:text-primary"
            >
              www.getseen.co.za
            </a>
          </div>
        </div>
        <div className="mt-10 border-t border-border pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} GetSeen. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
