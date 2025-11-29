import React, {useState, useRef, useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Camera} from 'react-native-camera-kit';
import {ScannedCode} from '../types';

interface ScannerProps {
  onCodeScanned: (data: ScannedCode) => void;
  onClose: () => void;
}

const Scanner = ({onCodeScanned, onClose}: ScannerProps): React.JSX.Element => {
  const [isProcessing, setIsProcessing] = useState(false);
  const lastScannedCode = useRef<string>('');
  const scanCount = useRef<number>(0);
  const scanTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (scanTimer.current) {
        clearTimeout(scanTimer.current);
      }
    };
  }, []);

  const handleBarcodeScan = (event: any) => {
    if (isProcessing) return;

    const code = event.nativeEvent.codeStringValue;
    const type = event.nativeEvent.codeFormat || 'unknown';

    if (!code) return;

    if (code === lastScannedCode.current) {
      scanCount.current += 1;

      if (scanCount.current >= 5) {
        confirmScan(code, type);
      }
    } else {
      lastScannedCode.current = code;
      scanCount.current = 1;
    }

    if (scanTimer.current) {
      clearTimeout(scanTimer.current);
    }

    scanTimer.current = setTimeout(() => {
      if (scanCount.current >= 3 && lastScannedCode.current) {
        confirmScan(lastScannedCode.current, type);
      } else {
        resetScanner();
      }
    }, 3000);
  };

  const confirmScan = (code: string, type: string) => {
    setIsProcessing(true);

    onCodeScanned({
      type: type,
      value: code,
    });

    resetScanner();

    setTimeout(() => {
      setIsProcessing(false);
    }, 2000);
  };

  const resetScanner = () => {
    lastScannedCode.current = '';
    scanCount.current = 0;
    if (scanTimer.current) {
      clearTimeout(scanTimer.current);
    }
  };

  return (
    <View style={styles.container}>
      <Camera
        style={StyleSheet.absoluteFill}
        scanBarcode={!isProcessing}
        onReadCode={handleBarcodeScan}
        showFrame={false}
        scanThrottleDelay={100}
      />

      <View style={styles.overlay}>
        {/* Top dark overlay */}
        <View style={styles.topOverlay} />

        {/* Middle section with scan area */}
        <View style={styles.middleSection}>
          <View style={styles.leftOverlay} />

          <View style={styles.scanArea}>
            {/* Corners */}
            <View style={[styles.corner, styles.topLeft]} />
            <View style={[styles.corner, styles.topRight]} />
            <View style={[styles.corner, styles.bottomLeft]} />
            <View style={[styles.corner, styles.bottomRight]} />

            {isProcessing && (
              <View style={styles.processingOverlay}>
                <Text style={styles.processingText}>✓</Text>
              </View>
            )}
          </View>

          <View style={styles.rightOverlay} />
        </View>

        <View style={styles.bottomOverlay}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>✕ დახურვა</Text>
          </TouchableOpacity>
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
  },
  topOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 20,
  },
  middleSection: {
    flexDirection: 'row',
    height: 280,
  },
  leftOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  scanArea: {
    width: 280,
    height: 280,
    position: 'relative',
  },
  rightOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  bottomOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    alignItems: 'center',
    paddingTop: 30,
  },
  corner: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderColor: '#00ff00',
    borderWidth: 4,
  },
  topLeft: {
    top: 0,
    left: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  topRight: {
    top: 0,
    right: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  processingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 255, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  processingText: {
    color: '#fff',
    fontSize: 60,
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    marginBottom: 20,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  instructionText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 40,
  },
});

export default Scanner;
