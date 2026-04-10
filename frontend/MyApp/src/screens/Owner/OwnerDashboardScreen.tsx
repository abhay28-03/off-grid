import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { AppsGrid } from '../../components/AppsGrid';
import { MetricCard } from '../../components/MetricCard';
import { TargetProgressBar } from '../../components/TargetProgressBar';
import {
  ownerDashboardFeatures,
  ownerMetrics,
} from '../../data/demoData';
import type { FeatureId } from '../../data/demoData';

export type OwnerDashboardFeatureId = FeatureId;

interface OwnerDashboardScreenProps {
  onOpenFeature?: (featureId: OwnerDashboardFeatureId) => void;
}

export const OwnerDashboardScreen: React.FC<OwnerDashboardScreenProps> = ({ onOpenFeature }) => {
  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Workspace</Text>
        <Text style={styles.subtitle}>
          Your high level operations and connected apps.
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Overview</Text>
      <TargetProgressBar
        title="Daily Revenue Target"
        current={84200}
        target={100000}
        prefix="Rs "
      />

      <View style={styles.metricsGrid}>
        {ownerMetrics.map(metric => (
          <MetricCard
            key={metric.id}
            title={metric.title}
            value={metric.value}
            trend={metric.trend}
            trendValue={metric.trendValue}
            caption={metric.caption}
          />
        ))}
      </View>

      <Text style={styles.sectionTitle}>Apps</Text>
      <AppsGrid features={ownerDashboardFeatures} onOpenFeature={onOpenFeature || (() => {})} />

      <View style={{ height: 60 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#09090b',
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 32,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    color: '#fafafa',
    fontSize: 32,
    fontWeight: '800',
    lineHeight: 38,
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    color: '#a1a1aa',
    fontSize: 16,
    lineHeight: 24,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  sectionTitle: {
    color: '#fafafa',
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 16,
    marginTop: 12,
    letterSpacing: -0.3,
  },
});
