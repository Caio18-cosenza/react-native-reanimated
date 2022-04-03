import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

export default function Scroll() {
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler((event): any => {
    scrollY.value = event.contentOffset.y;
  });

  const headerStyle = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value,
        [0, 180],
        [300, 100],
        Extrapolate.CLAMP
      ),
    };
  });

  const avatarOpacity = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollY.value,
        [100, 150],
        [1, 0],
        Extrapolate.CLAMP
      ),
    };
  });

  return (
    <View>
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        contentContainerStyle={{ paddingTop: 300 }}
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
        <Text style={styles.listItem}> Item da lista </Text>
        <Text style={styles.listItem}> Item da lista </Text>
        <Text style={styles.listItem}> Item da lista </Text>
        <Text style={styles.listItem}> Item da lista </Text>
        <Text style={styles.listItem}> Item da lista </Text>
        <Text style={styles.listItem}> Item da lista </Text>
        <Text style={styles.listItem}> Item da lista </Text>
        <Text style={styles.listItem}> Item da lista </Text>
        <Text style={styles.listItem}> Item da lista </Text>
      </Animated.ScrollView>
      <Animated.View style={[styles.header, headerStyle]}>
        <Animated.Image
          style={[styles.avatar, avatarOpacity]}
          source={{ uri: 'https://github.com/Caio18-cosenza.png' }}
        />
        <Text style={styles.name}> Caio Cosenza </Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 300,
    backgroundColor: '#6c63ff',
    paddingVertical: 30,
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    overflow: 'hidden',
  },
  avatar: {
    width: 140,
    height: 140,
    borderRadius: 70,
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
});
