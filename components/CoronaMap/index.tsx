import React from 'react';
import { View, ViewStyle, StyleSheet } from 'react-native';
import { withScriptjs } from 'react-google-maps';
import { t } from 'i18n-js';
// import ClusterMarker from './ClusterMarker';
import GoogleMapView from '../GoogleMapView';
import LoadingIndicator from './LoadingIndicator';
import { ClusterObject, RegionObject, AnonymListItem } from '../../data-types';
import { useAnimatedBool } from '../../hooks';
import { Margins } from '../../styles';

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
  clusters: AnonymListItem<ClusterObject>[];
  isLoading?: boolean;
  pitchEnabled?: boolean;
  rotateEnabled?: boolean;
  scrollEnabled?: boolean;
  zoomEnabled?: boolean;
  onRegionChangeComplete?: (regionObj: RegionObject | undefined) => void;
  style?: ViewStyle;
}

function CoronaMap({
  clusters,
  isLoading,
  onRegionChangeComplete,
  style,
  ...rest
}: CoronaMapProps) {
  const isLoadingAnim = useAnimatedBool(isLoading, 200);

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
      <GoogleMapView
        markers={clusters.map(cluster => ({
          key: cluster.key,
          coords: { latitude: cluster.data.lat, longitude: cluster.data.lng },
        }))}
        style={styles.mapView}
        onRegionChangeComplete={onRegionChangeComplete}
        {...rest}
      />
    </View>
  );
}

export default withScriptjs<CoronaMapProps>(CoronaMap as any);
