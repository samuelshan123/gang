import {useState} from 'react';
import {StyleSheet} from 'react-native';
import {IconButton, Menu} from 'react-native-paper';

function ChatPageHeaderRight() {
  const [visible, setVisible] = useState(false);

  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
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
        <Menu.Item onPress={() => {}} title="Gang info" />
        <Menu.Item onPress={() => {}} title="Add particpants" />
        <Menu.Item onPress={() => {}} title="Mute notifications" />
        <Menu.Item onPress={() => {}} title="Exit gang" />
      </Menu>
    </>
  );
}

export default ChatPageHeaderRight;

const styles = StyleSheet.create({});
