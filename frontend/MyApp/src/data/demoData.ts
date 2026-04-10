export type SignalSeverity = 'critical' | 'warning' | 'opportunity' | 'info';
export type SignalStatus = 'live' | 'queued' | 'syncing' | 'offline';
export type TransactionDirection = 'inflow' | 'outflow';
export type Priority = 'high' | 'medium' | 'low';

export type FeatureId =
  | 'business-command-center'
  | 'live-signal-desk'
  | 'decision-brief'
  | 'cashflow-pulse'
  | 'inventory-pulse'
  | 'field-ops-map'
  | 'workflow-pulse'
  | 'client-pulse'
  | 'ops-timeline'
  | 'team-pulse'
  | 'revenue-stream';

export type DashboardFeature = {
  id: FeatureId;
  title: string;
  summary: string;
  signal: string;
};

export type LiveSignal = {
  id: string;
  title: string;
  summary: string;
  impact: string;
  signalType: string;
  severity: SignalSeverity;
  status: SignalStatus;
  updatedAt: string;
  actionLabel: string;
};

export type Metric = {
  id: string;
  title: string;
  value: string;
  trend: 'up' | 'down' | 'neutral';
  trendValue: string;
  caption: string;
};

export type Transaction = {
  id: string;
  accountName: string;
  amount: number;
  direction: TransactionDirection;
  category: string;
  timestamp: string;
  note: string;
  status: string;
};

export const ownerDashboardFeatures: DashboardFeature[] = [
  {
    id: 'business-command-center',
    title: 'Command Center',
    summary: 'Live overview for revenue, decisions, field work, and team movement.',
    signal: 'Live',
  },
  {
    id: 'live-signal-desk',
    title: 'Signal Desk',
    summary: 'The most important business changes grouped by urgency.',
    signal: '14 signals',
  },
  {
    id: 'decision-brief',
    title: 'Decision Briefs',
    summary: 'AI-style summaries for approvals, risks, and next actions.',
    signal: '5 pending',
  },
  {
    id: 'cashflow-pulse',
    title: 'Cashflow Pulse',
    summary: 'Incoming payments, payouts, overdue invoices, and collections.',
    signal: 'Updated',
  },
  {
    id: 'inventory-pulse',
    title: 'Inventory Pulse',
    summary: 'Resource levels, stock risks, restock actions, and demand spikes.',
    signal: '3 alerts',
  },
  {
    id: 'field-ops-map',
    title: 'Field Ops Map',
    summary: 'Routes, visits, field exceptions, and live service coverage.',
    signal: 'Tracking',
  },
  {
    id: 'workflow-pulse',
    title: 'Workflow Pulse',
    summary: 'Blocked work, handoffs, queue health, and service timelines.',
    signal: '8 active',
  },
  {
    id: 'client-pulse',
    title: 'Client Pulse',
    summary: 'Client risks, follow-ups, account changes, and renewal signals.',
    signal: '6 updates',
  },
  {
    id: 'ops-timeline',
    title: 'Ops Timeline',
    summary: 'A live log of business events from every team and location.',
    signal: 'Today',
  },
  {
    id: 'team-pulse',
    title: 'Team Pulse',
    summary: 'Attendance, workload, task ownership, and field availability.',
    signal: '5 online',
  },
  {
    id: 'revenue-stream',
    title: 'Revenue Stream',
    summary: 'Captured revenue, collections, and in-progress deals.',
    signal: 'Open',
  },
];

