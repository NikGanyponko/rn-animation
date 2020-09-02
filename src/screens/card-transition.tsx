import React, { useState, useMemo } from 'react';
import {
  View,
  ImageBackground,
  Button,
  StyleSheet,
  Dimensions,
} from 'react-native';
import Animated, {
  multiply,
  interpolate,
  useCode,
  Value,
  Clock,
  block,
  set,
  Easing,
  clockRunning,
  Extrapolate,
  startClock,
  stopClock,
  debug,
  timing,
  neq,
  eq,
  cond,
} from 'react-native-reanimated';
import { State } from 'react-native-gesture-handler';
import cardImage from '../assets/card1.png';

const card = [
  { id: 1, name: 'fist' },
  { id: 2, name: 'second' },
  { id: 3, name: 'third' },
];

const styles = {
  view: {
    flex: 1,
    justifyContent: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    flex: 4,
    margin: 20,
  },
  image: {
    width: 200,
    height: 150,
  },
};

const { width } = Dimensions.get('window');
const transformOrigin = -width / 2;

const bin = (value: boolean): 0 | 1 => (value ? 0 : 1);

const useTransition = (state) => {
  const value = useMemo(() => new Value(0), []);

  useCode(() => set(value, typeof state === 'boolean' ? bin(state) : state), [
    state,
    value,
  ]);

  const clock = new Clock();

  const localState = {
    finished: new Value(0),
    frameTime: new Value(0),
    position: new Value(0),
    time: new Value(0),
  };
  const config = {
    toValue: new Value(1),
    duration: 250,
    easing: Easing.linear,
  };

  return block([
    startClock(clock),
    timing(clock, localState, config),
    localState.position,
  ]);
};

const CardTransition = () => {
  const [toggled, setToggled] = useState(0);
  const [animStarted, setAnimStarted] = useState(0);

  return (
    <>
      <View style={styles.view}>
        {card.map((el, index) => {
          const direction = interpolate(index, {
            inputRange: [0, 1, 2],
            outputRange: [-1, 0, 1],
          });

          const testTransition = useTransition(toggled, animStarted);

          const rotate = multiply(
            direction,
            interpolate(testTransition, {
              inputRange: [0, 1],
              outputRange: toggled ? [0, Math.PI / 6] : [Math.PI / 6, 0],
              extrapolate: Extrapolate.CLAMP,
            }),
          );

          return (
            <Animated.View
              key={el.id}
              style={[
                styles.overlay,
                animStarted && {
                  transform: [
                    { translateX: transformOrigin },
                    { rotate },
                    { translateX: -transformOrigin },
                  ],
                },
              ]}>
              <ImageBackground
                source={cardImage}
                style={styles.image}
                imageStyle={{ borderRadius: 10 }}
              />
            </Animated.View>
          );
        })}
      </View>
      <View>
        <Button
          title={'Click here'}
          style={styles.button}
          onPress={() => {
            !animStarted && setAnimStarted(1);
            setToggled(toggled ^ 1);
          }}
        />
      </View>
    </>
  );
};

export default CardTransition;
