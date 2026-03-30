"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { ShiftSnapshot, ShiftTemplateCard } from "@/features/shifts/types";
import { ResponsiveSheet } from "@/features/shell/components/responsive-sheet";
import {
  shiftTemplateUpdateSchema,
  type ShiftTemplateUpdateInput,
} from "@/lib/contracts/shifts";

type ShiftTemplateSheetProps = {
  template: ShiftTemplateCard | null;
  skillOptions: ShiftSnapshot["skillOptions"];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSaved: (snapshot: ShiftSnapshot) => void;
};

const HEADCOUNT_OPTIONS = [1, 2, 3, 4] as const;

export function ShiftTemplateSheet({
  template,
  skillOptions,
  open,
  onOpenChange,
  onSaved,
}: ShiftTemplateSheetProps) {
  const form = useForm<ShiftTemplateUpdateInput>({
    resolver: zodResolver(shiftTemplateUpdateSchema),
    defaultValues: {
      templateId: template?.id ?? "",
      requiredHeadcount: template?.headcountValue ?? 1,
      requiredSkillIds: template?.skillIds ?? [],
      notes: template?.detail ?? "",
    },
  });

  useEffect(() => {
    if (!template) {
      return;
    }

    form.reset({
      templateId: template.id,
      requiredHeadcount: template.headcountValue,
      requiredSkillIds: template.skillIds,
      notes: template.detail,
    });
  }, [form, template]);

  if (!template) {
    return null;
  }

  const selectedSkills = form.watch("requiredSkillIds");
  const selectedHeadcount = form.watch("requiredHeadcount");

  async function handleSubmit(values: ShiftTemplateUpdateInput) {
    const response = await fetch("/api/shifts/template", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const payload = (await response.json().catch(() => null)) as
      | ShiftSnapshot
      | { message?: string };

    if (!response.ok || !payload || !("templates" in payload)) {
      toast.error(payload?.message ?? "Could not update that shape.");
      return;
    }

    onSaved(payload);
    onOpenChange(false);
    toast.success("Shape updated.");
  }

  return (
    <ResponsiveSheet
      open={open}
      onOpenChange={onOpenChange}
      title={template.name}
      description={`${template.dayLabel} · ${template.window} · ${template.site}`}
    >
      <form className="space-y-4" onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="story-soft-card px-4 py-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--story-subtle)]">
            What this shape covers
          </p>
          <p className="mt-3 text-sm leading-6 text-[color:var(--story-muted)]">
            {template.detail}
          </p>
        </div>

        <div className="space-y-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--story-subtle)]">
            Headcount
          </p>
          <div className="grid grid-cols-4 gap-2">
            {HEADCOUNT_OPTIONS.map((count) => (
              <button
                key={count}
                type="button"
                onClick={() => form.setValue("requiredHeadcount", count, { shouldDirty: true })}
                className="schedule-sheet-option px-0 py-3 text-center"
                data-active={selectedHeadcount === count ? "true" : "false"}
              >
                <span className="text-sm font-semibold text-[color:var(--story-ink)]">
                  {count}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--story-subtle)]">
            Skills
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            {skillOptions.map((skill) => {
              const active = selectedSkills.includes(skill.id);

              return (
                <button
                  key={skill.id}
                  type="button"
                  onClick={() => {
                    const next = active
                      ? selectedSkills.filter((skillId) => skillId !== skill.id)
                      : [...selectedSkills, skill.id];

                    if (next.length === 0) {
                      return;
                    }

                    form.setValue("requiredSkillIds", next, {
                      shouldDirty: true,
                      shouldValidate: true,
                    });
                  }}
                  className="schedule-sheet-option w-full text-left"
                  data-active={active ? "true" : "false"}
                >
                  <span className="text-sm font-semibold text-[color:var(--story-ink)]">
                    {skill.name}
                  </span>
                </button>
              );
            })}
          </div>
          {form.formState.errors.requiredSkillIds ? (
            <p className="text-sm text-rose-500">
              {form.formState.errors.requiredSkillIds.message}
            </p>
          ) : null}
        </div>

        <label className="grid gap-2">
          <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--story-subtle)]">
            Note
          </span>
          <textarea
            rows={4}
            className="story-input min-h-[7.5rem] resize-none"
            {...form.register("notes")}
          />
        </label>

        <div className="grid gap-2 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="story-nav-secondary inline-flex items-center justify-center px-5 py-3 text-sm font-semibold text-[color:var(--story-ink)]"
          >
            Not now
          </button>
          <button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="story-primary-cta inline-flex items-center justify-center px-5 py-3 text-sm font-semibold text-[color:var(--story-primary-text)] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {form.formState.isSubmitting ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </ResponsiveSheet>
  );
}
