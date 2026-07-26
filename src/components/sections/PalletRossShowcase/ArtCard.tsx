interface ArtCardProps {
  gradient: string;
  label?: string;
  className?: string;
}

export function ArtCard({ gradient, label, className = "" }: ArtCardProps) {
  return (
    <div
      className={`relative flex items-end overflow-hidden rounded-2xl bg-gradient-to-br p-3 shadow-lg ${gradient} ${className}`}
    >
      {label && (
        <span className="text-xs font-semibold text-white drop-shadow-md">{label}</span>
      )}
    </div>
  );
}
