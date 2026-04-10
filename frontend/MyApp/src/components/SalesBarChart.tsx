import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export interface SalesDataPoint {
  day: string;
  sales: number;
}

export interface SalesBarChartProps {
  title?: string;
  data: SalesDataPoint[];
}

export const SalesBarChart: React.FC<SalesBarChartProps> = ({ title, data }) => {
  if (!data || data.length === 0) return null;

  const maxSales = Math.max(...data.map((d) => d.sales));

  return (
    <View style={styles.container}>
      {title ? <Text style={styles.title}>{title}</Text> : null}
      <View style={styles.chartArea}>
        {data.map((point, index) => {
          // Calculate height percentage (min 5% to always show something)
          const fillPercentage = maxSales > 0 ? (point.sales / maxSales) * 100 : 0;
          const heightPct = Math.max(fillPercentage, 5);
          
          const isHighest = point.sales === maxSales && maxSales > 0;

          return (
            <View key={index} style={styles.barContainer}>
              <Text style={styles.valueText}>{point.sales}</Text>
              <View style={styles.barTrack}>
                <View
                  style={[
                    styles.barFill,
                    { height: `${heightPct}%` },
                    isHighest && styles.barFillHighest
                  ]}
                />
              </View>
              <Text style={[styles.dayText, isHighest && styles.dayTextHighest]}>{point.day}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1c1c1e',
    borderColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 20,
    borderWidth: 1,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    color: '#fafafa',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: -0.3,
    marginBottom: 20,
  },
  chartArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 180, // Fixed height for chart area
  },
  barContainer: {
    alignItems: 'center',
    flex: 1,
    height: '100%',
    justifyContent: 'flex-end',
  },
  valueText: {
    color: '#a1a1aa',
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 6,
  },
  barTrack: {
    width: 24,
    backgroundColor: '#27272a',
    borderRadius: 6,
    flex: 1,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  barFill: {
    backgroundColor: '#3b82f6', // Blueprint
    borderRadius: 6,
    width: '100%',
  },
  barFillHighest: {
    backgroundColor: '#10b981', // Emerald for highest output
  },
  dayText: {
    color: '#71717a',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 8,
  },
  dayTextHighest: {
    color: '#fafafa',
    fontWeight: '800',
  },
});
