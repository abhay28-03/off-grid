import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export type LoginRole = 'owner' | 'employee';

interface LoginScreenProps {
  onSelectRole: (role: LoginRole) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onSelectRole }) => {
  const [activeHover, setActiveHover] = useState<LoginRole | null>(null);

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.hero}>
        <View style={styles.badgeContainer}>
          <Text style={styles.kicker}>Business pulse</Text>
        </View>
        <Text style={styles.title}>Run live operations, even when the network drops.</Text>
        <Text style={styles.subtitle}>
          Choose your workspace type below to jump right in.
        </Text>
      </View>

      <View style={styles.buttonPanel}>
        <TouchableOpacity 
          style={[styles.roleCard, activeHover === 'owner' && styles.roleCardActive]}
          onPress={() => onSelectRole('owner')}
          onPressIn={() => setActiveHover('owner')}
          onPressOut={() => setActiveHover(null)}
          activeOpacity={0.9}
        >
          <View style={styles.roleIconBoxOwner}>
            <Text style={styles.roleIconTextOwner}>O</Text>
          </View>
          <View style={styles.roleCardBody}>
            <Text style={styles.roleCardTitle}>Owner Workspace</Text>
            <Text style={styles.roleCardSubtitle}>Full command center, revenue, and team pulse.</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.roleCard, activeHover === 'employee' && styles.roleCardActive]}
          onPress={() => onSelectRole('employee')}
          onPressIn={() => setActiveHover('employee')}
          onPressOut={() => setActiveHover(null)}
          activeOpacity={0.9}
        >
          <View style={styles.roleIconBoxEmployee}>
            <Text style={styles.roleIconTextEmployee}>E</Text>
          </View>
          <View style={styles.roleCardBody}>
            <Text style={styles.roleCardTitle}>Employee Workspace</Text>
            <Text style={styles.roleCardSubtitle}>Field ops, tasks, clients, and timeline.</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.noteCard}>
        <Text style={styles.noteTitle}>Demo Mode Enabled</Text>
        <Text style={styles.noteText}>
          Backend, database, and auth can plug in later. This phase focuses on the
          beautiful role flow, live signals, and target metrics.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#09090b',
    flex: 1,
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  hero: {
    marginBottom: 40,
    marginTop: 60,
  },
  badgeContainer: {
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: 'rgba(59, 130, 246, 0.2)',
  },
  kicker: {
    color: '#3B82F6',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  title: {
    color: '#fafafa',
    fontSize: 34,
    fontWeight: '800',
    lineHeight: 40,
    marginBottom: 14,
  },
  subtitle: {
    color: '#a1a1aa',
    fontSize: 16,
    lineHeight: 24,
    maxWidth: '90%',
  },
  buttonPanel: {
    marginBottom: 32,
  },
  roleCard: {
    backgroundColor: '#18181b',
    borderColor: '#27272a',
    borderRadius: 16,
    borderWidth: 1,
    padding: 20,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  roleCardActive: {
    borderColor: '#3B82F6',
    backgroundColor: '#1c1c21',
  },
  roleIconBoxOwner: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  roleIconTextOwner: {
    color: '#10B981',
    fontSize: 20,
    fontWeight: '800',
  },
  roleIconBoxEmployee: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  roleIconTextEmployee: {
    color: '#F59E0B',
    fontSize: 20,
    fontWeight: '800',
  },
  roleCardBody: {
    flex: 1,
  },
  roleCardTitle: {
    color: '#fafafa',
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 4,
  },
  roleCardSubtitle: {
    color: '#a1a1aa',
    fontSize: 14,
    lineHeight: 20,
  },
  noteCard: {
    backgroundColor: '#09090b',
    borderColor: '#27272a',
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    borderStyle: 'dashed',
  },
  noteTitle: {
    color: '#71717a',
    fontSize: 13,
    fontWeight: '800',
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  noteText: {
    color: '#52525b',
    fontSize: 14,
    lineHeight: 22,
  },
});
