import {useState} from 'react';
import {StyleSheet} from 'react-native';
import {IconButton, Menu} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

function ChatPageHeaderRight({gang}) {
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation()
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  handleNavigation =(menu)=>{
    if(menu==="gangInfo") {
        navigation.navigate('Gang Info',{gang})
    }
    closeMenu();
  }
  return (
    <>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <IconButton
            icon="dots-vertical"
            size={24}
            onPress={openMenu}
            iconColor='white'
            style={{marginRight: 10}}
          />
        }
        contentStyle={{
          backgroundColor: 'white',
          borderRadius: 10,
          elevation: 4,
          shadowColor: '#000',
          marginTop: 40,
        }}>
        <Menu.Item onPress={() => {handleNavigation('gangInfo')}} title="Gang info" />
        <Menu.Item onPress={() => {handleNavigation('')}} title="Add particpants" />
        <Menu.Item onPress={() => {handleNavigation('')}} title="Mute notifications" />
        <Menu.Item onPress={() => {handleNavigation('')}} title="Exit gang" />
      </Menu>
    </>
  );
}

export default ChatPageHeaderRight;

const styles = StyleSheet.create({});
