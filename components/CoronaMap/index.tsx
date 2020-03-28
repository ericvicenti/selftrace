import React from 'react';
import { View, ViewStyle, StyleSheet } from 'react-native';
import { withScriptjs } from 'react-google-maps';
import { t } from 'i18n-js';
// import ClusterMarker from './ClusterMarker';
import GoogleMapView from '../GoogleMapView';
import GoogleMapMarker from '../GoogleMapView/Marker';
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
  onRegionChangeComplete?: (regionObj: RegionObject) => void;
  style?: ViewStyle;
}

function CoronaMap({ clusters, isLoading, style, ...rest }: CoronaMapProps) {
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
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 1.822,
          longitudeDelta: 1.821,
        }}
        style={styles.mapView}
        {...rest}>
        {clusters.map(({ data: cluster, key }) => (
          <GoogleMapMarker
            key={key}
            coordinate={{
              latitude: cluster.lat,
              longitude: cluster.lng,
            }}
          />
        ))}
      </GoogleMapView>
    </View>
  );
}

export default withScriptjs<CoronaMapProps>(CoronaMap as any);
