import { useContext } from "react";

import ScreenAnimationContext from "../context/screen-animation-context";

export default function useScreenAnimation() {
  const screenAnimation = useContext(ScreenAnimationContext);

  if (!screenAnimation) {
    throw new Error(
      "useScreenAnimation must be used within a ScreenAnimationProvider"
    );
  }

  return screenAnimation;
}
