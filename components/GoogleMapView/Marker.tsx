import React from 'react';
import { Marker, MarkerProps } from 'react-google-maps';
import { Location } from '../../data-types';

interface Props extends MarkerProps {
  description?: string;
  title?: string;
  coordinate: Location;
}

export default function GoogleMapMarker({ description, title, coordinate, ...rest }: Props) {
  return (
    <Marker
      {...rest}
      title={description ? `${title}\n${description}` : title}
      position={{ lat: coordinate.latitude, lng: coordinate.longitude }}
    />
  );
}
