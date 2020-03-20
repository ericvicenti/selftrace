import React from 'react';
import { TextStyle } from 'react-native';
import * as ExpoIcon from '@expo/vector-icons';

const {
  FontAwesome,
  Foundation,
  Entypo,
  AntDesign,
  MaterialCommunityIcons,
  MaterialIcons,
} = ExpoIcon;

const hashmap = Object.freeze({
  question: {
    font: FontAwesome,
    id: 'question',
    defaultSize: 25,
  },
  person: {
    font: MaterialIcons,
    id: 'person',
    defaultSize: 25,
  },
  'map-marker': {
    font: MaterialCommunityIcons,
    id: 'map-marker',
    defaultSize: 25,
  },
  'map-marker-multiple': {
    font: MaterialCommunityIcons,
    id: 'map-marker-multiple',
    defaultSize: 25,
  },
  'location-pin': {
    font: Entypo,
    id: 'location-pin',
    defaultSize: 25,
  },
  earth: {
    font: MaterialCommunityIcons,
    id: 'earth',
    defaultSize: 25,
  },
  form: {
    font: AntDesign,
    id: 'form',
    defaultSize: 25,
  },
  lock: {
    font: Foundation,
    id: 'lock',
    defaultSize: 25,
  },
});

export type IconName = keyof typeof hashmap;

interface Props {
  name: IconName;
  size?: number;
  color?: string;
  style?: TextStyle;
}

/**
 * An icon component that works as an abstraction over react-native-vector-icons.
 */

function Icon({ name, size, color, style }: Props) {
  const { font: ActiveFont, id, defaultSize } = Object.prototype.hasOwnProperty.call(hashmap, name)
    ? hashmap[name]
    : hashmap.question;

  return <ActiveFont name={id} size={size || defaultSize} color={color} style={style} />;
}

export default React.memo(Icon);
