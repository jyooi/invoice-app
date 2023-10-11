"use client";

import { useMediaQuery } from "~/hook/useMediaQuery";
import { useState, useEffect } from "react";
export function useResponsiveMatch() {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1439px)");
  const isDesktop = useMediaQuery("(min-width: 1440px)");

  return {
    isMobile,
    isTablet,
    isDesktop,
  };
}

export function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}

export function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}
