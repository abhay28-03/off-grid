import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export interface TargetProgressBarProps {
  title: string;          // We will use the first letter as the brand badge
  current: number;
  target: number;
  prefix?: string;
  suffix?: string;
}

const formatNumber = (val: number, prefix: string, suffix: string) => {
  return `${prefix}${val.toLocaleString()}${suffix}`;
};

export const TargetProgressBar: React.FC<TargetProgressBarProps> = ({
  title,
  current,
  target,
  prefix = '',
  suffix = '',
}) => {
  const isProfit = current >= target;
  
  // Use a max floor so the bar doesn't break UI layout if 0
  const safeTarget = target || 1;
  const percentage = Math.min((current / safeTarget) * 100, 100);
  const displayPercent = Math.max(percentage, 5); // Ensure at least 5% so text is visible over background
  
  // Extract a single letter badge from the title (like 'A' in the image)
  const badgeLetter = title ? title.charAt(0).toUpperCase() : 'A';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      
      <View style={styles.barRow}>
        <View style={styles.badgeIcon}>
          <Text style={styles.badgeText}>{badgeLetter}</Text>
        </View>

        <View style={styles.track}>
          {/* Filled Background */}
          <View 
            style={[
              styles.trackFill, 
              { 
                width: `${displayPercent}%`,
                backgroundColor: isProfit ? '#10B981' : '#EF4444' 
              }
            ]} 
          />
          
          {/* Current amount text mapping inside the bar on the left */}
          <Text style={[styles.textInsideLeft, { zIndex: 10 }]}>
            {formatNumber(current, prefix, suffix)}
          </Text>

          {/* Target amount text mapping inside the bar on the right */}
          <Text style={[styles.textInsideRight, { zIndex: 10 }]}>
            {formatNumber(target, prefix, suffix)}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  title: {
    color: '#a1a1aa',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  barRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badgeIcon: {
    width: 32,
    height: 32,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#fafafa',
    fontSize: 24,
    fontWeight: '900',
  },
  track: {
    flex: 1,
    height: 48,
    backgroundColor: '#FAF9F6', // Off-white thick track similar to the image
    borderRadius: 24,
    overflow: 'hidden',
    position: 'relative',
    justifyContent: 'center',
  },
  trackFill: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    borderRadius: 24,
  },
  textInsideLeft: {
    position: 'absolute',
    left: 16,
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '800',
  },
  textInsideRight: {
    position: 'absolute',
    right: 16,
    color: '#a1a1aa',
    fontSize: 17,
    fontWeight: '800',
  },
});
