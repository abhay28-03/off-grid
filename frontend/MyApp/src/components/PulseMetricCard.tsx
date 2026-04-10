import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export interface PulseMetricCardProps {
  label: string;
  value: string | number;
  context: string;
  pulse?: 'healthy' | 'attention' | 'risk';
}

const pulseConfig = {
  healthy: { color: '#0F766E', bg: '#ECFDF5', label: 'Healthy' },
  attention: { color: '#B45309', bg: '#FFFBEB', label: 'Watch' },
  risk: { color: '#BE123C', bg: '#FFF1F2', label: 'Risk' },
};

export const PulseMetricCard: React.FC<PulseMetricCardProps> = ({
  label,
  value,
  context,
  pulse = 'healthy',
}) => {
  const config = pulseConfig[pulse];

  return (
    <View style={[styles.card, { borderTopColor: config.color }]}>
      <View style={styles.header}>
        <Text style={styles.label}>{label}</Text>
        <View style={[styles.pill, { backgroundColor: config.bg }]}>
          <Text style={[styles.pillText, { color: config.color }]}>
            {config.label}
          </Text>
        </View>
      </View>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.context}>{context}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#18181b',
    borderColor: '#27272a',
    borderRadius: 16,
    borderTopWidth: 4,
    borderWidth: 1,
    marginBottom: 12,
    padding: 14,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    color: '#475569',
    flex: 1,
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0,
    marginRight: 8,
    textTransform: 'uppercase',
  },
  pill: {
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  pillText: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0,
  },
  value: {
    color: '#fafafa',
    fontSize: 26,
    fontWeight: '800',
    letterSpacing: 0,
    marginBottom: 6,
  },
  context: {
    color: '#71717a',
    fontSize: 13,
    lineHeight: 18,
  },
});
