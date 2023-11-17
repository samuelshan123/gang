import React, {useState} from 'react';
import {ScrollView, View, StyleSheet, TouchableOpacity} from 'react-native';
import {Avatar, List, Button, Title, Switch} from 'react-native-paper';
import {fonts} from '../../../theme/fonts';
import { Text } from 'react-native';
import { colors } from '../../../theme/colors';

function GangInfo({route}) {
  const gangInfo = route.params.gang;
  const [isMuted, setIsMuted] = useState(false);
  const [viewAllMembers, setViewAllMembers] = useState(false);

  const handleToggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleExitGroup = () => {
    console.log('Exiting Group...');
    // Implement group exit logic here
  };

  const handleViewAll = () => {
    setViewAllMembers(!viewAllMembers);
  };

  const displayedMembers = viewAllMembers
    ? gangInfo.members
    : gangInfo.members.slice(0,10);

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
        <List.Subheader style={{fontFamily: fonts.primary,color:colors.primary_color}}>
          Members
        </List.Subheader>
        {displayedMembers.map(member => (
          <List.Item
            style={styles.listItem}
            key={member.phone}
            title={member.name}
            left={() => <Avatar.Text size={35} label={member.name.charAt(0)} />}
          />
        ))}
        {gangInfo.members.length > 10 && !viewAllMembers && (
          <TouchableOpacity
            onPress={handleViewAll}
            style={styles.viewAllButton}>
            <Text style={styles.viewAllButtonText}>View all ({gangInfo.members.length-10} more)</Text>
          </TouchableOpacity>
        )}
      </List.Section>

      <List.Section style={styles.listSection}>
        <List.Item
          title="Mute Notifications"
          right={() => (
            <Switch value={isMuted} onValueChange={handleToggleMute} />
          )}
        />
        <List.Item
          title="Exit Group"
          right={() => (
            <Button mode="text" onPress={handleExitGroup}>
              Exit
            </Button>
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
    alignItems: 'center', // Centers content horizontally in the button
    paddingBottom:10
  },
  viewAllButtonText: {
    fontFamily: fonts.primary,
    color: colors.primary_color
  },
  descriptionContainer:{
    fontFamily:fonts.primary,
    marginVertical:10,
    marginHorizontal:20
  },
  description:{
    fontFamily:fonts.primary,
  },

  descriptionHead:{
    fontFamily:fonts.primary,
    color:colors.primary_color
  },
  header: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    fontFamily: fonts.primary,
  },
  avatar: {
    marginBottom: 8,
    fontFamily: fonts.primary,
    color: 'white',
  },
  title: {
    fontFamily: fonts.primary,
    marginBottom: 8,
  },
  listItem: {
    paddingHorizontal: 20,
    fontFamily: fonts.primary,
  },
  listSection: {
    backgroundColor: 'white',
    fontFamily: fonts.primary,
  },
});

export default GangInfo;
