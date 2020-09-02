import React, { useState, useMemo, memo } from 'react';
import {
  View,
  Button,
  StyleSheet,
  Dimensions,
  ScrollView,
  ImageBackground,
} from 'react-native';
import Animated from 'react-native-reanimated';
import useTimingTransition from '../animation-utills/timing-animtion';
import cardImage from '../assets/card1.png';

const UI_testScroll = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const UI_animationDuration = 300;
const UI_fadeViewBgColor = '#C0C0C0';
const UI_slidingViewHeight = 250;
const UI_slidingViewBgColor = 'red';

const heightScreen = Dimensions.get('window').height;

const BottomSheet = memo(() => {
  const [animationOpened, setAnimationOpened] = useState<Boolean>(false);

  const fadeViewStyle = useMemo(
    () => ({
      ...StyleSheet.absoluteFillObject,
      flex: 1,
      backgroundColor: UI_fadeViewBgColor,
    }),
    [UI_fadeViewBgColor],
  );

  const slidingViewStyle = useMemo(
    () => ({
      ...StyleSheet.absoluteFillObject,
      height: UI_slidingViewHeight,
      top: heightScreen,
      width: '100%',
      backgroundColor: UI_slidingViewBgColor,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    }),
    [UI_slidingViewHeight, UI_slidingViewBgColor],
  );

  const progressAnimation = useTimingTransition(animationOpened, {
    duration: UI_animationDuration,
  });

  const fadeAnimation = Animated.interpolate(progressAnimation, {
    inputRange: [0, 1],
    outputRange: [0, 0.7],
    extrapolate: Animated.Extrapolate.CLAMP,
  });

  const transitionAnimation = Animated.interpolate(progressAnimation, {
    inputRange: [0, 1],
    outputRange: [heightScreen, heightScreen - UI_slidingViewHeight],
    extrapolate: Animated.Extrapolate.CLAMP,
  });

  const fadeViewOnTouch = () => {
    setAnimationOpened(!animationOpened);
  };

  const btnClick = () => {
    setAnimationOpened(!animationOpened);
  };

  return (
    <View style={{ flex: 1, marginTop: 40 }}>
      <Button
        style={{
          marginTop: 50,
        }}
        title="Click"
        onPress={btnClick}
      />

      <ScrollView style={{ flex: 1, height: '100%', width: '100%' }}>
        {UI_testScroll.map(() => (
          <ImageBackground
            source={cardImage}
            style={{
              width: 200,
              height: 150,
            }}
            imageStyle={{ borderRadius: 10 }}
          />
        ))}
      </ScrollView>

      <Animated.View
        onTouchStart={animationOpened && fadeViewOnTouch}
        pointerEvents={animationOpened ? 'auto' : 'none'}
        style={[fadeViewStyle, { opacity: fadeAnimation }]}
      />
      <Animated.View style={[slidingViewStyle, { top: transitionAnimation }]} />
    </View>
  );
});

export default BottomSheet;
