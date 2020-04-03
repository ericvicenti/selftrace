export interface ClusterObject extends Geo.LocationShort {
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
