import React, {useEffect, useState} from 'react';
import {SafeAreaView, View} from 'react-native';
import {FAB} from 'react-native-paper';
import GangList from '../../components/gang/GangList';
import {GangListData} from '../../utils/datas/GangDatas';
import {colors} from '../../theme/colors';
import { fonts } from '../../theme/fonts';
import {useNavigation} from '@react-navigation/native';
import { fetchData } from '../../utils/api/api';
import { useDispatch, useSelector } from 'react-redux';
import { showToast } from '../../components/ui/Toast';
import { setGangs } from '../../utils/redux/actions/gangActions';

const Gangs = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [gangList, setGangList] = useState([]);
  const user = useSelector((state) => state.auth.user);


  useEffect(() => {
    const fetchGangs = async () => {
      setLoading(true);
      try {
        const response = await fetchData(`gang/fetchGangs/${user.phone}`); // Assuming you only need to pass the phone number
        if (response.status === 200) {
          // console.log(response);
          setGangList(response.gangs);
          dispatch(setGangs(response.gangs))
        } else {
          showToast('error', 'Oops!', response.info);
        }
      } catch (err) {
        console.error('Error posting data:', err.message);
        showToast('error', 'Oops!', err.message);
      } finally {
        setLoading(false); // Ensure loading is set to false in all cases
      }
    };

     fetchGangs();
  }, [user.phone]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        <GangList gangList={gangList} />
      </View>

      <FAB.Group
        open={open}
        color="white"
        fabStyle={{backgroundColor: colors.primary_color}}
        icon={open ? 'close' : 'plus'}
        backdropColor="transparent"
        actions={[
          {
            icon: 'plus',
            color: 'white',
            label: 'Create',
            labelStyle:{fontFamily:fonts.primary},
            style: { backgroundColor: colors.primary_color},
            onPress: () => {return navigation.navigate('Create Gang')},
          },
          {
            icon: 'account-group',
            color: 'white',
            label: 'Join',
            labelStyle:{fontFamily:fonts.primary},
            style: { backgroundColor: colors.primary_color},
            onPress: () => navigation.navigate('Join Gang',{
              phone:user.phone
            }),
          },
        ]}
        onStateChange={({open}) => setOpen(open)}
      />
    </SafeAreaView>
  );
};

export default Gangs;
