import { Platform } from 'react-native';

export const API_BASE_URL =
  Platform.select({
    android: 'http://10.0.2.2:8000',
    ios: 'http://localhost:8000',
    default: 'http://localhost:8000',
  }) ?? 'http://localhost:8000';

type DemoItem = {
  id: number;
  name: string;
};

type DemoResponse = {
  status: string;
  data: string;
  items: DemoItem[];
};

type EchoResponse = {
  you_sent: Record<string, unknown>;
};

export async function getDemoData(): Promise<DemoResponse> {
  return requestJson<DemoResponse>('/test');
}

export async function postEcho(
  payload: Record<string, unknown>,
): Promise<EchoResponse> {
  return requestJson<EchoResponse>('/echo', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
}

async function requestJson<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, init);

  if (!response.ok) {
    throw new Error(`Request failed with HTTP ${response.status}`);
  }

  return response.json() as Promise<T>;
}
