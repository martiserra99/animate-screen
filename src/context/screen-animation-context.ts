import { createContext } from "react";

import ScreenAnimation from "../classes/screen-animation";

const ScrollAnimationContext = createContext<ScreenAnimation | null>(null);

export default ScrollAnimationContext;
