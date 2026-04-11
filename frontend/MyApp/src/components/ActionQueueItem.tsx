import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import type { Priority } from '../data/demoData';

export interface ActionQueueItemProps {
  title: string;
  detail: string;
  owner: string;
  dueLabel: string;
  priority: Priority;
  onResolve?: () => void;
}

const priorityConfig = {
  high: { color: '#EF4444', bg: 'rgba(239, 68, 68, 0.1)', label: 'High' },
  medium: { color: '#F59E0B', bg: 'rgba(245, 158, 11, 0.1)', label: 'Medium' },
  low: { color: '#10B981', bg: 'rgba(16, 185, 129, 0.1)', label: 'Low' },
};

export const ActionQueueItem: React.FC<ActionQueueItemProps> = ({
  title,
  detail,
  owner,
  dueLabel,
  priority,
  onResolve,
}) => {
  const config = priorityConfig[priority];

  return (
    <View style={styles.item}>
      <View style={styles.header}>
        <Text style={styles.owner}>{owner}</Text>
        <View style={[styles.priorityBadge, { backgroundColor: config.bg }]}>
          <Text style={[styles.priorityText, { color: config.color }]}>
            {config.label}
          </Text>
        </View>
      </View>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.detail}>{detail}</Text>
      <View style={styles.footerRow}>
        <Text style={styles.dueLabel}>{dueLabel}</Text>
        {onResolve && (
          <TouchableOpacity activeOpacity={0.7} style={styles.resolveBtn} onPress={onResolve}>
            <Text style={styles.resolveBtnText}>Resolve action</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    borderRadius: 20,
    paddingHorizontal: 8,
    marginBottom: 16,
    padding: 18,
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
    marginBottom: 10,
  },
  owner: {
    color: '#a1a1aa',
    flex: 1,
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginRight: 8,
    textTransform: 'uppercase',
  },
  priorityBadge: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  priorityText: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  title: {
    color: '#fafafa',
    fontSize: 18,
    fontWeight: '800',
    lineHeight: 24,
    marginBottom: 8,
    letterSpacing: -0.3,
  },
  detail: {
    color: '#a1a1aa',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 12,
  },
  dueLabel: {
    color: '#3b82f6',
    fontSize: 13,
    fontWeight: '800',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  resolveBtn: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  resolveBtnText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
});
