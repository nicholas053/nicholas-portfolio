"use client"

import { useState } from "react"
import { PERSON } from "@/content/content"
import { HEADSHOT_PATH } from "@/lib/site-config"

/** About portrait — uses the public headshot; hides itself if the file is missing. */
export function AboutHeadshot() {
  const [visible, setVisible] = useState(true)

  if (!visible) return null

  return (
    <div className="mb-12 flex justify-center">
      <div className="relative h-36 w-36 overflow-hidden rounded-2xl border border-gray-200 bg-gray-100 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:h-44 md:w-44">
        {/* eslint-disable-next-line @next/next/no-img-element -- public headshot may be absent until provided */}
        <img
          src={HEADSHOT_PATH}
          alt={`${PERSON.legalName} — ${PERSON.role}`}
          width={176}
          height={176}
          className="h-full w-full object-cover"
          onError={() => setVisible(false)}
        />
      </div>
    </div>
  )
}
