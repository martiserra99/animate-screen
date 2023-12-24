import Animation from './animation';

/**
 * It defines the animation of a component.
 */
class ComponentAnimation {
  _animations: Animation[] = [];

  get animations() {
    return [...this._animations];
  }

  /**
   * It creates a new animation for the elements with the given tag.
   * @param tag The tag of the elements to animate.
   * @returns The animation of the elements with the given tag.
   */
  ref(tag: string): Animation {
    const animation = new Animation(tag);
    this._animations.push(animation);
    return animation;
  }
}

export default ComponentAnimation;
