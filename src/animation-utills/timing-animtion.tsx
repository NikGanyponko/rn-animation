import { useMemo } from 'react';
import { State } from 'react-native-gesture-handler';
import Animated, { Easing } from 'react-native-reanimated';

const { Clock, Value, Extrapolate } = Animated;
const {
  set,
  useCode,
  block,
  startClock,
  timing,
  interpolate,
  cond,
  eq,
  neq,
} = Animated;

const bin = (value: boolean) => (value ? 1 : 0);

const useTimingTransition = (animatedValue, config) => {
  const value = useMemo(() => new Value(0), []);
  useCode(() => set(value, bin(animatedValue)), [animatedValue, value]);
  const transition = useMemo(() => runTiming(value, config), [value]);
  return transition;
};

const runTiming = (value, configAnim) => {
  const gestureState = new Value(State.UNDETERMINED);
  const clock = new Clock();
  const state = {
    finished: new Value(0),
    frameTime: new Value(0),
    position: new Value(0),
    time: new Value(0),
  };
  const config = {
    toValue: new Value(0),
    duration: 250,
    easing: Easing.ease,
    ...configAnim,
  };
  return block([
    startClock(clock),
    cond(neq(config.toValue, value), [
      set(state.frameTime, 0),
      set(state.time, 0),
      set(state.finished, 0),
      set(config.toValue, value),
    ]),
    cond(
      eq(gestureState, State.ACTIVE),
      [set(state.position, value)],
      timing(clock, state, config),
    ),
    state.position,
  ]);
};

export default useTimingTransition;
