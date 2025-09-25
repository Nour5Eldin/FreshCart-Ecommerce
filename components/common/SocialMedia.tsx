import { Facebook, Github, Linkedin} from "lucide-react";
import React from "react";

import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface Props {
  className?: string;
  iconClassName?: string;
  tooltipClassName?: string;
}

const socialLink = [
  {
    title: "Github",
    href: "https://github.com/Nour5Eldin",
    icon: <Github className="w-5 h-5" />,
  },
  {
    title: "Linkedin",
    href: "https://www.linkedin.com/in/noureldin-sw/",
    icon: <Linkedin className="w-5 h-5" />,
  },
  {
    title: "Facebook",
    href: "https://www.facebook.com/Noureldin.M.Hamed",
    icon: <Facebook className="w-5 h-5" />,
  },
];

const SocialMedia = ({ className, iconClassName, tooltipClassName }: Props) => {
  return (
    <TooltipProvider>
      <div
        className={cn(
          "flex items-center gap-3.5 text-tech_white/60",
          className
        )}
      >
        {socialLink.map((item) => (
          <Tooltip key={item.title}>
            <TooltipTrigger asChild>
              <Link
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "p-2 border rounded-full hover:text-tech_white hover:border-tech_orange hoverEffect",
                  iconClassName
                )}
              >
                {item.icon}
              </Link>
            </TooltipTrigger>
            <TooltipContent
              className={cn(
                "bg-tech_white text-tech_black font-semibold",
                tooltipClassName
              )}
            >
              {item.title}
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </TooltipProvider>
  );
};

export default SocialMedia;