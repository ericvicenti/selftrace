import React from 'react';
import { View, StyleSheet } from 'react-native';
import { withGoogleMap, GoogleMap } from 'react-google-maps';

const GoogleMapContainer = withGoogleMap((props: any) => (
  <GoogleMap {...props} ref={props.handleMapMounted} />
));

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
});

type Props = any;

export default function GoogleMapView({
  region,
  initialRegion,
  onRegionChange,
  onPress,
  options,
  style,
  onMapReady,
  onRegionChangeComplete,
  children,
}: Props) {
  const [center] = React.useState(null);
  const mapRef = React.useRef(null);

  function handleMapMounted(map: any) {
    mapRef.current = map;
    if (onMapReady) {
      onMapReady();
    }
  }

  function onIdle() {
    if (mapRef.current && onRegionChangeComplete) {
      const newCenter = mapRef.current.getCenter();
      const bounds = mapRef.current.getBounds();
      let latitudeDelta: number;
      let longitudeDelta: number;

      if (bounds) {
        const ne = bounds.getNorthEast();
        const sw = bounds.getSouthWest();
        latitudeDelta = ne.lat() - sw.lat();
        longitudeDelta = ne.lng() - sw.lng();
      }

      onRegionChangeComplete({
        latitude: newCenter.lat(),
        longitude: newCenter.lng(),
        latitudeDelta,
        longitudeDelta,
      });
    }
  }

  const centerProps = region
    ? {
        center: {
          lat: region.latitude,
          lng: region.longitude,
        },
      }
    : center
    ? { center }
    : {
        defaultCenter: {
          lat: initialRegion.latitude,
          lng: initialRegion.longitude,
        },
      };

  return (
    <View style={style || styles.container}>
      <GoogleMapContainer
        handleMapMounted={handleMapMounted}
        containerElement={<div style={{ height: '100%' }} />}
        mapElement={<div style={{ height: '100%' }} />}
        {...centerProps}
        onDragStart={onRegionChange}
        onIdle={onIdle}
        defaultZoom={15}
        onClick={onPress}
        options={options}>
        {children}
      </GoogleMapContainer>
    </View>
  );
}
