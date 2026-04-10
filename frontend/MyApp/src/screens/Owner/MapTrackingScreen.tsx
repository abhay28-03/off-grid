import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { fieldRoutes, teamMembers } from '../../data/demoData';

export const MapTrackingScreen = () => {
  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.kicker}>Field ops map</Text>
      <Text style={styles.title}>Live coverage without a map SDK yet.</Text>
      <Text style={styles.subtitle}>
        A hardcoded operations map mockup for routes, offline queues, and coverage
        gaps.
      </Text>

      <View style={styles.mapMockup}>
        <View style={[styles.pin, styles.pinNorth]}>
          <Text style={styles.pinText}>North</Text>
        </View>
        <View style={[styles.pin, styles.pinSector]}>
          <Text style={styles.pinText}>Sector 12</Text>
        </View>
        <View style={[styles.pin, styles.pinWest]}>
          <Text style={styles.pinText}>West Hub</Text>
        </View>
        <Text style={styles.mapCaption}>Live route simulation</Text>
      </View>

      <Text style={styles.sectionTitle}>Route exceptions</Text>
      {fieldRoutes.map(route => (
        <View key={route.id} style={styles.routeCard}>
          <View style={styles.routeHeader}>
            <Text style={styles.routeArea}>{route.area}</Text>
            <Text style={styles.routeEta}>{route.eta}</Text>
          </View>
          <Text style={styles.routeStatus}>{route.status}</Text>
          <Text style={styles.routeIssue}>{route.issue}</Text>
          <Text style={styles.routeLead}>Lead: {route.lead}</Text>
        </View>
      ))}

      <Text style={styles.sectionTitle}>Available team</Text>
      {teamMembers.slice(0, 3).map(member => (
        <View key={member.id} style={styles.memberRow}>
          <Text style={styles.memberName}>{member.name}</Text>
          <Text style={styles.memberDetail}>
            {member.status} at {member.location}
          </Text>
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
  mapMockup: {
    alignItems: 'center',
    backgroundColor: '#E0F2FE',
    borderColor: '#BAE6FD',
    borderRadius: 8,
    borderWidth: 1,
    height: 240,
    justifyContent: 'center',
    marginBottom: 18,
    overflow: 'hidden',
  },
  pin: {
    alignItems: 'center',
    borderRadius: 8,
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
    position: 'absolute',
  },
  pinNorth: {
    backgroundColor: '#0F766E',
    left: 24,
    top: 36,
  },
  pinSector: {
    backgroundColor: '#BE123C',
    right: 24,
    top: 96,
  },
  pinWest: {
    backgroundColor: '#B45309',
    bottom: 42,
    left: 78,
  },
  pinText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
  },
  mapCaption: {
    color: '#075985',
    fontSize: 16,
    fontWeight: '800',
  },
  sectionTitle: {
    color: '#111827',
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 10,
    marginTop: 12,
  },
  routeCard: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E5E7EB',
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 12,
    padding: 16,
  },
  routeHeader: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  routeArea: {
    color: '#111827',
    fontSize: 17,
    fontWeight: '800',
  },
  routeEta: {
    color: '#2563EB',
    fontSize: 12,
    fontWeight: '800',
  },
  routeStatus: {
    color: '#4B5563',
    fontSize: 14,
    lineHeight: 20,
  },
  routeIssue: {
    color: '#BE123C',
    fontSize: 13,
    fontWeight: '800',
    marginTop: 6,
  },
  routeLead: {
    color: '#64748B',
    fontSize: 13,
    marginTop: 6,
  },
  memberRow: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E5E7EB',
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 10,
    padding: 14,
  },
  memberName: {
    color: '#111827',
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 4,
  },
  memberDetail: {
    color: '#4B5563',
    fontSize: 14,
  },
});
