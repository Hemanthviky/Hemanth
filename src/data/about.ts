import type { IProcessStep, IQuickFact } from "@/types/about";

export const ABOUT_EYEBROW = "About Me";

export const ABOUT_HEADLINE = "Turning Ideas into Meaningful Digital Experiences";
/** Words rendered as stroke-only (transparent fill), echoing the hero's outline treatment. */
export const ABOUT_HEADLINE_STROKE_WORDS = ["Meaningful"];

export const ABOUT_BIO_PARAGRAPHS = [
  "I'm Hemanth N, a Full-Stack Developer with a background in Artificial Intelligence and Data Science. I enjoy building modern web applications that combine clean design, strong performance, and practical solutions for real-world problems.",
  "My journey started with a curiosity for how technology can simplify everyday challenges. Since then, I've focused on creating applications that are intuitive, scalable, and user-centric. Whether it's developing responsive interfaces, integrating APIs, or implementing AI-powered features, I enjoy bringing ideas to life through thoughtful engineering.",
];

export const ABOUT_BIO_HIGHLIGHT =
  "Recently, I've had the opportunity to work on PrepKind, an AI-powered visa interview platform, where I contributed to building responsive user interfaces, integrating backend services, implementing secure authentication, and delivering a seamless user experience.";

export const ABOUT_BIO_CLOSING_PARAGRAPH =
  "Outside of development, I continuously explore emerging technologies, improve my design skills, and enjoy learning new tools that help me build better digital products.";

export const ABOUT_BIO_CLOSING_LINE =
  "I believe great software is more than writing code—it's about understanding people, solving meaningful problems, and creating experiences that make a lasting impact.";

export const ABOUT_QUICK_FACTS: IQuickFact[] = [
  { label: "Name", value: "Hemanth N" },
  { label: "Based In", value: "Coimbatore, Tamil Nadu, India" },
  { label: "Education", value: "B.Tech in Artificial Intelligence & Data Science" },
  { label: "Currently", value: "Frontend Developer at Diagonal Labs" },
];

export const ABOUT_FOCUS_AREAS = [
  "AI Applications",
  "Full-Stack Development",
  "UI/UX",
  "Web Technologies",
];

export const ABOUT_PHILOSOPHY_QUOTE =
  "Technology should feel effortless. My goal is to build products that are not only functional and scalable but also enjoyable to use.";

export const ABOUT_DRIVES_ME =
  "I enjoy working at the intersection of development, design, and problem-solving. Every project is an opportunity to learn something new, improve my skills, and create software that delivers real value. My approach is simple: understand the problem, design thoughtfully, build efficiently, and continuously improve.";

export const ABOUT_PROCESS_STEPS: IProcessStep[] = [
  { number: "01", label: "Understand" },
  { number: "02", label: "Design" },
  { number: "03", label: "Build" },
  { number: "04", label: "Improve" },
];
