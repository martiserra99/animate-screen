import ComponentAnimation from "./component-animation";

/**
 * It defines the animation of a component in all the phases.
 */
class ComponentAnimationPhases {
  #phases = new Map<string, ComponentAnimation>();

  /**
   * It sets an animation for the given phase.
   * @param name The name of the phase.
   * @param animation The animation of the phase.
   */
  set(name: string, animation: ComponentAnimation) {
    this.#phases.set(name, animation);
  }

  [Symbol.iterator]() {
    return this.#phases[Symbol.iterator]();
  }
}

export default ComponentAnimationPhases;
