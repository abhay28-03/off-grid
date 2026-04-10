import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { ActionQueueItem } from '../../components/ActionQueueItem';
import { LiveSignalCard } from '../../components/LiveSignalCard';
import { MetricCard } from '../../components/MetricCard';
import {
  actionQueue,
  liveSignals,
  ownerDashboardFeatures,
  ownerMetrics,
} from '../../data/demoData';
import type { FeatureId } from '../../data/demoData';

export type OwnerDashboardFeatureId = FeatureId;

interface OwnerDashboardScreenProps {
  onOpenFeature?: (featureId: OwnerDashboardFeatureId) => void;
}

export const OwnerDashboardScreen: React.FC<OwnerDashboardScreenProps> = ({
  onOpenFeature,
}) => {
  const urgentActions = actionQueue.slice(0, 2);
  const topSignal = liveSignals[0];

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.eyebrow}>Owner workspace</Text>
        <Text style={styles.title}>Command the business in real time.</Text>
        <Text style={styles.subtitle}>
          Signals, cashflow, routes, clients, and team workload are ready from one
          control room.
        </Text>
      </View>

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

      <Text style={styles.sectionTitle}>Highest impact signal</Text>
      <LiveSignalCard
        title={topSignal.title}
        summary={topSignal.summary}
        impact={topSignal.impact}
        signalType={topSignal.signalType}
        severity={topSignal.severity}
        status={topSignal.status}
        updatedAt={topSignal.updatedAt}
        actionLabel={topSignal.actionLabel}
      />

      <Text style={styles.sectionTitle}>Feature access</Text>
      <View style={styles.grid}>
        {ownerDashboardFeatures.map(feature => (
          <TouchableOpacity
            key={feature.id}
            activeOpacity={0.78}
            style={styles.featureCard}
            onPress={() => onOpenFeature?.(feature.id)}
          >
            <View style={styles.featureHeader}>
              <Text style={styles.featureTitle}>{feature.title}</Text>
              <Text style={styles.signal}>{feature.signal}</Text>
            </View>
            <Text style={styles.featureSummary}>{feature.summary}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Owner action queue</Text>
      {urgentActions.map(action => (
        <ActionQueueItem
          key={action.id}
          title={action.title}
          detail={action.detail}
          owner={action.owner}
          dueLabel={action.dueLabel}
          priority={action.priority}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#F5F7FA',
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 32,
  },
  header: {
    marginBottom: 20,
  },
  eyebrow: {
    color: '#0F766E',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  title: {
    color: '#111827',
    fontSize: 30,
    fontWeight: '800',
    lineHeight: 36,
    marginBottom: 8,
  },
  subtitle: {
    color: '#4B5563',
    fontSize: 15,
    lineHeight: 22,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  sectionTitle: {
    color: '#111827',
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 10,
    marginTop: 12,
  },
  grid: {
    marginBottom: 8,
  },
  featureCard: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E5E7EB',
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 12,
    padding: 16,
  },
  featureHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  featureTitle: {
    color: '#111827',
    flex: 1,
    fontSize: 17,
    fontWeight: '800',
    marginRight: 12,
  },
  signal: {
    color: '#0F766E',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0,
    textTransform: 'uppercase',
  },
  featureSummary: {
    color: '#4B5563',
    fontSize: 14,
    lineHeight: 20,
  },
});
