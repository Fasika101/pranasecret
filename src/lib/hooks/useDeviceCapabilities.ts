"use client";

import { useMediaQuery } from "./useMediaQuery";

const QUERIES = {
  hover: "(hover: hover) and (pointer: fine)",
  mobile: "(max-width: 767px)",
  tablet: "(min-width: 768px) and (max-width: 1279px)",
  coarse: "(pointer: coarse)",
  reduce: "(prefers-reduced-motion: reduce)",
} as const;

export interface DeviceCapabilities {
  /** Device has a precise pointer that can hover (mouse / trackpad). */
  canHover: boolean;
  /** Primary input is a touch screen. */
  isTouch: boolean;
  isMobile: boolean;
  /** Covers iPad portrait + landscape and most Android tablets. */
  isTablet: boolean;
  isDesktop: boolean;
  prefersReducedMotion: boolean;
  /**
   * Whether to run "ambient" effects: pointer tilt, parallax, idle drift.
   * Disabled for touch devices, small screens and reduced-motion users.
   */
  allowAmbientMotion: boolean;
}

export function useDeviceCapabilities(): DeviceCapabilities {
  const canHover = useMediaQuery(QUERIES.hover);
  const isTouch = useMediaQuery(QUERIES.coarse);
  const isMobile = useMediaQuery(QUERIES.mobile);
  const isTablet = useMediaQuery(QUERIES.tablet);
  // Deliberately not Motion's useReducedMotion(): that resolves synchronously on
  // the client and would diverge from the server render. useMediaQuery returns the
  // server snapshot during hydration, then updates, so markup always matches.
  const prefersReducedMotion = useMediaQuery(QUERIES.reduce);

  return {
    canHover,
    isTouch,
    isMobile,
    isTablet,
    isDesktop: !isMobile && !isTablet,
    prefersReducedMotion,
    allowAmbientMotion: canHover && !isMobile && !prefersReducedMotion,
  };
}
