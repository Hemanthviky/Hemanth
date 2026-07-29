import { Icon, type IconProps } from "./Icon";

export function GitHubIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5a5.4 5.4 0 0 0-1-3.5 5 5 0 0 0 0-3.5s-1 0-3 1.5a12.3 12.3 0 0 0-8 0C6 2 5 2 5 2a5 5 0 0 0 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.6.8-.9 1.7-.9 2.6V22" />
      <path d="M9 18c-4.5 2-5-2-7-2" />
    </Icon>
  );
}
