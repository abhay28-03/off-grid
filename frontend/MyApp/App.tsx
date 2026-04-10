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
import { ToolsScreen } from './src/screens/ToolsScreen';
import type { FeatureId } from './src/data/demoData';

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
                  : 'Tools'}
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
                    Tools
                  </Text>
                </View>
              </TouchableOpacity>
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
});

export default App;
