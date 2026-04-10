import React, { useState } from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
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
import type { FeatureId } from './src/data/demoData';

const featureTitles: Record<FeatureId, string> = {
  'business-command-center': 'Command Center',
  'cashflow-pulse': 'Cashflow Pulse',
  'client-pulse': 'Client Pulse',
  'decision-brief': 'Decision Briefs',
  'field-ops-map': 'Field Ops Map',
  'inventory-pulse': 'Inventory Pulse',
  'live-signal-desk': 'Signal Desk',
  'ops-timeline': 'Ops Timeline',
  'revenue-stream': 'Revenue Stream',
  'team-pulse': 'Team Pulse',
  'workflow-pulse': 'Workflow Pulse',
};

function App() {
  const [role, setRole] = useState<LoginRole | null>(null);
  const [activeFeature, setActiveFeature] = useState<FeatureId | null>(null);

  function handleRoleSelect(selectedRole: LoginRole) {
    setRole(selectedRole);
    setActiveFeature(null);
  }

  function handleLogout() {
    setRole(null);
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

  function renderDashboard() {
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
        <StatusBar barStyle="dark-content" backgroundColor="#F5F7FA" />
        {role ? (
          <View style={styles.topBar}>
            <View style={styles.topBarText}>
              <Text style={styles.roleLabel}>
                {role === 'owner' ? 'Owner demo' : 'Employee demo'}
              </Text>
              <Text style={styles.routeTitle}>
                {activeFeature ? featureTitles[activeFeature] : 'Dashboard'}
              </Text>
            </View>
            <View style={styles.topActions}>
              {activeFeature ? (
                <TouchableOpacity
                  activeOpacity={0.75}
                  style={styles.topButton}
                  onPress={() => setActiveFeature(null)}
                >
                  <Text style={styles.topButtonText}>Dashboard</Text>
                </TouchableOpacity>
              ) : null}
              <TouchableOpacity
                activeOpacity={0.75}
                style={styles.topButton}
                onPress={handleLogout}
              >
                <Text style={styles.topButtonText}>Switch</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : null}

        <View style={styles.body}>
          {role ? activeFeature ? renderFeature() : renderDashboard() : (
            <LoginScreen onSelectRole={handleRoleSelect} />
          )}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#F5F7FA',
    flex: 1,
  },
  body: {
    flex: 1,
  },
  topBar: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderBottomColor: '#E5E7EB',
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  topBarText: {
    flex: 1,
    marginRight: 12,
  },
  roleLabel: {
    color: '#64748B',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 0,
    textTransform: 'uppercase',
  },
  routeTitle: {
    color: '#111827',
    fontSize: 18,
    fontWeight: '800',
    marginTop: 2,
  },
  topActions: {
    flexDirection: 'row',
  },
  topButton: {
    backgroundColor: '#ECFDF5',
    borderColor: '#A7F3D0',
    borderRadius: 8,
    borderWidth: 1,
    marginLeft: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  topButtonText: {
    color: '#0F766E',
    fontSize: 12,
    fontWeight: '800',
  },
});

export default App;
