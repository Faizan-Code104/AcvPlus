import React from "react";

const ZivelineLogo = ({
  size = "md",
  showTagline = false,
  className = "",
}) => {
  const sizes = {
    sm: {
      brand: "text-xl",
      tagline: "text-[9px]",
    },
    md: {
      brand: "text-2xl",
      tagline: "text-[10px]",
    },
    lg: {
      brand: "text-3xl",
      tagline: "text-xs",
    },
    xl: {
      brand: "text-4xl",
      tagline: "text-sm",
    },
  };

  const currentSize = sizes[size] || sizes.md;

  return (
    <div
      className={`inline-flex max-w-full select-none flex-col leading-none ${className}`}
      aria-label={
        showTagline
          ? "Ziveline — Carry Your Style"
          : "Ziveline"
      }
    >
      <span
        className={`${currentSize.brand} whitespace-nowrap font-display text-ink`}
      >
        Ziveline
      </span>

      {showTagline && (
        <span
          className={`${currentSize.tagline} mt-1 whitespace-nowrap font-semibold uppercase tracking-[0.18em] text-ink/50 sm:tracking-[0.22em]`}
        >
          Carry Your Style
        </span>
      )}
    </div>
  );
};

export default ZivelineLogo;