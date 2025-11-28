import React, {useState, useRef} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Camera} from 'react-native-camera-kit';
import {ScannedCode} from '../types';

interface ScannerProps {
  onCodeScanned: (data: ScannedCode) => void;
  onClose: () => void;
}

const Scanner = ({onCodeScanned, onClose}: ScannerProps): React.JSX.Element => {
  const [isProcessing, setIsProcessing] = useState(false);
  const scannedCodes = useRef<Map<string, number>>(new Map());
  const scanTimeout = useRef<NodeJS.Timeout | null>(null);

  const REQUIRED_SCANS = 2;
  const SCAN_WINDOW = 2000;

  const handleBarcodeScan = (event: any) => {
    if (isProcessing) return;

    const code = event.nativeEvent.codeStringValue;
    if (!code) return;

    const currentCount = scannedCodes.current.get(code) || 0;
    scannedCodes.current.set(code, currentCount + 1);

    if (scanTimeout.current) {
      clearTimeout(scanTimeout.current);
    }

    if (scannedCodes.current.get(code)! >= REQUIRED_SCANS) {
      setIsProcessing(true);

      onCodeScanned({
        type: 'qr',
        value: code,
      });

      scannedCodes.current.clear();

      setTimeout(() => {
        setIsProcessing(false);
      }, 3000);
    } else {
      scanTimeout.current = setTimeout(() => {
        scannedCodes.current.clear();
      }, SCAN_WINDOW);
    }
  };

  return (
    <View style={styles.container}>
      <Camera
        style={StyleSheet.absoluteFill}
        scanBarcode={!isProcessing}
        onReadCode={handleBarcodeScan}
        showFrame={true}
        laserColor="rgba(255, 255, 255, 0.5)"
        frameColor="white"
      />

      <View style={styles.overlay}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>✕ დახურვა</Text>
          </TouchableOpacity>
        </View>

        {/* Scan Area */}
        <View style={styles.scanAreaContainer}>
          <View style={styles.scanArea}>
            {/* Corners */}
            <View style={[styles.corner, styles.topLeft]} />
            <View style={[styles.corner, styles.topRight]} />
            <View style={[styles.corner, styles.bottomLeft]} />
            <View style={[styles.corner, styles.bottomRight]} />

            {/* Processing indicator */}
            {isProcessing && (
              <View style={styles.processingOverlay}>
                <Text style={styles.processingText}>✓ წაკითხულია</Text>
              </View>
            )}
          </View>
        </View>

        {/* Instructions */}
        <View style={styles.instructionsContainer}>
          <Text style={styles.instructionText}>
            {isProcessing
              ? 'კოდი წარმატებით წაიკითხა!'
              : 'შეინარჩუნეთ კამერა სტაბილურად ბარკოდზე'}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  closeButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    alignSelf: 'flex-start',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  scanAreaContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanArea: {
    width: 280,
    height: 280,
    position: 'relative',
  },
  corner: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderColor: '#fff',
  },
  topLeft: {
    top: 0,
    left: 0,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderTopLeftRadius: 8,
  },
  topRight: {
    top: 0,
    right: 0,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderTopRightRadius: 8,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderBottomLeftRadius: 8,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderBottomRightRadius: 8,
  },
  processingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 255, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  processingText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  instructionsContainer: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  instructionText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
  },
});

export default Scanner;
