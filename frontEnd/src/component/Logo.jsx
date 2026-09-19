import React from "react";
import { Leaf } from "lucide-react";

const ACVPlusLogo = ({
  size = "md",
  showTagline = false,
  light = false,
  className = "",
}) => {
  const sizes = {
    sm: {
      iconBox: "h-8 w-8",
      icon: 14,
      brand: "text-[19px]",
      tagline: "text-[7px]",
    },

    md: {
      iconBox: "h-10 w-10",
      icon: 17,
      brand: "text-[23px]",
      tagline: "text-[8px]",
    },

    lg: {
      iconBox: "h-11 w-11",
      icon: 19,
      brand: "text-[27px]",
      tagline: "text-[9px]",
    },

    xl: {
      iconBox: "h-13 w-13",
      icon: 22,
      brand: "text-[32px]",
      tagline: "text-[10px]",
    },
  };

  const currentSize =
    sizes[size] || sizes.md;

  const brandColor = light
    ? "text-white"
    : "text-[#10285D]";

  const taglineColor = light
    ? "text-[#AFC8FF]"
    : "text-[#3569C8]";

  const iconStyle = light
    ? "border border-white/15 bg-white/10 text-white"
    : "bg-[#183A7A] text-white shadow-[0_8px_24px_rgba(24,58,122,0.16)]";

  return (
    <div
      className={`inline-flex max-w-full select-none items-center gap-3 ${className}`}
      aria-label={
        showTagline
          ? "ACV Plus — Everyday Wellness"
          : "ACV Plus"
      }
    >
      {/* ===============================================
          BRAND ICON
      =============================================== */}

      <div
        className={`${currentSize.iconBox} flex shrink-0 items-center justify-center rounded-full ${iconStyle}`}
        aria-hidden="true"
      >
        <Leaf
          size={currentSize.icon}
          strokeWidth={1.8}
        />
      </div>

      {/* ===============================================
          BRAND TEXT
      =============================================== */}

      <div className="flex min-w-0 flex-col">
        <span
          className={`${currentSize.brand} whitespace-nowrap font-serif font-semibold leading-none tracking-[-0.035em] ${brandColor}`}
        >
          ACV Plus
        </span>

        {/* =============================================
            OPTIONAL TAGLINE
        ============================================= */}

        {showTagline && (
          <span
            className={`${currentSize.tagline} mt-1.5 whitespace-nowrap font-bold uppercase leading-none tracking-[0.18em] sm:tracking-[0.21em] ${taglineColor}`}
          >
            Everyday Wellness
          </span>
        )}
      </div>
    </div>
  );
};

export default ACVPlusLogo;