import { Image, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import PhoneInput from "../../components/auth/phoneInput";
import { colors } from "../../theme/colors";
import PrimaryButton from "../../components/ui/PrimaryButton";
import { fonts } from "../../theme/fonts";
import { useState } from "react";

function Login() {
  const navigation = useNavigation();
  const [phone,setPhone]=useState("")
   function handleValueChange(value){
    setPhone(value);
    }

    function requestOTP(){
        navigation.navigate('Verify OTP',{
            phone
        });

    }
  return (
      <SafeAreaView style={styles.container}>
        <View style={styles.containerOne}>
            {/* <Image style={styles.image} source={require('../../../assets/images/os.png')}/> */}
        </View>
        <View style={styles.containerSec}>
            <Text style={styles.textHead}>Welcome</Text>
            <Text style={styles.textSub}>Please enter your phone number</Text>
            <PhoneInput onPhoneNumberChange={handleValueChange}/>
            <PrimaryButton onPress={requestOTP}>Send OTP</PrimaryButton>
        </View>
      </SafeAreaView>
  );
}

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary_color,
    justifyContent: "center",
    alignItems: "center",
  },
  containerOne:{
    justifyContent: "center",
    alignItems: "center",
    width:'100%',
    height:'30%',
  },
  containerSec:{
    paddingTop:30,
    backgroundColor: "white",
    alignItems: "center",
    width:'100%',
    flex:1,
    borderTopLeftRadius:28,
    borderTopRightRadius:28
  },
  image:{
    width:100,
    height:100,
    borderRadius:50
  },
  textHead:{
    color:'black',
    fontFamily:fonts.primary_bold,
    fontSize:32,
  },
  textSub:{
    color:'grey',
    fontFamily:fonts.primary,
  }
});
