import type { ReactNode } from "react"
import {
  SiCplusplus,
  SiDotnet,
  SiGithub,
  SiLaravel,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPrisma,
  SiReact,
  SiTailwindcss,
  SiVercel,
} from "react-icons/si"
import { BiLogoTypescript } from "react-icons/bi"
import { FaAngular, FaJava, FaPhp, FaProjectDiagram, FaNode } from "react-icons/fa"
import { FaGolang } from "react-icons/fa6"
import { TECH_STACK_ITEMS } from "./content"

const cls = "h-9 w-9"

const ICONS: Record<(typeof TECH_STACK_ITEMS)[number]["id"], () => ReactNode> = {
  next: () => <SiNextdotjs title="Next.js" className={cls} />,
  react: () => <SiReact title="React" className={cls} />,
  tailwind: () => <SiTailwindcss title="Tailwind CSS" className={cls} />,
  prisma: () => <SiPrisma title="Prisma" className={cls} />,
  postgresql: () => <SiPostgresql title="PostgreSQL" className={cls} />,
  nodejs: () => <FaNode title="Node.js" className={cls} />,
  dotnet: () => <SiDotnet title=".NET (C#)" className={cls} />,
  vercel: () => <SiVercel title="Vercel" className={cls} />,
  cpp: () => <SiCplusplus title="C++" className={cls} />,
  java: () => <FaJava title="Java" className={cls} />,
  github: () => <SiGithub title="GitHub" className={cls} />,
  angular: () => <FaAngular title="Angular" className={cls} />,
  laravel: () => <SiLaravel title="Laravel" className={cls} />,
  golang: () => <FaGolang title="Golang" className={cls} />,
  "system-design": () => <FaProjectDiagram title="System Design" className={cls} />,
  php: () => <FaPhp title="PHP" className={cls} />,
  typescript: () => <BiLogoTypescript title="TypeScript" className={cls} />,
}

export function marqueeTechIcons() {
  return TECH_STACK_ITEMS.map((item) => {
    const Icon = ICONS[item.id]
    return (
      <div key={item.id} className="flex h-14 w-14 shrink-0 items-center justify-center text-navy" title={item.label}>
        <Icon />
      </div>
    )
  })
}
