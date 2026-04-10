import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { ActionQueueItem } from '../../components/ActionQueueItem';
import { actionQueue, workflowItems } from '../../data/demoData';

export const WorkflowPulseScreen = () => {
  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.kicker}>Workflow pulse</Text>
      <Text style={styles.title}>Spot blockers before they become missed work.</Text>
      <Text style={styles.subtitle}>
        Demo task health for approvals, collections, client success, and offline
        verification.
      </Text>

      {workflowItems.map(item => (
        <View key={item.id} style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.stage}>{item.stage}</Text>
            <Text style={styles.status}>{item.status}</Text>
          </View>
          <Text style={styles.titleText}>{item.title}</Text>
          <Text style={styles.detail}>Owner: {item.owner}</Text>
          <Text style={styles.blocker}>Blocker: {item.blocker}</Text>
        </View>
      ))}

      <Text style={styles.sectionTitle}>Queue items</Text>
      {actionQueue.map(action => (
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
    marginBottom: 8,
  },
  stage: {
    color: '#B45309',
    fontSize: 12,
    fontWeight: '800',
  },
  status: {
    color: '#0F766E',
    fontSize: 12,
    fontWeight: '800',
  },
  titleText: {
    color: '#fafafa',
    fontSize: 17,
    fontWeight: '800',
    lineHeight: 23,
    marginBottom: 8,
  },
  detail: {
    color: '#a1a1aa',
    fontSize: 14,
    marginBottom: 6,
  },
  blocker: {
    color: '#BE123C',
    fontSize: 13,
    fontWeight: '800',
  },
  sectionTitle: {
    color: '#fafafa',
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 10,
    marginTop: 12,
  },
});
