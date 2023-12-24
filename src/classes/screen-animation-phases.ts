import ScreenAnimationPhaseConfig from '../types/screen-animation-phase-config';

/**
 * It defines the information of the phases of the screen animation.
 */
class ScreenAnimationPhases {
  _phases = new Map<string, ScreenAnimationPhaseConfig>();

  /**
   * It adds a phase to the screen animation.
   * @param name The name of the phase.
   * @param delay The delay of the phase.
   * @param duration The duration of the phase.
   * @param snap A boolean that indicates if it has to snap or not.
   */
  add(
    name: string,
    delay: number = 0,
    duration: number = 1,
    snap: boolean = true
  ) {
    this._phases.set(name, { delay, duration, snap });
  }

  [Symbol.iterator]() {
    return this._phases[Symbol.iterator]();
  }
}

export default ScreenAnimationPhases;
