import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export type EmployeeDashboardFeatureId =
  | 'team-pulse'
  | 'revenue-stream'
  | 'workflow-pulse'
  | 'field-ops-map'
  | 'client-pulse'
  | 'ops-timeline'
  | 'live-signal-desk';

type EmployeeDashboardFeature = {
  id: EmployeeDashboardFeatureId;
  title: string;
  summary: string;
  status: string;
};

interface EmployeeDashboardScreenProps {
  onOpenFeature?: (featureId: EmployeeDashboardFeatureId) => void;
}

const employeeFeatures: EmployeeDashboardFeature[] = [
  {
    id: 'team-pulse',
    title: 'Team Pulse',
    summary: 'Check your shift, assigned work, and team updates.',
    status: 'Start here',
  },
  {
    id: 'revenue-stream',
    title: 'Revenue Stream',
    summary: 'Capture sales activity and recent payment updates.',
    status: 'Open',
  },
  {
    id: 'workflow-pulse',
    title: 'Workflow Pulse',
    summary: 'Move tasks forward and flag blockers in real time.',
    status: '6 tasks',
  },
  {
    id: 'field-ops-map',
    title: 'Field Ops Map',
    summary: 'View assigned routes, visits, and live location work.',
    status: 'Tracking',
  },
  {
    id: 'client-pulse',
    title: 'Client Pulse',
    summary: 'See follow-ups, client notes, and urgent account activity.',
    status: '3 updates',
  },
  {
    id: 'ops-timeline',
    title: 'Ops Timeline',
    summary: 'Review the latest business events from your workday.',
    status: 'Today',
  },
  {
    id: 'live-signal-desk',
    title: 'Signal Desk',
    summary: 'Catch important changes that affect your current work.',
    status: 'Live',
  },
];

export const EmployeeDashboardScreen: React.FC<EmployeeDashboardScreenProps> = ({
  onOpenFeature,
}) => {
  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.eyebrow}>Employee workspace</Text>
        <Text style={styles.title}>Your workday, live.</Text>
        <Text style={styles.subtitle}>
          Open tasks, client updates, sales activity, routes, and team signals.
        </Text>
      </View>

      <View style={styles.grid}>
        {employeeFeatures.map(feature => (
          <TouchableOpacity
            key={feature.id}
            activeOpacity={0.75}
            style={styles.featureCard}
            onPress={() => onOpenFeature?.(feature.id)}
          >
            <View style={styles.featureHeader}>
              <Text style={styles.featureTitle}>{feature.title}</Text>
              <Text style={styles.status}>{feature.status}</Text>
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
    color: '#be123c',
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
  status: {
    color: '#be123c',
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
