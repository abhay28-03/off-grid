import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  employeeDashboardFeatures,
  ownerDashboardFeatures,
} from '../data/demoData';
import type { FeatureId } from '../data/demoData';
import type { LoginRole } from './Auth/LoginScreen';

interface ToolsScreenProps {
  role: LoginRole;
  onOpenFeature: (featureId: FeatureId) => void;
}

export const ToolsScreen: React.FC<ToolsScreenProps> = ({
  role,
  onOpenFeature,
}) => {
  const features =
    role === 'owner' ? ownerDashboardFeatures : employeeDashboardFeatures;

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>All Tools</Text>
      <Text style={styles.subtitle}>
        Access your complete business toolkit.
      </Text>
      
      <View style={styles.grid}>
        {features.map(feature => (
          <TouchableOpacity
            key={feature.id}
            activeOpacity={0.7}
            style={styles.featureCard}
            onPress={() => onOpenFeature(feature.id)}
          >
            <View style={styles.featureHeader}>
              <Text style={styles.featureTitle}>{feature.title}</Text>
              <View style={styles.signalBadge}>
                 <Text style={styles.signal}>{feature.signal}</Text>
              </View>
            </View>
            <Text style={styles.featureSummary}>{feature.summary}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={{ height: 100 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#09090b',
    flex: 1,
  },
  content: {
    padding: 20,
    paddingTop: 32,
  },
  title: {
    color: '#fafafa',
    fontSize: 32,
    fontWeight: '800',
    lineHeight: 38,
    marginBottom: 8,
  },
  subtitle: {
    color: '#a1a1aa',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24,
  },
  grid: {
    flexDirection: 'column',
    gap: 12,
  },
  featureCard: {
    backgroundColor: '#18181b',
    borderColor: '#27272a',
    borderRadius: 16,
    borderWidth: 1,
    padding: 16,
  },
  featureHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  featureTitle: {
    color: '#f4f4f5',
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
    marginRight: 12,
  },
  signalBadge: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  signal: {
    color: '#10B981',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  featureSummary: {
    color: '#a1a1aa',
    fontSize: 14,
    lineHeight: 20,
  },
});
