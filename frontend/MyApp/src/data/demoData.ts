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

export type SalesDataPoint = {
  day: string;
  sales: number;
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
    title: 'Dashboard Overview',
    summary: 'High-level view of your business health, staff, and revenue.',
    signal: 'Live',
  },
  {
    id: 'live-signal-desk',
    title: 'Important Alerts',
    summary: 'Critical notifications that require your immediate attention.',
    signal: '14 alerts',
  },
  {
    id: 'decision-brief',
    title: 'Pending Approvals',
    summary: 'Review and approve requests, risks, and next steps.',
    signal: '5 pending',
  },
  {
    id: 'cashflow-pulse',
    title: 'Payments & Cashflow',
    summary: 'Track incoming money, payouts, and overdue invoices.',
    signal: 'Updated',
  },
  {
    id: 'inventory-pulse',
    title: 'Inventory & Stock',
    summary: 'Monitor stock levels and reorder supplies before they run out.',
    signal: '3 alerts',
  },
  {
    id: 'field-ops-map',
    title: 'Team Locations',
    summary: 'See where your field staff are and track active visits.',
    signal: 'Tracking',
  },
  {
    id: 'workflow-pulse',
    title: 'Active Projects',
    summary: 'Track the status of ongoing work and identify blockages.',
    signal: '8 active',
  },
  {
    id: 'client-pulse',
    title: 'Customer Health',
    summary: 'View client feedback, follow-ups, and upcoming renewals.',
    signal: '6 updates',
  },
  {
    id: 'ops-timeline',
    title: 'Activity Log',
    summary: 'A running history of business events across all locations.',
    signal: 'Today',
  },
  {
    id: 'team-pulse',
    title: 'Staff Availability',
    summary: 'Check who is currently working, their workload, and tasks.',
    signal: '5 online',
  },
  {
    id: 'revenue-stream',
    title: 'Sales & Invoices',
    summary: 'Review closed deals and payments waiting to be processed.',
    signal: 'Open',
  },
];

export const employeeDashboardFeatures: DashboardFeature[] = [
  {
    id: 'team-pulse',
    title: 'My Schedule',
    summary: 'View your assignments, shift details, and check in.',
    signal: 'Start here',
  },
  {
    id: 'revenue-stream',
    title: 'Log Sales',
    summary: 'Record new sales and customer payments from the field.',
    signal: 'Open',
  },
  {
    id: 'workflow-pulse',
    title: 'My Tasks',
    summary: 'Manage your daily work and report any issues.',
    signal: '6 tasks',
  },
  {
    id: 'field-ops-map',
    title: 'My Route',
    summary: 'See your assigned locations and navigate to visits.',
    signal: 'Tracking',
  },
  {
    id: 'client-pulse',
    title: 'Customer Notes',
    summary: 'Read and update details about the customers you are visiting.',
    signal: '3 updates',
  },
  {
    id: 'ops-timeline',
    title: 'Team Activity',
    summary: 'See what your teammates are working on today.',
    signal: 'Today',
  },
  {
    id: 'live-signal-desk',
    title: 'Urgent Notices',
    summary: 'Important updates from managers that affect your work.',
    signal: 'Live',
  },
];

export const ownerMetrics: Metric[] = [
  {
    id: 'weekly-revenue',
    title: 'Weekly Revenue',
    value: 'Rs 520K',
    trend: 'up',
    trendValue: '12%',
    caption: 'Compared to last week',
  },
  {
    id: 'profit-margin',
    title: 'Profit Margin',
    value: '24%',
    trend: 'up',
    trendValue: '2%',
    caption: 'Across all operations',
  },
];

export const employeeMetrics: Metric[] = [
  {
    id: 'items-sold',
    title: 'Items Sold',
    value: '42',
    trend: 'up',
    trendValue: 'on pace',
    caption: 'Logged today',
  },
  {
    id: 'collections-emp',
    title: 'Collections',
    value: 'Rs 21.4K',
    trend: 'up',
    trendValue: 'good',
    caption: 'From completed visits',
  },
];

export const salesData: SalesDataPoint[] = [
  { day: 'Mon', sales: 45 },
  { day: 'Tue', sales: 52 },
  { day: 'Wed', sales: 38 },
  { day: 'Thu', sales: 65 },
  { day: 'Fri', sales: 84 },
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
