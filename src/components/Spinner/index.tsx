import { type CSSProperties } from "react";
import { MoonLoader } from "react-spinners";

type PropType = {
  size?: number;
  cssOverride?: CSSProperties;
  speedMultiplier?: number;
  color?: string;
};

export const Spinner = (props: PropType) => {
  return <MoonLoader color="#7c5dfa" {...props} />;
};
