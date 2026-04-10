import { useState, useEffect } from 'react';
import { DeviceEventEmitter } from 'react-native';

export function useDashboardSync() {
  const [refreshTick, setRefreshTick] = useState(0);

  useEffect(() => {
    const sub = DeviceEventEmitter.addListener('refresh_dashboard', () => {
      setRefreshTick(t => t + 1);
    });
    return () => sub.remove();
  }, []);

  return refreshTick;
}
