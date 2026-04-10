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
    <View style={[styles.card, { borderTopWidth: 3, borderTopColor: config.color }]}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.valueRow}>
        <Text style={styles.value} numberOfLines={1} adjustsFontSizeToFit>{value}</Text>
      </View>
      {trendValue ? (
        <View style={[styles.trendBadge, { backgroundColor: config.bg }]}>
          <Text style={[styles.trendText, { color: config.color }]}>
            {config.prefix}
            {trendValue}
          </Text>
        </View>
      ) : null}
      {caption ? <Text style={styles.caption}>{caption}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#18181b',
    borderColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 4,
    borderWidth: 1,
    width: '48%',
    marginBottom: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },
  title: {
    color: '#a1a1aa',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: 12,
    textTransform: 'uppercase',
  },
  valueRow: {
    alignItems: 'baseline',
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
  value: {
    color: '#fafafa',
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -0.5,
    marginRight: 8,
  },
  trendBadge: {
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginTop: 6,
    alignSelf: 'flex-start',
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
    marginTop: 12,
  },
});
