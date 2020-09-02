import { event } from "react-native-reanimated";

const onGestureEvent = nativeEvent => {
  const gestureEvent = event([{ nativeEvent }]);
  return {
    onHandlerStateChange: gestureEvent,
    onGestureEvent: gestureEvent
  };
};

export default onGestureEvent;
