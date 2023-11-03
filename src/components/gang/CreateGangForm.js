import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { Button, ActivityIndicator, TextInput} from 'react-native-paper';
import { colors } from '../../theme/colors';
import { useState } from 'react';
import { fonts } from '../../theme/fonts';
import { postData } from '../../utils/api/api';
import { showToast } from '../ui/Toast';
import { realm } from '../../utils/models/relamConfig';
import Realm from "realm";
import { useNavigation } from '@react-navigation/native';


function CreateGangForm({user}){
  const navigation = useNavigation();
    const [text, setText] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const handlePress = async () => {
      setLoading(true);
      try {
        const payload ={
          phone:user.phone,
          name:user.name,
          gang_name:text,
          description:description
        }
        const response = await postData('gang/create', payload);
        setLoading(false);
        console.log('Post Response:', response);
        if (response.status !== 200) {
          showToast('error', 'Oops!', response.info);
          return;
        }
        storeMessageToRealm(response.gang);
        navigation.navigate('Home');
      } catch (err) {
        setLoading(false);
        console.error('Error posting data:', err.message);
        showToast('error', 'Oops!', err.message);
      }
    };

    function storeMessageToRealm(data) {
      try {
        realm.write(() => {
          realm.create('Gang', data, Realm.UpdateMode.Modified);
        });
      } catch (error) {
        console.error('Error storing message to Realm:', error);
      }
    }
    
  return (
    // <PaperProvider theme={theme}>
      <SafeAreaView style={styles.container}>
        <TextInput
          label="Gang Name"
          value={text}
          onChangeText={setText}
          mode="outlined"
          style={styles.textInput}
          />
             <TextInput
          label="Description"
          value={description}
          onChangeText={setDescription}
          mode="outlined"
          multiline={true}
          numberOfLines={3}
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
            : 'Create Gang'}
        </Button>
      </SafeAreaView>
    // </PaperProvider>
  );
}

export default CreateGangForm;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 20,
    },
    textInput: {
      // height: 50,
      backgroundColor:'transparent',
      marginVertical:5
    },
    button:{
        marginTop:20,
        borderRadius:8
    }
  });