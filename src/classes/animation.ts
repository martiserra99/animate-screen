/**
 * It defines the animation of a list of elements referenced by a tag.
 */
class Animation {
  _tag: string;
  _ref: HTMLElement[] = [];
  _animate: object = {};
  _config: { ease: string; start: number; end: number } = {
    ease: 'none',
    start: 0,
    end: 1,
  };

  constructor(tag: string) {
    this._tag = tag;
  }

  get tag() {
    return this._tag;
  }

  set ref(value) {
    this._ref = value;
  }

  get ref() {
    return this._ref;
  }

  get animate() {
    return this._animate;
  }

  get config() {
    return this._config;
  }

  /**
   * It defines the gsap animation to apply.
   * @param animate The gsap animation to apply.
   * @returns The animation.
   */
  to(animate: object) {
    this._animate = animate;
    return this;
  }

  /**
   * It defines the ease of the animation.
   * @param value The ease of the animation.
   * @returns The animation.
   */
  ease(value: string) {
    this._config.ease = value;
    return this;
  }

  /**
   * It defines the start of the animation within the corresponding phase.
   * @param value A number between 0 and 1 that defines the start of the animation within the corresponding phase.
   * @returns The animation.
   */
  start(value: number) {
    this._config.start = value;
    return this;
  }

  /**
   * It defines the end of the animation within the corresponding phase.
   * @param value A number between 0 and 1 that defines the end of the animation within the corresponding phase.
   * @returns The animation.
   */
  end(value: number) {
    this._config.end = value;
    return this;
  }
}

export default Animation;
