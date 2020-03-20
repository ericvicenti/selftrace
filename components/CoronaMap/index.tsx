import React from 'react';
import MapView, { Marker, MapViewProps } from 'react-native-maps';
import { withScriptjs } from 'react-google-maps';
// import ClusterMarker from './ClusterMarker';
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
      // region={{ latitude: 0, longitude: 0, latitudeDelta: 150, longitudeDelta: 150 }}
      // region={{ latitude: 0, longitude: 0, latitudeDelta: , longitudeDelta: 50 }}
      initialRegion={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      minZoomLevel={9}
      {...rest}>
      {clusters.map(({ data: cluster, key }) => {
        // return <ClusterMarker key={key} cluster={cluster} />;
        return <Marker key={key} coordinate={{ latitude: cluster.lat, longitude: cluster.lng }} />;
      })}
    </MapView>
  );
}

export default withScriptjs<CoronaMapProps>(CoronaMap as any);
