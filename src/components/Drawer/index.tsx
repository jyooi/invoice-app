import ModernDrawer from "react-modern-drawer";
import { useTheme } from "next-themes";
//import styles 👇
import "react-modern-drawer/dist/index.css";
import { useResponsiveMatch } from "~/utils/lib";

type PropType = {
  children: React.ReactNode;
  open: boolean;
  onClose: () => void;
  direction: "left" | "right" | "top" | "bottom";
  styles?: React.CSSProperties;
  size?: number;
};

export const Drawer = ({
  children,
  open,
  onClose,
  direction,
  styles,
  size,
}: PropType) => {
  const { theme } = useTheme();

  return (
    <ModernDrawer
      open={open}
      onClose={onClose}
      direction={direction}
      size={size}
      style={{
        borderBottomRightRadius: 20,
        borderTopRightRadius: 20,
        background: theme === "dark" ? "#141625" : "#FFF",
        ...styles,
      }}
      lockBackgroundScroll
    >
      {children}
    </ModernDrawer>
  );
};
