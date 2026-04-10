import React from 'react';
import { ScrollView, StyleSheet, Text, View, ActivityIndicator } from 'react-native';

import { fetchClients } from '../../api/client';

export const ClientPulseScreen = () => {
  const [clients, setClients] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchClients();
        setClients(data);
      } catch (e) {
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return (
      <View style={[styles.screen, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }

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
    backgroundColor: '#09090b',
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
    marginBottom: 18,
  },
  card: {
    backgroundColor: '#18181b',
    borderColor: '#27272a',
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
    color: '#fafafa',
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
    color: '#71717a',
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
    color: '#a1a1aa',
    fontSize: 14,
    lineHeight: 20,
  },
  nextAction: {
    color: '#BE123C',
    fontSize: 14,
    fontWeight: '800',
  },
});
