import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { teamMembers } from '../../data/demoData';

export const TeamStatus = () => {
  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.kicker}>Team status</Text>
      <Text style={styles.title}>Workload, location, and shift readiness.</Text>
      <Text style={styles.subtitle}>
        Owner view for spotting overloaded people and offline field updates.
      </Text>

      {teamMembers.map(member => (
        <View key={member.id} style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.name}>{member.name}</Text>
            <Text style={styles.status}>{member.status}</Text>
          </View>
          <Text style={styles.role}>{member.role}</Text>
          <Text style={styles.detail}>Location: {member.location}</Text>
          <Text style={styles.detail}>Current task: {member.currentTask}</Text>
          <Text style={styles.load}>Load: {member.load}</Text>
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
    color: '#0F766E',
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
    marginBottom: 6,
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
  role: {
    color: '#64748B',
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 10,
  },
  detail: {
    color: '#4B5563',
    fontSize: 14,
    lineHeight: 20,
  },
  load: {
    color: '#B45309',
    fontSize: 13,
    fontWeight: '800',
    marginTop: 8,
  },
});
