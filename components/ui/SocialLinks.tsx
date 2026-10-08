import { siteConfig } from "@/data/site";
import {
  EmailIcon,
  GithubIcon,
  LeetCodeIcon,
  LinkedInIcon,
  WhatsappIcon,
} from "@/components/ui/icons";
import { cn } from "@/lib/utils";

const socialLinks = [
  { href: siteConfig.github, label: "GitHub", icon: GithubIcon },
  { href: siteConfig.linkedin, label: "LinkedIn", icon: LinkedInIcon },
  { href: siteConfig.leetcode, label: "LeetCode", icon: LeetCodeIcon },
  { href: `mailto:${siteConfig.email}`, label: "Email", icon: EmailIcon },
  { href: siteConfig.whatsapp, label: "WhatsApp", icon: WhatsappIcon },
];

export function SocialLinks({
  className,
  tone = "light",
}: {
  className?: string;
  tone?: "light" | "dark";
}) {
  const linkTone =
    tone === "dark"
      ? "border-white/20 text-white/75 hover:border-[#67e8f9]/60 hover:text-[#a5f3fc]"
      : "border-black/15 text-[#565650] hover:border-[#9a6a22] hover:text-[#9a6a22]";

  return (
    <div className={cn("flex items-center gap-3", className)}>
      {socialLinks.map(({ href, label, icon: Icon }) => (
        <a
          key={label}
          href={href}
          target={href.startsWith("mailto:") ? undefined : "_blank"}
          rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
          aria-label={label}
          className={`flex h-10 w-10 items-center justify-center border transition-colors ${linkTone}`}
        >
          <Icon className="h-4 w-4" />
        </a>
      ))}
    </div>
  );
}
