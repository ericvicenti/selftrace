import { AsyncStorage } from 'react-native';
import { Dispatch } from '.';
import { receiveUpdateUserInfoResponse, clearUpdateUserInfoProgress } from './auth/userInfo';

export async function pullUserInfoFromLocalDBToRedux(dispatch: Dispatch) {
  try {
    const [wellbeingRaw, symptomMapRaw] = await Promise.all([
      AsyncStorage.getItem('wellbeing'),
      AsyncStorage.getItem('symptomMap'),
    ]);

    dispatch(
      receiveUpdateUserInfoResponse({
        wellbeing: wellbeingRaw === null ? undefined : Number(wellbeingRaw),
        symptomMap: symptomMapRaw === null ? {} : JSON.parse(symptomMapRaw),
      })
    );
    dispatch(clearUpdateUserInfoProgress());
  } catch (err) {
    //
  }
}
