type AuthNextStepsProps = {
  title: string;
  steps: readonly string[];
};

export function AuthNextSteps({ title, steps }: AuthNextStepsProps) {
  return (
    <div className="mt-6 space-y-3">
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--story-subtle)]">
        {title}
      </p>
      <div className="grid gap-3 grid-cols-2 sm:grid-cols-3">
        {steps.map((step, index) => (
          <div
            key={step}
            className={`story-soft-card px-4 py-4 ${
              index === 2 ? "col-span-2 justify-self-center w-full max-w-[15rem] sm:col-span-1 sm:max-w-none" : ""
            }`}
          >
            <p className="text-sm font-medium text-[color:var(--story-ink)]">{step}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
