"use client";

import { useEffect } from "react";
import type { AnalyticsKind, AnalyticsPageViewEvent } from "@/types/analytics";

const IDENTIFIER = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
type TrackingWindow = Window & { __duckcloudPageViews?: Set<string> };

export interface PageViewTrackerProps {
  kind: AnalyticsKind;
  identifier: string;
}

/** Records one aggregate-only view for this document. It renders no UI. */
export function PageViewTracker({ kind, identifier }: PageViewTrackerProps) {
  useEffect(() => {
    if (!IDENTIFIER.test(identifier) || identifier.length > 160) return;
    const trackingWindow = window as TrackingWindow;
    const tracked = trackingWindow.__duckcloudPageViews ??= new Set<string>();
    const key = `${kind}:${identifier}`;
    if (tracked.has(key)) return;
    tracked.add(key);

    const event: AnalyticsPageViewEvent = { kind, identifier };
    void fetch("/api/analytics", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(event),
      credentials: "omit",
      referrerPolicy: "no-referrer",
      keepalive: true,
    }).catch(() => {
      // Analytics must never interfere with page use. A reload may try again.
    });
  }, [kind, identifier]);

  return null;
}
