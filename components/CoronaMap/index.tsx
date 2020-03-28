import React from 'react';
import { View, StyleSheet } from 'react-native';
import { withScriptjs } from 'react-google-maps';
import { GoogleMap, OverlayView } from '@react-google-maps/api';
import { t } from 'i18n-js';
import ClusterMarker from './ClusterMarker';
import LoadingIndicator from './LoadingIndicator';
import ClusterDetails from './ClusterDetails';
import { ClusterObject, RegionObject, AnonymListItem } from '../../data-types';
import { useAnimatedBool } from '../../hooks';
import GeoUtils from '../../util/GeoUtils';
import { Margins } from '../../styles';

const SAN_FRAN_COORDS = {
  lat: 37.7749,
  lng: -122.4194,
};

const styles = StyleSheet.create({
  container: {},
  mapView: {
    flex: 1,
  },
  loadingIndicator: {
    zIndex: 2,
    position: 'absolute',
    top: Margins.MAX_Y,
    alignSelf: 'center',
  },
  clusterDetails: {
    zIndex: 1,
    position: 'absolute',
    alignSelf: 'center',
  },
});

const IS_LOADING_ANIM_DURATION = 200;
const CLUSTER_DETAILS_ANIM_DURATION = 100;

interface CoronaMapProps {
  center?: { lat: number; lng: number };
  clusters: AnonymListItem<ClusterObject>[];
  isLoading: boolean;
  onRegionChangeComplete?: (regionObj: RegionObject) => void;
  style?: any;
}

interface InfoBoxState {
  isVisible: boolean;
  cluster: Partial<AnonymListItem<ClusterObject>>;
}

function CoronaMap({
  center = SAN_FRAN_COORDS,
  clusters,
  isLoading,
  onRegionChangeComplete,
  style,
}: CoronaMapProps) {
  const [clusterDetails, setClusterDetails] = React.useState<InfoBoxState>({
    isVisible: false,
    cluster: {},
  });
  const googleMapRef = React.useRef(null);
  const isLoadingAnim = useAnimatedBool(isLoading, IS_LOADING_ANIM_DURATION);
  const clusterDetailsScale = useAnimatedBool(
    clusterDetails.isVisible,
    CLUSTER_DETAILS_ANIM_DURATION
  );

  function handleRegionChange() {
    setClusterDetails({ isVisible: false, cluster: {} });

    if (googleMapRef.current) {
      const regionObj = GeoUtils.getRegionFromGoogleMap(googleMapRef.current);
      if (regionObj && onRegionChangeComplete) {
        onRegionChangeComplete(regionObj);
      }
    }
  }

  function onPressCluster(cluster: AnonymListItem<ClusterObject>) {
    setClusterDetails(prev => {
      // Case 1: Pressing a new/different cluster
      if (!prev.cluster || prev.cluster.key !== cluster.key) {
        return { isVisible: true, cluster };
      }
      // Case 2: Pressing currently selected cluster
      return { isVisible: false, cluster: {} };
    });
  }

  return (
    <View style={[styles.container, style]}>
      <LoadingIndicator
        delayTime={IS_LOADING_ANIM_DURATION}
        isVisible={isLoading}
        message={t('screens.map.loadingMessage')}
        style={[
          styles.loadingIndicator,
          {
            opacity: isLoadingAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1],
            }),
          },
        ]}
      />
      <ClusterDetails
        delayTime={CLUSTER_DETAILS_ANIM_DURATION}
        isVisible={clusterDetails.isVisible}
        duration={CLUSTER_DETAILS_ANIM_DURATION}
        cluster={clusterDetails.cluster}
        style={[
          styles.clusterDetails,
          {
            opacity: clusterDetailsScale.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 1],
            }),
            top: clusterDetailsScale.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 50 + Margins.MIN_Y],
            }),
          },
        ]}
      />
      <GoogleMap
        zoom={8}
        center={center}
        onLoad={map => {
          googleMapRef.current = map;
          setTimeout(handleRegionChange, 500);
        }}
        mapContainerStyle={{
          height: '100%',
          width: '100%',
        }}
        onDragEnd={handleRegionChange}
        onZoomChanged={handleRegionChange}>
        {clusters.map(cluster => (
          <OverlayView
            key={cluster.key}
            position={{
              lat: cluster.data.lat,
              lng: cluster.data.lng,
            }}
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            getPixelPositionOffset={(width, height) => ({
              x: -(width / 2),
              y: -(height / 2),
            })}>
            <ClusterMarker cluster={cluster} onPress={onPressCluster} />
          </OverlayView>
        ))}
      </GoogleMap>
    </View>
  );
}

export default withScriptjs<CoronaMapProps>(CoronaMap as any);
