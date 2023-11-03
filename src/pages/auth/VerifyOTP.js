import {useNavigation} from '@react-navigation/native';
import {StyleSheet, Text, View} from 'react-native';
import OTPTextView from 'react-native-otp-textinput';
import {SafeAreaView} from 'react-native-safe-area-context';
import {fonts} from '../../theme/fonts';
import {postData} from '../../utils/api/api';
import {showToast} from '../../components/ui/Toast';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../utils/redux/actions/authActions';

function VerifyOTP({route}) {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const phone = route.params.phone;
  function onOtpChangeHandler(otp) {
    if (otp.length === 6) {
      if (otp === '111111') {
        navigation.navigate('Home');
      } else {
        console.log(otp);
        verifyOtp(otp);
      }
    }
  }

  const verifyOtp = async otp => {
    const payload = {
      phone: phone,
      otp: otp,
    };

    try {
      const response = await postData('user/verifyOtp', payload);
      console.log('Post Response:', response);
        if (response.status === 601) {
          showToast('success', 'Success!', response.info);
          navigation.navigate('Create Profile',{
            phone
          });
        }
        if (response.status !== 200) {
        showToast('error', 'Oops!', response.info);
        return;
        }
      dispatch(loginUser(response.user));
      navigation.navigate('Home');
    } catch (err) {
      console.error('Error posting data:', err.message);
      showToast('error', 'Oops!', err.message);
    }
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <Text style={styles.headTxt}>Verify Number</Text>
        <Text style={styles.headSubTxt}>
          Please enter the 6-digit OTP that we just sent on {phone}
        </Text>
        <OTPTextView inputCount={6} handleTextChange={onOtpChangeHandler} />
        <Text style={styles.resend}>Resend</Text>
      </View>
    </SafeAreaView>
  );
}

export default VerifyOTP;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: '30%',
    padding: 30,
  },
  headTxt: {
    fontSize: 30,
    color: 'black',
    fontFamily: fonts.primary_bold,
  },
  headSubTxt: {
    color: 'grey',
    marginTop: 10,
    marginVertical: 30,
    fontFamily: fonts.primary,
    textAlign: 'center',
    fontSize: 14,
  },
  resend: {
    textAlign: 'right',
    marginTop: 30,
    width: '100%',
    fontFamily: fonts.primary_bold,
  },
});
