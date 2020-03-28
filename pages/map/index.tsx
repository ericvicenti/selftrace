import * as React from 'react';
// import fetch from 'isomorphic-fetch';
import { NextPageContext } from 'next';
import { StyleSheet, View } from 'react-native';
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
import { Main, Margins, Colors } from '../../styles';

// Need to do this to prevent `ReferenceError: window is not defined`
const CoronaMap = dynamic(() => import('../../components/CoronaMap'), {
  ssr: false,
});

const WARNING_CONTAINER_WIDTH = Main.W_WIDTH - 4 * Margins.WINDOW;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  mapContainer: {
    width: '100%',
    height: '100%',
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

const MIN_EXECUTION_TIME = 1000;

interface State {
  clusters: AnonymListItem<ClusterObject>[];
  isLoading: boolean;
}

interface Props extends ReturnType<typeof mapStateToProps>, ReturnType<typeof mapDispatchToProps> {}

function MapPage({ wellbeing }: Props) {
  const [state, setState] = React.useState<State>({ clusters: [], isLoading: false });

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

    try {
      newClusters = await API.requestClusters(regionObj, true);
      requestEndedAt = Date.now();
    } catch (err) {
      requestEndedAt = Date.now();
    } finally {
      const executionTime = requestEndedAt - requestStartedAt;

      const endRequest = () =>
        setState({
          clusters: newClusters.map(cluster => ({
            key: ReactUtils.generateListKey(),
            data: cluster,
          })),
          isLoading: false,
        });

      if (executionTime < MIN_EXECUTION_TIME) {
        setTimeout(endRequest, MIN_EXECUTION_TIME - executionTime);
      } else {
        endRequest();
      }
    }
  }

  const wellbeingIsDefined = !!wellbeing;
  const GOOGLE_MAP_URL = `https://maps.googleapis.com/maps/api/js?key=${process.env.googleMapsAPIKey}`;

  return (
    <PageContainer isFullScreen>
      {wellbeingIsDefined ? (
        <CoronaMap
          googleMapURL={GOOGLE_MAP_URL}
          loadingElement={<div />}
          clusters={state.clusters}
          isLoading={state.isLoading}
          onRegionChangeComplete={handleRegionChange}
          style={styles.mapContainer}
        />
      ) : (
        <>
          <CoronaMap
            googleMapURL={GOOGLE_MAP_URL}
            loadingElement={<div />}
            clusters={[]}
            isLoading={false}
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
