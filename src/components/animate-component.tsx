import React, { useLayoutEffect } from 'react';

import useScreenAnimation from '../hooks/use-screen-animation';

import ComponentAnimationPhases from '../classes/component-animation-phases';
import ComponentCallbacksPhases from '../classes/component-callbacks-phases';

type Ref = (...tags: string[]) => <T extends HTMLElement>(ref: T) => void;
type Render = (ref: Ref) => React.ReactNode;

interface AnimateComponentProps {
  render: Render;
  animationPhases: ComponentAnimationPhases;
  setCallbacksPhases?: (callbacks: ComponentCallbacksPhases) => void;
}

/**
 * It is a component used to animate its elements.
 */
function AnimateComponent({
  render,
  animationPhases,
  setCallbacksPhases = () => {},
}: AnimateComponentProps) {
  const screenAnimation = useScreenAnimation();

  useLayoutEffect(() => {
    const callbacksPhases = new ComponentCallbacksPhases();
    setCallbacksPhases(callbacksPhases);
    screenAnimation.add(animationPhases, callbacksPhases);
    return () => screenAnimation.remove(animationPhases, callbacksPhases);
  }, [screenAnimation, animationPhases, setCallbacksPhases]);

  function ref(...tags: string[]): (element: HTMLElement) => void {
    return <T extends HTMLElement>(element: T) => {
      for (const [, animation] of animationPhases)
        for (const refAnimations of animation.animations)
          if (tags.includes(refAnimations.tag)) refAnimations.ref.push(element);
    };
  }

  return render(ref);
}

export default AnimateComponent;
