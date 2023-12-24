/**
 * It defines the callbacks of a component in all the phases.
 */
class ComponentCallbacksPhases {
  #phases = new Map<string, { time: number; callback: () => void }[]>();

  /**
   * It adds a callback to the given phase.
   * @param name The name of the phase.
   * @param time It is a number between 0 and 1 that defines the time of the callback within the given phase.
   * @param callback The callback to add.
   */
  add(name: string, time: number, callback: () => void) {
    const phase = this.#phases.get(name);
    if (phase) this.#phases.set(name, [...phase, { time, callback }]);
    else this.#phases.set(name, [{ time, callback }]);
  }

  [Symbol.iterator]() {
    return this.#phases[Symbol.iterator]();
  }
}

export default ComponentCallbacksPhases;
