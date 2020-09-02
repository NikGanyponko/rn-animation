import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './src/screens/home';
import FadingScreen from './src/screens/fade';
import Transition from './src/screens/transition';
import CardTransition from './src/screens/card-transition';
import BottomSheetCl from './src/screens/bottom-sheet-cl';
import PanGestureAnimation from './src/screens/pan-gesture';
import DecayAnimation from './src/screens/decay-animation';
import SpringAnimation from './src/screens/spring';

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
