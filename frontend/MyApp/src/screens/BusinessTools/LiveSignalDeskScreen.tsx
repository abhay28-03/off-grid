import React from 'react';
import { ScrollView, StyleSheet, Text, View, ActivityIndicator } from 'react-native';

import { LiveSignalCard } from '../../components/LiveSignalCard';
import { fetchSignals, resolveSignal } from '../../api/client';

import { useDashboardSync } from '../../hooks/useDashboardSync';

export const LiveSignalDeskScreen = () => {
  const syncTick = useDashboardSync();
  const [liveSignals, setLiveSignals] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  const handleResolveSignal = async (id: string) => {
    try {
      await resolveSignal(id);
    } catch (e) {
      console.error(e);
    }
  };

  React.useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchSignals();
        setLiveSignals(data);
      } catch (e) {
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [syncTick]);

  if (loading) {
    return (
      <View style={[styles.screen, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#3B82F6" />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.kicker}>Live signal desk</Text>
      <Text style={styles.title}>Important changes, not endless notifications.</Text>
      <Text style={styles.subtitle}>
        A real-time business inbox for cashflow, field ops, inventory, and client
        movement.
      </Text>

      {liveSignals.map(signal => (
        <LiveSignalCard
          key={signal.id}
          title={signal.title}
          summary={signal.summary}
          impact={signal.impact}
          severity={signal.severity}
          status={signal.status}
          signalType={signal.type}
          updatedAt={signal.updatedAt}
          actionLabel={signal.actionLabel}
          onAction={() => handleResolveSignal(signal.id)}
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
  kicker: {
    color: '#3B82F6',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.5,
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
    marginBottom: 24,
  },
});
