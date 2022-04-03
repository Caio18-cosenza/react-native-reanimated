import React, { useState } from 'react';
import { View, Text, Button, Dimensions } from 'react-native';
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from 'react-native-gesture-handler';
import Animated, {
  withSpring,
  useSharedValue,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

export default function BottomSheet() {
  const poy = useSharedValue(0);
  const showBottom = useSharedValue(height);

  const handleOpenBottom = () => {
    showBottom.value = withTiming(height - 400, { duration: 500 });
    if (showBottom.value !== height) {
      showBottom.value = withTiming(height, { duration: 500 });
    }
  };

  const onGestureEvent = useAnimatedGestureHandler({
    onStart(event, ctx: any) {
      ctx.poy = poy.value;
    },
    onActive(event, ctx: any) {
      poy.value = ctx.poy + event.translationY;
      if (poy.value <= 0) {
        poy.value = 0;
      }
    },
    onEnd() {
      poy.value = withTiming(0);
      if (poy.value >= 200) {
        showBottom.value = withTiming(height, {
          duration: 200,
          easing: Easing.ease,
        });
      }
    },
  });

  const positionStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: poy.value,
        },
      ],
    };
  });

  const bottomStyle = useAnimatedStyle(() => {
    return {
      height: showBottom.value,
    };
  });

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: '#1c1c1c' }}>
      <Animated.View
        style={[
          {
            marginTop: 30,
            backgroundColor: '#1c1c1c',
            width: '100%',
          },
          bottomStyle,
        ]}
      >
        <Text> Hello Icode </Text>
        <Button onPress={handleOpenBottom} title='Abrir bottomSheet' />
      </Animated.View>
      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View
          style={[
            {
              flex: 1,
              backgroundColor: 'white',
              display: 'flex',
              borderTopStartRadius: 20,
              borderTopEndRadius: 20,
              alignItems: 'center',
              paddingVertical: 10,
            },
            positionStyle,
          ]}
        >
          <View
            style={{
              width: 40,
              height: 2,
              backgroundColor: 'gray',
              marginBottom: 20,
            }}
          />
          <Text> BottomSheet aqui </Text>
        </Animated.View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
}
