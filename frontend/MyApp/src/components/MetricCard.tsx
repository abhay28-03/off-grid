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
    backgroundColor: '#1c1c1e',
    borderColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 20,
    borderWidth: 1,
    flexBasis: '48%',
    flexGrow: 1,
    marginBottom: 16,
    minWidth: 150,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    color: '#a1a1aa',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: 10,
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
    fontSize: 26,
    fontWeight: '800',
    letterSpacing: -0.5,
    marginRight: 8,
  },
  trendBadge: {
    borderRadius: 10,
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
    fontSize: 14,
    lineHeight: 20,
    marginTop: 10,
  },
});
