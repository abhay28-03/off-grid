import { useState } from 'react';
import {
  ActivityIndicator,
  Button,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  useColorScheme,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { API_BASE_URL, getDemoData, postEcho } from './src/api';

type RequestStatus = 'idle' | 'loading' | 'success' | 'error';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const [status, setStatus] = useState<RequestStatus>('idle');
  const [message, setMessage] = useState('Tap a button to test the API.');
  const [items, setItems] = useState<string[]>([]);
  const [echoResult, setEchoResult] = useState('');

  async function loadDemoData() {
    setStatus('loading');
    setEchoResult('');

    try {
      const data = await getDemoData();
      setItems(data.items.map(item => item.name));
      setMessage(`${data.status}: ${data.data}`);
      setStatus('success');
    } catch (error) {
      setItems([]);
      setMessage(getErrorMessage(error));
      setStatus('error');
    }
  }

  async function sendEcho() {
    setStatus('loading');
    setItems([]);

    try {
      const response = await postEcho({
        source: 'React Native',
        sentAt: new Date().toISOString(),
      });
      setEchoResult(JSON.stringify(response.you_sent, null, 2));
      setMessage('Echo request completed.');
      setStatus('success');
    } catch (error) {
      setEchoResult('');
      setMessage(getErrorMessage(error));
      setStatus('error');
    }
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.title}>Off Grid Test App</Text>
          <Text style={styles.subtitle}>FastAPI base URL: {API_BASE_URL}</Text>

          <View style={styles.actions}>
            <Button
              title="Load /test"
              onPress={loadDemoData}
              disabled={status === 'loading'}
            />
            <Button
              title="Send /echo"
              onPress={sendEcho}
              disabled={status === 'loading'}
            />
          </View>

          <View style={styles.resultBox}>
            {status === 'loading' ? <ActivityIndicator /> : null}
            <Text style={[styles.message, status === 'error' && styles.error]}>
              {message}
            </Text>

            {items.length > 0 ? (
              <View style={styles.itemList}>
                {items.map(item => (
                  <Text key={item} style={styles.item}>
                    - {item}
                  </Text>
                ))}
              </View>
            ) : null}

            {echoResult ? (
              <Text style={styles.codeBlock}>{echoResult}</Text>
            ) : null}
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  return 'Request failed.';
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f6f8fb',
  },
  container: {
    flexGrow: 1,
    gap: 20,
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    color: '#1f2937',
    fontSize: 28,
    fontWeight: '700',
  },
  subtitle: {
    color: '#475569',
    fontSize: 15,
    lineHeight: 22,
  },
  actions: {
    gap: 12,
  },
  resultBox: {
    gap: 12,
    minHeight: 180,
    padding: 16,
    borderRadius: 8,
    borderColor: '#d6dee8',
    borderWidth: 1,
    backgroundColor: '#ffffff',
  },
  message: {
    color: '#111827',
    fontSize: 16,
    lineHeight: 24,
  },
  error: {
    color: '#b91c1c',
  },
  itemList: {
    gap: 8,
  },
  item: {
    color: '#0f766e',
    fontSize: 16,
  },
  codeBlock: {
    padding: 12,
    borderRadius: 8,
    color: '#f8fafc',
    backgroundColor: '#111827',
    fontFamily: 'monospace',
    fontSize: 13,
  },
});

export default App;
