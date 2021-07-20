import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Provider } from './src/provider'
import AppRoutes from './src/routes/stack.routes';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <NavigationContainer>
      <Provider>
        <StatusBar barStyle='light-content' hidden={false} backgroundColor="#FF891D" />
        <AppRoutes />
      </Provider>
    </NavigationContainer>

  );
}
