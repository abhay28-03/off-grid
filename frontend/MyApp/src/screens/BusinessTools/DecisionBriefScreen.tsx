import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { decisionBriefs } from '../../data/demoData';

export const DecisionBriefScreen = () => {
  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.kicker}>Decision briefs</Text>
      <Text style={styles.title}>Turn messy operations into owner-ready choices.</Text>
      <Text style={styles.subtitle}>
        Hardcoded brief cards that show the hackathon story before AI and backend
        are added.
      </Text>

      {decisionBriefs.map(brief => (
        <View key={brief.id} style={styles.card}>
          <Text style={styles.cardTitle}>{brief.title}</Text>
          <View style={styles.block}>
            <Text style={styles.label}>Evidence</Text>
            <Text style={styles.text}>{brief.evidence}</Text>
          </View>
          <View style={styles.block}>
            <Text style={styles.label}>Suggested move</Text>
            <Text style={styles.text}>{brief.suggestion}</Text>
          </View>
          <View style={styles.riskBox}>
            <Text style={styles.riskLabel}>Risk</Text>
            <Text style={styles.riskText}>{brief.risk}</Text>
          </View>
          <Text style={styles.action}>{brief.ownerAction}</Text>
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
  card: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E5E7EB',
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 14,
    padding: 16,
  },
  cardTitle: {
    color: '#111827',
    fontSize: 18,
    fontWeight: '800',
    lineHeight: 24,
    marginBottom: 12,
  },
  block: {
    marginBottom: 12,
  },
  label: {
    color: '#64748B',
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
  riskBox: {
    backgroundColor: '#FFF1F2',
    borderColor: '#FFE4E6',
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 12,
    padding: 12,
  },
  riskLabel: {
    color: '#BE123C',
    fontSize: 12,
    fontWeight: '800',
    marginBottom: 4,
  },
  riskText: {
    color: '#4B5563',
    fontSize: 14,
    lineHeight: 20,
  },
  action: {
    color: '#0F766E',
    fontSize: 14,
    fontWeight: '800',
  },
});
