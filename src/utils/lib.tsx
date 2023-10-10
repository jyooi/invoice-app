import { useMediaQuery } from "~/hook/useMediaQuery";

export function useResponsiveMatch() {
  const isMobile = useMediaQuery("(min-width: 375px) and (max-width: 767px)");
  const isTablet = useMediaQuery("(min-width: 768px) and (max-width: 1439px)");
  const isDesktop = useMediaQuery("(min-width: 1440px)");
  console.log(isDesktop);
  return {
    isMobile,
    isTablet,
    isDesktop,
  };
}
