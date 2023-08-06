import { useMediaQuery } from "~/hook/useMediaQuery";

export function useResponsiveMatch() {
  const isMobile = useMediaQuery("(min-width: 375px)");
  const isTablet = useMediaQuery("(min-width: 768px)");
  const isDesktop = useMediaQuery("(min-width: 1440px)");

  return {
    isMobile,
    isTablet,
    isDesktop,
  };
}
