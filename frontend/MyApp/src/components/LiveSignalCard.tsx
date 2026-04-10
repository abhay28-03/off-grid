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
  critical: { color: '#BE123C', bg: '#FFF1F2', label: 'Critical' },
  warning: { color: '#B45309', bg: '#FFFBEB', label: 'Warning' },
  opportunity: { color: '#0F766E', bg: '#ECFDF5', label: 'Opportunity' },
  info: { color: '#2563EB', bg: '#EFF6FF', label: 'Info' },
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
        {actionLabel ? <Text style={styles.actionText}>{actionLabel}</Text> : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E5E7EB',
    borderLeftWidth: 4,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 12,
    padding: 16,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  typeRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  dot: {
    borderRadius: 5,
    height: 10,
    marginRight: 8,
    width: 10,
  },
  typeText: {
    color: '#475569',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0,
    textTransform: 'uppercase',
  },
  badge: {
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0,
    textTransform: 'uppercase',
  },
  title: {
    color: '#111827',
    fontSize: 18,
    fontWeight: '800',
    lineHeight: 24,
    marginBottom: 8,
  },
  summary: {
    color: '#4B5563',
    fontSize: 14,
    lineHeight: 20,
  },
  impactBox: {
    backgroundColor: '#F8FAFC',
    borderColor: '#E5E7EB',
    borderRadius: 8,
    borderWidth: 1,
    marginTop: 14,
    padding: 12,
  },
  impactLabel: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0,
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  impactText: {
    color: '#1F2937',
    fontSize: 14,
    lineHeight: 20,
  },
  footer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 14,
  },
  updatedAt: {
    color: '#64748B',
    fontSize: 12,
    fontWeight: '600',
  },
  actionText: {
    color: '#0F766E',
    fontSize: 12,
    fontWeight: '800',
  },
});
