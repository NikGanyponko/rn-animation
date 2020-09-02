import React from 'react';
import { View, ImageBackground, Dimensions } from 'react-native';
import Animated, {
  Value,
  event,
  diffClamp,
  cond,
  eq,
  set,
  add,
} from 'react-native-reanimated';
import { State, PanGestureHandler } from 'react-native-gesture-handler';
import cardImage from '../assets/card1.png';

const onGestureEvent = (nativeEvent) => {
  const gestureEvent = event([{ nativeEvent }]);
  return {
    onHandlerStateChange: gestureEvent,
    onGestureEvent: gestureEvent,
  };
};

const withOffset = (
  value: Animated.Node<number>,
  state: Animated.Value<State>,
  offset: Animated.Value<number> = new Value(0),
) =>
  cond(
    eq(state, State.END),
    [set(offset, add(offset, value)), offset],
    add(offset, value),
  );

const imageStyle = {
  width: 200,
  height: 150,
};

const cardWidth = imageStyle.width - 64;
const cardHeight = cardWidth / 1.5;

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const offsetX = new Value((screenWidth - cardWidth) / 2);
const offsetY = new Value((screenHeight - cardHeight) / 2);

const PanGestureAnimation = () => {
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

  const translateX = withOffset(translationX, state, offsetX);
  const translateY = withOffset(translationY, state, offsetY);

  return (
    <View style={{ flex: 1 }}>
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

export default PanGestureAnimation;
