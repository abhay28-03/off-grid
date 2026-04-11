import React, { useState, useEffect } from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  DeviceEventEmitter,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { LoginScreen } from './src/screens/Auth/LoginScreen';
import type { LoginRole } from './src/screens/Auth/LoginScreen';
import { ClientPulseScreen } from './src/screens/BusinessTools/ClientPulseScreen';
import { DecisionBriefScreen } from './src/screens/BusinessTools/DecisionBriefScreen';
import { LiveSignalDeskScreen } from './src/screens/BusinessTools/LiveSignalDeskScreen';
import { OpsTimelineScreen } from './src/screens/BusinessTools/OpsTimelineScreen';
import { WorkflowPulseScreen } from './src/screens/BusinessTools/WorkflowPulseScreen';
import { EmployeeDashboardScreen } from './src/screens/Employee/EmployeeDashboardScreen';
import { RevenueStreamScreen } from './src/screens/Employee/RevenueStreamScreen';
import { TeamPulseScreen } from './src/screens/Employee/TeamPulseScreen';
import { BusinessCommandCenterScreen } from './src/screens/Owner/BusinessCommandCenterScreen';
import { CashflowPulseScreen } from './src/screens/Owner/CashflowPulseScreen';
import { InventoryPulseScreen } from './src/screens/Owner/InventoryPulseScreen';
import { MapTrackingScreen } from './src/screens/Owner/MapTrackingScreen';
import { OwnerDashboardScreen } from './src/screens/Owner/OwnerDashboardScreen';
import { TeamStatus } from './src/screens/Owner/TeamStatus';
import { ToolsScreen } from './src/screens/ToolsScreen';
import type { FeatureId } from './src/data/demoData';

import { fetchPendingTask, acceptTask, rejectTask } from './src/api/client';

const featureTitles: Record<FeatureId, string> = {
  'business-command-center': 'Dashboard Overview',
  'cashflow-pulse': 'Payments & Cashflow',
  'client-pulse': 'Customer Health',
  'decision-brief': 'Pending Approvals',
  'field-ops-map': 'Team Locations',
  'inventory-pulse': 'Inventory & Stock',
  'live-signal-desk': 'Important Alerts',
  'ops-timeline': 'Activity Log',
  'revenue-stream': 'Sales & Invoices',
  'team-pulse': 'Staff Availability',
  'workflow-pulse': 'Active Projects',
};

type TabId = 'home' | 'inbox' | 'tools';

