import React, { useEffect } from 'react';
import { View, Text, Dimensions } from 'react-native';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {
  PanGestureHandler,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');

export default function Drag() {
  const pox = useSharedValue(0);
  const poy = useSharedValue(0);

  const onGestureEvent = useAnimatedGestureHandler({
    onStart(event, ctx: any) {
      ctx.pox = pox.value;
      ctx.poy = poy.value;
    },
    onActive(event, ctx: any) {
      pox.value = ctx.pox + event.translationX;
      poy.value = ctx.poy + event.translationY;
    },
    onEnd() {
      pox.value = withSpring(0);
      poy.value = withSpring(0);
    },
  });

  const positionStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: pox.value,
        },
        {
          translateY: poy.value,
        },
      ],
    };
  });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1, marginTop: 30 }}>
        <PanGestureHandler onGestureEvent={onGestureEvent}>
          <Animated.View
            style={[
              { width: 200, height: 200, backgroundColor: 'blue' },
              positionStyle,
            ]}
          />
        </PanGestureHandler>
      </View>
    </GestureHandlerRootView>
  );
}
