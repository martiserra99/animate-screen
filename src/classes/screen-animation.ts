import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import ScreenAnimationPhases from "./screen-animation-phases";
import ScreenAnimationConfig from "../types/screen-animation-config";
import ScreenAnimationPhaseConfig from "../types/screen-animation-phase-config";
import ComponentAnimationPhases from "./component-animation-phases";
import ComponentCallbacksPhases from "./component-callbacks-phases";
import Animation from "./animation";

gsap.registerPlugin(ScrollTrigger);

interface Phase extends ScreenAnimationPhaseConfig {
  animations: Animation[];
  callbacks: { time: number; callback: () => void }[];
}

/**
 * It contains all the logic of the screen animation.
 */
class ScreenAnimation {
  #phases: Map<string, Phase>;
  #config: ScreenAnimationConfig;
  #timeline: gsap.core.Timeline | null;

  constructor(phases: ScreenAnimationPhases, config: ScreenAnimationConfig) {
    this.#phases = this.#setupPhases(phases); // Contains the information of the phases of the screen animation.
    this.#config = config; // Contains the configuration of the screen animation.
    this.#timeline = null; // Contains the gsap timeline of the screen animation.
  }

  #setupPhases(phases: ScreenAnimationPhases): Map<string, Phase> {
    const result = new Map<string, Phase>();
    for (const [phase, config] of phases) {
      const data: Phase = { ...config, animations: [], callbacks: [] };
      result.set(phase, data);
    }
    return result;
  }

  getHeight(): string {
    const duration = this.#getTotalDuration();
    return `${duration * 100 + 100}vh`;
  }

  add(
    componentAnimationPhases: ComponentAnimationPhases,
    componentCallbacksPhases: ComponentCallbacksPhases
  ) {
    this._addAnimationPhases(componentAnimationPhases);
    this._addCallbacksPhases(componentCallbacksPhases);
  }

  _addAnimationPhases(componentAnimationPhases: ComponentAnimationPhases) {
    for (const [phase, componentAnimation] of componentAnimationPhases) {
      const animations = this.#phases.get(phase)!.animations;
      animations.push(...componentAnimation.animations);
    }
  }

  _addCallbacksPhases(componentCallbacksPhases: ComponentCallbacksPhases) {
    for (const [phase, componentCallbacks] of componentCallbacksPhases) {
      const callbacks = this.#phases.get(phase)!.callbacks;
      callbacks.push(...componentCallbacks);
    }
  }

  remove(
    componentAnimationPhases: ComponentAnimationPhases,
    componentCallbacksPhases: ComponentCallbacksPhases
  ) {
    this._removeAnimationPhases(componentAnimationPhases);
    this._removeCallbacksPhases(componentCallbacksPhases);
  }

  _removeAnimationPhases(componentAnimationPhases: ComponentAnimationPhases) {
    for (const [phase, componentAnimation] of componentAnimationPhases) {
      const animations = this.#phases.get(phase)!.animations;
      removeArrayValues(animations, componentAnimation.animations);
    }
  }

  _removeCallbacksPhases(componentCallbacksPhases: ComponentCallbacksPhases) {
    for (const [phase, componentCallbacks] of componentCallbacksPhases) {
      const callbacks = this.#phases.get(phase)!.callbacks;
      removeArrayValues(callbacks, componentCallbacks);
    }
  }

  /**
   * It starts the screen animation.
   * @param screen The screen that triggers the animation when scrolling.
   */
  start(screen: HTMLElement) {
    this.#timeline = this._createTimeline(screen);
    this.#timelineConfig(this.#timeline);
    this.#timelineAnimation(this.#timeline);
    this.#timelineCallbacks(this.#timeline);
  }

  _createTimeline(screen: HTMLElement): gsap.core.Timeline {
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: screen,
        start: "top top",
        end: "bottom bottom",
        scrub: this.#config.scrub,
        snap: {
          snapTo: "labelsDirectional",
          delay: this.#config.snap.delay,
          duration: {
            min: this.#config.snap.duration.min,
            max: this.#config.snap.duration.max,
          },
          ease: this.#config.snap.ease,
        },
      },
    });
    return timeline;
  }

  #timelineConfig(timeline: gsap.core.Timeline) {
    this.#timelineDuration(timeline);
    this.#timelineSnap(timeline);
  }

  #timelineDuration(timeline: gsap.core.Timeline) {
    timeline.set({}, {}, this.#getTotalDuration());
  }

  #timelineSnap(timeline: gsap.core.Timeline) {
    timeline.addLabel("", 0);
    for (const [phase, config] of this.#phases) {
      if (!config.snap) continue;
      const time = this.#getEndTimePhase(phase, config);
      timeline.addLabel(phase, time);
    }
  }

  #timelineAnimation(timeline: gsap.core.Timeline) {
    for (const [phase, config] of this.#phases) {
      const startPhase = this.#getStartTimePhase(phase, config);

      for (const animation of config.animations) {
        const startInPhase = animation.config.start * config.duration;
        const endInPhase = animation.config.end * config.duration;

        const start = startPhase + startInPhase;
        const duration = endInPhase - startInPhase;

        const to = {
          ...animation.animate,
          duration: duration,
          ease: animation.config.ease,
        };

        timeline.to(animation.ref, to, start);
      }
    }
  }

  #timelineCallbacks(timeline: gsap.core.Timeline) {
    for (const [phase, config] of this.#phases) {
      const startPhase = this.#getStartTimePhase(phase, config);

      for (const callback of config.callbacks) {
        const startInPhase = callback.time * config.duration;

        const start = startPhase + startInPhase;

        timeline.call(callback.callback, undefined, start);
      }
    }
  }

  /**
   * It ends the screen animation.
   */
  end() {
    this.#destroyTimeline();
  }

  #destroyTimeline() {
    this.#timeline!.scrollTrigger!.kill();
    this.#timeline!.kill();
    this.#timeline = null;
  }

  #getTotalDuration(): number {
    return [...this.#phases.values()].reduce(
      (acc, phase) => acc + phase.delay + phase.duration,
      0
    );
  }

  #getStartTimePhase(name: string, config: ScreenAnimationPhaseConfig): number {
    let startTime = config.delay;
    for (const [phase, config] of this.#phases) {
      if (phase === name) break;
      startTime += config.delay + config.duration;
    }
    return startTime;
  }

  #getEndTimePhase(name: string, config: ScreenAnimationPhaseConfig): number {
    return this.#getStartTimePhase(name, config) + config.duration;
  }
}

function removeArrayValues(array: unknown[], values: unknown[]) {
  for (const value of values) {
    const index = array.indexOf(value);
    array.splice(index, 1);
  }
}

export default ScreenAnimation;