function App() {
  const [role, setRole] = useState<LoginRole | null>(null);
  const [activeTab, setActiveTab] = useState<TabId>('home');
  const [activeFeature, setActiveFeature] = useState<FeatureId | null>(null);
  
  const [pendingTask, setPendingTask] = useState<any>(null);

  const checkPending = async () => {
    try {
      const task = await fetchPendingTask();
      setPendingTask(task);
    } catch (e) {}
  };

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8000/ws/v1/sync');
    ws.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data);
        if (data.type === 'REFRESH_DATA') {
          DeviceEventEmitter.emit('refresh_dashboard');
          checkPending();
        }
      } catch (err) {}
    };
    return () => ws.close();
  }, []);

  useEffect(() => {
    if (role === 'employee') {
      checkPending();
    } else {
      setPendingTask(null);
    }
  }, [role]);

  const handleAcceptTask = async () => {
    if (pendingTask) {
       await acceptTask(pendingTask.id);
       setPendingTask(null);
    }
  };

  const handleRejectTask = async () => {
    if (pendingTask) {
       await rejectTask(pendingTask.id);
       setPendingTask(null);
    }
  };

  function handleRoleSelect(selectedRole: LoginRole) {
    setRole(selectedRole);
    setActiveTab('home');
    setActiveFeature(null);
  }

  function handleLogout() {
    setRole(null);
    setActiveTab('home');
    setActiveFeature(null);
  }

  function renderFeature() {
    switch (activeFeature) {
      case 'business-command-center':
        return <BusinessCommandCenterScreen />;
      case 'cashflow-pulse':
        return <CashflowPulseScreen />;
      case 'client-pulse':
        return <ClientPulseScreen />;
      case 'decision-brief':
        return <DecisionBriefScreen />;
      case 'field-ops-map':
        return <MapTrackingScreen />;
      case 'inventory-pulse':
        return <InventoryPulseScreen />;
      case 'live-signal-desk':
        return <LiveSignalDeskScreen />;
      case 'ops-timeline':
        return <OpsTimelineScreen />;
      case 'revenue-stream':
        return <RevenueStreamScreen />;
      case 'team-pulse':
        return role === 'owner' ? <TeamStatus /> : <TeamPulseScreen />;
      case 'workflow-pulse':
        return <WorkflowPulseScreen />;
      default:
        return null;
    }
  }

  function renderTabContent() {
    if (activeTab === 'inbox') {
      return <LiveSignalDeskScreen />;
    }
    if (activeTab === 'tools') {
      return (
        <ToolsScreen role={role!} onOpenFeature={(id) => setActiveFeature(id)} />
      );
    }
    if (role === 'owner') {
      return (
        <OwnerDashboardScreen
          onOpenFeature={featureId => setActiveFeature(featureId)}
        />
      );
    }
    return (
      <EmployeeDashboardScreen
        onOpenFeature={featureId => setActiveFeature(featureId)}
      />
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="light-content" backgroundColor="#09090b" />
        {role ? (
          <View style={styles.topBar}>
            <View style={styles.topBarText}>
              <Text style={styles.roleLabel}>
                {role === 'owner' ? 'Owner demo' : 'Employee demo'}
              </Text>
              <Text style={styles.routeTitle}>
                {activeFeature
                  ? featureTitles[activeFeature]
                  : activeTab === 'home'
                  ? 'Home'
                  : activeTab === 'inbox'
                  ? 'Inbox'
                  : 'Actions'}
              </Text>
            </View>
            <View style={styles.topActions}>
              {activeFeature ? (
                <TouchableOpacity
                  activeOpacity={0.75}
                  style={styles.topButton}
                  onPress={() => setActiveFeature(null)}
                >
                  <Text style={styles.topButtonText}>Close</Text>
                </TouchableOpacity>
              ) : null}
              <TouchableOpacity
                activeOpacity={0.75}
                style={[styles.topButton, styles.logoutButton]}
                onPress={handleLogout}
              >
                <Text style={styles.logoutButtonText}>Switch User</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : null}

        <View style={styles.body}>
          {role ? (
            activeFeature ? (
              renderFeature()
            ) : (
              renderTabContent()
            )
          ) : (
            <LoginScreen onSelectRole={handleRoleSelect} />
          )}
        </View>

        {role && !activeFeature && (
          <View style={styles.bottomNavContainer}>
            <View style={styles.bottomNav}>
              <TouchableOpacity
                style={styles.navItem}
                onPress={() => setActiveTab('home')}
                activeOpacity={0.7}
              >
                <View
                  style={[
                    styles.navPill,
                    activeTab === 'home' && styles.navPillActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.navText,
                      activeTab === 'home' && styles.navTextActive,
                    ]}
                  >
                    Home
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.navItem}
                onPress={() => setActiveTab('inbox')}
                activeOpacity={0.7}
              >
                <View
                  style={[
                    styles.navPill,
                    activeTab === 'inbox' && styles.navPillActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.navText,
                      activeTab === 'inbox' && styles.navTextActive,
                    ]}
                  >
                    Inbox
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.navItem}
                onPress={() => setActiveTab('tools')}
                activeOpacity={0.7}
              >
                <View
                  style={[
                    styles.navPill,
                    activeTab === 'tools' && styles.navPillActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.navText,
                      activeTab === 'tools' && styles.navTextActive,
                    ]}
                  >
                    Actions
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {role === 'employee' && pendingTask && (
          <View style={StyleSheet.absoluteFill}>
            <View style={styles.globalModalOverlay}>
              <View style={styles.globalModalContent}>
                <View style={styles.urgentBadge}>
                  <Text style={styles.urgentText}>NEW ASSIGNMENT</Text>
                </View>
                <Text style={styles.globalModalTitle}>Task Assigned</Text>
                <Text style={styles.globalModalDesc}>{pendingTask.description}</Text>
                
                <View style={styles.globalModalActions}>
                  <TouchableOpacity style={styles.globalRejectBtn} onPress={handleRejectTask}>
                    <Text style={styles.globalRejectText}>Reject</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.globalAcceptBtn} onPress={handleAcceptTask}>
                    <Text style={styles.globalAcceptText}>Accept Action</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#09090b',
    flex: 1,
  },
  body: {
    flex: 1,
  },
  topBar: {
    alignItems: 'center',
    backgroundColor: '#09090b',
    borderBottomColor: '#27272a',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 14,
  },
  topBarText: {
    flex: 1,
    marginRight: 12,
  },
  roleLabel: {
    color: '#a1a1aa',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  routeTitle: {
    color: '#fafafa',
    fontSize: 20,
    fontWeight: '800',
    marginTop: 2,
  },
  topActions: {
    flexDirection: 'row',
  },
  topButton: {
    backgroundColor: '#27272a',
    borderRadius: 20,
    marginLeft: 8,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  topButtonText: {
    color: '#fafafa',
    fontSize: 13,
    fontWeight: '600',
  },
  logoutButton: {
    backgroundColor: 'transparent',
    borderColor: '#3f3f46',
    borderWidth: 1,
  },
  logoutButtonText: {
    color: '#a1a1aa',
    fontSize: 13,
    fontWeight: '600',
  },
  bottomNavContainer: {
    backgroundColor: '#09090b',
    borderTopColor: '#27272a',
    borderTopWidth: 1,
    paddingBottom: 10,
    paddingTop: 10,
  },
  bottomNav: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
  },
  navItem: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  navPill: {
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  navPillActive: {
    backgroundColor: '#27272a',
  },
  navText: {
    color: '#71717a',
    fontSize: 14,
    fontWeight: '600',
  },
  navTextActive: {
    color: '#fafafa',
    fontWeight: '800',
  },
  globalModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.85)',
    justifyContent: 'center',
    padding: 24,
  },
  globalModalContent: {
    backgroundColor: '#18181b',
    borderColor: '#3B82F6',
    borderWidth: 2,
    borderRadius: 20,
    padding: 24,
    shadowColor: '#3B82F6',
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 10,
    alignItems: 'center',
  },
  urgentBadge: {
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 16,
  },
  urgentText: {
    color: '#60A5FA',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1,
  },
  globalModalTitle: {
    color: '#fafafa',
    fontSize: 24,
    fontWeight: '800',
    marginBottom: 12,
    textAlign: 'center',
  },
  globalModalDesc: {
    color: '#e4e4e7',
    fontSize: 18,
    lineHeight: 26,
    textAlign: 'center',
    marginBottom: 32,
    fontWeight: '500',
  },
  globalModalActions: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  globalRejectBtn: {
    flex: 1,
    paddingVertical: 14,
    marginRight: 10,
    backgroundColor: 'transparent',
    borderColor: '#3f3f46',
    borderWidth: 1,
    borderRadius: 10,
    alignItems: 'center',
  },
  globalRejectText: {
    color: '#a1a1aa',
    fontWeight: '800',
    fontSize: 15,
  },
  globalAcceptBtn: {
    flex: 1,
    paddingVertical: 14,
    marginLeft: 10,
    backgroundColor: '#3B82F6',
    borderRadius: 10,
    alignItems: 'center',
  },
  globalAcceptText: {
    color: '#ffffff',
    fontWeight: '800',
    fontSize: 15,
  },
});

export default App;
