"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

type AdSlotProps = {
  adClient: string;
  adSlot: string;
  adFormat?: string;
  fullWidthResponsive?: boolean;
  style?: React.CSSProperties;
};

export default function AdSlot({
  adClient,
  adSlot,
  adFormat = "auto",
  fullWidthResponsive = true,
  style,
}: AdSlotProps) {
  const pathname = usePathname();
  const isAdmin = pathname === "/admin" || pathname?.startsWith("/admin/");

  useEffect(() => {
    if (!pathname || isAdmin) return;
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense error", e);
    }
  }, [pathname, isAdmin]);

  if (!pathname || isAdmin) return null;

  return (
    <ins
      className="adsbygoogle"
      style={style || { display: "block" }}
      data-ad-client={adClient}
      data-ad-slot={adSlot}
      data-ad-format={adFormat}
      data-full-width-responsive={fullWidthResponsive.toString()}
    />
  );
}
