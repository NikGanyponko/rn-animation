import React, { useState, useMemo, useRef } from 'react';
import { View, ImageBackground, Button } from 'react-native';
import {
  Transitioning,
  Transition as ReanimatedTR,
} from 'react-native-reanimated';
import cardImage from '../assets/card1.png';

const viewStyle = {
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
};

const rowStyle = {
  id: 'row',
  name: 'Row',
  layout: {
    container: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  },
};

const columnStyle = {
  id: 'column',
  name: 'Column',
  layout: {
    container: {
      flexDirection: 'column',
    },
  },
};

const layouts = [rowStyle, columnStyle];
const transition = (
  <ReanimatedTR.Change durationMs={400} interpolation="easeInOut" />
);

const Transition = () => {
  const ref = useRef(null);
  const [currentLayout, setCurrentLayout] = useState(layouts[1].layout);

  return (
    <>
      <Transitioning.View
        style={[viewStyle.container, currentLayout.container]}
        {...{ ref, transition }}>
        <ImageBackground
          source={cardImage}
          style={{ width: 150, height: 110 }}
          imageStyle={{ borderRadius: 10 }}
        />
        <ImageBackground
          source={cardImage}
          style={{ width: 150, height: 110 }}
          imageStyle={{ borderRadius: 10 }}
        />
        <ImageBackground
          source={cardImage}
          style={{ width: 150, height: 110 }}
          imageStyle={{ borderRadius: 10 }}
        />
      </Transitioning.View>
      <View>
        <Button
          title={'Row'}
          onPress={(a) => {
            if (ref.current) {
              ref.current.animateNextTransition();
            }
            setCurrentLayout(layouts[1].layout);
          }}
        />
        <Button
          title={'Column'}
          onPress={(a) => {
            if (ref.current) {
              ref.current.animateNextTransition();
            }
            setCurrentLayout(layouts[0].layout);
          }}
        />
      </View>
    </>
  );
};

export default Transition;
