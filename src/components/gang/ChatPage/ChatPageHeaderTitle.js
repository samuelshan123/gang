import { Avatar } from 'react-native-paper';
import { fonts } from "../../../theme/fonts";
import { colors } from "../../../theme/colors";
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';


function ChatPageHeaderTitle({gang,user}){

   const navigation = useNavigation();

    const participants = gang.members
    .map(member => {
      return member.phone === user.phone ? 'You' : member.name;
    })
    .join(', ');

  return(
    <TouchableOpacity   onPress={() => {
      // Navigate to the info page
      navigation.navigate('Gang Info',{gang});
    }}>
    <View style={styles.headerContainer}>
    <Avatar.Text
      size={35}
      label={gang.gang_name.charAt(0)}
      style={styles.avatar}
    />
    <View>
      <Text style={styles.headerTitle}>{gang.gang_name}</Text>
      <Text style={styles.headerDescription}>{participants}</Text>
    </View>
  </View>
  </TouchableOpacity>
  )
}

export default ChatPageHeaderTitle;

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      headerTitle: {
        fontSize: 18,
        paddingLeft: 10,
        color: 'white',
        fontFamily: fonts.primary_bold,
      },
      avatar: {
        backgroundColor: colors.background_color,
        marginLeft: -20,
      },
      headerDescription: {
        fontSize: 12,
        color: 'white',
        paddingLeft: 10,
        fontFamily: fonts.primary,
      }
})