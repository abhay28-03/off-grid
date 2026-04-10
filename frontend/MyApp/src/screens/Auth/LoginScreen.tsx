import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { CustomButton } from '../../components/CustomButton';

export type LoginRole = 'owner' | 'employee';

interface LoginScreenProps {
  onSelectRole: (role: LoginRole) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onSelectRole }) => {
  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.hero}>
        <Text style={styles.kicker}>Business pulse</Text>
        <Text style={styles.title}>Run live operations, even when the network drops.</Text>
        <Text style={styles.subtitle}>
          Choose a workspace. Demo data is hardcoded for the hackathon build.
        </Text>
      </View>

      <View style={styles.buttonPanel}>
        <CustomButton
          title="Owner workspace"
          onPress={() => onSelectRole('owner')}
        />
        <CustomButton
          title="Employee workspace"
          variant="secondary"
          onPress={() => onSelectRole('employee')}
        />
      </View>

      <View style={styles.noteCard}>
        <Text style={styles.noteTitle}>Demo mode</Text>
        <Text style={styles.noteText}>
          Backend, database, and auth can plug in later. This phase focuses on the
          role flow, live signals, decision briefs, and action queues.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#F5F7FA',
    flex: 1,
  },
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  hero: {
    marginBottom: 28,
  },
  kicker: {
    color: '#0F766E',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0,
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  title: {
    color: '#111827',
    fontSize: 32,
    fontWeight: '800',
    lineHeight: 38,
    marginBottom: 12,
  },
  subtitle: {
    color: '#4B5563',
    fontSize: 16,
    lineHeight: 23,
  },
  buttonPanel: {
    marginBottom: 20,
  },
  noteCard: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E5E7EB',
    borderRadius: 8,
    borderWidth: 1,
    padding: 16,
  },
  noteTitle: {
    color: '#111827',
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 6,
  },
  noteText: {
    color: '#4B5563',
    fontSize: 14,
    lineHeight: 20,
  },
});
