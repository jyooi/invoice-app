import ModernDrawer from "react-modern-drawer";

//import styles 👇
import "react-modern-drawer/dist/index.css";

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
  return (
    <ModernDrawer
      open={open}
      onClose={onClose}
      direction={direction}
      size={size}
      style={{
        borderBottomRightRadius: 20,
        borderTopRightRadius: 20,
        ...styles,
      }}
    >
      {children}
    </ModernDrawer>
  );
};