export const employeeDashboardFeatures: DashboardFeature[] = [
  {
    id: 'team-pulse',
    title: 'Team Pulse',
    summary: 'Shift, assignments, check-ins, and manager updates.',
    signal: 'Start here',
  },
  {
    id: 'revenue-stream',
    title: 'Revenue Stream',
    summary: 'Log sales, collections, and client payment updates.',
    signal: 'Open',
  },
  {
    id: 'workflow-pulse',
    title: 'Workflow Pulse',
    summary: 'Move active tasks forward and flag blockers quickly.',
    signal: '6 tasks',
  },
  {
    id: 'field-ops-map',
    title: 'Field Ops Map',
    summary: 'Assigned routes, live visits, and field exceptions.',
    signal: 'Tracking',
  },
  {
    id: 'client-pulse',
    title: 'Client Pulse',
    summary: 'Follow-ups, account notes, and client service reminders.',
    signal: '3 updates',
  },
  {
    id: 'ops-timeline',
    title: 'Ops Timeline',
    summary: 'Recent activity from your workday and connected teams.',
    signal: 'Today',
  },
  {
    id: 'live-signal-desk',
    title: 'Signal Desk',
    summary: 'Operational changes that affect your current work.',
    signal: 'Live',
  },
];

export const ownerMetrics: Metric[] = [
  {
    id: 'cash-collected',
    title: 'Cash collected',
    value: 'Rs 84.2K',
    trend: 'up',
    trendValue: '18%',
    caption: 'Today across 3 workstreams',
  },
  {
    id: 'pending-decisions',
    title: 'Pending decisions',
    value: '5',
    trend: 'down',
    trendValue: '2 cleared',
    caption: 'Approvals and exceptions',
  },
  {
    id: 'active-jobs',
    title: 'Active jobs',
    value: '18',
    trend: 'neutral',
    trendValue: 'steady',
    caption: 'Field, client, and service work',
  },
  {
    id: 'offline-queue',
    title: 'Offline queue',
    value: '11',
    trend: 'down',
    trendValue: 'syncing',
    caption: 'Updates waiting to sync',
  },
];

export const employeeMetrics: Metric[] = [
  {
    id: 'my-tasks',
    title: 'My tasks',
    value: '6',
    trend: 'neutral',
    trendValue: 'active',
    caption: '2 need confirmation',
  },
  {
    id: 'collections',
    title: 'Collections',
    value: 'Rs 21.4K',
    trend: 'up',
    trendValue: 'on pace',
    caption: 'Logged from field work',
  },
  {
    id: 'visits-left',
    title: 'Visits left',
    value: '4',
    trend: 'down',
    trendValue: '3 done',
    caption: 'Route ends at 6:30 PM',
  },
  {
    id: 'sync-health',
    title: 'Sync health',
    value: 'Good',
    trend: 'neutral',
    trendValue: '2 min',
    caption: 'Last local update',
  },
];

export const liveSignals: LiveSignal[] = [
  {
    id: 'sig-1',
    title: 'Client payment delay detected',
    summary: 'North Cluster has two invoices unpaid after field confirmation.',
    impact: 'Rs 32K may slip from today cash target.',
    signalType: 'Cashflow',
    severity: 'critical',
    status: 'live',
    updatedAt: '2 min ago',
    actionLabel: 'Assign collector',
  },
  {
    id: 'sig-2',
    title: 'Route coverage changed',
    summary: 'One employee went offline near Sector 12 after a delivery handoff.',
    impact: 'Two visits need reassignment before 5:45 PM.',
    signalType: 'Field ops',
    severity: 'warning',
    status: 'queued',
    updatedAt: '7 min ago',
    actionLabel: 'Rebalance route',
  },
  {
    id: 'sig-3',
    title: 'Fast-moving item risk',
    summary: 'Battery pack demand is 34 percent above the morning forecast.',
    impact: 'Restock window closes in 90 minutes.',
    signalType: 'Inventory',
    severity: 'opportunity',
    status: 'syncing',
    updatedAt: '11 min ago',
    actionLabel: 'Create restock task',
  },
  {
    id: 'sig-4',
    title: 'VIP follow-up opened',
    summary: 'A high-value client requested delivery proof and callback.',
    impact: 'Renewal score can improve if handled today.',
    signalType: 'Client',
    severity: 'info',
    status: 'live',
    updatedAt: '15 min ago',
    actionLabel: 'Open brief',
  },
];

