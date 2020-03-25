import * as React from 'react';
// import fetch from 'isomorphic-fetch';
import { NextPageContext } from 'next';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BlurView } from 'expo-blur';
import { t } from 'i18n-js';
import Text from '../../components/Text';
import TabNavigator from '../../components/TabNavigator';
import CoronaMap from '../../components/CoronaMap';
import Icon from '../../components/Icon';
import * as API from '../../api';
import { Dispatch, Action } from '../../actions';
import { ReduxRoot } from '../../reducers';
import ReactUtils from '../../util/ReactUtils';
import { ClusterObject, RegionObject, AnonymListItem } from '../../data-types';
import { Main, Margins, Colors } from '../../styles';

const WARNING_CONTAINER_WIDTH = Main.W_WIDTH - 4 * Margins.WINDOW;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapContainer: {
    flex: 1,
    width: '100%',
    height: 600,
  },
  warningContainer: {
    backgroundColor: Colors.PRIMARY.toString(),
    borderRadius: 10,
    width: WARNING_CONTAINER_WIDTH,
    padding: 15,
    marginHorizontal: Margins.WINDOW,
    shadowColor: Colors.PRIMARY.lighten(20),
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
    marginTop: Margins.MIN_Y,
    color: 'white',
  },
  warningMessage: {
    alignSelf: 'center',
    marginTop: Margins.MIN_Y,
    color: 'white',
    textAlign: 'center',
  },
});

const mapStateToProps = (state: ReduxRoot) => ({
  wellbeing: state.auth.userInfo.wellbeing,
  progress: state.auth.userInfo.progress,
  authStatus: state.auth.status,
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => bindActionCreators({}, dispatch);

interface State {
  clusters: AnonymListItem<ClusterObject>[];
  isLoading: boolean;
}

interface Props extends ReturnType<typeof mapStateToProps>, ReturnType<typeof mapDispatchToProps> {
  pathname: string;
}

function MapPage({ wellbeing, pathname }: Props) {
  const [state, setState] = React.useState<State>({ clusters: [], isLoading: false });

  async function handleRegionChange(regionObj: RegionObject) {
    setState(prevState => ({ ...prevState, isLoading: true }));
    try {
      const receivedClusters = await API.requestClusters(regionObj, true);
      setState({
        clusters: receivedClusters.map(cluster => ({
          key: ReactUtils.generateListKey(),
          data: cluster,
        })),
        isLoading: false,
      });
    } catch (err) {
      setState(prevState => ({ ...prevState, isLoading: false }));
    }
  }

  const wellbeingIsDefined = !!wellbeing;
  const GOOGLE_MAP_URL = `https://maps.googleapis.com/maps/api/js?key=${process.env.googleMapsAPIKey}`;

  return (
    <>
      <TabNavigator pathname={pathname} />
      <View style={styles.container}>
        {wellbeingIsDefined ? (
          <CoronaMap
            googleMapURL={GOOGLE_MAP_URL}
            loadingElement={<div />}
            clusters={state.clusters}
            onRegionChangeComplete={handleRegionChange}
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
                <Icon.Lock color="white" style={styles.lockIcon} />
                <Text style={styles.warningTitle}>{t('screens.map.chooseWellbeingTitle')}</Text>
                <Text style={styles.warningMessage}>{t('screens.map.chooseWellbeingMessage')}</Text>
              </View>
            </BlurView>
          </>
        )}
      </View>
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
    pathname: ctx.pathname,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MapPage);
