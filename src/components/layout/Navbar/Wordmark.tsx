import Link from "next/link";
import { WORDMARK } from "@/data/site";

interface WordmarkProps {
  onNavigate?: () => void;
}

export function Wordmark({ onNavigate }: WordmarkProps) {
  return (
    <Link
      href="/"
      onClick={onNavigate}
      className="font-display text-wordmark leading-none font-black text-white select-none"
    >
      {WORDMARK}
      <span className="text-racing-red">.</span>
    </Link>
  );
}
