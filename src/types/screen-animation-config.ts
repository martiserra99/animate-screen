export default interface ScreenAnimationConfig {
  scrub: number;
  snap: {
    delay: number;
    duration: {
      min: number;
      max: number;
    };
    ease: string;
  };
}
