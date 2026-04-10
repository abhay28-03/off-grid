import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { employeeMetrics, teamMembers } from '../../data/demoData';
import { MetricCard } from '../../components/MetricCard';

const getInitials = (name: string) => {
  return name.substring(0, 2).toUpperCase();
};

const getStatusColor = (status: string) => {
  if (status.toLowerCase() === 'online') return '#10B981'; // Green
  if (status.toLowerCase().includes('offline')) return '#F59E0B'; // Orange/Amber
  return '#3B82F6'; // Default blue
};

export const TeamPulseScreen = () => {
  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>Your shift and the people around you.</Text>

      <View style={styles.metricsGrid}>
        {employeeMetrics.slice(0, 2).map(metric => (
          <MetricCard
            key={metric.id}
            title={metric.title}
            value={metric.value}
            trend={metric.trend}
            trendValue={metric.trendValue}
            caption={metric.caption}
          />
        ))}
      </View>

      {teamMembers.map(member => (
        <View key={member.id} style={styles.card}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{getInitials(member.name)}</Text>
            </View>
            <View
              style={[
                styles.statusIndicator,
                { backgroundColor: getStatusColor(member.status) }
              ]}
            />
          </View>

          <View style={styles.infoContainer}>
            <View style={styles.headerRow}>
              <Text style={styles.name}>{member.name}</Text>
              <Text style={styles.role}>{member.role}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Task:</Text>
              <Text style={styles.detailText} numberOfLines={1}>{member.currentTask}</Text>
            </View>

            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Location:</Text>
              <Text style={styles.detailText}>{member.location}</Text>
            </View>

            <View style={styles.footerRow}>
              <View style={[
                styles.statusBadge,
                { backgroundColor: getStatusColor(member.status) + '20' }
              ]}>
                <Text style={[styles.statusText, { color: getStatusColor(member.status) }]}>
                  {member.status}
                </Text>
              </View>
            </View>
          </View>
        </View>
      ))}
      <View style={{ height: 60 }} />
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
    paddingBottom: 32,
  },
  kicker: {
    color: '#3B82F6',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.5,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  title: {
    color: '#fafafa',
    fontSize: 28,
    fontWeight: '800',
    lineHeight: 34,
    marginBottom: 8,
  },
  subtitle: {
    color: '#a1a1aa',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 24,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  card: {
    backgroundColor: '#18181b',
    borderColor: '#27272a',
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#27272a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#fafafa',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 1,
  },
  statusIndicator: {
    width: 14,
    height: 14,
    borderRadius: 7,
    position: 'absolute',
    bottom: -2,
    right: -2,
    borderWidth: 2,
    borderColor: '#18181b',
  },
  infoContainer: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  name: {
    color: '#fafafa',
    fontSize: 17,
    fontWeight: '800',
  },
  role: {
    color: '#71717a',
    fontSize: 13,
    fontWeight: '600',
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 4,
    alignItems: 'center',
  },
  detailLabel: {
    color: '#71717a',
    fontSize: 13,
    width: 65,
    fontWeight: '600',
  },
  detailText: {
    color: '#e4e4e7',
    fontSize: 13,
    flex: 1,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'flex-start',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 10,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
});
