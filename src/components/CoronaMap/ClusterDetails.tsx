import React from 'react';
import { Animated, View, StyleSheet, TouchableOpacity } from 'react-native';
import { t } from 'i18n-js';
import Text from '../Text';
import { Colors, Paddings, Margins } from '../../styles';
import { ClusterObject, AnonymListItem } from '../../data-types';
import withDelayedUnmount from '../../hocs/withDelayedUnmount';

const backgroundColor = Colors.CLUSTER_SELECTED.toString();

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Paddings.X,
    paddingVertical: Paddings.MAX_Y,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    minWidth: 200,
    minHeight: 80,
    shadowRadius: 15,
    shadowOpacity: 0.9,
    shadowColor: backgroundColor,
    backgroundColor,
    borderRadius: 5,
  },
  titleLineContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  lineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  number: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white',
  },
  title: {
    fontWeight: 'bold',
    marginBottom: Margins.MIN_Y,
    color: 'white',
  },
  description: {
    fontSize: 12,
    color: 'white',
  },
});

interface Props {
  cluster: Partial<AnonymListItem<ClusterObject>>;
  duration: number;
  onClose: () => void;
  style?: any;
}

function InfoBox({ cluster, duration, onClose, style }: Props) {
  const [persistentCluster, setPersistentCluster] = React.useState(cluster);

  React.useEffect(() => {
    if (!cluster.data) {
      setTimeout(() => {
        setPersistentCluster(cluster);
      }, duration);
    } else {
      setPersistentCluster(cluster);
    }
  }, [cluster, duration]);

  let size = 0;
  let positiveCount = 0;
  let showingSymptomsCount = 0;

  const { data } = persistentCluster;
  if (data) {
    ({ positiveCount, showingSymptomsCount } = data);
    size = positiveCount + showingSymptomsCount;
  }

  return (
    <Animated.View style={[styles.container, style]}>
      <View style={styles.titleLineContainer}>
        <Text style={styles.title}>{t('screens.map.clusterDetailsTitle')}</Text>
        <TouchableOpacity onPress={onClose}>
          <Text style={styles.description}>X</Text>
        </TouchableOpacity>
      </View>
      {size === 1 ? (
        <Text style={styles.description}>
          {positiveCount === 1
            ? t('screens.map.userTestedPositive')
            : t('screens.map.userShowingSymptoms')}
        </Text>
      ) : (
        <>
          <View style={styles.lineContainer}>
            <Text style={styles.number}>{positiveCount} </Text>
            <Text style={styles.description}>- {t('screens.map.testedPositive')}</Text>
          </View>
          <View style={styles.lineContainer}>
            <Text style={styles.number}>{showingSymptomsCount} </Text>
            <Text style={styles.description}>- {t('screens.map.showingSymptoms')}</Text>
          </View>
        </>
      )}
    </Animated.View>
  );
}

export default withDelayedUnmount(InfoBox);
