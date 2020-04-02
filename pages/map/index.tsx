import * as React from 'react';
// import fetch from 'isomorphic-fetch';
import { NextPageContext } from 'next';
import { StyleSheet, View, AsyncStorage } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BlurView } from 'expo-blur';
import { t } from 'i18n-js';
import dynamic from 'next/dynamic';
import Text from '../../components/Text';
import PageContainer from '../../components/PageContainer';
import Icon from '../../components/Icon';
import * as API from '../../api';
import { Dispatch, Action } from '../../actions';
import { ReduxRoot } from '../../reducers';
import ReactUtils from '../../util/ReactUtils';
import { ClusterObject, RegionObject, AnonymListItem } from '../../data-types';
import { Main, Margins, Colors, Paddings } from '../../styles';

// Need to do this to prevent `ReferenceError: window is not defined`
const CoronaMap = dynamic(() => import('../../components/CoronaMap'), {
  ssr: false,
});

const WARNING_CONTAINER_WIDTH = Main.W_WIDTH - 4 * Margins.WINDOW;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    width: '100%',
    height: Main.W_HEIGHT - 45, // TODO: Map doesn't render on mobile without absolute height. Find the right fix or a workaround.
  },
  warningContainer: {
    backgroundColor: Colors.PRIMARY.toString(),
    borderRadius: 10,
    maxWidth: WARNING_CONTAINER_WIDTH,
    paddingVertical: Paddings.MAX_Y,
    paddingHorizontal: Paddings.MAX_X,
    marginHorizontal: Margins.WINDOW,
    shadowColor: Colors.PRIMARY.lighten(20),
    shadowOffset: {
      height: 0,
      width: 0,
    },
    shadowOpacity: 0.8,
    shadowRadius: 20,
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
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => bindActionCreators({}, dispatch);

const MIN_EXECUTION_TIME = 1000;

interface State {
  clusters: AnonymListItem<ClusterObject>[];
  isLoading: boolean;
  lastMapCenter: { lat: number; lng: number } | undefined;
}

interface Props extends ReturnType<typeof mapStateToProps>, ReturnType<typeof mapDispatchToProps> {}

function MapPage({ wellbeing }: Props) {
  const [state, setState] = React.useState<State>({
    clusters: [],
    isLoading: false,
    lastMapCenter: undefined,
  });

  React.useEffect(() => {
    (async function loadLastMapCenter() {
      const lastMapCenterRaw = await AsyncStorage.getItem('lastMapCenter');
      if (lastMapCenterRaw) {
        setState(prev => ({ ...prev, lastMapCenter: JSON.parse(lastMapCenterRaw) }));
      }
    })();
  }, []);

  // TODO: The "delaying" logic should probably lie outside of the component
  async function handleRegionChange(regionObj: RegionObject) {
    const requestStartedAt = Date.now();
    let requestEndedAt = requestStartedAt;
    setState(prevState => ({
      ...prevState,
      clusters: [],
      isLoading: true,
    }));
    let newClusters: ClusterObject[] = [];
    const center = {
      lat: regionObj.latitude,
      lng: regionObj.longitude,
    };

    try {
      [, newClusters] = await Promise.all([
        AsyncStorage.setItem('lastMapCenter', JSON.stringify(center)),
        API.requestClusters(regionObj),
      ]);
      requestEndedAt = Date.now();
    } catch (err) {
      requestEndedAt = Date.now();
    } finally {
      const executionTime = requestEndedAt - requestStartedAt;

      const endRequest = () =>
        setState(prev => ({
          ...prev,
          clusters: newClusters.map(cluster => ({
            key: ReactUtils.generateListKey(),
            data: cluster,
          })),
          isLoading: false,
        }));

      if (executionTime < MIN_EXECUTION_TIME) {
        setTimeout(endRequest, MIN_EXECUTION_TIME - executionTime);
      } else {
        endRequest();
      }
    }
  }

  const wellbeingIsDefined = !!wellbeing;

  return (
    <PageContainer isFullScreen isProtected>
      {wellbeingIsDefined ? (
        <CoronaMap
          center={state.lastMapCenter}
          clusters={state.clusters}
          isLoading={state.isLoading}
          onRegionChangeComplete={handleRegionChange}
          style={styles.mapContainer}
        />
      ) : (
        <>
          <CoronaMap clusters={[]} isLoading={false} style={styles.mapContainer} />
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
    </PageContainer>
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
