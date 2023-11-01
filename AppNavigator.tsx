import { useSelector } from "react-redux";
import { colors } from "./src/theme/colors";
import { fonts } from "./src/theme/fonts";
import {createStackNavigator} from '@react-navigation/stack';
import Login from './src/pages/auth/Login';
import GangBottomNavigation from './src/bottom-nav/GangBottomNavigation';
import GangChatScreen from './src/pages/gangs/GangChatScreen';
import CreateGang from './src/pages/gangs/CreateGang';
import VerifyOTP from './src/pages/auth/VerifyOTP';
import CreateProfile from './src/pages/auth/CreateProfile';
import JoinGang from "./src/pages/gangs/JoinGang";

const Stack = createStackNavigator();

export function AppNavigator(): JSX.Element {
    const screenOptions = {
        headerStyle: {
          backgroundColor: colors.primary_color, // You can change this to your preferred color
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontFamily: fonts.primary_bold,
        },
        headerBackTitleStyle: {
          fontFamily: fonts.primary,
        },
        // contentStyle:{backgroundColor:'black'}
      };
    
    const isLoggedIn = useSelector((state:any) => state.auth.isLoggedIn);
    const user = useSelector((state:any) => state.auth.user);
    console.log(user);
    
    return (
        <Stack.Navigator screenOptions={screenOptions} initialRouteName={isLoggedIn ? 'Home' : 'Login'}>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Login"
          component={Login}
        />

        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Verify OTP"
          component={VerifyOTP}
        />

        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Create Profile"
          component={CreateProfile}
        />

        <Stack.Screen
          options={{
            // headerShown: false,
            title: 'Gang Chats',
            headerBackTitleVisible: false
          }}
          name="Home"
          component={GangBottomNavigation}
        />
        <Stack.Screen name="Join Gang" component={JoinGang} />
        <Stack.Screen name="GangChat" component={GangChatScreen} />
        <Stack.Screen name="Create Gang" component={CreateGang} />
      </Stack.Navigator>
    );
  }
  

