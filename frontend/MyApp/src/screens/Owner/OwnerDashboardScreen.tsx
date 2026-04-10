import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export type OwnerDashboardFeatureId =
  | 'business-command-center'
  | 'live-signal-desk'
  | 'decision-brief'
  | 'cashflow-pulse'
  | 'inventory-pulse'
  | 'field-ops-map'
  | 'workflow-pulse'
  | 'client-pulse'
  | 'ops-timeline'
  | 'team-pulse'
  | 'revenue-stream';

type OwnerDashboardFeature = {
  id: OwnerDashboardFeatureId;
  title: string;
  summary: string;
  signal: string;
};

interface OwnerDashboardScreenProps {
  onOpenFeature?: (featureId: OwnerDashboardFeatureId) => void;
}

const ownerFeatures: OwnerDashboardFeature[] = [
  {
    id: 'business-command-center',
    title: 'Command Center',
    summary: 'Live overview for revenue, work, alerts, and team movement.',
    signal: 'Live now',
  },
  {
    id: 'live-signal-desk',
    title: 'Signal Desk',
    summary: 'Important changes from every active business stream.',
    signal: '12 signals',
  },
  {
    id: 'decision-brief',
    title: 'Decision Briefs',
    summary: 'Fast summaries for actions that need owner approval.',
    signal: '4 pending',
  },
  {
    id: 'cashflow-pulse',
    title: 'Cashflow Pulse',
    summary: 'Incoming, outgoing, due, and delayed payments.',
    signal: 'Updated',
  },
  {
    id: 'inventory-pulse',
    title: 'Inventory Pulse',
    summary: 'Resource levels, restock needs, and fast-moving items.',
    signal: '3 alerts',
  },
  {
    id: 'field-ops-map',
    title: 'Field Ops Map',
    summary: 'Real-time routes, deliveries, and field team status.',
    signal: 'Tracking',
  },
  {
    id: 'workflow-pulse',
    title: 'Workflow Pulse',
    summary: 'Work queues, blockers, handoffs, and completion flow.',
    signal: '8 active',
  },
  {
    id: 'client-pulse',
    title: 'Client Pulse',
    summary: 'Client activity, follow-ups, and high-value accounts.',
    signal: '6 updates',
  },
  {
    id: 'ops-timeline',
    title: 'Ops Timeline',
    summary: 'A running timeline of business events and team actions.',
    signal: 'Today',
  },
  {
    id: 'team-pulse',
    title: 'Team Pulse',
    summary: 'Employee check-ins, task progress, and workload balance.',
    signal: '5 online',
  },
  {
    id: 'revenue-stream',
    title: 'Revenue Stream',
    summary: 'Sales activity, captured payments, and daily performance.',
    signal: 'Open',
  },
];

export const OwnerDashboardScreen: React.FC<OwnerDashboardScreenProps> = ({
  onOpenFeature,
}) => {
  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.eyebrow}>Owner workspace</Text>
        <Text style={styles.title}>Run the business from one place.</Text>
        <Text style={styles.subtitle}>
          Open live signals, cashflow, field ops, client work, and team activity.
        </Text>
      </View>

      <View style={styles.grid}>
        {ownerFeatures.map(feature => (
          <TouchableOpacity
            key={feature.id}
            activeOpacity={0.75}
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f6f8fb',
  },
  content: {
    padding: 20,
    paddingBottom: 32,
  },
  header: {
    marginBottom: 20,
  },
  eyebrow: {
    color: '#0f766e',
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  title: {
    color: '#111827',
    fontSize: 28,
    fontWeight: '800',
    lineHeight: 34,
    marginBottom: 8,
  },
  subtitle: {
    color: '#526071',
    fontSize: 15,
    lineHeight: 22,
  },
  grid: {
    gap: 12,
  },
  featureCard: {
    backgroundColor: '#ffffff',
    borderColor: '#d9e2ec',
    borderRadius: 8,
    borderWidth: 1,
    padding: 16,
  },
  featureHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  featureTitle: {
    color: '#172033',
    flex: 1,
    fontSize: 17,
    fontWeight: '800',
    marginRight: 12,
  },
  signal: {
    color: '#0f766e',
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  featureSummary: {
    color: '#5b6778',
    fontSize: 14,
    lineHeight: 20,
  },
});
