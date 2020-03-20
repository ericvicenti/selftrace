import React from 'react';
import MapView from 'react-native-maps';
import { withScriptjs } from 'react-google-maps';
import ClusterMarker from './ClusterMarker';
import { ClusterObject, RegionObject, AnonymListItem } from '../../data-types';

interface CoronaMapProps {
  clusters: AnonymListItem<ClusterObject>[];
  pitchEnabled?: boolean;
  rotateEnabled?: boolean;
  scrollEnabled?: boolean;
  zoomEnabled?: boolean;
  onRegionChangeComplete?: (regionObj: RegionObject) => void;
  style?: any;
}

function CoronaMap({ clusters, ...rest }: CoronaMapProps) {
  return (
    <MapView
      initialRegion={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      {...rest}>
      {clusters.map(({ data: cluster, key }) => {
        return <ClusterMarker key={key} cluster={cluster} />;
      })}
    </MapView>
  );
}

export default withScriptjs<CoronaMapProps>(CoronaMap as any);
