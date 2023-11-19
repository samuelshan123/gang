import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Avatar, List, Button, Title, Switch } from 'react-native-paper';
import { fonts } from '../../../theme/fonts';
import { colors } from '../../../theme/colors';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';


function GangInfo({ route }) {
  const gangInfo = route.params.gang;
  const navigation = useNavigation();

  const [isMuted, setIsMuted] = useState(false);
  const [viewAllMembers, setViewAllMembers] = useState(false);

  const handleToggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleExitGroup = () => {
    console.log('Exiting Group...');
    // Implement group exit logic here
    navigation.navigate('Home') 

  };

  const getQrCodeOrCode = () => {
    navigation.navigate('Gang Code',{gang_id: gangInfo.gang_id})
  };


  const handleViewAll = () => {
    setViewAllMembers(!viewAllMembers);
  };

  const displayedMembers = viewAllMembers
    ? gangInfo.members
    : gangInfo.members.slice(0, 10);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Avatar.Text
          size={64}
          label={gangInfo.gang_name.charAt(0)}
          style={styles.avatar}
        />
        <Title style={styles.title}>{gangInfo.gang_name}</Title>
        <Button icon="pencil" mode="text">
          Edit
        </Button>
      </View>

      <List.Section style={styles.listSection}>
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionHead}>Description</Text>
          <Text style={styles.description}>{gangInfo.description}</Text>
        </View>
      </List.Section>

      <List.Section style={styles.listSection}>
        <List.Subheader style={{ fontFamily: fonts.primary, color: colors.primary_color }}>
          Members
        </List.Subheader>
        {displayedMembers.map(member => (
          <View key={member.phone} style={styles.listItemContainer}>
            <List.Item
              style={styles.listItem}
              title={member.name}
              left={() => <Avatar.Text size={35} label={member.name.charAt(0)} />}
            />
            {member.role ==='admin' && (
              <Text style={styles.adminLabel}>Admin</Text>
            )}
          </View>
        ))}
        {gangInfo.members.length > 10 && !viewAllMembers && (
          <TouchableOpacity
            onPress={handleViewAll}
            style={styles.viewAllButton}>
            <Text style={styles.viewAllButtonText}>View all ({gangInfo.members.length - 10} more)</Text>
          </TouchableOpacity>
        )}
      </List.Section>

      <List.Section style={styles.listSection}>
        <List.Item
          title="Mute notifications"
          right={() => (
            <Switch value={isMuted} onValueChange={handleToggleMute} />
          )}
        />

        <List.Item
          title="Join code or QR"
          right={() => (
            <Icon name="qrcode" onPress={getQrCodeOrCode} size={24} color={colors.primary_color} />
          )}
        />
       

      <List.Item
          title="Clear chats"
          right={() => (
            <Icon name="delete" size={24} color={colors.primary_color} />
          )}
        />
       
      </List.Section>

      <List.Section style={styles.listSection}>

        <List.Item
          title="Exit gang"
          titleStyle={{color:'red'}}
          right={() => (
            <Icon name="logout" onPress={handleExitGroup} size={24} color="red" />
          )}
        />
      </List.Section>


      {/* Additional sections like Media, Docs, Links, etc. can be added here */}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f6f6f6',
  },
  viewAllButton: {
    alignItems: 'center',
    paddingBottom: 10,
  },
  viewAllButtonText: {
    fontFamily: fonts.primary,
    color: colors.primary_color,
  },
  descriptionContainer: {
    marginVertical: 10,
    marginHorizontal: 20,
  },
  description: {
    fontFamily: fonts.primary,
  },
  descriptionHead: {
    fontFamily: fonts.primary,
    color: colors.primary_color,
  },
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  avatar: {
    marginBottom: 8,
    color: 'white',
  },
  title: {
    fontFamily: fonts.primary,
    marginBottom: 8,
  },
  listItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  listItem: {
    flex: 1,
  },
  adminLabel: {
    fontFamily: fonts.primary,
    color: colors.primary_color,
    fontSize: 12,
    position: 'absolute',
    top: 10,
    right: 20,
  },
  listSection: {
    backgroundColor: 'white',
    marginHorizontal:5
  },
});

export default GangInfo;
