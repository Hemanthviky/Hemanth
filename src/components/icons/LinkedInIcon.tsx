import { Icon, type IconProps } from "./Icon";

export function LinkedInIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M16 8.5a5 5 0 0 1 5 5V21h-3.5v-7.5a1.5 1.5 0 0 0-3 0V21H11v-9h3.5v1.2A4.98 4.98 0 0 1 16 8.5Z" />
      <rect x="3" y="12" width="3.5" height="9" rx="0.5" />
      <circle cx="4.75" cy="7.25" r="1.75" />
    </Icon>
  );
}
