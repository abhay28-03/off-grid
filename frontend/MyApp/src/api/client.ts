import { 
  DashboardFeature, Metric, SalesDataPoint, LiveSignal, Transaction 
} from '../data/demoData';

const BASE_URL = 'http://localhost:8000/api';

export const fetchOwnerDashboard = async (): Promise<DashboardFeature[]> => {
  const res = await fetch(`${BASE_URL}/dashboard/owner`);
  const json = await res.json();
  return json.data;
};

export const fetchEmployeeDashboard = async (): Promise<DashboardFeature[]> => {
  const res = await fetch(`${BASE_URL}/dashboard/employee`);
  const json = await res.json();
  return json.data;
};

export const fetchOwnerMetrics = async (): Promise<Metric[]> => {
  const res = await fetch(`${BASE_URL}/metrics/owner`);
  const json = await res.json();
  return json.data;
};

export const fetchEmployeeMetrics = async (): Promise<Metric[]> => {
  const res = await fetch(`${BASE_URL}/metrics/employee`);
  const json = await res.json();
  return json.data;
};

export const fetchSales = async (): Promise<SalesDataPoint[]> => {
  const res = await fetch(`${BASE_URL}/sales`);
  const json = await res.json();
  return json.data;
};

export const fetchSignals = async (): Promise<LiveSignal[]> => {
  const res = await fetch(`${BASE_URL}/signals`);
  const json = await res.json();
  return json.data;
};

export const fetchTransactions = async (): Promise<Transaction[]> => {
  const res = await fetch(`${BASE_URL}/transactions`);
  const json = await res.json();
  return json.data;
};

export const fetchActionQueue = async (): Promise<any[]> => {
  const res = await fetch(`${BASE_URL}/actions`);
  const json = await res.json();
  return json.data;
};

export const fetchDecisionBriefs = async (): Promise<any[]> => {
  const res = await fetch(`${BASE_URL}/briefs`);
  const json = await res.json();
  return json.data;
};

export const fetchInventory = async (): Promise<any[]> => {
  const res = await fetch(`${BASE_URL}/inventory`);
  const json = await res.json();
  return json.data;
};

export const fetchRoutes = async (): Promise<any[]> => {
  const res = await fetch(`${BASE_URL}/routes`);
  const json = await res.json();
  return json.data;
};

export const fetchTeam = async (): Promise<any[]> => {
  const res = await fetch(`${BASE_URL}/team`);
  const json = await res.json();
  return json.data;
};

export const fetchClients = async (): Promise<any[]> => {
  const res = await fetch(`${BASE_URL}/clients`);
  const json = await res.json();
  return json.data;
};

export const fetchWorkflow = async (): Promise<any[]> => {
  const res = await fetch(`${BASE_URL}/workflow`);
  const json = await res.json();
  return json.data;
};

export const fetchTimeline = async (): Promise<any[]> => {
  const res = await fetch(`${BASE_URL}/timeline`);
  const json = await res.json();
  return json.data;
};

export const updateStock = async (itemId: string, sales: number) => {
  const res = await fetch(`${BASE_URL}/stock/update`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: itemId, sales }),
  });
  return res.json();
};

export const resolveAction = async (id: string) => {
  const res = await fetch(`${BASE_URL}/actions/resolve/${id}`, { method: 'POST' });
  return res.json();
};

export const resolveSignal = async (id: string) => {
  const res = await fetch(`${BASE_URL}/signals/resolve/${id}`, { method: 'POST' });
  return res.json();
};

export const resolveBrief = async (id: string) => {
  const res = await fetch(`${BASE_URL}/briefs/resolve/${id}`, { method: 'POST' });
  return res.json();
};

export const assignTask = async (employeeId: string, description: string) => {
  const res = await fetch(`${BASE_URL}/tasks/assign`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ employee_id: employeeId, description }),
  });
  return res.json();
};

export const fetchPendingTask = async () => {
  const res = await fetch(`${BASE_URL}/tasks/pending`);
  const json = await res.json();
  return json.data;
};

export const acceptTask = async (taskId: string) => {
  const res = await fetch(`${BASE_URL}/tasks/accept/${taskId}`, { method: 'POST' });
  return res.json();
};

export const rejectTask = async (taskId: string) => {
  const res = await fetch(`${BASE_URL}/tasks/reject/${taskId}`, { method: 'POST' });
  return res.json();
};
