import React, { useState, useEffect, useMemo } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { Text } from '../components/atoms';
import { SearchBar } from '../components/atoms/SearchBar';
import {
  colors,
  spacing,
  screenPadding,
  borderRadius,
  shadows,
} from '../theme';
import {
  EmergencyNumber,
  emergencyNumbers as localEmergencyNumbers,
  fetchAllEmergencyNumbers,
} from '../utils/emergency-numbers';

export const NumbersScreen: React.FC = () => {
  const [search, setSearch] = useState('');
  const [numbers, setNumbers] = useState<EmergencyNumber[]>(localEmergencyNumbers);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllEmergencyNumbers()
      .then(setNumbers)
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    if (!search.trim()) return numbers;
    const q = search.toLowerCase();
    return numbers.filter(
      (entry) =>
        entry.country.toLowerCase().includes(q) ||
        entry.countryCode.toLowerCase().includes(q)
    );
  }, [search, numbers]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      <View style={styles.content}>
        <View style={styles.header}>
          <Text variant="h1" align="center">
            Emergency Numbers
          </Text>
          <Text
            variant="bodyMedium"
            color={colors.gray[500]}
            align="center"
            style={styles.subtitle}
          >
            Search by country
          </Text>
        </View>

        <SearchBar
          value={search}
          onChangeText={setSearch}
          placeholder="Search country..."
        />

        {loading && (
          <View style={styles.loadingRow}>
            <ActivityIndicator size="small" color={colors.primary[500]} />
            <Text variant="bodySmall" color={colors.gray[500]} style={styles.loadingText}>
              Loading from Firebase...
            </Text>
          </View>
        )}

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          bounces={true}
          overScrollMode="always"
        >
          {filtered.map((entry) => (
            <View key={entry.countryCode} style={styles.card}>
              <View style={styles.cardHeader}>
                <Text variant="h3">{entry.country}</Text>
                <Text variant="labelMedium" color={colors.gray[500]}>
                  {entry.countryCode}
                </Text>
              </View>

              {entry.unified && (
                <View style={styles.unifiedRow}>
                  <Text variant="labelSmall" color={colors.primary[600]}>
                    Unified: {entry.unified}
                  </Text>
                </View>
              )}

              <View style={styles.servicesRow}>
                <View style={[styles.serviceBadge, { backgroundColor: `${colors.services.police}15` }]}>
                  <Text variant="labelSmall" color={colors.services.police}>
                    Police
                  </Text>
                  <Text variant="bodyLarge" color={colors.services.police}>
                    {entry.services.police}
                  </Text>
                </View>

                <View style={[styles.serviceBadge, { backgroundColor: `${colors.services.fire}15` }]}>
                  <Text variant="labelSmall" color={colors.services.fire}>
                    Fire
                  </Text>
                  <Text variant="bodyLarge" color={colors.services.fire}>
                    {entry.services.fire}
                  </Text>
                </View>

                <View style={[styles.serviceBadge, { backgroundColor: `${colors.services.medical}15` }]}>
                  <Text variant="labelSmall" color={colors.services.medical}>
                    Medical
                  </Text>
                  <Text variant="bodyLarge" color={colors.services.medical}>
                    {entry.services.medical}
                  </Text>
                </View>
              </View>
            </View>
          ))}

          {filtered.length === 0 && (
            <View style={styles.empty}>
              <Text variant="bodyLarge" color={colors.gray[500]} align="center">
                No countries found
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
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
  },
  subtitle: {
    marginTop: spacing.xs,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    gap: spacing.md,
    paddingBottom: spacing.xl,
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    ...shadows.small,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  unifiedRow: {
    marginBottom: spacing.sm,
  },
  servicesRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  serviceBadge: {
    flex: 1,
    borderRadius: borderRadius.sm,
    padding: spacing.sm,
    alignItems: 'center',
  },
  empty: {
    paddingVertical: spacing['2xl'],
  },
  loadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.sm,
  },
  loadingText: {
    marginLeft: spacing.sm,
  },
});
