import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import CountryPicker, { FlagButton } from 'react-native-country-picker-modal';
import { TextInput } from 'react-native-paper';

const PhoneInput = ({ onPhoneNumberChange }) => {
  const [countryCode, setCountryCode] = useState('IN');
  const [country, setCountry] = useState({});
  const [callingCode,setCallingCode] = useState('+91')
  const [phoneNumber, setPhoneNumber] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelect = (selectedCountry) => {
    setCountryCode(selectedCountry.cca2);
    setCountry(selectedCountry);
    setModalVisible(false);
    setCallingCode(`+${selectedCountry.callingCode[0]}`);
    onPhoneNumberChange({ countryCode: selectedCountry.cca2, phoneNumber });
  };

  const handlePhoneNumberChange = (newPhoneNumber) => {
    setPhoneNumber(newPhoneNumber);
    onPhoneNumberChange(callingCode + newPhoneNumber);
  };

  const openPicker = () => {
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <TouchableOpacity onPress={openPicker} style={styles.flagWrapper}>
          <TextInput 
            label="Code" 
            value={country.callingCode && country.callingCode.length > 0 ? `+${country.callingCode[0]}` : '+91'}
            mode="outlined"
            style={styles.countryCodeInput}
            editable={false}
          />
        </TouchableOpacity>
        <TextInput
          mode="outlined"
          style={styles.input}
          label="Phone"
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={handlePhoneNumberChange}
        />
      </View>

      {modalVisible && (
        <CountryPicker
          {...{
            countryCode,
            withFilter: true,
            withFlag: true,
            withEmoji: true,
            withCallingCode: true,
            onSelect: handleSelect,
            onClose: () => setModalVisible(false),
          }}
          visible
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
    marginHorizontal: 20
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
  },
  flagWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10,
  },
  countryCodeInput: {
    width: 90,
    height: 55
  },
  input: {
    flex: 1,
    marginTop: 0,
    height: 55
  },
});

export default PhoneInput;
