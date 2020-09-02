import React from 'react';
import { View, ImageBackground } from 'react-native';
import Animated, {
  Value,
  event,
  cond,
  eq,
  set,
  and,
  not,
  block,
  Clock,
  neq,
  decay,
  clockRunning,
  startClock,
  stopClock,
  add,
} from 'react-native-reanimated';
import { State, PanGestureHandler } from 'react-native-gesture-handler';
import cardImage from '../assets/card1.png';

const imageStyle = {
  width: 200,
  height: 150,
};

const onGestureEvent = (nativeEvent) => {
  const gestureEvent = event([{ nativeEvent }]);
  return {
    onHandlerStateChange: gestureEvent,
    onGestureEvent: gestureEvent,
  };
};

const offsetX = new Value(0);
const offsetY = new Value(0);

const withDecay = (value, state, velocity, offset) => {
  const deceleration = 0.99;

  const clock = new Clock();

  const decayState = {
    finished: new Value(0),
    velocity: new Value(0),
    position: new Value(0),
    time: new Value(0),
  };

  return block([
    cond(and(eq(state, State.BEGAN), clockRunning(clock)), [
      set(offset, decayState.position),
      stopClock(clock),
    ]),

    cond(neq(state, State.END), [
      set(decayState.finished, 0),
      set(decayState.position, add(offset, value)),
    ]),

    cond(eq(state, State.END), [
      cond(and(not(clockRunning(clock)), not(decayState.finished)), [
        set(decayState.velocity, velocity),
        set(decayState.time, 0),
        startClock(clock),
      ]),

      decay(clock, decayState, { deceleration }),
      cond(decayState.finished, [
        set(offset, decayState.position),
        stopClock(clock),
      ]),
    ]),
    decayState.position,
  ]);
};

const DecayAnimation = () => {
  const state = new Value(State.UNDETERMINED);
  const translationX = new Value(0);
  const translationY = new Value(0);
  const velocityX = new Value(0);
  const velocityY = new Value(0);

  const gestureHandler = onGestureEvent({
    state,
    translationX,
    translationY,
    velocityX,
    velocityY,
  });

  const translateX = withDecay(translationX, state, velocityX, offsetX);
  const translateY = withDecay(translationY, state, velocityY, offsetY);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <PanGestureHandler {...gestureHandler}>
        <Animated.View style={{ transform: [{ translateX }, { translateY }] }}>
          <ImageBackground
            source={cardImage}
            style={imageStyle}
            imageStyle={{ borderRadius: 10 }}
          />
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

export default DecayAnimation;
