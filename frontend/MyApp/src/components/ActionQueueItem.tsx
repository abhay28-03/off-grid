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
    backgroundColor: '#18181b',
    borderColor: '#27272a',
    borderRadius: 16,
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
    color: '#a1a1aa',
    flex: 1,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.5,
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
    letterSpacing: 0.5,
  },
  title: {
    color: '#fafafa',
    fontSize: 16,
    fontWeight: '800',
    lineHeight: 22,
    marginBottom: 6,
  },
  detail: {
    color: '#a1a1aa',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 10,
  },
  dueLabel: {
    color: '#3b82f6',
    fontSize: 12,
    fontWeight: '800',
  },
});
