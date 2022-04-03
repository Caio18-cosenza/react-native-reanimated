import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import ImageEAD from '../hero.png';

export default function Login() {
  const titlePosition = useSharedValue(80);
  const imagePosition = useSharedValue(-30);

  const titleStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: titlePosition.value,
        },
      ],
      opacity: interpolate(
        titlePosition.value,
        [30, 0],
        [0, 1],
        Extrapolate.CLAMP
      ),
    };
  });

  const imageStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: imagePosition.value }],
    };
  });

  useEffect(() => {
    imagePosition.value = withTiming(
      0,
      {
        duration: 500,
      },
      () => {
        titlePosition.value = withTiming(0, {
          duration: 1000,
          easing: Easing.bounce,
        });
      }
    );
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Image style={[styles.image, imageStyle]} source={ImageEAD} />
      <Animated.Text style={[styles.title, titleStyle]}>
        {' '}
        Bem vindo ao App{' '}
      </Animated.Text>
      <StatusBar style='light' backgroundColor='#13131a' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#13131a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#fff',
  },
  image: {
    width: 288,
    height: 200,
    marginBottom: 40,
  },
});
