import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  Home,
  FadingScreen,
  Transition,
  CardTransition,
  BottomSheetCl,
  PanGestureAnimation,
  DecayAnimation,
  SpringAnimation,
} from './src/screens';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Fade" component={FadingScreen} />
        <Stack.Screen name="Transition" component={Transition} />
        <Stack.Screen name="CardTransition" component={CardTransition} />
        <Stack.Screen name="BottomSheetCl" component={BottomSheetCl} />
        <Stack.Screen
          name="PanGestureAnimation"
          component={PanGestureAnimation}
        />
        <Stack.Screen name="DecayAnimation" component={DecayAnimation} />
        <Stack.Screen name="SpringAnimation" component={SpringAnimation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
