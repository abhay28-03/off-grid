import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { employeeMetrics, teamMembers } from '../../data/demoData';
import { MetricCard } from '../../components/MetricCard';

export const TeamPulseScreen = () => {
  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.kicker}>Team pulse</Text>
      <Text style={styles.title}>Your shift and the people around you.</Text>
      <Text style={styles.subtitle}>
        Employee-focused view for workload, task ownership, and availability.
      </Text>

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
          <View style={styles.header}>
            <Text style={styles.name}>{member.name}</Text>
            <Text style={styles.status}>{member.status}</Text>
          </View>
          <Text style={styles.detail}>{member.currentTask}</Text>
          <Text style={styles.meta}>{member.role} at {member.location}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#F5F7FA',
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 32,
  },
  kicker: {
    color: '#BE123C',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  title: {
    color: '#111827',
    fontSize: 28,
    fontWeight: '800',
    lineHeight: 34,
    marginBottom: 8,
  },
  subtitle: {
    color: '#4B5563',
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 18,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E5E7EB',
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 12,
    padding: 16,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  name: {
    color: '#111827',
    fontSize: 17,
    fontWeight: '800',
  },
  status: {
    color: '#0F766E',
    fontSize: 12,
    fontWeight: '800',
  },
  detail: {
    color: '#4B5563',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 6,
  },
  meta: {
    color: '#64748B',
    fontSize: 13,
  },
});
