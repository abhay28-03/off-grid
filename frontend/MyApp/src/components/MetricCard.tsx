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
  up: { color: '#10B981', bg: 'rgba(16, 185, 129, 0.1)', prefix: '+' },
  down: { color: '#EF4444', bg: 'rgba(239, 68, 68, 0.1)', prefix: '-' },
  neutral: { color: '#a1a1aa', bg: 'rgba(161, 161, 170, 0.1)', prefix: '' },
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
    backgroundColor: '#18181b',
    borderColor: '#27272a',
    borderRadius: 16,
    borderWidth: 1,
    flexBasis: '48%',
    flexGrow: 1,
    marginBottom: 12,
    minWidth: 150,
    padding: 16,
  },
  title: {
    color: '#a1a1aa',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0.5,
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
    color: '#fafafa',
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
    color: '#71717a',
    fontSize: 13,
    lineHeight: 18,
    marginTop: 8,
  },
});
