import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { BenefitsScreen } from '../screens/BenefitsScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { LanguageSelectionScreen } from '../screens/LanguageSelectionScreen';
import { ParentalGateScreen } from '../screens/ParentalGateScreen';
import { PlushSelectionScreen } from '../screens/PlushSelectionScreen';
import { WelcomeScreen } from '../screens/WelcomeScreen';
import { RootStackParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="LanguageSelection"
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen
          name="LanguageSelection"
          component={LanguageSelectionScreen}
        />

        <Stack.Screen name="Welcome" component={WelcomeScreen} />

        <Stack.Screen name="PlushSelection" component={PlushSelectionScreen} />

        <Stack.Screen name="Benefits" component={BenefitsScreen} />

        <Stack.Screen name="ParentalGate" component={ParentalGateScreen} />

        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
