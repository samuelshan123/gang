import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {colors} from './src/theme/colors';
import {StatusBar} from 'react-native';
import {Appearance} from 'react-native';
Appearance.setColorScheme('light');
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import { Provider, useSelector } from 'react-redux';
import Toast from './src/components/ui/Toast';
import { persistor, store } from './src/utils/redux/store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { AppNavigator } from './AppNavigator';

const CustomTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary_color,
    accent: colors.active_color,
    // surface: '#f9f9f9'
    // background: 'transparent',
  },
};

function App(): JSX.Element {
 
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <PaperProvider theme={CustomTheme}>
        <StatusBar
          backgroundColor={colors.primary_color}
          barStyle="light-content"
        />
        <NavigationContainer>
         <AppNavigator/>
          <Toast />
        </NavigationContainer>
      </PaperProvider>
      </PersistGate>
      </Provider>
  );
}

export default App;
