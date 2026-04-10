import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { timelineEvents } from '../../data/demoData';

export const OpsTimelineScreen = () => {
  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.kicker}>Ops timeline</Text>
      <Text style={styles.title}>A shared memory of what changed today.</Text>
      <Text style={styles.subtitle}>
        Chronological demo feed for signals, money movement, route exceptions, and
        client updates.
      </Text>

      {timelineEvents.map(event => (
        <View key={event.id} style={styles.timelineItem}>
          <View style={styles.timeColumn}>
            <Text style={styles.time}>{event.time}</Text>
            <View style={styles.line} />
          </View>
          <View style={styles.eventCard}>
            <Text style={styles.source}>{event.source}</Text>
            <Text style={styles.eventTitle}>{event.title}</Text>
            <Text style={styles.detail}>{event.detail}</Text>
          </View>
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
    color: '#0F766E',
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
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  timeColumn: {
    alignItems: 'center',
    marginRight: 12,
    width: 68,
  },
  time: {
    color: '#71717a',
    fontSize: 12,
    fontWeight: '800',
    marginBottom: 8,
  },
  line: {
    backgroundColor: '#CBD5E1',
    flex: 1,
    width: 2,
  },
  eventCard: {
    backgroundColor: '#18181b',
    borderColor: '#27272a',
    borderRadius: 8,
    borderWidth: 1,
    flex: 1,
    padding: 16,
  },
  source: {
    color: '#0F766E',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0,
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  eventTitle: {
    color: '#fafafa',
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 6,
  },
  detail: {
    color: '#a1a1aa',
    fontSize: 14,
    lineHeight: 20,
  },
});
