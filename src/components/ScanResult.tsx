import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Clipboard,
  Alert,
} from 'react-native';
import {ScannedCode} from '../types';

interface ScanResultProps {
  data: ScannedCode;
}

const ScanResult = ({data}: ScanResultProps): React.JSX.Element => {
  const handleCopy = (): void => {
    Clipboard.setString(data.value);
    Alert.alert('✓ კოპირებულია', 'ტექსტი დაკოპირდა ბუფერში');
  };

  const getTypeDisplayName = (type: string): string => {
    const typeMap: Record<string, string> = {
      qr: 'QR კოდი',
      'ean-13': 'EAN-13',
      'ean-8': 'EAN-8',
      'code-128': 'Code 128',
      'code-39': 'Code 39',
      'code-93': 'Code 93',
      codabar: 'Codabar',
      itf: 'ITF',
      'upc-a': 'UPC-A',
      'upc-e': 'UPC-E',
      'pdf-417': 'PDF417',
      aztec: 'Aztec',
      'data-matrix': 'Data Matrix',
    };
    return typeMap[type] || type.toUpperCase();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerIcon}>✓</Text>
        <Text style={styles.headerText}>ბოლოს წაკითხული კოდი</Text>
      </View>

      <View style={styles.typeContainer}>
        <Text style={styles.typeLabel}>ტიპი:</Text>
        <View style={styles.typeBadge}>
          <Text style={styles.typeValue}>{getTypeDisplayName(data.type)}</Text>
        </View>
      </View>

      <View style={styles.valueContainer}>
        <Text style={styles.valueLabel}>მნიშვნელობა:</Text>
        <View style={styles.valueBox}>
          <Text style={styles.valueText} selectable>
            {data.value}
          </Text>
        </View>
      </View>

      <TouchableOpacity style={styles.copyButton} onPress={handleCopy}>
        <Text style={styles.copyButtonText}>📋 კოპირება</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerIcon: {
    fontSize: 24,
    marginRight: 10,
    color: '#28a745',
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  typeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  typeLabel: {
    fontSize: 14,
    color: '#6c757d',
    marginRight: 10,
  },
  typeBadge: {
    backgroundColor: '#e7f3ff',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  typeValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007bff',
  },
  valueContainer: {
    marginBottom: 16,
  },
  valueLabel: {
    fontSize: 14,
    color: '#6c757d',
    marginBottom: 8,
  },
  valueBox: {
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#dee2e6',
  },
  valueText: {
    fontSize: 16,
    color: '#1a1a1a',
    lineHeight: 24,
  },
  copyButton: {
    backgroundColor: '#6c757d',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  copyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ScanResult;