export const transactions: Transaction[] = [
  {
    id: 'txn-1',
    accountName: 'Aster Foods',
    amount: 18200,
    direction: 'inflow',
    category: 'Payment received',
    timestamp: 'Today, 4:10 PM',
    note: 'Field collection confirmed by Riya',
    status: 'Synced',
  },
  {
    id: 'txn-2',
    accountName: 'SolarCare Logistics',
    amount: 7600,
    direction: 'outflow',
    category: 'Vendor payout',
    timestamp: 'Today, 3:40 PM',
    note: 'Route support for emergency dispatch',
    status: 'Queued offline',
  },
  {
    id: 'txn-3',
    accountName: 'GreenKart Retail',
    amount: 24100,
    direction: 'inflow',
    category: 'Invoice closed',
    timestamp: 'Today, 2:55 PM',
    note: 'Auto-matched after client confirmation',
    status: 'Synced',
  },
  {
    id: 'txn-4',
    accountName: 'Field service pool',
    amount: 3200,
    direction: 'outflow',
    category: 'Expense logged',
    timestamp: 'Today, 1:20 PM',
    note: 'Emergency fuel and packaging',
    status: 'Needs approval',
  },
];

export const actionQueue = [
  {
    id: 'act-1',
    title: 'Approve emergency stock transfer',
    detail: 'Battery packs can move from West Hub to North Cluster.',
    owner: 'Inventory Pulse',
    dueLabel: 'Next 20 min',
    priority: 'high' as Priority,
  },
  {
    id: 'act-2',
    title: 'Reassign two client visits',
    detail: 'Coverage gap opened after Sector 12 device went offline.',
    owner: 'Field Ops',
    dueLabel: 'Before 5:45 PM',
    priority: 'high' as Priority,
  },
  {
    id: 'act-3',
    title: 'Confirm payout exception',
    detail: 'Expense was captured offline and needs owner review.',
    owner: 'Cashflow',
    dueLabel: 'Today',
    priority: 'medium' as Priority,
  },
  {
    id: 'act-4',
    title: 'Send renewal follow-up',
    detail: 'Client opened delivery proof twice in the last hour.',
    owner: 'Client Pulse',
    dueLabel: 'This shift',
    priority: 'low' as Priority,
  },
];

export const decisionBriefs = [
  {
    id: 'brief-1',
    title: 'Move battery stock before demand spike peaks',
    evidence: 'Demand is 34 percent above forecast and two teams reported shortage.',
    suggestion: 'Transfer 18 units to North Cluster and reserve 6 for field service.',
    risk: 'Without transfer, 5 jobs may miss the same-day promise.',
    ownerAction: 'Approve transfer',
  },
  {
    id: 'brief-2',
    title: 'Rebalance Route B to protect collections target',
    evidence: 'Two unpaid invoices are on Route B and the assigned employee is offline.',
    suggestion: 'Move the visits to Riya and ask Aman to handle the lighter callback.',
    risk: 'Rs 32K could move to tomorrow if no visit happens today.',
    ownerAction: 'Reassign route',
  },
  {
    id: 'brief-3',
    title: 'Hold one vendor payout for verification',
    evidence: 'Receipt was captured offline with a mismatched amount.',
    suggestion: 'Ask for image proof before sync approval.',
    risk: 'Duplicate payout risk is low but unresolved.',
    ownerAction: 'Request proof',
  },
];

export const inventoryItems = [
  {
    id: 'inv-1',
    item: 'Battery pack kits',
    level: '18 units',
    status: 'Demand spike',
    action: 'Transfer from West Hub',
    eta: '90 min window',
  },
  {
    id: 'inv-2',
    item: 'Water filter cartridges',
    level: '42 units',
    status: 'Healthy',
    action: 'No action needed',
    eta: '3 day cover',
  },
  {
    id: 'inv-3',
    item: 'Solar controller boards',
    level: '7 units',
    status: 'Low stock',
    action: 'Create vendor order',
    eta: 'Order today',
  },
];

