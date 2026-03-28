import type { ReactNode } from "react";

type PublicSystemLabelProps = {
  children: ReactNode;
  accent?: boolean;
  className?: string;
};

export function PublicSystemLabel({
  children,
  accent = false,
  className,
}: PublicSystemLabelProps) {
  return (
    <span
      className={`story-system-label${
        accent ? " story-system-label-accent" : ""
      }${className ? ` ${className}` : ""}`}
    >
      {children}
    </span>
  );
}
