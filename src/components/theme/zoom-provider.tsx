"use client";

import type React from "react";

import { useEffect } from "react";

export function ZoomProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Function to apply zoom level
    const applyZoom = () => {
      // Check if the browser supports the zoom property
      const testElement = document.createElement("div");
      testElement.style.zoom = "0.75";
      const supportsZoom = testElement.style.zoom === "0.75";

      if (!supportsZoom) {
        // For Firefox and other browsers that don't support zoom
        document.documentElement.style.transform = "scale(0.75)";
        document.documentElement.style.transformOrigin = "0 0";
        document.body.style.width = "calc(100% / 0.75)";
        document.body.style.height = "calc(100% / 0.75)";
        document.body.style.overflowX = "hidden";
      }
    };

    applyZoom();

    // Re-apply zoom on window resize
    window.addEventListener("resize", applyZoom);

    return () => {
      window.removeEventListener("resize", applyZoom);
    };
  }, []);

  return <>{children}</>;
}
