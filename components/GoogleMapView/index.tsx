import React from 'react';
import { View } from 'react-native';
import { GoogleMap, GoogleMapProps, OverlayView } from '@react-google-maps/api';
import { Location, RegionObject } from '../../data-types';
import GeoUtils from '../../util/GeoUtils';

const mapContainerBaseStyle = {
  height: '100%',
  width: '100%',
};

const SAN_FRAN_COORDS = {
  lat: 37.7749,
  lng: -122.4194,
};

interface Props extends GoogleMapProps {
  markers: {
    key: string;
    coords: Location;
  }[];
  style: any;
  onRegionChangeComplete: (region: RegionObject | undefined) => void;
}

const GoogleMapView = ({
  markers,
  mapContainerStyle,
  center,
  onRegionChangeComplete,
  ...rest
}: Props) => {
  const googleMapRef = React.useRef(null);

  function handleRegionChange() {
    if (googleMapRef.current) {
      const regionObj = GeoUtils.getRegionFromGoogleMap(googleMapRef.current);
      onRegionChangeComplete(regionObj);
    }
  }

  return (
    <GoogleMap
      id="circle-example"
      zoom={8}
      center={center || SAN_FRAN_COORDS}
      onLoad={map => {
        googleMapRef.current = map;
        setTimeout(handleRegionChange, 500);
      }}
      mapContainerStyle={{ ...mapContainerBaseStyle, ...mapContainerStyle }}
      onDragEnd={handleRegionChange}
      onZoomChanged={handleRegionChange}
      {...rest}>
      {markers.map(marker => (
        <OverlayView
          key={marker.key}
          position={{ lat: marker.coords.latitude, lng: marker.coords.longitude }}
          mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
          <View
            style={{
              backgroundColor: 'pink',
              height: 50,
              width: 50,
              borderRadius: 25,
            }}
          />
        </OverlayView>
      ))}
    </GoogleMap>
  );
};

export default GoogleMapView;
