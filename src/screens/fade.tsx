import React, { useState, useMemo } from 'react';
import Animated, {
  Value,
  Clock,
  useCode,
  block,
  set,
  clockRunning,
  startClock,
  interpolate,
  Extrapolate,
  cond,
  not,
  add,
  eq,
  stopClock,
} from 'react-native-reanimated';
import { StyleSheet, View, ImageBackground, Button } from 'react-native';
import cardImage from '../assets/card1.png';

const duration = 2000;

const FadingScreen = () => {
  const [show, setShow] = useState(true);

  const { time, clock, progress } = useMemo(
    () => ({
      time: new Value(0),
      clock: new Clock(),
      progress: new Value(0),
    }),
    [],
  );

  const opacity = interpolate(progress, {
    inputRange: [0, 1],
    outputRange: show ? [0, 1] : [1, 0],
    extrapolate: Extrapolate.CLAMP,
  });

  useCode(
    () =>
      block([
        cond(not(clockRunning(clock)), [startClock(clock), set(time, clock)]),
        set(
          progress,
          interpolate(clock, {
            inputRange: [time, add(time, duration)],
            outputRange: [0, 1],
            extrapolate: Extrapolate.CLAMP,
          }),
        ),
        cond(eq(progress, 1), stopClock(clock)),
      ]),
    [show],
  );

  return (
    <View style={styles.container}>
      <Animated.View style={{ opacity }}>
        <ImageBackground
          source={cardImage}
          style={{ width: 200, height: 150 }}
          imageStyle={{ borderRadius: 10 }}
        />
      </Animated.View>
      <View style={styles.buttonContainer}>
        <Button
          title={show ? 'Hide' : 'Show'}
          onPress={() => setShow((prev) => !prev)}
        />
      </View>
    </View>
  );
};

export default FadingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  buttonContainer: {
    width: 200,
    borderRadius: 20,
  },
});
