import React from 'react';
import { ScrollView, StyleSheet, Text, View, ActivityIndicator } from 'react-native';

import { MetricCard } from '../../components/MetricCard';
import { TransactionCard } from '../../components/TransactionCard';
import { fetchActionQueue, fetchOwnerMetrics, fetchTransactions } from '../../api/client';
import type { Metric, Transaction } from '../../data/demoData';
import { ActionQueueItem } from '../../components/ActionQueueItem';

import { useDashboardSync } from '../../hooks/useDashboardSync';

export const CashflowPulseScreen = () => {
  const syncTick = useDashboardSync();
  const [actionQueue, setActionQueue] = React.useState<any[]>([]);
  const [ownerMetrics, setOwnerMetrics] = React.useState<Metric[]>([]);
  const [transactions, setTransactions] = React.useState<Transaction[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const loadData = async () => {
      try {
        const [act, met, trans] = await Promise.all([
          fetchActionQueue(),
          fetchOwnerMetrics(),
          fetchTransactions(),
        ]);
        setActionQueue(act);
        setOwnerMetrics(met);
        setTransactions(trans);
      } catch (e) {
        console.error("Failed to load cashflow:", e);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [syncTick]);

  if (loading) {
    return (
      <View style={[styles.screen, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#0F766E" />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.kicker}>Cashflow pulse</Text>
      <Text style={styles.title}>Know what moved, what is stuck, and what needs approval.</Text>
      <Text style={styles.subtitle}>
        Demo financial activity for collections, payouts, offline entries, and
        cash-risk decisions.
      </Text>

      <View style={styles.metricsGrid}>
        {ownerMetrics.slice(0, 2).map(metric => (
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

      <Text style={styles.sectionTitle}>Live money movement</Text>
      {transactions.map(transaction => (
        <TransactionCard key={transaction.id} entry={transaction} />
      ))}

      <Text style={styles.sectionTitle}>Cashflow actions</Text>
      {actionQueue
        .filter(action => action.owner === 'Cashflow')
        .map(action => (
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
    backgroundColor: '#09090b',
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 32,
  },
  kicker: {
    color: '#0F766E',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  title: {
    color: '#fafafa',
    fontSize: 28,
    fontWeight: '800',
    lineHeight: 34,
    marginBottom: 8,
  },
  subtitle: {
    color: '#a1a1aa',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 18,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    color: '#fafafa',
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 10,
    marginTop: 12,
  },
});
