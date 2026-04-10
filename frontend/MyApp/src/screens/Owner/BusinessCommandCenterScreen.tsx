import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { AppsGrid } from '../../components/AppsGrid';
import { LiveSignalCard } from '../../components/LiveSignalCard';
import { PulseMetricCard } from '../../components/PulseMetricCard';
import { SalesBarChart } from '../../components/SalesBarChart';
import { liveSignals, ownerDashboardFeatures, ownerMetrics, salesData } from '../../data/demoData';
import type { FeatureId } from '../../data/demoData';

interface BusinessCommandCenterScreenProps {
  onOpenFeature?: (featureId: FeatureId) => void;
}

export const BusinessCommandCenterScreen: React.FC<BusinessCommandCenterScreenProps> = ({ onOpenFeature }) => {
  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Owner Dashboard</Text>
        <Text style={styles.subtitle}>Key metrics and top item performance.</Text>
      </View>

      <Text style={styles.sectionTitle}>Overview</Text>
      <View style={styles.pulseGrid}>
        {ownerMetrics.map(metric => (
          <PulseMetricCard
            key={metric.id}
            label={metric.title}
            value={metric.value}
            context={metric.caption}
            pulse={metric.trend === 'down' ? 'attention' : 'healthy'}
          />
        ))}
      </View>

      <SalesBarChart title="Battery Pack Kits Sales" data={salesData} />

      {/* Showing only 1 critical signal to prevent overwhelming the owner */}
      {liveSignals.slice(0, 1).map(signal => (
        <LiveSignalCard
          key={signal.id}
          title={signal.title}
          summary={signal.summary}
          impact={signal.impact}
          signalType={signal.signalType}
          severity={signal.severity}
          status={signal.status}
          updatedAt={signal.updatedAt}
          actionLabel={signal.actionLabel}
        />
      ))}

      <Text style={styles.sectionTitle}>Apps</Text>
      <AppsGrid features={ownerDashboardFeatures} onOpenFeature={onOpenFeature || (() => {})} />
      
      <View style={{ height: 40 }} />
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
  sectionTitle: {
    color: '#fafafa',
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 16,
    letterSpacing: -0.3,
  },
  pulseGrid: {
    marginBottom: 8,
  },
});
