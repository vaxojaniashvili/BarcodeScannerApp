import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import Scanner from '../components/Scanner';
import ScanResult from '../components/ScanResult';
import {ScannedCode} from '../types';

const HomeScreen = (): React.JSX.Element => {
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const [scannedData, setScannedData] = useState<ScannedCode | null>(null);

  const handleStartScanning = (): void => {
    setScannedData(null);
    setIsScanning(true);
  };

  const handleCodeScanned = (data: ScannedCode): void => {
    setScannedData(data);
    setIsScanning(false);

    Alert.alert(
      '✓ კოდი წაკითხულია',
      `ტიპი: ${data.type}\n\nმნიშვნელობა:\n${data.value}`,
      [
        {
          text: 'კარგი',
          style: 'default',
        },
        {
          text: 'ხელახლა სკანირება',
          onPress: () => {
            setScannedData(null);
            setIsScanning(true);
          },
        },
      ],
    );
  };

  const handleCloseScanner = (): void => {
    setIsScanning(false);
  };

  if (isScanning) {
    return (
      <Scanner onCodeScanned={handleCodeScanned} onClose={handleCloseScanner} />
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>📱 ბარკოდ სკანერი</Text>
        <Text style={styles.subtitle}>QR და ბარკოდების სკანირება</Text>
      </View>

      {scannedData && <ScanResult data={scannedData} />}

      <TouchableOpacity
        style={styles.scanButton}
        onPress={handleStartScanning}
        activeOpacity={0.8}>
        <Text style={styles.scanButtonText}>
          {scannedData ? '🔄 ხელახლა სკანირება' : '📷 სკანირების დაწყება'}
        </Text>
      </TouchableOpacity>

      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>🎯 მხარდაჭერილი ფორმატები:</Text>
        <View style={styles.formatList}>
          <View style={styles.formatItem}>
            <Text style={styles.formatBullet}>•</Text>
            <Text style={styles.formatText}>QR კოდი</Text>
          </View>
          <View style={styles.formatItem}>
            <Text style={styles.formatBullet}>•</Text>
            <Text style={styles.formatText}>EAN-13, EAN-8</Text>
          </View>
          <View style={styles.formatItem}>
            <Text style={styles.formatBullet}>•</Text>
            <Text style={styles.formatText}>UPC-A, UPC-E</Text>
          </View>
          <View style={styles.formatItem}>
            <Text style={styles.formatBullet}>•</Text>
            <Text style={styles.formatText}>Code 128, Code 39, Code 93</Text>
          </View>
          <View style={styles.formatItem}>
            <Text style={styles.formatBullet}>•</Text>
            <Text style={styles.formatText}>ITF, Codabar</Text>
          </View>
          <View style={styles.formatItem}>
            <Text style={styles.formatBullet}>•</Text>
            <Text style={styles.formatText}>PDF417, Aztec, Data Matrix</Text>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>💡 თავსებადია iOS და Android-თან</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6c757d',
  },
  scanButton: {
    backgroundColor: '#007bff',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    marginVertical: 20,
    shadowColor: '#007bff',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  scanButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  infoCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 16,
  },
  formatList: {
    marginLeft: 8,
  },
  formatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  formatBullet: {
    fontSize: 20,
    color: '#007bff',
    marginRight: 12,
  },
  formatText: {
    fontSize: 15,
    color: '#495057',
  },
  footer: {
    marginTop: 30,
    alignItems: 'center',
    paddingBottom: 20,
  },
  footerText: {
    fontSize: 14,
    color: '#6c757d',
  },
});

export default HomeScreen;
