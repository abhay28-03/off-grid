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
    backgroundColor: '#1c1c1e',
    borderColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 4,
    borderTopWidth: 4,
    borderWidth: 1,
    marginBottom: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 5,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  label: {
    color: '#a1a1aa',
    flex: 1,
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginRight: 8,
    textTransform: 'uppercase',
  },
  pill: {
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  pillText: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0,
  },
  value: {
    color: '#fafafa',
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -0.5,
    marginBottom: 6,
  },
  context: {
    color: '#71717a',
    fontSize: 14,
    lineHeight: 20,
  },
});
