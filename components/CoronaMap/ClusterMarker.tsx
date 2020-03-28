import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Text from '../Text';
import { AnonymListItem, ClusterObject } from '../../data-types';
import { Colors } from '../../styles';

const BASE_DIAMETER = 30;
// BASE_DIAMETER + MAX_DELTA will be maximum marker diameter (size)
const MAX_DELTA = 20;

const styles = StyleSheet.create({
  container: {
    shadowOffset: {
      height: 0,
      width: 0,
    },
    shadowRadius: 15,
    shadowOpacity: 0.8,
    shadowColor: Colors.CLUSTER_BASE.toString(),
    justifyContent: 'center',
    alignItems: 'center',
  },
  number: {
    color: 'white',
  },
  callout: {
    padding: 5,
    minHeight: 40,
    minWidth: 140,
    justifyContent: 'center',
    alignItems: 'center',
  },
  calloutDescription: {
    fontSize: 12,
    color: 'black',
  },
});

interface Props {
  cluster: AnonymListItem<ClusterObject>;
  onPress: (cluster: AnonymListItem<ClusterObject>) => void;
}

export default function ClusterMarker({ cluster, onPress }: Props) {
  const { positiveCount, showingSymptomsCount } = cluster.data;
  const size = positiveCount + showingSymptomsCount;

  const perc = Math.min(1, (0.9 * (size - 1)) / size);
  const diameter = BASE_DIAMETER + perc * MAX_DELTA;
  const backgroundColor = Colors.CLUSTER_BASE.lighten(-perc * 5);

  return (
    <TouchableOpacity
      onPress={() => onPress(cluster)}
      activeOpacity={0.6}
      style={[
        styles.container,
        {
          height: diameter,
          width: diameter,
          borderRadius: diameter / 2,
          backgroundColor,
        },
      ]}>
      <Text style={styles.number}>{size}</Text>
    </TouchableOpacity>
  );
}
