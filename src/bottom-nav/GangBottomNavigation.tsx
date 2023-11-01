import {StyleSheet, Text, View} from 'react-native';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Chats from '../pages/home/Chats';
import Gangs from '../pages/home/Gangs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {colors} from '../theme/colors';
import { fonts } from '../theme/fonts';

const Tab = createMaterialBottomTabNavigator();

function GangBottomNavigation() {
  return (
    <Tab.Navigator activeColor={colors.grey} 
    barStyle={styles.bottomContainer}
    >
      <Tab.Screen
        name="Gangs"
        component={Gangs}
        options={{
          tabBarLabel: 'Gangs',
          tabBarIcon: ({color}) => (
            <MaterialIcons name="groups" color={color} size={26} />
          ),
        }}
      />
      {/* <Tab.Screen
        name="Chats"
        component={Chats}
        options={{
          tabBarLabel: 'Chats',
          // tabBarBadge:"1",
          tabBarIcon: ({color}) => <MaterialIcons name="chat" size={22} />,
        }}
      /> */}
           <Tab.Screen
        name="Moods"
        component={Chats}
        options={{
          tabBarLabel: 'Moods',
          // tabBarBadge:"1",
          tabBarIcon: ({color}) => <MaterialIcons name="mood" size={22} />,
        }}
      />
       <Tab.Screen
        name="Settings"
        component={Chats}
        options={{
          tabBarLabel: 'Settings',
          // tabBarBadge:"1",
          tabBarIcon: ({color}) => <MaterialIcons name="settings" size={22} />,
        }}
      />
    </Tab.Navigator>
  );
}

export default GangBottomNavigation;

const styles = StyleSheet.create({
  bottomContainer: {
    backgroundColor: colors.secondary_color,
    fontFamily:fonts.primary_bold
  },
});
