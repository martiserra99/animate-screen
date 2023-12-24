/**
 * It defines the animation of a list of elements referenced by a tag.
 */
class Animation {
  #tag: string;
  #ref: HTMLElement[] = [];
  #animate: object = {};
  #config: { ease: string; start: number; end: number } = {
    ease: "none",
    start: 0,
    end: 1,
  };

  constructor(tag: string) {
    this.#tag = tag;
  }

  get tag() {
    return this.#tag;
  }

  set ref(value) {
    this.#ref = value;
  }

  get ref() {
    return this.#ref;
  }

  get animate() {
    return this.#animate;
  }

  get config() {
    return this.#config;
  }

  /**
   * It defines the gsap animation to apply.
   * @param animate The gsap animation to apply.
   * @returns The animation.
   */
  to(animate: object) {
    this.#animate = animate;
    return this;
  }

  /**
   * It defines the ease of the animation.
   * @param value The ease of the animation.
   * @returns The animation.
   */
  ease(value: string) {
    this.#config.ease = value;
    return this;
  }

  /**
   * It defines the start of the animation within the corresponding phase.
   * @param value A number between 0 and 1 that defines the start of the animation within the corresponding phase.
   * @returns The animation.
   */
  start(value: number) {
    this.#config.start = value;
    return this;
  }

  /**
   * It defines the end of the animation within the corresponding phase.
   * @param value A number between 0 and 1 that defines the end of the animation within the corresponding phase.
   * @returns The animation.
   */
  end(value: number) {
    this.#config.end = value;
    return this;
  }
}

export default Animation;
