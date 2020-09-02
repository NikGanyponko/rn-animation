import {
  Clock,
  Value,
  block,
  cond,
  eq,
  neq,
  set,
  add,
  and,
  not,
  clockRunning,
  startClock,
  stopClock,
  spring,
  greaterOrEq,
  call
} from "react-native-reanimated";
import { State } from "react-native-gesture-handler";

const withSpring = (
  value,
  state,
  velocity,
  offset,
  snapPoint,
  onSwipedRatio,
  onSwiped
) => {
  const clock = new Clock();

  const springState = {
    finished: new Value(0),
    velocity: new Value(0),
    position: new Value(0),
    time: new Value(0)
  };

  const config = {
    damping: 10,
    mass: 1,
    stiffness: 100,
    overshootClamping: false,
    restSpeedThreshold: 0.001,
    restDisplacementThreshold: 0.001,
    toValue: snapPoint
  };

  const onSwipe =
    onSwiped && onSwipedRatio
      ? [cond(clockRunning(clock), call([springState.position], onSwiped))]
      : [];

  return block([
    cond(and(eq(state, State.BEGAN), clockRunning(clock)), [
      set(offset, springState.position),
      stopClock(clock)
    ]),

    cond(neq(state, State.END), [
      set(springState.finished, 0),
      set(springState.position, add(offset, value))
    ]),

    cond(eq(state, State.END), [
      cond(and(not(clockRunning(clock)), not(springState.finished)), [
        set(springState.velocity, velocity),
        set(springState.time, 0),
        startClock(clock)
      ]),

      spring(clock, springState, config),
      cond(
        and(
          clockRunning(clock),
          greaterOrEq(springState.position, new Value(50))
        ),
        call([springState.position], onSwiped)
      ),
      cond(springState.finished, [
        set(offset, springState.position),
        stopClock(clock)
      ])
    ]),
    springState.position
  ]);
};

export default withSpring;
