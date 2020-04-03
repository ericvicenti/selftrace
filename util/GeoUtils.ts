export default class GeoUtils {
  // TODO: Replace with correct map type
  static getRegionFromGoogleMap(map: any): Geo.Region | undefined {
    const center = map.getCenter();
    const bounds = map.getBounds();

    if (!center || !bounds) {
      return undefined;
    }

    const latitude = center.lat();
    const longitude = center.lng();

    const ne = bounds.getNorthEast();
    const sw = bounds.getSouthWest();

    const latitudeDelta = ne.lat() - sw.lat();
    const longitudeDelta = ne.lng() - sw.lng();

    return { latitude, longitude, latitudeDelta, longitudeDelta };
  }
}
