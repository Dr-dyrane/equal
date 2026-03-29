"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { SfSymbol } from "@/components/sf-symbol";

type ResponsiveSheetProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: React.ReactNode;
};

export function ResponsiveSheet({
  open,
  onOpenChange,
  title,
  description,
  children,
}: ResponsiveSheetProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="story-sheet-overlay" />
        <Dialog.Content className="story-sheet px-4 py-4 sm:px-5 sm:py-5">
          <div className="story-sheet-handle" />

          <div className="mt-3 flex items-start justify-between gap-4">
            <div className="min-w-0">
              <Dialog.Title className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:var(--story-subtle)]">
                {title}
              </Dialog.Title>
              {description ? (
                <Dialog.Description className="mt-3 text-sm leading-6 text-[color:var(--story-muted)]">
                  {description}
                </Dialog.Description>
              ) : null}
            </div>

            <Dialog.Close asChild>
              <button
                type="button"
                className="story-nav-secondary inline-flex h-11 w-11 items-center justify-center text-[color:var(--story-ink)]"
                aria-label="Close sheet"
              >
                <SfSymbol name="xmark" className="h-4 w-4" />
              </button>
            </Dialog.Close>
          </div>

          <div className="mt-5">{children}</div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
