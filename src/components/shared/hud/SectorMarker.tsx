import { HairlineLabel } from "./HairlineLabel";

interface SectorMarkerProps {
  /** Two-digit sector number, e.g. "01". */
  number: string;
  name: string;
  className?: string;
}

/** Signature device (a). Opens every sector with the same mono label + hairline
 * rule so the page reads as one continuous timing document. */
export function SectorMarker({ number, name, className }: SectorMarkerProps) {
  return <HairlineLabel label={`// SECTOR ${number} — ${name}`} className={className} />;
}
