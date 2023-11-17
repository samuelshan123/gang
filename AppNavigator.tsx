import { useSelector } from "react-redux";
import { colors } from "./src/theme/colors";
import { fonts } from "./src/theme/fonts";
import {createStackNavigator,CardStyleInterpolators} from '@react-navigation/stack';
import Login from './src/pages/auth/Login';
import GangBottomNavigation from './src/bottom-nav/GangBottomNavigation';
import GangChatScreen from './src/pages/gangs/GangChatScreen';
import CreateGang from './src/pages/gangs/CreateGang';
import VerifyOTP from './src/pages/auth/VerifyOTP';
import CreateProfile from './src/pages/auth/CreateProfile';
import JoinGang from "./src/pages/gangs/JoinGang";
import { View, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons'; // Use your preferred icon set
import GangInfo from "./src/components/gang/gang-settings/GangInfo";

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
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, // This line adds the horizontal transition
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
            headerBackTitleVisible: false,
            headerRight: () => (
              <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity
                      onPress={() => {
                          // Do something when search is pressed
                      }}
                      style={{ marginRight: 15 }}
                  >
                      <Icon name="search" size={25} color="#fff" />
                  </TouchableOpacity>
                  <TouchableOpacity
                      onPress={() => {
                          // Do something when more icon is pressed
                      }}
                      style={{ marginRight: 10 }}
                  >
                      <Icon name="more-vert" size={25} color="#fff" />
                  </TouchableOpacity>
              </View>
          ),
          }}
          name="Home"
          component={GangBottomNavigation}
        />
        <Stack.Screen name="Join Gang" component={JoinGang} />
        <Stack.Screen name="GangChat" component={GangChatScreen} />
        <Stack.Screen name="Create Gang" component={CreateGang} />
        <Stack.Screen name="Gang Info" component={GangInfo} />

      </Stack.Navigator>
    );
  }
  

