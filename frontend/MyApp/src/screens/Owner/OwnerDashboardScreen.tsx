import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { ActionQueueItem } from '../../components/ActionQueueItem';
import { MetricCard } from '../../components/MetricCard';
import { TargetProgressBar } from '../../components/TargetProgressBar';
import {
  actionQueue,
  ownerMetrics,
} from '../../data/demoData';
import type { FeatureId } from '../../data/demoData';

export type OwnerDashboardFeatureId = FeatureId;

interface OwnerDashboardScreenProps {
  onOpenFeature?: (featureId: OwnerDashboardFeatureId) => void;
}

export const OwnerDashboardScreen: React.FC<OwnerDashboardScreenProps> = () => {
  const urgentActions = actionQueue.slice(0, 4);

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
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

      <Text style={styles.sectionTitle}>Action queue</Text>
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
  eyebrow: {
    color: '#10B981',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.5,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  title: {
    color: '#fafafa',
    fontSize: 32,
    fontWeight: '800',
    lineHeight: 38,
    marginBottom: 8,
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
  },
});
