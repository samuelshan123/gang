import {SafeAreaView, StyleSheet, Text} from 'react-native';
import {Button, ActivityIndicator, TextInput} from 'react-native-paper';

import {colors} from '../../theme/colors';
import {useState} from 'react';
import {fonts} from '../../theme/fonts';
import {postData} from '../../utils/api/api';
import {showToast} from '../ui/Toast';
import { useNavigation } from '@react-navigation/native';

function JoinGangForm({user}) {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handlePress = async () => {
    setLoading(true);
    try {
      const payload ={
        phone:user.phone,
        name:user.name,
        gang_id:text
      }
      const response = await postData('gang/join', payload);
      setLoading(false);
      console.log('Post Response:', response);
      if (response.status !== 200) {
        showToast('error', 'Oops!', response.info);
        return;
      }
      navigation.navigate('Home');
    } catch (err) {
      setLoading(false);
      console.error('Error posting data:', err.message);
      showToast('error', 'Oops!', err.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text
        style={{
          fontFamily: fonts.primary_bold,
          textAlign: 'center',
          fontSize: 24,
          marginBottom: 10,
        }}>
        Enter the 8 digit code
      </Text>
      <TextInput
        label="Gang Id"
        value={text}
        onChangeText={setText}
        mode="outlined"
        style={styles.textInput}
      />

      <Button
        mode="contained"
        onPress={handlePress}
        disabled={loading}
        style={styles.button}
        labelStyle={{fontFamily: fonts.primary_bold}}>
        {loading ? (
          <>
            <ActivityIndicator animating={true} color={colors.active_color} />
            <Text style={{color: 'white', fontFamily: fonts.primary}}>
              Creating Gang...
            </Text>
          </>
        ) : (
          'Join Gang'
        )}
      </Button>
    </SafeAreaView>
  );
}

export default JoinGangForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    marginTop: '40%',
    padding: 20,
  },
  textInput: {
    // height: 50,
    backgroundColor: 'transparent',
    marginVertical: 5,
  },
  button: {
    marginTop: 20,
    borderRadius:8
  },
});
