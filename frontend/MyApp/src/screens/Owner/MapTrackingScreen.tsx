import React, { useEffect, useState, useRef } from 'react';
import { ScrollView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { MapPin } from 'lucide-react-native';

import { fetchRoutes, fetchTeam } from '../../api/client';

const WS_URL = 'ws://localhost:8000/ws/v1/tracking/live';

export const MapTrackingScreen = () => {
  const [pins, setPins] = useState({
    north: { top: 36, left: 24 },
    sector: { top: 96, left: 220 },
    west: { top: 160, left: 78 },
  });
  
  const [fieldRoutes, setFieldRoutes] = React.useState<any[]>([]);
  const [teamMembers, setTeamMembers] = React.useState<any[]>([]);

  React.useEffect(() => {
    const loadData = async () => {
      try {
        const [routes, team] = await Promise.all([
          fetchRoutes(),
          fetchTeam(),
        ]);
        setFieldRoutes(routes);
        setTeamMembers(team);
      } catch (e) {}
    };
    loadData();
  }, []);

  const [wsStatus, setWsStatus] = useState('Connecting...');
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    ws.current = new WebSocket(WS_URL);

    ws.current.onopen = () => setWsStatus('Connected (Live)');

    ws.current.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);
        if (data.id && data.top !== undefined && data.left !== undefined) {
          setPins(prev => ({
            ...prev,
            [data.id]: { top: data.top, left: data.left }
          }));
        }
      } catch (err) { }
    };

    ws.current.onerror = () => setWsStatus('Error Connecting');
    ws.current.onclose = () => setWsStatus('Disconnected');

    return () => ws.current?.close();
  }, []);

  const simulateEmployeeBroadcast = () => {
    if (!ws.current || ws.current.readyState !== WebSocket.OPEN) return;

    // Simulate North employee walking towards the center
    const newTop = pins.north.top + (Math.random() * 15 - 5);
    const newLeft = pins.north.left + (Math.random() * 20 - 5);

    ws.current.send(JSON.stringify({
      id: 'north',
      top: Math.max(0, Math.min(200, newTop)),
      left: Math.max(0, Math.min(300, newLeft))
    }));
  };

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >

      <View style={styles.mapMockup}>
        <View style={[styles.pin, { top: pins.north.top, left: pins.north.left }]}>
          <MapPin size={28} color="#10B981" fill="#10B981" />
          <Text style={styles.pinText}>North</Text>
        </View>
        <View style={[styles.pin, { top: pins.sector.top, left: pins.sector.left }]}>
          <MapPin size={28} color="#EF4444" fill="#EF4444" />
          <Text style={styles.pinText}>Sector 12</Text>
        </View>
        <View style={[styles.pin, { top: pins.west.top, left: pins.west.left }]}>
          <MapPin size={28} color="#F59E0B" fill="#F59E0B" />
          <Text style={styles.pinText}>West Hub</Text>
        </View>
        {wsStatus.includes('Live') && (
          <View style={styles.liveIndicator}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>GPS LIVE</Text>
          </View>
        )}
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
  mapMockup: {
    backgroundColor: '#18181b',
    borderColor: '#27272a',
    borderRadius: 8,
    borderWidth: 1,
    height: 240,
    marginBottom: 24,
    marginTop: 8,
    overflow: 'hidden',
    position: 'relative',
  },
  liveIndicator: {
    position: 'absolute',
    top: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#09090b80',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#27272a',
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#10B981',
    marginRight: 6,
  },
  liveText: {
    color: '#10B981',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  statusLive: { backgroundColor: '#10B981' },
  statusOffline: { backgroundColor: '#EF4444' },
  statusText: { color: '#fff', fontSize: 10, fontWeight: '800', textTransform: 'uppercase' },
  pin: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
  pinText: {
    color: '#fafafa',
    fontSize: 11,
    fontWeight: '800',
    marginTop: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  mapCaption: {
    color: '#075985',
    fontSize: 16,
    fontWeight: '800',
  },
  broadcastButton: {
    backgroundColor: '#FAF9F6',
    paddingVertical: 14,
    borderRadius: 4,
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e4e4e7',
  },
  broadcastButtonText: {
    color: '#09090b',
    fontWeight: '800',
    fontSize: 14,
  },
  sectionTitle: {
    color: '#fafafa',
    fontSize: 17,
    fontWeight: '800',
    marginBottom: 10,
    marginTop: 12,
  },
  routeCard: {
    backgroundColor: '#18181b',
    borderColor: '#27272a',
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
    color: '#fafafa',
    fontSize: 17,
    fontWeight: '800',
  },
  routeEta: {
    color: '#2563EB',
    fontSize: 12,
    fontWeight: '800',
  },
  routeStatus: {
    color: '#a1a1aa',
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
    color: '#71717a',
    fontSize: 13,
    marginTop: 6,
  },
  memberRow: {
    backgroundColor: '#18181b',
    borderColor: '#27272a',
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 10,
    padding: 14,
  },
  memberName: {
    color: '#fafafa',
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 4,
  },
  memberDetail: {
    color: '#a1a1aa',
    fontSize: 14,
  },
});
