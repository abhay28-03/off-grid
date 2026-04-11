import React from 'react';
import { ScrollView, StyleSheet, Text, View, ActivityIndicator, TouchableOpacity, Modal, TextInput } from 'react-native';

import { fetchTeam, assignTask } from '../../api/client';

const getInitials = (name: string) => {
  return name.substring(0, 2).toUpperCase();
};

const getStatusColor = (status: string) => {
  if (status.toLowerCase() === 'online') return '#10B981'; // Green
  if (status.toLowerCase().includes('offline')) return '#F59E0B'; // Orange/Amber
  return '#3B82F6'; // Default blue
};

import { useDashboardSync } from '../../hooks/useDashboardSync';

export const TeamStatus = () => {
  const syncTick = useDashboardSync();
  const [teamMembers, setTeamMembers] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  const [assignModalVisible, setAssignModalVisible] = React.useState(false);
  const [selectedEmployee, setSelectedEmployee] = React.useState<any>(null);
  const [taskText, setTaskText] = React.useState('');

  const handleAssignTask = async () => {
    if (!selectedEmployee || !taskText) return;
    try {
      await assignTask(selectedEmployee.id, taskText);
      setAssignModalVisible(false);
      setSelectedEmployee(null);
      setTaskText('');
    } catch (e) {
      console.error(e);
    }
  };

  React.useEffect(() => {
    const loadData = async () => {
      try {
        const team = await fetchTeam();
        setTeamMembers(team);
      } catch (e) {
        console.error("Failed to load team:", e);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [syncTick]);

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
      <Text style={styles.kicker}>Staff Availability</Text>
      <Text style={styles.title}>All team members</Text>
      <Text style={styles.subtitle}>
        Real-time workload, location, and shift readiness at a glance.
      </Text>

      {teamMembers.map(member => (
        <TouchableOpacity 
          key={member.id} 
          style={styles.card} 
          activeOpacity={0.8}
          onPress={() => {
            setSelectedEmployee(member);
            setAssignModalVisible(true);
          }}
        >
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{getInitials(member.name)}</Text>
            </View>
            <View 
              style={[
                styles.statusIndicator, 
                { backgroundColor: getStatusColor(member.status) }
              ]} 
            />
          </View>
          
          <View style={styles.infoContainer}>
            <View style={styles.headerRow}>
              <Text style={styles.name}>{member.name}</Text>
              <Text style={styles.actionPrompt}>Assign Task ➡</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Task:</Text>
              <Text style={styles.detailText} numberOfLines={1}>{member.currentTask}</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Location:</Text>
              <Text style={styles.detailText}>{member.location}</Text>
            </View>
            
            <View style={styles.footerRow}>
              <View style={[
                styles.statusBadge, 
                { backgroundColor: getStatusColor(member.status) + '20' }
              ]}>
                <Text style={[styles.statusText, { color: getStatusColor(member.status) }]}>
                  {member.status}
                </Text>
              </View>
              
              <View style={styles.loadBadge}>
                <Text style={styles.loadText}>Load: {member.load}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      ))}
      <View style={{ height: 60 }} />

      <Modal visible={assignModalVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Assign Task</Text>
            <Text style={styles.modalSubtitle}>To: {selectedEmployee?.name}</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="e.g. Inspect the East grid..."
              placeholderTextColor="#71717a"
              value={taskText}
              onChangeText={setTaskText}
              autoFocus
            />
            <View style={styles.modalActions}>
              <TouchableOpacity 
                style={styles.cancelBtn} 
                onPress={() => {
                  setAssignModalVisible(false);
                  setTaskText('');
                }}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.assignBtn} onPress={handleAssignTask}>
                <Text style={styles.assignText}>Assign</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <View style={{ height: 60 }} />
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
    color: '#3B82F6',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.5,
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
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#18181b',
    borderColor: '#27272a',
    borderRadius: 16,
    borderWidth: 1,
    marginBottom: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#27272a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#fafafa',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 1,
  },
  statusIndicator: {
    width: 14,
    height: 14,
    borderRadius: 7,
    position: 'absolute',
    bottom: -2,
    right: -2,
    borderWidth: 2,
    borderColor: '#18181b',
  },
  infoContainer: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  name: {
    color: '#fafafa',
    fontSize: 17,
    fontWeight: '800',
  },
  role: {
    color: '#71717a',
    fontSize: 13,
    fontWeight: '600',
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 4,
    alignItems: 'center',
  },
  detailLabel: {
    color: '#71717a',
    fontSize: 13,
    width: 65,
    fontWeight: '600',
  },
  detailText: {
    color: '#e4e4e7',
    fontSize: 13,
    flex: 1,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'flex-start',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 10,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  loadBadge: {
    backgroundColor: '#27272a',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  loadText: {
    color: '#a1a1aa',
    fontSize: 11,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  actionPrompt: {
    color: '#3B82F6',
    fontSize: 12,
    fontWeight: '700',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    padding: 24,
  },
  modalContent: {
    backgroundColor: '#18181b',
    borderColor: '#27272a',
    borderWidth: 1,
    borderRadius: 16,
    padding: 24,
  },
  modalTitle: {
    color: '#fafafa',
    fontSize: 20,
    fontWeight: '800',
  },
  modalSubtitle: {
    color: '#a1a1aa',
    fontSize: 14,
    marginBottom: 20,
  },
  modalInput: {
    backgroundColor: '#09090b',
    borderColor: '#27272a',
    borderWidth: 1,
    borderRadius: 8,
    color: '#fafafa',
    padding: 14,
    fontSize: 16,
    marginBottom: 20,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  cancelBtn: {
    padding: 12,
    marginRight: 10,
  },
  cancelText: {
    color: '#a1a1aa',
    fontWeight: '700',
  },
  assignBtn: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
  },
  assignText: {
    color: '#fff',
    fontWeight: '800',
  },
});
