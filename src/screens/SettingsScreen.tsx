import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Text } from '../components/atoms';
import {
  colors,
  spacing,
  screenPadding,
  borderRadius,
  shadows,
} from '../theme';
import { seedEmergencyNumbers } from '../services/firebaseEmergencyNumbers';

export const SettingsScreen: React.FC = () => {
  const [seeding, setSeeding] = useState(false);

  const handleSeedData = async () => {
    Alert.alert(
      'Upload Data',
      'This will upload all emergency numbers to Firebase. Continue?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Upload',
          onPress: async () => {
            setSeeding(true);
            try {
              const count = await seedEmergencyNumbers();
              Alert.alert('Success', `Uploaded ${count} countries to Firebase.`);
            } catch (err: any) {
              Alert.alert('Error', err.message || 'Failed to upload data.');
            } finally {
              setSeeding(false);
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      <ScrollView
        style={styles.content}
        bounces={true}
        overScrollMode="always"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text variant="h1" align="center">
            Settings
          </Text>
        </View>

        {/* App Info */}
        <View style={styles.section}>
          <Text variant="labelMedium" color={colors.gray[500]} style={styles.sectionTitle}>
            APP INFO
          </Text>
          <View style={styles.card}>
            <View style={styles.row}>
              <Text variant="bodyMedium">App Name</Text>
              <Text variant="bodyMedium" color={colors.gray[500]}>One Tap Call</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.row}>
              <Text variant="bodyMedium">Version</Text>
              <Text variant="bodyMedium" color={colors.gray[500]}>1.0.0</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.row}>
              <Text variant="bodyMedium">Platform</Text>
              <Text variant="bodyMedium" color={colors.gray[500]}>Expo SDK 54</Text>
            </View>
          </View>
        </View>

        {/* Firebase */}
        <View style={styles.section}>
          <Text variant="labelMedium" color={colors.gray[500]} style={styles.sectionTitle}>
            FIREBASE
          </Text>
          <View style={styles.card}>
            <Text variant="bodyMedium" color={colors.gray[700]} style={styles.seedDescription}>
              Upload all emergency numbers to Firebase Firestore. Run this once to populate the database.
            </Text>
            <TouchableOpacity
              style={[styles.seedButton, seeding && styles.seedButtonDisabled]}
              onPress={handleSeedData}
              disabled={seeding}
            >
              {seeding ? (
                <ActivityIndicator size="small" color={colors.white} />
              ) : (
                <Text variant="labelMedium" color={colors.white}>
                  Upload Data to Firebase
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* About */}
        <View style={styles.section}>
          <Text variant="labelMedium" color={colors.gray[500]} style={styles.sectionTitle}>
            ABOUT
          </Text>
          <View style={styles.card}>
            <Text variant="bodyMedium" color={colors.gray[700]}>
              One Tap Call is an emergency calling app that provides one-tap access to police, fire, and medical services worldwide. The app automatically detects your location and shows the correct emergency number for your country.
            </Text>
          </View>
        </View>

        {/* Coverage */}
        <View style={styles.section}>
          <Text variant="labelMedium" color={colors.gray[500]} style={styles.sectionTitle}>
            COVERAGE
          </Text>
          <View style={styles.card}>
            <View style={styles.row}>
              <Text variant="bodyMedium">Countries Supported</Text>
              <Text variant="bodyMedium" color={colors.primary[500]}>23+</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.row}>
              <Text variant="bodyMedium">Default Number</Text>
              <Text variant="bodyMedium" color={colors.primary[500]}>112</Text>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <Text variant="bodySmall" color={colors.gray[500]} align="center">
            Use only in real emergencies
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[50],
  },
  content: {
    flex: 1,
    paddingHorizontal: screenPadding.horizontal,
  },
  header: {
    paddingTop: spacing.lg,
    paddingBottom: spacing.lg,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    marginBottom: spacing.sm,
    paddingHorizontal: spacing.xs,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    ...shadows.small,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  divider: {
    height: 1,
    backgroundColor: colors.gray[300],
  },
  footer: {
    paddingVertical: spacing.xl,
  },
  seedDescription: {
    marginBottom: spacing.md,
  },
  seedButton: {
    backgroundColor: colors.primary[500],
    borderRadius: borderRadius.md,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  seedButtonDisabled: {
    opacity: 0.6,
  },
});
