type ClassValue = string | false | null | undefined;

/** Minimal class joiner — the site never needs Tailwind conflict resolution
 * because variants are composed, not overridden. */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}
