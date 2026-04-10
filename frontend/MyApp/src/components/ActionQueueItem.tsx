import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import type { Priority } from '../data/demoData';

export interface ActionQueueItemProps {
  title: string;
  detail: string;
  owner: string;
  dueLabel: string;
  priority: Priority;
}

const priorityConfig = {
  high: { color: '#BE123C', bg: '#FFF1F2', label: 'High' },
  medium: { color: '#B45309', bg: '#FFFBEB', label: 'Medium' },
  low: { color: '#0F766E', bg: '#ECFDF5', label: 'Low' },
};

export const ActionQueueItem: React.FC<ActionQueueItemProps> = ({
  title,
  detail,
  owner,
  dueLabel,
  priority,
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
      <Text style={styles.dueLabel}>{dueLabel}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E5E7EB',
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 12,
    padding: 16,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  owner: {
    color: '#64748B',
    flex: 1,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0,
    marginRight: 8,
    textTransform: 'uppercase',
  },
  priorityBadge: {
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  priorityText: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0,
  },
  title: {
    color: '#111827',
    fontSize: 16,
    fontWeight: '800',
    lineHeight: 22,
    marginBottom: 6,
  },
  detail: {
    color: '#4B5563',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 10,
  },
  dueLabel: {
    color: '#0F766E',
    fontSize: 12,
    fontWeight: '800',
  },
});
