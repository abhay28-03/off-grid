import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { ActionQueueItem } from '../../components/ActionQueueItem';
import { MetricCard } from '../../components/MetricCard';
import {
  actionQueue,
  employeeDashboardFeatures,
  employeeMetrics,
} from '../../data/demoData';
import type { FeatureId } from '../../data/demoData';

export type EmployeeDashboardFeatureId =
  | 'team-pulse'
  | 'revenue-stream'
  | 'workflow-pulse'
  | 'field-ops-map'
  | 'client-pulse'
  | 'ops-timeline'
  | 'live-signal-desk';

interface EmployeeDashboardScreenProps {
  onOpenFeature?: (featureId: FeatureId) => void;
}

export const EmployeeDashboardScreen: React.FC<EmployeeDashboardScreenProps> = ({
  onOpenFeature,
}) => {
  const assignedActions = actionQueue.slice(1, 4);

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.eyebrow}>Employee workspace</Text>
        <Text style={styles.title}>Your shift, signals, and actions.</Text>
        <Text style={styles.subtitle}>
          Work from live task flow, route status, client updates, and offline sync
          health.
        </Text>
      </View>

      <View style={styles.metricsGrid}>
        {employeeMetrics.map(metric => (
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

      <Text style={styles.sectionTitle}>Feature access</Text>
      <View style={styles.grid}>
        {employeeDashboardFeatures.map(feature => (
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

      <Text style={styles.sectionTitle}>My action queue</Text>
      {assignedActions.map(action => (
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
    color: '#BE123C',
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
    color: '#BE123C',
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
