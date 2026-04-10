import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { ActionQueueItem } from '../components/ActionQueueItem';
import { actionQueue } from '../data/demoData';

export const ToolsScreen: React.FC = () => {
  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <Text style={styles.title}>All Actions</Text>
        <Text style={styles.subtitle}>
          Your pending tasks and decisions.
        </Text>
      </View>

      <Text style={styles.sectionTitle}>Action Queue</Text>
      <View style={styles.actionsList}>
        {actionQueue.map((action) => (
          <ActionQueueItem
            key={action.id}
            title={action.title}
            detail={action.detail}
            owner={action.owner}
            dueLabel={action.dueLabel}
            priority={action.priority}
          />
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
  header: {
    marginBottom: 24,
  },
  title: {
    color: '#fafafa',
    fontSize: 32,
    fontWeight: '800',
    lineHeight: 38,
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  subtitle: {
    color: '#a1a1aa',
    fontSize: 16,
    lineHeight: 24,
  },
  sectionTitle: {
    color: '#fafafa',
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 16,
    marginTop: 8,
    letterSpacing: -0.3,
  },
  actionsList: {
    flexDirection: 'column',
    gap: 12,
  },
});
