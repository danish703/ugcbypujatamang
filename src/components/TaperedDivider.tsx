interface SectionHeadingProps {
  title: string
  subtitle?: string
  className?: string
}

/**
 * Signature tapered calligraphic horizontal hairline divider
 * directly inspired by snowiesugc.com (thick center tapering to sharp points).
 */
export function TaperedDivider({ className = '' }: { className?: string }) {
  return (
    <div className={`mx-auto mt-3 flex w-full max-w-[360px] justify-center ${className}`}>
      <svg
        viewBox="0 0 360 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-2.5 w-full"
        aria-hidden="true"
      >
        <path
          d="M0 5 C75 3.6, 130 2.7, 180 2.7 C230 2.7, 285 3.6, 360 5 C285 6.4, 230 7.3, 180 7.3 C130 7.3, 75 6.4, 0 5 Z"
          fill="#11100F"
        />
      </svg>
    </div>
  )
}

export function SectionHeading({ title, subtitle, className = '' }: SectionHeadingProps) {
  return (
    <div className={`text-center ${className}`}>
      <h2 className="font-display text-3xl leading-tight font-normal tracking-[-0.01em] text-[#11100F] sm:text-5xl">
        {title}
      </h2>
      <TaperedDivider />
      {subtitle && (
        <p className="mt-4 font-editorial text-xl font-light italic text-[#2B2623] sm:text-2xl">
          {subtitle}
        </p>
      )}
    </div>
  )
}

