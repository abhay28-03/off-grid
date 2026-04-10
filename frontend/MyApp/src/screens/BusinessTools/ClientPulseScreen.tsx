import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { clients } from '../../data/demoData';

export const ClientPulseScreen = () => {
  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.kicker}>Client pulse</Text>
      <Text style={styles.title}>Know which account needs attention next.</Text>
      <Text style={styles.subtitle}>
        A hardcoded client success board for renewals, payments, and service risk.
      </Text>

      {clients.map(client => (
        <View key={client.id} style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.name}>{client.name}</Text>
            <Text style={styles.value}>{client.value}</Text>
          </View>
          <Text style={styles.priority}>{client.priority}</Text>
          <View style={styles.signalBox}>
            <Text style={styles.label}>Latest signal</Text>
            <Text style={styles.text}>{client.lastSignal}</Text>
          </View>
          <Text style={styles.nextAction}>Next: {client.nextAction}</Text>
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
    color: '#2563EB',
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
    flex: 1,
    fontSize: 17,
    fontWeight: '800',
    marginRight: 12,
  },
  value: {
    color: '#0F766E',
    fontSize: 13,
    fontWeight: '800',
  },
  priority: {
    color: '#64748B',
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 12,
  },
  signalBox: {
    backgroundColor: '#EFF6FF',
    borderColor: '#DBEAFE',
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 12,
    padding: 12,
  },
  label: {
    color: '#2563EB',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0,
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  text: {
    color: '#4B5563',
    fontSize: 14,
    lineHeight: 20,
  },
  nextAction: {
    color: '#BE123C',
    fontSize: 14,
    fontWeight: '800',
  },
});
