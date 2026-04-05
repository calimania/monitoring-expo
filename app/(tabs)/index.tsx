import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';

const MONITOR_URL = process.env.EXPO_PUBLIC_MONITOR_URL ?? 'http://monitor.markket.place';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <WebView
        style={styles.webview}
        source={{ uri: MONITOR_URL }}
        originWhitelist={['http://*', 'https://*']}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});
