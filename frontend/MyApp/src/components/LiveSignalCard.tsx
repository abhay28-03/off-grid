import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import type { SignalSeverity, SignalStatus } from '../data/demoData';

export interface LiveSignalCardProps {
  title: string;
  summary: string;
  impact: string;
  signalType: string;
  severity?: SignalSeverity;
  status?: SignalStatus;
  updatedAt: string;
  actionLabel?: string;
}

const severityConfig = {
  critical: { color: '#EF4444', bg: 'rgba(239, 68, 68, 0.1)', label: 'Critical' },
  warning: { color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.1)', label: 'Warning' },
  opportunity: { color: '#10B981', bg: 'rgba(16, 185, 129, 0.1)', label: 'Opportunity' },
  info: { color: '#3B82F6', bg: 'rgba(59, 130, 246, 0.1)', label: 'Info' },
};

const statusConfig = {
  live: 'Live',
  queued: 'Queued',
  syncing: 'Syncing',
  offline: 'Offline',
};

export const LiveSignalCard: React.FC<LiveSignalCardProps> = ({
  title,
  summary,
  impact,
  signalType,
  severity = 'info',
  status = 'live',
  updatedAt,
  actionLabel,
}) => {
  const config = severityConfig[severity];

  return (
    <View style={[styles.card, { borderLeftColor: config.color }]}>
      <View style={styles.header}>
        <View style={styles.typeRow}>
          <View style={[styles.dot, { backgroundColor: config.color }]} />
          <Text style={styles.typeText}>{signalType}</Text>
        </View>
        <View style={[styles.badge, { backgroundColor: config.bg }]}>
          <Text style={[styles.badgeText, { color: config.color }]}>
            {statusConfig[status]}
          </Text>
        </View>
      </View>

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.summary}>{summary}</Text>

      <View style={styles.impactBox}>
        <Text style={[styles.impactLabel, { color: config.color }]}>
          {config.label} impact
        </Text>
        <Text style={styles.impactText}>{impact}</Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.updatedAt}>Updated {updatedAt}</Text>
        {actionLabel ? <Text style={[styles.actionText, { color: config.color }]}>{actionLabel}</Text> : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1c1c1e',
    borderColor: 'rgba(255, 255, 255, 0.05)',
    borderLeftWidth: 4,
    borderRadius: 2,
    borderWidth: 1,
    marginBottom: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  typeRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  dot: {
    borderRadius: 2,
    height: 12,
    marginRight: 8,
    width: 12,
  },
  typeText: {
    color: '#a1a1aa',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  badge: {
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  title: {
    color: '#fafafa',
    fontSize: 20,
    fontWeight: '800',
    lineHeight: 26,
    marginBottom: 8,
    letterSpacing: -0.3,
  },
  summary: {
    color: '#a1a1aa',
    fontSize: 15,
    lineHeight: 22,
  },
  impactBox: {
    backgroundColor: '#27272a',
    borderColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 4,
    borderWidth: 1,
    marginTop: 16,
    padding: 14,
  },
  impactLabel: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.5,
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  impactText: {
    color: '#e4e4e7',
    fontSize: 15,
    lineHeight: 22,
  },
  footer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  updatedAt: {
    color: '#71717a',
    fontSize: 13,
    fontWeight: '600',
  },
  actionText: {
    fontSize: 13,
    fontWeight: '800',
  },
});
