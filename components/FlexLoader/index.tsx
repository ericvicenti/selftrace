import * as React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { Colors } from '../../styles';

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center' },
});

const FlexLoader: React.FC = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={Colors.PRIMARY.toString()} />
    </View>
  );
};

export default FlexLoader;
