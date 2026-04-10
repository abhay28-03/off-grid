import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import type { TransactionDirection } from '../data/demoData';

export interface TransactionEntry {
  id: string;
  accountName: string;
  amount: number;
  direction: TransactionDirection;
  category: string;
  timestamp: string;
  note?: string;
  status?: string;
}

interface TransactionCardProps {
  entry: TransactionEntry;
}

const formatAmount = (amount: number) =>
  new Intl.NumberFormat('en-IN', {
    currency: 'INR',
    maximumFractionDigits: 0,
    style: 'currency',
  }).format(amount);

export const TransactionCard: React.FC<TransactionCardProps> = ({ entry }) => {
  const isInflow = entry.direction === 'inflow';
  const amountColor = isInflow ? '#10B981' : '#EF4444';

  return (
    <View style={styles.card}>
      <View style={styles.leftColumn}>
        <Text style={styles.category}>{entry.category}</Text>
        <Text style={styles.accountName} numberOfLines={1}>
          {entry.accountName}
        </Text>
        {entry.note ? (
          <Text style={styles.note} numberOfLines={2}>
            {entry.note}
          </Text>
        ) : null}
        <Text style={styles.timestamp}>{entry.timestamp}</Text>
      </View>

      <View style={styles.rightColumn}>
        <Text style={[styles.amount, { color: amountColor }]}>
          {isInflow ? '+' : '-'}
          {formatAmount(entry.amount)}
        </Text>
        {entry.status ? (
          <View style={styles.statusBadge}>
            <Text style={styles.statusText}>{entry.status}</Text>
          </View>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    backgroundColor: '#18181b',
    borderColor: '#27272a',
    borderRadius: 4,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    padding: 16,
  },
  leftColumn: {
    flex: 1,
    justifyContent: 'center',
    marginRight: 16,
  },
  category: {
    color: '#3b82f6',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.5,
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  accountName: {
    color: '#fafafa',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0,
    marginBottom: 4,
  },
  note: {
    color: '#a1a1aa',
    fontSize: 14,
    lineHeight: 19,
    marginBottom: 6,
  },
  timestamp: {
    color: '#71717a',
    fontSize: 12,
    fontWeight: '600',
  },
  rightColumn: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  amount: {
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: 0,
    marginBottom: 6,
  },
  statusBadge: {
    backgroundColor: '#27272a',
    borderColor: '#3f3f46',
    borderRadius: 2,
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  statusText: {
    color: '#a1a1aa',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
});
