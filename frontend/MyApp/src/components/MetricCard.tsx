import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export interface MetricCardProps {
  title: string;
  value: string | number;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  caption?: string;
}

const trendConfig = {
  up: { color: '#0F766E', bg: '#ECFDF5', prefix: '+' },
  down: { color: '#BE123C', bg: '#FFF1F2', prefix: '-' },
  neutral: { color: '#475569', bg: '#F1F5F9', prefix: '' },
};

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  trend = 'neutral',
  trendValue,
  caption,
}) => {
  const config = trendConfig[trend];

  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.valueRow}>
        <Text style={styles.value}>{value}</Text>
        {trendValue ? (
          <View style={[styles.trendBadge, { backgroundColor: config.bg }]}>
            <Text style={[styles.trendText, { color: config.color }]}>
              {config.prefix}
              {trendValue}
            </Text>
          </View>
        ) : null}
      </View>
      {caption ? <Text style={styles.caption}>{caption}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E5E7EB',
    borderRadius: 8,
    borderWidth: 1,
    flexBasis: '48%',
    flexGrow: 1,
    marginBottom: 12,
    minWidth: 150,
    padding: 16,
  },
  title: {
    color: '#64748B',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  valueRow: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  value: {
    color: '#111827',
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: 0,
    marginRight: 8,
  },
  trendBadge: {
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  trendText: {
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0,
  },
  caption: {
    color: '#64748B',
    fontSize: 13,
    lineHeight: 18,
    marginTop: 8,
  },
});
