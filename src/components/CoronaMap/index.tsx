import React from 'react';
import { View, StyleSheet } from 'react-native';
import { GoogleMap, OverlayView, useLoadScript } from '@react-google-maps/api';
import { t } from 'i18n-js';
import Text from '../Text';
import ClusterMarker from './ClusterMarker';
import LoadingIndicator from './LoadingIndicator';
import ClusterDetails from './ClusterDetails';
import { ClusterObject, AnonymListItem } from '../../data-types';
import { useAnimatedBool } from '../../hooks';
import GeoUtils from '../../util/GeoUtils';
import { Margins, Paddings } from '../../styles';

const SAN_FRAN_COORDS: Geo.LocationShort = {
  lat: 37.7749,
  lng: -122.4194,
};

const styles = StyleSheet.create({
  loadErrorContainer: {
    backgroundColor: 'pink',
    flex: 1,
    paddingTop: Paddings.MAX_Y,
    paddingBottom: Paddings.MAX_Y,
  },
  loadErrorText: {
    fontWeight: '500',
    fontSize: 16,
  },
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
  center?: Geo.LocationShort;
  zoom?: number;
  clusters: AnonymListItem<ClusterObject>[];
  isLoading: boolean;
  onRegionChangeComplete?: (params: { region: Geo.Region; zoom: number }) => void;
  style?: any;
}

interface InfoBoxState {
  isVisible: boolean;
  cluster: Partial<AnonymListItem<ClusterObject>>;
}

function CoronaMap({
  center = SAN_FRAN_COORDS,
  zoom = 8,
  clusters,
  isLoading,
  onRegionChangeComplete,
  style,
}: CoronaMapProps) {
  const [clusterDetails, setClusterDetails] = React.useState<InfoBoxState>({
    isVisible: false,
    cluster: {},
  });
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.googleMapsAPIKey,
  });

  const googleMapRef = React.useRef<google.maps.Map | null>(null);
  const isLoadingAnim = useAnimatedBool(isLoading, IS_LOADING_ANIM_DURATION);
  const clusterDetailsScale = useAnimatedBool(
    clusterDetails.isVisible,
    CLUSTER_DETAILS_ANIM_DURATION
  );

  function handleRegionChange() {
    setClusterDetails({ isVisible: false, cluster: {} });

    if (googleMapRef.current) {
      const region = GeoUtils.getRegionFromGoogleMap(googleMapRef.current);
      const newZoom = GeoUtils.getZoomFromGoogleMap(googleMapRef.current);

      if (region && onRegionChangeComplete) {
        onRegionChangeComplete({ region, zoom: newZoom });
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

  function onClusterDetailsClose() {
    setClusterDetails(prev => {
      return { isVisible: false, cluster: {} };
    })
  }

  if (loadError) {
    return (
      <View style={styles.loadErrorContainer}>
        {/* TODO: Localize */}
        <Text style={styles.loadErrorText}>Error: Map cannot be loaded at this time.</Text>
      </View>
    );
  }

  if (isLoaded) {
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
          onClose={onClusterDetailsClose}
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
          center={center}
          zoom={zoom}
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
              <ClusterMarker
                isSelected={cluster.key === clusterDetails.cluster.key}
                cluster={cluster}
                onPress={onPressCluster}
              />
            </OverlayView>
          ))}
        </GoogleMap>
      </View>
    );
  }

  return <View style={{ flex: 1 }} />;
}

export default React.memo(CoronaMap);
