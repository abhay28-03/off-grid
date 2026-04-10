import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export interface TransactionEntry {
  id: string;
  partyName: string;
  amount: number;
  type: 'given' | 'taken';
  date: string;
  description?: string;
}

interface TransactionCardProps {
  entry: TransactionEntry;
}

export const TransactionCard: React.FC<TransactionCardProps> = ({ entry }) => {
  const isGiven = entry.type === 'given';
  
  // Format amount to INR natively
  const formattedAmount = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(entry.amount);

  return (
    <View style={styles.card}>
      <View style={styles.leftColumn}>
        <Text style={styles.partyName} numberOfLines={1}>{entry.partyName}</Text>
        <Text style={styles.date}>{entry.date}</Text>
        {entry.description ? (
          <Text style={styles.description} numberOfLines={2}>{entry.description}</Text>
        ) : null}
      </View>
      
      <View style={styles.rightColumn}>
        <Text style={[styles.amount, { color: isGiven ? '#dc3545' : '#28a745' }]}>
          {isGiven ? '-' : '+'} {formattedAmount}
        </Text>
        <Text style={[styles.typeText, { color: isGiven ? '#dc3545' : '#28a745' }]}>
          {isGiven ? 'You Gave' : 'You Got'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2, // Shadow for Android
    shadowColor: '#000', // Shadows for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: '#f1f3f5',
  },
  leftColumn: {
    flex: 1,
    marginRight: 15,
    justifyContent: 'center',
  },
  partyName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#212529',
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: '#6c757d',
    marginBottom: 2,
  },
  description: {
    fontSize: 13,
    color: '#495057',
    marginTop: 4,
    fontStyle: 'italic',
  },
  rightColumn: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  amount: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  typeText: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});