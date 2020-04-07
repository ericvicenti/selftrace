import axios from 'axios';
import { Endpoints } from './constants';
import { ClusterObject } from '../data-types';

export async function requestClusters(region: Geo.Region, devMode?: boolean) {
  try {
    const res = await axios.post(
      devMode ? Endpoints.Cluster.getDevURL() : Endpoints.Cluster.getURL(),
      {
        region,
      }
    );
    const clusters = res.data as ClusterObject[];
    return Promise.resolve(clusters);
  } catch (err) {
    return Promise.reject(err);
  }
}
