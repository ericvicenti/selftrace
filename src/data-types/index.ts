export interface ClusterObject extends Geo.LocationShort {
  positiveCount: number;
  showingSymptomsCount: number;
}

export type AnonymListItem<T> = {
  key: string;
  data: T;
};

export * from './AuthStatus';
export * from './Progress';
export * from './Wellbeing';
