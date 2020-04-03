import axios from 'axios';
import { CLUSTERS_ENDPOINT, CLUSTERS_ENDPOINT_DEV } from './config';
import { ClusterObject } from '../data-types';

export async function requestClusters(region: Geo.Region, devMode?: boolean) {
  try {
    const res = await axios.post(devMode ? CLUSTERS_ENDPOINT_DEV : CLUSTERS_ENDPOINT, {
      region,
    });
    const clusters = res.data as ClusterObject[];
    return Promise.resolve(clusters);
  } catch (err) {
    return Promise.reject(err);
  }
}
