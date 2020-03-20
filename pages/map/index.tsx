import * as React from 'react';
// import fetch from 'isomorphic-fetch';
import { NextPageContext } from 'next';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { BlurView } from 'expo-blur';
import Router from 'next/router';
import { t } from 'i18n-js';
import EmailInput from '../../components/TextInput/Email';
import Text from '../../components/Text';
import SubmitButton from '../../components/SubmitButton';
import BottomTab from '../../components/BottomTab';
import CoronaMap from '../../components/CoronaMap';
import Icon from '../../components/Icon';
import * as API from '../../api';
import { ReduxRoot } from '../../reducers';
import ReactUtils from '../../util/ReactUtils';
import { ClusterObject, RegionObject, AnonymListItem, AuthStatus } from '../../data-types';
import { W_WIDTH, MIN_MARGIN_Y, W_MARGIN } from '../../styles';
import { PRIMARY_COLOR } from '../../styles/colors';

const WARNING_CONTAINER_WIDTH = W_WIDTH - 4 * W_MARGIN;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapContainer: {
    flex: 1,
    width: '100%',
    height: 400,
    backgroundColor: 'pink',
  },
  warningContainer: {
    backgroundColor: PRIMARY_COLOR.toString(),
    borderRadius: 10,
    width: WARNING_CONTAINER_WIDTH,
    padding: 15,
    marginHorizontal: W_MARGIN,
    shadowColor: PRIMARY_COLOR.lighten(20),
    shadowRadius: 20,
    shadowOpacity: 0.8,
    shadowOffset: {
      height: 0,
      width: 0,
    },
  },
  lockIcon: {
    alignSelf: 'center',
  },
  warningTitle: {
    alignSelf: 'center',
    fontSize: 15,
    fontWeight: '700',
    marginTop: MIN_MARGIN_Y,
    color: 'white',
  },
  warningMessage: {
    alignSelf: 'center',
    marginTop: MIN_MARGIN_Y,
    color: 'white',
    textAlign: 'center',
  },
});

const mapStateToProps = (state: ReduxRoot) => ({
  wellbeing: state.auth.userInfo.wellbeing,
  progress: state.auth.userInfo.progress,
  authStatus: state.auth.status,
});

interface State {
  clusters: AnonymListItem<ClusterObject>[];
  isLoading: boolean;
}

interface Props extends ReturnType<typeof mapStateToProps> {}

function MapPage({ wellbeing, authStatus }: Props) {
  const [state, setState] = React.useState<State>({ clusters: [], isLoading: false });

  //   async function handleRegionChange(regionObj: RegionObject) {
  //     setState(prevState => ({ ...prevState, isLoading: true }));
  //     try {
  //       const receivedClusters = await API.requestClusters(regionObj, true);
  //       setState({
  //         clusters: receivedClusters.map(cluster => ({
  //           key: ReactUtils.generateListKey(),
  //           data: cluster,
  //         })),
  //         isLoading: false,
  //       });
  //     } catch (err) {
  //       setState(prevState => ({ ...prevState, isLoading: false }));
  //     }
  //   }

  //   if (authStatus !== AuthStatus.SignedIn) {
  //     Router.push('/');
  //     return null;
  //   }

  //   const wellbeingIsDefined = !!wellbeing;
  const wellbeingIsDefined = true;
  const GOOGLE_MAP_URL = '';

  return (
    <>
      <View style={styles.container}>
        {wellbeingIsDefined ? (
          <CoronaMap
            googleMapURL={GOOGLE_MAP_URL}
            loadingElement={<div />}
            clusters={state.clusters}
            // onRegionChangeComplete={handleRegionChange}ƒ
            style={styles.mapContainer}
          />
        ) : (
          <>
            <CoronaMap
              googleMapURL={GOOGLE_MAP_URL}
              loadingElement={<div />}
              clusters={state.clusters}
              pitchEnabled={false}
              rotateEnabled={false}
              scrollEnabled={false}
              zoomEnabled={false}
              style={styles.mapContainer}
            />
            <BlurView
              tint="dark"
              intensity={75}
              style={[StyleSheet.absoluteFill, { justifyContent: 'center', alignItems: 'center' }]}>
              <View style={styles.warningContainer}>
                <Icon name="lock" color="white" style={styles.lockIcon} />
                <Text style={styles.warningTitle}>{t('screens.map.chooseWellbeingTitle')}</Text>
                <Text style={styles.warningMessage}>{t('screens.map.chooseWellbeingMessage')}</Text>
              </View>
            </BlurView>
          </>
        )}
      </View>
      <BottomTab />
    </>
  );
}

MapPage.getInitialProps = async (ctx: NextPageContext) => {
  // do async stuff here to load data
  // ctx.query is the ?params
  // eg:
  // let url = getApiUrl(urlWithQuery('/libraries', ctx.query), ctx);
  // let response = await fetch(url);
  // let result = await response.json();

  return {
    // data: result,
    // query: ctx.query,
  };
};

export default connect(mapStateToProps, {})(MapPage);
