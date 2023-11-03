import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { Button, ActivityIndicator, TextInput} from 'react-native-paper';
import { colors } from '../../theme/colors';
import { useState } from 'react';
import { fonts } from '../../theme/fonts';
import { postData } from '../../utils/api/api';
import { showToast } from '../ui/Toast';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../utils/redux/actions/authActions';
import {useNavigation} from '@react-navigation/native';


function CreateProfileForm({phone}){
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const dispach = useDispatch();
    const navigation = useNavigation();

    
    const handlePress = async () => {
      setLoading(true);
      const payload = {
        phone,
        name
      }
      try {
        const response = await postData('user/profile', payload);
        setLoading(false);
        console.log('Post Response:', response);
        if (response.status !== 200) {
          showToast('error', 'Oops!', response.info);
          return;
        }
        showToast('success', 'Profile created!', response.info);
        dispach(loginUser(response.user));
        navigation.navigate('Home');
      } catch (err) {
        console.error('Error posting data:', err.message);
        showToast('error', 'Oops!', err.message);
      }
    

    };
    
  return (
      <SafeAreaView style={styles.container}>
        <TextInput
          label="Name"
          value={name}
          onChangeText={setName}
          mode="outlined"
          style={styles.textInput}
          />
          
           <Button
          mode="contained"
          onPress={handlePress}
          disabled={loading}
          style={styles.button}
          labelStyle={{fontFamily:fonts.primary_bold}}
        >
          {loading 
            ? <> 
                <ActivityIndicator animating={true} color={colors.active_color} /> 
                <Text style={{color: 'white',fontFamily:fonts.primary}}>Creating Gang...</Text> 
              </>
            : 'Create profile'}
        </Button>
      </SafeAreaView>
  );
}

export default CreateProfileForm;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 20
    },
    textInput: {
      backgroundColor:'transparent',
      marginVertical:5
    },
    button:{
        marginTop:20,
        borderRadius:8
    }
  });