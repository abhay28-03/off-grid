import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  Banknote,
  BellRing,
  CheckSquare,
  Clock,
  GitMerge,
  LayoutDashboard,
  MapPin,
  Package,
  Settings,
  TrendingUp,
  UserCheck,
  Users,
} from 'lucide-react-native';

import type { DashboardFeature, FeatureId } from '../data/demoData';

interface AppsGridProps {
  features: DashboardFeature[];
  onOpenFeature: (featureId: FeatureId) => void;
}

export const AppsGrid: React.FC<AppsGridProps> = ({ features, onOpenFeature }) => {
  const getNotificationNum = (signal: string) => {
    const match = signal.match(/\d+/);
    if (match) return match[0];
    if (signal.toLowerCase() === 'live' || signal.toLowerCase() === 'open') return '!';
    return null;
  };

  const getIconForFeature = (id: FeatureId) => {
    const iconProps = { color: '#fafafa', size: 28 };

    switch (id) {
      case 'business-command-center': return <LayoutDashboard {...iconProps} />;
      case 'live-signal-desk': return <BellRing {...iconProps} />;
      case 'decision-brief': return <CheckSquare {...iconProps} />;
      case 'cashflow-pulse': return <Banknote {...iconProps} />;
      case 'inventory-pulse': return <Package {...iconProps} />;
      case 'field-ops-map': return <MapPin {...iconProps} />;
      case 'workflow-pulse': return <GitMerge {...iconProps} />;
      case 'client-pulse': return <Users {...iconProps} />;
      case 'ops-timeline': return <Clock {...iconProps} />;
      case 'team-pulse': return <UserCheck {...iconProps} />;
      case 'revenue-stream': return <TrendingUp {...iconProps} />;
      default: return <Settings {...iconProps} />;
    }
  };

  return (
    <View style={styles.appsGrid}>
      {features.map((feature) => {
        const notifyBadge = getNotificationNum(feature.signal);

        return (
          <TouchableOpacity
            key={feature.id}
            activeOpacity={0.7}
            style={styles.appContainer}
            onPress={() => onOpenFeature(feature.id)}
          >
            <View style={styles.appIconWrapper}>
              <View style={styles.appIcon}>
                {getIconForFeature(feature.id)}
              </View>

              {notifyBadge && (
                <View style={styles.notificationBadge}>
                  <Text style={styles.notificationText}>{notifyBadge}</Text>
                </View>
              )}
            </View>

            <Text style={styles.appTitle} numberOfLines={2} ellipsizeMode="tail">
              {feature.title}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  appsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: 16,
    marginBottom: 32,
  },
  appContainer: {
    width: 80,
    alignItems: 'center',
    marginBottom: 8,
  },
  appIconWrapper: {
    position: 'relative',
    marginBottom: 8,
  },
  appIcon: {
    backgroundColor: '#1c1c1e',
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderRadius: 20,
    width: 64,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  notificationBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#EF4444',
    borderRadius: 4,
    minWidth: 24,
    paddingHorizontal: 6,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#09090b',
  },
  notificationText: {
    color: '#ffffff',
    fontSize: 11,
    fontWeight: '800',
  },
  appTitle: {
    color: '#e4e4e7',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 16,
  },
});
