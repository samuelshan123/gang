import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Clipboard } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors } from '../../../theme/colors';

export default function GetGangCodeOrQR({route}) {

  const code = route.params.gang_id
  const handleCopyCode = () => {
    Clipboard.setString(digitCode);
    // Optionally, you can add feedback to the user (like a toast) to confirm the copy action
  };

  return (
    <View style={styles.container}>
      <View style={styles.qrCodeContainer}>
        <QRCode
          value={code}
          size={200}
          color={colors.primary_color}
          backgroundColor="white"
        />
      </View>
      <Text style={styles.orText}>OR</Text>
      <View style={styles.codeContainer}>
        <Text style={styles.codeText}>{code}</Text>
        <TouchableOpacity style={styles.copyButton} onPress={handleCopyCode}>
          <Icon name="content-copy" size={20} color={colors.primary_color}/>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center', // Center children horizontally
    justifyContent: 'center', // Center children vertically
    padding: 20,
    backgroundColor: '#f6f6f6',
  },
  qrCodeContainer: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 5, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  orText: {
    fontSize: 18,
    marginVertical: 10,
    color: 'grey',
  },
  codeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: colors.primary_color,
    borderRadius: 5,
    padding: 10,
    alignSelf: 'center', // Center the container itself
  },
  codeText: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  copyButton: {
    // backgroundColor: colors.primary_color,
    padding: 5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
