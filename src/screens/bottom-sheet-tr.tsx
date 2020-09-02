import React, { useState, useRef } from 'react';
import { View, Button, StyleSheet } from 'react-native';

import {
  Transition,
  Transitioning,
  TransitioningView,
} from 'react-native-reanimated';

const fadeTransition = (
  <Transition.Together>
    <Transition.In type="fade" durationMs={400} />
    <Transition.Out type="fade" durationMs={400} />
  </Transition.Together>
);

const slideTransition = (
  <Transition.Together>
    <Transition.In
      type="slide-bottom"
      interpolation="easeOut"
      durationMs={200}
    />
    <Transition.Out
      type="slide-bottom"
      durationMs={200}
      interpolation="easeOut"
    />
  </Transition.Together>
);

const BottomSheetTr = () => {
  const [dark, setDark] = useState<Boolean>(false);
  const containerRef = useRef<TransitioningView>(null);
  const slidingViewRef = useRef<TransitioningView>(null);

  const btnClick = () => {
    containerRef.current.animateNextTransition();
    slidingViewRef.current.animateNextTransition();
    setDark(!dark);
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
      <Transitioning.View
        ref={containerRef}
        transition={fadeTransition}
        style={{ flex: 1 }}>
        {dark && (
          <View
            style={{
              flex: 1,
              backgroundColor: '#C0C0C0',
            }}
          />
        )}
      </Transitioning.View>
      <Transitioning.View
        ref={slidingViewRef}
        transition={slideTransition}
        style={{
          ...StyleSheet.absoluteFillObject,
          top: 490,
        }}>
        {dark && (
          <View
            style={{
              height: 150,
              width: '100%',
              backgroundColor: 'red',
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}
          />
        )}
      </Transitioning.View>
    </View>
  );
};

export default BottomSheetTr;
