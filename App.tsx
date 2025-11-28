import React, {useEffect} from 'react';
import {SafeAreaView, StatusBar, StyleSheet, Platform} from 'react-native';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import HomeScreen from './src/screens/HomeScreen';

const App = (): React.JSX.Element => {
  useEffect(() => {
    requestCameraPermission();
  }, []);

  const requestCameraPermission = async () => {
    try {
      const permission = Platform.select({
        ios: PERMISSIONS.IOS.CAMERA,
        android: PERMISSIONS.ANDROID.CAMERA,
      });

      if (permission) {
        const result = await request(permission);

        if (result === RESULTS.GRANTED) {
          console.log('✅ Camera permission granted');
        } else {
          console.log('❌ Camera permission denied');
        }
      }
    } catch (error) {
      console.error('Permission error:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <HomeScreen />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;
