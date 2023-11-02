import React, { useEffect, useState } from 'react';
import { SafeAreaView, View } from 'react-native';
import { FAB } from 'react-native-paper';
import GangList from '../../components/gang/GangList';
import { colors } from '../../theme/colors';
import { fonts } from '../../theme/fonts';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { showToast } from '../../components/ui/Toast';
import { setGangs } from '../../utils/redux/actions/gangActions';
import { realm } from '../../utils/models/relamConfig';
import { fetchData } from '../../utils/api/api';
import Realm from "realm";

const Gangs = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [realmGangs, setRealmGangs] = useState([]);
  const user = useSelector((state) => state.auth.user);

  // Function to fetch gangs from Realm
  const fetchGangsFromRealm = () => {
    return realm.objects('Gang');
  };

  useEffect(() => {
    const gangs = fetchGangsFromRealm();
    setRealmGangs(gangs);

    // Listen for changes
    const listener = (collection, changes) => {
      setRealmGangs([...collection]);
    };
    
    gangs.addListener(listener);

    // Cleanup listener when component unmounts
    return () => {
      gangs.removeListener(listener);
    };
  }, []);

  useEffect(() => {
    const fetchGangs = async () => {
      setLoading(true);
      try {
        const response = await fetchData(`gang/fetchGangs/${user.phone}`);
        if (response.status === 200) {
          realm.write(() => {
            response.gangs.forEach(gang => {
              realm.create('Gang', gang, Realm.UpdateMode.Modified);
            });
          });

          dispatch(setGangs(response.gangs));
        } else {
          showToast('error', 'Oops!', response.info);
        }
      } catch (err) {
        console.error('Error fetching data:', err.message);
        showToast('error', 'Oops!', err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGangs();
  }, [user.phone]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        {/* Use realmGangs instead of gangList */}
        <GangList gangList={realmGangs} />
      </View>

      <FAB.Group
        open={open}
        color="white"
        fabStyle={{ backgroundColor: colors.primary_color }}
        icon={open ? 'close' : 'plus'}
        backdropColor="transparent"
        actions={[
          {
            icon: 'plus',
            color: 'white',
            label: 'Create',
            labelStyle: { fontFamily: fonts.primary },
            style: { backgroundColor: colors.primary_color },
            onPress: () => { return navigation.navigate('Create Gang') },
          },
          {
            icon: 'account-group',
            color: 'white',
            label: 'Join',
            labelStyle: { fontFamily: fonts.primary },
            style: { backgroundColor: colors.primary_color },
            onPress: () => navigation.navigate('Join Gang', {
              user
            }),
          },
        ]}
        onStateChange={({ open }) => setOpen(open)}
      />
    </SafeAreaView>
  );
};

export default Gangs;
