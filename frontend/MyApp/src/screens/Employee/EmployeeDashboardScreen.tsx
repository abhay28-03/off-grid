import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { ActionQueueItem } from '../../components/ActionQueueItem';
import { MetricCard } from '../../components/MetricCard';
import { StockUpdateCard } from '../../components/StockUpdateCard';
import { TargetProgressBar } from '../../components/TargetProgressBar';
import {
  actionQueue,
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

export const EmployeeDashboardScreen: React.FC<EmployeeDashboardScreenProps> = () => {
  const assignedActions = actionQueue.slice(1, 3); // Slightly trim action queue to declutter

  const handleStockUpdate = (newSales: number) => {
    console.log('Stock updated:', newSales);
  };

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Employee Portal</Text>
        <Text style={styles.subtitle}>
          Today's operational metrics, tasks, and stock log.
        </Text>
      </View>

      <TargetProgressBar
        title="Daily Collections Target"
        current={21400}
        target={15000}
        prefix="Rs "
      />

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

      <Text style={styles.sectionTitle}>Stock Management</Text>
      <StockUpdateCard
        itemName="Battery Pack Kits"
        initialStock={42}
        initialSales={3}
        onUpdate={handleStockUpdate}
      />

      <Text style={styles.sectionTitle}>My Action Queue</Text>
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
    marginBottom: 8,
  },
  sectionTitle: {
    color: '#fafafa',
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 16,
    marginTop: 16,
    letterSpacing: -0.3,
  },
});
