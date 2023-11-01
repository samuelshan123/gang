import { SafeAreaView, StyleSheet, Text } from 'react-native';
import { Button, ActivityIndicator, TextInput} from 'react-native-paper';

import { colors } from '../../theme/colors';
import { useState } from 'react';
import { fonts } from '../../theme/fonts';


function CreateGangForm(){
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);
    const handlePress = () => {
        setLoading(true);
        // Simulate some async operation
        setTimeout(() => {
          setLoading(false);
        }, 2000); // remove this if you don't want to simulate a delay
      };
    
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
          value={text}
          onChangeText={setText}
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
      marginHorizontal:10,
      marginVertical:5
    },
    button:{
        marginTop:20,
    }
  });