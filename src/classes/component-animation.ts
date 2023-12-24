import Animation from "./animation";

/**
 * It defines the animation of a component.
 */
class ComponentAnimation {
  #animations: Animation[] = [];

  get animations() {
    return [...this.#animations];
  }

  /**
   * It creates a new animation for the elements with the given tag.
   * @param tag The tag of the elements to animate.
   * @returns The animation of the elements with the given tag.
   */
  ref(tag: string): Animation {
    const animation = new Animation(tag);
    this.#animations.push(animation);
    return animation;
  }
}

export default ComponentAnimation;
