import { SectionHeader } from "./SectionHeader";

const steps = [
  { n: "01", title: "You send your info", desc: "Tell us about your business. A few details is all we need." },
  { n: "02", title: "We design and build", desc: "We craft your website end-to-end while you stay in the loop." },
  { n: "03", title: "Your site goes live", desc: "We launch it. You start attracting customers online." },
];

export function Process() {
  return (
    <section className="bg-foreground py-24 text-background lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary-glow">
            How it works
          </span>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight sm:text-5xl">
            Three simple steps
          </h2>
        </div>
        <div className="relative mt-16 grid gap-10 md:grid-cols-3 md:gap-6">
          <div className="absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-background/20 to-transparent md:block" />
          {steps.map((s) => (
            <div key={s.n} className="relative text-center md:text-left">
              <div className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-2xl gradient-primary font-display text-xl font-bold shadow-glow md:mx-0">
                {s.n}
              </div>
              <h3 className="mt-6 font-display text-2xl font-bold">{s.title}</h3>
              <p className="mt-3 leading-relaxed text-background/70">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
