export interface Location {
  latitude: number;
  longitude: number;
}

export interface RegionObject extends Location {
  latitudeDelta: number;
  longitudeDelta: number;
}

export interface ClusterObject {
  lat: number;
  lng: number;
  positiveCount: number;
  showingSymptomsCount: number;
}

export type AnonymListItem<T> = {
  key: string;
  data: T;
};

export * from './AuthStatus';
export * from './Cluster';
export * from './Progress';
export * from './Region';
export * from './Wellbeing';
