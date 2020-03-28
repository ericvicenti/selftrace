import React from 'react';
import { View, StyleSheet } from 'react-native';
import { withScriptjs } from 'react-google-maps';
import { GoogleMap, OverlayView } from '@react-google-maps/api';
import { t } from 'i18n-js';
import LoadingIndicator from './LoadingIndicator';
import ClusterMarker from './ClusterMarker';
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
    zIndex: 1,
    position: 'absolute',
    top: Margins.MAX_Y,
    alignSelf: 'center',
  },
});

interface CoronaMapProps {
  center?: { lat: number; lng: number };
  clusters: AnonymListItem<ClusterObject>[];
  isLoading: boolean;
  onRegionChangeComplete?: (regionObj: RegionObject) => void;
  style?: any;
}

function CoronaMap({ center, clusters, isLoading, onRegionChangeComplete, style }: CoronaMapProps) {
  const googleMapRef = React.useRef(null);
  const isLoadingAnim = useAnimatedBool(isLoading, 200);

  function handleRegionChange() {
    if (googleMapRef.current) {
      const regionObj = GeoUtils.getRegionFromGoogleMap(googleMapRef.current);
      if (regionObj) {
        onRegionChangeComplete(regionObj);
      }
    }
  }

  return (
    <View style={[styles.container, style]}>
      <LoadingIndicator
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
      <GoogleMap
        zoom={8}
        center={center || SAN_FRAN_COORDS}
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
            mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
            <ClusterMarker cluster={cluster.data} />
          </OverlayView>
        ))}
      </GoogleMap>
    </View>
  );
}

export default withScriptjs<CoronaMapProps>(CoronaMap as any);
