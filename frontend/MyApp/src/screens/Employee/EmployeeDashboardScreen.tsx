import React from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  DeviceEventEmitter,
} from 'react-native';

import { AppsGrid } from '../../components/AppsGrid';
import { MetricCard } from '../../components/MetricCard';
import { StockUpdateCard } from '../../components/StockUpdateCard';
import { TargetProgressBar } from '../../components/TargetProgressBar';
import { fetchEmployeeDashboard, fetchEmployeeMetrics, fetchInventory, updateStock } from '../../api/client';
import type { FeatureId, DashboardFeature, Metric } from '../../data/demoData';

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
  const [features, setFeatures] = React.useState<DashboardFeature[]>([]);
  const [metrics, setMetrics] = React.useState<Metric[]>([]);
  const [inventory, setInventory] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [refreshTick, setRefreshTick] = React.useState(0);

  React.useEffect(() => {
    const sub = DeviceEventEmitter.addListener('refresh_dashboard', () => {
      setRefreshTick(t => t + 1);
    });
    return () => sub.remove();
  }, []);

  React.useEffect(() => {
    const loadData = async () => {
      try {
        const [fRes, mRes, iRes] = await Promise.all([
          fetchEmployeeDashboard(),
          fetchEmployeeMetrics(),
          fetchInventory(),
        ]);
        setFeatures(fRes);
        setMetrics(mRes);
        setInventory(iRes);
      } catch (err) {
        console.error("Failed to load dashboard:", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [refreshTick]);

  const handleStockUpdate = async (itemId: string, newSales: number) => {
    try {
      await updateStock(itemId, newSales);
    } catch (e) {
      console.error('Failed to update stock', e);
    }
  };

  if (loading) {
    return (
      <View style={[styles.screen, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }

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
        {metrics.map(metric => (
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
        data={inventory}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={296} // 280 width + 16 gap
        decelerationRate="fast"
        contentContainerStyle={styles.horizontalScrollContent}
        style={styles.horizontalScroll}
        renderItem={({ item }) => (
          <StockUpdateCard
            key={item.id + item.sales} // Force remount if sales changes for this demo
            itemName={item.item}
            initialStock={item.stock}
            initialSales={item.sales}
            onUpdate={(val) => handleStockUpdate(item.id, val)}
            style={{ width: 280, marginRight: 16 }}
          />
        )}
      />

      <Text style={styles.sectionTitle}>Apps</Text>
      <AppsGrid features={features} onOpenFeature={onOpenFeature || (() => {})} />

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
