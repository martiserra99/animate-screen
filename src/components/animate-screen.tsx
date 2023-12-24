import { useLayoutEffect, useRef, useMemo } from "react";

import ScreenAnimationPhases from "../classes/screen-animation-phases";
import ScreenAnimationConfig from "../types/screen-animation-config";

import ScreenAnimation from "../classes/screen-animation";
import ScreenAnimationContext from "../context/screen-animation-context";

export interface AnimateScreenProps {
  children: React.ReactNode;
  phases: ScreenAnimationPhases;
  config: ScreenAnimationConfig;
}

/**
 * It is a component that animates the screen.
 */
function AnimateScreen({ children, phases, config }: AnimateScreenProps) {
  const screenAnimation = useMemo(
    () => new ScreenAnimation(phases, config),
    [phases, config]
  );

  const scrollReference = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    screenAnimation.start(scrollReference.current!);
    return () => screenAnimation.end();
  }, [screenAnimation]);

  return (
    <div ref={scrollReference} style={{ height: screenAnimation.getHeight() }}>
      <ScreenAnimationContext.Provider value={screenAnimation}>
        {children}
      </ScreenAnimationContext.Provider>
    </div>
  );
}

export default AnimateScreen;