export const fieldRoutes = [
  {
    id: 'route-1',
    area: 'North Cluster',
    lead: 'Riya',
    status: 'Two collection visits open',
    eta: '5:30 PM',
    issue: 'Cash target at risk',
  },
  {
    id: 'route-2',
    area: 'Sector 12',
    lead: 'Aman',
    status: 'Offline queue active',
    eta: '6:10 PM',
    issue: 'Device signal weak',
  },
  {
    id: 'route-3',
    area: 'West Hub',
    lead: 'Neha',
    status: 'Stock transfer ready',
    eta: '4:50 PM',
    issue: 'Needs approval',
  },
];

export const teamMembers = [
  {
    id: 'team-1',
    name: 'Riya',
    role: 'Collections lead',
    status: 'Online',
    location: 'North Cluster',
    currentTask: 'Client payment visit',
    load: 'High',
  },
  {
    id: 'team-2',
    name: 'Aman',
    role: 'Field executive',
    status: 'Offline queue',
    location: 'Sector 12',
    currentTask: 'Delivery proof sync',
    load: 'Medium',
  },
  {
    id: 'team-3',
    name: 'Neha',
    role: 'Ops coordinator',
    status: 'Online',
    location: 'West Hub',
    currentTask: 'Stock transfer request',
    load: 'Medium',
  },
  {
    id: 'team-4',
    name: 'Kabir',
    role: 'Client support',
    status: 'Online',
    location: 'Remote desk',
    currentTask: 'VIP follow-up',
    load: 'Low',
  },
];

export const clients = [
  {
    id: 'client-1',
    name: 'Aster Foods',
    priority: 'High value',
    lastSignal: 'Payment confirmed after field visit',
    nextAction: 'Send receipt and close follow-up',
    value: 'Rs 18.2K',
  },
  {
    id: 'client-2',
    name: 'GreenKart Retail',
    priority: 'Renewal ready',
    lastSignal: 'Opened delivery proof twice',
    nextAction: 'Call before 6 PM',
    value: 'Rs 24.1K',
  },
  {
    id: 'client-3',
    name: 'North Clinic',
    priority: 'Service risk',
    lastSignal: 'Requested same-day support',
    nextAction: 'Dispatch nearest technician',
    value: 'Rs 12.6K',
  },
];

export const workflowItems = [
  {
    id: 'work-1',
    title: 'Emergency stock transfer',
    owner: 'Neha',
    status: 'Waiting for approval',
    stage: 'Inventory',
    blocker: 'Owner approval needed',
  },
  {
    id: 'work-2',
    title: 'North Cluster collections',
    owner: 'Riya',
    status: 'In progress',
    stage: 'Cashflow',
    blocker: 'Two clients pending',
  },
  {
    id: 'work-3',
    title: 'VIP delivery proof',
    owner: 'Kabir',
    status: 'Ready to send',
    stage: 'Client success',
    blocker: 'None',
  },
  {
    id: 'work-4',
    title: 'Offline expense verification',
    owner: 'Aman',
    status: 'Needs proof',
    stage: 'Finance',
    blocker: 'Receipt image missing',
  },
];

export const timelineEvents = [
  {
    id: 'time-1',
    time: '4:18 PM',
    title: 'Inventory signal raised',
    detail: 'Battery pack kits crossed the demand threshold.',
    source: 'Inventory Pulse',
  },
  {
    id: 'time-2',
    time: '4:10 PM',
    title: 'Payment confirmed',
    detail: 'Aster Foods payment synced from field collection.',
    source: 'Cashflow Pulse',
  },
  {
    id: 'time-3',
    time: '3:58 PM',
    title: 'Route exception opened',
    detail: 'Sector 12 employee entered offline queue.',
    source: 'Field Ops Map',
  },
  {
    id: 'time-4',
    time: '3:42 PM',
    title: 'Client follow-up created',
    detail: 'GreenKart Retail moved to renewal-ready queue.',
    source: 'Client Pulse',
  },
];
