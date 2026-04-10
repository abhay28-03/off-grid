import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { ActionQueueItem } from '../../components/ActionQueueItem';
import { LiveSignalCard } from '../../components/LiveSignalCard';
import { PulseMetricCard } from '../../components/PulseMetricCard';
import { actionQueue, liveSignals, ownerMetrics } from '../../data/demoData';

export const BusinessCommandCenterScreen = () => {
  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>Business pulse for the next decision.</Text>

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

      <Text style={styles.sectionTitle}>Live signals</Text>
      {liveSignals.slice(0, 2).map(signal => (
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

      <Text style={styles.sectionTitle}>Decision queue</Text>
      {actionQueue.slice(0, 3).map(action => (
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
    fontSize: 29,
    fontWeight: '800',
    lineHeight: 35,
    marginBottom: 8,
  },
  subtitle: {
    color: '#a1a1aa',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 18,
  },
  pulseGrid: {
    marginBottom: 8,
  },
  sectionTitle: {
    color: '#fafafa',
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 10,
    marginTop: 12,
  },
});
