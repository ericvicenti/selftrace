import React from 'react';
import { View, ViewStyle, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import { withScriptjs } from 'react-google-maps';
import { t } from 'i18n-js';
import ClusterMarker from './ClusterMarker';
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
      <MapView
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        style={styles.mapView}
        {...rest}>
        {clusters.map(({ data: cluster, key }) => (
          <ClusterMarker key={key} cluster={cluster} />
        ))}
      </MapView>
    </View>
  );
}

export default withScriptjs<CoronaMapProps>(CoronaMap as any);
