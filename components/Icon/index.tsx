import React from 'react';
import { TextStyle } from 'react-native';
import {
  Foundation,
  AntDesign,
  MaterialCommunityIcons,
  MaterialIcons,
  FontAwesome,
} from '@expo/vector-icons';

interface Props {
  size?: number;
  color?: string;
  style?: TextStyle;
}

const Icon = {
  Question: (props: Props) => <FontAwesome name="question" size={25} {...props} />,
  Person: (props: Props) => <MaterialIcons name="person" size={28} {...props} />,
  MapMarker: (props: Props) => <MaterialCommunityIcons name="map-marker" size={25} {...props} />,
  MapMarkerMultiple: (props: Props) => (
    <MaterialCommunityIcons name="map-marker-multiple" size={25} {...props} />
  ),
  Earth: (props: Props) => <MaterialCommunityIcons name="earth" size={25} {...props} />,
  Lock: (props: Props) => <Foundation name="lock" size={25} {...props} />,
  Form: (props: Props) => <AntDesign name="form" size={25} {...props} />,
};

export default Icon;
