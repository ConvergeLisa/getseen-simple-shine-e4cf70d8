import { Zap, Smile, Wallet, Target } from "lucide-react";

const items = [
  { icon: Zap, label: "Fast turnaround" },
  { icon: Smile, label: "No tech knowledge needed" },
  { icon: Wallet, label: "Affordable pricing" },
  { icon: Target, label: "Built to attract customers" },
];

export function TrustStrip() {
  return (
    <section className="border-y border-border bg-secondary/40">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-5 py-8 sm:px-8 md:grid-cols-4 md:py-10">
        {items.map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary">
              <Icon className="h-5 w-5" />
            </span>
            <span className="text-sm font-semibold sm:text-base">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
