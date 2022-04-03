import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import {
  PanGestureHandler,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

export default function ScrollAnimated() {
  const poy = useSharedValue(0);

  const onHandleEvent = useAnimatedGestureHandler({
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
      poy.value = withSpring(0);
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

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: '#ae02c9' }}>
      <View style={styles.header}>
        <Image
          style={styles.avatar}
          source={{ uri: 'https://github.com/Caio18-cosenza.png' }}
        />
        <Text style={styles.name}> Caio Cosenza </Text>
      </View>
      <PanGestureHandler onGestureEvent={onHandleEvent}>
        <Animated.ScrollView
          contentContainerStyle={{
            backgroundColor: 'white',
          }}
          style={positionStyle}
          scrollEnabled
          scrollEventThrottle={16}
        >
          <Text style={styles.listItem}> Item da lista </Text>
          <Text style={styles.listItem}> Item da lista </Text>
          <Text style={styles.listItem}> Item da lista </Text>
          <Text style={styles.listItem}> Item da lista </Text>
          <Text style={styles.listItem}> Item da lista </Text>
          <Text style={styles.listItem}> Item da lista </Text>
          <Text style={styles.listItem}> Item da lista </Text>
          <Text style={styles.listItem}> Item da lista </Text>
          <Text style={styles.listItem}> Item da lista </Text>
          <Text style={styles.listItem}> Item da lista </Text>
          <Text style={styles.listItem}> Item da lista11 </Text>
        </Animated.ScrollView>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 120,
    backgroundColor: '#ae02c9',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 40,
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    color: '#fff',
  },
  listItem: {
    padding: 20,
    fontSize: 18,
  },
  scroll: {
    flex: 1,
  },
});
