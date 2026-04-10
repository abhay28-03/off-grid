import React from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { AppsGrid } from '../../components/AppsGrid';
import { MetricCard } from '../../components/MetricCard';
import { StockUpdateCard } from '../../components/StockUpdateCard';
import { TargetProgressBar } from '../../components/TargetProgressBar';
import {
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

export const EmployeeDashboardScreen: React.FC<EmployeeDashboardScreenProps> = ({ onOpenFeature }) => {
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

      <Text style={styles.sectionTitle}>Overview</Text>
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
      <FlatList
        data={[
          { id: '1', name: 'Battery Pack Kits', stock: 42, sales: 3 },
          { id: '2', name: 'Solar Controller', stock: 15, sales: 0 },
          { id: '3', name: 'Water Filters', stock: 8, sales: 1 },
        ]}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={296} // 280 width + 16 gap
        decelerationRate="fast"
        contentContainerStyle={styles.horizontalScrollContent}
        style={styles.horizontalScroll}
        renderItem={({ item }) => (
          <StockUpdateCard
            itemName={item.name}
            initialStock={item.stock}
            initialSales={item.sales}
            onUpdate={handleStockUpdate}
            style={{ width: 280, marginRight: 16 }}
          />
        )}
      />

      <Text style={styles.sectionTitle}>Apps</Text>
      <AppsGrid features={employeeDashboardFeatures} onOpenFeature={onOpenFeature || (() => {})} />

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
  horizontalScroll: {
    marginHorizontal: -20,
  },
  horizontalScrollContent: {
    paddingHorizontal: 20,
  },
});
