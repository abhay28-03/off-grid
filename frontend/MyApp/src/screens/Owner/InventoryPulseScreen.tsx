import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { ActionQueueItem } from '../../components/ActionQueueItem';
import { inventoryItems, actionQueue } from '../../data/demoData';

export const InventoryPulseScreen = () => {
  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.kicker}>Inventory pulse</Text>
      <Text style={styles.title}>Treat inventory like an operating signal.</Text>
      <Text style={styles.subtitle}>
        Hardcoded stock risks, restock windows, and field-ready actions for the
        demo.
      </Text>

      {inventoryItems.map(item => (
        <View key={item.id} style={styles.itemCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.itemName}>{item.item}</Text>
            <Text style={styles.level}>{item.level}</Text>
          </View>
          <Text style={styles.status}>{item.status}</Text>
          <View style={styles.actionBox}>
            <Text style={styles.actionLabel}>Suggested action</Text>
            <Text style={styles.actionText}>{item.action}</Text>
            <Text style={styles.eta}>{item.eta}</Text>
          </View>
        </View>
      ))}

      <Text style={styles.sectionTitle}>Inventory action</Text>
      {actionQueue
        .filter(action => action.owner === 'Inventory Pulse')
        .map(action => (
          <ActionQueueItem
            key={action.id}
            title={action.title}
            detail={action.detail}
            owner={action.owner}
            dueLabel={action.dueLabel}
            priority={action.priority}
          />
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
    color: '#B45309',
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
  itemCard: {
    backgroundColor: '#18181b',
    borderColor: '#27272a',
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 12,
    padding: 16,
  },
  cardHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  itemName: {
    color: '#fafafa',
    flex: 1,
    fontSize: 17,
    fontWeight: '800',
    marginRight: 12,
  },
  level: {
    color: '#0F766E',
    fontSize: 13,
    fontWeight: '800',
  },
  status: {
    color: '#a1a1aa',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  actionBox: {
    backgroundColor: '#FFFBEB',
    borderColor: '#FDE68A',
    borderRadius: 8,
    borderWidth: 1,
    padding: 12,
  },
  actionLabel: {
    color: '#B45309',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0,
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  actionText: {
    color: '#fafafa',
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 4,
  },
  eta: {
    color: '#a1a1aa',
    fontSize: 13,
  },
  sectionTitle: {
    color: '#fafafa',
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 10,
    marginTop: 12,
  },
});
