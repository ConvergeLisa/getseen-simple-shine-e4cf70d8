interface Props {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  inverted?: boolean;
}

export function SectionHeader({ eyebrow, title, description, align = "center", inverted = false }: Props) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow && (
        <span
          className={
            inverted
              ? "text-xs font-bold uppercase tracking-[0.2em] text-cyan-300"
              : "text-xs font-bold uppercase tracking-[0.2em] text-primary"
          }
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={
          inverted
            ? "mt-3 font-display text-3xl font-bold tracking-[-0.03em] text-white sm:text-4xl lg:text-[2.8rem]"
            : "mt-3 font-display text-3xl font-bold tracking-[-0.03em] sm:text-4xl lg:text-[2.8rem]"
        }
      >
        {title}
      </h2>
      {description && (
        <p className={inverted ? "mt-4 text-base leading-relaxed text-slate-300 sm:text-lg" : "mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg"}>
          {description}
        </p>
      )}
    </div>
  );
}
