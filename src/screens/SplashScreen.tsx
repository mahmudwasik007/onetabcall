/**
 * Splash Screen
 * Welcome screen with app branding and smooth transition
 */

import React, { useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Text } from '../components/atoms';
import { colors, gradients, spacing } from '../theme';

interface SplashScreenProps {
  onComplete: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    // Animate logo appearance
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 40,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();

    // Navigate to home after delay
    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start(() => {
        onComplete();
      });
    }, 2500);

    return () => clearTimeout(timer);
  }, [fadeAnim, scaleAnim, onComplete]);

  return (
    <LinearGradient
      colors={gradients.splash.colors}
      start={gradients.splash.start}
      end={gradients.splash.end}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" backgroundColor={colors.primary[500]} />
      <SafeAreaView style={styles.content}>
        <Animated.View
          style={[
            styles.logoContainer,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          {/* App Logo/Icon */}
          <View style={styles.logo}>
            <View style={styles.logoCircle}>
              <Text
                variant="displayLarge"
                color={colors.primary[500]}
                align="center"
              >
                1
              </Text>
            </View>
          </View>

          {/* App Title */}
          <Text
            variant="displaySmall"
            color={colors.white}
            align="center"
            style={styles.title}
          >
            One Tap Call
          </Text>

          {/* Tagline */}
          <Text
            variant="bodyLarge"
            color={colors.white}
            align="center"
            style={styles.tagline}
          >
            Emergency help, one tap away
          </Text>

          {/* Emergency Icon */}
          <View style={styles.iconContainer}>
            <Text variant="h1" color={colors.white}>
              🛡️
            </Text>
          </View>
        </Animated.View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    marginBottom: spacing.lg,
  },
  logoCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.shadow.default,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  title: {
    marginBottom: spacing.sm,
  },
  tagline: {
    opacity: 0.9,
    marginBottom: spacing['2xl'],
  },
  iconContainer: {
    marginTop: spacing.lg,
  },
});
