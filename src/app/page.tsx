const steps = [
  {
    name: "Autopsy",
    body: "Inspect an abandoned Python 2 library: its public functions and every Python 2 only construct.",
  },
  {
    name: "Trial",
    body: "Run the original and the rewrite side by side on thousands of generated inputs. Every disagreement is caught and minimized.",
  },
  {
    name: "Certificate",
    body: "A per function verdict, graded on held out inputs the repair step never saw.",
  },
  {
    name: "Kiro spec",
    body: "Every behavior that changed becomes a requirement in a generated .kiro/specs folder.",
  },
];

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-6 py-16">
      <p className="font-mono text-sm tracking-widest text-life uppercase">
        Kiroween 2026 · Resurrection
      </p>
      <h1 className="mt-4 font-display text-6xl font-semibold sm:text-7xl">
        Lazarus
      </h1>
      <p className="mt-4 font-display text-2xl text-text sm:text-3xl">
        Put the rewrite on trial.
      </p>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
        AI can rewrite old code in seconds. Lazarus puts the rewrite on trial
        against the original, then hands you a certificate and a Kiro spec of
        every behavior that changed.
      </p>

      <ol className="mt-12 grid gap-4 sm:grid-cols-2">
        {steps.map((step, i) => (
          <li
            key={step.name}
            className="rounded-lg border border-border bg-surface p-5"
          >
            <span className="font-mono text-xs text-muted">0{i + 1}</span>
            <h2 className="mt-1 text-lg font-semibold">{step.name}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {step.body}
            </p>
          </li>
        ))}
      </ol>

      <p className="mt-12 font-mono text-sm text-muted">
        The trial is being built.{" "}
        <a
          className="text-life underline underline-offset-4"
          href="https://github.com/prince-of-bugs/lazarus"
        >
          Follow along on GitHub
        </a>
      </p>
    </main>
  );
}
