/**
 * One Tap Call - Main App Entry Point
 * Emergency calling app with location-based service numbers
 */

import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  SplashScreen,
  HomeScreen,
  LocationScreen,
  CallScreen,
  NumbersScreen,
  SettingsScreen,
} from './src/screens';
import { BottomNav, TabName } from './src/components/molecules/BottomNav';
import { ServiceType } from './src/utils/emergency-numbers';

const App = () => {
  const [currentScreen, setCurrentScreen] = useState<'splash' | 'home' | 'location' | 'call'>('splash');
  const [activeTab, setActiveTab] = useState<TabName>('home');
  const [selectedService, setSelectedService] = useState<ServiceType>('police');
  const [emergencyNumber, setEmergencyNumber] = useState<string>('');
  const [countryCode, setCountryCode] = useState<string>('');
  const [manualLocation, setManualLocation] = useState<string>('');

  const handleSplashComplete = () => {
    setCurrentScreen('home');
  };

  const handleServiceSelect = (serviceType: ServiceType) => {
    setSelectedService(serviceType);
    setCurrentScreen('location');
  };

  const handleLocationProceed = (number: string, country: string) => {
    setEmergencyNumber(number);
    setCountryCode(country);
    setCurrentScreen('call');
  };

  const handleBackToHome = () => {
    setCurrentScreen('home');
  };

  const handleBackToLocation = () => {
    setCurrentScreen('location');
  };

  const handleTabPress = (tab: TabName) => {
    setActiveTab(tab);
    if (tab === 'home') {
      setCurrentScreen('home');
    }
  };

  // Show splash without bottom nav
  if (currentScreen === 'splash') {
    return (
      <SafeAreaProvider>
        <SplashScreen onComplete={handleSplashComplete} />
      </SafeAreaProvider>
    );
  }

  // Render the current screen content
  const renderScreen = () => {
    if (currentScreen === 'location') {
      return (
        <LocationScreen
          serviceType={selectedService}
          onProceed={handleLocationProceed}
          onBack={handleBackToHome}
        />
      );
    }

    if (currentScreen === 'call') {
      return (
        <CallScreen
          serviceType={selectedService}
          emergencyNumber={emergencyNumber}
          countryCode={countryCode}
          onBack={handleBackToLocation}
        />
      );
    }

    switch (activeTab) {
      case 'numbers':
        return <NumbersScreen />;
      case 'settings':
        return <SettingsScreen />;
      case 'home':
      default:
        return (
          <HomeScreen
            onServiceSelect={handleServiceSelect}
            manualLocation={manualLocation}
            onManualLocationChange={setManualLocation}
          />
        );
    }
  };

  // All screens (except splash) show bottom navigation
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <View style={styles.content}>{renderScreen()}</View>
        <BottomNav activeTab={activeTab} onTabPress={handleTabPress} />
      </View>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});

export default App;
